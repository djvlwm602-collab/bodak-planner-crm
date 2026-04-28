/**
 * Role: 시각 회귀 기준점(스크린샷)을 위한 22개 페이지 정의
 * Key Features: PAGE_META 14개 + DB 분배 현황 상세 1개 + customer-detail 7개 (베이스 + 6 탭)
 * Dependencies: 없음 (capture/diff 스크립트가 import)
 * Notes: slug 는 파일명. action 이 'click-distribution-detail' 인 항목은 클릭 네비게이션 필요.
 */

// PAGE_META 페이지 — URL 진입 가능한 14개
// (DB 분배 현황 상세는 PAGE_META에 있지만 distributionDetailParams 필요해서 클릭으로 분리)
const pageMetaSlugs = [
  { slug: '01-home-dashboard',          page: '홈 대시보드' },
  { slug: '02-consult-active',          page: '상담 진행 고객' },
  { slug: '03-contract-expected',       page: '계약 예정 고객' },
  { slug: '04-consult-ended',           page: '상담 종료 고객' },
  { slug: '05-assigned-db',             page: '배정 완료 DB' },
  { slug: '06-unassigned-db',           page: '미배정 DB' },
  { slug: '07-db-distribution',         page: 'DB 분배 현황' },
  { slug: '08-admin-management',        page: '운영/관리자' },
  { slug: '09-planner-management',      page: '설계사' },
  { slug: '10-role-permission',         page: '직책·권한 설정' },
  { slug: '11-org-structure',           page: '조직 구조 설정' },
  { slug: '12-reassign-type',           page: '재배정 타입 설정' },
  { slug: '13-auto-retrieve',           page: '자동 회수 설정' },
  { slug: '14-auto-assign',             page: '자동 배정 설정' },
];

// customer-detail — 탭 6개 (베이스는 summary 탭으로 폴백되어 byte-identical → 제외)
const customerDetailSlugs = [
  { slug: '15-customer-detail-summary',         page: 'customer-detail', tab: 'summary' },
  { slug: '16-customer-detail-product-summary', page: 'customer-detail', tab: 'product-summary' },
  { slug: '17-customer-detail-product-detail',  page: 'customer-detail', tab: 'product-detail' },
  { slug: '18-customer-detail-age-coverage',    page: 'customer-detail', tab: 'age-coverage' },
  { slug: '19-customer-detail-consultation',    page: 'customer-detail', tab: 'consultation' },
  { slug: '20-customer-detail-ai-consult',      page: 'customer-detail', tab: 'ai-consult' },
];

// 클릭 네비게이션 필요 — DB 분배 현황 상세
const clickNavSlugs = [
  {
    slug: '21-db-distribution-detail',
    page: 'DB 분배 현황',
    action: 'click-distribution-detail',
  },
];

export const PAGES = [
  ...pageMetaSlugs.map(p => ({ ...p, kind: 'url' })),
  ...customerDetailSlugs.map(p => ({ ...p, kind: 'url-with-tab' })),
  ...clickNavSlugs.map(p => ({ ...p, kind: 'click' })),
];

export const VIEWPORT = { width: 1280, height: 900 };
export const BASE_URL = 'http://localhost:3000';
