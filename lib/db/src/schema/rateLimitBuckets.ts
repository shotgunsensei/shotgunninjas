import { pgTable, text, integer, timestamp, index } from "drizzle-orm/pg-core";

export const rateLimitBucketsTable = pgTable(
  "rate_limit_buckets",
  {
    key: text("key").primaryKey(),
    count: integer("count").notNull().default(0),
    resetAt: timestamp("reset_at", { withTimezone: true }).notNull(),
  },
  (t) => ({
    resetAtIdx: index("rate_limit_buckets_reset_at_idx").on(t.resetAt),
  }),
);

export type RateLimitBucket = typeof rateLimitBucketsTable.$inferSelect;
