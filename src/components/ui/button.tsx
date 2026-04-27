/**
 * Role: 재사용 가능한 버튼 — 검색/저장/삭제 등 모든 버튼의 기반
 * Key Features: primary/weak/secondary/ghost/danger variant, xs~lg size, isLoading 상태
 * Notes:
 *   조합 규칙 —
 *     단독 수정 버튼           : variant="secondary"
 *     취소 + 확인 (2버튼)      : ghost(취소) + primary(확인) — 확인이 우측 & 강조
 *     삭제 + 저장 (위험 조합)  : danger(삭제) + secondary(저장)
 *     필터·검색 도구           : variant="weak" — 파랑 계열이지만 fill보다 가벼운 보조 행동
 */
import React from 'react';
import { cn } from '../../lib/utils';

type ButtonVariant = 'primary' | 'weak' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** true이면 3-dot 로딩 표시, 클릭 비활성화, aria-busy 설정 */
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-hover active:bg-primary-hover',
  weak:
    'bg-primary-subtle text-primary hover:bg-primary/10 active:bg-primary/15',
  secondary:
    'bg-neutral text-white hover:bg-neutral-hover active:bg-neutral-hover',
  ghost:
    'bg-transparent text-text-secondary border border-border hover:border-border-subtle',
  danger:
    'bg-danger text-white hover:bg-[#e04f4f] active:bg-[#d44040]',
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'px-3 py-1 text-[12px] rounded',
  sm: 'px-4 py-1.5 text-[13px] rounded',
  md: 'px-5 py-2 text-[14px] rounded-md',
  lg: 'px-10 py-2.5 text-[14px] rounded-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {isLoading ? (
        <span className="flex items-center gap-[5px]" aria-hidden="true">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="w-[5px] h-[5px] rounded-full bg-current"
              style={{ animation: `btn-dot 1.2s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </span>
      ) : children}
    </button>
  );
}
