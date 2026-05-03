import { Router, type IRouter } from "express";
import { randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@workspace/db";
import { newsletterSubscribersTable } from "@workspace/db/schema";
import {
  SubscribeNewsletterBody,
  SubscribeNewsletterResponse,
} from "@workspace/api-zod";
import { rateLimit } from "../middlewares/rateLimit";

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

export default router;
