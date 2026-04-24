import React from 'react';

interface TopBarProps {
  onCreateTask: () => void;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function TopBar({ onCreateTask, title, subtitle, actions }: TopBarProps) {
  return (
    <header className="h-14 bg-bg flex items-center justify-between px-6 sticky top-0 z-10 shrink-0">
      {/* 좌측: 페이지 타이틀 */}
      <div className="flex items-baseline gap-3 min-w-0">
        {title && (
          <h1 className="text-[22px] font-semibold text-text-primary tracking-tight shrink-0">{title}</h1>
        )}
        {subtitle && (
          <span className="text-[13px] text-text-secondary truncate">{subtitle}</span>
        )}
      </div>

      {/* 우측 액션 */}
      <div className="flex items-center gap-4 shrink-0">
        {actions && <div className="flex items-center">{actions}</div>}
        <div className="flex items-center gap-2 bg-border rounded-full pl-4 pr-[4px] py-[4px] h-9">
          <span className="font-semibold text-text-secondary text-sm">10:00</span>
          <button className="bg-white hover:bg-surface text-text-primary text-xs font-medium px-3 rounded-full transition-colors h-full">
            연장
          </button>
        </div>

        <button className="w-9 h-9 rounded-full bg-text-primary text-white flex items-center justify-center font-semibold text-xs hover:opacity-80 transition-opacity">
          김
        </button>
      </div>
    </header>
  );
}
