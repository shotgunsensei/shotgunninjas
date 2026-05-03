import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { newsletterSubscribersTable } from "@workspace/db/schema";
import {
  SubscribeNewsletterBody,
  SubscribeNewsletterResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/newsletter/subscribe", async (req, res) => {
  try {
    const body = SubscribeNewsletterBody.parse(req.body);
    const email = body.email.trim().toLowerCase();

    await db
      .insert(newsletterSubscribersTable)
      .values({ email, source: body.source ?? null })
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

export default router;
