import { Router, type IRouter } from "express";
import { z } from "zod";
import { db } from "@workspace/db";
import { outboundClicksTable } from "@workspace/db/schema";
import { rateLimit } from "../middlewares/rateLimit";

const router: IRouter = Router();

const TrackBody = z.object({
  url: z.string().url().max(2048),
  source: z.string().min(1).max(128),
});

const trackLimiter = rateLimit({
  scope: "track:outbound",
  windowMs: 60 * 1000,
  max: 60,
});

router.post("/track/outbound", trackLimiter, async (req, res) => {
  try {
    const { url, source } = TrackBody.parse(req.body);
    const referrer =
      typeof req.headers.referer === "string" ? req.headers.referer : null;
    const userAgent =
      typeof req.headers["user-agent"] === "string"
        ? req.headers["user-agent"].slice(0, 512)
        : null;

    await db.insert(outboundClicksTable).values({
      url,
      source,
      referrer,
      userAgent,
    });

    res.status(204).end();
  } catch (err) {
    req.log.warn({ err }, "Failed to record outbound click");
    res.status(204).end();
  }
});

export default router;
