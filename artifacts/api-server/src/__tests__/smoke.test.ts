import { randomUUID } from "node:crypto";
import { afterAll, afterEach, beforeEach, describe, it, expect } from "vitest";
import request from "supertest";
import { eq, inArray } from "drizzle-orm";
import { db, pool } from "@workspace/db";
import {
  contactMessagesTable,
  newsletterSubscribersTable,
  outboundClicksTable,
  rateLimitBucketsTable,
} from "@workspace/db/schema";
import app from "../app";

describe("API persistence smoke tests (disposable database only)", () => {
  let client: string;
  let email: string;
  let source: string;
  let contact: { name: string; email: string; type: string; message: string };

  beforeEach(() => {
    const id = randomUUID();
    client = `test-${id}`;
    email = `test+${id}@example.com`;
    source = `vitest-${id}`;
    contact = {
      name: source,
      email,
      type: "general",
      message: "Local test fixture",
    };
  });

  afterEach(async () => {
    // Only remove this test's fixtures; never truncate shared tables.
    await db
      .delete(contactMessagesTable)
      .where(eq(contactMessagesTable.email, email));
    await db
      .delete(newsletterSubscribersTable)
      .where(eq(newsletterSubscribersTable.email, email));
    await db
      .delete(outboundClicksTable)
      .where(eq(outboundClicksTable.source, source));
    await db.delete(rateLimitBucketsTable).where(
      inArray(
        rateLimitBucketsTable.key,
        ["contact:submit", "newsletter:subscribe", "track:outbound"].map(
          (scope) => `${scope}:${client}`,
        ),
      ),
    );
  });
  afterAll(async () => {
    await pool.end();
  });

  const post = (path: string, body: object) =>
    request(app).post(path).set("X-Forwarded-For", client).send(body);
  const contacts = () =>
    db
      .select()
      .from(contactMessagesTable)
      .where(eq(contactMessagesTable.email, email));
  const subscribers = () =>
    db
      .select()
      .from(newsletterSubscribersTable)
      .where(eq(newsletterSubscribersTable.email, email));

  it("keeps liveness cheap and reports database readiness", async () => {
    const live = await request(app).get("/api/healthz");
    expect(live.status).toBe(200);
    expect(live.body).toEqual({ status: "ok" });
    const ready = await request(app).get("/api/readyz");
    expect(ready.status).toBe(200);
    expect(ready.body).toEqual({ status: "ok" });
    expect(ready.headers["cache-control"]).toBe("no-store");
  });

  it("reports an unstamped identity in source-mode tests", async () => {
    const res = await request(app).get("/api/version");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ sha: null });
    expect(res.headers["cache-control"]).toBe("no-store");
  });

  describe("POST /api/contact", () => {
    it("returns 200 only after persisting every valid field", async () => {
      const res = await post("/api/contact", contact);
      expect(res.status).toBe(200);
      expect(res.body.message).toBeTruthy();
      const rows = await contacts();
      expect(rows).toHaveLength(1);
      expect(rows[0]).toMatchObject(contact);
    });

    it("returns 400 for missing fields without persisting a lead", async () => {
      expect((await post("/api/contact", { email })).status).toBe(400);
      expect(await contacts()).toHaveLength(0);
    });

    it("returns 400 for an invalid email without persisting a lead", async () => {
      expect(
        (await post("/api/contact", { ...contact, email: "not-an-email" }))
          .status,
      ).toBe(400);
      expect(
        await db
          .select()
          .from(contactMessagesTable)
          .where(eq(contactMessagesTable.name, source)),
      ).toHaveLength(0);
    });

    it("throttles the fourth request separately and persists only three leads", async () => {
      for (let i = 0; i < 3; i++) {
        expect((await post("/api/contact", contact)).status).toBe(200);
      }
      const limited = await post("/api/contact", contact);
      expect(limited.status).toBe(429);
      expect(Number(limited.headers["retry-after"])).toBeGreaterThan(0);
      expect(limited.headers["x-ratelimit-remaining"]).toBe("0");
      expect(await contacts()).toHaveLength(3);
      const [bucket] = await db
        .select()
        .from(rateLimitBucketsTable)
        .where(eq(rateLimitBucketsTable.key, `contact:submit:${client}`));
      expect(bucket?.count).toBe(4);
    });
  });

  describe("newsletter persistence", () => {
    it("stores a normalized subscriber and preserves its token on duplicate signup", async () => {
      expect(
        (
          await post("/api/newsletter/subscribe", {
            email: email.toUpperCase(),
            source,
          })
        ).status,
      ).toBe(200);
      const [first] = await subscribers();
      expect(first).toMatchObject({ email, source, unsubscribedAt: null });
      expect(first?.unsubscribeToken).toMatch(/^[a-f0-9]{48}$/);
      expect(
        (
          await post("/api/newsletter/subscribe", {
            email,
            source: "duplicate",
          })
        ).status,
      ).toBe(200);
      expect(await subscribers()).toEqual([first]);
    });

    it("returns 400 for an invalid email without inserting a subscriber", async () => {
      const res = await post("/api/newsletter/subscribe", {
        email: "not-an-email",
        source,
      });
      expect(res.status).toBe(400);
      expect(
        await db
          .select()
          .from(newsletterSubscribersTable)
          .where(eq(newsletterSubscribersTable.source, source)),
      ).toHaveLength(0);
    });

    it("persists unsubscribe, keeps repeat requests idempotent, and preserves the opt-out on duplicate signup", async () => {
      expect(
        (await post("/api/newsletter/subscribe", { email, source })).status,
      ).toBe(200);
      const [first] = await subscribers();
      const unsubscribe = () =>
        request(app)
          .get("/api/newsletter/unsubscribe")
          .query({ token: first!.unsubscribeToken });
      expect((await unsubscribe()).status).toBe(200);
      const [unsubscribed] = await subscribers();
      expect(unsubscribed?.unsubscribedAt).toBeInstanceOf(Date);
      expect((await unsubscribe()).status).toBe(200);
      expect(await subscribers()).toEqual([unsubscribed]);
      expect(
        (await post("/api/newsletter/subscribe", { email, source })).status,
      ).toBe(200);
      expect(await subscribers()).toEqual([unsubscribed]);
    });

    it("returns 400 when the unsubscribe token is missing", async () => {
      expect(
        (await request(app).get("/api/newsletter/unsubscribe")).status,
      ).toBe(400);
    });

    it("returns 404 for an unknown token", async () => {
      expect(
        (
          await request(app)
            .get("/api/newsletter/unsubscribe")
            .query({ token: "0".repeat(48) })
        ).status,
      ).toBe(404);
    });
  });

  describe("POST /api/track/outbound", () => {
    it("records a valid outbound click", async () => {
      const url = "https://example.com/test";
      expect((await post("/api/track/outbound", { url, source })).status).toBe(
        204,
      );
      const rows = await db
        .select()
        .from(outboundClicksTable)
        .where(eq(outboundClicksTable.source, source));
      expect(rows).toHaveLength(1);
      expect(rows[0]).toMatchObject({ url, source });
    });

    it("silently drops malformed input without persisting a click", async () => {
      expect(
        (await post("/api/track/outbound", { url: "not-a-url", source }))
          .status,
      ).toBe(204);
      expect(
        await db
          .select()
          .from(outboundClicksTable)
          .where(eq(outboundClicksTable.source, source)),
      ).toHaveLength(0);
    });
  });
});
