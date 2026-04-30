#!/usr/bin/env node
/**
 * Role: 토큰 사용 audit — tokens.css + index.css 정의 토큰의 실제 사용 여부 추적 (Phase 7-D / 8-F)
 * Key Features: var() 정적 + applyBrand setProperty 동적 + Tailwind alias 체인 + 매크로 클래스 인식
 *               + --check 모드 (Phase 8-F): git diff 기준 신규 토큰 사용처 강제 + @deprecated 신규 사용 경고
 * Dependencies: node:fs, node:child_process (외부 의존성 없음)
 * Notes: 기본 모드는 audit only (코드 변경 없음). --json 자동화. --check PR 시점 강제.
 *        false positive (실제 미사용을 사용으로 분류) 보다는 false negative
 *        (사용 중을 미사용으로 표시) 가 위험하므로 보수적으로 매칭한다.
 */

import { readFile, readdir } from 'node:fs/promises';
import { resolve, join, extname } from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const SCAN_EXT = new Set(['.ts', '.tsx', '.js', '.mjs', '.css', '.html']);
const JSON_MODE = process.argv.includes('--json');
const CHECK_MODE = process.argv.includes('--check');
const SINCE_ARG = process.argv.find(a => a.startsWith('--since='));
const SINCE = SINCE_ARG ? SINCE_ARG.slice('--since='.length) : 'main';

// Tailwind v4 utility prefix → @theme 변수 prefix 매핑
// --color-{x} 정의는 bg-{x}/text-{x}/... 다양한 utility 로 사용 가능
const TAILWIND_THEME_PREFIXES = {
  '--color-':       ['bg', 'text', 'border', 'outline', 'ring', 'fill', 'stroke', 'from', 'to', 'via', 'decoration', 'divide', 'placeholder', 'accent', 'caret', 'shadow'],
  '--font-size-':   ['text'],
  '--font-weight-': ['font'],
  '--leading-':     ['leading'],
  '--letter-spacing-': ['tracking'],
  '--radius-':      ['rounded'],
  '--spacing-':     ['p', 'px', 'py', 'pt', 'pr', 'pb', 'pl', 'm', 'mx', 'my', 'mt', 'mr', 'mb', 'ml', 'gap', 'gap-x', 'gap-y', 'w', 'h', 'min-w', 'min-h', 'max-w', 'max-h', 'space-x', 'space-y'],
};

// ── 1. 토큰 정의 + alias 매핑 + @reserved 마크 추출 ──
async function readDefs() {
  const tokensCss = await readFile(resolve(ROOT, 'src/styles/tokens.css'), 'utf-8');
  const indexCss  = await readFile(resolve(ROOT, 'src/index.css'), 'utf-8');

  const tokens = new Map();      // name -> { source, reserved }
  const aliasMap = new Map();    // alias name -> referenced token name (1단계 alias)
  const tokenLineRe = /^\s*(--[\w-]+)\s*:\s*([^;]+);([^\n]*)$/;
  const singleVarRegex = /^var\(\s*(--[\w-]+)/;

  function extract(content, source) {
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const m = tokenLineRe.exec(lines[i]);
      if (!m) continue;
      const name = m[1];
      const def = m[2].trim();
      const trailingComment = m[3] || '';
      const prevLine = i > 0 ? lines[i - 1] : '';
      // prev 라인이 다른 토큰 정의면 그 trailing 의 @reserved/@deprecated 가 본 토큰에 전이되지 않도록 제외
      const prevIsTokenDef = /^\s*--[\w-]+\s*:\s*[^;]+;/.test(prevLine);
      // 같은 라인 trailing comment 또는 직전 코멘트 라인에 마크 있으면 인식
      const reserved = /@reserved\b/.test(trailingComment) ||
                       (!prevIsTokenDef && /@reserved\b/.test(prevLine));
      const deprecated = /@deprecated\b/.test(trailingComment) ||
                         (!prevIsTokenDef && /@deprecated\b/.test(prevLine));
      tokens.set(name, { source, reserved, deprecated, line: i + 1 });
      const am = singleVarRegex.exec(def);
      if (am) aliasMap.set(name, am[1]);
    }
  }
  extract(tokensCss, 'tokens.css');
  extract(indexCss, 'index.css');
  return { tokens, aliasMap };
}

// ── 2. 코드 파일 수집 (재귀 readdir) ──
async function collectFiles() {
  const files = [];
  async function walk(dir) {
    let entries;
    try { entries = await readdir(dir, { withFileTypes: true }); } catch { return; }
    for (const entry of entries) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
        await walk(path);
      } else if (SCAN_EXT.has(extname(entry.name))) {
        files.push(path);
      }
    }
  }
  await walk(resolve(ROOT, 'src'));
  files.push(resolve(ROOT, 'index.html'));
  return files;
}

// ── 3. 코드 스캔 — var() / setProperty / 매크로 정의 / className 후보 ──
async function scanCode(files) {
  const varUses = new Set();
  const setPropTokens = new Set();
  const macroDefs = new Map();           // 매크로 클래스명 -> { uses: var() 참조 토큰[] }
  const classNames = new Set();          // 컴포넌트/HTML 의 className 후보 토큰
  const aliasVarRefs = new Set();        // var(--alias) 형태 참조된 alias 자체

  const varUseRe = /var\(\s*(--[\w-]+)/g;
  const setPropRe = /setProperty\(\s*['"](--[\w-]+)['"]/g;
  const macroDefRe = /^\.([a-z][\w-]*)\s*\{([^}]*)\}/gms;
  const classAttrRe = /\bclass(?:Name)?\s*=\s*['"`]([^'"`]+)['"`]/g;
  const classCandidateRe = /[a-z][a-z0-9-]*-[a-z0-9-]+/g;

  for (const file of files) {
    let content;
    try { content = await readFile(file, 'utf-8'); } catch { continue; }
    let m;

    varUseRe.lastIndex = 0;
    while ((m = varUseRe.exec(content))) varUses.add(m[1]);

    setPropRe.lastIndex = 0;
    while ((m = setPropRe.exec(content))) setPropTokens.add(m[1]);

    // 매크로 클래스 정의 — index.css 만 대상
    if (file.endsWith('index.css')) {
      macroDefRe.lastIndex = 0;
      while ((m = macroDefRe.exec(content))) {
        const cls = m[1];
        const body = m[2];
        const refs = [];
        const innerVarRe = /var\(\s*(--[\w-]+)/g;
        let vm;
        while ((vm = innerVarRe.exec(body))) refs.push(vm[1]);
        macroDefs.set(cls, { uses: refs });
      }
    }

    // className/class 속성에서 후보 클래스 추출 (정밀도 ↑)
    classAttrRe.lastIndex = 0;
    while ((m = classAttrRe.exec(content))) {
      const attrValue = m[1];
      const ccRe = /[a-z][a-z0-9-]*-[a-z0-9-]+/g;
      let cm;
      while ((cm = ccRe.exec(attrValue))) classNames.add(cm[0]);
    }
    // cn(), clsx() 등 helper 안의 string literal 도 잡기 위해 ts/tsx 는 광범위 추가
    if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js')) {
      const stringLitRe = /['"`]([^'"`\n]{2,200})['"`]/g;
      let sm;
      while ((sm = stringLitRe.exec(content))) {
        const s = sm[1];
        if (!/[a-z]-[a-z0-9]/.test(s)) continue;  // hyphen 패턴 있는 string 만
        const ccRe = /[a-z][a-z0-9-]*-[a-z0-9-]+/g;
        let cm;
        while ((cm = ccRe.exec(s))) classNames.add(cm[0]);
      }
    }
  }

  // var(--alias) 참조 — alias 자체도 사용 처리
  for (const u of varUses) aliasVarRefs.add(u);

  return { varUses, setPropTokens, macroDefs, classNames, aliasVarRefs };
}

// ── 4. Tailwind theme prefix 매칭 — alias 든 직접 정의든 양쪽 추적 ──
function resolveTailwindUsage(tokens, aliasMap, classNames) {
  const usedViaTw = new Set();
  // 정의된 모든 토큰을 Tailwind theme prefix 와 매칭 (alias 여부 무관)
  for (const tokenName of tokens.keys()) {
    for (const [themePrefix, utilPrefixes] of Object.entries(TAILWIND_THEME_PREFIXES)) {
      if (!tokenName.startsWith(themePrefix)) continue;
      const suffix = tokenName.slice(themePrefix.length);
      for (const util of utilPrefixes) {
        if (classNames.has(`${util}-${suffix}`)) {
          usedViaTw.add(tokenName);
          // alias 라면 원본도 사용 처리
          const original = aliasMap.get(tokenName);
          if (original) usedViaTw.add(original);
          break;
        }
      }
      break;
    }
  }
  return usedViaTw;
}

// ── 5. 매크로 클래스 사용 → 매크로가 var() 참조하는 토큰들도 사용 ──
function resolveMacros(macroDefs, classNames) {
  const usedFromMacros = new Set();
  for (const [macroName, { uses }] of macroDefs) {
    if (classNames.has(macroName)) {
      for (const t of uses) usedFromMacros.add(t);
    }
  }
  return usedFromMacros;
}

// ── 6. alias chain 1-hop 확장 ──
// var(--alias) 가 사용됐으면 그 alias 가 가리키는 원본도 사용 처리
function expandAliasChain(usedSet, aliasMap) {
  const expanded = new Set(usedSet);
  let changed = true;
  while (changed) {
    changed = false;
    for (const t of [...expanded]) {
      const original = aliasMap.get(t);
      if (original && !expanded.has(original)) {
        expanded.add(original);
        changed = true;
      }
    }
  }
  return expanded;
}

// ── 7. 카테고리 분류 ──
function categorize(name) {
  if (/^--chart-series-\d+$/.test(name)) return 'Other Color';
  if (/^--color-chart-series-\d+$/.test(name)) return 'Other Color (alias)';
  if (/^--font-(size|weight)-/.test(name)) return 'Typography';
  if (/^--(line-height|leading)-/.test(name)) return 'Typography';
  if (/^--letter-spacing-/.test(name)) return 'Typography';
  if (/^--font-sans$/.test(name)) return 'Typography';
  if (/^--radius/.test(name)) return 'Radius';
  if (/^--spacing-/.test(name)) return 'Spacing';
  if (/^--color-(primary|success|danger|warning|surface|bg$|neutral)/.test(name)) return 'Legacy (Tier 3)';
  if (/^--color-(text-|border|button-|icon-|modal-|static-|status-|overlay|chart-accent|chart-grid|chart-axis|chart-tooltip|accent$|error$|bg-)/.test(name)) return 'Tailwind alias';
  if (/^--(chart-accent|chart-grid|chart-axis|chart-tooltip|row-stripe|row-hover|bg-faint|bg-app-body|bg-selected|kanban-|nav-hover|text-strong|danger-hover|danger-active)/.test(name)) return 'Domain';
  if (/^--(button-accent|bg-emphasis|accent$|text-accent|icon-active|icon-accent|brand-)/.test(name)) return 'Semantic 브랜드';
  if (/^--(bg-|text-|icon-|border-|modal-|static-|status-|overlay-|button-)/.test(name)) return 'Semantic 잠금';
  if (/^--(error|warning)$/.test(name)) return 'Semantic 잠금';
  if (/^--[a-z][a-z-]*-\d+$/i.test(name)) return 'Value';
  if (/^--common-\d+$/.test(name)) return 'Value';
  return 'Other';
}

// ── 8. 그룹 분류 (Value 의 prefix 기반) ──
function getGroup(name) {
  const m = /^--([a-z][a-z-]*?)-(\d+)$/.exec(name);
  if (m) return m[1].replace(/-/g, '_');
  return null;
}

// ── 9. --check 모드 helper: git diff 로 신규 토큰 / 추가 코드 라인 추출 ──
function getMergeBaseStatus(since) {
  try {
    execSync(`git merge-base ${since} HEAD`, { stdio: ['ignore', 'pipe', 'ignore'] });
    return 'ok';
  } catch {
    return 'unrelated';
  }
}

function getAddedTokenLines(since) {
  // git diff 로 tokens.css + index.css 의 추가된 토큰 정의 라인 추출
  let diff;
  try {
    diff = execSync(
      `git diff ${since}..HEAD -- src/styles/tokens.css src/index.css`,
      { encoding: 'utf-8', maxBuffer: 50 * 1024 * 1024 }
    );
  } catch {
    return [];
  }
  const added = [];
  for (const line of diff.split('\n')) {
    if (!line.startsWith('+') || line.startsWith('+++')) continue;
    const m = /^\+\s*(--[\w-]+)\s*:/.exec(line);
    if (m) added.push(m[1]);
  }
  return added;
}

function getAddedCodeLines(since) {
  // git diff 로 src/** 의 모든 추가 라인 추출 (file + text)
  let diff;
  try {
    diff = execSync(
      `git diff ${since}..HEAD -- src/`,
      { encoding: 'utf-8', maxBuffer: 50 * 1024 * 1024 }
    );
  } catch {
    return [];
  }
  const added = [];
  let currentFile = null;
  for (const line of diff.split('\n')) {
    if (line.startsWith('+++ b/')) {
      currentFile = line.slice(6);
      continue;
    }
    if (line.startsWith('+') && !line.startsWith('+++')) {
      added.push({ file: currentFile, text: line.slice(1) });
    }
  }
  return added;
}

function findDeprecatedUsage(deprecatedTokens, addedLines) {
  const warnings = [];
  for (const t of deprecatedTokens) {
    const bareName = t.slice(2); // "--row-stripe" → "row-stripe"
    const escName = t.replace(/-/g, '\\-');
    const escBare = bareName.replace(/-/g, '\\-');
    // hyphen 도 word char 로 취급한 엄격한 경계 — bg-bg-row-stripe 안의 bg-row-stripe substring 매칭 회피
    // var() 매칭: token 앞 (와 공백 외) / 뒤 ) 또는 word 끝
    const varRe = new RegExp(`var\\(\\s*${escName}(?![\\w-])`);
    // Tailwind utility 매칭: util prefix 앞에 [\w-] 가 없어야 함 (substring 회피), suffix 뒤도 [\w-] 없어야
    const utilRe = new RegExp(`(?<![\\w-])(?:bg|text|border|outline|ring|fill|stroke|shadow|rounded|hover:bg|hover:text|active:bg|active:text)-${escBare}(?![\\w-])`);
    for (const { file, text } of addedLines) {
      // tokens.css/index.css 자체의 alias 정의 라인은 스킵 (정의 표기지 사용 아님)
      if (file && (file.endsWith('tokens.css') || file.endsWith('index.css'))) continue;
      if (varRe.test(text) || utilRe.test(text)) {
        warnings.push({ token: t, file, text: text.trim() });
      }
    }
  }
  return warnings;
}

// ── 10. 메인 ──
async function main() {
  const { tokens, aliasMap } = await readDefs();
  const files = await collectFiles();
  const { varUses, setPropTokens, macroDefs, classNames } = await scanCode(files);

  const usedViaTw = resolveTailwindUsage(tokens, aliasMap, classNames);
  const usedFromMacros = resolveMacros(macroDefs, classNames);

  let used = new Set();
  for (const t of varUses) used.add(t);
  for (const t of setPropTokens) used.add(t);
  for (const t of usedViaTw) used.add(t);
  for (const t of usedFromMacros) used.add(t);
  used = expandAliasChain(used, aliasMap);

  // 정의에 없는 토큰은 used 에서 제외 (외부 var() 가 잘못 들어왔을 수 있음)
  const definedNames = new Set(tokens.keys());
  const usedDefined = new Set([...used].filter(t => definedNames.has(t)));

  const allTokens = [...tokens.keys()].sort();
  // @reserved 마크된 토큰은 별도 분류 — 미사용이라도 의도적 reserve 로 카운트 분리
  const reservedNames = allTokens.filter(t => tokens.get(t).reserved);
  const reservedSet = new Set(reservedNames);
  // @deprecated 마크된 토큰도 별도 분류 — 1년 유예 호환 alias 는 의도된 미사용
  const deprecatedNames = allTokens.filter(t => tokens.get(t).deprecated && !reservedSet.has(t));
  const deprecatedSet = new Set(deprecatedNames);
  const unusedTokens = allTokens.filter(t => !usedDefined.has(t) && !reservedSet.has(t) && !deprecatedSet.has(t));

  // 그룹별 (reserved/deprecated 토큰은 그룹 통계에서 제외 — Value 그룹에 속하는 경우 거의 없음)
  const byGroup = {};
  for (const t of allTokens) {
    if (reservedSet.has(t) || deprecatedSet.has(t)) continue;
    const grp = getGroup(t);
    if (!grp) continue;
    if (!byGroup[grp]) byGroup[grp] = { total: 0, unused: 0, unusedNames: [] };
    byGroup[grp].total++;
    if (!usedDefined.has(t)) {
      byGroup[grp].unused++;
      byGroup[grp].unusedNames.push(t);
    }
  }

  // 카테고리별 (reserved 는 'Reserved (spec)', deprecated 는 'Deprecated (1년 유예)' 로 별도 분리)
  const byCategory = {};
  for (const t of allTokens) {
    let cat;
    if (reservedSet.has(t)) cat = 'Reserved (spec)';
    else if (deprecatedSet.has(t)) cat = 'Deprecated (1년 유예)';
    else cat = categorize(t);
    if (!byCategory[cat]) byCategory[cat] = { total: 0, unused: 0, unusedNames: [] };
    byCategory[cat].total++;
    if (!usedDefined.has(t) && !reservedSet.has(t) && !deprecatedSet.has(t)) {
      byCategory[cat].unused++;
      byCategory[cat].unusedNames.push(t);
    }
  }

  if (JSON_MODE) {
    console.log(JSON.stringify({
      defined: allTokens.length,
      reserved: reservedNames.length,
      deprecated: deprecatedNames.length,
      used: usedDefined.size,
      unused: unusedTokens.length,
      byGroup,
      byCategory,
      reservedTokens: reservedNames,
      deprecatedTokens: deprecatedNames,
      unusedTokens: unusedTokens.map(t => ({ name: t, group: getGroup(t), category: categorize(t) })),
    }, null, 2));
    return;
  }

  console.log('=== Token Usage Audit ===');
  console.log(`정의된 토큰: ${allTokens.length} 개`);
  console.log(`Reserved (spec, 의도적 미사용): ${reservedNames.length} 개`);
  console.log(`Deprecated (1년 유예 alias): ${deprecatedNames.length} 개`);
  console.log(`사용 중: ${usedDefined.size} 개`);
  console.log(`미사용 (reserved/deprecated 제외): ${unusedTokens.length} 개`);

  console.log('\n── 그룹별 미사용 ──');
  const sortedGroups = Object.entries(byGroup).sort((a, b) =>
    b[1].unused - a[1].unused || a[0].localeCompare(b[0])
  );
  for (const [grp, info] of sortedGroups) {
    const usedCnt = info.total - info.unused;
    const note = info.unused === info.total ? '(전체)' : `(사용 ${usedCnt}/${info.total})`;
    console.log(`${grp.padEnd(15)} ${String(info.unused).padStart(2)}/${String(info.total).padStart(2)} 미사용 ${note}`);
  }

  console.log('\n── 카테고리별 미사용 ──');
  const sortedCats = Object.entries(byCategory).sort((a, b) =>
    b[1].unused - a[1].unused || a[0].localeCompare(b[0])
  );
  for (const [cat, info] of sortedCats) {
    const usedCnt = info.total - info.unused;
    console.log(`${cat.padEnd(20)} ${String(info.unused).padStart(3)}/${String(info.total).padStart(3)} 미사용 (사용 ${usedCnt})`);
  }

  if (unusedTokens.length > 0) {
    console.log('\n── 미사용 토큰 전체 목록 ──');
    for (const t of unusedTokens) {
      console.log(`${t.padEnd(40)} (${categorize(t)})`);
    }
  }

  if (reservedNames.length > 0) {
    console.log('\n── Reserved (spec) 목록 ──');
    for (const t of reservedNames.sort()) {
      console.log(`${t.padEnd(40)} spec 정의 (의도적 미사용)`);
    }
  }

  if (deprecatedNames.length > 0) {
    console.log('\n── Deprecated (1년 유예 alias) 목록 ──');
    for (const t of deprecatedNames.sort()) {
      console.log(`${t.padEnd(40)} 호환 alias (정식 삭제 예정)`);
    }
  }

  // ── --check 모드 (Phase 8-F): git diff 기반 PR 시점 강제 ──
  if (CHECK_MODE) {
    console.log(`\n=== Token Lint (--check) ===`);
    console.log(`비교 기준: ${SINCE}..HEAD`);

    const baseStatus = getMergeBaseStatus(SINCE);
    if (baseStatus === 'unrelated') {
      console.log(`\n⚠️  ${SINCE} 와 HEAD 가 unrelated histories — diff 가 모든 파일을 신규로 인식합니다.`);
      console.log(`    검사를 skip 합니다. 실제 PR 시 base branch (예: --since=origin/main 또는 --since=HEAD~1) 사용 권장.`);
      console.log(`\n✅ Token lint skipped (unrelated histories).`);
      process.exit(0);
    }

    const addedTokens = getAddedTokenLines(SINCE);
    const addedCodeLines = getAddedCodeLines(SINCE);

    // 추가된 토큰 분류: 사용 / reserved / deprecated / 위반
    const violations = [];
    const reservedAdded = [];
    const deprecatedAdded = [];
    const usedAdded = [];
    for (const t of addedTokens) {
      const info = tokens.get(t);
      if (!info) continue;  // 정의 추출 실패 — 안전 무시
      if (info.reserved) {
        reservedAdded.push(t);
      } else if (info.deprecated) {
        deprecatedAdded.push(t);  // 의도된 1년 유예 alias — violations 제외
      } else if (usedDefined.has(t)) {
        usedAdded.push(t);
      } else {
        violations.push({ name: t, line: info.line, source: info.source });
      }
    }

    // @deprecated 신규 사용 검사 (경고만)
    const deprecatedTokens = allTokens.filter(t => tokens.get(t).deprecated);
    const deprecatedWarnings = findDeprecatedUsage(deprecatedTokens, addedCodeLines);

    // 출력
    console.log(`\n추가된 토큰: ${addedTokens.length}`);
    console.log(`├─ 사용처 있음: ${usedAdded.length} ✅`);
    console.log(`├─ @reserved: ${reservedAdded.length} ✅ (의도된 reserve)`);
    console.log(`├─ @deprecated: ${deprecatedAdded.length} ✅ (1년 유예 alias)`);
    console.log(`└─ ${violations.length > 0 ? '❌' : '✅'} 즉시 사용 없음 + @reserved/@deprecated 표시도 없음: ${violations.length}`);
    console.log(`\nDeprecated token 신규 사용: ${deprecatedWarnings.length} ${deprecatedWarnings.length > 0 ? '⚠️' : '✅'}`);

    let exitCode = 0;
    if (violations.length > 0) {
      console.log(`\n❌ 신규 토큰이 추가됐으나 사용처가 없습니다:`);
      for (const v of violations) {
        console.log(`   ${v.name}  (${v.source}:${v.line})`);
      }
      console.log(`\n다음 중 하나로 해결:`);
      console.log(`   1. 즉시 사용처와 함께 추가 (DESIGN_SYSTEM § 12 결정 트리 통과)`);
      console.log(`   2. 의도된 reserve 라면 /* @reserved */ 주석 추가`);
      console.log(`   3. 토큰 정의 자체를 PR 에서 제거`);
      exitCode = 1;
    }

    if (deprecatedWarnings.length > 0) {
      console.log(`\n⚠️  Deprecated token used in new code (suggestion 만, exit 0):`);
      for (const w of deprecatedWarnings) {
        console.log(`   ${w.token} in ${w.file}`);
        console.log(`     ${w.text.slice(0, 120)}`);
      }
    }

    if (exitCode === 0) {
      console.log(`\n✅ Token lint passed.`);
    }
    process.exit(exitCode);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
