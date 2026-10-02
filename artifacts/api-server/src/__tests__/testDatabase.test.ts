import { expect, it } from "vitest";
import { testDatabaseUrl } from "./testDatabase";

it.each([
  undefined,
  "postgres://localhost/production",
  "postgres://db.example.com/shotgun_ninjas_test",
  "postgres://localhost/shotgun_ninjas_test?host=db.example.com",
])("refuses unsafe test database configuration: %s", (value) => {
  expect(() => testDatabaseUrl(value)).toThrow();
});

it("accepts the named disposable loopback database", () => {
  const url = "postgres://localhost:5432/shotgun_ninjas_test";
  expect(testDatabaseUrl(url)).toBe(url);
});
