import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { songsTable } from "@workspace/db/schema";
import { eq, desc } from "drizzle-orm";
import {
  ListSongsResponse,
  VerifySongAdminBody,
  VerifySongAdminResponse,
  CreateSongBody,
  UpdateSongParams,
  UpdateSongBody,
  UpdateSongResponse,
  DeleteSongParams,
  DeleteSongResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/songs", async (req, res) => {
  try {
    const songs = await db
      .select()
      .from(songsTable)
      .orderBy(desc(songsTable.createdAt));

    const result = ListSongsResponse.parse(
      songs.map((s) => ({
        id: s.id,
        name: s.name,
        tags: s.tags ?? "",
        fileUrl: s.fileUrl,
        createdAt: s.createdAt.toISOString(),
      }))
    );
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to list songs");
    res.status(500).json({ message: "Failed to list songs" });
  }
});

router.post("/songs/admin/verify", async (req, res) => {
  try {
    const body = VerifySongAdminBody.parse(req.body);
    const adminPassword = process.env.SOUND_STUDIO_ADMIN_PASSWORD;

    if (!adminPassword) {
      req.log.error("SOUND_STUDIO_ADMIN_PASSWORD not set");
      res.status(500).json({ message: "Admin password not configured" });
      return;
    }

    const verified = body.password === adminPassword;
    const result = VerifySongAdminResponse.parse({ verified });
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to verify admin");
    res.status(400).json({ message: "Invalid request" });
  }
});

router.post("/songs/admin", async (req, res) => {
  try {
    const body = CreateSongBody.parse(req.body);
    const adminPassword = process.env.SOUND_STUDIO_ADMIN_PASSWORD;

    if (!adminPassword || body.adminPassword !== adminPassword) {
      res.status(403).json({ message: "Invalid admin password" });
      return;
    }

    const [song] = await db
      .insert(songsTable)
      .values({
        name: body.name,
        tags: body.tags ?? null,
        fileUrl: body.fileUrl,
      })
      .returning();

    res.status(201).json({
      id: song.id,
      name: song.name,
      tags: song.tags ?? "",
      fileUrl: song.fileUrl,
      createdAt: song.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create song");
    res.status(400).json({ message: "Failed to create song" });
  }
});

router.patch("/songs/admin/:id", async (req, res) => {
  try {
    const params = UpdateSongParams.parse({ id: req.params.id });
    const body = UpdateSongBody.parse(req.body);
    const adminPassword = process.env.SOUND_STUDIO_ADMIN_PASSWORD;

    if (!adminPassword || body.adminPassword !== adminPassword) {
      res.status(403).json({ message: "Invalid admin password" });
      return;
    }

    const updates: Record<string, string> = {};
    if (body.name) updates.name = body.name;
    if (body.tags !== undefined) updates.tags = body.tags ?? "";

    const [song] = await db
      .update(songsTable)
      .set(updates)
      .where(eq(songsTable.id, params.id))
      .returning();

    if (!song) {
      res.status(404).json({ message: "Song not found" });
      return;
    }

    const result = UpdateSongResponse.parse({
      id: song.id,
      name: song.name,
      tags: song.tags ?? "",
      fileUrl: song.fileUrl,
      createdAt: song.createdAt.toISOString(),
    });
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to update song");
    res.status(400).json({ message: "Failed to update song" });
  }
});

router.delete("/songs/admin/:id", async (req, res) => {
  try {
    const params = DeleteSongParams.parse({ id: req.params.id });
    const adminPassword = req.headers["x-admin-password"] as string;
    const serverPassword = process.env.SOUND_STUDIO_ADMIN_PASSWORD;

    if (!serverPassword || adminPassword !== serverPassword) {
      res.status(403).json({ message: "Invalid admin password" });
      return;
    }

    const [deleted] = await db
      .delete(songsTable)
      .where(eq(songsTable.id, params.id))
      .returning();

    if (!deleted) {
      res.status(404).json({ message: "Song not found" });
      return;
    }

    const result = DeleteSongResponse.parse({ message: "Song deleted" });
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to delete song");
    res.status(400).json({ message: "Failed to delete song" });
  }
});

export default router;
