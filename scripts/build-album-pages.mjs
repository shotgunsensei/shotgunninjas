// Give direct album URLs meaningful metadata even to crawlers that do not run JS.
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'artifacts/web/dist/public');
const template = readFileSync(resolve(dist, 'index.html'), 'utf8');
const album = JSON.parse(readFileSync(resolve(root, 'artifacts/web/src/lib/operatoros-album.json'), 'utf8'));
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
for (const detail of [false, true]) {
  const route = `soundstudio/albums${detail ? '/operatoros' : ''}`;
  const url = `https://shotgunninjas.com/${route}`;
  const title = detail ? `${album.title} by ${album.artist} | Sound Studio` : 'Albums | Sound Studio';
  const description = detail ? album.description : 'Explore complete albums from Shotgun Ninjas Productions.';
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`).replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`);
  const values = { description, 'og:title': title, 'twitter:title': title, 'og:description': description, 'twitter:description': description, 'og:url': url, 'og:image': 'https://shotgunninjas.com/albums/operatoros/cover.png', 'twitter:image': 'https://shotgunninjas.com/albums/operatoros/cover.png', 'og:image:width': '1672', 'og:image:height': '941' };
  for (const [name, value] of Object.entries(values)) {
    const pattern = new RegExp(`(<meta\\s+(?:name|property)="${name}"\\s+content=")[^"]*("\\s*/?>)`);
    if (!pattern.test(html)) throw new Error(`Missing metadata template: ${name}`);
    html = html.replace(pattern, (_, before, after) => before + escape(value) + after);
  }
  const directory = resolve(dist, route);
  mkdirSync(directory, { recursive: true });
  writeFileSync(resolve(directory, 'index.html'), html);
}
