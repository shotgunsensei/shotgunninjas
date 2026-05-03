import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const newsletterBroadcastsTable = pgTable("newsletter_broadcasts", {
  id: serial("id").primaryKey(),
  subject: text("subject").notNull(),
  html: text("html").notNull(),
  recipientCount: integer("recipient_count").notNull().default(0),
  successCount: integer("success_count").notNull().default(0),
  failureCount: integer("failure_count").notNull().default(0),
  sentAt: timestamp("sent_at").defaultNow().notNull(),
});

export type NewsletterBroadcast = typeof newsletterBroadcastsTable.$inferSelect;
