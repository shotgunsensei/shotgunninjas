export function testDatabaseUrl(value: string | undefined): string {
  if (!value)
    throw new Error(
      "TEST_DATABASE_URL must identify a disposable local database",
    );
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(
      "TEST_DATABASE_URL must be a valid disposable local database URL",
    );
  }
  if (
    !["postgres:", "postgresql:"].includes(url.protocol) ||
    !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) ||
    url.pathname !== "/shotgun_ninjas_test" ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "Tests require a loopback shotgun_ninjas_test database without URL options",
    );
  }
  return value;
}
