/**
 * Role: brand/ 모듈 통합 export
 * Notes: Phase 5-A 분리. App.tsx 의 `from './config/brand'` import 가 본 파일로 해석.
 *        Phase 5-C 에서 getActiveBrand (VITE_BRAND env 분기) 추가 예정.
 */

export type { Brand } from './types';
export { defaultBrand } from './default';
export { applyBrand } from './apply';
