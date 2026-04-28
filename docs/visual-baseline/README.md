# Visual Baseline

디자인 시스템 마이그레이션의 *시각 변화 0* 원칙을 픽셀 diff로 강제하는 회귀 검사 인프라.

## 디렉터리 구조

```
docs/visual-baseline/
├── before/              ← 기준 baseline (21 PNG, git tracked)
├── after-step{N}/       ← 단계별 캡처 (gitignore 후보)
└── diff/step{N}/        ← 픽셀 diff PNG + _summary.json (gitignore 후보)
```

## 21 캡처 페이지

`scripts/visual-baseline/pages.mjs` 정의 기준:

- **14 PAGE_META URL 진입** — `?page=...` 쿼리로 직접 접근
- **6 customer-detail 탭** — `?page=customer-detail&tab={key}`
- **1 DB 분배 현황 상세** — DB 분배 현황 → 첫 행 클릭 네비게이션

## 사용법

dev 서버(`http://localhost:3000`)가 떠 있어야 함.

```bash
# baseline 재생성 (한 번만)
node scripts/visual-baseline/capture.mjs --target=before

# 단계 작업 후 캡처 + diff
node scripts/visual-baseline/capture.mjs --target=after-step1
node scripts/visual-baseline/diff.mjs --step=1
# exit 0 = 통과, exit 1 = 회귀 발생 (페이지 이름 + 픽셀 수)
```

## 결정성 패치 (capture.mjs)

차트(recharts) sub-pixel 비결정성을 누르기 위해 캡처 시점 한정으로:

1. `page.addStyleTag()` 로 모든 `animation-*` / `transition-*` 강제 0초.
2. `screenshot({ animations: 'disabled' })`.
3. screenshot 직전 `networkidle` + 200ms 정착 대기.

> 컴포넌트 코드는 변경하지 않음. 캡처-only 주입.

## 검증 결과 (baseline 생성 시점)

코드 0 변화 상태에서 capture 두 번 → diff:

| 페이지 | 픽셀 차 |
|---|---|
| 01-home-dashboard | 50 px (sub-pixel ceiling) |
| 02 ~ 21 | 0 px |

→ 임계치 (`maxDiffPixels=50`, `threshold=0.1`) 안쪽으로 안정.
패치 전 같은 환경: HomeDashboard 1005~1104 px (recharts 애니메이션 비결정성).

## 임계치

`scripts/visual-baseline/diff.mjs` 상수:

```js
const THRESHOLD = 0.1;       // pixelmatch threshold (밝기 차 허용)
const MAX_DIFF_PIXELS = 50;  // 페이지당 허용 픽셀 수
```

50 px 초과 = 회귀로 간주. HomeDashboard 차트가 50 px 마지노선이므로 향후 변동 시 마스킹 또는 임계치 조정 검토.
