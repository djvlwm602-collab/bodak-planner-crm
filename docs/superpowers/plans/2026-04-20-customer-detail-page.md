# 고객 상세 페이지 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 계약 예정 고객 리스트에서 고객명을 클릭하면 새 탭으로 열리는 6탭(요약 정보/상품 종합 진단/상품별 상세 진단/나이별 보장 진단/상담 이력 및 메모/AI 상담 내역) 고객 상세 페이지를 구현한다.

**Architecture:** React SPA 내부에 URL 파라미터(`?page=customer-detail`) 기반 독립 레이아웃 분기를 추가한다. 기존 Sidebar/TopBar를 렌더하지 않고 `CustomerDetailPage`만 풀스크린으로 노출한다. 탭은 내부 state로 전환하며, 각 탭은 개별 파일로 분리한다.

**Tech Stack:** React 19 + TypeScript + TailwindCSS 4 + lucide-react. 테스트 프레임워크 없음 → 각 태스크는 TypeScript 컴파일(`npm run lint`) + 브라우저 시각 검증으로 확인한다.

**Spec:** `docs/superpowers/specs/2026-04-20-customer-detail-page-design.md`

---

## File Structure

**Create:**
```
src/components/customer-detail/
├── CustomerDetailPage.tsx        # 루트 (헤더 + 사이드바 + 탭 라우팅)
├── CustomerHeader.tsx            # 고정 헤더 (공통)
├── CustomerSidebar.tsx           # 좌측 6개 탭 네비
├── StatusDropdown.tsx            # 상태 드롭다운 (계약예정/상담중/상담종료)
├── CoverageStatusIcon.tsx        # 보장 상태 아이콘 4종
├── mock-data.ts                  # 모든 탭 공용 mock 데이터
└── tabs/
    ├── SummaryTab.tsx
    ├── ProductSummaryTab.tsx
    ├── ProductDetailTab.tsx
    ├── AgeCoverageTab.tsx
    ├── ConsultationHistoryTab.tsx
    └── AIConsultTab.tsx
```

**Modify:**
- `src/App.tsx` — `customer-detail` URL 분기 추가
- `src/components/ContractExpected.tsx` — 고객명 셀 onClick 추가

---

## Verification Convention

각 태스크 완료 시:
1. `npm run lint` — TypeScript 컴파일 에러 없는지 확인
2. 브라우저(`http://localhost:3000`)에서 해당 탭/화면 확인

테스트 프레임워크가 없으므로 TDD 대신 **"구현 → 타입 체크 → 시각 검증 → 커밋"** 루프를 사용한다.

---

### Task 1: 스캐폴딩 + mock 데이터 구축

**Files:**
- Create: `src/components/customer-detail/mock-data.ts`
- Create (빈 파일): `src/components/customer-detail/CustomerDetailPage.tsx`
- Create (빈 파일): `src/components/customer-detail/CustomerHeader.tsx`
- Create (빈 파일): `src/components/customer-detail/CustomerSidebar.tsx`
- Create (빈 파일): `src/components/customer-detail/StatusDropdown.tsx`
- Create (빈 파일): `src/components/customer-detail/CoverageStatusIcon.tsx`
- Create (빈 파일): `src/components/customer-detail/tabs/SummaryTab.tsx`
- Create (빈 파일): `src/components/customer-detail/tabs/ProductSummaryTab.tsx`
- Create (빈 파일): `src/components/customer-detail/tabs/ProductDetailTab.tsx`
- Create (빈 파일): `src/components/customer-detail/tabs/AgeCoverageTab.tsx`
- Create (빈 파일): `src/components/customer-detail/tabs/ConsultationHistoryTab.tsx`
- Create (빈 파일): `src/components/customer-detail/tabs/AIConsultTab.tsx`

- [ ] **Step 1: mock-data.ts 작성**

```ts
/**
 * Role: 고객 상세 페이지 6탭 공용 mock 데이터
 * Key Features: 고객 기본 정보 + 탭별 dummy 데이터
 */

// ── 고객 기본 정보 ──
export const mockCustomer = {
  name: '이민혁',
  age: 34,
  gender: '남',
  location: '서울특별시',
  phone: '0507-1234-1234',
  riskType: '비위험군 (사무직)',
  marriage: 'O' as const,
  driving: 'X' as const,
  children: 'X' as const,
  birthday: '2026.01.01',
  planner: '홍길동',
  tag: '종합진단',
};

// ── 요약 정보 탭 ──
export const mockDiagnosisType = {
  title: '암 진단 부족형',
  description:
    '현재 해당 고객은 다른 항목에 비해 암 진단비의 보장 비중이 상대적으로 낮습니다.\n유사시 치료비 외의 생활 자금을 확보하는데 어려움이 있을 수 있고, 최근 고액의 신 의료기술 치료가 늘어난 점을 고려하여 보장 한도 상향 검토가 필요합니다.',
};

export const mockContractSummary = {
  ownedCount: 5,
  monthlyPremium: 310_520,
  paidPremium: 77_310_520,
  upcomingPremium: 77_310_520,
  totalPremium: 77_310_520,
};

export type CoverageStatus = 'sufficient' | 'adequate' | 'insufficient' | 'weak';

export const mockCoverageComposition: Record<
  CoverageStatus,
  { title: string; count: number; items: string[] }
> = {
  sufficient: {
    title: '보장 여유',
    count: 12,
    items: [
      '상해간호/간병통합서비스',
      '교통사고벌금(대인)',
      '교통사고벌금(대물)',
      '자동차사고변호사선임비용',
      '보존치료',
      '보철치료',
      '질병통원',
      '상해통원',
      '상해입원',
      '비급여도수, 체외충격파,증식치료',
      '비급여 MRI',
      '비급여주사제',
    ],
  },
  adequate: {
    title: '보장 적정',
    count: 11,
    items: [
      '상해종수술',
      '질병종수술',
      '암수술',
      '뇌혈관질환수술',
      '심장질환수술',
      '상해입원일당',
      '질병입원일당',
      '암입원일당',
      '뇌혈관질환입원일당',
      '심장질환입원일당',
      '상해간병인지입원일당',
    ],
  },
  insufficient: {
    title: '보장 부족',
    count: 8,
    items: [
      '뇌졸중진단',
      '뇌혈관질환진단',
      '급성심심근경색진단',
      '허혈성심장질환진단',
      '경중치매',
      '중증치매',
      '상해수술',
      '질병수술',
    ],
  },
  weak: {
    title: '보장 취약',
    count: 11,
    items: [
      '상해사망',
      '질병사망',
      '상해후유장애',
      '질병후유장애',
      '암진단',
      '소액암진단',
      '고액암진단',
      '특정암진단',
      '항암방사선약물치료비',
      '고객항암치료비',
      '뇌출혈진단',
    ],
  },
};

// ── 상품 종합 진단 탭 ──
export const mockProductCompanies = [
  { company: 'A 사', product: '상품명이노출됩니다.', joinDate: '2025.06.01', renewal: '비갱신형', paymentPeriod: '20년납', coveragePeriod: '100세', monthly: 45_580, paid: 45_580, upcoming: 45_580, total: 45_580 },
  { company: 'B 사', product: '상품명이노출됩니다.', joinDate: '2025.06.01', renewal: '비갱신형', paymentPeriod: '20년납', coveragePeriod: '100세', monthly: 45_580, paid: 45_580, upcoming: 45_580, total: 45_580 },
  { company: 'C 사', product: '상품명이노출됩니다.', joinDate: '2025.06.01', renewal: '비갱신형', paymentPeriod: '20년납', coveragePeriod: '100세', monthly: 45_580, paid: 45_580, upcoming: 45_580, total: 45_580 },
  { company: 'C 사', product: '상품명이노출됩니다.', joinDate: '2025.06.01', renewal: '비갱신형', paymentPeriod: '20년납', coveragePeriod: '100세', monthly: 45_580, paid: 45_580, upcoming: 45_580, total: 45_580 },
];

type CoverageRow = {
  category: string;
  name: string;
  amounts: number[]; // 회사별 가입금액 (단위 만원)
  total: number;
  recommended: number;
  avg40: number;
  status: CoverageStatus | 'adequate';
};

export const mockCoverageRows: CoverageRow[] = [
  // 사망
  { category: '사망', name: '상해사망', amounts: [1_000, 2_000, 2_000, 0], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'adequate' },
  { category: '사망', name: '질병사망', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  // 후유장애
  { category: '후유장애', name: '상해후유장애', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '후유장애', name: '질병후유장애', amounts: [5_000, 0, 0, 0], total: 0, recommended: 5_000, avg40: 5_000, status: 'weak' },
  // 암
  { category: '암', name: '암진단', amounts: [0, 5_000, 5_000, 0], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '암', name: '소액암진단', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '암', name: '고액암진단', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '암', name: '특정암진단', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '암', name: '항암방사선약물치료비', amounts: [0, 0, 0, 0], total: 0, recommended: 5_000, avg40: 5_000, status: 'weak' },
  { category: '암', name: '고객항암치료비', amounts: [0, 5_000, 5_000, 0], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  // 뇌
  { category: '뇌', name: '뇌출혈진단', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'insufficient' },
  { category: '뇌', name: '뇌졸중진단', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '뇌', name: '뇌혈관질환진단', amounts: [5_000, 0, 0, 5_000], total: 0, recommended: 5_000, avg40: 5_000, status: 'weak' },
  // 심장
  { category: '심장', name: '급성심근경색진단', amounts: [0, 5_000, 5_000, 0], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '심장', name: '허혈성심장질환진단', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  // 치매
  { category: '치매', name: '경중치매', amounts: [0, 0, 0, 0], total: 0, recommended: 5_000, avg40: 5_000, status: 'weak' },
  { category: '치매', name: '중증치매', amounts: [0, 5_000, 0, 0], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  // 수술
  { category: '수술', name: '상해수술', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '수술', name: '질병수술', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '수술', name: '상해종수술', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '수술', name: '질병종수술', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '수술', name: '암수술', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '수술', name: '뇌혈관질환수술', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '수술', name: '심장질환수술', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  // 입원
  { category: '입원', name: '상해입원일당', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '입원', name: '질병입원일당', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '입원', name: '암입원일당', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '입원', name: '뇌혈관질환입원일당', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '입원', name: '심장질환입원일당', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  // 간병인
  { category: '간병인', name: '상해간병인지입원일당', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '간병인', name: '상해간호/간병통합서비스', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '간병인', name: '질병간병인인지원입원일당', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '간병인', name: '질병간호/간병통합서비스', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  // 운전자
  { category: '운전자', name: '교통사고벌금(대인)', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '운전자', name: '교통사고벌금(대물)', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '운전자', name: '교통사고처리지원금', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '운전자', name: '자동차사고변호사선임비용', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '운전자', name: '자동차사고부상위로금', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  // 치아
  { category: '치아', name: '보존치료', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '치아', name: '보철치료', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  // 실손
  { category: '실손', name: '질병통원', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '실손', name: '질병입원', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '실손', name: '상해통원', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '실손', name: '상해입원', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '실손', name: '비급여도수, 체외충격파 증식치료', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '실손', name: '비급여 MRI', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
  { category: '실손', name: '비급여주사제', amounts: [5_000, 5_000, 5_000, 5_000], total: 5_000, recommended: 5_000, avg40: 5_000, status: 'sufficient' },
];

// ── 상품별 상세 진단 탭 ──
export const mockProductDetail = {
  company: 'A 사',
  product: '상품명이노출됩니다.',
  joinDate: '2025.06.01',
  renewal: '비갱신형',
  paymentPeriod: '20년납',
  coveragePeriod: '100세',
  monthly: 45_580,
  paid: 45_580,
  upcoming: 45_580,
  total: 45_580,
};

export const mockProductDetailCoverages = [
  {
    category: '사망',
    name: '상해사망',
    amount: 1_000,
    details: [
      '[정상] 교통상해사망 (교통상해사망(자가용))  |  200만원  |  2026.03.23 (45세)',
      '[정상] 특정상해수술 (자동차사고성형수술(자가용))  |  200만원  |  2026.03.23 (45세)',
      '[선택][정상]대중교통이용중교통상해사망후유장해(3~100%)  |  200만원  |  2026.03.23',
      '[선택][정상]대중교통이용중교통상해사망후유장해(3~100%)  |  200만원  |  2026.03.23',
      '[선택][정상]대중교통이용중교통상해사망후유장해(3~100%)  |  200만원  |  2026.03.23',
    ],
  },
  {
    category: '사망',
    name: '질병사망',
    amount: 5_000,
    details: [
      '[정상] 교통상해사망 (교통상해사망(자가용))  |  1,000만원  |  2026.03.23 (45세)',
      '[정상] 특정상해수술 (자동차사고성형수술(자가용))  |  1,000만원  |  2026.03.23 (45세)',
      '[선택][정상]대중교통이용중교통상해사망후유장해(3~100%)  |  1,000만원  |  2026.03.23',
      '[선택][정상]대중교통이용중교통상해사망후유장해(3~100%)  |  1,000만원  |  2026.03.23',
      '[선택][정상]대중교통이용중교통상해사망후유장해(3~100%)  |  1,000만원  |  2026.03.23',
    ],
  },
];

// ── 나이별 보장 진단 탭 ──
// 나이별 데이터는 mockCoverageRows와 동일 구조 재사용 (60대/80대/100대/종신 4컬럼)
export const ageColumns = ['60대', '80대', '100대', '종신'] as const;

// ── 상담 이력 탭 ──
export type CallStatus = 'missed' | 'valid' | 'success';

export type TimelineEvent = {
  id: string;
  datetime: string;
  title: string;
  status?: CallStatus;
  duration?: string; // '3분 5초' 같은 포맷
  memos: { id: string; content: string; createdAt: string }[];
};

export const mockTimeline: TimelineEvent[] = [
  {
    id: 'evt-1',
    datetime: '2026.01.01  00:00',
    title: '최초 배정',
    memos: [],
  },
  {
    id: 'evt-2',
    datetime: '2026.01.01  00:00',
    title: '최초 통화',
    status: 'missed',
    memos: [],
  },
  {
    id: 'evt-3',
    datetime: '2026.01.01  00:00',
    title: '2차 통화',
    status: 'valid',
    duration: '3분 5초',
    memos: [
      { id: 'm1', content: '작성한 메모가 들어갑니다. 작성한 메모가 들어갑니다.작성한 메모가 들어갑니다.', createdAt: '2026.01.01 00:00' },
    ],
  },
  {
    id: 'evt-4',
    datetime: '2026.01.01  00:00',
    title: '3차 통화',
    status: 'success',
    duration: '28초',
    memos: [
      { id: 'm2', content: '작성한 메모가 들어갑니다. 작성한 메모가 들어갑니다.작성한 메모가 들어갑니다.', createdAt: '2026.01.01 00:00' },
    ],
  },
  {
    id: 'evt-5',
    datetime: '2026.01.01  00:00',
    title: '4차 통화',
    status: 'success',
    duration: '28초',
    memos: [
      { id: 'm3', content: '작성한 메모가 들어갑니다. 작성한 메모가 들어갑니다.작성한 메모가 들어갑니다.', createdAt: '2026.01.01 00:00' },
      { id: 'm4', content: '작성한 메모가 들어갑니다. 작성한 메모가 들어갑니다.작성한 메모가 들어갑니다.', createdAt: '2026.01.01 00:00' },
    ],
  },
];

export const mockCallStats = {
  totalCalls: 7,
  missedCalls: 1,
  successCalls: 4,
  validCalls: 2,
  totalTime: '1시간 30분',
  averageTime: '20분',
};

// ── 탭 키 ──
export type TabKey =
  | 'summary'
  | 'product-summary'
  | 'product-detail'
  | 'age-coverage'
  | 'consultation'
  | 'ai-consult';

export const TAB_ORDER: TabKey[] = [
  'summary',
  'product-summary',
  'product-detail',
  'age-coverage',
  'consultation',
  'ai-consult',
];

export const TAB_LABELS: Record<TabKey, string> = {
  'summary': '요약 정보',
  'product-summary': '상품 종합 진단',
  'product-detail': '상품별 상세 진단',
  'age-coverage': '나이별 보장 진단',
  'consultation': '상담 이력 및 메모',
  'ai-consult': 'AI 상담 내역',
};
```

- [ ] **Step 2: 나머지 파일 11개를 빈 `export {}` 스텁으로 생성**

각 파일 내용 (모두 동일):
```ts
export {};
```

→ 이후 태스크에서 내용 채움. TypeScript 컴파일 에러 방지용.

- [ ] **Step 3: 컴파일 확인**

Run: `npm run lint`
Expected: 에러 없음

- [ ] **Step 4: 커밋**

```bash
git add src/components/customer-detail/
git commit -m "feat: 고객 상세 페이지 스캐폴딩 및 mock 데이터 추가 — 6탭 공용 타입/데이터 정의"
```

---

### Task 2: CoverageStatusIcon (보장 상태 아이콘)

**Files:**
- Modify: `src/components/customer-detail/CoverageStatusIcon.tsx`

- [ ] **Step 1: 구현**

```tsx
/**
 * Role: 보장 상태 아이콘 — 여유/적정/부족/취약 4종
 * Key Features: rounded-full 원형 배지, 흰 아이콘
 */
import React from 'react';
import { Check, Plus, Minus, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { CoverageStatus } from './mock-data';

const config: Record<CoverageStatus, { bg: string; Icon: React.ComponentType<{ size: number; strokeWidth?: number; className?: string }> }> = {
  sufficient:   { bg: 'bg-primary',  Icon: Check },  // 파랑 ✓ → 보장 여유
  adequate:     { bg: 'bg-success',  Icon: Plus },   // 초록 + → 보장 적정
  insufficient: { bg: 'bg-amber-400', Icon: Minus }, // 노랑 - → 보장 부족
  weak:         { bg: 'bg-danger',   Icon: X },      // 빨강 X → 보장 취약
};

interface Props {
  status: CoverageStatus;
  size?: number; // 원형 지름 (px)
}

export function CoverageStatusIcon({ status, size = 18 }: Props) {
  const { bg, Icon } = config[status];
  return (
    <span
      className={cn('inline-flex items-center justify-center rounded-full text-white', bg)}
      style={{ width: size, height: size }}
    >
      <Icon size={size * 0.65} strokeWidth={3} />
    </span>
  );
}
```

- [ ] **Step 2: 컴파일 확인**

Run: `npm run lint`
Expected: 에러 없음

- [ ] **Step 3: 커밋**

```bash
git add src/components/customer-detail/CoverageStatusIcon.tsx
git commit -m "feat: 보장 상태 아이콘 컴포넌트 — 여유/적정/부족/취약 4종 원형 배지"
```

---

### Task 3: StatusDropdown (상태 드롭다운)

**Files:**
- Modify: `src/components/customer-detail/StatusDropdown.tsx`

- [ ] **Step 1: 구현**

```tsx
/**
 * Role: 고객 상태 드롭다운 — 계약예정/상담중/상담종료 3종 선택
 * Key Features: 상태별 색상, 클릭 시 외부로 변경 통보
 */
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export type CustomerStatus = '계약예정' | '상담중' | '상담종료';

const STATUS_OPTIONS: CustomerStatus[] = ['계약예정', '상담중', '상담종료'];

const statusColors: Record<CustomerStatus, string> = {
  '계약예정': 'bg-success text-white',    // 녹색
  '상담중':   'bg-primary text-white',    // 파란색
  '상담종료': 'bg-[#AEB5BC] text-white',  // 회색
};

interface Props {
  value: CustomerStatus;
  onChange: (next: CustomerStatus) => void;
}

export function StatusDropdown({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        className={cn(
          'inline-flex items-center justify-between gap-3 px-4 py-1.5 rounded-sm text-[13px] font-semibold min-w-[120px]',
          statusColors[value]
        )}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{value}</span>
        <ChevronDown size={16} className={cn('transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-20 bg-surface border border-border rounded-sm shadow-md min-w-[120px] overflow-hidden">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              className={cn(
                'w-full px-4 py-2 text-[13px] text-left hover:bg-bg transition-colors',
                opt === value && 'font-semibold'
              )}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: 컴파일 확인**

Run: `npm run lint`
Expected: 에러 없음

- [ ] **Step 3: 커밋**

```bash
git add src/components/customer-detail/StatusDropdown.tsx
git commit -m "feat: 상태 드롭다운 — 계약예정/상담중/상담종료 3종 선택 가능"
```

---

### Task 4: CustomerHeader (고정 상단 헤더)

**Files:**
- Modify: `src/components/customer-detail/CustomerHeader.tsx`

- [ ] **Step 1: 구현**

```tsx
/**
 * Role: 고객 상세 페이지 상단 고정 헤더 — 이름/태그/정보/설계사/상태
 * Key Features: 6개 탭 전체에 공통 고정, 상태 드롭다운 포함
 */
import React from 'react';
import { StatusDropdown, type CustomerStatus } from './StatusDropdown';
import { mockCustomer } from './mock-data';

interface Props {
  status: CustomerStatus;
  onStatusChange: (next: CustomerStatus) => void;
}

export function CustomerHeader({ status, onStatusChange }: Props) {
  return (
    <div className="w-full border-b border-border bg-surface px-8 py-5">
      <div className="flex items-start justify-between">
        {/* 좌측 — 이름/태그 + 상세 정보 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-[22px] font-bold text-text-primary">
              {mockCustomer.name} ({mockCustomer.age}세 / {mockCustomer.gender} / {mockCustomer.location})
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 bg-danger text-white text-[12px] font-semibold rounded-sm">
              {mockCustomer.tag}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[13px] text-text-secondary">
            <span>{mockCustomer.phone}</span>
            <span className="text-border-strong">|</span>
            <span>{mockCustomer.riskType}</span>
            <span className="text-border-strong">|</span>
            <span>결혼 {mockCustomer.marriage}</span>
            <span className="text-border-strong">|</span>
            <span>운전 {mockCustomer.driving}</span>
            <span className="text-border-strong">|</span>
            <span>자녀 {mockCustomer.children}</span>
            <span className="text-border-strong">|</span>
            <span>상령일: {mockCustomer.birthday}</span>
          </div>
        </div>

        {/* 우측 — 설계사 + 상태 */}
        <div className="flex flex-col items-end gap-2">
          <div className="text-[14px] font-semibold text-text-primary">
            설계사 : {mockCustomer.planner}
          </div>
          <StatusDropdown value={status} onChange={onStatusChange} />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 컴파일 확인**

Run: `npm run lint`
Expected: 에러 없음

- [ ] **Step 3: 커밋**

```bash
git add src/components/customer-detail/CustomerHeader.tsx
git commit -m "feat: 고객 상세 페이지 상단 헤더 — 고객 정보 + 상태 드롭다운"
```

---

### Task 5: CustomerSidebar (좌측 탭 네비)

**Files:**
- Modify: `src/components/customer-detail/CustomerSidebar.tsx`

- [ ] **Step 1: 구현**

```tsx
/**
 * Role: 고객 상세 페이지 좌측 탭 네비게이션 — 6개 탭
 * Key Features: 선택된 탭은 검정 배경, 호버 상태 포함
 */
import React from 'react';
import { cn } from '../../lib/utils';
import { TAB_ORDER, TAB_LABELS, type TabKey } from './mock-data';

interface Props {
  activeTab: TabKey;
  onTabChange: (next: TabKey) => void;
}

export function CustomerSidebar({ activeTab, onTabChange }: Props) {
  return (
    <nav className="w-[200px] border-r border-border bg-surface shrink-0">
      <ul className="flex flex-col">
        {TAB_ORDER.map((key) => {
          const active = key === activeTab;
          return (
            <li key={key}>
              <button
                type="button"
                onClick={() => onTabChange(key)}
                className={cn(
                  'w-full h-14 px-4 text-[14px] text-center transition-colors border-b border-border',
                  active
                    ? 'bg-black text-white font-semibold'
                    : 'text-text-primary hover:bg-bg'
                )}
              >
                {TAB_LABELS[key]}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
```

- [ ] **Step 2: 컴파일 확인**

Run: `npm run lint`
Expected: 에러 없음

- [ ] **Step 3: 커밋**

```bash
git add src/components/customer-detail/CustomerSidebar.tsx
git commit -m "feat: 고객 상세 페이지 좌측 사이드바 — 6개 탭 네비게이션"
```

---

### Task 6: AIConsultTab (준비 중 플레이스홀더) — 먼저 구현

**Files:**
- Modify: `src/components/customer-detail/tabs/AIConsultTab.tsx`

이 탭이 가장 단순하므로 먼저 만들어 CustomerDetailPage 연동을 검증.

- [ ] **Step 1: 구현**

```tsx
/**
 * Role: AI 상담 내역 탭 — 준비 중 플레이스홀더
 */
import React from 'react';

export function AIConsultTab() {
  return (
    <div className="flex-1 flex items-center justify-center py-20 text-text-disabled">
      <div className="text-center">
        <h3 className="text-lg font-medium text-text-primary mb-2">AI 상담 내역</h3>
        <p>준비 중인 페이지입니다.</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 컴파일 확인**

Run: `npm run lint`
Expected: 에러 없음

- [ ] **Step 3: 커밋**

```bash
git add src/components/customer-detail/tabs/AIConsultTab.tsx
git commit -m "feat: AI 상담 내역 탭 — 준비 중 플레이스홀더"
```

---

### Task 7: CustomerDetailPage 루트 + App.tsx 라우팅 분기

이 단계에서 이미 만든 컴포넌트(헤더/사이드바/AIConsultTab)를 연결해 **뼈대가 브라우저에 보이도록** 한다.

**Files:**
- Modify: `src/components/customer-detail/CustomerDetailPage.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: CustomerDetailPage 구현**

```tsx
/**
 * Role: 고객 상세 페이지 루트 — 헤더 + 사이드바 + 탭 컨텐츠 배치
 * Key Features: URL ?tab= 쿼리로 초기 탭 결정, 탭 전환 시 state 관리
 */
import React, { useState } from 'react';
import { CustomerHeader } from './CustomerHeader';
import { CustomerSidebar } from './CustomerSidebar';
import { SummaryTab } from './tabs/SummaryTab';
import { ProductSummaryTab } from './tabs/ProductSummaryTab';
import { ProductDetailTab } from './tabs/ProductDetailTab';
import { AgeCoverageTab } from './tabs/AgeCoverageTab';
import { ConsultationHistoryTab } from './tabs/ConsultationHistoryTab';
import { AIConsultTab } from './tabs/AIConsultTab';
import type { CustomerStatus } from './StatusDropdown';
import { TAB_ORDER, type TabKey } from './mock-data';

// URL ?tab= 쿼리로 초기 탭 결정
const getInitialTab = (): TabKey => {
  const t = new URLSearchParams(window.location.search).get('tab');
  return (TAB_ORDER as string[]).includes(t || '') ? (t as TabKey) : 'summary';
};

export function CustomerDetailPage() {
  const [tab, setTab] = useState<TabKey>(getInitialTab);
  const [status, setStatus] = useState<CustomerStatus>('계약예정');

  return (
    <div className="h-screen flex flex-col bg-bg min-w-[1280px]">
      <CustomerHeader status={status} onStatusChange={setStatus} />

      <div className="flex-1 flex overflow-hidden">
        <CustomerSidebar activeTab={tab} onTabChange={setTab} />

        <main className="flex-1 overflow-y-auto bg-surface">
          {tab === 'summary' && <SummaryTab />}
          {tab === 'product-summary' && <ProductSummaryTab />}
          {tab === 'product-detail' && <ProductDetailTab />}
          {tab === 'age-coverage' && <AgeCoverageTab />}
          {tab === 'consultation' && <ConsultationHistoryTab />}
          {tab === 'ai-consult' && <AIConsultTab />}
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 아직 스텁인 탭들을 임시로 플레이스홀더 컴포넌트 export하도록 수정**

다섯 개 탭 파일(`SummaryTab.tsx`, `ProductSummaryTab.tsx`, `ProductDetailTab.tsx`, `AgeCoverageTab.tsx`, `ConsultationHistoryTab.tsx`)의 내용을 아래와 같이 임시로 채움. 각 파일의 이름만 바꿔서 동일 패턴:

```tsx
// 예: SummaryTab.tsx
import React from 'react';
export function SummaryTab() {
  return <div className="p-8 text-text-secondary">요약 정보 (구현 예정)</div>;
}
```

- [ ] **Step 3: App.tsx에 customer-detail 분기 추가**

파일 상단 import 섹션에 추가:
```tsx
import { CustomerDetailPage } from './components/customer-detail/CustomerDetailPage';
```

`getInitialPage()` 함수 직전(혹은 적절한 위치)에 `customer-detail`을 PAGE_META와 별개로 허용하기 위해 다음과 같이 변경. **가장 단순한 구현**:

`getInitialPage()` 함수를 아래로 교체:
```tsx
// URL ?page= 쿼리로 초기 페이지 결정
const getInitialPage = () => {
  const p = new URLSearchParams(window.location.search).get('page');
  if (p === 'customer-detail') return 'customer-detail';
  return p && PAGE_META[p] ? p : '상담 진행 고객';
};
```

`export default function App()` 내부 return 문 최상단에 customer-detail 분기를 **Sidebar/TopBar보다 먼저** 추가:

```tsx
  if (activePage === 'customer-detail') {
    return (
      <div className="h-screen overflow-x-auto overflow-y-hidden bg-white text-gray-900 font-sans">
        <CustomerDetailPage />
      </div>
    );
  }

  return (
    <div className="h-screen overflow-x-auto overflow-y-hidden bg-white text-gray-900 font-sans">
      <div className="flex h-full min-w-[1280px]">
      <Sidebar ...
```

- [ ] **Step 4: 브라우저 검증**

Dev 서버가 이미 돌고 있으므로:
- `http://localhost:3000/?page=customer-detail` 접속
- 확인 사항:
  - 헤더에 이민혁 이름/정보/상태 드롭다운 표시
  - 좌측 6개 탭 표시
  - 기본 탭은 요약 정보, "구현 예정" 텍스트 표시
  - 탭 클릭 시 전환되는지 확인
  - 상태 드롭다운 열림/선택 동작 확인
  - AI 상담 내역 탭 클릭 시 "준비 중" 표시

- [ ] **Step 5: 컴파일 확인**

Run: `npm run lint`
Expected: 에러 없음

- [ ] **Step 6: 커밋**

```bash
git add src/components/customer-detail/ src/App.tsx
git commit -m "feat: 고객 상세 페이지 루트 + 라우팅 연결 — 독립 레이아웃 렌더, 탭 전환 동작"
```

---

### Task 8: SummaryTab (요약 정보)

**Files:**
- Modify: `src/components/customer-detail/tabs/SummaryTab.tsx`

- [ ] **Step 1: 구현**

```tsx
/**
 * Role: 요약 정보 탭 — 보험 진단 유형, 보험 계약 정보, 주요 보장 구성
 * Key Features: 3개 섹션 세로 배치, 4열 보장 구성 그리드
 */
import React, { useState } from 'react';
import { CoverageStatusIcon } from '../CoverageStatusIcon';
import {
  mockDiagnosisType,
  mockContractSummary,
  mockCoverageComposition,
} from '../mock-data';
import type { CoverageStatus } from '../mock-data';

type Filter = 'all' | 'same' | 'diff';

const formatKrw = (n: number) => `${n.toLocaleString('ko-KR')}원`;

export function SummaryTab() {
  const [filter, setFilter] = useState<Filter>('all');

  return (
    <div className="p-8 flex flex-col gap-10">
      {/* ① 보험 진단 유형 */}
      <section>
        <h2 className="text-[16px] font-bold text-text-primary mb-4">보험 진단 유형</h2>
        <div className="border border-border rounded-md p-6">
          <h3 className="text-[18px] font-bold text-danger mb-3">{mockDiagnosisType.title}</h3>
          <p className="text-[14px] text-text-primary leading-relaxed whitespace-pre-line">
            {mockDiagnosisType.description}
          </p>
        </div>
      </section>

      {/* ② 보험 계약 정보 */}
      <section>
        <h2 className="text-[16px] font-bold text-text-primary mb-4">보험 계약 정보</h2>

        {/* 라디오 필터 */}
        <div className="flex items-center gap-6 mb-4 text-[13px]">
          {[
            { v: 'all' as const, label: '전체' },
            { v: 'same' as const, label: '계약자(본인) = 피보험자(본인)' },
            { v: 'diff' as const, label: '계약자(본인) ≠ 피보험자(타인)' },
          ].map((o) => (
            <label key={o.v} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="contract-filter"
                checked={filter === o.v}
                onChange={() => setFilter(o.v)}
                className="accent-primary"
              />
              <span className="text-text-primary">{o.label}</span>
            </label>
          ))}
        </div>

        {/* 계약 정보 그리드 */}
        <div className="grid grid-cols-2 border border-border">
          <Cell label="보유 계약" value={`${mockContractSummary.ownedCount}건`} />
          <Cell label="월 납입 보험료" value={formatKrw(mockContractSummary.monthlyPremium)} />
        </div>
        <div className="grid grid-cols-3 border-l border-r border-b border-border">
          <Cell label="기 납입 보험료" value={formatKrw(mockContractSummary.paidPremium)} />
          <Cell label="납입 예정 보험료" value={formatKrw(mockContractSummary.upcomingPremium)} />
          <Cell label="총 납입 보험로" value={formatKrw(mockContractSummary.totalPremium)} />
        </div>
      </section>

      {/* ③ 주요 보장 구성 */}
      <section>
        <h2 className="text-[16px] font-bold text-text-primary mb-4">주요 보장 구성</h2>
        <div className="grid grid-cols-4 border border-border rounded-md overflow-hidden">
          {(Object.keys(mockCoverageComposition) as CoverageStatus[]).map((key, idx) => {
            const col = mockCoverageComposition[key];
            return (
              <div
                key={key}
                className={idx < 3 ? 'border-r border-border' : ''}
              >
                <div className="flex items-center gap-2 px-5 py-4 bg-bg border-b border-border">
                  <CoverageStatusIcon status={key} />
                  <span className="text-[14px] font-semibold text-text-primary">
                    {col.title} ({col.count}건)
                  </span>
                </div>
                <ul className="py-3">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 px-5 py-1.5 text-[13px] text-text-primary">
                      <CoverageStatusIcon status={key} size={14} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// ── 하위: 셀 (하나의 계약 정보 셀) ──
function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8 border-r border-border last:border-r-0">
      <div className="text-[13px] text-text-secondary">{label}</div>
      <div className="text-[22px] font-bold text-text-primary">{value}</div>
    </div>
  );
}
```

- [ ] **Step 2: 브라우저 검증**

- `http://localhost:3000/?page=customer-detail&tab=summary` 접속
- 3개 섹션 모두 렌더링, 라디오 클릭 동작, 4열 보장 구성 표시 확인

- [ ] **Step 3: 컴파일 확인**

Run: `npm run lint`
Expected: 에러 없음

- [ ] **Step 4: 커밋**

```bash
git add src/components/customer-detail/tabs/SummaryTab.tsx
git commit -m "feat: 요약 정보 탭 — 보험 진단 유형/보험 계약 정보/주요 보장 구성 3개 섹션"
```

---

### Task 9: ProductSummaryTab (상품 종합 진단)

**Files:**
- Modify: `src/components/customer-detail/tabs/ProductSummaryTab.tsx`

- [ ] **Step 1: 구현**

```tsx
/**
 * Role: 상품 종합 진단 탭 — 보험사 비교 테이블 + 담보별 가입금액 테이블
 * Key Features: 회사별 가입금액/보장상태를 한눈에, 담보분류 rowspan 병합
 */
import React from 'react';
import { Button } from '../../ui/button';
import { CoverageStatusIcon } from '../CoverageStatusIcon';
import { mockProductCompanies, mockCoverageRows } from '../mock-data';

export function ProductSummaryTab() {
  // 담보분류 rowspan 계산
  const categoryRowSpan: Record<string, number> = {};
  mockCoverageRows.forEach((r) => {
    categoryRowSpan[r.category] = (categoryRowSpan[r.category] || 0) + 1;
  });
  const rendered = new Set<string>();

  return (
    <div className="p-8">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-[18px] font-bold text-text-primary">상품 종합 진단</h2>
        <Button size="sm" className="bg-black hover:bg-gray-800 text-white">엑셀 다운로드</Button>
      </div>

      {/* 상품 정보 테이블 */}
      <table className="w-full border border-border mb-8 text-[13px]">
        <tbody>
          {[
            { label: '보험회사', values: mockProductCompanies.map((c) => c.company) },
            { label: '상품명', values: mockProductCompanies.map((c) => c.product) },
            { label: '가입일', values: mockProductCompanies.map((c) => c.joinDate) },
            { label: '갱신여부', values: mockProductCompanies.map((c) => c.renewal) },
            { label: '납입기간', values: mockProductCompanies.map((c) => c.paymentPeriod) },
            { label: '보장기간', values: mockProductCompanies.map((c) => c.coveragePeriod) },
            { label: '월납 보험료', values: mockProductCompanies.map((c) => `${c.monthly.toLocaleString()}원`) },
            { label: '기 납입 보험료', values: mockProductCompanies.map((c) => `${c.paid.toLocaleString()}원`) },
            { label: '납입 예정 보험료', values: mockProductCompanies.map((c) => `${c.upcoming.toLocaleString()}원`) },
            { label: '총 납입 보험료', values: mockProductCompanies.map((c) => `${c.total.toLocaleString()}원`) },
          ].map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? 'bg-bg' : 'bg-surface'}>
              <th className="w-32 py-3 px-4 text-center font-semibold text-text-primary border-r border-border">{row.label}</th>
              {row.values.map((v, idx) => (
                <td key={idx} className="py-3 px-4 text-center text-text-primary border-r border-border last:border-r-0">{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 단위 안내 */}
      <div className="text-right text-[12px] text-text-secondary mb-2">(단위 : 만원)</div>

      {/* 담보별 가입금액 테이블 */}
      <table className="w-full border border-border text-[13px]">
        <thead>
          <tr className="bg-bg">
            <th className="py-3 px-3 font-semibold text-text-primary border-r border-border w-20">담보분류</th>
            <th className="py-3 px-3 font-semibold text-text-primary border-r border-border">담보명</th>
            {mockProductCompanies.map((_, i) => (
              <th key={i} className="py-3 px-3 font-semibold text-text-primary border-r border-border">가입금액</th>
            ))}
            <th className="py-3 px-3 font-semibold text-text-primary border-r border-border">총 가입금액</th>
            <th className="py-3 px-3 font-semibold text-text-primary border-r border-border">권장금액</th>
            <th className="py-3 px-3 font-semibold text-text-primary border-r border-border">40대 평균</th>
            <th className="py-3 px-3 font-semibold text-text-primary">보장상태</th>
          </tr>
        </thead>
        <tbody>
          {mockCoverageRows.map((row) => {
            const showCategory = !rendered.has(row.category);
            if (showCategory) rendered.add(row.category);

            return (
              <tr key={`${row.category}-${row.name}`} className="border-t border-border">
                {showCategory && (
                  <td
                    rowSpan={categoryRowSpan[row.category]}
                    className="py-3 px-3 text-center font-semibold text-text-primary border-r border-border align-middle bg-bg"
                  >
                    {row.category}
                  </td>
                )}
                <td className="py-3 px-3 text-text-primary border-r border-border text-left">{row.name}</td>
                {row.amounts.map((a, i) => (
                  <td key={i} className="py-3 px-3 text-center text-text-primary border-r border-border">{a.toLocaleString()}</td>
                ))}
                <td className="py-3 px-3 text-center text-text-primary border-r border-border">{row.total.toLocaleString()}</td>
                <td className="py-3 px-3 text-center text-text-primary border-r border-border">{row.recommended.toLocaleString()}</td>
                <td className="py-3 px-3 text-center text-text-primary border-r border-border">{row.avg40.toLocaleString()}</td>
                <td className="py-3 px-3 text-center">
                  <div className="flex justify-center"><CoverageStatusIcon status={row.status} /></div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 2: 브라우저 검증**

- `?page=customer-detail&tab=product-summary` 접속
- 상단 테이블(상품 정보) + 하단 테이블(담보별) 모두 표시
- 담보분류 병합 셀(rowspan)이 올바른지 확인
- 보장상태 아이콘 4종 색상 확인

- [ ] **Step 3: 컴파일 확인**

Run: `npm run lint`
Expected: 에러 없음

- [ ] **Step 4: 커밋**

```bash
git add src/components/customer-detail/tabs/ProductSummaryTab.tsx
git commit -m "feat: 상품 종합 진단 탭 — 회사별 상품 정보 + 담보별 가입금액 비교"
```

---

### Task 10: ProductDetailTab (상품별 상세 진단)

**Files:**
- Modify: `src/components/customer-detail/tabs/ProductDetailTab.tsx`

- [ ] **Step 1: 구현**

```tsx
/**
 * Role: 상품별 상세 진단 탭 — 선택된 상품 1개의 정보 + 담보 상세 내역
 * Key Features: 드롭다운 상품 선택, 상품 정보 2열 테이블, 담보 상세 내역 멀티라인
 */
import React from 'react';
import { Button } from '../../ui/button';
import { SelectField } from '../../ui/select-field';
import { mockProductDetail, mockProductDetailCoverages } from '../mock-data';

export function ProductDetailTab() {
  // 담보분류 rowspan 계산
  const rowSpan: Record<string, number> = {};
  mockProductDetailCoverages.forEach((r) => {
    rowSpan[r.category] = (rowSpan[r.category] || 0) + 1;
  });
  const rendered = new Set<string>();

  return (
    <div className="p-8">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-[18px] font-bold text-text-primary">상품별 상세 진단</h2>
        <Button size="sm" className="bg-black hover:bg-gray-800 text-white">엑셀다운로드</Button>
      </div>

      {/* 상품 선택 드롭다운 */}
      <div className="mb-6 max-w-md">
        <SelectField>
          <option>상품명이 노출되고 선택할 수 있습니다.</option>
        </SelectField>
      </div>

      {/* 상품 정보 (2열 테이블) */}
      <table className="w-full max-w-[600px] border border-border mb-8 text-[13px]">
        <tbody>
          {[
            { label: '보험회사', value: mockProductDetail.company },
            { label: '상품명', value: mockProductDetail.product },
            { label: '가입일', value: mockProductDetail.joinDate },
            { label: '갱신여부', value: mockProductDetail.renewal },
            { label: '납입기간', value: mockProductDetail.paymentPeriod },
            { label: '보장기간', value: mockProductDetail.coveragePeriod },
            { label: '월납 보험료', value: `${mockProductDetail.monthly.toLocaleString()}원` },
            { label: '기 납입 보험료', value: `${mockProductDetail.paid.toLocaleString()}원` },
            { label: '납입 예정 보험료', value: `${mockProductDetail.upcoming.toLocaleString()}원` },
            { label: '총 납입 보험료', value: `${mockProductDetail.total.toLocaleString()}원` },
          ].map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? 'bg-bg' : 'bg-surface'}>
              <th className="w-40 py-3 px-4 text-center font-semibold text-text-primary border-r border-border">{row.label}</th>
              <td className="py-3 px-4 text-center text-text-primary">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right text-[12px] text-text-secondary mb-2">(단위 : 만원)</div>

      {/* 담보 상세 테이블 */}
      <table className="w-full border border-border text-[13px]">
        <thead>
          <tr className="bg-bg">
            <th className="py-3 px-3 font-semibold text-text-primary border-r border-border w-20">담보분류</th>
            <th className="py-3 px-3 font-semibold text-text-primary border-r border-border w-32">담보명</th>
            <th className="py-3 px-3 font-semibold text-text-primary border-r border-border w-24">가입금액</th>
            <th className="py-3 px-3 font-semibold text-text-primary text-left">보장내역</th>
          </tr>
        </thead>
        <tbody>
          {mockProductDetailCoverages.map((row) => {
            const showCategory = !rendered.has(row.category);
            if (showCategory) rendered.add(row.category);

            return (
              <tr key={`${row.category}-${row.name}`} className="border-t border-border">
                {showCategory && (
                  <td rowSpan={rowSpan[row.category]} className="py-3 px-3 text-center font-semibold text-text-primary border-r border-border align-middle bg-bg">
                    {row.category}
                  </td>
                )}
                <td className="py-3 px-3 text-center text-text-primary border-r border-border align-middle">{row.name}</td>
                <td className="py-3 px-3 text-center text-text-primary border-r border-border align-middle">{row.amount.toLocaleString()}</td>
                <td className="py-3 px-3 text-text-primary">
                  <ul className="flex flex-col gap-1">
                    {row.details.map((d, i) => (
                      <li key={i} className="text-[13px]">{d}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 2: 브라우저 검증**

- `?page=customer-detail&tab=product-detail` 접속
- 상품명 드롭다운, 상품 정보 2열 테이블, 담보 상세 테이블 표시 확인

- [ ] **Step 3: 컴파일 확인**

Run: `npm run lint`
Expected: 에러 없음

- [ ] **Step 4: 커밋**

```bash
git add src/components/customer-detail/tabs/ProductDetailTab.tsx
git commit -m "feat: 상품별 상세 진단 탭 — 상품 선택/상품 정보/담보 상세 내역"
```

---

### Task 11: AgeCoverageTab (나이별 보장 진단)

**Files:**
- Modify: `src/components/customer-detail/tabs/AgeCoverageTab.tsx`

`mockCoverageRows`의 `amounts` 배열(4개 값)을 나이별 컬럼으로 재사용한다.

- [ ] **Step 1: 구현**

```tsx
/**
 * Role: 나이별 보장 진단 탭 — 60대/80대/100대/종신 나이대별 가입금액 비교
 * Key Features: ProductSummaryTab과 구조는 같되 컬럼이 회사 → 나이
 */
import React from 'react';
import { Button } from '../../ui/button';
import { CoverageStatusIcon } from '../CoverageStatusIcon';
import { mockCoverageRows, ageColumns } from '../mock-data';

export function AgeCoverageTab() {
  const rowSpan: Record<string, number> = {};
  mockCoverageRows.forEach((r) => {
    rowSpan[r.category] = (rowSpan[r.category] || 0) + 1;
  });
  const rendered = new Set<string>();

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-[18px] font-bold text-text-primary">나이별 보장 진단</h2>
        <Button size="sm" className="bg-black hover:bg-gray-800 text-white">엑셀 다운로드</Button>
      </div>

      <div className="text-right text-[12px] text-text-secondary mb-2">(단위 : 만원)</div>

      <table className="w-full border border-border text-[13px]">
        <thead>
          <tr className="bg-bg">
            <th className="py-3 px-3 font-semibold text-text-primary border-r border-border w-20">담보분류</th>
            <th className="py-3 px-3 font-semibold text-text-primary border-r border-border">담보명</th>
            {ageColumns.map((age) => (
              <th key={age} className="py-3 px-3 font-semibold text-text-primary border-r border-border">{age}</th>
            ))}
            <th className="py-3 px-3 font-semibold text-text-primary border-r border-border">총 가입금액</th>
            <th className="py-3 px-3 font-semibold text-text-primary border-r border-border">권장금액</th>
            <th className="py-3 px-3 font-semibold text-text-primary border-r border-border">40대 평균</th>
            <th className="py-3 px-3 font-semibold text-text-primary">보장상태</th>
          </tr>
        </thead>
        <tbody>
          {mockCoverageRows.map((row) => {
            const showCategory = !rendered.has(row.category);
            if (showCategory) rendered.add(row.category);

            return (
              <tr key={`${row.category}-${row.name}`} className="border-t border-border">
                {showCategory && (
                  <td rowSpan={rowSpan[row.category]} className="py-3 px-3 text-center font-semibold text-text-primary border-r border-border align-middle bg-bg">
                    {row.category}
                  </td>
                )}
                <td className="py-3 px-3 text-text-primary border-r border-border text-left">{row.name}</td>
                {row.amounts.map((a, i) => (
                  <td key={i} className="py-3 px-3 text-center text-text-primary border-r border-border">{a.toLocaleString()}</td>
                ))}
                <td className="py-3 px-3 text-center text-text-primary border-r border-border">{row.total.toLocaleString()}</td>
                <td className="py-3 px-3 text-center text-text-primary border-r border-border">{row.recommended.toLocaleString()}</td>
                <td className="py-3 px-3 text-center text-text-primary border-r border-border">{row.avg40.toLocaleString()}</td>
                <td className="py-3 px-3 text-center">
                  <div className="flex justify-center"><CoverageStatusIcon status={row.status} /></div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 2: 브라우저 검증**

- `?page=customer-detail&tab=age-coverage` 접속
- 컬럼 헤더: 담보분류/담보명/60대/80대/100대/종신/... 확인

- [ ] **Step 3: 컴파일 확인**

Run: `npm run lint`
Expected: 에러 없음

- [ ] **Step 4: 커밋**

```bash
git add src/components/customer-detail/tabs/AgeCoverageTab.tsx
git commit -m "feat: 나이별 보장 진단 탭 — 60/80/100대/종신 컬럼 담보별 비교"
```

---

### Task 12: ConsultationHistoryTab (상담 이력 및 메모)

**Files:**
- Modify: `src/components/customer-detail/tabs/ConsultationHistoryTab.tsx`

- [ ] **Step 1: 구현**

```tsx
/**
 * Role: 상담 이력 및 메모 탭 — 타임라인 + 우측 상담 현황 통계
 * Key Features: 세로 타임라인, 통화 상태 뱃지, 메모 카드/입력 폼 (UI만)
 * Notes: 메모 입력/편집/삭제 실제 동작 없음 (스펙 결정)
 */
import React from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { mockTimeline, mockCallStats, type CallStatus } from '../mock-data';

const statusMeta: Record<CallStatus, { label: (d?: string) => string; className: string }> = {
  missed:  { label: () => '부재중',            className: 'text-danger' },
  valid:   { label: (d) => `유효통화 (${d ?? ''})`, className: 'text-success' },
  success: { label: (d) => `통화성공 (${d ?? ''})`, className: 'text-primary' },
};

export function ConsultationHistoryTab() {
  return (
    <div className="flex p-8 gap-8">
      {/* 좌측 — 타임라인 */}
      <div className="flex-1">
        <h2 className="text-[16px] font-bold text-text-primary mb-8">상담 이력 및 메모</h2>

        <div className="relative pl-6">
          {/* 세로 라인 */}
          <div className="absolute left-2 top-0 bottom-0 w-px bg-black" />

          <ul className="flex flex-col gap-10">
            {mockTimeline.map((evt) => (
              <li key={evt.id} className="relative">
                {/* 도트 */}
                <span className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-black" />

                {/* 제목 라인 */}
                <div className="flex items-center gap-3 text-[14px] font-semibold text-text-primary mb-2">
                  <span>{evt.datetime}</span>
                  <span className="text-text-secondary">-</span>
                  <span>{evt.title}</span>
                  {evt.status && (
                    <span className={cn('font-semibold', statusMeta[evt.status].className)}>
                      {statusMeta[evt.status].label(evt.duration)}
                    </span>
                  )}
                </div>

                {/* 메모 추가 버튼 */}
                <button type="button" className="flex items-center gap-1 text-[13px] text-text-secondary hover:text-text-primary mb-3">
                  <Plus size={14} />
                  <span>상담 메모추가</span>
                </button>

                {/* 메모 입력 폼 (두 번째 이벤트에만 노출) */}
                {evt.id === 'evt-2' && <MemoInputForm />}

                {/* 저장된 메모 카드들 */}
                {evt.memos.map((memo) => (
                  <MemoCard key={memo.id} content={memo.content} createdAt={memo.createdAt} />
                ))}

                {/* 세 번째 이벤트(evt-4)는 기존 메모 + 추가 입력 폼 병존 */}
                {evt.id === 'evt-4' && <MemoInputForm />}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 우측 — 상담 현황 */}
      <aside className="w-[220px] shrink-0">
        <h3 className="text-[16px] font-bold text-text-primary mb-6">상담 현황</h3>
        <ul className="flex flex-col gap-4 text-[14px]">
          <Stat label="총 통화 수" value={`${mockCallStats.totalCalls}회`} />
          <Stat label="부재중" value={`${mockCallStats.missedCalls}회`} />
          <Stat label="통화 성공 수" value={`${mockCallStats.successCalls}회`} />
          <Stat label="유효 통화 수" value={`${mockCallStats.validCalls}회`} />
          <Stat label="총 통화 시간" value={mockCallStats.totalTime} />
          <Stat label="평균 통화 시간" value={mockCallStats.averageTime} />
        </ul>
      </aside>
    </div>
  );
}

// ── 메모 입력 폼 (UI만) ──
function MemoInputForm() {
  return (
    <div className="mt-2 mb-4">
      <textarea
        className="w-full border border-border rounded-sm px-3 py-2 text-[13px] min-h-[80px] resize-none focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder="상담 메모를 입력해 주세요."
      />
      <div className="flex justify-end gap-2 mt-2">
        <button type="button" className="px-4 py-1.5 text-[13px] border border-border rounded-sm hover:bg-bg">
          취소
        </button>
        <button type="button" className="px-4 py-1.5 text-[13px] bg-black text-white rounded-sm hover:bg-gray-800">
          확인
        </button>
      </div>
    </div>
  );
}

// ── 저장된 메모 카드 (UI만) ──
function MemoCard({ content, createdAt }: { content: string; createdAt: string }) {
  return (
    <div className="mt-2 mb-2 border border-border rounded-sm px-4 py-3">
      <p className="text-[13px] text-text-primary leading-relaxed">{content}</p>
      <div className="flex items-center justify-between mt-3 text-[12px] text-text-secondary">
        <span>{createdAt}</span>
        <div className="flex items-center gap-2">
          <button type="button" className="hover:text-text-primary"><Pencil size={14} /></button>
          <button type="button" className="hover:text-text-primary"><Trash2 size={14} /></button>
        </div>
      </div>
    </div>
  );
}

// ── 상담 현황 행 ──
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-text-secondary">
        <span className="w-1 h-1 bg-text-primary rounded-full" />
        {label}
      </span>
      <span className="font-semibold text-text-primary">{value}</span>
    </li>
  );
}
```

- [ ] **Step 2: 브라우저 검증**

- `?page=customer-detail&tab=consultation` 접속
- 타임라인: 최초 배정 / 최초 통화(부재중) / 2차 통화(유효) / 3차 통화(성공) / 4차 통화 확인
- 메모 입력 폼 표시, 저장된 메모 카드 편집/삭제 아이콘 표시
- 우측 상담 현황 통계 6행 표시

- [ ] **Step 3: 컴파일 확인**

Run: `npm run lint`
Expected: 에러 없음

- [ ] **Step 4: 커밋**

```bash
git add src/components/customer-detail/tabs/ConsultationHistoryTab.tsx
git commit -m "feat: 상담 이력 및 메모 탭 — 타임라인 + 메모 UI + 우측 상담 현황 통계"
```

---

### Task 13: ContractExpected에서 새 탭 오픈 연결

**Files:**
- Modify: `src/components/ContractExpected.tsx`

- [ ] **Step 1: 고객명 셀에 onClick 추가**

기존 코드:
```tsx
<DataTableCell className="text-primary hover:underline cursor-pointer">
  {row.name}
</DataTableCell>
```

변경:
```tsx
<DataTableCell
  className="text-primary hover:underline cursor-pointer"
  onClick={() => window.open(`/?page=customer-detail&id=${row.no}`, '_blank')}
>
  {row.name}
</DataTableCell>
```

- [ ] **Step 2: 브라우저 검증**

- `http://localhost:3000/?page=계약 예정 고객` 접속
- 고객명(이*혁) 클릭 → 새 탭에서 고객 상세 페이지 열림 확인
- 새 탭 URL: `/?page=customer-detail&id=<no>` 확인

- [ ] **Step 3: 컴파일 확인**

Run: `npm run lint`
Expected: 에러 없음

- [ ] **Step 4: 커밋**

```bash
git add src/components/ContractExpected.tsx
git commit -m "feat: 계약 예정 고객 고객명 클릭 시 새 탭으로 상세 페이지 오픈"
```

---

### Task 14: 최종 통합 검증

- [ ] **Step 1: 전체 시나리오 브라우저 검증**

1. `http://localhost:3000` 접속 → 기존 홈 대시보드 정상 렌더 (회귀 없음)
2. 사이드바 → "계약 예정 고객" 클릭 → 테이블 렌더
3. 이*혁 이름 셀 클릭 → 새 탭 오픈
4. 새 탭에서 다음 순서로 6개 탭 모두 클릭:
   - 요약 정보 → 3개 섹션 확인
   - 상품 종합 진단 → 테이블 2개 확인
   - 상품별 상세 진단 → 상품 정보 + 담보 상세 확인
   - 나이별 보장 진단 → 컬럼 헤더 60/80/100대/종신 확인
   - 상담 이력 및 메모 → 타임라인 + 우측 통계 확인
   - AI 상담 내역 → "준비 중" 확인
5. 상태 드롭다운 3개 옵션 선택해 색상 변화 확인

- [ ] **Step 2: 최종 컴파일 확인**

Run: `npm run lint`
Expected: 에러 없음

- [ ] **Step 3: 회귀 확인 (기존 페이지)**

각 기존 페이지가 깨지지 않는지 확인:
- 홈 대시보드
- 상담 진행 고객
- 상담 종료 고객
- 배정 완료 DB / 미배정 DB
- 운영/관리자 / 설계사
- DB 분배 현황

(빠르게 URL `?page=<name>`으로 순회)

---

## Self-Review

**Spec coverage check:**
- ✅ 2.1 URL 스킴 → Task 7
- ✅ 2.2 App.tsx 변경 → Task 7
- ✅ 2.3 진입점 → Task 13
- ✅ 3. 레이아웃 → Task 7 (Page) + 4 (Header) + 5 (Sidebar)
- ✅ 4. 컴포넌트 구성 → Task 1~12 모두 포함
- ✅ 5.1 CustomerHeader → Task 4
- ✅ 5.2 CustomerSidebar → Task 5
- ✅ 5.3 요약 정보 → Task 8
- ✅ 5.4 상품 종합 진단 → Task 9
- ✅ 5.5 상품별 상세 진단 → Task 10
- ✅ 5.6 나이별 보장 진단 → Task 11
- ✅ 5.7 상담 이력 및 메모 → Task 12
- ✅ 5.8 AI 상담 내역 → Task 6
- ✅ 6. 공통 컴포넌트 → Task 2 (CoverageStatusIcon) + 3 (StatusDropdown)
- ✅ 7. mock 데이터 → Task 1

**Placeholder scan:** 완료. TODO/TBD 없음.

**Type consistency:**
- `CoverageStatus` (mock-data.ts) ↔ CoverageStatusIcon 일치 ✓
- `CustomerStatus` (StatusDropdown.tsx) ↔ CustomerHeader Props 일치 ✓
- `TabKey` / `TAB_ORDER` / `TAB_LABELS` 모두 mock-data.ts에서 export ✓
- `mockCoverageRows.amounts`는 4개 값 → ProductSummaryTab(4개 회사) 및 AgeCoverageTab(4개 나이) 재사용 ✓
