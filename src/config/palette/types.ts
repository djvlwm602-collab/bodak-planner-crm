/**
 * Role: 브랜드별 핵심 컬러 팔레트 인터페이스
 * Key Features: brand-free 토큰의 원천 hex 정의
 * Notes: Phase 5-A 도입. 50~900 풀 팔레트는 Phase 6+ 에서 확장 검토.
 */

export interface BrandPalette {
  /** 포인트 컬러 1 — 버튼, 링크, 활성 항목 */
  primary: string;
  /** 포인트 컬러 1 hover 상태 */
  primaryHover: string;
  /** primary 의 미세 강조 배경 (활성 행 / 약한 CTA) */
  emphasisPrimary?: string;
  /** 액센트 (default = primary) */
  accent?: string;
  /** 도메인 success 컬러 */
  success: string;
  /** 도메인 danger 컬러 */
  danger: string;
  /** warning 컬러 (default = brand-safe amber #B45309) */
  warning?: string;
}
