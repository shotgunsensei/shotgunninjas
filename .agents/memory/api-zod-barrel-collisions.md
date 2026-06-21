---
name: api-zod barrel collisions
description: Why `pnpm run typecheck` (tsc --build) can fail in lib/api-zod after codegen, and how to fix it.
---

# api-zod duplicate-export collisions

`lib/api-zod/src/index.ts` is hand-maintained and does `export * from "./generated/api"` (zod
schema consts) and `export * from "./generated/types"` (TS interfaces). When an OpenAPI
**component schema** name equals an **operation-derived** zod const name (e.g. a component named
`RequestUploadUrlBody` plus an operation whose body zod is also `RequestUploadUrlBody`), both
star-exports produce the same identifier and `tsc --build` fails with TS2308
("has already exported a member named ...").

**Why:** dev workflows run via tsx/vite (no full typecheck), so these collisions go unnoticed
until someone runs `pnpm run typecheck` (the validation gate, which runs `tsc --build`). The build
of api-zod is `composite` + `noEmitOnError`, so when it errors no fresh `.d.ts` is emitted and
downstream projects (api-server) keep resolving stale declarations.

**How to apply:**
- After codegen, run `pnpm run typecheck` from the repo root to surface collisions.
- Fix by adding an explicit named re-export at the end of `lib/api-zod/src/index.ts` that picks the
  zod-const version (the one consumers use at runtime), e.g.
  `export { RequestUploadUrlBody, ... } from "./generated/api";`. This is exactly what TS's TS2308
  message suggests and it does not get clobbered by codegen (`clean` only wipes the `generated/`
  subdir, not the hand-written index).
- **Avoid creating new collisions:** name new component schemas so they differ from the
  operation-derived zod names (suffix component request/response bodies as `...Input` / `...Response`
  that won't match `<Operation>Body` / `<Operation>Response`).
