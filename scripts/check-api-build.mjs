import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import { setTimeout as delay } from "node:timers/promises";

assert.match(
  process.env.BUILD_SHA ?? "",
  /^[a-f0-9]{40}$/i,
  "Set BUILD_SHA to the commit used for the API build",
);

// No published ports or live database connections: simulate a stalled database.
const sockets = new Set();
const database = createServer((socket) => {
  sockets.add(socket);
  socket.on("close", () => sockets.delete(socket));
  socket.on("error", () => {});
});
await new Promise((resolve) => database.listen(0, "127.0.0.1", resolve));
const databasePort = database.address().port;
const reservation = createServer();
await new Promise((resolve) => reservation.listen(0, "127.0.0.1", resolve));
const apiPort = reservation.address().port;
await new Promise((resolve) => reservation.close(resolve));

const child = spawn(process.execPath, ["artifacts/api-server/dist/index.mjs"], {
  env: {
    ...process.env,
    PORT: String(apiPort),
    NODE_ENV: "production",
    DATABASE_URL: `postgres://test:test@127.0.0.1:${databasePort}/shotgun_ninjas_test`,
  },
  stdio: ["ignore", "pipe", "pipe"],
});
let output = "";
child.stdout.on("data", (chunk) => {
  output = (output + chunk).slice(-4000);
});
child.stderr.on("data", (chunk) => {
  output = (output + chunk).slice(-4000);
});
const base = `http://127.0.0.1:${apiPort}/api`;
try {
  let version;
  const startupDeadline = performance.now() + 30000;
  while (performance.now() < startupDeadline) {
    if (child.exitCode !== null)
      throw new Error(`API exited before startup: ${output}`);
    try {
      version = await fetch(`${base}/version`, {
        signal: AbortSignal.timeout(500),
      });
      break;
    } catch {
      await delay(50);
    }
  }
  assert.ok(version, `API failed to start: ${output}`);
  assert.equal(version.status, 200);
  assert.deepEqual(await version.json(), {
    sha: process.env.BUILD_SHA.toLowerCase(),
  });
  assert.equal(version.headers.get("cache-control"), "no-store");
  const started = performance.now();
  const ready = await fetch(`${base}/readyz`, {
    signal: AbortSignal.timeout(2500),
  });
  const elapsed = Math.round(performance.now() - started);
  assert.equal(ready.status, 503);
  assert.deepEqual(await ready.json(), { status: "unavailable" });
  assert.ok(
    elapsed < 2000,
    `Readiness exceeded its bounded deadline: ${elapsed}ms`,
  );
  const live = await fetch(`${base}/healthz`);
  assert.equal(live.status, 200);
  assert.deepEqual(await live.json(), { status: "ok" });
  console.log(
    `Built API verified: SHA ${process.env.BUILD_SHA}, stalled database 503 in ${elapsed}ms, liveness 200`,
  );
} finally {
  const exited =
    child.exitCode === null ? once(child, "exit") : Promise.resolve();
  child.kill("SIGTERM");
  const force = setTimeout(() => child.kill("SIGKILL"), 2000);
  await exited;
  clearTimeout(force);
  for (const socket of sockets) socket.destroy();
  await new Promise((resolve) => database.close(resolve));
}
