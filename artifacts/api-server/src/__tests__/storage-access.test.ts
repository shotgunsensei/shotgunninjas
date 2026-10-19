import express from "express";
import request from "supertest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const fixture = vi.hoisted(() => ({
  repositoryReferences: vi.fn(), songReferences: vi.fn(), clanReferences: vi.fn(), validClanSession: vi.fn(),
  getObjectEntityFile: vi.fn(), downloadObject: vi.fn(),
}));

vi.mock("../lib/privateObjectAccess", () => ({ privateObjectLookups: fixture }));
vi.mock("../lib/objectStorage", () => ({
  ObjectNotFoundError: class extends Error {},
  ObjectStorageService: class {
    getObjectEntityFile = fixture.getObjectEntityFile;
    downloadObject = fixture.downloadObject;
  },
}));

import router from "../routes/storage";

const app = express();
app.use((_req, res, next) => { res.vary("Origin"); next(); });
app.use((req, _res, next) => {
  req.log = { error: vi.fn(), warn: vi.fn() } as unknown as typeof req.log;
  next();
});
app.use("/api", router);
const objectUrl = "/api/storage/objects/uploads/test-key";

describe("private object HTTP boundary (mocked records and provider)", () => {
  beforeEach(() => {
    vi.stubEnv("SOUND_STUDIO_ADMIN_PASSWORD", "test-admin");
    vi.resetAllMocks();
    fixture.repositoryReferences.mockResolvedValue(false);
    fixture.songReferences.mockResolvedValue(false);
    fixture.clanReferences.mockResolvedValue(false);
    fixture.validClanSession.mockResolvedValue(false);
    fixture.getObjectEntityFile.mockResolvedValue({ name: "test-key" });
    fixture.downloadObject.mockImplementation(async () => new Response("test audio", {
      headers: { "Cache-Control": "public, max-age=3600", "Content-Type": "audio/wav" },
    }));
  });
  afterEach(() => vi.unstubAllEnvs());

  function expectNoObjectAccess() {
    expect(fixture.getObjectEntityFile).not.toHaveBeenCalled();
    expect(fixture.downloadObject).not.toHaveBeenCalled();
  }

  it("denies anonymous repository reads before opening a provider object", async () => {
    fixture.repositoryReferences.mockResolvedValue(true);
    const response = await request(app).get(objectUrl);
    expect(response.status).toBe(403);
    expectNoObjectAccess();
  });

  it("gives repository privacy precedence over public and clan records", async () => {
    fixture.repositoryReferences.mockResolvedValue(true);
    fixture.songReferences.mockResolvedValue(true);
    fixture.clanReferences.mockResolvedValue(true);
    fixture.validClanSession.mockResolvedValue(true);
    expect((await request(app).get(objectUrl).set("Authorization", "Bearer member")).status).toBe(403);
    expectNoObjectAccess();
  });

  it("allows shared administrators and overrides provider public cache headers", async () => {
    const response = await request(app).get(objectUrl).set("X-Admin-Password", "test-admin");
    expect(response.status).toBe(200);
    expect(response.headers["cache-control"]).toBe("private, no-store");
    expect(response.headers.vary).toContain("Origin");
    expect(response.headers.vary).toContain("Authorization");
    expect(response.headers.vary).toContain("X-Admin-Password");
    expect(fixture.getObjectEntityFile).toHaveBeenCalledWith("/objects/uploads/test-key");
  });

  it("preserves anonymous song streams while rechecking mutable publication on later requests", async () => {
    fixture.songReferences.mockResolvedValue(true);
    const response = await request(app).get(objectUrl);
    expect(response.status).toBe(200);
    expect(response.headers["cache-control"]).toBe("private, no-store");
    fixture.repositoryReferences.mockResolvedValue(true);
    expect((await request(app).get(objectUrl)).status).toBe(403);
    expect(fixture.getObjectEntityFile).toHaveBeenCalledTimes(1);
    expect(fixture.downloadObject).toHaveBeenCalledTimes(1);
  });

  it("requires a current member for clan documents", async () => {
    fixture.clanReferences.mockResolvedValue(true);
    expect((await request(app).get(objectUrl)).status).toBe(403);
    expectNoObjectAccess();
    fixture.validClanSession.mockResolvedValue(true);
    expect((await request(app).get(objectUrl).set("Authorization", "Bearer member")).status).toBe(200);
    expect(fixture.validClanSession).toHaveBeenLastCalledWith("Bearer member");
  });

  it("denies unregistered uploads without consulting their optional ACL", async () => {
    expect((await request(app).get(objectUrl)).status).toBe(403);
    expectNoObjectAccess();
  });

  it("fails closed before storage when the record lookup fails", async () => {
    fixture.repositoryReferences.mockRejectedValueOnce(new Error("Unavailable"));
    expect((await request(app).get(objectUrl)).status).toBe(500);
    expectNoObjectAccess();
  });
});
