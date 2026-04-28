/**
 * Role: applyBrand() — Brand 객체를 :root CSS Custom Properties 로 주입
 * Key Features: brand-free 토큰만 갱신, brand-safe 토큰 (text/bg/border 일반) 영향 없음
 * Dependencies: ./types, ./default
 * Notes: Phase 5-A 분리. Phase 5-B 에서 Tier 2 의미 토큰 (--button-accent-primary 등) 추가 예정.
 */

import type { Brand } from './types';
import { defaultBrand } from './default';

/**
 * 브랜드 설정을 CSS Custom Properties 로 :root 에 주입한다.
 * App.tsx 최상단에서 한 번 호출하면 전체 앱에 반영된다.
 */
export function applyBrand(brand: Brand = defaultBrand): void {
  const root = document.documentElement;
  const { palette } = brand;

  /* 브랜드 고유 폴백 (--brand-*) */
  root.style.setProperty('--brand-primary-hover', palette.primaryHover);
  root.style.setProperty('--brand-success', palette.success);

  /* 시맨틱 컬러 — Tailwind 유틸리티 토큰 갱신 (--color-*) */
  root.style.setProperty('--color-primary', palette.primary);
  root.style.setProperty('--color-primary-hover', palette.primaryHover);
  root.style.setProperty('--color-success', palette.success);
  root.style.setProperty('--color-danger', palette.danger);

  root.setAttribute('data-brand-name', brand.name);
  root.setAttribute('data-brand-partner', brand.partnerName);
  root.setAttribute('data-brand-initial', brand.logoInitial);
}
