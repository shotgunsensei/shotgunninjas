import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Request, Response } from "express";

const state = vi.hoisted(() => ({ query: vi.fn(), warn: vi.fn() }));
vi.mock("@workspace/db", () => ({ pool: { query: state.query } }));
vi.mock("../lib/logger", () => ({ logger: { warn: state.warn } }));
import { authAttemptKey } from "../lib/authAttemptKey";
import { rateLimit } from "../middlewares/rateLimit";

function request(email: unknown, forwarded = "198.51.100.10") {
  return {
    body: { email },
    headers: { "x-forwarded-for": forwarded },
    ip: "127.0.0.1",
    socket: { remoteAddress: "127.0.0.1" },
  } as unknown as Request;
}
async function invoke(
  middleware: ReturnType<typeof rateLimit>,
  req = request("owner@example.test"),
) {
  const response = { setHeader: vi.fn(), status: vi.fn(), json: vi.fn() };
  response.status.mockReturnValue(response);
  const next = vi.fn();
  middleware(req, response as unknown as Response, next);
  await new Promise<void>((resolve) => setImmediate(resolve));
  return { response, next };
}
const options = {
  scope: "auth:account",
  windowMs: 900_000,
  max: 20,
  identityKey: authAttemptKey,
  failClosed: true,
};

beforeEach(() => {
  state.query.mockReset();
  state.warn.mockReset();
});

describe("authentication attempt budget", () => {
  it("uses the same opaque account bucket despite case, whitespace or forged forwarding headers", () => {
    const first = authAttemptKey(
      request(" Owner@Example.Test ", "198.51.100.1"),
    );
    expect(first).toBe(
      authAttemptKey(request("owner@example.test", "203.0.113.2")),
    );
    expect(first).toMatch(/^account:[a-f0-9]{64}$/);
    expect(first).not.toContain("owner");
    expect(first).not.toBe(authAttemptKey(request("other@example.test")));
  });
  it("handles malformed identities without serializing their supplied values", () => {
    expect(authAttemptKey(request({ password: "do-not-store" }))).toBe(
      authAttemptKey(request(undefined)),
    );
  });
  it("admits the ordinary budget then rejects the next attempt even when forwarding headers change", async () => {
    let count = 0;
    state.query.mockImplementation(async (sql: string) =>
      sql.trim().startsWith("DELETE")
        ? { rows: [] }
        : {
            rows: [
              { count: ++count, reset_at: new Date(Date.now() + 900_000) },
            ],
          },
    );
    const middleware = rateLimit(options);
    for (let index = 0; index < 20; index++)
      expect(
        (
          await invoke(
            middleware,
            request("owner@example.test", `198.51.100.${index}`),
          )
        ).next,
      ).toHaveBeenCalledOnce();
    const denied = await invoke(
      middleware,
      request("owner@example.test", "203.0.113.200"),
    );
    expect(denied.next).not.toHaveBeenCalled();
    expect(denied.response.status).toHaveBeenCalledWith(429);
    const keys = state.query.mock.calls
      .filter(([sql]) => !sql.trim().startsWith("DELETE"))
      .map(([, values]) => values[0]);
    expect(new Set(keys).size).toBe(1);
  });
  it("fails closed before credential work when the budget store is unavailable", async () => {
    state.query.mockRejectedValue(new Error("Synthetic unavailable store"));
    const denied = await invoke(rateLimit(options));
    expect(denied.next).not.toHaveBeenCalled();
    expect(denied.response.status).toHaveBeenCalledWith(503);
  });
  it("fails closed on a missing budget result", async () => {
    state.query.mockResolvedValue({ rows: [] });
    const denied = await invoke(rateLimit(options));
    expect(denied.next).not.toHaveBeenCalled();
    expect(denied.response.status).toHaveBeenCalledWith(503);
  });
  it("preserves the explicitly existing fail-open policy for unrelated callers", async () => {
    state.query.mockRejectedValue(new Error("Synthetic unavailable store"));
    const existing = await invoke(
      rateLimit({ scope: "unrelated", windowMs: 1000, max: 2 }),
    );
    expect(existing.next).toHaveBeenCalledOnce();
    expect(existing.response.status).not.toHaveBeenCalled();
  });
});
