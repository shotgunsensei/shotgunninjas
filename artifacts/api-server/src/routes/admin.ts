import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import {
  usersTable,
  sessionsTable,
  userRolesTable,
  bannedUsersTable,
} from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

async function getAdminFromToken(authHeader: string | undefined) {
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  const [session] = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.token, token))
    .limit(1);

  if (!session || session.expiresAt < new Date()) return null;

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, session.userId))
    .limit(1);

  if (!user || !user.isAdmin) return null;
  return user;
}

router.get("/admin/users", async (req, res) => {
  try {
    const admin = await getAdminFromToken(req.headers.authorization);
    if (!admin) {
      res.status(403).json({ message: "Admin access required" });
      return;
    }

    const users = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        displayName: usersTable.displayName,
        isAdmin: usersTable.isAdmin,
        createdAt: usersTable.createdAt,
      })
      .from(usersTable);

    res.json(users);
  } catch (err) {
    req.log.error({ err }, "Failed to list users");
    res.status(500).json({ message: "Failed to list users" });
  }
});

router.get("/admin/users/:id/roles", async (req, res) => {
  try {
    const admin = await getAdminFromToken(req.headers.authorization);
    if (!admin) {
      res.status(403).json({ message: "Admin access required" });
      return;
    }

    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    const roles = await db
      .select()
      .from(userRolesTable)
      .where(eq(userRolesTable.userId, userId));

    res.json(roles);
  } catch (err) {
    req.log.error({ err }, "Failed to list user roles");
    res.status(500).json({ message: "Failed to list user roles" });
  }
});

router.post("/admin/users/:id/roles", async (req, res) => {
  try {
    const admin = await getAdminFromToken(req.headers.authorization);
    if (!admin) {
      res.status(403).json({ message: "Admin access required" });
      return;
    }

    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    const { role } = req.body;
    if (!role) {
      res.status(400).json({ message: "Role is required" });
      return;
    }

    const [created] = await db
      .insert(userRolesTable)
      .values({ userId, role })
      .returning();

    res.status(201).json(created);
  } catch (err) {
    req.log.error({ err }, "Failed to assign role");
    res.status(500).json({ message: "Failed to assign role" });
  }
});

router.delete("/admin/users/:userId/roles/:roleId", async (req, res) => {
  try {
    const admin = await getAdminFromToken(req.headers.authorization);
    if (!admin) {
      res.status(403).json({ message: "Admin access required" });
      return;
    }

    const roleId = parseInt(req.params.roleId);
    if (isNaN(roleId)) {
      res.status(400).json({ message: "Invalid role ID" });
      return;
    }

    const deleted = await db
      .delete(userRolesTable)
      .where(eq(userRolesTable.id, roleId))
      .returning();

    if (deleted.length === 0) {
      res.status(404).json({ message: "Role not found" });
      return;
    }

    res.json({ message: "Role removed" });
  } catch (err) {
    req.log.error({ err }, "Failed to remove role");
    res.status(500).json({ message: "Failed to remove role" });
  }
});

router.get("/admin/bans", async (req, res) => {
  try {
    const admin = await getAdminFromToken(req.headers.authorization);
    if (!admin) {
      res.status(403).json({ message: "Admin access required" });
      return;
    }

    const bans = await db
      .select({
        id: bannedUsersTable.id,
        userId: bannedUsersTable.userId,
        userName: usersTable.displayName,
        userEmail: usersTable.email,
        reason: bannedUsersTable.reason,
        bannedAt: bannedUsersTable.bannedAt,
      })
      .from(bannedUsersTable)
      .leftJoin(usersTable, eq(bannedUsersTable.userId, usersTable.id));

    res.json(bans);
  } catch (err) {
    req.log.error({ err }, "Failed to list bans");
    res.status(500).json({ message: "Failed to list bans" });
  }
});

router.post("/admin/bans", async (req, res) => {
  try {
    const admin = await getAdminFromToken(req.headers.authorization);
    if (!admin) {
      res.status(403).json({ message: "Admin access required" });
      return;
    }

    const { userId, reason } = req.body;
    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const targetUserId = parseInt(userId);
    if (isNaN(targetUserId)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    if (targetUserId === admin.id) {
      res.status(400).json({ message: "Cannot ban yourself" });
      return;
    }

    const [ban] = await db
      .insert(bannedUsersTable)
      .values({ userId: targetUserId, reason: reason || null, bannedById: admin.id })
      .returning();

    await db.delete(sessionsTable).where(eq(sessionsTable.userId, targetUserId));

    res.status(201).json(ban);
  } catch (err) {
    req.log.error({ err }, "Failed to ban user");
    res.status(500).json({ message: "Failed to ban user" });
  }
});

router.delete("/admin/bans/:id", async (req, res) => {
  try {
    const admin = await getAdminFromToken(req.headers.authorization);
    if (!admin) {
      res.status(403).json({ message: "Admin access required" });
      return;
    }

    const banId = parseInt(req.params.id);
    if (isNaN(banId)) {
      res.status(400).json({ message: "Invalid ban ID" });
      return;
    }

    const deleted = await db
      .delete(bannedUsersTable)
      .where(eq(bannedUsersTable.id, banId))
      .returning();

    if (deleted.length === 0) {
      res.status(404).json({ message: "Ban not found" });
      return;
    }

    res.json({ message: "User unbanned" });
  } catch (err) {
    req.log.error({ err }, "Failed to unban user");
    res.status(500).json({ message: "Failed to unban user" });
  }
});

export default router;
