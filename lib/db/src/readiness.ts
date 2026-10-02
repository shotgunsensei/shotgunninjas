import pg from "pg";

export const DATABASE_READY_TIMEOUT_MS = 1500;
let pendingProbe: Promise<boolean> | undefined;

async function probe(): Promise<boolean> {
  // A dedicated, short-lived connection keeps probes out of the application's
  // pool queue. Concurrent probes share one connection per process.
  const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 1000,
    query_timeout: 1000,
    statement_timeout: 1000,
    application_name: "shotgun-ninjas-readiness",
  });
  client.on("error", () => {});
  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    void client.end().catch(() => {});
  };
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const operation = (async () => {
      await client.connect();
      await client.query("SELECT 1");
      return true;
    })().catch(() => false);
    const deadline = new Promise<boolean>((resolve) => {
      timer = setTimeout(() => {
        close();
        resolve(false);
      }, DATABASE_READY_TIMEOUT_MS);
    });
    return await Promise.race([operation, deadline]);
  } finally {
    clearTimeout(timer);
    close();
  }
}

export function checkDatabaseReady(): Promise<boolean> {
  pendingProbe ??= probe()
    .catch(() => false)
    .finally(() => {
      pendingProbe = undefined;
    });
  return pendingProbe;
}
