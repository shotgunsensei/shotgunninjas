import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  checkDatabaseReady,
  DATABASE_READY_TIMEOUT_MS,
} from "@workspace/db/readiness";

const client = vi.hoisted(() => ({
  connect: vi.fn(),
  query: vi.fn(),
  end: vi.fn(),
  on: vi.fn(),
}));
const Client = vi.hoisted(() =>
  vi.fn(function () {
    return client;
  }),
);
vi.mock("pg", () => ({ default: { Client } }));

beforeEach(() => {
  vi.useFakeTimers();
  vi.clearAllMocks();
  client.connect.mockResolvedValue(undefined);
  client.query.mockResolvedValue({ rows: [{ value: 1 }] });
  client.end.mockResolvedValue(undefined);
});
afterEach(() => {
  vi.useRealTimers();
});

describe("bounded database readiness probe", () => {
  it("treats connection configuration errors as unavailable", async () => {
    Client.mockImplementationOnce(function () {
      throw new Error("private connection info");
    });
    expect(await checkDatabaseReady()).toBe(false);
  });

  it("checks connectivity and releases its connection", async () => {
    expect(await checkDatabaseReady()).toBe(true);
    expect(client.query).toHaveBeenCalledWith("SELECT 1");
    expect(client.end).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(0);
  });

  it.each(["connect", "query"] as const)(
    "handles %s failures without returning connection details",
    async (stage) => {
      client[stage].mockRejectedValueOnce(new Error("private connection info"));
      expect(await checkDatabaseReady()).toBe(false);
      expect(client.end).toHaveBeenCalledTimes(1);
      expect(vi.getTimerCount()).toBe(0);
    },
  );

  it.each(["connect", "query"] as const)(
    "bounds stalled %s, shares concurrent probes, and recovers",
    async (stage) => {
      client[stage].mockReturnValueOnce(new Promise(() => {}));
      const first = checkDatabaseReady();
      const second = checkDatabaseReady();
      expect(second).toBe(first);
      await vi.advanceTimersByTimeAsync(DATABASE_READY_TIMEOUT_MS);
      expect(await first).toBe(false);
      expect(Client).toHaveBeenCalledTimes(1);
      expect(client.end).toHaveBeenCalledTimes(1);
      expect(vi.getTimerCount()).toBe(0);
      expect(await checkDatabaseReady()).toBe(true);
      expect(Client).toHaveBeenCalledTimes(2);
    },
  );
});
