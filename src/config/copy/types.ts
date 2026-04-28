/**
 * Role: 페이지 카피(타이틀/부제) 인터페이스
 * Key Features: 브랜드별 도메인 용어 분기 진입점
 * Notes: Phase 5-D 도입. 브랜드별 copy 분기는 후속 phase 검토 (현 단계는 분리만).
 */

export interface PageCopy {
  title: string;
  subtitle?: string;
}

export type PageMeta = Record<string, PageCopy>;
