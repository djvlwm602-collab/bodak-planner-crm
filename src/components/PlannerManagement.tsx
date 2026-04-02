import React, { useState } from 'react';
import { Search, RotateCw, ChevronDown, ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { AdminDetail, AdminUser } from './AdminDetail';

const mockData: AdminUser[] = [
  { id: '10', no: 10, name: '이민혁', userId: 'kris', phone: '010-1111-1111', affiliation: '본사 > 사업단 1 > 지점 1 > 팀 1', position: '설계사', joinDate: '2026.01.01', approvalStatus: 'approved', approvalDate: '2026.02.01', activityStatus: '정상' },
  { id: '9', no: 9, name: '이민혁', userId: 'kris', phone: '010-1111-1111', affiliation: '본사 > 사업단 1 > 지점 1 > 팀 1', position: '설계사', joinDate: '2026.01.01', approvalStatus: 'pending', activityStatus: '대기' },
  { id: '8', no: 8, name: '이민혁', userId: 'kris', phone: '010-1111-1111', affiliation: '본사 > 사업단 1 > 지점 1', position: '설계사', joinDate: '2026.01.01', approvalStatus: 'pending', activityStatus: '대기' },
  { id: '7', no: 7, name: '이민혁', userId: 'kris', phone: '010-1111-1111', affiliation: '본사 > 사업단 1 > 지점 1 > 팀 1', position: '설계사', joinDate: '2026.01.01', approvalStatus: 'approved', approvalDate: '2026.02.01', activityStatus: '해촉' },
  { id: '6', no: 6, name: '이민혁', userId: 'kris', phone: '010-1111-1111', affiliation: '본사 > 사업단 1 > 지점 1 > 팀 1', position: '설계사', joinDate: '2026.01.01', approvalStatus: 'approved', approvalDate: '2026.02.01', activityStatus: '일시제한' },
  { id: '5', no: 5, name: '이민혁', userId: 'kris', phone: '010-1111-1111', affiliation: '본사 > 사업단 1 > 지점 1 > 팀 1', position: '설계사', joinDate: '2026.01.01', approvalStatus: 'pending', activityStatus: '대기' },
  { id: '4', no: 4, name: '이민혁', userId: 'kris', phone: '010-1111-1111', affiliation: '본사 > 사업단 1 > 지점 1 > 팀 1', position: '설계사', joinDate: '2026.01.01', approvalStatus: 'pending', activityStatus: '대기' },
  { id: '3', no: 3, name: '이민혁', userId: 'kris', phone: '010-1111-1111', affiliation: '본사 > 사업단 1 > 지점 1 > 팀 1', position: '설계사', joinDate: '2026.01.01', approvalStatus: 'pending', activityStatus: '대기' },
  { id: '2', no: 2, name: '이민혁', userId: 'kris', phone: '010-1111-1111', affiliation: '본사 > 사업단 1 > 지점 1 > 팀 1', position: '설계사', joinDate: '2026.01.01', approvalStatus: 'pending', activityStatus: '대기' },
  { id: '1', no: 1, name: '이민혁', userId: 'kris', phone: '010-1111-1111', affiliation: '본사 > 사업단 1 > 지점 1 > 팀 1', position: '설계사', joinDate: '2026.01.01', approvalStatus: 'pending', activityStatus: '대기' },
];

export function PlannerManagement() {
  const [searchType, setSearchType] = useState('이름');
  const [searchValue, setSearchValue] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('전체');
  const [selectedApproval, setSelectedApproval] = useState('전체');
  const [selectedActivity, setSelectedActivity] = useState('전체');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

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

  if (selectedUser) {
    return <AdminDetail user={selectedUser} onBack={() => setSelectedUser(null)} />;
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 flex items-center shrink-0">
        <h1 className="text-[19px] font-bold text-gray-900 tracking-tight mr-4">설계사</h1>
        <span className="text-sm text-gray-500">보험 상담업무를 진행하는 설계사를 관리할 수 있습니다.</span>
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
          <div className="px-6 py-6 pb-4">
            <div className="border border-gray-300 p-5 flex flex-col gap-6 bg-white">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="relative w-28">
                    <select 
                      className="w-full appearance-none border border-gray-300 text-gray-900 text-sm rounded-sm pl-3 pr-8 py-1.5 focus:outline-none focus:border-gray-900 bg-white"
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                    >
                      <option value="이름">이름</option>
                      <option value="아이디">아이디</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                  <input 
                    type="text" 
                    className="w-48 px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-900"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-900">직책</span>
                  <div className="relative w-32">
                    <select 
                      className="w-full appearance-none border border-gray-300 text-gray-900 text-sm rounded-sm pl-3 pr-8 py-1.5 focus:outline-none focus:border-gray-900 bg-white"
                      value={selectedPosition}
                      onChange={(e) => setSelectedPosition(e.target.value)}
                    >
                      <option value="전체">전체</option>
                      <option value="설계사">설계사</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-900">승인 상태</span>
                  <div className="relative w-32">
                    <select 
                      className="w-full appearance-none border border-gray-300 text-gray-900 text-sm rounded-sm pl-3 pr-8 py-1.5 focus:outline-none focus:border-gray-900 bg-white"
                      value={selectedApproval}
                      onChange={(e) => setSelectedApproval(e.target.value)}
                    >
                      <option value="전체">전체</option>
                      <option value="승인">승인</option>
                      <option value="대기">대기</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-900">활동 상태</span>
                  <div className="relative w-32">
                    <select 
                      className="w-full appearance-none border border-gray-300 text-gray-900 text-sm rounded-sm pl-3 pr-8 py-1.5 focus:outline-none focus:border-gray-900 bg-white"
                      value={selectedActivity}
                      onChange={(e) => setSelectedActivity(e.target.value)}
                    >
                      <option value="전체">전체</option>
                      <option value="정상">정상</option>
                      <option value="대기">대기</option>
                      <option value="해촉">해촉</option>
                      <option value="일시제한">일시제한</option>
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
                      setSearchValue('');
                      setSelectedPosition('전체');
                      setSelectedApproval('전체');
                      setSelectedActivity('전체');
                    }}
                  >
                    <RotateCw size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Area */}
          <div className="px-6 pb-6">
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-md px-4 py-3 shadow-sm">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">전체</span>
                  <span className="text-sm font-bold text-gray-900">100명</span>
                </div>
                <div className="w-px h-4 bg-gray-200"></div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">승인대기</span>
                  <span className="text-sm font-bold text-gray-900">50명</span>
                </div>
                <div className="w-px h-4 bg-gray-200"></div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">정상</span>
                  <span className="text-sm font-bold text-gray-900">10명</span>
                </div>
                <div className="w-px h-4 bg-gray-200"></div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">일시제한</span>
                  <span className="text-sm font-bold text-gray-900">10명</span>
                </div>
              </div>
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
                  선택 일괄 승인
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
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-16">No.</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-24">이름</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-24">아이디</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-36">휴대폰번호</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 min-w-[200px]">소속</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-28">직책</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-32">가입일</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-36">승인상태</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-28">활동상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          checked={selectedRows.includes(row.id)}
                          onChange={() => toggleRow(row.id)}
                        />
                      </td>
                      <td className="py-4 px-2 text-gray-700">{row.no}</td>
                      <td 
                        className="py-4 px-2 text-blue-600 hover:underline cursor-pointer"
                        onClick={() => setSelectedUser(row)}
                      >
                        {row.name}
                      </td>
                      <td className="py-4 px-2 text-gray-700">{row.userId}</td>
                      <td className="py-4 px-2 text-gray-700">{row.phone}</td>
                      <td className="py-4 px-2 text-gray-700 text-left">{row.affiliation}</td>
                      <td className="py-4 px-2 text-gray-700">{row.position}</td>
                      <td className="py-4 px-2 text-gray-700">{row.joinDate}</td>
                      <td className="py-4 px-2">
                        {row.approvalStatus === 'approved' ? (
                          <span className="text-gray-700">{row.approvalDate}</span>
                        ) : (
                          <div className="flex items-center justify-center gap-1">
                            <button className="bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1 rounded-sm text-xs font-medium hover:bg-blue-100 transition-colors">
                              승인
                            </button>
                            <button className="bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-sm text-xs font-medium hover:bg-red-100 transition-colors">
                              거절
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-2 text-gray-700">{row.activityStatus}</td>
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
