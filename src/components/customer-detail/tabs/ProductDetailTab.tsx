/**
 * Role: 상품별 상세 진단 탭 — 선택된 상품 1개의 정보 + 담보 상세 내역
 * Key Features: 드롭다운 상품 선택, 상품 정보 2열 테이블, 담보 상세 내역 멀티라인
 */
import React from 'react';
import { Button } from '../../ui/button';
import { SelectField } from '../../ui/select-field';
import { mockProductDetail, mockProductDetailCoverages } from '../mock-data';

export function ProductDetailTab() {
  // 담보분류 rowspan 계산
  const rowSpan: Record<string, number> = {};
  mockProductDetailCoverages.forEach((r) => {
    rowSpan[r.category] = (rowSpan[r.category] || 0) + 1;
  });
  const rendered = new Set<string>();

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* 헤더 — 타이틀 옆에 엑셀 버튼 붙임 */}
      <div className="flex items-center gap-3">
        <h2 className="text-[16px] font-semibold text-text-primary">상품별 상세 진단</h2>
        <Button size="xs" variant="secondary">엑셀 다운로드</Button>
      </div>

      {/* 상품 선택 드롭다운 */}
      <div className="max-w-md">
        <SelectField width="w-full">
          <option>상품명이 노출되고 선택할 수 있습니다.</option>
        </SelectField>
      </div>

      {/* 상품 정보 (2열 테이블) */}
      <div className="max-w-[560px] border border-gray-200 rounded-lg overflow-hidden bg-white">
        <table className="w-full text-[13px]">
          <tbody>
            {[
              { label: '보험회사', value: mockProductDetail.company },
              { label: '상품명', value: mockProductDetail.product },
              { label: '가입일', value: mockProductDetail.joinDate },
              { label: '갱신여부', value: mockProductDetail.renewal },
              { label: '납입기간', value: mockProductDetail.paymentPeriod },
              { label: '보장기간', value: mockProductDetail.coveragePeriod },
              { label: '월납 보험료', value: `${mockProductDetail.monthly.toLocaleString()}원` },
              { label: '기 납입 보험료', value: `${mockProductDetail.paid.toLocaleString()}원` },
              { label: '납입 예정 보험료', value: `${mockProductDetail.upcoming.toLocaleString()}원` },
              { label: '총 납입 보험료', value: `${mockProductDetail.total.toLocaleString()}원` },
            ].map((row, i) => (
              <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-row-stripe'}>
                <th className="w-36 py-2.5 px-3 text-center font-semibold text-text-secondary bg-bg border-r border-bg-faint">{row.label}</th>
                <td className="py-2.5 px-3 text-center font-medium text-text-secondary">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 담보 상세 테이블 */}
      <div>
        <div className="text-right text-[12px] text-text-secondary mb-2">(단위 : 만원)</div>
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-bg">
                <th className="py-2.5 px-3 font-semibold text-text-secondary border-r border-b border-bg-faint w-20">담보분류</th>
                <th className="py-2.5 px-3 font-semibold text-text-secondary border-r border-b border-bg-faint w-32 text-left">담보명</th>
                <th className="py-2.5 px-3 font-semibold text-text-secondary border-r border-b border-bg-faint w-24">가입금액</th>
                <th className="py-2.5 px-3 font-semibold text-text-secondary border-b border-bg-faint text-left">보장내역</th>
              </tr>
            </thead>
            <tbody>
              {mockProductDetailCoverages.map((row, idx) => {
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
                    <td className="py-2.5 px-3 font-medium text-text-secondary border-r border-bg-faint align-middle text-left">{row.name}</td>
                    <td className="py-2.5 px-3 text-center font-medium text-text-secondary border-r border-bg-faint align-middle">{row.amount.toLocaleString()}</td>
                    <td className="py-2.5 px-3 font-medium text-text-secondary">
                      <ul className="flex flex-col gap-0.5">
                        {row.details.map((d, i) => (
                          <li key={i} className="text-[13px] leading-relaxed">{d}</li>
                        ))}
                      </ul>
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
