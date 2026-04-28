/**
 * Role: default(보닥) 브랜드의 페이지 카피 사전
 * Key Features: 사이드바 메뉴 키 → 페이지 타이틀/부제 매핑
 * Dependencies: ./types
 * Notes: Phase 5-D 분리. App.tsx 의 PAGE_META 그대로 옮김.
 *        브랜드별 copy 분기는 향후 src/config/copy/{brandKey}.ko.ts 패턴으로 확장 가능.
 */

import type { PageMeta } from './types';

export const pageMeta: PageMeta = {
  '홈 대시보드':      { title: '홈 대시보드',       subtitle: '조직별 주요 현황을 확인할 수 있습니다.' },
  '상담 진행 고객':   { title: '상담 진행 고객',   subtitle: '배정 된 고객의 상담을 관리할 수 있습니다.' },
  '계약 예정 고객':   { title: '계약 예정 고객',   subtitle: '계약 진행을 약속한 고객을 관리할 수 있습니다.' },
  '상담 종료 고객':   { title: '상담 종료 고객',   subtitle: '상담 거절로 종료된 고객을 관리할 수 있습니다.' },
  '배정 완료 DB':     { title: '배정 완료 DB',     subtitle: '배정된 DB를 다른 설계사에게 재배정 할 수 있습니다.' },
  '미배정 DB':        { title: '미배정 DB',        subtitle: '배정이 되지 않은 DB를 설계사에게 재배정 할 수 있습니다.' },
  'DB 분배 현황':     { title: 'DB 분배 현황',     subtitle: '각 지점별 설계사 또는 권역별 배정된 DB 수량을 확인할 수 있습니다.' },
  'DB 분배 현황 상세':{ title: 'DB 분배 현황',     subtitle: '각 지점별 설계사 또는 권역별 배정된 DB 수량을 확인할 수 있습니다.' },
  '운영/관리자':      { title: '운영/관리자',      subtitle: '서비스를 이용하는 직원을 관리할 수 있습니다.' },
  '설계사':           { title: '설계사',           subtitle: '보험 상담업무를 진행하는 설계사를 관리할 수 있습니다.' },
  '직책·권한 설정':   { title: '직책·권한 설정',   subtitle: '조직을 담당하는 직책 및 메뉴 권한을 부여합니다.' },
  '조직 구조 설정':   { title: '조직 구조 설정',   subtitle: '조직의 구성원 소속과 관리 범위의 기준으로 사용합니다.' },
  '재배정 타입 설정': { title: '재배정 타입 설정', subtitle: '다른 설계사에게 고객 재배정 시, 사유를 설정할 수 있습니다.' },
  '자동 회수 설정':   { title: '자동 회수 설정',   subtitle: '배정 후, 상담 미 시도시 DB를 자동으로 회수할 수 있습니다.' },
  '자동 배정 설정':   { title: '자동 배정 설정',   subtitle: '설계사에게 자동 배정 여부를 설정할 수 있습니다.' },
};
