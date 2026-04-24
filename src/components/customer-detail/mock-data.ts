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
  amounts: number[]; // 회사별/나이별 가입금액 (단위 만원)
  total: number;
  recommended: number;
  avg40: number;
  status: CoverageStatus;
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
// amounts 배열(4개)을 60대/80대/100대/종신 컬럼으로 재해석
export const ageColumns = ['60대', '80대', '100대', '종신'] as const;

// ── 상담 이력 탭 ──
export type CallStatus = 'missed' | 'valid' | 'success';

export type TimelineEvent = {
  id: string;
  datetime: string;
  title: string;
  status?: CallStatus;
  duration?: string;
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
