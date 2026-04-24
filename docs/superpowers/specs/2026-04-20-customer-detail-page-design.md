# 고객 상세 페이지 (Customer Detail Page) — 설계 문서

> 작성일: 2026-04-20
> 작업자: 이윤경 (djvlwm602@gmail.com)
> 관련 페이지: 계약 예정 고객 → 고객명 클릭 시 신규 탭 오픈

---

## 1. 목적 & 범위

**목적:** `계약 예정 고객` 리스트에서 고객명을 클릭하면, **새 탭(`window.open(..., '_blank')`)** 으로 열리는 **고객 상세 페이지**를 구현한다.

**범위:**
- 새 라우트(`?page=customer-detail`) 추가 — Sidebar/TopBar 없는 독립 레이아웃
- 좌측 탭 네비 6개: `요약 정보` / `상품 종합 진단` / `상품별 상세 진단` / `나이별 보장 진단` / `상담 이력 및 메모` / `AI 상담 내역`
- 상단 고객정보 헤더(6개 탭 공통)
- 첨부된 5개 디자인 이미지 기반 퍼블리싱 (AI 상담 내역은 "준비 중" 플레이스홀더)

**범위 외:**
- 실제 고객 데이터 연동 (모두 mock)
- 상담 메모 추가/편집/삭제 동작 (UI만)
- 엑셀 다운로드 실제 동작 (버튼만)

---

## 2. 라우팅

### 2.1 URL 스킴
```
/?page=customer-detail&id=<customerId>&tab=<tabKey>
```
- `id`: 현재는 무시 (mock 1명 공용)
- `tab`: `summary` | `product-summary` | `product-detail` | `age-coverage` | `consultation` | `ai-consult`
- `tab` 파라미터 없으면 `summary` 기본값

### 2.2 App.tsx 변경
- `getInitialPage()`가 `customer-detail`이면 **기존 Sidebar/TopBar를 렌더하지 않고** `CustomerDetailPage`만 풀스크린으로 렌더
- 기존 페이지는 그대로 유지 (영향 없음)

### 2.3 진입점
`ContractExpected.tsx`의 고객명 셀에 onClick 추가:
```tsx
onClick={() => window.open(`/?page=customer-detail&id=${row.no}`, '_blank')}
```

---

## 3. 레이아웃 구조

```
┌───────────────────────────────────────────────────────────────┐
│ CustomerHeader (고정, 6개 탭 공통)                               │
│  이민혁(34/남/서울) [종합진단]        설계사:홍길동 [상태드롭다운]    │
│  0507-... | 비위험군 | 결혼 O | 운전 X | 자녀 X | 상령일          │
├────────────────┬──────────────────────────────────────────────┤
│ CustomerSidebar│ Tab Content (스크롤)                           │
│  (좌측 200px)  │                                                │
│                │                                                │
│  요약 정보       │                                                │
│  상품 종합 진단  │                                                │
│  상품별 상세 진단│                                                │
│  나이별 보장 진단│                                                │
│  상담 이력 및 메모│                                                │
│  AI 상담 내역    │                                                │
└────────────────┴──────────────────────────────────────────────┘
```

- 최소 너비: `min-w-[1280px]` (기존 앱과 동일)
- 헤더는 고정(sticky), 본문만 스크롤

---

## 4. 컴포넌트 구성

```
src/components/customer-detail/
├── CustomerDetailPage.tsx        # 루트 컨테이너 (헤더 + 사이드바 + 탭 라우팅)
├── CustomerHeader.tsx            # 고객정보 헤더 (상태 드롭다운 포함)
├── CustomerSidebar.tsx           # 좌측 6개 탭 네비
├── StatusDropdown.tsx            # 계약예정/상담중/상담종료 상태 선택 드롭다운
├── CoverageStatusIcon.tsx        # 보장상태 4종 아이콘 (✓ / + / - / X)
└── tabs/
    ├── SummaryTab.tsx            # 요약 정보
    ├── ProductSummaryTab.tsx     # 상품 종합 진단
    ├── ProductDetailTab.tsx      # 상품별 상세 진단
    ├── AgeCoverageTab.tsx        # 나이별 보장 진단
    ├── ConsultationHistoryTab.tsx# 상담 이력 및 메모
    └── AIConsultTab.tsx          # AI 상담 내역 (준비 중)
```

**각 탭은 독립 컴포넌트** — 한 탭이 커져도 다른 탭에 영향 없음.

---

## 5. 디자인 세부 스펙

### 5.1 공통 — CustomerHeader

| 요소 | 위치 | 스타일 |
|------|------|-------|
| 이름/연령/성별/지역 | 좌측 상단 | `text-xl font-semibold` |
| 종합진단 뱃지 | 이름 옆 | 빨간 배경 `#FF5B5B`, 흰 글자 |
| 설계사 | 우측 상단 | `text-sm` |
| 상태 드롭다운 | 우측 하단 | 녹색(계약예정)/파랑(상담중)/회색(상담종료) |
| 구분 정보 | 좌측 하단 | 구분선 `|` 포함 회색 텍스트 |

**상태 드롭다운 동작:**
- 클릭 시 3개 옵션 표시: `계약예정`(녹색) / `상담중`(파랑) / `상담종료`(회색)
- 선택 시 헤더 상태만 로컬 state로 변경 (서버 반영 없음)

### 5.2 사이드바 — CustomerSidebar

- 너비: `w-[200px]`
- 각 메뉴: `h-14` 세로 중앙 정렬
- 선택된 탭: `bg-black text-white font-semibold`
- 미선택 탭: `text-text-primary hover:bg-bg`
- 테두리: 우측만 `border-r border-border`

### 5.3 요약 정보 탭

**① 보험 진단 유형 (박스 1)**
- 테두리 박스 (`border border-border rounded-md p-6`)
- 빨간 제목: `text-danger font-semibold text-lg` ("암 진단 부족형")
- 설명 텍스트: `text-text-primary text-sm leading-relaxed`

**② 보험 계약 정보 (박스 2)**
- 라디오 그룹 3개: `전체` / `계약자(본인) = 피보험자(본인)` / `계약자(본인) ≠ 피보험자(타인)`
- 2x2 그리드:
  - 상단 행 (2분할): `보유 계약`, `월 납입 보험료`
  - 하단 행 (3분할): `기 납입 보험료`, `납입 예정 보험료`, `총 납입 보험로`
- 각 셀: 라벨 + 값 (`font-semibold text-xl`)
- 셀 간 구분선: `border border-border`

**③ 주요 보장 구성 (박스 3)**
- 4열 그리드:
  | 컬럼 | 아이콘 | 건수 | 개수 |
  |------|------|-----|-----|
  | 보장 여유 | 파란 ✓ | 12건 | 11개 |
  | 보장 적정 | 초록 + | 11건 | 11개 |
  | 보장 부족 | 노랑 - | 8건 | 7개 |
  | 보장 취약 | 빨강 X | 11건 | 11개 |
- 각 컬럼 내 담보명 리스트 (아이콘 + 텍스트 세로 나열)

### 5.4 상품 종합 진단 탭

- 상단: 타이틀 + `엑셀 다운로드` 검정 버튼
- 상단 테이블 (상품 정보): 행 헤더 + 4개 회사 컬럼 (A사/B사/C사/C사)
  - 항목: 보험회사, 상품명, 가입일, 갱신여부, 납입기간, 보장기간, 월납 보험료, 기 납입 보험료, 납입 예정 보험료, 총 납입 보험료
- 하단 테이블 (담보별 가입금액):
  - 컬럼: 담보분류 | 담보명 | A사 가입금액 | B사 가입금액 | C사 가입금액 | C사 가입금액 | 총 가입금액 | 권장금액 | 40대 평균 | 보장상태
  - 담보분류(좌측 첫 컬럼)는 rowspan으로 병합: 사망/후유장애/암/뇌/심장/치매/수술/입원/간병인/운전자/치아/실손
  - 보장상태 컬럼: `CoverageStatusIcon` 컴포넌트

**테이블 스타일:**
- 기존 `DataTable` 재사용 (스타일 통일)
- 헤더: 회색 배경
- 홀수 행: 옅은 회색 줄무늬 (기존 컨벤션)

### 5.5 상품별 상세 진단 탭

- 상단: 타이틀 + 엑셀 다운로드 + 상품 선택 드롭다운 (기존 `SelectField`)
- 상품 정보 테이블 (세로 2열: 항목명 + 값)
- 담보 상세 테이블:
  - 컬럼: 담보분류 | 담보명 | 가입금액 | 보장내역
  - 보장내역은 여러 줄 (각 줄에 `[정상]` 태그, 설명, 금액, 날짜)
  - 담보분류 rowspan 병합

### 5.6 나이별 보장 진단 탭

- 구조 5.4와 동일하나 **회사 컬럼 → 나이 컬럼으로 교체**
- 컬럼: 담보분류 | 담보명 | 60대 | 80대 | 100대 | 종신 | 총 가입금액 | 권장금액 | 40대 평균 | 보장상태

### 5.7 상담 이력 및 메모 탭

**좌측 본문 — 타임라인:**
- 세로 구분선 (`border-l-2 border-black`) + 각 이벤트 앞에 검정 원형 도트
- 각 이벤트:
  - 날짜/시간 + " - " + 제목 + 상태 뱃지(`부재중`빨강 / `유효통화`녹색 / `통화성공`파랑)
  - 메모 없음: `+ 상담 메모추가` 텍스트 버튼
  - 메모 있음: 박스 안에 메모 텍스트 + 작성일 + 편집/삭제 아이콘 (동작 없음)
  - 메모 입력 폼: textarea + `취소`(흰 배경) / `확인`(검정 배경) 버튼 (UI만)

**우측 사이드바 — 상담 현황 (`w-[220px]`):**
- 타이틀: `상담 현황`
- 라벨/값 쌍 6개:
  - 총 통화 수: 7회 / 부재중: 1회 / 통화 성공 수: 4회 / 유효 통화 수: 2회 / 총 통화 시간: 1시간 30분 / 평균 통화 시간: 20분

### 5.8 AI 상담 내역 탭

- 중앙 정렬 플레이스홀더: "준비 중인 페이지입니다."

---

## 6. 공통 컴포넌트

### 6.1 CoverageStatusIcon
```tsx
type Status = 'sufficient' | 'adequate' | 'insufficient' | 'weak';
// sufficient: 파란 배경 + 흰 ✓
// adequate: 초록 배경 + 흰 +
// insufficient: 노란 배경 + 흰 -
// weak: 빨간 배경 + 흰 X
// 크기: 16x16 원형, rounded-full
```

### 6.2 StatusDropdown
```tsx
type Status = '계약예정' | '상담중' | '상담종료';
// 기본 닫힘 상태: 현재 상태 + chevron-down
// 열림: 3개 옵션 드롭다운 메뉴
// 색상:
//   계약예정 → bg-[#00B493] text-white
//   상담중 → bg-[#3182F6] text-white
//   상담종료 → bg-[#AEB5BC] text-white
```

---

## 7. 데이터 모델 (mock)

```tsx
// customer-detail/mock-data.ts
export const mockCustomer = {
  name: '이민혁', age: 34, gender: '남', location: '서울특별시',
  phone: '0507-1234-1234',
  riskType: '비위험군 (사무직)',
  marriage: 'O', driving: 'X', children: 'X',
  birthday: '2026.01.01',
  planner: '홍길동',
  tag: '종합진단',
  // ... 각 탭별 mock 배열
};
```

---

## 8. 기존 컴포넌트 활용

| 재사용 | 용도 |
|--------|------|
| `DataTable` + 관련 | 5.4/5.5/5.6 테이블 |
| `Button` | 엑셀 다운로드, 취소/확인 |
| `SelectField` | 상품 선택 드롭다운 |
| `Badge` | 종합진단, 통화 상태 뱃지 |
| `cn()` (lib/utils) | 클래스 병합 |

---

## 9. 디자인 토큰 준수

- 폰트: Pretendard (기본)
- 색상: `--color-primary` (#3182F6), `--color-danger` (#FF5B5B), `--color-success` (#00B493) 등 기존 토큰 사용
- 라운드: 박스 `rounded-md` (8px)
- 간격: `--spacing-page-x` (24px) 기준

---

## 10. 구현 순서 (상위 레벨)

1. 폴더/파일 스캐폴딩 (`customer-detail/*`)
2. App.tsx 라우팅 분기 추가
3. CustomerHeader + StatusDropdown
4. CustomerSidebar + 탭 라우팅
5. 각 탭 6개 구현 (SummaryTab → ProductSummaryTab → ProductDetailTab → AgeCoverageTab → ConsultationHistoryTab → AIConsultTab)
6. ContractExpected.tsx 고객명 onClick 추가
7. 브라우저 검증 (각 탭 전환 확인)

(세부 plan은 `writing-plans` 스킬로 별도 생성)
