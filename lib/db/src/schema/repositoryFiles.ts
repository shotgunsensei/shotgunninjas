import { pgTable, serial, text, bigint, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const repositoryFilesTable = pgTable("repository_files", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  size: bigint("size", { mode: "number" }).notNull(),
  contentType: text("content_type").notNull(),
  fileUrl: text("file_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertRepositoryFileSchema = createInsertSchema(repositoryFilesTable).omit({
  id: true,
  createdAt: true,
});
export type InsertRepositoryFile = z.infer<typeof insertRepositoryFileSchema>;
export type RepositoryFile = typeof repositoryFilesTable.$inferSelect;
