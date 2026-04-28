# 보닥 플래너 CRM — 디자인 시스템

> **버전**: v3 정렬 1차 정리 (2026-04)
> **단일 소스**: Figma 디자인시스템 v3 (Value Color · Semantic Color · Typography)
> **목적**: Figma v3 네이밍 규칙을 코드(React + Tailwind v4)에 그대로 이식하고, 시각 디자인은 변경하지 않으면서 토큰·변수·컴포넌트 이름만 일관 정리한다. 동시에 B2B 재판매(화이트레이블) 운영 구조를 정의한다.

---

## 0. 작업 원칙

1. **시각 디자인은 변경하지 않는다.** 색상 hex, 폰트 스케일, 둥글기 같은 *값* 은 현재 화면을 유지하고, 그 값을 가리키는 *이름*만 v3 규칙으로 정리한다.
2. **2-Tier 토큰**을 도입한다. Value Color(원자 팔레트) → Semantic Color(의미 토큰) → Component(컴포넌트). 컴포넌트는 Semantic 토큰만 참조한다.
3. **Figma v3 네이밍을 정본**으로 한다. 코드 변수는 v3 토큰명을 1:1로 따른다 (snake_case → kebab-case 변환만 허용).
4. **현실 갭은 토큰으로 흡수한다.** 현재 코드와 v3 정의가 다르면 코드의 시각값을 유지한 채 v3 이름을 매핑하고, 갭을 § 6에 명시한다 — 가급적 다음 Figma 정리 라운드에 역수입한다.
5. **B2B 화이트레이블은 단일 진입점**(`brand.ts` + 의미 토큰)으로만 작동한다. 컴포넌트는 절대 hex를 직접 참조하지 않는다.
6. **시각 정렬은 별도 페이즈로 분리한다.** 디자인 시스템 정렬 마라톤(Phase 1~5)은 *이름·구조 정렬*만 한다. 시각값 정렬(코드 hex → v3 spec hex 이주)은 **Phase 6 — v3 visual alignment pass** 로 분리하고, 디자이너 검토·승인 후 별도 진행한다. Phase 1~5 동안 § 6.4 갭에 등재된 토큰들은 *코드 현재 hex 를 보유*한다.
7. **§ 4.2.1 짝수 규칙은 § 0.1 시각 변화 0 원칙의 사전 합의된 예외다.** Phase 4-C / 4-D 의 1px 폰트 정렬(19→20, 17→18, 11→12)은 § 4.2.1 의 명시 합의에 따른 의도된 시각 변화이며, cascading layout shift 는 그 자연스러운 결과다. 적용 후 baseline 을 1회 갱신한다.

---

## 1. 토큰 아키텍처 (3계층)

```
┌─────────────────────────────────────────────────┐
│ Tier 1 — Value Tokens                           │
│  원자 팔레트. 색상의 “재료”.                    │
│  ex) cool_neutral_950, light_blue_400, red_500  │
└─────────────────────────────────────────────────┘
                    ↓ 참조
┌─────────────────────────────────────────────────┐
│ Tier 2 — Semantic Tokens                        │
│  의미·역할 단위. 화이트레이블·다크모드 분기점.  │
│  ex) text_primary, bg_primary,                  │
│      button_accent_primary, border_subtle       │
└─────────────────────────────────────────────────┘
                    ↓ 참조
┌─────────────────────────────────────────────────┐
│ Tier 3 — Component Styles                       │
│  컴포넌트는 Tier 2만 사용. hex 금지.            │
│  ex) Button, Badge, KpiCard, DataTable          │
└─────────────────────────────────────────────────┘
```

이 3계층 구조의 핵심:

- **Value 변경**은 톤 자체를 바꿀 때만 (희소).
- **Semantic 변경**이 화이트레이블의 표준 작업 — `button_accent_primary`가 어떤 Value를 가리키는지만 바꾸면 됨.
- **Component 코드는 변하지 않는다.**

---

## 2. Value Tokens (원자 팔레트)

> Figma `Value Colors` 그대로 옮긴 정본. CSS 변수명은 `--{group}-{step}` (kebab-case).
> ⚠️ 표시는 저해상도 스크린샷에서 1~2자리 hex 가독성이 떨어진 항목 — Figma 원본 export로 검증 필요. 검증 전엔 이 값으로 진행해도 Phase 1~3에 영향 없음(Semantic이 가리키는 핵심 값들은 모두 확정 ✅).

### 2.1 Common

| 토큰          | Hex       | CSS 변수            |
| ------------- | --------- | ------------------- |
| `common_100`  | `#FFFFFF` ✅ | `--common-100`   |
| `common_0`    | `#000000` ✅ | `--common-0`     |

### 2.2 Cool Neutral (20단계 — UI 골격)

| 토큰                  | Hex         | 토큰                  | Hex         |
| --------------------- | ----------- | --------------------- | ----------- |
| `cool_neutral_50`     | `#F9F9F9` ✅ | `cool_neutral_550`    | `#7D8085`   |
| `cool_neutral_100`    | `#F2F4F6` ✅ | `cool_neutral_600`    | `#6F7177`   |
| `cool_neutral_150`    | `#E9EBEF`   | `cool_neutral_650`    | `#61656A`   |
| `cool_neutral_200`    | `#E1E3E7`   | `cool_neutral_700`    | `#54595E`   |
| `cool_neutral_250`    | `#DAD7DC` ⚠️ | `cool_neutral_750`    | `#494D53`   |
| `cool_neutral_300`    | `#C8C9CE`   | `cool_neutral_800`    | `#3D4147`   |
| `cool_neutral_350`    | `#B5B6BF`   | `cool_neutral_850`    | `#31353A`   |
| `cool_neutral_400`    | `#A4A8AF`   | `cool_neutral_900`    | `#26282D`   |
| `cool_neutral_450`    | `#969A9F`   | `cool_neutral_950`    | `#1D2024` ✅ |
| `cool_neutral_500`    | `#898B93`   | `cool_neutral_990`    | `#161B1C`   |

### 2.3 Blue Dim (10단계 — 차분한 청색)

| 토큰              | Hex         | 토큰              | Hex         |
| ----------------- | ----------- | ----------------- | ----------- |
| `blue_dim_50`     | `#EAF2F7`   | `blue_dim_500`    | `#67659B` ⚠️ |
| `blue_dim_100`    | `#DBE4ED`   | `blue_dim_600`    | `#476984`   |
| `blue_dim_200`    | `#BBCDDD`   | `blue_dim_700`    | `#295060`   |
| `blue_dim_300`    | `#A29ACC` ⚠️ | `blue_dim_800`    | `#113653`   |
| `blue_dim_400`    | `#7B98AE`   | `blue_dim_900`    | `#052238`   |

### 2.4 Light Blue (10단계 — **v3 액센트, 400이 핵심**)

| 토큰               | Hex         | 토큰               | Hex         |
| ------------------ | ----------- | ------------------ | ----------- |
| `light_blue_50`    | `#E5F7FF`   | `light_blue_500`   | `#00AEFF`   |
| `light_blue_100`   | `#D1F0FD`   | `light_blue_600`   | `#008BCC`   |
| `light_blue_200`   | `#B4E9FA`   | `light_blue_700`   | `#006796`   |
| `light_blue_300`   | `#7CD8FB`   | `light_blue_800`   | `#004261`   |
| `light_blue_400`   | `#10C5FF` ✅ | `light_blue_900`   | `#002130`   |

### 2.5 Blue (10단계 — 정보·링크)

| 토큰          | Hex         | 토큰          | Hex         |
| ------------- | ----------- | ------------- | ----------- |
| `blue_50`     | `#ECF4FF`   | `blue_500`    | `#1E68DE` ✅ |
| `blue_100`    | `#D8E6FB`   | `blue_600`    | `#1358BE`   |
| `blue_200`    | `#B9D2F8`   | `blue_700`    | `#134A9D`   |
| `blue_300`    | `#7DACF3`   | `blue_800`    | `#0D3571`   |
| `blue_400`    | `#4087F2`   | `blue_900`    | `#051F46`   |

### 2.6 Cyan (10단계)

| 토큰          | Hex         | 토큰          | Hex         |
| ------------- | ----------- | ------------- | ----------- |
| `cyan_50`     | `#EBFAFC`   | `cyan_500`    | `#05B0CE`   |
| `cyan_100`    | `#CFF3F9`   | `cyan_600`    | `#0092A9`   |
| `cyan_200`    | `#AAEAF5`   | `cyan_700`    | `#006F82` ✅ |
| `cyan_300`    | `#6EDDF1`   | `cyan_800`    | `#004854`   |
| `cyan_400`    | `#20C8E5`   | `cyan_900`    | `#063239`   |

### 2.7 Green (10단계 — 성공)

| 토큰           | Hex         | 토큰           | Hex         |
| -------------- | ----------- | -------------- | ----------- |
| `green_50`     | `#E6F9F2`   | `green_500`    | `#16BE4E`   |
| `green_100`    | `#CDF6D8`   | `green_600`    | `#009632`   |
| `green_200`    | `#9FEEBA`   | `green_700`    | `#006625`   |
| `green_300`    | `#6BE191`   | `green_800`    | `#004517`   |
| `green_400`    | `#33D287`   | `green_900`    | `#00240C`   |

### 2.8 Lime (11단계 — 150 포함)

| 토큰          | Hex         | 토큰          | Hex         |
| ------------- | ----------- | ------------- | ----------- |
| `lime_50`     | `#F8FFF2`   | `lime_500`    | `#6DB032`   |
| `lime_100`    | `#EFF9E7`   | `lime_600`    | `#4B9E0F`   |
| `lime_150`    | `#DEF3CE`   | `lime_700`    | `#347D00`   |
| `lime_200`    | `#DBE999`   | `lime_800`    | `#225200`   |
| `lime_300`    | `#96E35E`   | `lime_900`    | `#112D00`   |
| `lime_400`    | `#7AD33A`   |               |             |

### 2.9 Amber (10단계 — **CRM warning 강조 톤**)

| 토큰           | Hex         | 토큰           | Hex         |
| -------------- | ----------- | -------------- | ----------- |
| `amber_50`     | `#FFFDEE`   | `amber_500`    | `#FF9200`   |
| `amber_100`    | `#FFF5CB`   | `amber_600`    | `#D47800`   |
| `amber_200`    | `#FFE363`   | `amber_700`    | `#9C5800`   |
| `amber_300`    | `#FFC53D`   | `amber_800`    | `#663A00`   |
| `amber_400`    | `#FFA838`   | `amber_900`    | `#361E00`   |

> **주의**: 코드의 `--color-warning: #B45309` 는 위 amber 스케일과 정확히 일치하지 않음 → § 6.2의 `@brand-safe` 보닥 자체 톤으로 유지. 다음 v3 정리 시 `amber_700`을 `#B45309`로 정정 또는 `bodak_warning` 신설 권장.

### 2.10 Orange (10단계)

| 토큰            | Hex         | 토큰            | Hex         |
| --------------- | ----------- | --------------- | ----------- |
| `orange_50`     | `#FFF8F1`   | `orange_500`    | `#EB6817`   |
| `orange_100`    | `#FFE3D3`   | `orange_600`    | `#C94A00`   |
| `orange_200`    | `#FFBD86`   | `orange_700`    | `#913500`   |
| `orange_300`    | `#FF9D61`   | `orange_800`    | `#592100`   |
| `orange_400`    | `#F87E36`   | `orange_900`    | `#2D0F00`   |

### 2.11 Red (10단계 — **error**)

| 토큰         | Hex         | 토큰         | Hex         |
| ------------ | ----------- | ------------ | ----------- |
| `red_50`     | `#FFF6F6`   | `red_500`    | `#F34D58` ✅ |
| `red_100`    | `#FDF2E5`   | `red_600`    | `#D93242`   |
| `red_200`    | `#FBCACF`   | `red_700`    | `#862A37`   |
| `red_300`    | `#FC9D9C`   | `red_800`    | `#741212`   |
| `red_400`    | `#FF7070`   | `red_900`    | `#450E0E`   |

### 2.12 Magenta (10단계)

| 토큰             | Hex         | 토큰             | Hex         |
| ---------------- | ----------- | ---------------- | ----------- |
| `magenta_50`     | `#FBEAF8`   | `magenta_500`    | `#F553DA`   |
| `magenta_100`    | `#F7D2F1`   | `magenta_600`    | `#D331BB`   |
| `magenta_200`    | `#F596EB`   | `magenta_700`    | `#A81690`   |
| `magenta_300`    | `#F289D0` ⚠️ | `magenta_800`    | `#730560`   |
| `magenta_400`    | `#FA73E3`   | `magenta_900`    | `#3D0133`   |

### 2.13 Purple (10단계)

| 토큰            | Hex         | 토큰            | Hex         |
| --------------- | ----------- | --------------- | ----------- |
| `purple_50`     | `#FEFBFF`   | `purple_500`    | `#C859FF`   |
| `purple_100`    | `#F6E3FF`   | `purple_600`    | `#AD36E3`   |
| `purple_200`    | `#EABEFF`   | `purple_700`    | `#8810B8`   |
| `purple_300`    | `#DE96FF`   | `purple_800`    | `#580A7D` ⚠️ |
| `purple_400`    | `#D478FF`   | `purple_900`    | `#290247`   |

### 2.14 Violet (10단계)

| 토큰            | Hex         | 토큰            | Hex         |
| --------------- | ----------- | --------------- | ----------- |
| `violet_50`     | `#FBFBFF`   | `violet_500`    | `#6541F2`   |
| `violet_100`    | `#ECE7FF`   | `violet_600`    | `#4F29E5`   |
| `violet_200`    | `#C8BBFF`   | `violet_700`    | `#3A16C9`   |
| `violet_300`    | `#9E86FC`   | `violet_800`    | `#23098F`   |
| `violet_400`    | `#7D5EF7`   | `violet_900`    | `#11024D`   |

### 2.15 Alpha (검정/흰색 투명도 각 10단계)

`alpha_white_{step}` 은 `rgba(255, 255, 255, step%)`, `alpha_black_{step}` 은 `rgba(0, 0, 0, step%)`. step ∈ `{50, 100, 200, 300, 400, 500, 600, 700, 800, 900}` (50=5%, 900=90%).

| 토큰                | 값                       | 토큰                | 값                       |
| ------------------- | ------------------------ | ------------------- | ------------------------ |
| `alpha_white_50`    | `rgba(255,255,255,.05)`  | `alpha_black_50`    | `rgba(0,0,0,.05)`        |
| `alpha_white_100`   | `rgba(255,255,255,.10)`  | `alpha_black_100`   | `rgba(0,0,0,.10)`        |
| `alpha_white_200`   | `rgba(255,255,255,.20)`  | `alpha_black_200`   | `rgba(0,0,0,.20)`        |
| `alpha_white_300`   | `rgba(255,255,255,.30)`  | `alpha_black_300`   | `rgba(0,0,0,.30)`        |
| `alpha_white_400`   | `rgba(255,255,255,.40)`  | `alpha_black_400`   | `rgba(0,0,0,.40)`        |
| `alpha_white_500`   | `rgba(255,255,255,.50)`  | `alpha_black_500`   | `rgba(0,0,0,.50)`        |
| `alpha_white_600`   | `rgba(255,255,255,.60)`  | `alpha_black_600`   | `rgba(0,0,0,.60)`        |
| `alpha_white_700`   | `rgba(255,255,255,.70)`  | `alpha_black_700`   | `rgba(0,0,0,.70)`        |
| `alpha_white_800`   | `rgba(255,255,255,.80)`  | `alpha_black_800`   | `rgba(0,0,0,.80)`        |
| `alpha_white_900`   | `rgba(255,255,255,.90)`  | `alpha_black_900`   | `rgba(0,0,0,.90)`        |

오버레이·그라데이션·디스에이블 마스크에만 사용.

### 2.16 Service (서비스 브랜드)

| 토큰              | Hex         | 용도                          |
| ----------------- | ----------- | ----------------------------- |
| `naver_green`     | `#03C75A` ✅ | 네이버 로그인 버튼.           |
| `kakao_yellow`    | `#FEE500` ✅ | 카카오 로그인 버튼.           |

### 2.6 현재 CRM 코드의 핵심 색상 → Value 토큰 근사 매핑

> 시각값을 *바꾸지 않고* v3 Value 토큰으로 명명할 때의 가장 가까운 매칭. 정확히 떨어지지 않는 항목은 § 6에서 추적한다.

| 현재 hex | v3 근사 토큰        | 비고                                                    |
| -------- | ------------------- | ------------------------------------------------------- |
| `#3182F6` | `blue_500` 근처     | v3 `blue_500 = #1E68DE` — 톤이 약간 다름. 코드값 유지. |
| `#1B64DA` | `blue_600` 근처     | primary hover.                                          |
| `#00B493` | `cyan_700` 근처     | success(teal). v3엔 `cyan_700 = #006F82`. 코드값 유지. |
| `#FF5B5B` | `red_400` 근처      | danger.                                                 |
| `#191F28` | `cool_neutral_950`  | text_primary.                                           |
| `#4E5968` | `cool_neutral_700`  | text_secondary.                                         |
| `#AEB5BC` | `cool_neutral_350`  | text_disabled.                                          |
| `#F9FAFB` | `cool_neutral_50`   | bg(페이지).                                             |
| `#FFFFFF` | `common_100`        | bg_surface.                                             |
| `#E8EBED` | `cool_neutral_150`  | border_primary.                                         |
| `#CDD1D5` | `cool_neutral_300`  | border_subtle.                                          |

> **결론**: 현재 CRM의 시각 정체성은 “Toss 톤 + 보닥 블루(#3182F6)”로 v3 표준의 `light_blue_400(#10C5FF)`과 다르다. 이 갭은 *브랜드 컬러 차이*이며 화이트레이블에서 정확히 활용해야 할 자유도다 (§ 8).

---

## 3. Semantic Tokens (의미 토큰)

> Figma v3 `Semantic Color` 그대로. **컴포넌트는 이 토큰만 사용한다.**
> CSS 변수명: `--{token}` (snake_case → kebab-case는 하지 않고 그대로 underscore 유지 권장 — Figma와 1:1 검색이 가능해짐). Tailwind 노출 시에는 단축형 별칭을 추가한다.

> **본 § 의 spec 표는 v3 정의에 따른 *명명 기준*이다.** § 0.1 "시각 변화 0" 원칙을 준수하기 위해, **§ 6.4 갭에 등재된 토큰**(`--bg-primary`, `--text-primary`, `--text-secondary`, `--text-disabled`, `--border-primary`, `--border-subtle` 등)은 Phase 2 시점의 코드 구현에서 *코드 현재 hex 를 literal 로 보유*한다 (예: `--text-primary: #191F28;`). v3 spec 정렬은 § 0.6 / § 10 Phase 6 (visual alignment pass) 에서 디자이너 승인 후 진행.

### 3.1 Background

| Figma 토큰              | 가리키는 Value             | CRM 적용 위치                        |
| ----------------------- | -------------------------- | ------------------------------------ |
| `bg_primary`            | `cool_neutral_100`         | App 본문 배경(현 `#F3F3F5` ≈ 근사). |
| `bg_secondary`          | `cool_neutral_50`          | 검색 박스, 보조 영역.                |
| `bg_tertiary`           | `cool_neutral_100`         | 상세 영역 내 nested 배경.            |
| `bg_disabled`           | `blue_dim_100`             | 입력 필드 disabled.                  |
| `bg_emphasis_primary`   | `light_blue_50`            | 활성 행, 활성 칩 배경(코드 `primary-subtle`). |
| `bg_emphasis_secondary` | `blue_50`                  | 보조 강조(차트 highlight 등).        |

### 3.2 Text

| Figma 토큰                | 가리키는 Value         | 용도                                          |
| ------------------------- | ---------------------- | --------------------------------------------- |
| `text_primary`            | `cool_neutral_950`     | 본문/제목 기본.                               |
| `text_secondary`          | `cool_neutral_700`     | 보조 텍스트, 라벨.                            |
| `text_tertiary`           | `cool_neutral_550`     | 표 헤더, 캡션.                                |
| `text_quaternary`         | `cool_neutral_400`     | placeholder, 매우 약한 보조.                  |
| `text_disabled`           | `cool_neutral_300`     | disabled 텍스트.                              |
| `text_inverse_primary`    | `common_100`           | 짙은 배경 위 흰 텍스트.                       |
| `text_inverse_secondary`  | `alpha_white_800`      | 짙은 배경 위 80% 흰 텍스트.                   |
| `text_inverse_tertiary`   | `alpha_white_400`      | 짙은 배경 위 40% 흰 텍스트.                   |
| `text_accent`             | `light_blue_400`       | 링크·강조 텍스트(브랜드 색).                  |

### 3.3 Icon

| Figma 토큰              | Value                | 용도                              |
| ----------------------- | -------------------- | --------------------------------- |
| `icon_enabled`          | `cool_neutral_950`   | 일반 활성 아이콘.                 |
| `icon_subtle`           | `cool_neutral_550`   | 부가 정보 아이콘.                 |
| `icon_inactive`         | `cool_neutral_400`   | 비활성 상태.                      |
| `icon_active`           | `light_blue_400`     | 활성 메뉴/탭 아이콘.              |
| `icon_accent`           | `light_blue_400`     | 강조 아이콘.                      |
| `icon_disabled`         | `cool_neutral_300`   | 비활성.                           |
| `icon_pressed`          | `cool_neutral_800`   | press 상태.                       |
| `icon_inverse_primary`  | `common_100`         | 짙은 배경 위 흰 아이콘.           |

### 3.4 Border

| Figma 토큰          | Value                | 용도                                      |
| ------------------- | -------------------- | ----------------------------------------- |
| `border_primary`    | `cool_neutral_300`   | 카드/표/인풋 일반 보더.                   |
| `border_subtle`     | `cool_neutral_150`   | 약한 보더(통계 구분, divider).            |
| `border_selected`   | `cool_neutral_500`   | 선택된 셀/탭 보더.                        |
| `border_transparent`| `alpha_black_100`    | 투명 보더(레이어 위 미세 분리).           |

### 3.5 Overlay

| Figma 토큰   | Value             | 용도                          |
| ------------ | ----------------- | ----------------------------- |
| `overlay_50` | `alpha_black_500` | 모달 백드롭 (검정 50%).       |

### 3.6 Component-specific (이름이 곧 사용처)

| Figma 토큰                          | Value                | 용도                                          |
| ----------------------------------- | -------------------- | --------------------------------------------- |
| `modal_background`                  | `common_100`         | 모달 컨테이너 표면.                           |
| `modal_surface_primary`             | `cool_neutral_50`    | 모달 내 1차 영역.                             |
| `modal_surface_secondary`           | `cool_neutral_100`   | 모달 내 2차(중첩) 영역.                       |
| `button_accent_primary`             | `light_blue_400`     | **CTA 버튼 배경 (= 코드 `primary`).**         |
| `button_accent_secondary`           | `light_blue_50`      | **약한 CTA(weak) 배경 (= 코드 `weak`).**      |
| `button_accent_tertiary`            | `cool_neutral_700`   | 검정 계열 CTA(예: “닫기”).                    |
| `button_accent_extra`               | `alpha_black_50`     | 매우 약한 ghost.                              |
| `button_surface_accent_disabled`    | `cool_neutral_250`   | accent 버튼 disabled.                         |
| `button_surface_neutral`            | `cool_neutral_150`   | secondary(neutral) 배경 — 코드 `secondary`.   |
| `button_surface_neutral_disabled`   | `cool_neutral_100`   | secondary 버튼 disabled.                      |
| `text_background`                   | `cool_neutral_750`   | 토스트·툴팁 배경.                             |
| `list_overlay_disabled`             | `alpha_white_800`    | 리스트 항목 disabled 마스크.                  |
| `button_inverse_primary`            | `common_100`         | 짙은 배경 위 흰 버튼.                         |

### 3.7 Semantic (상태)

| Figma 토큰  | Value             | 용도                |
| ----------- | ----------------- | ------------------- |
| `accent`    | `light_blue_400`  | 액센트(브랜드 강조). |
| `error`     | `red_500`         | 에러·삭제·실패.     |
| `warning`   | `red_100` *(주의: Figma v3에 표기됨 — soft warning)* | 주의·경고.       |

### 3.8 Static (Always)

> 다크모드/테마 무관 고정 색상.

`static_white`, `static_black`, `static_white_bold`, `static_white_subtle`, `static_white_subtler`, `static_black_bold`, `static_black_subtler`.

### 3.9 Gradation

`gradation_b/w_0_static`, `gradation_to_50_static`, `gradation_line_0`, `gradation_to_100`, `gradation_from_400_light_blue`, `gradation_to_200_light_blue` — 차트·히어로 영역 그라데이션 전용.

---

## 4. Typography Tokens

> Figma v3 `Typography`. 폰트 스택: **Pretendard** (Regular 400 / Medium 500 / Semibold 600).

### 4.1 Style 카탈로그

| 스타일명               | size | line | weight | letter | deco      | 권장 사용처                         |
| ---------------------- | ---- | ---- | ------ | ------ | --------- | ----------------------------------- |
| `h1_bold`              | 36   | 46   | 600    | -0.5   | —         | 대시보드 거대 수치.                 |
| `h2_bold`              | 34   | 46   | 600    | -0.5   | —         | 페이지 메인 제목.                   |
| `h2`                   | 34   | 46   | 500    | -0.5   | —         | h2 medium.                          |
| `h3_bold`              | 24   | 38   | 600    | -0.5   | —         | 섹션 헤딩.                          |
| `h3`                   | 24   | 38   | 500    | -0.5   | —         | 섹션 헤딩 medium.                   |
| `h4`                   | 22   | 32   | 600    | -0.5   | —         | **TopBar 페이지 제목** (현 22px).   |
| `h5_bold_underline`    | 20   | 30   | 600    | -0.5   | underline | 강조 헤딩.                          |
| `h5_bold`              | 20   | 30   | 600    | -0.5   | —         | 카드 제목.                          |
| `h5_medium`            | 20   | 30   | 500    | -0.5   | —         | 카드 부제목.                        |
| `h5`                   | 20   | 30   | 400    | -0.5   | —         | 카드 본문.                          |
| `body1_bold`           | 18   | 28   | 600    | -0.5   | —         | 강조 본문.                          |
| `body1`                | 18   | 28   | 500    | -0.5   | —         | medium 본문.                        |
| `body2_bold`           | 16   | 24   | 600    | -0.5   | —         | 서브 헤딩.                          |
| `body2_bold_underline` | 16   | 24   | 600    | -0.5   | underline | 강조 링크.                          |
| `body2_medium`         | 16   | 24   | 500    | -0.5   | —         | 본문 강조.                          |
| `body2_normal`         | 16   | 24   | 400    | -0.5   | —         | 본문 16px.                          |
| `body2_reading`        | 16   | 24   | 400    | 0      | —         | 긴 글 가독.                         |
| `body3_bold`           | 14   | 22   | 600    | -0.5   | —         | 라벨.                               |
| `body3_bold_underline` | 14   | 22   | 600    | -0.5   | underline | 강조 링크 본문.                     |
| `body3_medium`         | 14   | 22   | 500    | -0.5   | —         | **본문 표준**.                      |
| `body3_underline`      | 14   | 22   | 400    | -0.5   | underline | 본문 링크.                          |
| `body3_reading`        | 14   | 24   | 400    | 0      | —         | 긴 본문(line height 높음).          |
| `body3_normal`         | 14   | 22   | 400    | -0.5   | —         | 본문 일반.                          |
| `body4_bold`           | 13   | 20   | 600    | -0.5   | —         | 소형 라벨.                          |
| `body4_medium`         | 13   | 18   | 500    | -0.5   | —         | 페이지네이션, 버튼 sm.              |
| `body4_underline`      | 13   | 18   | 400    | -0.5   | underline | 보조 링크.                          |
| `body4_normal`         | 13   | 18   | 400    | -0.5   | —         | 보조 텍스트.                        |
| `body4_reading`        | 13   | 18   | 400    | 0      | —         | 보조 긴 글.                         |
| `body5_bold`           | 12   | 20   | 600    | -0.5   | —         | 작은 강조.                          |
| `body5_medium`         | 12   | 18   | 500    | -0.5   | —         | 작은 라벨.                          |
| `body5_underline`      | 12   | 18   | 400    | -0.5   | underline | 작은 링크.                          |
| `body5_normal`         | 12   | 18   | 400    | -0.5   | —         | 캡션 본문.                          |
| `body5_reading`        | 12   | 18   | 400    | 0      | —         | 작은 긴 글.                         |
| `caption_bold`         | 10   | 16   | 600    | -0.5   | —         | 작은 캡션 강조.                     |
| `caption`              | 10   | 16   | 400    | -0.5   | —         | 캡션.                               |
| `caption_underline`    | 10   | 16   | 400    | -0.5   | underline | 캡션 링크.                          |

### 4.2 원자 토큰

- **Font Size**: `font_size_36 / 34 / 24 / 22 / 20 / 18 / 16 / 14 / 13 / 12 / 10`
- **Line Height**: `font_line_height_46 / 40 / 38 / 32 / 30 / 28 / 24 / 22 / 20 / 18 / 16 / 14 / 12`
- **Weight**: `font_weight_600 / 500 / 400`
- **Letter Spacing**: `font_letter_spacing_n10 (-1)` / `font_letter_spacing_n05 (-0.5)` / `font_letter_spacing_0 (0)`
- **Decoration**: `text_decoration_underline`
- **Family**: `pretendard_bold` ↔ Semibold 600 / `pretendard_medium` 500 / `pretendard_regular` 400

### 4.2.1 폰트 크기 규칙 — **짝수 원칙 (13 단일 예외)**

**모든 폰트 크기는 짝수만 사용한다. `13px`만 예외**(v3 `body4_*` 시리즈가 유일하게 홀수).

근거: v3 사이즈 시리즈 `36/34/24/22/20/18/16/14/13/12/10` 자체가 짝수 + 13 단일 예외 규칙으로 설계되어 있다. 코드에서도 동일 규칙을 적용해 디자이너·개발자가 "한글 가독을 위한 약간 큰 13"만 기억하면 된다.

| 사용 가능 (v3 토큰 보유) | 36 / 34 / 24 / 22 / 20 / 18 / 16 / 14 / **13** / 12 / 10 |
| ----------------------- | -------------------------------------------------------- |
| 사용 금지 (홀수)        | 11 / 15 / 17 / 19 / 21 / 23 …                            |

홀수 발견 시 처리:
- **11px → 12px** (`body5_*`)
- **17px → 18px** (`body1_*`)
- **19px → 20px** (`h5_*`)
- 그 외 임의 홀수가 들어오면 가장 가까운 짝수로 흡수.

### 4.3 현재 CRM의 폰트 스케일 → v3 Style 매핑

| 현재 코드 사용                                  | v3 Style                       | 정합성        |
| ----------------------------------------------- | ------------------------------ | ------------- |
| TopBar 제목 `text-[22px] font-semibold`         | `h4`                           | ✅ **Phase 4-B 적용 완료** — `text-h4 font-semibold` |
| PageHeader 제목 `text-[19px] font-semibold`     | `h5_bold` (20px)               | ✅ **Phase 4-C 적용 완료 (20px 정렬, baseline 갱신)** — `text-h5 font-semibold` |
| CustomerHeader 제목 `text-[17px]`               | `body1_bold` / `body1` (18px)  | ✅ **Phase 4-C 적용 완료 (18px 정렬, baseline 갱신)** — `text-body1 font-semibold` |
| 본문/표 `text-[14px]`                           | `body3_medium` / `body3_normal` | ✅ **Phase 4-B 적용 완료** — `text-body3 [font-medium]` |
| 보조 `text-[13px]`                              | `body4_medium` / `body4_normal` | ✅ **Phase 4-B 적용 완료** — `text-body4 [font-medium]` (홀수 단일 예외) |
| 캡션 `text-[11px]`                              | `body5_normal` (12px)          | ✅ **Phase 4-C 적용 완료 (12px 정렬, baseline 갱신)** — `text-body5` |
| KPI 수치 `text-[22px] font-semibold`            | `h4`                           | ✅ **Phase 4-B 적용 완료** |
| HomeDashboard recharts inline `fontSize: 11`    | (chart axis label)             | ✅ **Phase 4-D 적용 완료 (12로 정렬, baseline 갱신)** |

> 결론: 19px과 11px 두 군데만 v3에서 비표준. 시각 변경 최소화하려면 19→20, 11→12로 합의 후 일괄 치환을 권장한다(매우 작은 변화). 즉시 변경이 부담이면 `--font-size-19`, `--font-size-11`을 *임시 토큰*으로 등록해 v3에서 의도적 예외임을 명시.

---

## 5. 코드 매핑 — 정본 변환표

> 이 표가 *코드 정리 작업의 정본*이다. PR 단위로 점진 치환.

### 5.1 컬러 변수 변환

| 현재 CSS 변수             | v3 Semantic 명             | 신규 CSS 변수             | Tailwind 별칭 (단축)              |
| ------------------------- | -------------------------- | ------------------------- | --------------------------------- |
| `--color-primary`         | `button_accent_primary`    | `--button-accent-primary` | `bg-button-accent-primary` (또는 `bg-primary` 별칭 유지) |
| `--color-primary-hover`   | (compound)                 | `--button-accent-primary-hover` | `hover:bg-primary-hover`     |
| `--color-success`         | (없음, 도메인 전용)        | `--status-success`        | `bg-success`                      |
| `--color-danger`          | `error`                    | `--error`                 | `bg-error` (또는 `bg-danger` alias) |
| `--color-warning`         | `warning`                  | `--warning`               | `bg-warning`                      |
| `--color-bg`              | `bg_primary`               | `--bg-primary`            | `bg-bg-primary` / 별칭 `bg-bg`    |
| `--color-surface`         | `modal_background` 또는 `common_100` | `--bg-surface`     | `bg-surface`                      |
| `--color-text-primary`    | `text_primary`             | `--text-primary`          | `text-primary`                    |
| `--color-text-secondary`  | `text_secondary`           | `--text-secondary`        | `text-secondary`                  |
| `--color-text-disabled`   | `text_disabled`            | `--text-disabled`         | `text-disabled`                   |
| `--color-border`          | `border_primary`           | `--border-primary`        | `border-primary` (별칭 `border`) |
| `--color-border-subtle`   | `border_subtle`            | `--border-subtle`         | `border-subtle`                   |
| `--color-primary-subtle`  | `bg_emphasis_primary`      | `--bg-emphasis-primary`   | `bg-emphasis-primary`             |
| `--color-success-subtle`  | (도메인) `--status-success-bg` | `--status-success-bg` | `bg-success-bg`                   |
| `--color-danger-subtle`   | (도메인) `--status-error-bg`   | `--status-error-bg`   | `bg-error-bg`                     |
| `--color-warning-subtle`  | (도메인) `--status-warning-bg` | `--status-warning-bg` | `bg-warning-bg`                   |
| `--color-neutral`         | `button_surface_neutral` 의 강조판 | `--button-neutral`        | `bg-button-neutral`               |
| `--color-neutral-hover`   | (compound)                 | `--button-neutral-hover`  | `hover:bg-button-neutral-hover`   |

> **호환 전략**: 기존 `bg-primary` 같은 짧은 클래스는 한동안 *별칭(alias)*으로 유지한다. 점진적으로 `bg-button-accent-primary`로 갈아끼우되, 빌드 깨짐 없이 PR 단위 진행.

### 5.2 폰트 토큰 도입

```css
/* index.css @theme 에 추가 */
--font-size-36: 36px;  --font-line-height-46: 46px;
--font-size-34: 34px;  --font-line-height-40: 40px;
--font-size-24: 24px;  --font-line-height-38: 38px;
--font-size-22: 22px;  --font-line-height-32: 32px;
--font-size-20: 20px;  --font-line-height-30: 30px;
--font-size-18: 18px;  --font-line-height-28: 28px;
--font-size-16: 16px;  --font-line-height-24: 24px;
--font-size-14: 14px;  --font-line-height-22: 22px;
--font-size-13: 13px;  --font-line-height-20: 20px;
--font-size-12: 12px;  --font-line-height-18: 18px;
--font-size-10: 10px;  --font-line-height-16: 16px;

--font-weight-bold: 600;
--font-weight-medium: 500;
--font-weight-regular: 400;

--letter-spacing-n10: -1px;
--letter-spacing-n05: -0.5px;
--letter-spacing-0: 0;
```

### 5.3 Tailwind 유틸 매크로 (typography 스타일)

> **정책 (Phase 4-A' 재정의)**: 매크로는 **size only**. weight 는 Tailwind 네이티브 (`font-medium` / `font-semibold` / `font-normal`) 와 조합. line-height / letter-spacing 은 미포함 — Phase 6 visual alignment 에서 별도 합의 후 도입 가능.
>
> **근거**: monolithic 매크로(`text-body5-medium`)는 cn() override 패턴(예: Badge 베이스 + Consumer 외부 className)에서 weight 까지 함께 사라지는 문제를 만들었음. size + weight 분리 + tailwind-merge 확장(§ 5.3.1) 조합으로 override 시 size 만 교체되고 weight 가 자연스럽게 보존됨.

```css
/* index.css — Phase 4-A' size-only macros (11개) */
.text-h1       { font-size: 36px; }
.text-h2       { font-size: 34px; }
.text-h3       { font-size: 24px; }
.text-h4       { font-size: 22px; }
.text-h5       { font-size: 20px; }
.text-body1    { font-size: 18px; }
.text-body2    { font-size: 16px; }
.text-body3    { font-size: 14px; }
.text-body4    { font-size: 13px; }
.text-body5    { font-size: 12px; }
.text-caption  { font-size: 10px; }
```

**v3 합성 스타일 표현**:
| Figma v3 스타일 | 코드 표현                              |
| --------------- | -------------------------------------- |
| `body3_medium`  | `text-body3 font-medium`               |
| `body3_bold`    | `text-body3 font-semibold`             |
| `body4_normal`  | `text-body4` (기본 weight 상속)        |
| `h4`            | `text-h4 font-semibold`                |
| `caption`       | `text-caption` (기본 weight 상속)      |

> 컴포넌트는 `text-[22px] font-semibold`처럼 임의값을 박지 않고 `text-h4 font-semibold` 두 클래스로 사용한다. **Figma 명칭과 코드 클래스가 1:1로 검색된다는 점이 핵심.**

#### 5.3.1 tailwind-merge 확장 (cn() override 호환)

`src/lib/utils.ts` 의 `cn()` 함수가 v3 size-only 매크로를 font-size class group 으로 인식하도록 `extendTailwindMerge` 적용. Override 시 size 만 교체되고 weight 보존:

```ts
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-h1', 'text-h2', 'text-h3', 'text-h4', 'text-h5',
        'text-body1', 'text-body2', 'text-body3', 'text-body4', 'text-body5',
        'text-caption',
      ],
    },
  },
});
```

예시:
```jsx
// Badge 베이스: 'text-body5 font-medium'
// Consumer override: className="text-[11px]"
// cn 결과: 'text-[11px] font-medium' ✓ (size 만 override, weight 보존)
```

### 5.4 Tailwind 기본 팔레트 사용 금지 + 일괄 매핑 가이드

**정책**: `gray-*`, `blue-*`, `emerald-*`, `amber-*` 등 **Tailwind 기본 팔레트 클래스의 직접 사용은 금지한다.** 모든 색상은 § 3 Semantic 토큰 또는 § 2 Value 토큰의 별칭(alias)으로만 참조한다.

**현재 위반 규모** (Phase 0 스캔 기준): 약 380건 — `RolePermissionForm.tsx`, `ReassignTypeSettings.tsx`, `App.tsx` placeholder, `HomeDashboard.tsx` 차트 영역에 집중.

**일괄 매핑표** (Phase 3b에서 PR-by-PR 치환):

| Tailwind preset             | 적용 대상 토큰                 | Tailwind 신 클래스           | 비고                                    |
| --------------------------- | ------------------------------ | ---------------------------- | --------------------------------------- |
| `bg-white` / `text-white`   | `static_white` / `common_100`  | 그대로 유지 가능             | Group D — 정적 색, 화이트레이블 영향 없음. |
| `bg-gray-50`                | `--bg-primary` (#F9FAFB hex 일치) | `bg-bg-primary`           | ✅ **Phase 3b-A 적용 완료** (38건, alpha modifier 8 포함). |
| `bg-gray-100`               | `--bg-faint` (#F3F4F6 hex 일치) | `bg-bg-faint`              | ✅ **Phase 3b-A 적용 완료** (2건). 신토큰. |
| `border-gray-100`           | `--bg-faint` 재활용             | `border-bg-faint`            | ✅ **Phase 3b-A 적용 완료** (51건). bg/border 동일 hex 한 토큰. |
| `border-gray-200`           | `--border-primary` (4 byte diff) | `border-border-primary`     | ✅ **Phase 3b-B1 적용 완료** (60건). AdminDetail 샘플 12px@th=0, 0px@th=0.1. |
| `border-gray-300`           | `--border-subtle` (6 byte diff) | `border-border-subtle`      | ✅ **Phase 3b-B1 적용 완료** (26건). |
| `text-gray-300`             | (적합 토큰 없음 — 신설 검토)    | —                            | ✋ **Phase 6 보류** (4건). 의미 미스매치 — `--text-disabled` 와 36 byte 차. 신토큰 `--text-faint` 후보 또는 v3 cool_neutral 정렬과 함께 결정. |
| `text-gray-400`             | `--text-quaternary` (8 byte diff) | `text-text-quaternary`     | ✅ **Phase 3b-B2/B3 적용 완료** (16건). 사후 측정: th=0 8538 px, th=0.05 0 px. |
| `text-gray-500`             | `--color-neutral` (#6B7280 hex 일치) | `text-neutral`         | ✅ **Phase 3b-A 적용 완료** (12건).     |
| `text-gray-600`             | `--text-strong` (#4B5563 hex 일치) | `text-text-strong`       | ✅ **Phase 3b-A 적용 완료** (6건).      |
| `text-gray-700`             | `--text-secondary` (24 byte diff) | `text-text-secondary`     | **Group C — Phase 6** 일괄 정렬 (35건). |
| `text-gray-800`             | `--text-primary` (15 byte diff) | `text-text-primary`        | **Group C — Phase 6** (3건).            |
| `text-gray-900`             | `--text-primary` (8 byte diff) | `text-text-primary`         | **Group C — Phase 6** (74건, 최다 영향). |
| `border-gray-900`           | `--text-primary` 재활용         | `border-text-primary`        | **Group C — Phase 6** (3건).            |
| `bg-gray-900/60`            | 동상                           | `bg-text-primary/60`         | **Group C — Phase 6** (1건).            |
| `bg-gray-200` / `bg-gray-200/50` | `--border-primary` 재활용 | `bg-border-primary` / `/50` | ✅ **Phase 3b-B1 적용 완료** (4건). |
| `bg-blue-50` / `/50`        | `--bg-emphasis-primary` (4 byte diff) | `bg-bg-emphasis-primary` | ✅ **Phase 3b-B1 적용 완료** (3건). |
| `bg-blue-100` / `/50`       | `--status-info-bg` (6 byte diff) | `bg-status-info-bg`       | ✅ **Phase 3b-B1 적용 완료** (4건). |
| `text-blue-400` / `bg-blue-400` | `--button-accent-primary` (47 byte diff) | `bg-primary` / `text-primary` | **Group C — Phase 6** (4건). |
| `text-blue-600` / `bg-blue-600` | `--button-accent-primary-hover` (17 byte diff) | `bg-primary-hover` | **Group C — Phase 6** (3건). |
| `text-blue-700` / `bg-blue-700` | `--button-accent-primary-hover` (2 byte diff) | 동상  | ✅ **Phase 3b-B1 적용 완료** (3건). |
| `text-emerald-*` / `bg-emerald-*` | `--status-success` (40+ byte diff) | `bg-success` 또는 도메인 | **Group C — Phase 6** (2건). |
| `bg-amber-*`                | `--warning` (108 byte diff)    | `bg-warning`                 | **Group C — Phase 6** (1건). 톤 합의 필요. |
| `bg-green-600`              | `--status-success` (73 byte diff) | `bg-success`              | **Group C — Phase 6** (1건).            |
| `text-red-500`              | `--error` (24 byte diff)       | `text-error`                 | **Group C — Phase 6** (2건).            |

**Phase 3b 운영 규칙**:
- 한 PR당 한 파일(또는 단일 라우트) 단위 — 리뷰 가능 크기 유지.
- 매핑이 모호한 경우 § 6.4에 갭 후보로 등록 후 별도 결정.
- 빈 페이지 placeholder(`App.tsx`의 "준비 중인 페이지입니다")처럼 곧 사라질 영역은 §  6.4에 "후순위" 표시.
- CI에 `eslint-plugin-tailwindcss` 또는 자체 lint로 신규 PR에서 `bg-gray-*` 같은 패턴이 추가되면 차단(§ 9.6).

**recharts 등 SVG inline hex 처리** (Phase 3c 패턴):
- recharts 컴포넌트의 `fill` / `stroke` / `stopColor` 속성과 JS object 형태(`tick={{ fill: ... }}`, `contentStyle={{ border: ... }}`)에 hex literal 대신 CSS `var()` 직접 주입.
- 예: `stroke="#3b82f6"` → `stroke="var(--chart-accent)"`, `border: '1px solid #e5e7eb'` → `border: '1px solid var(--chart-tooltip-border)'`.
- Recharts는 SVG 속성에 `var()` 를 그대로 패스 — 정상 동작 (Phase 3c 검증).
- 단, `var()` 해석 안 되는 케이스 발견 시 fallback: `src/styles/chart-tokens.ts` 같은 TS 상수 파일에서 `'var(--chart-accent)'` 문자열 export 후 import 사용.
- `fontSize` / `fontWeight` 같은 numeric inline은 본 정책 외 — Phase 4 typography 토큰 도입 시 처리.

---

## 6. 갭 추적 (코드 vs Figma v3)

다음 항목은 시각값을 유지한 채 v3 이름으로 매핑한 "비표준"이다. ✅ 표시는 정렬·신설 결정 완료.

### 6.1 결정 완료 (2026-04 Phase 0 후)

| 위치                       | 현재값       | v3 가장 가까운 토큰         | 결정                                                 |
| -------------------------- | ------------ | --------------------------- | ---------------------------------------------------- |
| App 본문 배경              | `#F3F3F5`    | `cool_neutral_100 (#F2F4F6)` | ✅ **Phase 3a 적용 완료** — `--bg-app-body` 도메인 토큰 신설로 치환 (시각 변화 0). v3 cool_neutral_100 정렬은 Phase 6. |
| `text-[19px]` (PageHeader 3곳) | 19px      | `h5` 20px                   | ✅ **Phase 4-C 적용 완료** — `text-h5 font-semibold`. baseline 갱신.       |
| `text-[17px]` (CustomerHeader 1곳) | 17px  | `body1` 18px                | ✅ **Phase 4-C 적용 완료** — `text-body1 font-semibold`. baseline 갱신.    |
| `text-[11px]` (7곳)        | 11px         | `body5` 12px                | ✅ **Phase 4-C 적용 완료** — `text-body5`. 위치: TaskCard Badge x2, CustomerHeader Badge, ConsultationHistoryTab Badge, date-range-chip 요일. baseline 갱신. |
| HomeDashboard inline `fontSize: 11` (7곳) | 11 | font-size 12 (짝수)        | ✅ **Phase 4-D 적용 완료** — recharts axis tick / ReferenceLine label. baseline 갱신. |

### 6.2 의도된 갭 (브랜드/도메인 자유)

| 위치                       | 현재값       | v3 가장 가까운 토큰         | 처리 방안                                            |
| -------------------------- | ------------ | --------------------------- | ---------------------------------------------------- |
| Primary 브랜드 컬러        | `#3182F6`    | `light_blue_400 (#10C5FF)`  | **브랜드 차이로 의도된 분리** (`@brand-free`). `palette/bodak.ts`에 `bodak_blue_50~900` 정의. |
| Primary Hover              | `#1B64DA`    | `blue_700` 근처             | 위와 함께 `bodak_blue_500` 단계.                     |
| Success(teal)              | `#00B493`    | `cyan_700` 근처             | 코드값 유지. `bodak_teal` 또는 `cyan_650` 단계 보강. |
| `--color-primary-subtle`   | `#EBF3FF`    | `light_blue_50 (#E5F7FF)`   | 보닥 톤 — `@brand-free`. v3 `bg_emphasis_primary` 자리지만 브랜드별 다름. |
| `--color-warning` 톤       | `#B45309` (amber_700 톤) | v3 `warning = red_100` (soft) | ✅ **amber 유지 확정** (`@brand-safe`). 근거: error(빨강)와 warning(앰버) 의미 구분, WCAG 대비, 시각 변화 0, 화이트레이블 의미 안정성. **v3에 amber_700 으로 역수입 권장.** |

### 6.3 결정 대기 (Phase 진입 전 합의 필요)

> 현재 보류 항목 없음 (Phase 3a 종료 시점). 후속 Phase 진행 중 발견되는 항목을 여기에 등재.

### 6.4 신설 토큰 (도메인/시스템 보강)

#### 6.4.1 Tier 2 Semantic 갭 — 코드 hex 보존, v3 spec 차이 (Phase 6 정렬 대상)

> Phase 2 에서 Tier 2 Semantic 토큰을 도입할 때 § 0.1 시각 변화 0 원칙을 위해 **코드 현재 hex 를 literal 로 보유**한 항목. v3 spec 으로의 이주는 Phase 6 visual alignment pass 에서 디자이너 승인 후 진행.

| 토큰              | 코드 보유 hex (Phase 2) | v3 spec 권장값                       | 차이 정도        | 처리 방안                                            |
| ----------------- | ----------------------- | ------------------------------------ | ---------------- | ---------------------------------------------------- |
| `--bg-primary`    | `#F9FAFB`               | `cool_neutral_100` = `#F2F4F6`        | 미세 (1~2 단계)  | Phase 6 visual alignment pass 에서 합의 후 이주.     |
| `--text-primary`  | `#191F28`               | `cool_neutral_950` = `#1D2024`        | 미세             | 동상.                                                |
| `--text-secondary`| `#4E5968`               | `cool_neutral_700` = `#54595E`        | 미세             | 동상.                                                |
| `--text-disabled` | `#AEB5BC` (≈ `cool_neutral_350`) | `cool_neutral_300` = `#C8C9CE` | **큼**          | 동상. v3 가 더 진함 → 디자이너 합의 필요.           |
| `--border-primary`| `#E8EBED` (≈ `cool_neutral_150`) | `cool_neutral_300` = `#C8C9CE` | **큼, 명도 반전** | § 2.6 ↔ § 3.4 매핑 모순. Figma 측 정정 검토 권장. |
| `--border-subtle` | `#CDD1D5` (≈ `cool_neutral_300`) | `cool_neutral_150` = `#E9EBEF` | **큼, 명도 반전** | 동상.                                                |

#### 6.4.2 도메인/시스템 보강 토큰 (v3 미정의)

| 위치                       | 현재값            | 도입 토큰                        | 비고                                            |
| -------------------------- | ----------------- | -------------------------------- | ----------------------------------------------- |
| Badge primary weak BG/text | `#E1E9FD / #5779DB` | `--status-info-bg` / `--status-info` | ✅ **Phase 3a 적용**. Phase 6 v3 alignment 후보 (`bg_emphasis_secondary` 톤 흡수 가능). |
| Badge teal weak BG/text    | `#DFE9EA / #548989` | `--status-pending-bg` / `--status-pending` | ✅ **Phase 3a 적용**. v3 미존재 — Figma 역수입 권장. |
| Badge green weak BG/text   | `#E2EEE4 / #4B8C57` | `--status-done-bg` / `--status-done` | ✅ **Phase 3a 적용**. Phase 6 v3 alignment 후보 (`green_100`/`green_700` 근처). |
| DataTable 줄무늬           | `#FAFBFC`         | `--row-stripe`                   | ✅ **Phase 3a 적용** (9곳). v3 미존재.          |
| DataTable hover            | `#F3F4F6`         | `--row-hover`                    | ✅ **Phase 3a 적용** (3곳). Phase 6 v3 alignment 후보 (`cool_neutral_100`). |
| Sidebar 메뉴 hover         | `#E8EAED`         | `--nav-hover-bg`                 | ✅ **Phase 3a 적용**. Phase 6 v3 alignment 후보 (`cool_neutral_150`). |
| 페이지네이션·메뉴·상태칩 활성 | `#F0F1F3` (3곳)| `--bg-selected-subtle`           | ✅ **Phase 3a 적용**. 단일 토큰 통합 완료.      |
| 칸반 컬럼 배경             | `#F0F2F5` (BoardColumn) | `--kanban-column-bg`       | ✅ **Phase 3a 적용**. 도메인 전용 — v3 미존재.  |
| 사이드바 선택 메뉴 텍스트  | `#4B5563`         | `--text-strong`                  | ✅ **Phase 3a 적용**. `--color-neutral-hover` 와 동일값 — Phase 6 통합 검토. |
| App 본문 배경              | `#F3F3F5`         | `--bg-app-body`                  | ✅ **Phase 3a 적용**. v3 미정의 — Phase 6 cool_neutral_100 정렬 후보. (§ 6.1 결정 이행) |
| Button danger hover        | `#e04f4f`         | `--danger-hover`                 | ✅ **Phase 3a 적용** (§ 6.3 보류 해소). Phase 6 v3 alignment 후보 (`red_500`). |
| Button danger active       | `#d44040`         | `--danger-active`                | ✅ **Phase 3a 적용**. Phase 6 v3 alignment 후보 (`red_600`). |
| Light tint bg/border       | `#F3F4F6`         | `--bg-faint`                     | ✅ **Phase 3b-A 적용** (53건). bg/border 양쪽 활용. Tailwind `gray-100` hex 일치. v3 cool_neutral_100 정렬은 Phase 6. |
| 차트(recharts) 액센트       | `#3b82f6`         | `--chart-accent`                 | ✅ **Phase 3c 적용 완료** (10건). `@brand-free`, Tailwind blue-500 톤. `--button-accent-primary` (#3182F6) 와 10 byte 차 — Phase 6 통일 검토. |
| 차트 그리드                | `#f3f4f6`         | `--chart-grid` (= `--bg-faint`)  | ✅ **Phase 3c 적용 완료** (3건). `--bg-faint` 재활용. |
| 차트 축 tick               | `#9ca3af`         | `--chart-axis`                   | ✅ **Phase 3c 적용 완료** (6건). v3 `cool_neutral_400` (#A4A8AF) 와 8 byte 차 — Phase 6 정렬 후보. |
| 차트 tooltip border        | `#e5e7eb`         | `--chart-tooltip-border`         | ✅ **Phase 3c 적용 완료** (3건). v3 `cool_neutral_150` (#E9EBEF) 와 4 byte 차 — Phase 6 정렬 후보. |
| Tailwind 기본 팔레트 — 그룹 A (exact) | `gray-50/100, border-gray-100, gray-500/600` 109건 | § 5.4 참조 | ✅ **Phase 3b-A 적용 완료**. 시각 변화 0. |
| Tailwind 기본 팔레트 — 그룹 B (near, 2~6 byte) | `border-gray-200/300, bg-gray-200, bg-blue-50/100, blue-700` 100건 | § 5.4 참조 | ✅ **Phase 3b-B1 적용 완료**. 21/21 pass (HomeDashboard 5px sub-pixel ceiling). |
| Tailwind 기본 팔레트 — text-gray-400 (8 byte) | 16건 | § 5.4 참조 | ✅ **Phase 3b-B2/B3 적용 완료**. 21/21 pass. |
| Tailwind 기본 팔레트 — text-gray-300 (의미 미스매치) | 4건 | (적합 토큰 없음) | ✋ **Phase 6 보류**. `--text-disabled` 36 byte 차 — 신토큰 `--text-faint` 신설 또는 v3 정렬과 함께 결정. |
| Tailwind 기본 팔레트 — 그룹 C (far, 7+ byte) | `gray-700/800/900, blue-400/600, emerald-*, amber-*, red-500` 129건 | § 5.4 참조 | **Phase 6 v3 visual alignment 일괄 처리** — § 6.4.3 상세 표 참조. |

#### 6.4.3 Phase 6 visual alignment 후보 (그룹 C 상세)

> Tailwind preset 의 시각값과 코드 토큰의 시각값이 7+ byte 차이로 인지 가능한 시각 차가 발생하는 항목. Phase 6 visual alignment pass 에서 디자이너 검토·승인 후 일괄 정렬. 정렬 시 baseline 갱신 필수.

| Tailwind preset             | preset hex | 의미 토큰 (Phase 6 후보) | 토큰 hex | max ch diff | 건수 |
| --------------------------- | ---------- | ------------------------ | -------- | ----------- | ---- |
| `text-gray-900`             | `#111827`  | `--text-primary`         | `#191F28` | 8           | 74   |
| `border-gray-900`           | 동상       | `--text-primary` 재활용  | 동상     | 8           | 3    |
| `bg-gray-900/60`            | 동상       | `--text-primary` 재활용  | 동상     | 8           | 1    |
| `text-gray-700`             | `#374151`  | `--text-secondary`       | `#4E5968` | 24          | 35   |
| `text-gray-800`             | `#1F2937`  | `--text-primary`         | `#191F28` | 15          | 3    |
| `text-blue-400`             | `#60A5FA`  | `--button-accent-primary` | `#3182F6` | 47          | 3    |
| `bg-blue-400`               | 동상       | 동상                     | 동상     | 47          | 1    |
| `text-blue-600`             | `#2563EB`  | `--button-accent-primary-hover` | `#1B64DA` | 17  | 2    |
| `bg-blue-600`               | 동상       | 동상                     | 동상     | 17          | 1    |
| `text-emerald-600`          | `#059669`  | `--status-success`       | `#00B493` | 42          | 1    |
| `bg-emerald-400`            | `#34D399`  | `--status-success`       | 동상     | 52          | 1    |
| `bg-amber-400`              | `#FBBF24`  | `--warning`              | `#B45309` | 108         | 1    |
| `bg-green-600`              | `#16A34A`  | `--status-success`       | `#00B493` | 73          | 1    |
| `text-red-500`              | `#EF4444`  | `--error`                | `#FF5B5B` | 24          | 2    |

**총 129건**. Phase 6 진행 시 디자이너와 다음 결정 필요:
- A. 코드 토큰 hex 그대로 유지 (브랜드 톤) → Tailwind preset 사용 금지로 일관성 강제
- B. 코드 토큰을 v3/Tailwind 톤으로 정렬 (시각 변화 발생, baseline 갱신)
- C. 도메인별 분리 — 차트 등 곧 사라질 영역만 별도 처리

---

## 7. 컴포넌트 카탈로그 (네이밍 정리)

> 컴포넌트 코드 자체는 변경하지 않는다. 다만 **주석 헤더 / className / className 안의 토큰 이름**을 v3로 일관시킨다.

### 7.1 Button (`src/components/ui/button.tsx`)

| variant      | v3 토큰 매핑                                       |
| ------------ | -------------------------------------------------- |
| `primary`    | `button_accent_primary` 배경 + `text_inverse_primary` |
| `weak`       | `button_accent_secondary` 배경 + `text_accent`     |
| `secondary`  | `button_surface_neutral` 배경 + `text_inverse_primary` (현 코드는 `bg-neutral`로 진하게 구현 — § 6 갭) |
| `ghost`      | 투명 + `text_secondary` + `border_primary` → hover `border_subtle` |
| `danger`     | `error` 배경 + `text_inverse_primary`              |

**Sizes**: `xs / sm / md / lg` — 본문 텍스트는 `body4_medium` (sm/md), 라운드는 § 7.4.
**조합 규칙**: 취소+확인 = `ghost + primary`; 삭제+저장 = `danger + secondary`; 단독 수정 = `secondary`; 필터 도구 = `weak`.

### 7.2 Badge (`src/components/ui/badge.tsx`)

`default / primary / teal / green / danger / warning` × `weak | fill`. weak은 `bg_emphasis_*` + 컬러 텍스트, fill은 액센트 배경 + `text_inverse_primary`. 도메인 상태 매핑은 § 6에 따라 `--status-*` 토큰 신설.

### 7.3 Input / Select / Chip 류

- `Input`, `SelectField`: `border_primary` / focus `border_selected` / placeholder `text_quaternary` / `rounded-md`.
- `FilterChip` 활성 상태: `border_selected` + `bg_emphasis_primary`.
- `InputChip` 포커스: `border_selected` + 라벨 `text_accent`.
- `DateRangeChip`: 동일 활성 규칙.

### 7.4 라운드 (Border Radius)

| Tailwind        | 값      | 적용                                                          |
| --------------- | ------- | ------------------------------------------------------------- |
| `rounded-sm`    | 4px     | 버튼 xs/sm, 인풋, 셀렉트, 칩.                                 |
| `rounded-md`    | 8px     | 버튼 md, 칸반 컬럼, 태스크 카드, 사이드바 메뉴, 필터박스.     |
| `rounded-lg`    | 12px    | 버튼 lg, KPI 카드, DataTable 외곽, 차트 컨테이너.             |
| `rounded-xl`    | 16px    | Badge, 모달, 대형 다이얼로그.                                 |
| `rounded-full`  | 9999px  | 아바타, 도트, TopBar 시간 칩.                                 |

> *중요*: 현재 코드(`button.tsx`) `md = rounded-md`는 `index.css @theme --radius-md: 8px`로 해석된다. 일부 코멘트의 “6px” 표기는 오기 → 본 표를 정본으로.

### 7.5 KpiCard / SummaryStats / ApprovalActions / Pagination / DataTable / PageHeader / FilterBox

- 컴포넌트 *위치/role*은 그대로 유지하고, 내부 className의 임의 hex/숫자만 § 5 매핑표대로 단계 치환한다.
- 새 컴포넌트(Toast, Modal, Tooltip, Skeleton, Tabs)를 추가할 때는 처음부터 v3 토큰으로 작성한다.

---

## 8. 화이트레이블 (B2B 재판매) 가이드

이 CRM을 템플릿으로 두고 **포인트 컬러 + 일부 자산 교체**만으로 다른 보험사/제휴사용으로 재판매하는 시나리오를 1순위로 둔다.

### 8.1 핵심 아이디어

> *Value 토큰 그룹*만 브랜드별로 추가하고, *Semantic 토큰*은 그 그룹을 가리킨다.

```
Value 계층 (브랜드별)
├─ palette/bodak.ts        primary=#3182F6 …
├─ palette/heungkuk.ts     primary=<흥국 컬러>
└─ palette/samsung.ts      primary=<삼성 컬러>

Semantic 계층 (공통)
└─ button_accent_primary = palette[active].primary
```

이 구조라면 컴포넌트는 *영원히 변하지 않는다.* `button_accent_primary` 만 보고 그린다.

### 8.2 디렉터리 구조

```
src/config/
├─ brand/
│  ├─ index.ts          ← getActiveBrand() — env/host로 분기
│  ├─ types.ts          ← Brand 인터페이스
│  ├─ default.ts        ← 보닥 (현 defaultBrand)
│  ├─ heungkuk.ts
│  └─ samsung.ts
├─ palette/
│  ├─ bodak.ts          ← 보닥용 Value 색상 그룹 (#3182F6 계열)
│  └─ {brand}.ts
└─ copy/
   ├─ default.ko.ts     ← 페이지/메뉴/뱃지 라벨 사전
   └─ {brand}.ko.ts
```

### 8.3 `Brand` 타입 확장 (현행 7필드 → 13필드)

```ts
export interface Brand {
  // 식별
  key: string;                      // 'bodak' | 'heungkuk' | …
  name: string;                     // '보닥 플래너'
  partnerName: string;              // 'for 흥국화재'
  productName?: string;

  // 시각
  logoInitial: string;              // 1자
  logoUrl?: string;                 // SVG/PNG (선택)
  faviconUrl?: string;
  ogImageUrl?: string;

  // 컬러 (Value 단계)
  palette: {
    primary: string;       primaryHover: string;
    success: string;       danger: string;
    warning?: string;      accent?: string;       // 보조 강조
  };

  // 운영
  termsUrl?: string;
  privacyUrl?: string;
  supportEmail?: string;
}
```

`applyBrand(brand)` 는 `--button-accent-primary`, `--error`, `--warning`, `--accent`, `data-brand-*` 어트리뷰트를 :root에 1회 주입한다 (현 `applyBrand()`와 동일한 패턴 — 이미 잘 구성되어 있음).

### 8.4 활성 브랜드 결정 우선순위

1. `import.meta.env.VITE_BRAND` (빌드 타임)
2. `window.location.hostname` 화이트리스트 매핑 (`heungkuk.bodak.kr` → `heungkuk`)
3. URL 쿼리 `?brand=…` (디버깅용)
4. 기본값 `default`

### 8.5 카피·도메인 용어 분리

`PAGE_META`(App.tsx)와 Sidebar의 한국어 라벨이 코드에 박혀 있다. 보험사마다 **상담 진행 고객 ↔ 진행 중 고객 ↔ 활성 리드** 로 다르게 부르므로:

```
src/copy/{brandKey}.ko.ts   ← key→label 맵
src/i18n.ts                 ← getCopy('page.consult-active') → '상담 진행 고객'
```

PAGE_META는 키만 들고, 라벨은 사전에서 가져오게 한다. 향후 다국어/일본어 진출에도 유리.

### 8.6 도메인 데이터 어댑터

`mock-data.ts` 의 도메인 가정(설계사/플래너/지점 구조)을 `src/domain/{boundedContext}` 로 옮기고 `interface Customer / DB / Org` 인터페이스 + 어댑터 패턴을 적용. 각 보험사의 백엔드 스키마 차이를 어댑터에서 흡수.

### 8.7 자산 분리

```
public/brand/{brandKey}/
  ├─ logo.svg
  ├─ favicon.svg
  └─ og.png
```

`applyBrand()` 가 `<link rel="icon">` / `<meta property="og:image">` 를 동적 갱신.

### 8.8 신규 브랜드 출시 체크리스트

1. `src/config/brand/{brandKey}.ts` 추가
2. `src/config/palette/{brandKey}.ts` 색상 그룹 추가 (3~5색)
3. `public/brand/{brandKey}/` 자산 업로드
4. `src/copy/{brandKey}.ko.ts` 라벨 변경분 (필요 시)
5. 환경변수/호스트 라우팅 등록
6. `pnpm dev` → 모든 페이지 hover/active/focus·KPI·Badge 색이 갱신되는지 확인
7. Figma `브랜드 컬러 페이지`에 새 브랜드 시트 추가 (Value 그룹 동기화)

### 8.9 화이트레이블 시 *건드리지 말아야 할 것*

- 컴포넌트 코드 (`src/components/**`) 의 className
- 의미 토큰 매핑 (`button_accent_primary` 가 어떤 Value를 가리키는지는 바뀌지만, 컴포넌트는 모름)
- DataTable 줄무늬·hover 같은 내부 그레이 (UX 일관성)
- Pretendard 폰트 (한글 가독성 표준)

---

## 9. 더 좋은 방법 제안 (Figma v3보다 한 발 더)

피그마 v3 규칙 준수가 1순위지만, *현 CRM 상황과 B2B 재판매를 동시에 해결*하는 5개 추가 권장 사항:

### 9.1 Toss 스타일 “3-Tier 토큰”에 *Component-tier*를 명시적으로 분리

v3는 “component-specific”까지만 정의하고 있고, *컴포넌트 인스턴스(Button, Badge)*는 토큰명 없이 className으로만 표현된다. 본 문서 § 5.3 의 `text-h4`/`text-body3-medium` 같은 **Component class 매크로**를 정식 Tier로 등록하면 Figma 디자이너와 개발자가 같은 단어를 쓴다.

### 9.2 “브랜드 안전(safe)” / “브랜드 자유(free)” 토큰 구분

화이트레이블에서 *바뀌면 안 되는* 토큰(예: `text_primary`, `error`)과 *바뀌어야 하는* 토큰(예: `button_accent_primary`)을 메타데이터로 표시:

```css
/* 주석 컨벤션 */
--button-accent-primary: ...;   /* @brand-free */
--text-primary: ...;            /* @brand-safe */
```

화이트레이블 빌드 스크립트가 `@brand-free` 토큰만 검증·교체하도록 한다.

### 9.3 `light_blue` 외에 **브랜드 고유 Value 그룹** 권장

v3의 `light_blue_400` 을 모든 브랜드의 액센트로 강제하면 보닥(#3182F6)·흥국·삼성이 같은 색이 된다. 대신:

```
palette_bodak_50 ~ 900    (#3182F6 중심)
palette_heungkuk_50 ~ 900
palette_samsung_50 ~ 900
```

Figma도 *브랜드 Value 페이지*를 분리해 두고, Semantic은 `palette[active]`를 가리키게 한다.

### 9.4 Tailwind v4 `@theme inline` 단일 소스

현재는 `tokens.css` (`:root`)와 `index.css @theme`가 이중 정의다. Tailwind v4는 `@theme inline` 으로 CSS 변수와 Tailwind 토큰을 하나로 묶을 수 있다. 한 군데만 갱신하면 되는 구조로 정리.

### 9.5 다크모드 분기점 미리 깔기

지금 다크모드 요구는 없지만, *Semantic 토큰의 가장 큰 가치는 다크모드 분기*다.

```css
:root              { --bg-primary: var(--cool-neutral-100); … }
[data-theme="dark"] { --bg-primary: var(--cool-neutral-900); … }
```

화이트레이블 + 다크모드 = `data-brand` × `data-theme` 매트릭스. 처음부터 토큰 구조만 잡아두면 추후 무비용 도입.

### 9.6 토큰 검사 스크립트 (lint)

`scripts/lint-tokens.ts` 로 *컴포넌트 내 hex 직박이 / `text-[NNpx]` 임의 폰트 / 매핑표에 없는 클래스* 를 PR에서 자동 차단. 디자인 시스템 일관성을 회의 대신 CI로 강제.

### 9.7 Figma ↔ 코드 동기화는 **Tokens Studio + Style Dictionary** 권장

Figma Tokens Studio 플러그인 → JSON export → Style Dictionary → CSS/TS 변환 → `tokens.css` 자동 생성. 디자이너가 Figma만 수정해도 코드 토큰이 자동 갱신.

---

## 10. 점진 마이그레이션 플랜 (시각 변화 0 마라톤 + v3 visual alignment pass)

> Phase 1~5 는 **이름·구조 정렬만** 한다 (§ 0.1 시각 변화 0). v3 spec hex 로의 이주는 Phase 6 에서 디자이너 검토·승인 후 별도 진행.

| 단계 | 작업                                                                                     | 산출물                                       | 영향          |
| ---- | ---------------------------------------------------------------------------------------- | -------------------------------------------- | ------------- |
| 1    | Value 토큰(§ 2) 전체를 `tokens.css`에 추가 (코드는 아직 사용 안 함).                     | `--cool-neutral-50 ~ 990` 등 전부            | 시각 변화 X   |
| 2    | Semantic 토큰(§ 3)을 추가하고 *기존* `--color-*` 변수에 alias 부여. § 6.4.1 갭 토큰은 코드 hex literal 보유. | Tier 2 + identity alias                  | 시각 변화 X   |
| 3a   | **임의 hex 직박이 치환** (Badge / DataTable / App / Sidebar / Button). § 5.1 매핑표 적용. | hex 직박이 0건 PR                            | 시각 변화 X (1px 이내 검증) |
| 3b   | **Tailwind 기본 팔레트 380건 일괄 치환** (`gray-*` / `blue-*` 등). § 5.4 매핑표 적용. PR-by-PR. | 위반 0건 + lint 도입                         | 시각 변화 X   |
| 3c   | **차트 팔레트 신설** (`--chart-accent / --chart-grid / --chart-axis / --chart-tooltip-border`) + `HomeDashboard.tsx` recharts inline hex 치환. | 차트 토큰 PR                                 | 시각 변화 X   |
| 4    | Typography 매크로 클래스(`text-h1~h5`, `text-body1~5`, `text-caption` size-only) 도입 + `tailwind-merge` 확장 + `text-[NNpx]` 일괄 치환 + **§ 4.2.1 짝수 규칙 적용** (19→20, 17→18, 11→12) + HomeDashboard recharts inline 11→12. | `index.css`, `lib/utils.ts`, 컴포넌트 PR-by-PR + baseline 1~2회 갱신     | ✅ **완료** — 짝수 규칙 cascading 의도된 변화 (§ 0.7). 그 외 임의값 치환은 시각 변화 0. |
| 5    | `brand.ts` → `palette/` + `brand/` + `copy/` 분리, `applyBrand()` 가 Semantic 토큰을 갱신하게 변경. | B2B 화이트레이블 1차 운영 가능               | 시각 변화 X   |
| **6** | **v3 visual alignment pass** — § 6.4.1 갭 6건의 코드 hex 를 v3 spec hex 로 이주 (`--bg-primary`, `--text-primary`, `--text-secondary`, `--text-disabled`, `--border-primary`, `--border-subtle`). § 2.6 ↔ § 3.4 border 매핑 모순도 함께 해소. | 디자이너 검토·승인 PR                         | **시각 변화 발생** — 합의된 정렬. baseline 갱신 필수. |

각 단계 끝나면 § 6 "갭 추적" 표를 갱신하고, 합의된 항목은 *시각 정렬*로 닫는다.

---

## 11. 부록 — 빠른 참조

```
Value      common_100 / common_0
           cool_neutral_50 ~ 990
           light_blue_50 ~ 900   blue_50 ~ 900   green_50 ~ 900
           red_50 ~ 900          amber/orange/cyan/lime/magenta/purple/violet
           alpha_white_50 ~ 900  alpha_black_50 ~ 900

Semantic   bg_primary / bg_secondary / bg_tertiary / bg_emphasis_*
           text_primary / text_secondary / text_tertiary / text_quaternary / text_disabled
           text_inverse_* / text_accent
           icon_enabled / icon_subtle / icon_inactive / icon_active / icon_accent / icon_disabled
           border_primary / border_subtle / border_selected / border_transparent
           overlay_50
           button_accent_primary / button_accent_secondary / button_accent_tertiary
           button_surface_neutral / button_surface_*_disabled / button_inverse_primary
           accent / error / warning
           static_white / static_black (+ subtle/subtler/bold)

Typography h1_bold(36/46/600)  h2_bold(34/46/600)  h3_bold(24/38/600)
           h4(22/32/600)       h5_bold(20/30/600)
           body1_bold(18/28/600)  body2_*(16/24/*)
           body3_medium(14/22/500)  body3_normal(14/22/400)
           body4_medium(13/18/500)  body5_normal(12/18/400)
           caption(10/16/400)

Radius     sm 4 / md 8 / lg 12 / xl 16 / full

Pretendard regular 400 / medium 500 / bold(=semibold) 600
```

---

**문서 갱신 규칙**: 토큰 추가/삭제 PR은 본 문서의 § 2~5와 § 6 갭 표를 같이 갱신한다. PR 템플릿에 `[ ] DESIGN_SYSTEM.md 동기화` 체크박스 필수.
