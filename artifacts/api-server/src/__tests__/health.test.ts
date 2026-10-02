import { afterEach, describe, expect, it, vi } from "vitest";
import express from "express";
import request from "supertest";
import { checkDatabaseReady } from "@workspace/db/readiness";
import healthRouter from "../routes/health";

vi.mock("@workspace/db/readiness", () => ({ checkDatabaseReady: vi.fn() }));
const app = express().use("/api", healthRouter);
afterEach(() => {
  vi.clearAllMocks();
});

describe("health routes with an unavailable database", () => {
  it("returns 503 with only a generic status and disables caching", async () => {
    vi.mocked(checkDatabaseReady).mockResolvedValue(false);
    const res = await request(app).get("/api/readyz");
    expect(res.status).toBe(503);
    expect(res.body).toEqual({ status: "unavailable" });
    expect(res.headers["cache-control"]).toBe("no-store");
  });

  it("still serves liveness and identity without touching the database", async () => {
    expect((await request(app).get("/api/healthz")).body).toEqual({
      status: "ok",
    });
    expect((await request(app).get("/api/version")).body).toEqual({
      sha: null,
    });
    expect(checkDatabaseReady).not.toHaveBeenCalled();
  });
});
