import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import {
  usersTable,
  sessionsTable,
  userRolesTable,
  bannedUsersTable,
  outboundClicksTable,
  newsletterSubscribersTable,
} from "@workspace/db/schema";
import { eq, gte, sql, desc, isNotNull, isNull, and } from "drizzle-orm";

const router: IRouter = Router();

const analyticsLoginAttempts = new Map<
  string,
  { count: number; resetAt: number }
>();
const ANALYTICS_MAX_ATTEMPTS = 5;
const ANALYTICS_WINDOW_MS = 15 * 60 * 1000;

function checkAnalyticsRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = analyticsLoginAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    analyticsLoginAttempts.set(ip, {
      count: 1,
      resetAt: now + ANALYTICS_WINDOW_MS,
    });
    return true;
  }
  entry.count++;
  return entry.count <= ANALYTICS_MAX_ATTEMPTS;
}

function checkAdminPassword(req: { headers: Record<string, unknown> }): boolean {
  const provided = req.headers["x-admin-password"];
  const expected = process.env.SOUND_STUDIO_ADMIN_PASSWORD;
  return (
    typeof expected === "string" &&
    expected.length > 0 &&
    typeof provided === "string" &&
    provided === expected
  );
}

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

router.post("/admin/analytics/verify", (req, res) => {
  const clientIp = req.ip || "unknown";
  if (!checkAnalyticsRateLimit(clientIp)) {
    res.status(429).json({ message: "Too many attempts. Try again later." });
    return;
  }
  if (!checkAdminPassword(req)) {
    res.status(403).json({ verified: false, message: "Invalid admin password" });
    return;
  }
  res.json({ verified: true });
});

router.get("/admin/analytics", async (req, res) => {
  try {
    if (!checkAdminPassword(req)) {
      res.status(403).json({ message: "Invalid admin password" });
      return;
    }

    const days = req.query.days === "7" ? 7 : 30;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const since7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const since30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const clicksBySource = await db
      .select({
        source: outboundClicksTable.source,
        count: sql<number>`count(*)::int`.as("count"),
      })
      .from(outboundClicksTable)
      .where(gte(outboundClicksTable.createdAt, since))
      .groupBy(outboundClicksTable.source)
      .orderBy(desc(sql`count(*)`));

    const clicksByUrl = await db
      .select({
        url: outboundClicksTable.url,
        source: outboundClicksTable.source,
        count: sql<number>`count(*)::int`.as("count"),
      })
      .from(outboundClicksTable)
      .where(gte(outboundClicksTable.createdAt, since))
      .groupBy(outboundClicksTable.url, outboundClicksTable.source)
      .orderBy(desc(sql`count(*)`))
      .limit(100);

    const [totalClicks7] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(outboundClicksTable)
      .where(gte(outboundClicksTable.createdAt, since7));

    const [totalClicks30] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(outboundClicksTable)
      .where(gte(outboundClicksTable.createdAt, since30));

    const [totalClicksAll] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(outboundClicksTable);

    const [subsTotal] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(newsletterSubscribersTable);

    const [subsActive] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(newsletterSubscribersTable)
      .where(isNull(newsletterSubscribersTable.unsubscribedAt));

    const [subsLast30] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(newsletterSubscribersTable)
      .where(gte(newsletterSubscribersTable.createdAt, since30));

    const [subsUnsub] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(newsletterSubscribersTable)
      .where(isNotNull(newsletterSubscribersTable.unsubscribedAt));

    const [subsUnsubLast30] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(newsletterSubscribersTable)
      .where(
        and(
          isNotNull(newsletterSubscribersTable.unsubscribedAt),
          gte(newsletterSubscribersTable.unsubscribedAt, since30),
        ),
      );

    res.json({
      windowDays: days,
      outbound: {
        totals: {
          last7: totalClicks7?.count ?? 0,
          last30: totalClicks30?.count ?? 0,
          allTime: totalClicksAll?.count ?? 0,
        },
        bySource: clicksBySource,
        byUrl: clicksByUrl,
      },
      newsletter: {
        total: subsTotal?.count ?? 0,
        active: subsActive?.count ?? 0,
        last30: subsLast30?.count ?? 0,
        unsubscribed: subsUnsub?.count ?? 0,
        unsubscribedLast30: subsUnsubLast30?.count ?? 0,
      },
    });
  } catch (err) {
    req.log.error({ err }, "Failed to load analytics");
    res.status(500).json({ message: "Failed to load analytics" });
  }
});

export default router;
