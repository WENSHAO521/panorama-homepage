// Shared plumbing for tests/browser-check.mjs and tests/interaction-check.mjs
// -- starts a built-site preview, launches Chromium (with the same cached
// fallback both scripts need), and tears down what it started.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';

export const PORT = Number(process.env.PREVIEW_TEST_PORT ?? 4321);
export const BASE = process.env.PREVIEW_TEST_BASE ?? `http://127.0.0.1:${PORT}`;

function findCachedChromeExe() {
  const base = process.env.LOCALAPPDATA + '\\ms-playwright';
  if (!existsSync(base)) return null;
  const dirs = readdirSync(base).filter((d) => d.startsWith('chromium-'));
  for (const d of dirs) {
    const p = `${base}\\${d}\\chrome-win64\\chrome.exe`;
    if (existsSync(p)) return p;
  }
  return null;
}

function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tryOnce = async () => {
      try {
        const res = await fetch(url);
        if (res.ok || res.status === 404) return resolve();
      } catch {
        // not up yet
      }
      if (Date.now() - start > timeoutMs) return reject(new Error('preview server did not start in time'));
      setTimeout(tryOnce, 300);
    };
    tryOnce();
  });
}

export async function setup() {
  const server = process.env.PREVIEW_TEST_BASE ? null : process.env.PREVIEW_DIST_DIR
    ? spawn(process.execPath, ['tests/static-server.mjs', process.env.PREVIEW_DIST_DIR, String(PORT)], {
        cwd: process.cwd(),
        stdio: 'pipe',
      })
    : spawn('npx', ['astro', 'preview', '--port', String(PORT)], {
      cwd: process.cwd(),
      shell: true,
      stdio: 'pipe',
    });
  let serverOutput = '';
  server?.stdout.on('data', (d) => (serverOutput += d.toString()));
  server?.stderr.on('data', (d) => (serverOutput += d.toString()));

  try {
    await waitForServer(BASE + '/');
  } catch (err) {
    console.error('Preview server failed to start:\n' + serverOutput);
    server?.kill();
    process.exit(1);
  }

  let browser;
  let usedFallback = null;
  try {
    browser = await chromium.launch();
  } catch (err) {
    const fallbackExe = findCachedChromeExe();
    if (!fallbackExe) {
      console.error('No Playwright-managed Chromium available and no cached fallback found.');
      console.error(String(err));
      server?.kill();
      process.exit(1);
    }
    usedFallback = fallbackExe;
    browser = await chromium.launch({ executablePath: fallbackExe });
  }

  return { server, browser, usedFallback };
}

export async function teardown({ server, browser }) {
  await browser.close();
  server?.kill();
}
