import { createHash } from "node:crypto";
import type { Request } from "express";

/** Throttling identity only; account lookup and authentication remain authoritative. */
export function authAttemptKey(req: Pick<Request, "body">): string {
  const supplied = req.body?.email;
  const email =
    typeof supplied === "string" ? supplied.trim().toLowerCase() : "<invalid>";
  // Never persist a raw email/password in the rate-limit bucket or trust a
  // caller-supplied forwarding header to reset the account's attempt budget.
  return `account:${createHash("sha256").update(email).digest("hex")}`;
}
