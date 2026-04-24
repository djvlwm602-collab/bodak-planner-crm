/**
 * Role: 상품 종합 진단 탭 — 보험사 비교 테이블 + 담보별 가입금액 테이블
 * Key Features: 공통 토큰(rounded-lg, 13px, bg-bg 헤더) 준수, 담보분류 rowspan 병합
 */
import React from 'react';
import { Button } from '../../ui/button';
import { CoverageStatusIcon } from '../CoverageStatusIcon';
import { mockProductCompanies, mockCoverageRows } from '../mock-data';

export function ProductSummaryTab() {
  // 담보분류 rowspan 계산 — 같은 분류는 첫 행에서만 셀 렌더, 나머지 행은 병합됨
  const categoryRowSpan: Record<string, number> = {};
  mockCoverageRows.forEach((r) => {
    categoryRowSpan[r.category] = (categoryRowSpan[r.category] || 0) + 1;
  });
  const rendered = new Set<string>();

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* 헤더 — 타이틀 옆에 엑셀 버튼 붙임 */}
      <div className="flex items-center gap-3">
        <h2 className="text-[16px] font-semibold text-text-primary">상품 종합 진단</h2>
        <Button size="xs" variant="secondary">엑셀 다운로드</Button>
      </div>

      {/* 상품 정보 테이블 */}
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        <table className="w-full text-[13px]">
          <tbody>
            {[
              { label: '보험회사', values: mockProductCompanies.map((c) => c.company) },
              { label: '상품명', values: mockProductCompanies.map((c) => c.product) },
              { label: '가입일', values: mockProductCompanies.map((c) => c.joinDate) },
              { label: '갱신여부', values: mockProductCompanies.map((c) => c.renewal) },
              { label: '납입기간', values: mockProductCompanies.map((c) => c.paymentPeriod) },
              { label: '보장기간', values: mockProductCompanies.map((c) => c.coveragePeriod) },
              { label: '월납 보험료', values: mockProductCompanies.map((c) => `${c.monthly.toLocaleString()}원`) },
              { label: '기 납입 보험료', values: mockProductCompanies.map((c) => `${c.paid.toLocaleString()}원`) },
              { label: '납입 예정 보험료', values: mockProductCompanies.map((c) => `${c.upcoming.toLocaleString()}원`) },
              { label: '총 납입 보험료', values: mockProductCompanies.map((c) => `${c.total.toLocaleString()}원`) },
            ].map((row, i) => (
              <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFC]'}>
                <th className="w-32 py-2.5 px-3 text-center font-semibold text-text-secondary bg-bg border-r border-gray-100">{row.label}</th>
                {row.values.map((v, idx) => (
                  <td key={idx} className="py-2.5 px-3 text-center font-medium text-text-secondary border-r border-gray-100 last:border-r-0">{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 담보별 가입금액 테이블 */}
      <div>
        <div className="text-right text-[12px] text-text-secondary mb-2">(단위 : 만원)</div>
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-bg">
                <th className="py-2.5 px-3 font-semibold text-text-secondary border-r border-b border-gray-100 w-20">담보분류</th>
                <th className="py-2.5 px-3 font-semibold text-text-secondary border-r border-b border-gray-100 text-left">담보명</th>
                {mockProductCompanies.map((_, i) => (
                  <th key={i} className="py-2.5 px-3 font-semibold text-text-secondary border-r border-b border-gray-100">가입금액</th>
                ))}
                <th className="py-2.5 px-3 font-semibold text-text-secondary border-r border-b border-gray-100">총 가입금액</th>
                <th className="py-2.5 px-3 font-semibold text-text-secondary border-r border-b border-gray-100">권장금액</th>
                <th className="py-2.5 px-3 font-semibold text-text-secondary border-r border-b border-gray-100">40대 평균</th>
                <th className="py-2.5 px-3 font-semibold text-text-secondary border-b border-gray-100">보장상태</th>
              </tr>
            </thead>
            <tbody>
              {mockCoverageRows.map((row, idx) => {
                const showCategory = !rendered.has(row.category);
                if (showCategory) rendered.add(row.category);
                const zebra = idx % 2 === 1 ? 'bg-[#FAFBFC]' : 'bg-white';

                return (
                  <tr key={`${row.category}-${row.name}`} className={zebra}>
                    {showCategory && (
                      <td
                        rowSpan={categoryRowSpan[row.category]}
                        className="py-2.5 px-3 text-center font-semibold text-text-primary border-r border-gray-100 align-middle bg-bg"
                      >
                        {row.category}
                      </td>
                    )}
                    <td className="py-2.5 px-3 font-medium text-text-secondary border-r border-gray-100 text-left">{row.name}</td>
                    {row.amounts.map((a, i) => (
                      <td key={i} className="py-2.5 px-3 text-center font-medium text-text-secondary border-r border-gray-100">{a.toLocaleString()}</td>
                    ))}
                    <td className="py-2.5 px-3 text-center font-medium text-text-secondary border-r border-gray-100">{row.total.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-center font-medium text-text-secondary border-r border-gray-100">{row.recommended.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-center font-medium text-text-secondary border-r border-gray-100">{row.avg40.toLocaleString()}</td>
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
