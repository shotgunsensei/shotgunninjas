#!/usr/bin/env tsx
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WEB_SRC = resolve(__dirname, "..", "artifacts", "web", "src");
const APP_TSX = join(WEB_SRC, "App.tsx");

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      walk(full, out);
    } else if (/\.(tsx?|jsx?)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

function extractRoutes(): Set<string> {
  const text = readFileSync(APP_TSX, "utf8");
  const matches = text.matchAll(/<Route\s+path="([^"]+)"/g);
  const routes = new Set<string>();
  for (const m of matches) routes.add(m[1]!);
  return routes;
}

function isInternal(href: string): boolean {
  if (!href.startsWith("/")) return false;
  if (href.startsWith("//")) return false;
  return true;
}

function matchesRoute(href: string, routes: Set<string>): boolean {
  const path = href.split("#")[0]!.split("?")[0]!;
  if (routes.has(path)) return true;
  if (routes.has("*")) {
    // wildcard exists but we want to flag unknown routes anyway
  }
  return false;
}

function main() {
  const routes = extractRoutes();
  const files = walk(WEB_SRC);

  const linkRe = /<Link\s+(?:[^>]*\s)?to=(?:"([^"]+)"|\{["'`]([^"'`]+)["'`]\})/g;
  const aRe = /<a\s+(?:[^>]*\s)?href="(\/[^"]*)"/g;

  const findings: { file: string; href: string; kind: string }[] = [];

  for (const file of files) {
    const text = readFileSync(file, "utf8");
    for (const m of text.matchAll(linkRe)) {
      const href = (m[1] ?? m[2])!;
      if (!isInternal(href)) continue;
      if (!matchesRoute(href, routes)) {
        findings.push({ file, href, kind: "Link.to" });
      }
    }
    for (const m of text.matchAll(aRe)) {
      const href = m[1]!;
      if (!isInternal(href)) continue;
      // Skip anchor-only links (#section) and root-with-anchor
      if (href === "/" || href.startsWith("/#")) continue;
      if (!matchesRoute(href, routes)) {
        findings.push({ file, href, kind: "a.href" });
      }
    }
  }

  console.log(`\nKnown routes (${routes.size}):`);
  for (const r of [...routes].sort()) console.log(`  ${r}`);

  if (findings.length === 0) {
    console.log("\n✓ No broken internal links found.\n");
    process.exit(0);
  }

  console.log(`\n✗ Found ${findings.length} broken internal link(s):\n`);
  for (const f of findings) {
    const rel = f.file.replace(resolve(__dirname, ".."), ".");
    console.log(`  ${rel}`);
    console.log(`    ${f.kind} → ${f.href}`);
  }
  process.exit(1);
}

main();
