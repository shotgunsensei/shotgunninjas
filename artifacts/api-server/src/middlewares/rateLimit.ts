import type { Request, Response, NextFunction, RequestHandler } from "express";
import { pool } from "@workspace/db";
import { logger } from "../lib/logger";

const SWEEP_INTERVAL_MS = 5 * 60 * 1000;
let lastSweep = 0;
let sweeping = false;

async function sweep(now: number) {
  if (sweeping) return;
  if (now - lastSweep < SWEEP_INTERVAL_MS) return;
  sweeping = true;
  lastSweep = now;
  try {
    await pool.query("DELETE FROM rate_limit_buckets WHERE reset_at <= now()");
  } catch (err) {
    logger.warn({ err }, "rate limit sweep failed");
  } finally {
    sweeping = false;
  }
}

function clientKey(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  const ip =
    (typeof forwarded === "string" ? forwarded.split(",")[0]?.trim() : null) ||
    req.ip ||
    req.socket.remoteAddress ||
    "unknown";
  return ip;
}

export interface RateLimitOptions {
  windowMs: number;
  max: number;
  scope: string;
}

interface BucketRow {
  count: number;
  reset_at: Date;
}

const UPSERT_SQL = `
  INSERT INTO rate_limit_buckets (key, count, reset_at)
  VALUES ($1, 1, to_timestamp($2 / 1000.0))
  ON CONFLICT (key) DO UPDATE
  SET
    count = CASE
      WHEN rate_limit_buckets.reset_at <= now() THEN 1
      ELSE rate_limit_buckets.count + 1
    END,
    reset_at = CASE
      WHEN rate_limit_buckets.reset_at <= now() THEN EXCLUDED.reset_at
      ELSE rate_limit_buckets.reset_at
    END
  RETURNING count, reset_at
`;

export function rateLimit(opts: RateLimitOptions): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const now = Date.now();
    void sweep(now);

    const key = `${opts.scope}:${clientKey(req)}`;
    const resetAtMs = now + opts.windowMs;

    pool
      .query<BucketRow>(UPSERT_SQL, [key, resetAtMs])
      .then((result) => {
        const row = result.rows[0];
        if (!row) {
          // Should never happen with RETURNING, but fail open.
          next();
          return;
        }

        const count = row.count;
        const resetAt = row.reset_at instanceof Date
          ? row.reset_at.getTime()
          : new Date(row.reset_at).getTime();

        const remaining = Math.max(0, opts.max - count);
        res.setHeader("X-RateLimit-Limit", String(opts.max));
        res.setHeader("X-RateLimit-Remaining", String(remaining));
        res.setHeader("X-RateLimit-Reset", String(Math.ceil(resetAt / 1000)));

        if (count > opts.max) {
          const retryAfterSec = Math.max(1, Math.ceil((resetAt - Date.now()) / 1000));
          res.setHeader("Retry-After", String(retryAfterSec));
          res.status(429).json({
            message: "Too many requests. Please slow down and try again shortly.",
          });
          return;
        }

        next();
      })
      .catch((err) => {
        // Fail open: don't take down the API if the rate-limit store hiccups.
        logger.warn({ err, scope: opts.scope }, "rate limit check failed; allowing request");
        next();
      });
  };
}
