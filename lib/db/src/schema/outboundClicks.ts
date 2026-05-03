import { pgTable, serial, text, timestamp, index } from "drizzle-orm/pg-core";

export const outboundClicksTable = pgTable(
  "outbound_clicks",
  {
    id: serial("id").primaryKey(),
    url: text("url").notNull(),
    source: text("source"),
    referrer: text("referrer"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    urlIdx: index("outbound_clicks_url_idx").on(t.url),
    createdAtIdx: index("outbound_clicks_created_at_idx").on(t.createdAt),
  }),
);

export type OutboundClick = typeof outboundClicksTable.$inferSelect;
export type InsertOutboundClick = typeof outboundClicksTable.$inferInsert;
