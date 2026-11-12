# OperatorOS album

The album has its own collection at `/soundstudio/albums` and listening room at
`/soundstudio/albums/operatoros`. Its catalog is
`artifacts/web/src/lib/operatoros-album.json`. The 17 original MP3s and supplied
artwork are stored in `artifacts/web/public/albums/operatoros` and copied unchanged
to the frontend production build by Vite. Numbered filenames preserve a simple,
stable public URL; downloads retain the original titles.

This is a deliberately separate, static release. It does not write to the songs
table or call the songs API. Existing standalone tracks, search, uploads, and
queues are unchanged. The album has its own playback queue, which ends after
track 17 and is destroyed on navigation away. Files are not preloaded until a
listener chooses a track. Each MP3 is under 9 MB; there is no large combined ZIP
response or API streaming proxy.

Source: the supplied Pastah John.zip and the linked Suno album. The manifest
records original SHA-256 hashes, sizes, durations, ordering, and source IDs.

Checks:

- `node --test scripts/tests/album-catalog.test.mjs`
- `pnpm typecheck`
- `pnpm build`
- `pnpm audit:links`
- `pnpm --filter @workspace/api-server test` (requires the disposable local test DB)
- Browser: open both album routes directly, play tracks, skip forward/back, verify
  auto-advance and the final boundary, switch tracks quickly, download, navigate
  away/back, and check mobile overflow. Confirm All Tracks is unchanged.

Publication uses the existing Replit workflow. Verify both the serving commit
at `/api/version` and the actual album web page/assets. No database migration,
new service, payment, storage credentials, or admin password is required. The
release adds roughly 100 MB of static media to the web build. Rollback is the
previous website revision; standalone songs are unaffected.
