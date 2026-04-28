import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Pagination } from './ui/pagination';

interface DBDistributionStatusProps {
  onNavigateToDetail: (period: string, status: string) => void;
}

import { Footer } from './Footer';

export function DBDistributionStatus({ onNavigateToDetail }: DBDistributionStatusProps) {
  const data = [
    { no: 10, period: '2026.01.01~2026.01.31', contractSupply: '1,100건', actualSupply: '1,100건', withdrawal: '1,100건', status: '진행 예정' },
    { no: 9, period: '2026.01.01~2026.01.31', contractSupply: '1,100건', actualSupply: '1,100건', withdrawal: '-', status: '진행중' },
    { no: 8, period: '2026.01.01~2026.01.31', contractSupply: '1,100건', actualSupply: '1,100건', withdrawal: '-', status: '종료' },
    { no: 7, period: '2026.01.01~2026.01.31', contractSupply: '1,100건', actualSupply: '1,100건', withdrawal: '-', status: '종료' },
    { no: 6, period: '2026.01.01~2026.01.31', contractSupply: '1,100건', actualSupply: '1,100건', withdrawal: '50건', status: '종료' },
    { no: 5, period: '2026.01.01~2026.01.31', contractSupply: '1,100건', actualSupply: '1,100건', withdrawal: '-', status: '종료' },
    { no: 4, period: '2026.01.01~2026.01.31', contractSupply: '1,100건', actualSupply: '1,100건', withdrawal: '-', status: '종료' },
    { no: 3, period: '2026.01.01~2026.01.31', contractSupply: '1,100건', actualSupply: '1,100건', withdrawal: '-', status: '종료' },
    { no: 2, period: '2026.01.01~2026.01.31', contractSupply: '1,100건', actualSupply: '1,100건', withdrawal: '-', status: '종료' },
    { no: 1, period: '2026.01.01~2026.01.31', contractSupply: '1,100건', actualSupply: '1,100건', withdrawal: '-', status: '종료' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-bg overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-full flex flex-col pb-5">
        <div className="px-[30px] pt-8">
        <div>
          
          {/* Table Header Controls */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-body3 font-medium text-text-primary">총 <span className="font-semibold">10</span>개</div>
          </div>

          {/* Table */}
          <div className="border border-border-primary rounded-lg overflow-hidden bg-white">
            <table className="w-full text-body3 text-center table-fixed">
              <thead className="sticky top-0 z-10 [&>tr>th]:border-b [&>tr>th]:border-bg-faint">
                <tr>
                  <th className="py-3.5 px-3 font-semibold text-text-primary text-body4 bg-white w-20">No.</th>
                  <th className="py-3.5 px-3 font-semibold text-text-primary text-body4 bg-white" style={{ width: 'calc((100% - 13rem) * 3 / 9)' }}>기간</th>
                  <th className="py-3.5 px-3 font-semibold text-text-primary text-body4 bg-white" style={{ width: 'calc((100% - 13rem) * 2 / 9)' }}>계약 공급 수량</th>
                  <th className="py-3.5 px-3 font-semibold text-text-primary text-body4 bg-white" style={{ width: 'calc((100% - 13rem) * 2 / 9)' }}>실 공급 수량</th>
                  <th className="py-3.5 px-3 font-semibold text-text-primary text-body4 bg-white" style={{ width: 'calc((100% - 13rem) * 2 / 9)' }}>철회 수량</th>
                  <th className="py-3.5 px-3 font-semibold text-text-primary text-body4 bg-white w-32">상태</th>
                </tr>
              </thead>
              <tbody className="[&>tr:nth-child(odd)]:bg-row-stripe">
                {data.map((row, index) => (
                  <tr key={index} className="hover:!bg-row-hover transition-colors">
                    <td className="py-3.5 px-3 text-text-primary">{row.no}</td>
                    <td className="py-3.5 px-3">
                      <button
                        className="text-primary hover:underline"
                        onClick={() => onNavigateToDetail(row.period, row.status)}
                      >
                        {row.period}
                      </button>
                    </td>
                    <td className="py-3.5 px-3 text-text-primary">{row.contractSupply}</td>
                    <td className="py-3.5 px-3 text-text-primary">{row.actualSupply}</td>
                    <td className="py-3.5 px-3 text-text-primary">{row.withdrawal}</td>
                    <td className="py-3.5 px-3 text-text-primary">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination showPageSize totalItems={100} totalPages={10} rowsPerPage={10} />

        </div>
        </div>
        <div className="flex-1 min-h-[50px]" />
        <Footer />
        </div>
      </div>
    </div>
  );
}
