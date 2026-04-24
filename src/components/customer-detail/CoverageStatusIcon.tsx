/**
 * Role: 보장 상태 아이콘 — 여유/적정/부족/취약 4종
 * Key Features: Tailwind 400 계열 중간톤 배경 + 흰 아이콘 (solid보다 부드럽고 subtle보다 선명)
 */
import React from 'react';
import { Check, Plus, Minus, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { CoverageStatus } from './mock-data';

const config: Record<
  CoverageStatus,
  { bg: string; Icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }> }
> = {
  sufficient:   { bg: 'bg-blue-400',    Icon: Check },  // 여유 ✓
  adequate:     { bg: 'bg-emerald-400', Icon: Plus },   // 적정 +
  insufficient: { bg: 'bg-amber-400',   Icon: Minus },  // 부족 -
  weak:         { bg: 'bg-rose-400',    Icon: X },      // 취약 X
};

interface Props {
  status: CoverageStatus;
  size?: number; // 원형 지름(px)
}

export function CoverageStatusIcon({ status, size = 18 }: Props) {
  const { bg, Icon } = config[status];
  return (
    <span
      className={cn('inline-flex items-center justify-center rounded-full text-white shrink-0', bg)}
      style={{ width: size, height: size }}
    >
      <Icon size={Math.round(size * 0.65)} strokeWidth={2.75} />
    </span>
  );
}
