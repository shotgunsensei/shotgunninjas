import { Router, type IRouter, type Request, type Response } from "express";
import { db } from "@workspace/db";
import { repositoryFilesTable } from "@workspace/db/schema";
import { eq, desc } from "drizzle-orm";
import {
  RequestRepositoryUploadUrlBody,
  RequestRepositoryUploadUrlResponse,
  ListRepositoryFilesResponse,
  SaveRepositoryFileBody,
  DeleteRepositoryFileParams,
  DeleteRepositoryFileResponse,
  GetRepositoryDownloadUrlResponse,
} from "@workspace/api-zod";
import { ObjectStorageService, ObjectNotFoundError } from "../lib/objectStorage";

const router: IRouter = Router();
const objectStorageService = new ObjectStorageService();

// 6 hours — long enough to upload large (up to 5GB) files on slow connections.
const REPOSITORY_UPLOAD_TTL_SEC = 6 * 60 * 60;

// Maximum allowed file size: 5GB.
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024 * 1024;

function isAdmin(headerPassword: unknown): boolean {
  const serverPassword = process.env.SOUND_STUDIO_ADMIN_PASSWORD;
  return typeof serverPassword === "string" && headerPassword === serverPassword;
}

function isValidSize(size: number): boolean {
  return Number.isFinite(size) && size > 0 && size <= MAX_FILE_SIZE_BYTES;
}

/**
 * POST /repository/uploads/request-url
 *
 * Request a long-lived presigned PUT URL so the browser can upload a file
 * (up to 5GB) directly to object storage without proxying through the API.
 */
router.post("/repository/uploads/request-url", async (req: Request, res: Response) => {
  if (!isAdmin(req.headers["x-admin-password"])) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }

  const parsed = RequestRepositoryUploadUrlBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Missing or invalid required fields" });
    return;
  }

  if (!isValidSize(parsed.data.size)) {
    res.status(400).json({ message: "File exceeds the maximum allowed size of 5GB" });
    return;
  }

  try {
    const uploadURL = await objectStorageService.getObjectEntityUploadURL(
      REPOSITORY_UPLOAD_TTL_SEC,
    );
    const objectPath = objectStorageService.normalizeObjectEntityPath(uploadURL);
    res.json(RequestRepositoryUploadUrlResponse.parse({ uploadURL, objectPath }));
  } catch (err) {
    req.log.error({ err }, "Failed to generate repository upload URL");
    res.status(500).json({ message: "Failed to generate upload URL" });
  }
});

/**
 * GET /repository/files
 *
 * List all repository files (admin only), newest first.
 */
router.get("/repository/files", async (req: Request, res: Response) => {
  if (!isAdmin(req.headers["x-admin-password"])) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }

  try {
    const files = await db
      .select()
      .from(repositoryFilesTable)
      .orderBy(desc(repositoryFilesTable.createdAt));

    const result = ListRepositoryFilesResponse.parse(
      files.map((f) => ({
        id: f.id,
        name: f.name,
        size: f.size,
        contentType: f.contentType,
        fileUrl: f.fileUrl,
        createdAt: f.createdAt.toISOString(),
      })),
    );
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to list repository files");
    res.status(500).json({ message: "Failed to list repository files" });
  }
});

/**
 * POST /repository/files
 *
 * Save metadata for a file that was already uploaded to object storage.
 */
router.post("/repository/files", async (req: Request, res: Response) => {
  try {
    const body = SaveRepositoryFileBody.parse(req.body);
    if (!isAdmin(body.adminPassword)) {
      res.status(403).json({ message: "Invalid admin password" });
      return;
    }

    if (!isValidSize(body.size)) {
      res.status(400).json({ message: "File exceeds the maximum allowed size of 5GB" });
      return;
    }

    const [file] = await db
      .insert(repositoryFilesTable)
      .values({
        name: body.name,
        size: body.size,
        contentType: body.contentType,
        fileUrl: body.fileUrl,
      })
      .returning();

    res.status(201).json({
      id: file.id,
      name: file.name,
      size: file.size,
      contentType: file.contentType,
      fileUrl: file.fileUrl,
      createdAt: file.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to save repository file");
    res.status(400).json({ message: "Failed to save repository file" });
  }
});

/**
 * GET /repository/files/:id/download-url
 *
 * Return a short-lived presigned GET URL so the browser can download the file
 * directly from object storage (admin only, validated via the x-admin-password
 * header). Streaming large files through the API server does not work on the
 * Autoscale deployment — the proxy terminates multi-GB responses — so we hand
 * the browser a direct-to-storage URL instead. The object's Content-Disposition
 * metadata is set so the download keeps its original filename.
 */
router.get(
  "/repository/files/:id/download-url",
  async (req: Request, res: Response) => {
    if (!isAdmin(req.headers["x-admin-password"])) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ message: "Invalid file id" });
      return;
    }

    try {
      const [file] = await db
        .select()
        .from(repositoryFilesTable)
        .where(eq(repositoryFilesTable.id, id))
        .limit(1);

      if (!file) {
        res.status(404).json({ message: "File not found" });
        return;
      }

      // Best-effort: set Content-Disposition so the direct download keeps the
      // original filename. If this fails, the download still works (the file
      // would just download under its storage UUID), so don't block on it.
      try {
        await objectStorageService.setObjectEntityDownloadMetadata(
          file.fileUrl,
          file.name,
          file.contentType || undefined,
        );
      } catch (metaErr) {
        req.log.warn(
          { err: metaErr, fileUrl: file.fileUrl },
          "Failed to set download filename metadata; continuing",
        );
      }

      const downloadURL = await objectStorageService.getObjectEntityDownloadURL(
        file.fileUrl,
      );

      res.json(GetRepositoryDownloadUrlResponse.parse({ downloadURL }));
    } catch (err) {
      if (err instanceof ObjectNotFoundError) {
        res.status(404).json({ message: "File not found" });
        return;
      }
      req.log.error({ err }, "Failed to generate repository download URL");
      res.status(500).json({ message: "Failed to generate download URL" });
    }
  },
);

/**
 * DELETE /repository/files/:id
 *
 * Delete a repository file (admin only) — removes the DB row and the
 * underlying object from storage.
 */
router.delete("/repository/files/:id", async (req: Request, res: Response) => {
  if (!isAdmin(req.headers["x-admin-password"])) {
    res.status(403).json({ message: "Invalid admin password" });
    return;
  }

  try {
    const params = DeleteRepositoryFileParams.parse({ id: req.params.id });

    const [deleted] = await db
      .delete(repositoryFilesTable)
      .where(eq(repositoryFilesTable.id, params.id))
      .returning();

    if (!deleted) {
      res.status(404).json({ message: "File not found" });
      return;
    }

    if (deleted.fileUrl) {
      try {
        await objectStorageService.deleteObjectEntity(deleted.fileUrl);
      } catch (storageErr) {
        req.log.warn(
          { err: storageErr, fileUrl: deleted.fileUrl },
          "Failed to delete repository file from storage",
        );
      }
    }

    const result = DeleteRepositoryFileResponse.parse({ message: "File deleted" });
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to delete repository file");
    res.status(400).json({ message: "Failed to delete repository file" });
  }
});

export default router;
