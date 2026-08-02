# Disabled pages

These product pages were removed from the public site but kept here so they
can be re-enabled easily. Nothing in this `_disabled/` folder is imported by the
app, so these routes are unreachable until restored.

## Games (disabled earlier)

- `NeonRacer.tsx` — route `/neonracer`
- `LabyrinthRonin.tsx` — route `/labyrinthronin`
- `SnpoolHall.tsx` — Shotgun Ninjas Pool Hall, route `/snpoolhall`

## Arsenal module pages (disabled when the Arsenal was consolidated into OperatorOS)

All per-module product pages were retired when OperatorOS.net became the
command center for the ecosystem. Their old routes now redirect to
`/operatoros` (see the "Legacy module routes" block in `src/App.tsx`).

- `TechDeck.tsx` — route `/techdeck`
- `TradeFlow.tsx` — route `/tradeflow`
- `TorqueShed.tsx` — route `/torqueshed`
- `Ninjamation.tsx` — route `/ninjamation`
- `PlayPackPilot.tsx` — route `/playpackpilot`
- `BrandForgeOS.tsx` — route `/brandforgeos`
- `SnapProofOS.tsx` — route `/snapproof-os`
- `PulseDesk.tsx` — route `/pulsedesk`
- `FaultlineLab.tsx` — route `/faultline-lab`

## How to re-enable a page

1. Move the desired page file back to `../pages/`.
2. **`src/App.tsx`** — restore its import, and replace the corresponding
   `<Navigate to="/operatoros" replace />` redirect with the real
   `<Route path="..." element={<Page />} />`.
3. **`src/components/Navbar.tsx`** — add a link in `mainLinks` (the old
   "Arsenal" dropdown was removed) or restore a dropdown if several return.
4. **`src/components/Footer.tsx`** — add an entry to `productLinks`.
5. **`src/components/PlatformsSection.tsx`** — the homepage showcase is now an
   OperatorOS command-center section; add a card back if desired.
6. **`public/sitemap.xml`** — re-add the page's `<url>` entry.
7. Cross-links: check `FAQSection.tsx`, `NotFound.tsx` quick links,
   `CaseStudiesSection.tsx`, and `ControversyArchive.tsx` relatedProducts.

Notes for pages inside these files: several module pages cross-link each other
via `relatedProducts` — those links only work once the target pages are also
restored (otherwise they redirect to `/operatoros`).
