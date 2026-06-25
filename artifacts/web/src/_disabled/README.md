# Disabled pages

These four product pages were removed from the public site but kept here so they
can be re-enabled easily. Nothing in this `_disabled/` folder is imported by the
app, so these routes are unreachable until restored.

Pages in this folder:

- `NeonRacer.tsx` — route `/neonracer`
- `LabyrinthRonin.tsx` — route `/labyrinthronin`
- `SnpoolHall.tsx` — Shotgun Ninjas Pool Hall, route `/snpoolhall`
- `SoundStudio.tsx` — Shotgun Ninjas DAW / Sound Studio, route `/soundstudio`

## How to re-enable

1. Move the desired page file(s) back to `../pages/`.

2. **`src/App.tsx`** — restore the import and the `<Route>`:
   ```tsx
   import NeonRacer from "./pages/NeonRacer";
   import LabyrinthRonin from "./pages/LabyrinthRonin";
   import SnpoolHall from "./pages/SnpoolHall";
   import SoundStudio from "./pages/SoundStudio";
   // ...
   <Route path="/neonracer" element={<NeonRacer />} />
   <Route path="/labyrinthronin" element={<LabyrinthRonin />} />
   <Route path="/snpoolhall" element={<SnpoolHall />} />
   <Route path="/soundstudio" element={<SoundStudio />} />
   ```

3. **`src/components/Navbar.tsx`** — add back to `productLinks`:
   `{ name: "Neon Racer", href: "/neonracer" }`,
   `{ name: "Labyrinth Ronin", href: "/labyrinthronin" }`,
   `{ name: "Pool Hall", href: "/snpoolhall" }`.
   Add `{ name: "Sound Studio", href: "/soundstudio" }` back to `mainLinks`.

4. **`src/components/Footer.tsx`** — add back to `productLinks`:
   `{ name: "Neon Racer", href: "/neonracer" }`,
   `{ name: "Labyrinth Ronin", href: "/labyrinthronin" }`,
   `{ name: "Pool Hall", href: "https://snpoolhall.com" }`.
   Add `{ name: "Sound Studio", href: "/soundstudio" }` back to `companyLinks`.

5. **`src/components/PlatformsSection.tsx`** — restore the asset imports and the
   `featured[]` entries for Neon Racer, Labyrinth Ronin, and Shotgun Ninjas Pool
   Hall (images: `neonracerhero_1774285672019.webp`,
   `labyrinthroninfeatured_1774292377934.webp`,
   `ChatGPT_Image_Apr_27,_2026,_12_56_54_PM_1777309034433.webp`).

6. **`src/components/FAQSection.tsx`** — re-add "Pool Hall, Neon Racer" to the
   "What is Shotgun Ninjas Productions?" answer, and restore the
   "Where can I hear the music from Sound Studio?" FAQ entry.

7. **`src/pages/NotFound.tsx`** — re-add `Sound Studio` and `Pool Hall` to
   `quickLinks`.

8. **`src/pages/FileRepository.tsx`** — if restoring Sound Studio, change the
   "Back to Home" link (`to="/"`) back to `to="/soundstudio"` / "Back to Sound
   Studio".
