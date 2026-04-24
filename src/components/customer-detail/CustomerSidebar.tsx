/**
 * Role: 고객 상세 페이지 좌측 탭 네비게이션 — 6개 탭
 * Key Features: 메인 Sidebar와 동일한 디자인 토큰(bg-primary/10 활성, rounded-md, 14px)
 */
import React from 'react';
import { cn } from '../../lib/utils';
import { TAB_ORDER, TAB_LABELS, type TabKey } from './mock-data';

interface Props {
  activeTab: TabKey;
  onTabChange: (next: TabKey) => void;
}

export function CustomerSidebar({ activeTab, onTabChange }: Props) {
  return (
    <aside className="w-[220px] min-w-[220px] max-w-[220px] border-r border-border bg-white shrink-0 flex flex-col">
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {TAB_ORDER.map((key) => {
            const active = key === activeTab;
            return (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => onTabChange(key)}
                  className={cn(
                    'w-full flex items-center px-3 py-2.5 rounded-md text-sm transition-colors text-left',
                    active
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'font-medium text-text-secondary hover:bg-primary/5 hover:text-primary',
                  )}
                >
                  <span className="truncate">{TAB_LABELS[key]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
