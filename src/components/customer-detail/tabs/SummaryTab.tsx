/**
 * Role: 요약 정보 탭 — 보험 진단 유형, 보험 계약 정보, 주요 보장 구성
 * Key Features: 3개 섹션 세로 배치, 공통 토큰(rounded-lg, 13~14px) 준수
 */
import React, { useState } from 'react';
import { CoverageStatusIcon } from '../CoverageStatusIcon';
import {
  mockDiagnosisType,
  mockContractSummary,
  mockCoverageComposition,
} from '../mock-data';
import type { CoverageStatus } from '../mock-data';

type Filter = 'all' | 'same' | 'diff';

const formatKrw = (n: number) => `${n.toLocaleString('ko-KR')}원`;

export function SummaryTab() {
  const [filter, setFilter] = useState<Filter>('all');

  return (
    <div className="p-6 flex flex-col gap-8">
      {/* ① 보험 진단 유형 */}
      <section>
        <h2 className="text-body2 font-semibold text-text-primary mb-3">보험 진단 유형</h2>
        <div className="border border-border rounded-lg bg-surface p-5">
          <h3 className="text-[19px] font-semibold text-text-primary mb-2">{mockDiagnosisType.title}</h3>
          <p className="text-body4 text-text-secondary leading-relaxed whitespace-pre-line">
            {mockDiagnosisType.description}
          </p>
        </div>
      </section>

      {/* ② 보험 계약 정보 */}
      <section>
        <h2 className="text-body2 font-semibold text-text-primary mb-3">보험 계약 정보</h2>

        {/* 라디오 필터 */}
        <div className="flex items-center flex-wrap gap-x-5 gap-y-2 mb-3 text-body4">
          {[
            { v: 'all' as const, label: '전체' },
            { v: 'same' as const, label: '계약자(본인) = 피보험자(본인)' },
            { v: 'diff' as const, label: '계약자(본인) ≠ 피보험자(타인)' },
          ].map((o) => (
            <label key={o.v} className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="contract-filter"
                checked={filter === o.v}
                onChange={() => setFilter(o.v)}
                className="accent-primary"
              />
              <span className="text-text-secondary">{o.label}</span>
            </label>
          ))}
        </div>

        {/* 계약 정보 그리드 */}
        <div className="border border-border rounded-lg bg-surface overflow-hidden">
          <div className="grid grid-cols-2">
            <Cell label="보유 계약" value={`${mockContractSummary.ownedCount}건`} border />
            <Cell label="월 납입 보험료" value={formatKrw(mockContractSummary.monthlyPremium)} />
          </div>
          <div className="grid grid-cols-3 border-t border-border">
            <Cell label="기 납입 보험료" value={formatKrw(mockContractSummary.paidPremium)} border />
            <Cell label="납입 예정 보험료" value={formatKrw(mockContractSummary.upcomingPremium)} border />
            <Cell label="총 납입 보험료" value={formatKrw(mockContractSummary.totalPremium)} />
          </div>
        </div>
      </section>

      {/* ③ 주요 보장 구성 */}
      <section>
        <h2 className="text-body2 font-semibold text-text-primary mb-3">주요 보장 구성</h2>
        <div className="grid grid-cols-4 border border-border rounded-lg bg-surface overflow-hidden">
          {(Object.keys(mockCoverageComposition) as CoverageStatus[]).map((key, idx) => {
            const col = mockCoverageComposition[key];
            return (
              <div
                key={key}
                className={idx < 3 ? 'border-r border-border' : ''}
              >
                <div className="flex items-center gap-2 px-4 py-3 bg-bg border-b border-border">
                  <CoverageStatusIcon status={key} size={16} />
                  <span className="text-body4 font-semibold text-text-primary">
                    {col.title} ({col.count}건)
                  </span>
                </div>
                <ul className="py-2">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 px-4 py-1 text-body4 text-text-secondary">
                      <CoverageStatusIcon status={key} size={12} />
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// ── 하위: 셀 (하나의 계약 정보 셀) ──
function Cell({ label, value, border = false }: { label: string; value: string; border?: boolean }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-1.5 py-6 ${border ? 'border-r border-border' : ''}`}>
      <div className="text-body5 text-text-secondary">{label}</div>
      <div className="text-body1 font-semibold text-text-primary">{value}</div>
    </div>
  );
}
