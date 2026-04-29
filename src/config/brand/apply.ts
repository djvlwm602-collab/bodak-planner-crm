/**
 * Role: applyBrand() — Brand 객체를 :root CSS Custom Properties 로 주입 (Phase 7-B parametric)
 * Key Features: primary/secondary swap + color-mix() 자동 파생 (override 우선) + status 시스템 잠금
 * Dependencies: ./types, ./default
 * Notes: success/danger/warning 은 시스템 잠금 — tokens.css :root 정의값 사용, brand 가 덮어쓰지 않음.
 *        파생 미지정 시 color-mix(in srgb, ...) 로 자동 생성 (srgb 색공간 권장 — 호환성 우선).
 *        secondary 미지정 시 secondary 관련 setProperty 호출 안 함 → tokens.css fallback 그대로.
 */

import type { Brand } from './types';
import { defaultBrand } from './default';

/**
 * 브랜드 설정을 CSS Custom Properties 로 :root 에 주입한다.
 * App.tsx 최상단에서 한 번 호출하면 전체 앱에 반영된다.
 *
 * 갱신 대상 토큰 (primary swap):
 *   --button-accent-primary / -hover
 *   --bg-emphasis-primary
 *   --accent
 *   Tier 3 레거시: --color-primary / -hover, --brand-primary-hover
 *
 * 갱신 대상 토큰 (secondary swap, palette.secondary 지정 시에만):
 *   --button-accent-secondary / -hover
 *   --chart-series-2
 *
 * 시스템 잠금 (brand 가 덮어쓰지 않음 — tokens.css :root 정의 사용):
 *   --error, --warning, --status-success, --status-pending, --status-done, --status-info
 *
 * data-* 어트리뷰트:
 *   data-brand-key, -name, -partner, -initial
 */
export function applyBrand(brand: Brand = defaultBrand): void {
  const root = document.documentElement;
  const { palette } = brand;
  const primary = palette.primary;
  // primaryHover 명시 우선, 미지정 시 color-mix 자동 파생 (primary 85% + black 15%)
  const primaryHover = palette.primaryHover ?? `color-mix(in srgb, ${primary} 85%, black)`;
  // emphasisPrimary 명시 우선, 미지정 시 primary 의 미세 틴트 (primary 12% + white 88%)
  const emphasisPrimary = palette.emphasisPrimary ?? `color-mix(in srgb, ${primary} 12%, white)`;

  /* primary swap */
  root.style.setProperty('--button-accent-primary', primary);
  root.style.setProperty('--button-accent-primary-hover', primaryHover);
  root.style.setProperty('--bg-emphasis-primary', emphasisPrimary);
  root.style.setProperty('--accent', primary);

  /* secondary swap — palette.secondary 지정 시에만 (단색 모드면 tokens.css fallback 유지) */
  if (palette.secondary) {
    const secondary = palette.secondary;
    const secondaryHover = palette.secondaryHover ?? `color-mix(in srgb, ${secondary} 85%, black)`;
    root.style.setProperty('--button-accent-secondary', secondary);
    root.style.setProperty('--button-accent-secondary-hover', secondaryHover);
    root.style.setProperty('--chart-series-2', secondary);  // 차트 보조 시리즈도 secondary 로 덮어씀
  }

  /* Tier 3 레거시 (--brand-* / --color-*) — 컴포넌트가 아직 사용하므로 유지 */
  root.style.setProperty('--brand-primary-hover', primaryHover);
  root.style.setProperty('--color-primary', primary);
  root.style.setProperty('--color-primary-hover', primaryHover);

  /* data-* 어트리뷰트 (CSS attribute selector / debugging 용) */
  root.setAttribute('data-brand-key', brand.key ?? 'default');
  root.setAttribute('data-brand-name', brand.name);
  root.setAttribute('data-brand-partner', brand.partnerName);
  root.setAttribute('data-brand-initial', brand.logoInitial);
}
