---
name: Reversible feature disable (web artifact)
description: How removed product pages are hidden-but-kept in the web artifact, and the full set of touchpoints to update when adding/removing a product.
---

# Reversible feature disable

To remove a product/page from the public site without deleting it, move its page
file into `artifacts/web/src/_disabled/` (an unrouted folder, kept out of the
route table) and document restore steps in `_disabled/README.md`. Pages use `@/`
and `@assets/` absolute aliases, so moving within `src/` does not break their
internal imports, and they still typecheck even while unrouted.

**Why:** keeps re-enabling trivial (move file back + restore touchpoints) while
guaranteeing the page is unreachable in the SPA (only routes in `App.tsx` render).

**How to apply — touchpoints that reference a product (update ALL when add/remove):**
- `src/App.tsx` — import + `<Route>`
- `src/components/Navbar.tsx` — `productLinks` / `mainLinks`
- `src/components/Footer.tsx` — `productLinks` / `companyLinks`
- `src/components/PlatformsSection.tsx` — `featured[]` entry + its `@assets` image import
- `src/components/FAQSection.tsx` — prose mentions + any per-product FAQ entry
- `src/pages/NotFound.tsx` — `quickLinks`
- `public/sitemap.xml` — the `<url>` entry (easy to miss; surfaced by code review)
- prose mentions elsewhere (e.g. `src/pages/Terms.tsx`)
- any sibling page's back-link / related-products list pointing at the removed route
