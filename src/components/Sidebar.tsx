import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Database, 
  Settings, 
  Briefcase, 
  Network,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "flex flex-col bg-[#FAFBFC] border-r border-gray-200 h-screen transition-all duration-300 ease-in-out shrink-0", 
        isCollapsed ? "w-16" : "w-[220px]",
        className
      )}
    >
      <div className={cn("h-14 px-4 flex items-center gap-3 border-b border-gray-200 shrink-0", isCollapsed && "justify-center px-2")}>
        <div className="w-8 h-8 shrink-0 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
          B
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden whitespace-nowrap">
            <h2 className="font-semibold text-gray-800 text-sm">보닥 플래너</h2>
            <p className="text-xs text-gray-500">for 흥국화재</p>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4 overflow-x-hidden">
        <nav className="space-y-2 px-3">
          <NavItem icon={<LayoutDashboard size={18} />} label="홈 대시보드" active isCollapsed={isCollapsed} />
          
          <NavGroup icon={<Users size={18} />} label="배정 고객 관리" isCollapsed={isCollapsed} defaultExpanded>
            <SubNavItem label="상담 진행 고객" isCollapsed={isCollapsed} />
            <SubNavItem label="계약 예정 고객" isCollapsed={isCollapsed} />
            <SubNavItem label="상담 종료 고객" isCollapsed={isCollapsed} />
          </NavGroup>

          <NavGroup icon={<Database size={18} />} label="DB 배정 관리" isCollapsed={isCollapsed}>
            <SubNavItem label="배정 완료 DB" isCollapsed={isCollapsed} />
            <SubNavItem label="미배정 DB" isCollapsed={isCollapsed} />
            <SubNavItem label="DB 분배 현황" isCollapsed={isCollapsed} />
          </NavGroup>

          <NavGroup icon={<Settings size={18} />} label="배정 설정 관리" isCollapsed={isCollapsed}>
            <SubNavItem label="재배정 타입 설정" isCollapsed={isCollapsed} />
            <SubNavItem label="자동 회수 설정" isCollapsed={isCollapsed} />
            <SubNavItem label="자동 배정 설정" isCollapsed={isCollapsed} />
          </NavGroup>

          <NavGroup icon={<Briefcase size={18} />} label="직원/설계사 관리" isCollapsed={isCollapsed}>
            <SubNavItem label="운영/관리자" isCollapsed={isCollapsed} />
            <SubNavItem label="설계사" isCollapsed={isCollapsed} />
          </NavGroup>

          <NavGroup icon={<Network size={18} />} label="조직 및 관리 체계" isCollapsed={isCollapsed}>
            <SubNavItem label="직책·권한 설정" isCollapsed={isCollapsed} />
            <SubNavItem label="조직 구조 설정" isCollapsed={isCollapsed} />
          </NavGroup>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors",
            isCollapsed ? "justify-center w-full" : "gap-2"
          )}
          title={isCollapsed ? "사이드바 펼치기" : "사이드바 접기"}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!isCollapsed && <span>사이드바 접기</span>}
        </button>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active, isCollapsed }: { icon: React.ReactNode; label: string; active?: boolean; isCollapsed?: boolean }) {
  return (
    <a
      href="#"
      title={isCollapsed ? label : undefined}
      className={cn(
        "flex items-center gap-3 py-2.5 rounded-md text-sm font-medium transition-colors",
        active 
          ? "bg-blue-50 text-blue-700" 
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        isCollapsed ? "justify-center px-0" : "px-3"
      )}
    >
      <div className="shrink-0">{icon}</div>
      {!isCollapsed && <span className="truncate">{label}</span>}
    </a>
  );
}

function NavGroup({ icon, label, children, isCollapsed, defaultExpanded = false }: { icon: React.ReactNode; label: string; children: React.ReactNode; isCollapsed?: boolean; defaultExpanded?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => !isCollapsed && setIsExpanded(!isExpanded)}
        title={isCollapsed ? label : undefined}
        className={cn(
          "flex items-center py-2.5 rounded-md text-sm font-medium transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900",
          isCollapsed ? "justify-center px-0" : "px-3 justify-between"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="shrink-0">{icon}</div>
          {!isCollapsed && <span className="truncate">{label}</span>}
        </div>
        {!isCollapsed && (
          <div className="shrink-0 text-gray-400">
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        )}
      </button>
      {!isCollapsed && isExpanded && (
        <div className="flex flex-col mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
}

function SubNavItem({ label, isCollapsed }: { label: string; isCollapsed?: boolean }) {
  if (isCollapsed) return null;
  return (
    <a
      href="#"
      className="flex items-center pl-10 pr-3 py-2 rounded-md text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
    >
      <span className="truncate">{label}</span>
    </a>
  );
}
