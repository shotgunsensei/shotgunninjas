import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { usersTable, sessionsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

const router: IRouter = Router();

router.post("/auth/signup", async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    if (!email || !password || !displayName) {
      res.status(400).json({ message: "Email, password, and display name are required" });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ message: "Password must be at least 6 characters" });
      return;
    }

    const existing = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (existing.length > 0) {
      res.status(409).json({ message: "An account with that email already exists" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [user] = await db
      .insert(usersTable)
      .values({ email, passwordHash, displayName })
      .returning();

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await db.insert(sessionsTable).values({
      userId: user.id,
      token,
      expiresAt,
    });

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (err) {
    req.log.error({ err }, "Signup failed");
    res.status(500).json({ message: "Signup failed" });
  }
});

router.post("/auth/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await db.insert(sessionsTable).values({
      userId: user.id,
      token,
      expiresAt,
    });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (err) {
    req.log.error({ err }, "Signin failed");
    res.status(500).json({ message: "Signin failed" });
  }
});

router.post("/auth/signout", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      await db.delete(sessionsTable).where(eq(sessionsTable.token, token));
    }
    res.json({ message: "Signed out" });
  } catch (err) {
    req.log.error({ err }, "Signout failed");
    res.status(500).json({ message: "Signout failed" });
  }
});

router.get("/auth/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    const token = authHeader.slice(7);
    const [session] = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.token, token))
      .limit(1);

    if (!session || session.expiresAt < new Date()) {
      res.status(401).json({ message: "Session expired" });
      return;
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, session.userId))
      .limit(1);

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    res.json({
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    req.log.error({ err }, "Auth check failed");
    res.status(500).json({ message: "Auth check failed" });
  }
});

export default router;
