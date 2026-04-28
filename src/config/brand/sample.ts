/**
 * Role: sample 브랜드 — 화이트레이블 동작 데모용
 * Key Features: red 톤, 'Sample 플래너 for Sample Co.', logoInitial 'S'
 * Dependencies: ./types, ../palette/sample
 * Notes: Phase 5-C 도입. VITE_BRAND=sample npm run dev 로 활성화.
 *        실제 신규 customer 추가 시 본 파일을 복사 후 값 교체.
 */

import type { Brand } from './types';
import { samplePalette } from '../palette/sample';

export const sampleBrand: Brand = {
  key: 'sample',
  name: 'Sample 플래너',
  partnerName: 'for Sample Co.',
  logoInitial: 'S',
  palette: samplePalette,
};
