/**
 * Role: sample 브랜드 palette — 화이트레이블 데모용 (red 톤)
 * Key Features: default(파랑)와 명확히 구분되는 색조로 브랜드 전환 가시성 확보
 * Dependencies: ./types
 * Notes: Phase 5-C 도입. 실제 신규 브랜드 추가 시 본 파일을 복사 후 값 교체.
 */

import type { BrandPalette } from './types';

export const samplePalette: BrandPalette = {
  primary: '#E53935',         // red — default(파랑) 와 명확히 구분
  primaryHover: '#C62828',
  emphasisPrimary: '#FFEBEE', // red weak tint
  success: '#00B493',         // 의미 컬러 공통 권장
  danger: '#FF5B5B',
};
