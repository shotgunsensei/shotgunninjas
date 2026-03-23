# Workspace

## Overview

Shotgun Ninjas Productions website — a dark-themed React+Vite+TypeScript+Tailwind platform showcasing multiple products (OperatorOS, TechDeck, TradeFlow, TorqueShed, Ninjamation, LabyrinthRonin, NeonRacer) and a Sound Studio music page. Migrated from Lovable/Supabase to Replit.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React 19 + Vite + Tailwind CSS v4 + shadcn/ui + react-router-dom
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Object Storage**: Replit Object Storage (Google Cloud Storage via sidecar)
- **Fonts**: Orbitron (display), Inter (body)
- **Theme**: Dark theme, red primary (HSL 2 100% 44%)

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server
│   ├── web/                # React+Vite frontend (Shotgun Ninjas website)
│   └── mockup-sandbox/     # Component preview server
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Database Schema

### `songs` table
- `id` (serial, PK)
- `name` (text, not null)
- `tags` (text, nullable)
- `file_url` (text, not null) — object storage path
- `created_at` (timestamp, default now)

### `contact_messages` table
- `id` (serial, PK)
- `name` (text, not null)
- `email` (text, not null)
- `type` (text, not null)
- `message` (text, not null)
- `created_at` (timestamp, default now)

## API Routes (mounted at `/api`)

- `GET /healthz` — health check
- `POST /contact` — submit contact form (stores in DB)
- `GET /songs` — list all songs
- `POST /songs/admin/verify` — verify admin password
- `POST /songs/admin` — create song (admin auth required)
- `PATCH /songs/admin/:id` — update song (admin auth required)
- `DELETE /songs/admin/:id` — delete song (admin auth via x-admin-password header)
- `POST /storage/uploads/request-url` — request presigned upload URL (admin auth via x-admin-password header)
- `GET /storage/objects/*` — serve stored objects
- `GET /storage/public-objects/*` — serve public objects

## Frontend Pages

- `/` — Homepage (hero, platforms grid, philosophy, case studies, CTA)
- `/about` — About page
- `/contact` — Contact form (POSTs to API)
- `/operatoros` — OperatorOS product page
- `/techdeck` — TechDeck product page
- `/tradeflow` — TradeFlow product page
- `/torqueshed` — TorqueShed product page
- `/ninjamation` — Ninjamation product page (BETA badge)
- `/labyrinthronin` — Labyrinth Ronin product page (EXPERIMENTAL badge)
- `/neonracer` — Neon Racer product page
- `/clan` — Clan membership page (community, pricing, benefits, FAQ)
- `/soundstudio` — Sound Studio (music browser, player, download, admin panel)
- `/privacy-policy` — Privacy policy
- `*` — 404 page

## Sound Studio

- Public: browse, search, play, download MP3s
- Admin: password-protected upload, edit, delete via `SOUND_STUDIO_ADMIN_PASSWORD` env secret
- Files stored in Replit Object Storage
- Admin login via lock icon → modal password entry
- Bottom-fixed audio player with play/pause, skip, seek, volume

## Navbar

- Consolidated navigation: Home, Sound Studio, About, Contact + "Arsenal" dropdown for all product pages
- Fixed top, backdrop blur, responsive mobile menu

## Environment Secrets

- `DATABASE_URL` — auto-provided by Replit
- `SOUND_STUDIO_ADMIN_PASSWORD` — admin password for Sound Studio management
- `DEFAULT_OBJECT_STORAGE_BUCKET_ID` — object storage bucket
- `PRIVATE_OBJECT_DIR` — private object storage directory
- `PUBLIC_OBJECT_SEARCH_PATHS` — public object search paths

## Root Scripts

- `pnpm run build` — typecheck + build all packages
- `pnpm run typecheck` — `tsc --build --emitDeclarationOnly`
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API schemas/hooks

## Packages

### `artifacts/web` (`@workspace/web`)
React+Vite frontend. Uses react-router-dom for routing, Tailwind v4, shadcn/ui components, sonner for toasts.

### `artifacts/api-server` (`@workspace/api-server`)
Express 5 API server with songs CRUD, contact form, and object storage routes.

### `lib/db` (`@workspace/db`)
Drizzle ORM schema and PostgreSQL connection. Schema in `src/schema/`.

### `lib/api-zod` (`@workspace/api-zod`)
Generated Zod schemas from OpenAPI spec for request/response validation.
