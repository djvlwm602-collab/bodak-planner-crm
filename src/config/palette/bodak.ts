/**
 * Role: 보닥(default) 브랜드 palette — primary/hover/success/danger 핵심값
 * Key Features: brand-free 토큰의 원천. applyBrand() 가 :root 에 주입.
 * Dependencies: ./types
 * Notes: Phase 5-A. 5~ 50~900 풀 팔레트는 Phase 6+ 검토.
 */

import type { BrandPalette } from './types';

export const bodakPalette: BrandPalette = {
  primary: '#3182F6',
  primaryHover: '#1B64DA',
  success: '#00B493',
  danger: '#FF5B5B',
};
