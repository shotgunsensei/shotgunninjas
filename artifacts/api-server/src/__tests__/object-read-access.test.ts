import { describe, expect, it, vi } from "vitest";
import { objectReadAccess, privateObjectAliases, type ObjectReadLookups } from "../lib/objectReadAccess";

function lookups({ repository = false, song = false, clan = false, member = false } = {}): ObjectReadLookups {
  return {
    repositoryReferences: vi.fn(async () => repository),
    songReferences: vi.fn(async () => song),
    clanReferences: vi.fn(async () => clan),
    validClanSession: vi.fn(async () => member),
  };
}

function check(references: ObjectReadLookups, providedPassword: unknown = undefined, configuredPassword: unknown = "configured") {
  return objectReadAccess({ wildcardPath: "uploads/key", configuredPassword, providedPassword,
    authorization: "Bearer member", lookups: references });
}

describe("private object read policy", () => {
  it("matches all three existing web-client object reference forms", () => {
    expect(privateObjectAliases("uploads/key")).toEqual(["/objects/uploads/key", "uploads/key", "/uploads/key"]);
  });

  it.each([undefined, "public/key", "uploads/", "uploads//key", "uploads/./key", "uploads/../key", "uploads/a\\b", "uploads/a\u0000b"])(
    "rejects a noncanonical path %j before lookups", async (wildcardPath) => {
      const references = lookups({ song: true });
      expect(await objectReadAccess({ wildcardPath, configuredPassword: "configured", providedPassword: "configured",
        authorization: undefined, lookups: references })).toBeNull();
      expect(references.repositoryReferences).not.toHaveBeenCalled();
    },
  );

  it("allows the configured shared administrator without granting clan administrators that authority", async () => {
    const references = lookups({ repository: true, member: true });
    expect(await check(references)).toBeNull();
    expect(await check(references, "configured")).toBe("private");
    expect(references.validClanSession).not.toHaveBeenCalled();
  });

  it.each([undefined, "", "wrong", ["configured"]])("rejects invalid repository password %j", async (password) => {
    expect(await check(lookups({ repository: true }), password)).toBeNull();
  });

  it("rejects empty configuration even with an empty submitted password", async () => {
    expect(await check(lookups({ repository: true }), "", "")).toBeNull();
  });

  it("denies repository objects even when registered as songs or clan documents", async () => {
    expect(await check(lookups({ repository: true, song: true, clan: true, member: true }))).toBeNull();
  });

  it("keeps explicitly published songs available anonymously", async () => {
    const references = lookups({ song: true, clan: true });
    expect(await check(references)).toBe("public");
    expect(references.repositoryReferences).toHaveBeenCalledWith(["/objects/uploads/key", "uploads/key", "/uploads/key"]);
    expect(references.validClanSession).not.toHaveBeenCalled();
  });

  it("requires a valid session for clan documents", async () => {
    expect(await check(lookups({ clan: true, member: true }))).toBe("private");
    expect(await check(lookups({ clan: true }))).toBeNull();
  });

  it("denies unregistered uploads to ordinary members", async () => {
    expect(await check(lookups({ member: true }))).toBeNull();
    expect(await check(lookups(), "configured")).toBe("private");
  });

  it("fails closed when reference lookup fails", async () => {
    const references = lookups({ song: true });
    vi.mocked(references.repositoryReferences).mockRejectedValueOnce(new Error("Unavailable"));
    await expect(check(references)).rejects.toThrow("Unavailable");
    expect(references.songReferences).not.toHaveBeenCalled();
  });
});
