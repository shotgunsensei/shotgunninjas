import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../app";

describe("API smoke tests", () => {
  beforeAll(() => {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL must be set for tests");
    }
  });

  describe("GET /api/healthz", () => {
    it("returns 200 with status payload", async () => {
      const res = await request(app).get("/api/healthz");
      expect(res.status).toBe(200);
      expect(res.body).toBeTruthy();
    });
  });

  describe("POST /api/newsletter/subscribe", () => {
    it("accepts a valid email", async () => {
      const email = `smoke+${Date.now()}@example.com`;
      const res = await request(app)
        .post("/api/newsletter/subscribe")
        .send({ email, source: "vitest" })
        .set("Content-Type", "application/json");
      expect(res.status).toBe(200);
      expect(res.body.message).toBeTruthy();
    });

    it("rejects an invalid email", async () => {
      const res = await request(app)
        .post("/api/newsletter/subscribe")
        .send({ email: "not-an-email" })
        .set("Content-Type", "application/json");
      expect(res.status).toBe(400);
    });
  });

  describe("POST /api/contact", () => {
    it("accepts a valid submission", async () => {
      const res = await request(app)
        .post("/api/contact")
        .send({
          name: "Smoke Test",
          email: `smoke+${Date.now()}@example.com`,
          type: "general",
          message: "Automated smoke test message — please ignore.",
        })
        .set("Content-Type", "application/json");
      expect([200, 429]).toContain(res.status);
    });

    it("rejects missing fields", async () => {
      const res = await request(app)
        .post("/api/contact")
        .send({ email: "x@y.com" })
        .set("Content-Type", "application/json");
      expect([400, 429]).toContain(res.status);
    });
  });

  describe("POST /api/track/outbound", () => {
    it("accepts a valid outbound click", async () => {
      const res = await request(app)
        .post("/api/track/outbound")
        .send({ url: "https://example.com/test", source: "vitest" })
        .set("Content-Type", "application/json");
      expect(res.status).toBe(204);
    });

    it("silently drops malformed input (still 204)", async () => {
      const res = await request(app)
        .post("/api/track/outbound")
        .send({ url: "not-a-url", source: "" })
        .set("Content-Type", "application/json");
      expect(res.status).toBe(204);
    });
  });

  describe("GET /api/newsletter/unsubscribe", () => {
    it("returns 400 when token is missing", async () => {
      const res = await request(app).get("/api/newsletter/unsubscribe");
      expect(res.status).toBe(400);
    });

    it("returns 404 for unknown token", async () => {
      const res = await request(app).get(
        "/api/newsletter/unsubscribe?token=" + "0".repeat(48),
      );
      expect(res.status).toBe(404);
    });
  });
});
