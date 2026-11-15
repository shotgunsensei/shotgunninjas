import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const album = JSON.parse(readFileSync(new URL('../../artifacts/web/src/lib/operatoros-album.json', import.meta.url), 'utf8'));
test('OperatorOS contains 17 ordered original MP3s with verified bytes', () => {
  assert.equal(album.title, 'OperatorOS');
  assert.equal(album.tracks.length, 17);
  assert.equal(new Set(album.tracks.map(t => t.file)).size, 17);
  for (const [i, track] of album.tracks.entries()) {
    assert.equal(track.position, i + 1);
    const bytes = readFileSync(new URL(`../../artifacts/web/public/albums/operatoros/${track.file}`, import.meta.url));
    assert.equal(bytes.length, track.size_bytes);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), track.sha256);
    assert.ok(track.duration_seconds > 0);
  }
});
test('album page uses only its own catalog, never the existing songs API', () => {
  const page = readFileSync(new URL('../../artifacts/web/src/pages/Albums.tsx', import.meta.url), 'utf8');
  assert.ok(page.includes('operatoros-album.json'));
  assert.doesNotMatch(page, /listSongs|createSong|updateSong|deleteSong|getSongStreamUrl/);
});

test('album page keeps listening on site without an external Suno link', () => {
  const page = readFileSync(new URL('../../artifacts/web/src/pages/Albums.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(page, /Listen on Suno|album\.source_url|https?:\/\/(?:www\.)?suno\.com/i);
  assert.equal(Object.hasOwn(album, 'source_url'), false);
  assert.ok(page.includes('Play album'));
});
