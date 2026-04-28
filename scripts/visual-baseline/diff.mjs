/**
 * Role: before/ 와 after-step{N}/ 의 PNG 를 비교해 픽셀 diff 산출
 * Key Features: pixelmatch threshold=0.1, maxDiffPixels=50 게이트, 결과 PNG는 diff/{step}/ 에 저장
 * Dependencies: pixelmatch, pngjs, ./pages.mjs
 * Notes: 실행 예시: node scripts/visual-baseline/diff.mjs --step=1
 *        픽셀 차이가 maxDiffPixels 초과면 exit code 1
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { PAGES } from './pages.mjs';

const args = Object.fromEntries(
  process.argv.slice(2)
    .filter(a => a.startsWith('--'))
    .map(a => {
      const [k, v] = a.replace(/^--/, '').split('=');
      return [k, v ?? true];
    })
);

const step = args.step;
if (!step) {
  console.error('사용법: node scripts/visual-baseline/diff.mjs --step=1');
  process.exit(1);
}

// 게이트 임계치 (DESIGN_SYSTEM.md 정책: 시각 변화 0)
const THRESHOLD = 0.1;
const MAX_DIFF_PIXELS = 50;

const beforeDir = resolve('docs/visual-baseline/before');
const afterDir  = resolve(`docs/visual-baseline/after-step${step}`);
const diffDir   = resolve(`docs/visual-baseline/diff/step${step}`);

await mkdir(diffDir, { recursive: true });

console.log(`[diff] step=${step}`);
console.log(`[diff] before=${beforeDir}`);
console.log(`[diff] after =${afterDir}`);
console.log(`[diff] threshold=${THRESHOLD}, maxDiffPixels=${MAX_DIFF_PIXELS}\n`);

const results = [];
let failed = 0;

for (const p of PAGES) {
  const beforePath = `${beforeDir}/${p.slug}.png`;
  const afterPath  = `${afterDir}/${p.slug}.png`;

  if (!existsSync(beforePath)) {
    console.log(`  ⚠ ${p.slug} — before 없음, 스킵`);
    continue;
  }
  if (!existsSync(afterPath)) {
    console.log(`  ⚠ ${p.slug} — after 없음, 스킵`);
    continue;
  }

  const before = PNG.sync.read(await readFile(beforePath));
  const after  = PNG.sync.read(await readFile(afterPath));

  // 사이즈 다르면 명백한 회귀 — 큰 쪽 기준으로 캔버스 맞추는 대신 fail 처리
  if (before.width !== after.width || before.height !== after.height) {
    console.log(`  ✗ ${p.slug} — 크기 다름 ${before.width}x${before.height} vs ${after.width}x${after.height}`);
    failed++;
    results.push({ slug: p.slug, status: 'size-mismatch' });
    continue;
  }

  const { width, height } = before;
  const diff = new PNG({ width, height });
  const diffCount = pixelmatch(
    before.data,
    after.data,
    diff.data,
    width,
    height,
    { threshold: THRESHOLD }
  );

  const diffPath = `${diffDir}/${p.slug}.png`;
  await writeFile(diffPath, PNG.sync.write(diff));

  const passed = diffCount <= MAX_DIFF_PIXELS;
  if (passed) {
    console.log(`  ✓ ${p.slug} — ${diffCount} px`);
  } else {
    console.log(`  ✗ ${p.slug} — ${diffCount} px (> ${MAX_DIFF_PIXELS})`);
    failed++;
  }
  results.push({ slug: p.slug, diffCount, passed });
}

// 요약 JSON
const summary = {
  step,
  threshold: THRESHOLD,
  maxDiffPixels: MAX_DIFF_PIXELS,
  results,
  failed,
};
await writeFile(`${diffDir}/_summary.json`, JSON.stringify(summary, null, 2));

console.log(`\n[diff] step${step}: ${failed === 0 ? '통과' : `${failed}개 회귀`}`);
process.exit(failed > 0 ? 1 : 0);
