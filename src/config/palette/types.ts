/**
 * Role: 브랜드별 핵심 컬러 팔레트 인터페이스 (Phase 7-B 슬림화)
 * Key Features: primary 필수, 나머지 옵션. status 컬러는 시스템 잠금 (제거).
 * Notes: Phase 5 의 success/danger/warning 필드 제거 — :root tokens.css 에서 잠금.
 *        primaryHover/emphasisPrimary 미지정 시 applyBrand() 가 color-mix() 로 자동 파생.
 *        신규 customer 는 hex 1개 (primary) 만 제공해도 운영 가능.
 */

export interface BrandPalette {
  /** 필수 — 포인트 컬러 1 (버튼 / 링크 / 활성 항목 / 차트 메인 시리즈) */
  primary: string;
  /** 옵션 — 보조 액센트 (차트 보조 시리즈 / 이중 컬러 영역). 미지정 시 단색 모드. */
  secondary?: string;
  /** 옵션 — primary hover. 미지정 시 color-mix(in srgb, primary 85%, black). */
  primaryHover?: string;
  /** 옵션 — secondary hover. 미지정 시 color-mix(in srgb, secondary 85%, black). */
  secondaryHover?: string;
  /** 옵션 — primary 의 미세 강조 배경. 미지정 시 color-mix(in srgb, primary 12%, white). */
  emphasisPrimary?: string;
}
