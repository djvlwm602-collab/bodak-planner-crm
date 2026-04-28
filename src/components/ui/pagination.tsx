/**
 * Role: 페이지네이션 — 목록 페이지 하단 공통
 * Key Features: 우측 정렬 · [Page Size] | [범위] | [첫/이전/페이지번호/다음/끝] 구조
 */
import React, { useState } from 'react';
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ChevronDown,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  rowsPerPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rows: number) => void;
  /** true 시 좌측에 Page Size 셀렉터 표시 */
  showPageSize?: boolean;
  pageSizeOptions?: number[];
  className?: string;
}

export function Pagination({
  currentPage = 1,
  totalPages = 10,
  rowsPerPage = 10,
  totalItems = 100,
  onPageChange,
  onRowsPerPageChange,
  showPageSize = false,
  pageSizeOptions = [10, 20, 50],
  className,
}: PaginationProps) {
  const [internalPage, setInternalPage] = useState(currentPage);
  const [internalRpp, setInternalRpp] = useState(rowsPerPage);

  const page = onPageChange ? currentPage : internalPage;
  const rpp  = onRowsPerPageChange ? rowsPerPage : internalRpp;

  const handlePage = (p: number) => {
    onPageChange ? onPageChange(p) : setInternalPage(p);
  };
  const handleRpp = (r: number) => {
    onRowsPerPageChange ? onRowsPerPageChange(r) : setInternalRpp(r);
    handlePage(1);
  };

  // 페이지 번호: 앞 3개 + ... + 마지막 페이지
  const buildPages = (): (number | '...')[] => {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    return [1, 2, 3, '...', totalPages];
  };
  const pages = buildPages();

  const rangeStart = totalItems === 0 ? 0 : (page - 1) * rpp + 1;
  const rangeEnd   = Math.min(page * rpp, totalItems);

  return (
    <div
      className={cn(
        'flex items-center justify-end gap-0 mt-6 text-[13px] text-text-secondary select-none',
        className,
      )}
    >
      {/* ── Page Size ── */}
      {showPageSize && (
        <>
          <div className="flex items-center gap-1.5 pr-4">
            <span className="text-[12px] text-text-disabled whitespace-nowrap">Page Size:</span>
            <div className="relative">
              <select
                value={rpp}
                onChange={(e) => handleRpp(Number(e.target.value))}
                className="appearance-none bg-white border border-border rounded pl-2.5 pr-6 py-[3px] text-[13px] text-text-primary cursor-pointer hover:border-border-subtle transition-colors focus:outline-none focus:border-primary"
              >
                {pageSizeOptions.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <ChevronDown
                size={12}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
              />
            </div>
          </div>
          <span className="text-border-subtle pr-4">|</span>
        </>
      )}

      {/* ── 범위 텍스트 ── */}
      <span className="pr-4 whitespace-nowrap">
        <span className="font-semibold text-text-primary">{rangeStart}</span>
        {' to '}
        <span className="font-normal text-text-secondary">{rangeEnd}</span>
        {' of '}
        <span className="font-normal text-text-secondary">{totalItems}</span>
      </span>

      <span className="text-border-subtle pr-4">|</span>

      {/* ── 네비게이션 ── */}
      <div className="flex items-center gap-0.5">
        {/* 첫 페이지 */}
        <NavBtn
          onClick={() => handlePage(1)}
          disabled={page === 1}
          aria-label="첫 페이지"
        >
          <ChevronsLeft size={14} />
        </NavBtn>

        {/* 이전 */}
        <NavBtn
          onClick={() => handlePage(Math.max(1, page - 1))}
          disabled={page === 1}
          aria-label="이전 페이지"
        >
          <ChevronLeft size={14} />
        </NavBtn>

        {/* 페이지 번호 */}
        {pages.map((item, idx) =>
          item === '...' ? (
            <span key={`ellipsis-${idx}`} className="w-7 h-7 flex items-center justify-center text-text-disabled text-[13px]">
              …
            </span>
          ) : (
            <button
              key={item}
              onClick={() => handlePage(item)}
              className={cn(
                'min-w-[28px] h-7 px-1 flex items-center justify-center rounded text-[13px] transition-colors',
                item === page
                  ? 'bg-bg-selected-subtle text-text-primary font-semibold'
                  : 'text-text-secondary hover:bg-bg',
              )}
            >
              {item}
            </button>
          )
        )}

        {/* 다음 */}
        <NavBtn
          onClick={() => handlePage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          aria-label="다음 페이지"
        >
          <ChevronRight size={14} />
        </NavBtn>

        {/* 끝 페이지 */}
        <NavBtn
          onClick={() => handlePage(totalPages)}
          disabled={page === totalPages}
          aria-label="끝 페이지"
        >
          <ChevronsRight size={14} />
        </NavBtn>
      </div>
    </div>
  );
}

function NavBtn({
  children,
  disabled,
  onClick,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      onClick={onClick}
      disabled={disabled}
      className="w-7 h-7 flex items-center justify-center rounded text-text-secondary hover:bg-bg transition-colors disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}
