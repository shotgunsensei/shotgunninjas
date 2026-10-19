import { describe, expect, it } from "vitest";
import { configuredAdminPasswordMatches } from "../lib/adminPassword";

describe("configured repository admin password", () => {
  it("rejects missing or empty configuration even when the header matches", () => {
    expect(configuredAdminPasswordMatches(undefined, undefined)).toBe(false);
    expect(configuredAdminPasswordMatches("", "")).toBe(false);
    expect(configuredAdminPasswordMatches(null, null)).toBe(false);
  });

  it("requires a single exact nonempty password", () => {
    expect(configuredAdminPasswordMatches("secret", "secret")).toBe(true);
    expect(configuredAdminPasswordMatches("secret", undefined)).toBe(false);
    expect(configuredAdminPasswordMatches("secret", ["secret"])).toBe(false);
    expect(configuredAdminPasswordMatches("secret", "wrong")).toBe(false);
    expect(configuredAdminPasswordMatches(" secret ", " secret ")).toBe(true);
    expect(configuredAdminPasswordMatches(" secret ", "secret")).toBe(false);
  });
});
