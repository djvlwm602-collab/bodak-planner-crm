/**
 * Role: 화이트레이블 Brand 인터페이스
 * Key Features: 식별 / 시각 / palette / 운영 메타
 * Dependencies: ../palette/types
 * Notes: Phase 5-A 분리. Phase 5-C 에서 logoUrl/faviconUrl/termsUrl 등 확장 예정.
 */

import type { BrandPalette } from '../palette/types';

export interface Brand {
  /** 브랜드 식별자 — VITE_BRAND env 와 매칭 (Phase 5-C 정식 도입). 미지정 시 'default' */
  key?: string;
  /** 서비스 이름 (사이드바 상단 표시) */
  name: string;
  /** 보험사/제휴사 이름 (부제목) */
  partnerName: string;
  /** 로고 이니셜 (1자) */
  logoInitial: string;
  /** 브랜드 핵심 컬러 */
  palette: BrandPalette;
}
