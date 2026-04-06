import React, { useState } from 'react';
import { Search, RotateCw, ChevronDown, ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { RolePermissionForm } from './RolePermissionForm';

interface RoleData {
  id: string;
  no: number;
  roleName: string;
  permission: string;
  isUsed: string;
  regDate: string;
  modDate: string;
}

const mockData: RoleData[] = [
  { id: '10', no: 10, roleName: '최고 관리자', permission: '운영/관리자', isUsed: '사용함', regDate: '2026.01.01', modDate: '-' },
  { id: '9', no: 9, roleName: '사업단장', permission: '운영/관리자', isUsed: '사용함', regDate: '2026.01.01', modDate: '-' },
  { id: '8', no: 8, roleName: '지점장', permission: '운영/관리자', isUsed: '사용함', regDate: '2026.01.01', modDate: '-' },
  { id: '7', no: 7, roleName: '팀장', permission: '운영/관리자', isUsed: '사용함', regDate: '2026.01.01', modDate: '-' },
  { id: '6', no: 6, roleName: '플래너', permission: '설계사', isUsed: '사용함', regDate: '2026.01.01', modDate: '-' },
  { id: '5', no: 5, roleName: '직책명', permission: '운영/관리자', isUsed: '사용함', regDate: '2026.01.01', modDate: '-' },
  { id: '4', no: 4, roleName: '직책명', permission: '운영/관리자', isUsed: '사용함', regDate: '2026.01.01', modDate: '-' },
  { id: '3', no: 3, roleName: '직책명', permission: '운영/관리자', isUsed: '사용함', regDate: '2026.01.01', modDate: '-' },
  { id: '2', no: 2, roleName: '직책명', permission: '운영/관리자', isUsed: '사용함', regDate: '2026.01.01', modDate: '2026.01.02' },
  { id: '1', no: 1, roleName: '직책명', permission: '운영/관리자', isUsed: '사용함', regDate: '2026.01.01', modDate: '-' },
];

export function RolePermissionSettings() {
  const [selectedRole, setSelectedRole] = useState('전체');
  const [selectedPermission, setSelectedPermission] = useState('전체');
  const [selectedIsUsed, setSelectedIsUsed] = useState('전체');
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return <RolePermissionForm onBack={() => setShowForm(false)} />;
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 flex items-center shrink-0">
        <h1 className="text-[19px] font-bold text-gray-900 tracking-tight mr-4">직책·권한 설정</h1>
        <span className="text-sm text-gray-500">조직을 담당하는 직책 및 메뉴 권한을 부여합니다.</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-white px-[30px] py-8">
        <div className="w-full flex flex-col h-full">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="border border-gray-300 p-5 flex flex-col gap-6 bg-gray-50/30">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-900">직책/직급명</span>
                  <div className="relative w-40">
                    <select 
                      className="w-full appearance-none border border-gray-300 text-gray-900 text-sm rounded-sm pl-3 pr-8 py-1.5 focus:outline-none focus:border-gray-900 bg-white"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                    >
                      <option value="전체">전체</option>
                      <option value="최고 관리자">최고 관리자</option>
                      <option value="사업단장">사업단장</option>
                      <option value="지점장">지점장</option>
                      <option value="팀장">팀장</option>
                      <option value="플래너">플래너</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-900">업무 권한</span>
                  <div className="relative w-40">
                    <select 
                      className="w-full appearance-none border border-gray-300 text-gray-900 text-sm rounded-sm pl-3 pr-8 py-1.5 focus:outline-none focus:border-gray-900 bg-white"
                      value={selectedPermission}
                      onChange={(e) => setSelectedPermission(e.target.value)}
                    >
                      <option value="전체">전체</option>
                      <option value="운영/관리자">운영/관리자</option>
                      <option value="설계사">설계사</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-900">사용 여부</span>
                  <div className="relative w-40">
                    <select 
                      className="w-full appearance-none border border-gray-300 text-gray-900 text-sm rounded-sm pl-3 pr-8 py-1.5 focus:outline-none focus:border-gray-900 bg-white"
                      value={selectedIsUsed}
                      onChange={(e) => setSelectedIsUsed(e.target.value)}
                    >
                      <option value="전체">전체</option>
                      <option value="사용함">사용함</option>
                      <option value="사용안함">사용안함</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="ml-auto flex items-center gap-2">
                  <button className="bg-black text-white px-8 py-1.5 rounded-sm text-sm font-medium hover:bg-gray-800 transition-colors">
                    검색
                  </button>
                  <button 
                    className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-sm transition-colors flex items-center justify-center border border-gray-300 bg-white"
                    onClick={() => {
                      setSelectedRole('전체');
                      setSelectedPermission('전체');
                      setSelectedIsUsed('전체');
                    }}
                  >
                    <RotateCw size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table Area */}
          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-900">
                총 <span className="font-bold">10</span>개
              </div>
              <div className="flex items-center gap-2">
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
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-20">No.</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900">직책/직급</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900">업무 권한</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900">사용 여부</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-32">등록일</th>
                    <th className="py-3.5 px-2 font-bold text-gray-900 w-32">수정일</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-2 text-gray-700">{row.no}</td>
                      <td className="py-4 px-2 text-blue-600 hover:underline cursor-pointer">{row.roleName}</td>
                      <td className="py-4 px-2 text-gray-700">{row.permission}</td>
                      <td className="py-4 px-2 text-gray-700">{row.isUsed}</td>
                      <td className="py-4 px-2 text-gray-700">{row.regDate}</td>
                      <td className="py-4 px-2 text-gray-700">{row.modDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-6 mb-8">
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

            {/* Footer Actions */}
            <div className="flex justify-end pt-6 border-t border-gray-900 mt-auto">
              <button 
                className="bg-black text-white px-10 py-2 rounded-sm text-sm font-medium hover:bg-gray-800 transition-colors"
                onClick={() => setShowForm(true)}
              >
                등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
