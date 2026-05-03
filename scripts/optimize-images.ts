#!/usr/bin/env tsx
import { readdirSync, statSync, existsSync } from "node:fs";
import { join, resolve, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSET_DIR = resolve(__dirname, "..", "attached_assets");
const MIN_SIZE_BYTES = 400 * 1024;
const QUALITY = 78;

async function processFile(file: string) {
  const out = file.replace(/\.(png|jpg|jpeg)$/i, ".webp");
  if (existsSync(out)) {
    const inSize = statSync(file).size;
    const outSize = statSync(out).size;
    console.log(`  skip   ${file.split("/").pop()}  (already ${(outSize / 1024).toFixed(0)}KB vs ${(inSize / 1024).toFixed(0)}KB)`);
    return;
  }
  const inSize = statSync(file).size;
  await sharp(file).webp({ quality: QUALITY }).toFile(out);
  const outSize = statSync(out).size;
  const pct = ((1 - outSize / inSize) * 100).toFixed(0);
  console.log(`  wrote  ${out.split("/").pop()}  ${(inSize / 1024).toFixed(0)}KB → ${(outSize / 1024).toFixed(0)}KB  (-${pct}%)`);
}

async function main() {
  const entries = readdirSync(ASSET_DIR);
  const targets: string[] = [];
  for (const entry of entries) {
    const full = join(ASSET_DIR, entry);
    if (!statSync(full).isFile()) continue;
    const ext = extname(entry).toLowerCase();
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") continue;
    if (statSync(full).size < MIN_SIZE_BYTES) continue;
    targets.push(full);
  }
  console.log(`Optimizing ${targets.length} image(s) > ${MIN_SIZE_BYTES / 1024}KB → WebP @ q${QUALITY}\n`);
  for (const t of targets) await processFile(t);
  console.log(`\nDone. Update imports from "@assets/foo.png" to "@assets/foo.webp" where appropriate.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
