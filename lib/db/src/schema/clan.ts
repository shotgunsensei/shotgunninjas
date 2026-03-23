import { pgTable, serial, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const clanForumTopicsTable = pgTable("clan_forum_topics", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: integer("author_id")
    .references(() => usersTable.id)
    .notNull(),
  isPinned: boolean("is_pinned").default(false).notNull(),
  isLocked: boolean("is_locked").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertForumTopicSchema = createInsertSchema(clanForumTopicsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isPinned: true,
  isLocked: true,
});
export type InsertForumTopic = z.infer<typeof insertForumTopicSchema>;
export type ForumTopic = typeof clanForumTopicsTable.$inferSelect;

export const clanForumRepliesTable = pgTable("clan_forum_replies", {
  id: serial("id").primaryKey(),
  topicId: integer("topic_id")
    .references(() => clanForumTopicsTable.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  authorId: integer("author_id")
    .references(() => usersTable.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertForumReplySchema = createInsertSchema(clanForumRepliesTable).omit({
  id: true,
  createdAt: true,
});
export type InsertForumReply = z.infer<typeof insertForumReplySchema>;
export type ForumReply = typeof clanForumRepliesTable.$inferSelect;

export const clanDocumentsTable = pgTable("clan_documents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  fileUrl: text("file_url").notNull(),
  uploadedById: integer("uploaded_by_id")
    .references(() => usersTable.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertClanDocumentSchema = createInsertSchema(clanDocumentsTable).omit({
  id: true,
  createdAt: true,
});
export type InsertClanDocument = z.infer<typeof insertClanDocumentSchema>;
export type ClanDocument = typeof clanDocumentsTable.$inferSelect;
