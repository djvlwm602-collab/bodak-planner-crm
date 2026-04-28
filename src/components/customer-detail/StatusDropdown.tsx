/**
 * Role: 고객 상태 드롭다운 — 계약예정/상담중/상담종료 3종 선택
 * Key Features: 상태별 subtle 컬러 뱃지, 외부 클릭 시 자동 닫힘
 */
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export type CustomerStatus = '계약예정' | '상담중' | '상담종료';

const STATUS_OPTIONS: CustomerStatus[] = ['계약예정', '상담중', '상담종료'];

// 파란색 채도 단계로 진행감 표현 — 계약예정(연파랑) → 상담중(진파랑 솔리드) → 상담종료(중성 회색)
const statusColors: Record<CustomerStatus, string> = {
  '계약예정': 'bg-primary-subtle text-primary border-primary/30',
  '상담중':   'bg-primary text-white border-primary',
  '상담종료': 'bg-bg-selected-subtle text-text-secondary border-border',
};

interface Props {
  value: CustomerStatus;
  onChange: (next: CustomerStatus) => void;
}

export function StatusDropdown({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        className={cn(
          'inline-flex items-center justify-between gap-2 px-3 py-1 rounded-md text-[13px] font-semibold border min-w-[110px]',
          statusColors[value]
        )}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{value}</span>
        <ChevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-20 bg-surface border border-border rounded-lg shadow-md min-w-[110px] overflow-hidden">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              className={cn(
                'w-full px-3 py-1.5 text-[13px] text-left hover:bg-bg transition-colors',
                opt === value ? 'font-semibold text-text-primary' : 'text-text-secondary'
              )}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
