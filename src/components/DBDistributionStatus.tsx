import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown } from 'lucide-react';

interface DBDistributionStatusProps {
  onNavigateToDetail: (period: string, status: string) => void;
}

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
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 flex items-center shrink-0">
        <h1 className="text-[19px] font-bold text-gray-900 tracking-tight mr-4">DB 분배 현황</h1>
        <span className="text-sm text-gray-500">각 지점별 설계사 또는 권역별 배정된 DB 수량을 확인할 수 있습니다.</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Table Header Controls */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-700">총 10개</div>
            <div className="relative">
              <select className="appearance-none border border-gray-300 rounded-sm pl-3 pr-8 py-1.5 text-sm focus:outline-none focus:border-gray-900 bg-white">
                <option>10개</option>
                <option>20개</option>
                <option>50개</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
            </div>
          </div>

          {/* Table */}
          <div className="border border-gray-300 bg-white">
            <table className="w-full text-sm text-center table-fixed">
              <thead className="bg-gray-50 border-b border-gray-300">
                <tr>
                  <th className="py-4 font-bold text-gray-900 w-20">No.</th>
                  <th className="py-4 font-bold text-gray-900" style={{ width: 'calc((100% - 13rem) * 3 / 9)' }}>기간</th>
                  <th className="py-4 font-bold text-gray-900" style={{ width: 'calc((100% - 13rem) * 2 / 9)' }}>계약 공급 수량</th>
                  <th className="py-4 font-bold text-gray-900" style={{ width: 'calc((100% - 13rem) * 2 / 9)' }}>실 공급 수량</th>
                  <th className="py-4 font-bold text-gray-900" style={{ width: 'calc((100% - 13rem) * 2 / 9)' }}>철회 수량</th>
                  <th className="py-4 font-bold text-gray-900 w-32">상태</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} className="border-b border-gray-200 last:border-0 hover:bg-gray-50">
                    <td className="py-4 text-gray-700">{row.no}</td>
                    <td className="py-4">
                      <button 
                        className="text-blue-600 hover:underline"
                        onClick={() => onNavigateToDetail(row.period, row.status)}
                      >
                        {row.period}
                      </button>
                    </td>
                    <td className="py-4 text-gray-700">{row.contractSupply}</td>
                    <td className="py-4 text-gray-700">{row.actualSupply}</td>
                    <td className="py-4 text-gray-700">{row.withdrawal}</td>
                    <td className="py-4 text-gray-700">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <button className="p-1 text-gray-400 hover:text-gray-900"><ChevronsLeft size={16} /></button>
            <button className="p-1 text-gray-400 hover:text-gray-900"><ChevronLeft size={16} /></button>
            <div className="flex gap-1 mx-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
                <button 
                  key={page} 
                  className={`w-8 h-8 flex items-center justify-center text-sm ${page === 1 ? 'text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-900"><ChevronRight size={16} /></button>
            <button className="p-1 text-gray-400 hover:text-gray-900"><ChevronsRight size={16} /></button>
          </div>

        </div>
      </div>
    </div>
  );
}
