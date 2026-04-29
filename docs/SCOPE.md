# 보닥 플래너 CRM — 디자인 시스템 SCOPE

> **버전**: v1 (2026-04-29, Phase 7-A)
> **목적**: 본 CRM 디자인 시스템의 정체성·경계·운영 모델을 명문화한다. Phase 1~5 마라톤은 "Figma 보닥 v3 정렬"을 전제로 진행됐으나, Phase 7 진입 시점에 그 전제가 정정됐다. 본 문서는 정정된 멘탈 모델을 기록한다.

---

## 1. CRM 은 보닥 v3 와 별개 서비스다

보닥 플래너 CRM 의 디자인 시스템은 **Figma 보닥 디자인시스템 v3 의 정본을 따르지 않는다.** v3 는 본 CRM 작업 중 *네이밍 친숙성을 위한 참조* 였을 뿐 source-of-truth 가 아니었다.

- 두 시스템이 모두 블루 톤이라 외관상 비슷해 보일 수 있으나, 본질적으로 **다른 디자인 시스템**이다.
- DESIGN_SYSTEM.md § 6 의 "갭" 항목은 더 이상 v3 와의 갭이 아니다 — 그것이 **CRM 자체의 spec** 이다.
- 따라서 Phase 6 (v3 visual alignment pass) 는 **공식 폐기**한다.

이 결정은 단순한 명명 변경이 아니라 운영·로드맵 의사결정의 기반이다. 이후의 모든 토큰·컴포넌트 결정은 "v3 와 일치시킬지" 가 아니라 "CRM 사용자·B2B 운영에 적합한지" 를 기준으로 판단한다.

---

## 2. CRM 디자인 시스템의 핵심 모델

본 CRM 디자인 시스템은 다음 4개 축으로 구성된다.

### 2.1 그레이 스케일 (UI 골격, brand 공통)

`cool_neutral_50 ~ 990` 20단계가 모든 UI 의 골격을 형성한다. 배경, 테두리, 본문 텍스트, 비활성 요소 — 모두 그레이 스케일에서 가져온다.

**모든 brand 가 이 그레이 스케일을 공유한다.** 화이트레이블 운영 시 그레이는 *변하지 않는다.*

### 2.2 브랜드 swap 색 (1~2개)

브랜드별로 교체되는 포인트 컬러는 다음 두 개로 압축한다:

- `primary` — **필수**. 버튼, 강조 배경, 활성 상태, 차트 메인 시리즈 등.
- `secondary` — **옵션**. primary 와 시각적으로 다른 보조 액센트가 필요한 경우.

브랜드가 hex 1개만 제공해도 운영 가능 (단색 모드). hex 2개를 제공하면 차트·뱃지 등 다중 색이 필요한 영역에서 이중 액센트로 동작.

### 2.3 status 잠금 (의미 컬러, brand 무관)

`success`, `error`, `warning` 의미 컬러는 **brand 가 바꿀 수 없다.** 시스템에서 잠금 처리.

- `--status-success` (= `#00B493`)
- `--error` (= `#FF5B5B`)
- `--warning` (= `#B45309`)
- `--status-info`, `--status-pending`, `--status-done` 등 도메인 status 도 동일

근거: status 의미는 사용자 학습된 컨벤션 (빨강=경고, 초록=성공). brand 가 바꾸면 인지 비용 증가 + WCAG 대비 보장 어려움.

### 2.4 Other Color (Value 직접 참조 액센트 팔레트)

`magenta`, `purple`, `violet`, `amber`, `orange`, `cyan`, `lime` 등 다양한 색은 **Value 티어에 그대로 유지**한다. 이들은 차트의 다중 시리즈, 도메인 indicator 뱃지, 카테고리 색 분류 등 "다양성이 필요한 영역" 에 사용된다.

이들은 컴포넌트가 *Value 티어를 직접 참조해도 된다* (Semantic 우선 원칙의 명시적 예외). 또는 `--chart-series-3 ~ -5`, `--badge-other-*` 같은 도메인 토큰을 통해 매개해도 된다.

---

## 3. 토큰 티어 재정의

### 3.1 Tier 1 — Value (원자 팔레트)

Figma `Value Colors` 그대로. 약 165개 토큰. 그룹:

- `cool_neutral_50 ~ 990` (20단계)
- `alpha_white_*`, `alpha_black_*` (각 10단계)
- `common_100 / 0` (white / black)
- 색상 그룹 (각 10단계 내외): `light_blue`, `blue`, `cyan`, `green`, `red`, `amber`, `orange`, `magenta`, `purple`, `violet`, `lime`, `blue_dim`
- 서비스 컬러: `naver_green`, `kakao_yellow`

**컴포넌트가 직접 참조해도 OK** — Semantic 우선이지만 차트·뱃지 등 예외가 다수 존재한다.

### 3.2 Tier 2 — Semantic 잠금 (brand 무관)

다음 토큰은 모든 brand 에서 동일하다:

- `bg_primary / bg_secondary / bg_tertiary` — 배경
- `text_primary / text_secondary / text_disabled` — 본문 텍스트
- `icon_*`, `border_*`, `modal_*`, `static_*`
- `status_success`, `status_pending`, `status_done`, `status_info`, `error`, `warning`

### 3.3 Tier 2 — Semantic 브랜드 swap

다음 토큰은 brand 별로 다르다:

- `--brand-primary` (필수)
- `--brand-secondary` (옵션 — 단색 운영 가능)

**파생 토큰** — `color-mix()` 자동 생성 (override 가능):

- `--button-accent-primary` / `-hover` / `-active`
- `--button-accent-secondary` / `-hover` / `-active`
- `--bg-emphasis-primary`
- `--text-accent`, `--icon-active`

### 3.4 도메인 보강 + Other Color 토큰

기존 도메인:
- `--row-stripe`, `--row-hover`, `--bg-faint`, `--kanban-column-bg`, `--nav-hover-bg`
- `--bg-app-body`, `--bg-selected-subtle`

신규 (Phase 7-C):
- `--chart-series-1 ~ -5` — 차트 다중 시리즈 컬러
- `--badge-other-*` — 도메인 indicator 뱃지 (필요 시)

---

## 4. color-mix() 파생 정책

브랜드 swap 시 hover / active / subtle 같은 파생값은 다음 규칙으로 자동 생성한다:

```css
/* 자동 파생 예시 */
--button-accent-primary-hover: color-mix(in srgb, var(--brand-primary) 85%, black);
--bg-emphasis-primary: color-mix(in srgb, var(--brand-primary) 12%, white);
```

### 4.1 파생 규칙 요약

| 파생 토큰                          | 공식                                              |
| ---------------------------------- | ------------------------------------------------- |
| `--button-accent-primary-hover`    | `color-mix(in srgb, primary 85%, black)`           |
| `--button-accent-primary-active`   | `color-mix(in srgb, primary 75%, black)`           |
| `--bg-emphasis-primary`            | `color-mix(in srgb, primary 12%, white)`           |
| `--button-accent-secondary-hover`  | `color-mix(in srgb, secondary 85%, black)`         |
| `--button-accent-secondary-active` | `color-mix(in srgb, secondary 75%, black)`         |

### 4.2 색공간 — srgb 권장

`color-mix()` 는 색공간을 명시적으로 받는다. 본 CRM 은 **srgb 를 권장**한다:

- 단순·일관, 호환성 우선.
- `oklab` 은 인지적으로 더 자연스럽지만 새 기능 — 향후 도입 검토.

### 4.3 명시 override

자동 파생값이 부자연스러운 경우 (예: 채도 높은 색이 darken 시 탁해짐), brand 가 명시적으로 hex 를 지정해 override 할 수 있다.

```ts
// 예: default brand 의 primaryHover 는 자동 파생값 대신 명시값 유지
palette: {
  primary: '#3182F6',
  primaryHover: '#1B64DA',  // 명시 override (색감 보존 목적)
}
```

명시값이 있으면 우선, 없으면 `color-mix` 파생.

---

## 5. Brand 인터페이스 슬림화 방향

Phase 5 의 인터페이스는 6개 컬러 필드를 요구했다 (primary, primaryHover, emphasisPrimary, success, danger, warning). Phase 7-B 에서 다음으로 슬림화한다.

```ts
export interface BrandPalette {
  primary: string;            // 필수
  secondary?: string;         // 옵션 — 미지정 시 단색 모드
  primaryHover?: string;      // 옵션 — 미지정 시 color-mix 자동
  secondaryHover?: string;
  emphasisPrimary?: string;
}
// success/danger/warning 은 Brand 에서 제거 — 시스템 잠금
```

### 5.1 신규 customer onboarding 비용

이 슬림화 후 신규 brand 등록은 **hex 1개로 가능**하다:

```ts
// 가장 단순한 customer
palette: { primary: '#FF5500' }
```

`palette.primary` 만 받으면 hover, active, subtle 모두 `color-mix` 로 자동 생성. status 는 시스템 잠금이라 brand 가 신경 쓸 필요 없음.

### 5.2 기존값 보존

default brand (보닥) 와 sample brand 의 hover 명시값은 보존한다 — 자동 파생값과 1~3 byte 차이가 발생할 수 있어 시각 변화 0 원칙 유지를 위해 필요.

---

## 6. 적용 범위 외 (Out of scope)

다음은 본 디자인 시스템 SCOPE 의 적용 범위가 아니다:

- **Figma v3 와의 hex 정합** — Phase 6 폐기와 함께 무효.
- **다크 모드** — 현재 라이트 모드만. 다크 모드 추가 시 Tier 2 Semantic 의 매핑을 분기하면 된다 (Tier 1 Value 는 그대로).
- **i18n / RTL** — 별도 트랙.
- **모션·애니메이션 토큰** — 별도 트랙.

---

## 7. Phase 7 마라톤 (이 문서의 후속 작업)

| 단계 | 작업                                                                                                                  | 산출물                            | 시각 영향                |
| ---- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------------------------ |
| 7-A  | 본 문서(SCOPE.md) 작성 + DESIGN_SYSTEM.md 머리말·§ 6·§ 10 갱신                                                        | docs only                         | 0                        |
| 7-B  | Brand 인터페이스 슬림화 + applyBrand parametric (color-mix 파생) + status 시스템 잠금                                 | 코드 + diff 0 검증                | 0 (default), spot-check (sample) |
| 7-C  | `--chart-series-*`, `--badge-other-*` 토큰 정의                                                                       | tokens.css + DESIGN_SYSTEM 갱신   | 0                        |
| 7-D  | `scripts/lint-tokens.mjs` — 미사용 토큰 audit 리포트 (코드 변경 0)                                                   | script + 리포트                   | 0                        |
| 7-E  | 7-D 리포트 기반 미사용 토큰 cleanup                                                                                   | tokens.css 정리                   | 0 (미사용이라 영향 없음) |

각 단계 별도 커밋, baseline 검증, 사용자 확인 후 다음 단계 진입.

---

**문서 갱신 규칙**: 본 문서는 SCOPE 자체가 변할 때만 갱신한다 (예: 신규 핵심 모델 도입, 디자인 시스템 정체성 변화). 토큰 추가/삭제는 DESIGN_SYSTEM.md § 2~6 에서 다룬다.
