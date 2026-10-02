import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";
import { checkDatabaseReady } from "@workspace/db/readiness";
import { buildIdentity } from "../lib/buildIdentity";

const router: IRouter = Router();

router.get("/healthz", (_req, res) => {
  res.set("Cache-Control", "no-store");
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

router.get("/readyz", async (_req, res) => {
  res.set("Cache-Control", "no-store");
  const ready = await checkDatabaseReady();
  res.status(ready ? 200 : 503).json({ status: ready ? "ok" : "unavailable" });
});

router.get("/version", (_req, res) => {
  res.set("Cache-Control", "no-store");
  res.json(buildIdentity);
});

export default router;
