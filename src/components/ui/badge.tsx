/**
 * Role: 상태/태그 표시 뱃지 — Toss TDS badge 기반
 * Key Features:
 *   variant: default/primary/success/danger/warning (색상 의미)
 *   fill: false(weak, 연한 배경+컬러 텍스트) / true(fill, solid 배경+흰 텍스트)
 * Notes: Toss TDS fill=solid, weak=subtle 과 동일한 개념
 */
import React from 'react';
import { cn } from '../../lib/utils';

type BadgeVariant = 'default' | 'primary' | 'teal' | 'green' | 'danger' | 'warning';

interface BadgeProps {
  variant?: BadgeVariant;
  /** true = fill(solid 배경), false = weak(연한 배경) */
  fill?: boolean;
  children: React.ReactNode;
  className?: string;
}

const weakClasses: Record<BadgeVariant, string> = {
  default:  'bg-border text-text-secondary border border-border',
  primary:  'bg-status-info-bg text-status-info',
  teal:     'bg-status-pending-bg text-status-pending',
  green:    'bg-status-done-bg text-status-done',
  danger:   'bg-danger-subtle text-danger border border-danger/20',
  warning:  'bg-warning-subtle text-warning border border-warning/20',
};

const fillClasses: Record<BadgeVariant, string> = {
  default:  'bg-neutral text-white',
  primary:  'bg-primary text-white',
  teal:     'bg-success text-white',
  green:    'bg-green-600 text-white',
  danger:   'bg-danger text-white',
  warning:  'bg-warning text-white',
};

export function Badge({ variant = 'default', fill = false, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-[10px] py-[4px] rounded-xl text-body5 font-medium whitespace-nowrap',
        fill ? fillClasses[variant] : weakClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
