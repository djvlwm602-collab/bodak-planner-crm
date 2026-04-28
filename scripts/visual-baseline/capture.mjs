/**
 * Role: Playwright 로 22개 페이지를 fullPage 스크린샷 캡처
 * Key Features: --target 인자로 출력 디렉터리 지정(before / after-step{N}), 1280x900 viewport
 * Dependencies: playwright, ./pages.mjs
 * Notes: dev server(http://localhost:3000)가 떠 있어야 함. 실행 예시: node scripts/visual-baseline/capture.mjs --target=before
 */

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { PAGES, VIEWPORT, BASE_URL } from './pages.mjs';

// CLI 인자 파싱 — --target=<dir>
const args = Object.fromEntries(
  process.argv.slice(2)
    .filter(a => a.startsWith('--'))
    .map(a => {
      const [k, v] = a.replace(/^--/, '').split('=');
      return [k, v ?? true];
    })
);

const target = args.target;
if (!target) {
  console.error('사용법: node scripts/visual-baseline/capture.mjs --target=before');
  process.exit(1);
}

const outDir = resolve(`docs/visual-baseline/${target}`);
await mkdir(outDir, { recursive: true });

console.log(`[capture] target=${outDir}`);
console.log(`[capture] base=${BASE_URL}, viewport=${VIEWPORT.width}x${VIEWPORT.height}`);

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });

let ok = 0;
let fail = 0;

for (const p of PAGES) {
  const page = await context.newPage();
  try {
    let url;
    if (p.kind === 'url') {
      url = `${BASE_URL}/?page=${encodeURIComponent(p.page)}`;
    } else if (p.kind === 'url-with-tab') {
      url = p.tab
        ? `${BASE_URL}/?page=${encodeURIComponent(p.page)}&tab=${encodeURIComponent(p.tab)}`
        : `${BASE_URL}/?page=${encodeURIComponent(p.page)}`;
    } else if (p.kind === 'click') {
      // DB 분배 현황 → 첫 행 클릭
      url = `${BASE_URL}/?page=${encodeURIComponent(p.page)}`;
    } else {
      throw new Error(`unknown kind: ${p.kind}`);
    }

    await page.goto(url, { waitUntil: 'networkidle' });

    // 차트(recharts 등) 애니메이션·트랜지션 비결정성 제거 — capture-only 주입
    // 컴포넌트 코드는 변경하지 않고 캡처 시점에만 적용
    await page.addStyleTag({
      content: `*, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }`,
    });

    // 클릭 네비게이션 처리
    if (p.action === 'click-distribution-detail') {
      // DB 분배 현황 표의 첫 번째 "상세보기" 버튼 클릭
      // (DBDistributionStatus 컴포넌트의 onClick 트리거)
      await page.locator('table tbody tr').first().locator('button, [role="button"], td').last().click({ force: true }).catch(async () => {
        // fallback: 행 자체 클릭 핸들러가 있는 경우
        await page.locator('table tbody tr').first().click();
      });
      await page.waitForLoadState('networkidle');
    }

    // 폰트/레이아웃 안정화 대기 — 한글 폰트 로딩 시간 확보
    await page.waitForTimeout(500);
    await page.evaluate(() => document.fonts && document.fonts.ready);

    // 차트 등 비동기 렌더 완료 마지막 정착 시간
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(200);

    const file = join(outDir, `${p.slug}.png`);
    await page.screenshot({ path: file, fullPage: true, animations: 'disabled' });
    console.log(`  ✓ ${p.slug}`);
    ok++;
  } catch (err) {
    console.error(`  ✗ ${p.slug} — ${err.message}`);
    fail++;
  } finally {
    await page.close();
  }
}

await browser.close();
console.log(`\n[capture] done: ${ok} ok, ${fail} fail (총 ${PAGES.length}개)`);
process.exit(fail > 0 ? 1 : 0);
