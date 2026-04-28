/**
 * Role: default 브랜드 — 보닥 플래너 for 흥국화재
 * Key Features: name / partnerName / logoInitial + bodakPalette 중첩
 * Dependencies: ./types, ../palette/bodak
 * Notes: 값은 Phase 5-A 이전과 동일.
 */

import type { Brand } from './types';
import { bodakPalette } from '../palette/bodak';

export const defaultBrand: Brand = {
  key: 'default',
  name: '보닥 플래너',
  partnerName: 'for 흥국화재',
  logoInitial: 'B',
  palette: bodakPalette,
};
