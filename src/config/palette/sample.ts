/**
 * Role: sample 브랜드 palette — 화이트레이블 데모용 (red + amber 보색 조합, Phase 7-B)
 * Key Features: primary(red) + secondary(amber) 이중 액센트로 secondary swap 동작 데모
 * Dependencies: ./types
 * Notes: secondaryHover 는 미지정 → applyBrand() 가 color-mix(in srgb, ${secondary} 85%, black) 로 자동 파생.
 *        실제 신규 customer 는 본 파일을 복사 후 primary 1개만 두어도 운영 가능.
 */

import type { BrandPalette } from './types';

export const samplePalette: BrandPalette = {
  primary: '#E53935',          // red — default(파랑) 와 명확히 구분
  primaryHover: '#C62828',     // 명시 — 기존값 보존
  // emphasisPrimary 미지정 → color-mix(in srgb, #E53935 12%, white) ≈ #FCE7E7 자동 파생
  // (color-mix 파생 경로의 활성 테스트 케이스)
  secondary: '#FFA726',        // amber — secondary swap 데모용 보색 액센트
  // secondaryHover 미지정 → color-mix 자동 파생
};
