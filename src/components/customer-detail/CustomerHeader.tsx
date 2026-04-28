/**
 * Role: 고객 상세 페이지 상단 고정 헤더 — 이름/태그/정보/설계사/상태
 * Key Features: 기존 TopBar와 동일 타이포 스케일(17px 타이틀, 13px 부가정보)
 */
import React from 'react';
import { StatusDropdown, type CustomerStatus } from './StatusDropdown';
import { mockCustomer } from './mock-data';
import { Badge } from '../ui/badge';

const tagVariant = (tag: string): 'primary' | 'teal' | 'default' => {
  if (tag === '종합진단')   return 'primary';
  if (tag === '보험료점검') return 'teal';
  return 'default';
};

interface Props {
  status: CustomerStatus;
  onStatusChange: (next: CustomerStatus) => void;
}

export function CustomerHeader({ status, onStatusChange }: Props) {
  return (
    <header className="w-full border-b border-border bg-surface px-6 py-4 shrink-0">
      <div className="flex items-start justify-between gap-4">
        {/* 좌측 — 이름/태그 + 상세 정보 */}
        <div className="flex flex-col gap-1.5 min-w-0">
          <div className="flex items-center gap-2.5">
            <h1 className="text-body1 font-semibold text-text-primary tracking-tight">
              {mockCustomer.name} ({mockCustomer.age}세 / {mockCustomer.gender} / {mockCustomer.location})
            </h1>
            <Badge variant={tagVariant(mockCustomer.tag)} className="text-body5 px-[8px] py-[6px] rounded-md border-0 leading-none">
              {mockCustomer.tag}
            </Badge>
          </div>
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-body4 text-text-secondary">
            <span>{mockCustomer.phone}</span>
            <span className="text-border-subtle">|</span>
            <span>{mockCustomer.riskType}</span>
            <span className="text-border-subtle">|</span>
            <span>결혼 {mockCustomer.marriage}</span>
            <span className="text-border-subtle">|</span>
            <span>운전 {mockCustomer.driving}</span>
            <span className="text-border-subtle">|</span>
            <span>자녀 {mockCustomer.children}</span>
            <span className="text-border-subtle">|</span>
            <span>상령일: {mockCustomer.birthday}</span>
          </div>
        </div>

        {/* 우측 — 설계사 + 상태 */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="text-body4 text-text-secondary">
            설계사 <span className="font-semibold text-text-primary ml-1">{mockCustomer.planner}</span>
          </div>
          <StatusDropdown value={status} onChange={onStatusChange} />
        </div>
      </div>
    </header>
  );
}
