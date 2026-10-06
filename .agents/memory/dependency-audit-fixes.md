---
name: Dependency audit fixes
description: Safe handling of pnpm's generated security overrides in this workspace.
---

Consolidate automatic security overrides to the strictest patched minimum within a compatible release line, then regenerate the lockfile.

**Why:** Running pnpm's audit auto-fix generated multiple overlapping selectors for the same packages with unbounded `>=` replacement ranges. It only changed workspace configuration, leaving the vulnerable lockfile unchanged until installation. Unbounded replacements can also select incompatible major releases.

**How to apply:** Run the requested per-manifest audits, inspect their generated overrides, prefer direct dependency/catalog updates for top-level packages, and preserve compatible release lines for transitive fixes. Check the regenerated lockfile and run a fresh dependency audit rather than treating auto-fix output as proof of remediation.