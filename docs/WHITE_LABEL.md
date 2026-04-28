# 화이트레이블 운영 가이드

이 CRM 은 단일 코드베이스 + 브랜드 토큰 분리로 *컴포넌트 코드 수정 0* 으로 새 customer 용 빌드를 만들 수 있습니다.

> 정본 사양: [`DESIGN_SYSTEM.md` § 8](../DESIGN_SYSTEM.md). 본 문서는 운영 절차.

## 디렉터리 구조 (Phase 5 결과)

```
src/config/
├── brand/
│   ├── types.ts       Brand 인터페이스
│   ├── default.ts     보닥 (흥국화재) — defaultBrand
│   ├── sample.ts      데모용 sample 브랜드 (red 톤)
│   ├── apply.ts       applyBrand() — :root CSS vars 주입
│   └── index.ts       getActiveBrand() — VITE_BRAND env 분기
├── palette/
│   ├── types.ts       BrandPalette 인터페이스
│   ├── bodak.ts       보닥 핵심 hex
│   └── sample.ts      sample 핵심 hex
└── copy/
    ├── types.ts       PageCopy / PageMeta 인터페이스
    └── default.ko.ts  보닥 페이지 카피 (메뉴 키 → 타이틀/부제)

public/brand/
├── default/
│   ├── logo.svg
│   ├── favicon.svg
│   └── og.png
└── sample/
    └── (동상)
```

## 활성 브랜드 결정

`getActiveBrand()` 가 빌드 시점 `VITE_BRAND` 환경변수로 분기:

```bash
# default 브랜드 (보닥)
npm run dev
npm run build

# sample 브랜드
VITE_BRAND=sample npm run dev
VITE_BRAND=sample npm run build
```

미지정 또는 알 수 없는 키 → `default` 폴백 (production safe).

> hostname 기반 라우팅 (`heungkuk.bodak.kr` → `heungkuk`) 은 후속 phase 검토 — 현재는 빌드 시점 env 만.

## 새 브랜드 추가 절차 (체크리스트)

새 customer (예: `heungkuk`) 추가 시:

1. **Palette 정의**
   - `src/config/palette/heungkuk.ts` 생성 (sample.ts 복사 후 hex 교체)
   - 필수: `primary`, `primaryHover`, `success`, `danger`
   - 선택: `emphasisPrimary`, `accent`, `warning`

2. **Brand 정의**
   - `src/config/brand/heungkuk.ts` 생성
   - 필수: `key: 'heungkuk'`, `name`, `partnerName`, `logoInitial`, `palette`
   - 선택: `productName`, `logoUrl`, `faviconUrl`, `ogImageUrl`, `termsUrl`, `privacyUrl`, `supportEmail`

3. **레지스트리 등록**
   - `src/config/brand/index.ts` 의 `brands` 객체에 `heungkuk: heungkukBrand` 추가
   - import 라인도 추가

4. **자산 업로드**
   - `public/brand/heungkuk/logo.svg` (사이드바 로고용, 추후 logoInitial 대체)
   - `public/brand/heungkuk/favicon.svg`
   - `public/brand/heungkuk/og.png` (1200×630)
   - `Brand.logoUrl` / `faviconUrl` / `ogImageUrl` 에 경로 명시 (예: `/brand/heungkuk/logo.svg`)

5. **(선택) 도메인 용어 분기**
   - `src/config/copy/heungkuk.ko.ts` 생성 (라벨이 다를 경우만 — 예: '상담 진행 고객' → '진행 중 고객')
   - App.tsx 의 PAGE_META import 를 활성 브랜드 기반으로 분기 (후속 phase 검토)

6. **실행 + QA**
   ```bash
   VITE_BRAND=heungkuk npm run dev
   ```
   - 사이드바 로고 / 이름 / 제휴사명 → heungkuk 으로 갱신
   - 활성 메뉴 / 검색 버튼 / KPI 강조 → heungkuk primary 색
   - Badge / DataTable 줄무늬 / 일반 텍스트·보더 → 변화 없음 (brand-safe)
   - Hover / active / focus 상태 → primary-hover 색
   - 21 페이지 spot-check 권장

7. **Figma 동기화**
   - Figma `브랜드 컬러 페이지` 에 새 브랜드 시트 추가 (Value 그룹 동기화)

## 토큰 분류 — `@brand-free` vs `@brand-safe`

`tokens.css` 주석으로 명시. `applyBrand()` 는 **`@brand-free` 만 갱신**:

| 분류 | 예시 토큰 | 동작 |
|---|---|---|
| `@brand-free` | `--button-accent-primary`, `--button-accent-primary-hover`, `--bg-emphasis-primary`, `--accent`, `--color-primary*` | 브랜드별 갱신 |
| `@brand-safe` (도메인) | `--error`, `--status-success`, `--warning` | 브랜드별 갱신 (palette.danger/success/warning 따름) |
| `@brand-safe` (UI 골격) | `--text-*`, `--bg-primary`, `--border-*`, `--row-*`, `--bg-faint` 등 | **모든 브랜드에서 동일 유지** |

화이트레이블 시 절대 손대지 말아야 할 것 (§ 8.9):
- 컴포넌트 코드 (`src/components/**`) 의 className
- 의미 토큰 매핑 (`button_accent_primary` 가 어떤 Value 를 가리키는지는 바뀌지만, 컴포넌트는 모름)
- DataTable 줄무늬·hover 같은 내부 그레이 (UX 일관성)
- Pretendard 폰트 (한글 가독성 표준)

## 검증 인프라 — visual baseline

`docs/visual-baseline/` 에 default 브랜드 21 페이지 baseline 보관.

화이트레이블 작업 후:
```bash
# default 브랜드 회귀 검증
node scripts/visual-baseline/capture.mjs --target=after-whitelabel
node scripts/visual-baseline/diff.mjs --step=whitelabel
```

새 브랜드 spot-check (시각 확인용, baseline 무관):
```bash
VITE_BRAND=heungkuk npm run dev
# 별도 터미널
node scripts/visual-baseline/capture-one.mjs --page=02-consult-active --target=whitelabel-demo/heungkuk
```

## 관련 문서

- [`DESIGN_SYSTEM.md` § 0 작업 원칙](../DESIGN_SYSTEM.md#0-작업-원칙)
- [`DESIGN_SYSTEM.md` § 8 화이트레이블 가이드](../DESIGN_SYSTEM.md#8-화이트레이블-b2b-재판매-가이드)
- [`docs/visual-baseline/README.md`](visual-baseline/README.md)
