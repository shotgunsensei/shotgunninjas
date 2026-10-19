import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createServer } from 'node:http';
import { dirname, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { fileURLToPath, pathToFileURL } from 'node:url';
// Use existing tooling only. This fixture never invokes a package manager or
// downloads a browser. Both paths can point to an existing external tool cache.
const { values } = parseArgs({ options: {
  revision: { type: 'string' }, 'expect-unsafe': { type: 'boolean', default: false },
  output: { type: 'string' },
} });
const repo = fileURLToPath(new URL('../..', import.meta.url));
const revision = values.revision;
const expectUnsafe = values['expect-unsafe'];
const output = resolve(values.output ?? resolve(repo, 'output/playwright/newsletter-preview'));
const modulePath = process.env.PLAYWRIGHT_MODULE_PATH;
let playwright;
try {
  playwright = await import(modulePath ? pathToFileURL(resolve(modulePath)).href : 'playwright');
} catch (cause) {
  throw new Error('Point PLAYWRIGHT_MODULE_PATH at an existing playwright/index.mjs; this fixture installs nothing.', { cause });
}
const { chromium } = playwright;
const executable = process.env.PREVIEW_BROWSER_EXECUTABLE ?? chromium.executablePath();
assert.ok(existsSync(executable), 'Select an existing cached Chromium with PREVIEW_BROWSER_EXECUTABLE; no browser is acquired automatically.');
const toolVersion = modulePath ? JSON.parse(readFileSync(resolve(dirname(modulePath), 'package.json'), 'utf8')).version : 'existing local Playwright';
mkdirSync(output, { recursive: true });
const component = 'artifacts/web/src/pages/NewsletterAdmin.tsx';
const source = revision ? execFileSync('git', ['show', `${revision}:${component}`], { cwd:repo, encoding:'utf8' }) : readFileSync(resolve(repo,component),'utf8');
const template = source.match(/const previewSrcDoc = useMemo\(\s*\(\) => `([\s\S]*?)`,\s*\[html\]/)?.[1];
assert.ok(template, 'Actual preview template anchor changed');
const iframe = source.match(/<iframe\s+[\s\S]*?\/>/)?.[0];
assert.ok(iframe, 'Actual email iframe anchor changed');
const sandbox = iframe.match(/\bsandbox="([^"]*)"/)?.[1];
const key = 'newsletter-fixture-only';
const value = 'synthetic-not-a-secret';
const payload = `<h1 id="greeting">Preview greeting</h1><p id="copy">Static email content still renders.</p><script>parent.__newsletterProbe = parent.sessionStorage.getItem(${JSON.stringify(key)});<\/script>`;
assert.equal(template.split('${html}').length,2);
const preview = template.replace('${html}',payload);
const escape = text => text.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const fixture = `<!doctype html><html><body><h1>Synthetic newsletter fixture</h1><script>sessionStorage.setItem(${JSON.stringify(key)},${JSON.stringify(value)});<\/script><iframe title="Email preview" ${sandbox===undefined?'':`sandbox="${escape(sandbox)}"`} srcdoc="${escape(preview)}" style="width:100%;height:640px;border:1px solid #ddd"></iframe></body></html>`;
const server = createServer((_request,response)=>{response.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});response.end(fixture);});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
let browser;
try {
 browser = await chromium.launch({headless:true,executablePath:executable});
 const context=await browser.newContext({viewport:{width:900,height:820}});
 const external=[];const consoleMessages=[];
 await context.route('**/*',route=>{const url=route.request().url();if(url.startsWith(origin+'/'))return route.continue();external.push(url);return route.abort();});
 const page=await context.newPage();page.on('console',message=>consoleMessages.push(message.text()));
 await page.goto(origin+'/',{waitUntil:'load'});
 const frame=page.frameLocator('iframe');
 assert.equal(await frame.locator('#greeting').innerText(),'Preview greeting');
 assert.equal(await frame.locator('#copy').innerText(),'Static email content still renders.');
 const read=await page.evaluate(()=>window.__newsletterProbe ?? null);
 const parentAccess=await page.frames()[1].evaluate(()=>{try{return {allowed:true,value:parent.sessionStorage.getItem('newsletter-fixture-only')};}catch(error){return {allowed:false,error:error.name};}});
 const sandboxed=sandbox!==undefined;
 assert.equal(sandboxed, !expectUnsafe, 'The default regression requires sandboxing; --expect-unsafe is only for an explicit historical baseline.');
 if(sandboxed){assert.equal(sandbox,'');assert.equal(read,null);assert.deepEqual(parentAccess,{allowed:false,error:'SecurityError'});}else{assert.equal(read,value);assert.equal(parentAccess.allowed,true);assert.equal(parentAccess.value,value);}
 assert.deepEqual(external,[]);
 await page.screenshot({path:resolve(output,(sandboxed?'candidate':'baseline')+'.png'),fullPage:true});
 console.log(JSON.stringify({revision:revision??'working-tree',playwright:toolVersion,browser:browser.version(),sandbox:sandbox??null,staticTextRendered:true,templateScriptRead:read,parentAccess,externalRequests:external,consoleMessages,limits:'Synthetic localhost HTML using the actual component template and iframe attribute; no React app, admin credentials, recipients, external images, hosted site or production action.'},null,2));
 await context.close();
}finally{await browser?.close();await new Promise(resolve=>server.close(resolve));}
