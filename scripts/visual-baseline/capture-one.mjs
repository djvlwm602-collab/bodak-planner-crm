/**
 * Role: 단일 페이지 ad-hoc 캡처 — Phase 별 spot-check 도구
 * Key Features: --page=<slug> 로 pages.mjs 의 한 항목만 캡처. capture.mjs 와 동일한 결정성 패치 (animation 0s + networkidle wait).
 * Dependencies: playwright, ./pages.mjs
 * Notes: 사용 예시:
 *   node scripts/visual-baseline/capture-one.mjs --page=22-db-distribution-detail --target=spot-check
 *   node scripts/visual-baseline/capture-one.mjs --page=08-admin-management --target=adhoc
 */

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { PAGES, VIEWPORT, BASE_URL } from './pages.mjs';

const args = Object.fromEntries(
  process.argv.slice(2).filter(a => a.startsWith('--')).map(a => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  })
);

const { page: pageSlug, target } = args;
if (!pageSlug || !target) {
  console.error('사용법: node scripts/visual-baseline/capture-one.mjs --page=<slug> --target=<dir>');
  console.error('  사용 가능 slug:');
  for (const p of PAGES) console.error('    ' + p.slug);
  process.exit(1);
}

const cfg = PAGES.find(p => p.slug === pageSlug);
if (!cfg) {
  console.error(`'${pageSlug}' 슬러그가 pages.mjs 에 없음. 사용 가능 항목:`);
  for (const p of PAGES) console.error('  ' + p.slug);
  process.exit(1);
}

const outDir = resolve(`docs/visual-baseline/${target}`);
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
const page = await context.newPage();

let url;
if (cfg.kind === 'url') {
  url = `${BASE_URL}/?page=${encodeURIComponent(cfg.page)}`;
} else if (cfg.kind === 'url-with-tab') {
  url = cfg.tab
    ? `${BASE_URL}/?page=${encodeURIComponent(cfg.page)}&tab=${encodeURIComponent(cfg.tab)}`
    : `${BASE_URL}/?page=${encodeURIComponent(cfg.page)}`;
} else if (cfg.kind === 'click') {
  url = `${BASE_URL}/?page=${encodeURIComponent(cfg.page)}`;
}

await page.goto(url, { waitUntil: 'networkidle' });
await page.addStyleTag({
  content: `*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; transition-delay: 0s !important; }`,
});

if (cfg.action === 'click-distribution-detail') {
  await page.locator('table tbody tr').first().locator('button, [role="button"], td').last().click({ force: true }).catch(async () => {
    await page.locator('table tbody tr').first().click();
  });
  await page.waitForLoadState('networkidle');
}

await page.waitForTimeout(500);
await page.evaluate(() => document.fonts && document.fonts.ready);
await page.waitForLoadState('networkidle');
await page.waitForTimeout(200);

const file = join(outDir, `${cfg.slug}.png`);
await page.screenshot({ path: file, fullPage: true, animations: 'disabled' });
console.log(`[capture-one] ✓ ${cfg.slug} → ${file}`);

await browser.close();
