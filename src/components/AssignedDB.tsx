import React, { useState } from 'react';
import { Search, RotateCw, ChevronDown, ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface Customer {
  id: string;
  no: number;
  name: string;
  gender: string;
  birthDate: string;
  age: number;
  phone: string;
  location: string;
  assignedDate: string;
  firstCallDate: string;
  recentCallDate: string;
  callAttempts: string;
  callSuccess: string;
  validCall: string;
  agentName: string;
}

const mockData: Customer[] = [
  { id: '10', no: 10, name: '이*혁', gender: '남성', birthDate: '1981.11.27', age: 40, phone: '0507-1111-1111', location: '서울특별시', assignedDate: '2026.01.01 00:00', firstCallDate: '2026.01.01 00:00', recentCallDate: '2026.01.01 00:00', callAttempts: '10회', callSuccess: '10회', validCall: '-', agentName: '김홍도' },
  { id: '9', no: 9, name: '이*혁', gender: '남성', birthDate: '1981.11.27', age: 40, phone: '0507-1111-1111', location: '서울특별시', assignedDate: '2026.01.01 00:00', firstCallDate: '-', recentCallDate: '-', callAttempts: '-', callSuccess: '-', validCall: '-', agentName: '김홍도' },
  { id: '8', no: 8, name: '이*혁', gender: '남성', birthDate: '1981.11.27', age: 40, phone: '0507-1111-1111', location: '서울특별시', assignedDate: '2026.01.01 00:00', firstCallDate: '2026.01.01 00:00', recentCallDate: '2026.01.01 00:00', callAttempts: '10회', callSuccess: '10회', validCall: '10회', agentName: '김홍도' },
  { id: '7', no: 7, name: '이*혁', gender: '남성', birthDate: '1981.11.27', age: 40, phone: '0507-1111-1111', location: '서울특별시', assignedDate: '2026.01.01 00:00', firstCallDate: '-', recentCallDate: '-', callAttempts: '-', callSuccess: '-', validCall: '-', agentName: '김홍도' },
  { id: '6', no: 6, name: '이*혁', gender: '남성', birthDate: '1981.11.27', age: 40, phone: '0507-1111-1111', location: '서울특별시', assignedDate: '2026.01.01 00:00', firstCallDate: '2026.01.01 00:00', recentCallDate: '2026.01.01 00:00', callAttempts: '10회', callSuccess: '10회', validCall: '-', agentName: '김홍도' },
  { id: '5', no: 5, name: '이*혁', gender: '남성', birthDate: '1981.11.27', age: 40, phone: '0507-1111-1111', location: '서울특별시', assignedDate: '2026.01.01 00:00', firstCallDate: '2026.01.01 00:00', recentCallDate: '2026.01.01 00:00', callAttempts: '10회', callSuccess: '10회', validCall: '-', agentName: '김홍도' },
  { id: '4', no: 4, name: '이*혁', gender: '남성', birthDate: '1981.11.27', age: 40, phone: '0507-1111-1111', location: '서울특별시', assignedDate: '2026.01.01 00:00', firstCallDate: '2026.01.01 00:00', recentCallDate: '2026.01.01 00:00', callAttempts: '10회', callSuccess: '10회', validCall: '10회', agentName: '김홍도' },
  { id: '3', no: 3, name: '이*혁', gender: '남성', birthDate: '1981.11.27', age: 40, phone: '0507-1111-1111', location: '서울특별시', assignedDate: '2026.01.01 00:00', firstCallDate: '-', recentCallDate: '-', callAttempts: '-', callSuccess: '-', validCall: '-', agentName: '김홍도' },
  { id: '2', no: 2, name: '이*혁', gender: '남성', birthDate: '1981.11.27', age: 40, phone: '0507-1111-1111', location: '서울특별시', assignedDate: '2026.01.01 00:00', firstCallDate: '2026.01.01 00:00', recentCallDate: '2026.01.01 00:00', callAttempts: '10회', callSuccess: '10회', validCall: '10회', agentName: '김홍도' },
  { id: '1', no: 1, name: '이*혁', gender: '남성', birthDate: '1981.11.27', age: 40, phone: '0507-1111-1111', location: '서울특별시', assignedDate: '2026.01.01 00:00', firstCallDate: '2026.01.01 00:00', recentCallDate: '2026.01.01 00:00', callAttempts: '10회', callSuccess: '10회', validCall: '10회', agentName: '김홍도' },
];

const regions = ['전체', '서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', '세종', '강원', '충북', '충남', '전남', '전북', '경북', '경남', '제주'];

import { Footer } from './Footer';

export function AssignedDB() {
  const [selectedAgent, setSelectedAgent] = useState('홍길동');
  const [customerName, setCustomerName] = useState('');
  const [noValidCall, setNoValidCall] = useState(false);
  const [noCallAttempt, setNoCallAttempt] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['전체']);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const toggleRegion = (region: string) => {
    if (region === '전체') {
      setSelectedRegions(['전체']);
    } else {
      setSelectedRegions(prev => {
        const newRegions = prev.includes(region) 
          ? prev.filter(r => r !== region)
          : [...prev.filter(r => r !== '전체'), region];
        return newRegions.length === 0 ? ['전체'] : newRegions;
      });
    }
  };

  const toggleRow = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(mockData.map(d => d.id));
    }
    setSelectAll(!selectAll);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 flex items-center shrink-0">
        <h1 className="text-[19px] font-bold text-gray-900 tracking-tight mr-4">배정 완료 DB</h1>
        <span className="text-sm text-gray-500">배정된 DB를 다른 설계사에게 재배정 할 수 있습니다.</span>
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
        <div className="flex-1 flex flex-col overflow-y-auto bg-white">
          {/* Search Bar */}
          <div className="px-6 py-6">
            <div className="border border-gray-300 p-5 flex flex-col gap-4 bg-white">
              {/* Row 1 */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-900">담당설계사</span>
                  <div className="relative w-48">
                    <select 
                      className="w-full appearance-none border border-gray-300 text-gray-900 text-sm rounded-sm pl-3 pr-8 py-1.5 focus:outline-none focus:border-gray-900 bg-white"
                      value={selectedAgent}
                      onChange={(e) => setSelectedAgent(e.target.value)}
                    >
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

                <div className="flex items-center gap-6 ml-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={noValidCall}
                      onChange={(e) => setNoValidCall(e.target.checked)}
                    />
                    <span className="text-sm font-medium text-gray-900">유효통화 없음</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={noCallAttempt}
                      onChange={(e) => setNoCallAttempt(e.target.checked)}
                    />
                    <span className="text-sm font-medium text-gray-900">통화 미시도</span>
                  </label>
                </div>

                <div className="ml-auto flex items-center gap-2">
                  <button className="bg-blue-600 text-white px-8 py-1.5 rounded-sm text-sm font-medium hover:bg-blue-700 transition-colors">
                    검색
                  </button>
                  <button 
                    className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-sm transition-colors flex items-center justify-center border border-gray-300"
                    onClick={() => {
                      setCustomerName('');
                      setSelectedAgent('홍길동');
                      setNoValidCall(false);
                      setNoCallAttempt(false);
                      setSelectedRegions(['전체']);
                    }}
                  >
                    <RotateCw size={18} />
                  </button>
                </div>
              </div>

              {/* Row 2: Regions */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-2">
                {regions.map(region => (
                  <label key={region} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={selectedRegions.includes(region)}
                      onChange={() => toggleRegion(region)}
                    />
                    <span className="text-sm text-gray-900">{region}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="px-6 pb-6">
            <div className="grid grid-cols-5 gap-4">
              <KpiCard title="총 배정 DB" value="33건" trend="+12%" isPositive={true} />
              <KpiCard title="통화 시도" value="30건" trend="+5%" isPositive={true} />
              <KpiCard title="통화 미시도" value="3건" trend="-2%" isPositive={true} />
              <KpiCard title="평균 성공율" value="25.8%" trend="+1.4%" isPositive={true} />
              <KpiCard title="평균 유효통화율" value="40.5%" trend="-0.5%" isPositive={false} />
            </div>
          </div>

          {/* Table Area */}
          <div className="flex flex-col px-6 pb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-900">
                총 <span className="font-bold">10</span>개
              </div>
              <div className="flex items-center gap-2">
                <button className="bg-blue-600 text-white px-4 py-1.5 rounded-sm text-sm font-medium hover:bg-blue-700 transition-colors">
                  선택 재배정
                </button>
                <div className="relative w-24">
                  <select className="w-full appearance-none border border-gray-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-gray-900 bg-white">
                    <option value="10">10개</option>
                    <option value="20">20개</option>
                    <option value="50">50개</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="border-t-2 border-gray-900">
              <table className="w-full text-sm text-center">
                <thead className="bg-gray-50 border-b border-gray-300">
                  <tr>
                    <th className="py-3.5 px-4 font-bold text-gray-900 w-12">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-12">No.</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-20">이름</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-16">성별</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-32">생년월일</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-36">연락처</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-24">지역</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-32">배정시간</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-32">최초통화</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-32">최근통화</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-20">통화시도</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-20">통화성공</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-20">유효통화</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-24">담당 설계사</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-20">배정이력</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          checked={selectedRows.includes(row.id)}
                          onChange={() => toggleRow(row.id)}
                        />
                      </td>
                      <td className="py-3 px-2 text-gray-700">{row.no}</td>
                      <td className="py-3 px-2 text-blue-600 hover:underline cursor-pointer">{row.name}</td>
                      <td className="py-3 px-2 text-gray-700">{row.gender}</td>
                      <td className="py-3 px-2 text-gray-700">
                        <div className="flex flex-col items-center">
                          <span>{row.birthDate}</span>
                          <span className="text-xs text-gray-500">({row.age}세)</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-gray-700">{row.phone}</td>
                      <td className="py-3 px-2 text-gray-700">{row.location}</td>
                      <td className="py-3 px-2 text-gray-700">
                        <div className="flex flex-col items-center">
                          <span>{row.assignedDate.split(' ')[0]}</span>
                          <span>{row.assignedDate.split(' ')[1]}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-gray-700">
                        {row.firstCallDate !== '-' ? (
                          <div className="flex flex-col items-center">
                            <span>{row.firstCallDate.split(' ')[0]}</span>
                            <span>{row.firstCallDate.split(' ')[1]}</span>
                          </div>
                        ) : '-'}
                      </td>
                      <td className="py-3 px-2 text-gray-700">
                        {row.recentCallDate !== '-' ? (
                          <div className="flex flex-col items-center">
                            <span>{row.recentCallDate.split(' ')[0]}</span>
                            <span>{row.recentCallDate.split(' ')[1]}</span>
                          </div>
                        ) : '-'}
                      </td>
                      <td className="py-3 px-2 text-gray-700">{row.callAttempts}</td>
                      <td className="py-3 px-2 text-gray-700">{row.callSuccess}</td>
                      <td className="py-3 px-2 text-gray-700">{row.validCall}</td>
                      <td className="py-3 px-2 text-gray-700">{row.agentName}</td>
                      <td className="py-3 px-2 text-blue-600 hover:underline cursor-pointer">확인</td>
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
            <div className="mt-8"></div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, trend, isPositive }: { title: string; value: string; trend?: string; isPositive?: boolean }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col">
      <span className="text-sm font-medium text-gray-500 mb-2">{title}</span>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {trend && (
          <div className={cn(
            "flex items-center text-xs font-medium px-1.5 py-0.5 rounded-md",
            isPositive ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
          )}>
            {isPositive ? <ArrowUpRight size={14} className="mr-0.5" /> : <ArrowDownRight size={14} className="mr-0.5" />}
            {trend}
          </div>
        )}
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
