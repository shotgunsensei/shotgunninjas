# Shotgun Ninjas Productions — Ecosystem Hub

The official hub site for **Shotgun Ninjas Productions** — an independent
studio shipping a family of operator-grade tools, platforms, and games.

This repo powers **shotgunninjas.com**, the central front door of the
ecosystem. It does not host the products themselves; each product lives
on its own domain. This site exists to:

- Introduce every product in one place.
- Cross-link visitors to the right product for their problem.
- Surface the studio's philosophy, story, music (Sound Studio),
  newsletter, and contact paths.

## The Ecosystem

| Product | What it is | Live at |
|---|---|---|
| **TorqueShed** | Automotive diagnostics, repair cases, tools, and mechanic community | torqueshed.pro |
| **TradeFlow Kit** | Workflow automation and revenue-flow command center for trades | tradeflowkit.com |
| **Tech Deck** | IT operations, scripts, automation, MSP & power-user tooling | techdeck.app |
| **PulseDesk** | Healthcare & service operations coordination platform | pulsedesk.support |
| **Faultline Lab** | Cinematic diagnostic / investigation simulator (flagship) | faultlinelab.com |
| **SnapProof OS** | Field documentation & AI proof-of-work reports | snapproofos.com |
| **BrandForge OS** | AI-guided marketing operating system | bf-os.com |
| **PlayPack Pilot** | PWA → Play Store packaging assistant | playpackpilot.com |
| **OperatorOS** | AI-native cloud development control plane | operatoros.net |
| **Ninjamation** | Visual workflow automation (beta) | ninjamation.com |
| **Neon Racer** | Retro-futuristic evasive arcade racer | neonracer.net |
| **Labyrinth Ronin** | Roguelike survival in a living maze (experimental) | labyrinthronin.com |
| **Pool Hall** | Skill-based 2D ninja billiards | snpoolhall.com |
| **Ninja Village** | Lore, characters, episodes, merch, community hub | shotgunninjavillage.com |
| **Shotgun Ninjas (this site)** | Ecosystem hub | shotgunninjas.com |

## Cross-Promotion Map

Each internal product page surfaces a small "Inside the Arsenal — Pairs
well with" section that points visitors at the most relevant adjacent
products. Examples wired in this repo:

- **TorqueShed** → TradeFlow Kit (shop ops), Faultline Lab (diagnostic
  training), SnapProof OS (repair documentation)
- **TradeFlow Kit** → Tech Deck (IT automation), SnapProof OS (job
  documentation), PulseDesk (support)
- **Tech Deck** → PulseDesk (support ops), OperatorOS (build/control
  plane), Ninjamation (automation)
- **PulseDesk** → Tech Deck, OperatorOS, TradeFlow, SnapProof, BrandForge
- **Faultline Lab** → Tech Deck, TorqueShed (applied diagnostic domains),
  plus the rest of the Arsenal
- **OperatorOS** → Tech Deck, Ninjamation, PlayPack Pilot
- **Ninjamation** → OperatorOS, Tech Deck, PulseDesk
- **PlayPack Pilot** → OperatorOS, BrandForge OS, Tech Deck
- **Pool Hall / Neon Racer / Labyrinth Ronin** → game-to-game cross-links
  + Ninja Village

The home page Arsenal grid plus the Navbar Arsenal dropdown plus the
Footer Arsenal column collectively link to every product, making the
hub the discovery layer for the entire ecosystem.

## Stack

- **Monorepo**: pnpm workspaces (Node 24, TypeScript 5.9)
- **Frontend** (`artifacts/web`): React 19 + Vite + Tailwind CSS v4 +
  shadcn/ui + react-router-dom
- **API** (`artifacts/api-server`): Express 5 + Drizzle ORM + PostgreSQL,
  bundled with esbuild
- **Component playground** (`artifacts/mockup-sandbox`): Vite preview
  server for isolated component iteration
- **Validation**: Zod (`zod/v4`) + `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Object Storage**: Replit Object Storage (Sound Studio uploads)
- **Theme**: Dark, red primary `hsl(2 100% 44%)`; Orbitron (display) +
  Inter (body)

## Layout

```
artifacts/
  api-server/       # Express API (newsletter, contact, sound studio, healthz)
  web/              # The marketing site (this is what users see at shotgunninjas.com)
  mockup-sandbox/   # Component preview server (dev-only)
lib/
  api-spec/         # OpenAPI source of truth
  api-zod/          # Generated zod schemas
  shared/           # Shared types between api & web
```

## Local Dev

```bash
pnpm install
pnpm typecheck                                 # all 4 projects
pnpm --filter @workspace/web run dev           # frontend
pnpm --filter @workspace/api-server run dev    # API
pnpm --filter @workspace/web run build         # production build
```

The frontend serves on the artifact's assigned `PORT`. In production the
API and the static `web` build are served behind one origin.

## Contact

- General: **john@shotgunninjas.com**
- Inquiries (strategy, partnership, media, support): use the in-site
  contact form at `/contact`
- Newsletter signup lives on the home page and in the footer

---

© Shotgun Ninjas Productions, LLC. All product names belong to their
respective platforms within the ecosystem.
