/**
 * Role: 보닥(default) 브랜드 palette — primary + 명시 hover (Phase 7-B 슬림화)
 * Key Features: primary/primaryHover 명시 hex 보존 (시각 변화 0 원칙)
 * Dependencies: ./types
 * Notes: success/danger/warning 은 시스템 잠금 (tokens.css :root) — 더 이상 brand 가 관여하지 않음.
 *        emphasisPrimary 는 tokens.css :root fallback (#EBF3FF) 그대로 사용 → 별도 명시 불필요.
 */

import type { BrandPalette } from './types';

export const bodakPalette: BrandPalette = {
  primary: '#3182F6',
  primaryHover: '#1B64DA',     // 명시 — color-mix 자동 파생값과 hex 차이 가능, 기존값 보존
  emphasisPrimary: '#EBF3FF',  // 명시 — color-mix(in srgb, #3182F6 12%, white) ≈ #E6F0FE 와 다름, 기존값 보존
};
