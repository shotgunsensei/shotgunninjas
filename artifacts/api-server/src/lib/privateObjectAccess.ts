import { db } from "@workspace/db";
import {
  bannedUsersTable,
  clanDocumentsTable,
  repositoryFilesTable,
  sessionsTable,
  songsTable,
  usersTable,
} from "@workspace/db/schema";
import { eq, inArray } from "drizzle-orm";
import type { ObjectReadLookups } from "./objectReadAccess";

export const privateObjectLookups: ObjectReadLookups = {
  async repositoryReferences(aliases) {
    const rows = await db.select({ id: repositoryFilesTable.id }).from(repositoryFilesTable)
      .where(inArray(repositoryFilesTable.fileUrl, aliases)).limit(1);
    return rows.length > 0;
  },
  async songReferences(aliases) {
    const rows = await db.select({ id: songsTable.id }).from(songsTable)
      .where(inArray(songsTable.fileUrl, aliases)).limit(1);
    return rows.length > 0;
  },
  async clanReferences(aliases) {
    const rows = await db.select({ id: clanDocumentsTable.id }).from(clanDocumentsTable)
      .where(inArray(clanDocumentsTable.fileUrl, aliases)).limit(1);
    return rows.length > 0;
  },
  async validClanSession(authorization) {
    if (typeof authorization !== "string" || !authorization.startsWith("Bearer ")) return false;
    const token = authorization.slice("Bearer ".length);
    if (!token) return false;
    const [session] = await db.select().from(sessionsTable)
      .where(eq(sessionsTable.token, token)).limit(1);
    if (!session) return false;
    const expiresAt = session.expiresAt.getTime();
    if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return false;
    const [user] = await db.select({ id: usersTable.id }).from(usersTable)
      .where(eq(usersTable.id, session.userId)).limit(1);
    if (!user) return false;
    const [ban] = await db.select({ id: bannedUsersTable.id }).from(bannedUsersTable)
      .where(eq(bannedUsersTable.userId, user.id)).limit(1);
    return !ban;
  },
};
