# Workspace

## Overview

Shotgun Ninjas Productions website — a dark-themed React+Vite+TypeScript+Tailwind platform built on Replit, showcasing multiple products (OperatorOS, TechDeck, TradeFlow, TorqueShed, PlayPack Pilot, Ninjamation, LabyrinthRonin, NeonRacer) and a Sound Studio music page. Contact email: john@shotgunninjas.com.

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

### `users` table (backend only, not used by frontend currently)
- `id` (serial, PK)
- `email` (text, unique, not null)
- `password_hash` (text, not null) — bcryptjs hashed
- `display_name` (text, not null)
- `is_admin` (boolean, default false)
- `created_at` (timestamp, default now)

### `sessions` table (backend only)
- `id` (serial, PK)
- `user_id` (int, FK → users.id, not null)
- `token` (text, unique, not null) — random 32-byte hex
- `expires_at` (timestamp, not null) — 7-day expiry
- `created_at` (timestamp, default now)

### `clan_forum_topics` table (backend only, Clan feature removed from frontend)
- `id` (serial, PK)
- `title` (text, not null)
- `content` (text, not null)
- `author_id` (int, FK → users.id, not null)
- `is_pinned` / `is_locked` (boolean, default false)
- `created_at` / `updated_at` (timestamp, default now)

### `clan_forum_replies` table (backend only)
- `id` (serial, PK)
- `topic_id` (int, FK → topics.id, cascade delete)
- `content` (text, not null)
- `author_id` (int, FK → users.id)
- `created_at` (timestamp, default now)

### `clan_documents` table (backend only)
- `id` (serial, PK)
- `title` (text, not null)
- `description` (text, nullable)
- `category` (text, not null)
- `file_url` (text, not null)
- `uploaded_by_id` (int, FK → users.id)
- `created_at` (timestamp, default now)

### `user_roles` table (backend only)
- `id` (serial, PK)
- `user_id` (int, FK → users.id, cascade delete)
- `role` (text, not null)
- `granted_at` (timestamp, default now)

### `banned_users` table (backend only)
- `id` (serial, PK)
- `user_id` (int, FK → users.id, cascade delete, unique)
- `reason` (text, nullable)
- `banned_at` (timestamp, default now)
- `banned_by_id` (int, FK → users.id, nullable)

## API Routes (mounted at `/api`)

- `GET /healthz` — health check
- `POST /contact` — submit contact form (stores in DB)
- `GET /songs` — list all songs
- `POST /songs/admin/verify` — verify admin password (rate limited: 5 attempts per 15 min)
- `POST /songs/admin` — create song (admin auth required)
- `PATCH /songs/admin/:id` — update song (admin auth required)
- `DELETE /songs/admin/:id` — delete song (admin auth via x-admin-password header)
- `POST /storage/uploads/request-url` — request presigned upload URL (admin auth via x-admin-password header)
- `GET /storage/objects/*` — serve stored objects
- `GET /storage/public-objects/*` — serve public objects
- `POST /auth/signup` — create account (returns user + token)
- `POST /auth/signin` — sign in (returns user + token)
- `POST /auth/signout` — invalidate session token
- `GET /auth/me` — get current user from Bearer token
- `GET /clan/forum/topics` — list forum topics (auth required)
- `POST /clan/forum/topics` — create topic (auth required)
- `DELETE /clan/forum/topics/:id` — delete topic (admin only)
- `GET /clan/forum/topics/:id/replies` — list replies (auth required)
- `POST /clan/forum/topics/:id/replies` — create reply (auth required)
- `GET /clan/documents` — list documents (auth required)
- `POST /clan/documents` — create document (admin only)
- `DELETE /clan/documents/:id` — delete document (admin only)
- `GET /admin/users` — list all users (admin only)
- `GET /admin/users/:id/roles` — list user roles (admin only)
- `POST /admin/users/:id/roles` — assign role (admin only)
- `DELETE /admin/users/:userId/roles/:roleId` — remove role (admin only)
- `GET /admin/bans` — list banned users (admin only)
- `POST /admin/bans` — ban user (admin only, invalidates sessions)
- `DELETE /admin/bans/:id` — unban user (admin only)

## Frontend Pages

- `/` — Homepage (hero, Arsenal product showcase with images, philosophy, case studies, CTA)
- `/about` — About page
- `/contact` — Contact form (POSTs to API, email: john@shotgunninjas.com)
- `/operatoros` — OperatorOS product page
- `/techdeck` — TechDeck product page
- `/tradeflow` — TradeFlow product page
- `/torqueshed` — TorqueShed product page
- `/ninjamation` — Ninjamation product page (BETA badge)
- `/labyrinthronin` — Labyrinth Ronin product page (EXPERIMENTAL badge)
- `/neonracer` — Neon Racer product page
- `/playpackpilot` — PlayPack Pilot product page (NEW badge, custom landing page with hero image, feature grid, workflow, use cases)
- `/soundstudio` — Sound Studio (music browser, player, download, admin panel)
- `/privacy-policy` — Privacy policy
- `*` — 404 page

Note: Clan page (/clan) and Auth page (/auth) have been removed from the frontend. Backend API routes for auth/clan remain available but are not used by the current frontend.

## Sound Studio

- Cinematic hero section with ninja artwork background, right-aligned text content, and integrated search/filter panel
- Public: browse, search by name/tags, filter by genre, play, download MP3s
- Admin: password-protected upload, edit, delete via `SOUND_STUDIO_ADMIN_PASSWORD` env secret
- Files stored in Replit Object Storage
- Admin login via lock icon → modal password entry (Escape key to dismiss)
- Featured Track banner highlights the latest upload
- Bottom-fixed audio player with play/pause, skip, seek, volume
- Premium empty vault state when no tracks are uploaded

## Asset Images

Featured products on the homepage use attached asset images:
- OperatorOS: `@assets/OperatorOShero_1774285672020.png`
- Tech Deck: `@assets/techdeckfeature_1774285697731.png`
- TradeFlow: `@assets/tradeflowfeature_1774285697732.png`
- Torque Shed: `@assets/torqueshedfeature1024500_1774285672020.png`
- Neon Racer: `@assets/neonracerhero_1774285672019.png`
- Ninjamation: `@assets/ninjamationfeatured_1774292377935.png`
- Labyrinth Ronin: `@assets/labyrinthroninfeatured_1774292377934.png`
- PlayPack Pilot hero: `@assets/ChatGPT_Image_Mar_27,_2026,_04_06_32_PM_1774642220480.png`
- PlayPack Pilot logo: `@assets/playpack_pilot_1774642220483.png`

Sound Studio hero background:
- `@assets/ChatGPT_Image_Mar_23,_2026,_03_33_48_PM_1774294437568.png`

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
Express 5 API server with songs CRUD, contact form, auth, clan, and object storage routes.

### `lib/db` (`@workspace/db`)
Drizzle ORM schema and PostgreSQL connection. Schema in `src/schema/`.

### `lib/api-zod` (`@workspace/api-zod`)
Generated Zod schemas from OpenAPI spec for request/response validation.
