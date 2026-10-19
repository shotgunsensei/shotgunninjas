# Newsletter preview isolation regression

The HTML editor accepts plain email HTML, including templates pasted from
external sources. The preview iframe uses an empty sandbox so that template
scripts cannot read the parent page, its DOM or its sessionStorage. No script,
same-origin, form, popup or top-navigation permissions are granted. Static text,
inline styles and images remain previewable. Sandboxing is not network isolation:
remote image/style URLs can still load in the actual app.

This addresses a conditional admin-interaction path. It is not an unauthenticated
API injection finding and does not change newsletter sending or consent policy.

## Existing-tool browser fixture

The fixture uses only an already installed Playwright and already cached Chromium.
It never runs npm/npx/pnpm install, downloads a browser, or opens the hosted app.
With existing tools on the module path and their browser cache, run:

```sh
node scripts/tests/newsletter-preview-browser.test.mjs
```

If tooling lives in a separate existing cache, point these process variables at
its actual files (do not acquire packages to run this test):

```powershell
$env:PLAYWRIGHT_MODULE_PATH = 'C:\existing-tool-cache\playwright\index.mjs'
$env:PREVIEW_BROWSER_EXECUTABLE = 'C:\existing-browser-cache\chrome.exe'
node scripts/tests/newsletter-preview-browser.test.mjs
```

The discoverable `pnpm run test:newsletter-preview` command runs the same fixture
in an already configured checkout. Missing tooling fails with an explicit error;
it does not skip or install. This optional browser fixture is separate from the
existing frozen CI typecheck/build/API/link gates.

It extracts the actual component preview template and iframe sandbox attribute,
serves synthetic localhost HTML, stores a fake value in a fresh browser context,
and attempts template-script and parent-storage access. The default regression
requires blocked script execution, a parent-access SecurityError, and rendered
static greeting/body text. Non-loopback page requests are aborted and counted.
It saves a screenshot under output/playwright/newsletter-preview; `--output` can
select another artifact directory. Browser contexts and the loopback server close
in finally. No real admin password, recipient, provider or production DB is used.

To reproduce an explicitly reviewed historical baseline, use
`--revision <commit> --expect-unsafe`. That mode asserts the prior script can read
the fake parent value; it is not the default security regression. The actual
baseline and candidate screenshots were identical in the recorded local run.

The fixture checks browser security behavior with the actual template/attribute,
not a built React application, live images/forms, sending, deployed CSP or full
production acceptance. Release acceptance remains separate.
