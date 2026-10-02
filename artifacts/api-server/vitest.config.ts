import { defineConfig } from "vitest/config";
import { createRequire } from "node:module";
import { testDatabaseUrl } from "./src/__tests__/testDatabase";

// Override DATABASE_URL before the app or its database module is imported.
process.env.DATABASE_URL = testDatabaseUrl(process.env.TEST_DATABASE_URL);

export default defineConfig({
  // Resolve the transitive driver from its owning workspace so probe mocks
  // and the database package use the same module under pnpm's strict layout.
  resolve: {
    alias: {
      pg: createRequire(
        new URL("../../lib/db/package.json", import.meta.url),
      ).resolve("pg"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    setupFiles: ["./src/__tests__/setup.ts"],
    testTimeout: 10000,
    hookTimeout: 10000,
  },
});
