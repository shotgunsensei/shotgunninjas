import { Router, type IRouter } from "express";
import { randomBytes } from "node:crypto";
import { eq, isNull } from "drizzle-orm";
import { z } from "zod";
import { db } from "@workspace/db";
import {
  newsletterSubscribersTable,
  newsletterBroadcastsTable,
} from "@workspace/db/schema";
import {
  SubscribeNewsletterBody,
  SubscribeNewsletterResponse,
} from "@workspace/api-zod";
import { rateLimit } from "../middlewares/rateLimit";
import { sendEmail } from "../lib/mailer";

const router: IRouter = Router();

const newsletterLimiter = rateLimit({
  scope: "newsletter:subscribe",
  windowMs: 60 * 1000,
  max: 5,
});

router.post("/newsletter/subscribe", newsletterLimiter, async (req, res) => {
  try {
    const body = SubscribeNewsletterBody.parse(req.body);
    const email = body.email.trim().toLowerCase();
    const token = randomBytes(24).toString("hex");

    await db
      .insert(newsletterSubscribersTable)
      .values({
        email,
        source: body.source ?? null,
        unsubscribeToken: token,
      })
      .onConflictDoNothing({ target: newsletterSubscribersTable.email });

    const result = SubscribeNewsletterResponse.parse({
      message: "You're in. Watch your inbox for ninja drops.",
    });
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to subscribe to newsletter");
    res.status(400).json({
      message: "Could not subscribe. Please check your email and try again.",
    });
  }
});

const UnsubQuery = z.object({ token: z.string().min(8).max(128) });

router.get("/newsletter/unsubscribe", async (req, res) => {
  try {
    const { token } = UnsubQuery.parse(req.query);
    const [row] = await db
      .select()
      .from(newsletterSubscribersTable)
      .where(eq(newsletterSubscribersTable.unsubscribeToken, token))
      .limit(1);

    if (!row) {
      res
        .status(404)
        .json({ message: "Unknown or expired unsubscribe link." });
      return;
    }

    if (!row.unsubscribedAt) {
      await db
        .update(newsletterSubscribersTable)
        .set({ unsubscribedAt: new Date() })
        .where(eq(newsletterSubscribersTable.id, row.id));
    }

    res.json({
      message: "You have been unsubscribed. We're sorry to see you go.",
      email: row.email,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to unsubscribe");
    res.status(400).json({ message: "Invalid unsubscribe request." });
  }
});

const broadcastLimiter = rateLimit({
  scope: "newsletter:broadcast",
  windowMs: 60 * 60 * 1000,
  max: 5,
});

const BroadcastBody = z.object({
  subject: z.string().min(1).max(300),
  html: z.string().min(1).max(200_000),
  adminPassword: z.string().min(1),
  testEmail: z.string().email().optional(),
});

function getPublicBaseUrl(req: import("express").Request): string {
  const envUrl = process.env.PUBLIC_BASE_URL;
  if (envUrl) return envUrl.replace(/\/$/, "");
  const proto =
    (req.headers["x-forwarded-proto"] as string | undefined)?.split(",")[0] ??
    req.protocol;
  const host = req.headers["x-forwarded-host"] ?? req.headers.host;
  return `${proto}://${host}`;
}

function renderEmailHtml(opts: {
  bodyHtml: string;
  unsubscribeUrl: string;
}): string {
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0b0b0f;color:#e7e7ea;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0b0f;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#15151c;border-radius:8px;overflow:hidden;">
        <tr><td style="padding:24px 28px;font-size:15px;line-height:1.6;color:#e7e7ea;">
          ${opts.bodyHtml}
        </td></tr>
        <tr><td style="padding:18px 28px;border-top:1px solid #2a2a35;font-size:12px;color:#9999a5;">
          You're receiving this because you subscribed to the Shotgun Ninjas Productions newsletter.<br>
          <a href="${opts.unsubscribeUrl}" style="color:#9999a5;text-decoration:underline;">Unsubscribe</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

router.post(
  "/admin/newsletter/broadcast",
  broadcastLimiter,
  async (req, res) => {
    try {
      const body = BroadcastBody.parse(req.body);
      const adminPassword = process.env.NEWSLETTER_ADMIN_PASSWORD;
      if (!adminPassword) {
        req.log.error("NEWSLETTER_ADMIN_PASSWORD not set");
        res.status(500).json({ message: "Admin not configured" });
        return;
      }
      if (body.adminPassword !== adminPassword) {
        res.status(403).json({ message: "Admin access required" });
        return;
      }

      const baseUrl = getPublicBaseUrl(req);

      // Test send: send only to the provided email and return.
      if (body.testEmail) {
        const previewUnsub = `${baseUrl}/unsubscribe?token=preview`;
        const html = renderEmailHtml({
          bodyHtml: body.html,
          unsubscribeUrl: previewUnsub,
        });
        await sendEmail({
          to: body.testEmail,
          subject: `[TEST] ${body.subject}`,
          html,
        });
        req.log.info(
          { testEmail: body.testEmail, subject: body.subject },
          "Sent test broadcast",
        );
        res.json({
          message: "Test email sent.",
          recipientCount: 1,
          successCount: 1,
          failureCount: 0,
        });
        return;
      }

      const subscribers = await db
        .select({
          id: newsletterSubscribersTable.id,
          email: newsletterSubscribersTable.email,
          unsubscribeToken: newsletterSubscribersTable.unsubscribeToken,
        })
        .from(newsletterSubscribersTable)
        .where(isNull(newsletterSubscribersTable.unsubscribedAt));

      let successCount = 0;
      let failureCount = 0;

      // Throttle: ~2 emails/sec to stay well under provider limits.
      const PER_EMAIL_DELAY_MS = 500;

      for (const sub of subscribers) {
        let token = sub.unsubscribeToken;
        if (!token) {
          token = randomBytes(24).toString("hex");
          await db
            .update(newsletterSubscribersTable)
            .set({ unsubscribeToken: token })
            .where(eq(newsletterSubscribersTable.id, sub.id));
        }
        const unsubscribeUrl = `${baseUrl}/unsubscribe?token=${encodeURIComponent(token)}`;
        const html = renderEmailHtml({
          bodyHtml: body.html,
          unsubscribeUrl,
        });
        try {
          await sendEmail({
            to: sub.email,
            subject: body.subject,
            html,
          });
          successCount += 1;
        } catch (err) {
          failureCount += 1;
          req.log.warn(
            { err, email: sub.email },
            "Failed to send broadcast email",
          );
        }
        await sleep(PER_EMAIL_DELAY_MS);
      }

      const [logRow] = await db
        .insert(newsletterBroadcastsTable)
        .values({
          subject: body.subject,
          html: body.html,
          recipientCount: subscribers.length,
          successCount,
          failureCount,
        })
        .returning();

      req.log.info(
        {
          broadcastId: logRow?.id,
          subject: body.subject,
          recipientCount: subscribers.length,
          successCount,
          failureCount,
        },
        "Newsletter broadcast sent",
      );

      res.json({
        message: `Broadcast sent to ${successCount} of ${subscribers.length} subscribers.`,
        recipientCount: subscribers.length,
        successCount,
        failureCount,
      });
    } catch (err) {
      req.log.error({ err }, "Failed to send broadcast");
      const status = err instanceof z.ZodError ? 400 : 500;
      res.status(status).json({
        message:
          err instanceof Error ? err.message : "Failed to send broadcast",
      });
    }
  },
);

router.post(
  "/admin/newsletter/stats",
  async (req, res) => {
    try {
      const adminPassword = process.env.NEWSLETTER_ADMIN_PASSWORD;
      const provided = z
        .object({ adminPassword: z.string() })
        .parse(req.body).adminPassword;
      if (!adminPassword || provided !== adminPassword) {
        res.status(403).json({ message: "Admin access required" });
        return;
      }

      const all = await db
        .select({
          id: newsletterSubscribersTable.id,
          unsubscribedAt: newsletterSubscribersTable.unsubscribedAt,
        })
        .from(newsletterSubscribersTable);
      const total = all.length;
      const active = all.filter((s) => !s.unsubscribedAt).length;
      res.json({ total, active, unsubscribed: total - active });
    } catch (err) {
      req.log.error({ err }, "Failed to fetch newsletter stats");
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  },
);

export default router;
