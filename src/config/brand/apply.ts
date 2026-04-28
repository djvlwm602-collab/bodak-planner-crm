/**
 * Role: applyBrand() — Brand 객체를 :root CSS Custom Properties 로 주입
 * Key Features: brand-free 토큰만 갱신, brand-safe 토큰 (text/bg/border 일반) 영향 없음
 * Dependencies: ./types, ./default
 * Notes: Phase 5-B — Tier 2 의미 토큰 (--button-accent-primary, --bg-emphasis-primary,
 *        --accent, --error, --status-success, --warning) 도 함께 주입한다.
 */

import type { Brand } from './types';
import { defaultBrand } from './default';

/** brand-safe warning 기본값 (palette.warning 미지정 시 사용) — § 6.2 amber 톤 */
const DEFAULT_WARNING = '#B45309';

/**
 * 브랜드 설정을 CSS Custom Properties 로 :root 에 주입한다.
 * App.tsx 최상단에서 한 번 호출하면 전체 앱에 반영된다.
 *
 * 갱신 대상 토큰 (모두 brand-free 또는 도메인):
 *   Tier 3 레거시:
 *     --color-primary / -hover / -success / -danger
 *     --brand-primary-hover, --brand-success
 *   Tier 2 의미 토큰 (Phase 5-B 추가):
 *     --button-accent-primary, --button-accent-primary-hover
 *     --bg-emphasis-primary
 *     --accent
 *     --error
 *     --status-success
 *     --warning
 *   data-* 어트리뷰트:
 *     data-brand-key, -name, -partner, -initial
 */
export function applyBrand(brand: Brand = defaultBrand): void {
  const root = document.documentElement;
  const { palette } = brand;
  const accent = palette.accent ?? palette.primary;
  const warning = palette.warning ?? DEFAULT_WARNING;
  const emphasisPrimary = palette.emphasisPrimary;

  /* Tier 3 레거시 (--brand-* / --color-*) — 컴포넌트가 아직 사용하므로 유지 */
  root.style.setProperty('--brand-primary-hover', palette.primaryHover);
  root.style.setProperty('--brand-success', palette.success);
  root.style.setProperty('--color-primary', palette.primary);
  root.style.setProperty('--color-primary-hover', palette.primaryHover);
  root.style.setProperty('--color-success', palette.success);
  root.style.setProperty('--color-danger', palette.danger);

  /* Tier 2 의미 토큰 — § 3.6 / § 3.7 */
  root.style.setProperty('--button-accent-primary', palette.primary);
  root.style.setProperty('--button-accent-primary-hover', palette.primaryHover);
  if (emphasisPrimary) {
    root.style.setProperty('--bg-emphasis-primary', emphasisPrimary);
  }
  root.style.setProperty('--accent', accent);
  root.style.setProperty('--error', palette.danger);
  root.style.setProperty('--status-success', palette.success);
  root.style.setProperty('--warning', warning);

  /* data-* 어트리뷰트 (CSS attribute selector / debugging 용) */
  root.setAttribute('data-brand-key', brand.key ?? 'default');
  root.setAttribute('data-brand-name', brand.name);
  root.setAttribute('data-brand-partner', brand.partnerName);
  root.setAttribute('data-brand-initial', brand.logoInitial);
}
