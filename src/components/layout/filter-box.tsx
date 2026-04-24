/**
 * Role: 컴팩트 필터 칩 바 — 가로 한 줄에 칩 형태 필터 나열
 * Key Features: 칩 기반 필터, 검색/초기화 버튼, 줄바꿈 지원
 * Dependencies: cn, lucide-react
 */
import React from 'react';
import { cn } from '../../lib/utils';
import { RotateCw, Search } from 'lucide-react';
import { Button } from '../ui/button';

interface FilterBoxProps {
  children: React.ReactNode;
  onSearch?: () => void;
  onReset?: () => void;
  /** px-6 py-6 래퍼 없이 바로 사용하려면 true */
  noWrapper?: boolean;
  className?: string;
}

export function FilterBox({
  children,
  onSearch,
  onReset,
  noWrapper = false,
  className,
}: FilterBoxProps) {
  const inner = (
    <div
      className={cn(
        'flex items-center gap-2 flex-wrap',
        className,
      )}
    >
      {/* 필터 칩들 */}
      {children}

      {/* 우측 액션 버튼 */}
      {(onSearch || onReset) && (
        <div className="flex items-center gap-1.5 shrink-0">
          {onSearch && (
            <Button variant="primary" size="md" onClick={onSearch} className="gap-1.5">
              <Search size={13} />
              검색
            </Button>
          )}
          {onReset && (
            <button
              onClick={onReset}
              className="p-1.5 text-text-secondary hover:bg-bg rounded transition-colors flex items-center justify-center"
              aria-label="초기화"
            >
              <RotateCw size={15} />
            </button>
          )}
        </div>
      )}
    </div>
  );

  if (noWrapper) return inner;

  return <div className="px-6 py-6">{inner}</div>;
}

/** FilterBox 내부 1개 행 — 하위 호환용 (칩 바에서는 직접 칩 배치 권장) */
export function FilterRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-2 flex-wrap', className)}>
      {children}
    </div>
  );
}
