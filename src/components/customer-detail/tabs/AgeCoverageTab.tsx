/**
 * Role: 나이별 보장 진단 탭 — 60대/80대/100대/종신 나이대별 가입금액 비교
 * Key Features: ProductSummaryTab과 구조는 같되 컬럼이 회사 → 나이
 */
import React from 'react';
import { Button } from '../../ui/button';
import { CoverageStatusIcon } from '../CoverageStatusIcon';
import { mockCoverageRows, ageColumns } from '../mock-data';

export function AgeCoverageTab() {
  const rowSpan: Record<string, number> = {};
  mockCoverageRows.forEach((r) => {
    rowSpan[r.category] = (rowSpan[r.category] || 0) + 1;
  });
  const rendered = new Set<string>();

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* 헤더 — 타이틀 옆에 엑셀 버튼 붙임 */}
      <div className="flex items-center gap-3">
        <h2 className="text-[16px] font-semibold text-text-primary">나이별 보장 진단</h2>
        <Button size="xs" variant="secondary">엑셀 다운로드</Button>
      </div>

      <div>
        <div className="text-right text-[12px] text-text-secondary mb-2">(단위 : 만원)</div>
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-bg">
                <th className="py-2.5 px-3 font-semibold text-text-secondary border-r border-b border-bg-faint w-20">담보분류</th>
                <th className="py-2.5 px-3 font-semibold text-text-secondary border-r border-b border-bg-faint text-left">담보명</th>
                {ageColumns.map((age) => (
                  <th key={age} className="py-2.5 px-3 font-semibold text-text-secondary border-r border-b border-bg-faint">{age}</th>
                ))}
                <th className="py-2.5 px-3 font-semibold text-text-secondary border-r border-b border-bg-faint">총 가입금액</th>
                <th className="py-2.5 px-3 font-semibold text-text-secondary border-r border-b border-bg-faint">권장금액</th>
                <th className="py-2.5 px-3 font-semibold text-text-secondary border-r border-b border-bg-faint">40대 평균</th>
                <th className="py-2.5 px-3 font-semibold text-text-secondary border-b border-bg-faint">보장상태</th>
              </tr>
            </thead>
            <tbody>
              {mockCoverageRows.map((row, idx) => {
                const showCategory = !rendered.has(row.category);
                if (showCategory) rendered.add(row.category);
                const zebra = idx % 2 === 1 ? 'bg-row-stripe' : 'bg-white';

                return (
                  <tr key={`${row.category}-${row.name}`} className={zebra}>
                    {showCategory && (
                      <td rowSpan={rowSpan[row.category]} className="py-2.5 px-3 text-center font-semibold text-text-primary border-r border-bg-faint align-middle bg-bg">
                        {row.category}
                      </td>
                    )}
                    <td className="py-2.5 px-3 font-medium text-text-secondary border-r border-bg-faint text-left">{row.name}</td>
                    {row.amounts.map((a, i) => (
                      <td key={i} className="py-2.5 px-3 text-center font-medium text-text-secondary border-r border-bg-faint">{a.toLocaleString()}</td>
                    ))}
                    <td className="py-2.5 px-3 text-center font-medium text-text-secondary border-r border-bg-faint">{row.total.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-center font-medium text-text-secondary border-r border-bg-faint">{row.recommended.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-center font-medium text-text-secondary border-r border-bg-faint">{row.avg40.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-center">
                      <div className="flex justify-center"><CoverageStatusIcon status={row.status} size={16} /></div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
