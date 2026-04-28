/**
 * Role: brand/ 모듈 통합 export + 활성 브랜드 선택
 * Key Features: VITE_BRAND env 로 브랜드 분기, 미지정 시 default 폴백
 * Dependencies: ./types, ./default, ./sample, ./apply
 * Notes: Phase 5-C 에서 getActiveBrand 추가. hostname 라우팅은 후속 phase 검토.
 */

import type { Brand } from './types';
import { defaultBrand } from './default';
import { sampleBrand } from './sample';

export type { Brand } from './types';
export { defaultBrand } from './default';
export { sampleBrand } from './sample';
export { applyBrand } from './apply';

/** 등록된 브랜드 레지스트리 — 신규 브랜드는 본 객체에 추가한다 */
const brands: Record<string, Brand> = {
  default: defaultBrand,
  sample: sampleBrand,
};

/**
 * 빌드 시점 VITE_BRAND env 로 활성 브랜드를 선택한다.
 * 미지정 또는 알 수 없는 키 → default 폴백 (production safe).
 */
export function getActiveBrand(): Brand {
  const key = (import.meta.env.VITE_BRAND as string | undefined) ?? 'default';
  return brands[key] ?? defaultBrand;
}
