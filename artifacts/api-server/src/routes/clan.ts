import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import {
  clanForumTopicsTable,
  clanForumRepliesTable,
  clanDocumentsTable,
  usersTable,
  sessionsTable,
} from "@workspace/db/schema";
import { eq, desc } from "drizzle-orm";

const router: IRouter = Router();

async function getUserFromToken(authHeader: string | undefined) {
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

  return user || null;
}

router.get("/clan/forum/topics", async (req, res) => {
  try {
    const user = await getUserFromToken(req.headers.authorization);
    if (!user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const topics = await db
      .select({
        id: clanForumTopicsTable.id,
        title: clanForumTopicsTable.title,
        content: clanForumTopicsTable.content,
        authorId: clanForumTopicsTable.authorId,
        authorName: usersTable.displayName,
        isPinned: clanForumTopicsTable.isPinned,
        isLocked: clanForumTopicsTable.isLocked,
        createdAt: clanForumTopicsTable.createdAt,
      })
      .from(clanForumTopicsTable)
      .leftJoin(usersTable, eq(clanForumTopicsTable.authorId, usersTable.id))
      .orderBy(desc(clanForumTopicsTable.isPinned), desc(clanForumTopicsTable.createdAt));

    res.json(topics);
  } catch (err) {
    req.log.error({ err }, "Failed to list forum topics");
    res.status(500).json({ message: "Failed to list topics" });
  }
});

router.post("/clan/forum/topics", async (req, res) => {
  try {
    const user = await getUserFromToken(req.headers.authorization);
    if (!user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).json({ message: "Title and content are required" });
      return;
    }

    const [topic] = await db
      .insert(clanForumTopicsTable)
      .values({ title, content, authorId: user.id })
      .returning();

    res.status(201).json({
      ...topic,
      authorName: user.displayName,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create topic");
    res.status(500).json({ message: "Failed to create topic" });
  }
});

router.get("/clan/forum/topics/:id/replies", async (req, res) => {
  try {
    const user = await getUserFromToken(req.headers.authorization);
    if (!user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const topicId = parseInt(req.params.id);
    if (isNaN(topicId)) {
      res.status(400).json({ message: "Invalid topic ID" });
      return;
    }

    const replies = await db
      .select({
        id: clanForumRepliesTable.id,
        topicId: clanForumRepliesTable.topicId,
        content: clanForumRepliesTable.content,
        authorId: clanForumRepliesTable.authorId,
        authorName: usersTable.displayName,
        createdAt: clanForumRepliesTable.createdAt,
      })
      .from(clanForumRepliesTable)
      .leftJoin(usersTable, eq(clanForumRepliesTable.authorId, usersTable.id))
      .where(eq(clanForumRepliesTable.topicId, topicId))
      .orderBy(clanForumRepliesTable.createdAt);

    res.json(replies);
  } catch (err) {
    req.log.error({ err }, "Failed to list replies");
    res.status(500).json({ message: "Failed to list replies" });
  }
});

router.post("/clan/forum/topics/:id/replies", async (req, res) => {
  try {
    const user = await getUserFromToken(req.headers.authorization);
    if (!user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const topicId = parseInt(req.params.id);
    if (isNaN(topicId)) {
      res.status(400).json({ message: "Invalid topic ID" });
      return;
    }

    const { content } = req.body;
    if (!content) {
      res.status(400).json({ message: "Content is required" });
      return;
    }

    const [topic] = await db
      .select()
      .from(clanForumTopicsTable)
      .where(eq(clanForumTopicsTable.id, topicId))
      .limit(1);

    if (!topic) {
      res.status(404).json({ message: "Topic not found" });
      return;
    }

    if (topic.isLocked) {
      res.status(403).json({ message: "This topic is locked" });
      return;
    }

    const [reply] = await db
      .insert(clanForumRepliesTable)
      .values({ topicId, content, authorId: user.id })
      .returning();

    res.status(201).json({
      ...reply,
      authorName: user.displayName,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create reply");
    res.status(500).json({ message: "Failed to create reply" });
  }
});

router.delete("/clan/forum/topics/:topicId/replies/:replyId", async (req, res) => {
  try {
    const user = await getUserFromToken(req.headers.authorization);
    if (!user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const replyId = parseInt(req.params.replyId);
    if (isNaN(replyId)) {
      res.status(400).json({ message: "Invalid reply ID" });
      return;
    }

    const [reply] = await db
      .select()
      .from(clanForumRepliesTable)
      .where(eq(clanForumRepliesTable.id, replyId))
      .limit(1);

    if (!reply) {
      res.status(404).json({ message: "Reply not found" });
      return;
    }

    if (reply.authorId !== user.id && !user.isAdmin) {
      res.status(403).json({ message: "You can only delete your own replies" });
      return;
    }

    await db.delete(clanForumRepliesTable).where(eq(clanForumRepliesTable.id, replyId));
    res.json({ message: "Reply deleted" });
  } catch (err) {
    req.log.error({ err }, "Failed to delete reply");
    res.status(500).json({ message: "Failed to delete reply" });
  }
});

router.patch("/clan/forum/topics/:id", async (req, res) => {
  try {
    const user = await getUserFromToken(req.headers.authorization);
    if (!user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const topicId = parseInt(req.params.id);
    if (isNaN(topicId)) {
      res.status(400).json({ message: "Invalid topic ID" });
      return;
    }

    const [existing] = await db
      .select()
      .from(clanForumTopicsTable)
      .where(eq(clanForumTopicsTable.id, topicId))
      .limit(1);

    if (!existing) {
      res.status(404).json({ message: "Topic not found" });
      return;
    }

    if (existing.authorId !== user.id && !user.isAdmin) {
      res.status(403).json({ message: "You can only edit your own topics" });
      return;
    }

    const { title, content } = req.body;
    const updates: Record<string, unknown> = { updatedAt: new Date() };
    if (title) updates.title = title;
    if (content) updates.content = content;

    const [updated] = await db
      .update(clanForumTopicsTable)
      .set(updates)
      .where(eq(clanForumTopicsTable.id, topicId))
      .returning();

    res.json(updated);
  } catch (err) {
    req.log.error({ err }, "Failed to update topic");
    res.status(500).json({ message: "Failed to update topic" });
  }
});

router.delete("/clan/forum/topics/:id", async (req, res) => {
  try {
    const user = await getUserFromToken(req.headers.authorization);
    if (!user || !user.isAdmin) {
      res.status(403).json({ message: "Admin access required" });
      return;
    }

    const topicId = parseInt(req.params.id);
    if (isNaN(topicId)) {
      res.status(400).json({ message: "Invalid topic ID" });
      return;
    }

    const deleted = await db.delete(clanForumTopicsTable).where(eq(clanForumTopicsTable.id, topicId)).returning();
    if (deleted.length === 0) {
      res.status(404).json({ message: "Topic not found" });
      return;
    }
    res.json({ message: "Topic deleted" });
  } catch (err) {
    req.log.error({ err }, "Failed to delete topic");
    res.status(500).json({ message: "Failed to delete topic" });
  }
});

router.get("/clan/documents", async (req, res) => {
  try {
    const user = await getUserFromToken(req.headers.authorization);
    if (!user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const docs = await db
      .select({
        id: clanDocumentsTable.id,
        title: clanDocumentsTable.title,
        description: clanDocumentsTable.description,
        category: clanDocumentsTable.category,
        fileUrl: clanDocumentsTable.fileUrl,
        uploadedById: clanDocumentsTable.uploadedById,
        uploaderName: usersTable.displayName,
        createdAt: clanDocumentsTable.createdAt,
      })
      .from(clanDocumentsTable)
      .leftJoin(usersTable, eq(clanDocumentsTable.uploadedById, usersTable.id))
      .orderBy(desc(clanDocumentsTable.createdAt));

    res.json(docs);
  } catch (err) {
    req.log.error({ err }, "Failed to list documents");
    res.status(500).json({ message: "Failed to list documents" });
  }
});

router.post("/clan/documents", async (req, res) => {
  try {
    const user = await getUserFromToken(req.headers.authorization);
    if (!user || !user.isAdmin) {
      res.status(403).json({ message: "Admin access required" });
      return;
    }

    const { title, description, category, fileUrl } = req.body;
    if (!title || !category || !fileUrl) {
      res.status(400).json({ message: "Title, category, and file URL are required" });
      return;
    }

    const [doc] = await db
      .insert(clanDocumentsTable)
      .values({ title, description, category, fileUrl, uploadedById: user.id })
      .returning();

    res.status(201).json(doc);
  } catch (err) {
    req.log.error({ err }, "Failed to create document");
    res.status(500).json({ message: "Failed to create document" });
  }
});

router.delete("/clan/documents/:id", async (req, res) => {
  try {
    const user = await getUserFromToken(req.headers.authorization);
    if (!user || !user.isAdmin) {
      res.status(403).json({ message: "Admin access required" });
      return;
    }

    const docId = parseInt(req.params.id);
    if (isNaN(docId)) {
      res.status(400).json({ message: "Invalid document ID" });
      return;
    }

    const deleted = await db.delete(clanDocumentsTable).where(eq(clanDocumentsTable.id, docId)).returning();
    if (deleted.length === 0) {
      res.status(404).json({ message: "Document not found" });
      return;
    }
    res.json({ message: "Document deleted" });
  } catch (err) {
    req.log.error({ err }, "Failed to delete document");
    res.status(500).json({ message: "Failed to delete document" });
  }
});

export default router;
