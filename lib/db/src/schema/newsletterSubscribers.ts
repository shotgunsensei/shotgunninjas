import { pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const newsletterSubscribersTable = pgTable(
  "newsletter_subscribers",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    source: text("source"),
    unsubscribeToken: text("unsubscribe_token"),
    unsubscribedAt: timestamp("unsubscribed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    emailUnique: uniqueIndex("newsletter_subscribers_email_unique").on(t.email),
    tokenUnique: uniqueIndex("newsletter_subscribers_token_unique").on(
      t.unsubscribeToken,
    ),
  }),
);

export const insertNewsletterSubscriberSchema = createInsertSchema(
  newsletterSubscribersTable,
).omit({ id: true, createdAt: true });
export type InsertNewsletterSubscriber = z.infer<
  typeof insertNewsletterSubscriberSchema
>;
export type NewsletterSubscriber =
  typeof newsletterSubscribersTable.$inferSelect;
