import React, { useState } from 'react';
import { Search, RotateCw, ChevronDown, ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface Customer {
  no: number;
  name: string;
  gender: string;
  birthDate: string;
  age: number;
  phone: string;
  location: string;
  reason: string;
  endedDate: string;
}

const mockData: Customer[] = Array.from({ length: 10 }).map((_, i) => ({
  no: 10 - i,
  name: '이*혁',
  gender: '남성',
  birthDate: '1981.11.27',
  age: 40,
  phone: '0507-1111-1111',
  location: '서울특별시',
  reason: i % 2 === 0 ? '상담 거절' : '계약 완료',
  endedDate: '2026.01.01 00:00',
}));

export function ConsultationEnded() {
  const [selectedAgent, setSelectedAgent] = useState('홍길동');
  const [customerName, setCustomerName] = useState('');
  const [selectedReason, setSelectedReason] = useState('전체');

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between shrink-0">
        <div className="flex items-end gap-4">
          <h1 className="text-[19px] font-bold text-gray-900 tracking-tight">상담 종료 고객</h1>
          <span className="text-sm text-gray-500 mb-0.5">상담 거절로 종료된 고객을 관리할 수 있습니다.</span>
        </div>
        <div className="h-[42px]"></div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar (Tree) */}
        <div className="w-[180px] border-r border-gray-200 flex flex-col bg-gray-50/50 shrink-0 overflow-y-auto">
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-800">문정 사업단</h2>
          </div>
          <div className="p-2">
            <TreeItem label="A 지점" defaultExpanded>
              <TreeItem label="A 팀" />
              <TreeItem label="B 팀" active />
              <TreeItem label="C 팀" />
            </TreeItem>
            <TreeItem label="B 지점" defaultExpanded>
              <TreeItem label="1 팀" />
              <TreeItem label="2 팀" />
            </TreeItem>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          {/* Search Bar */}
          <div className="px-6 py-6">
            <div className="border border-gray-300 p-4 flex items-center gap-8 bg-white">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-900">담당설계사</span>
                <div className="relative w-48">
                  <select 
                    className="w-full appearance-none border border-gray-300 text-gray-900 text-sm rounded-sm pl-3 pr-8 py-1.5 focus:outline-none focus:border-gray-900 bg-white"
                    value={selectedAgent}
                    onChange={(e) => setSelectedAgent(e.target.value)}
                  >
                    <option value="전체">전체</option>
                    <option value="홍길동">홍길동</option>
                    <option value="김철수">김철수</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-900">고객명</span>
                <input 
                  type="text" 
                  className="w-48 px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-900"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-900">사유</span>
                <div className="relative w-48">
                  <select 
                    className="w-full appearance-none border border-gray-300 text-gray-900 text-sm rounded-sm pl-3 pr-8 py-1.5 focus:outline-none focus:border-gray-900 bg-white"
                    value={selectedReason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                  >
                    <option value="전체">전체</option>
                    <option value="상담 거절">상담 거절</option>
                    <option value="계약 완료">계약 완료</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <button className="bg-blue-600 text-white px-8 py-1.5 rounded-sm text-sm font-medium hover:bg-blue-700 transition-colors">
                  검색
                </button>
                <button 
                  className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-sm transition-colors flex items-center justify-center border border-gray-300"
                  onClick={() => {
                    setCustomerName('');
                    setSelectedAgent('전체');
                    setSelectedReason('전체');
                  }}
                >
                  <RotateCw size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Table Area */}
          <div className="flex flex-col flex-1 min-h-0 px-6 pb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-900">
                총 <span className="font-bold">10</span>개
              </div>
              <div className="relative w-24">
                <select className="w-full appearance-none border border-gray-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-gray-900 bg-white">
                  <option value="10">10개</option>
                  <option value="20">20개</option>
                  <option value="50">50개</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="flex-1 overflow-auto border-t border-gray-300">
              <table className="w-full text-sm text-center">
                <thead className="bg-gray-50 sticky top-0 z-10 border-b border-gray-300">
                  <tr>
                    <th className="py-3.5 px-4 font-bold text-gray-900 w-16">No.</th>
                    <th className="py-3.5 px-4 font-bold text-gray-900 w-24">이름</th>
                    <th className="py-3.5 px-4 font-bold text-gray-900 w-20">성별</th>
                    <th className="py-3.5 px-4 font-bold text-gray-900 w-40">생년월일</th>
                    <th className="py-3.5 px-4 font-bold text-gray-900 w-40">연락처</th>
                    <th className="py-3.5 px-4 font-bold text-gray-900 min-w-[120px]">지역</th>
                    <th className="py-3.5 px-4 font-bold text-gray-900 w-32">사유</th>
                    <th className="py-3.5 px-4 font-bold text-gray-900 w-48">상담 종료 상태 전환일</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockData.map((row) => (
                    <tr key={row.no} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-gray-700">{row.no}</td>
                      <td className="py-4 px-4 text-blue-600 hover:underline cursor-pointer">{row.name}</td>
                      <td className="py-4 px-4 text-gray-700">{row.gender}</td>
                      <td className="py-4 px-4 text-gray-700">{row.birthDate} ({row.age}세)</td>
                      <td className="py-4 px-4 text-gray-700">{row.phone}</td>
                      <td className="py-4 px-4 text-gray-700">{row.location}</td>
                      <td className="py-4 px-4 text-gray-700">{row.reason}</td>
                      <td className="py-4 px-4 text-gray-700">{row.endedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <button className="p-1 text-gray-400 hover:text-gray-600"><ChevronsLeft size={16} /></button>
              <button className="p-1 text-gray-400 hover:text-gray-600 mr-2"><ChevronLeft size={16} /></button>
              
              <button className="w-8 h-8 flex items-center justify-center rounded-sm text-gray-900 text-sm font-bold">1</button>
              {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <button key={num} className="w-8 h-8 flex items-center justify-center rounded-sm text-gray-400 hover:text-gray-900 text-sm font-medium transition-colors">
                  {num}
                </button>
              ))}
              
              <button className="p-1 text-gray-400 hover:text-gray-600 ml-2"><ChevronRight size={16} /></button>
              <button className="p-1 text-gray-400 hover:text-gray-600"><ChevronsRight size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TreeItem({ label, children, defaultExpanded = false, active = false }: { label: string; children?: React.ReactNode; defaultExpanded?: boolean; active?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const hasChildren = React.Children.count(children) > 0;

  return (
    <div className="flex flex-col">
      <div 
        className={cn(
          "flex items-center gap-1.5 py-1.5 px-2 cursor-pointer rounded-sm text-sm transition-colors",
          active ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-100"
        )}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        <div className="w-4 h-4 flex items-center justify-center shrink-0">
          {hasChildren ? (
            isExpanded ? <ChevronDown size={14} className="text-gray-500" /> : <ChevronRight size={14} className="text-gray-500" />
          ) : null}
        </div>
        <span className="truncate">{label}</span>
      </div>
      {hasChildren && isExpanded && (
        <div className="ml-4 flex flex-col mt-0.5">
          {children}
        </div>
      )}
    </div>
  );
}
