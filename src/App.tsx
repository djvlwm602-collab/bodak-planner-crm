import { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Board } from './components/Board';
import { ContractExpected } from './components/ContractExpected';
import { ConsultationEnded } from './components/ConsultationEnded';
import { AssignedDB } from './components/AssignedDB';
import { UnassignedDB } from './components/UnassignedDB';
import { AdminManagement } from './components/AdminManagement';
import { PlannerManagement } from './components/PlannerManagement';
import { RolePermissionSettings } from './components/RolePermissionSettings';
import { OrgStructureSettings } from './components/OrgStructureSettings';
import { ReassignTypeSettings } from './components/ReassignTypeSettings';
import { AutoRetrieveSettings } from './components/AutoRetrieveSettings';
import { AutoAssignSettings } from './components/AutoAssignSettings';
import { DBDistributionStatus } from './components/DBDistributionStatus';
import { DBDistributionDetail } from './components/DBDistributionDetail';
import { HomeDashboard } from './components/HomeDashboard';
import { CustomerDetailPage } from './components/customer-detail/CustomerDetailPage';
import { BoardData, Task } from './types';
import { applyBrand, getActiveBrand } from './config/brand';
import { pageMeta as PAGE_META } from './config/copy/default.ko';

// 앱 최상단에서 한 번 호출 — VITE_BRAND env 기준 활성 브랜드 CSS 변수를 :root에 주입
applyBrand(getActiveBrand());

const initialData: BoardData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      key: 'CUST-1',
      name: '이*혁',
      age: 34,
      gender: '남',
      location: '서울특별시',
      phone: '0507-1234-1234',
      assignedDate: '2026.01.21 00:00',
      firstCallDate: '-',
      recentCallDate: '-',
      tag: '종합진단',
      callCount: 0,
    },
    'task-2': {
      id: 'task-2',
      key: 'CUST-2',
      name: '이*혁',
      age: 34,
      gender: '남',
      location: '서울특별시',
      phone: '0507-1234-1234',
      assignedDate: '2026.01.21 00:00',
      firstCallDate: '-',
      recentCallDate: '-',
      tag: '보험료점검',
      callCount: 0,
    },
    'task-3': {
      id: 'task-3',
      key: 'CUST-3',
      name: '이*혁',
      age: 34,
      gender: '남',
      location: '서울특별시',
      phone: '0507-1234-1234',
      assignedDate: '2026.01.21 00:00',
      firstCallDate: '2026.01.21 00:00',
      recentCallDate: '2026.01.21 00:00',
      tag: '종합진단',
      callCount: 1,
    },
    'task-4': {
      id: 'task-4',
      key: 'CUST-4',
      name: '이*혁',
      age: 34,
      gender: '남',
      location: '서울특별시',
      phone: '0507-1234-1234',
      assignedDate: '2026.01.21 00:00',
      firstCallDate: '2026.01.21 00:00',
      recentCallDate: '2026.01.21 00:00',
      tag: '종합진단',
      callCount: 3,
    },
    'task-5': {
      id: 'task-5',
      key: 'CUST-5',
      name: '이*혁',
      age: 34,
      gender: '남',
      location: '서울특별시',
      phone: '0507-1234-1234',
      assignedDate: '2026.01.21 00:00',
      firstCallDate: '2026.01.21 00:00',
      recentCallDate: '2026.01.21 00:00',
      tag: '보장확대',
      callCount: 2,
    },
    'task-6': {
      id: 'task-6',
      key: 'CUST-6',
      name: '이*혁',
      age: 34,
      gender: '남',
      location: '서울특별시',
      phone: '0507-1234-1234',
      assignedDate: '2026.01.21 00:00',
      firstCallDate: 'YYYY.MM.DD에 삭제 예정',
      recentCallDate: '2026.01.21 00:00',
      tag: '보장확대',
      callCount: 3,
      isCancelled: true,
    },
  },
  columns: {
    'before-call': {
      id: 'before-call',
      title: '통화 전',
      taskIds: ['task-1', 'task-2'],
      group: '상담 대기',
    },
    'missed-call': {
      id: 'missed-call',
      title: '부재중',
      taskIds: ['task-3'],
      group: '상담 중',
    },
    'success-call': {
      id: 'success-call',
      title: '통화성공',
      taskIds: ['task-4', 'task-6'],
      group: '상담 중',
    },
    'valid-call': {
      id: 'valid-call',
      title: '유효통화',
      taskIds: ['task-5'],
      group: '상담 중',
    },
  },
  columnOrder: ['before-call', 'missed-call', 'success-call', 'valid-call'],
};

// URL ?page= 쿼리로 초기 페이지 결정 — Figma 캡처 시 페이지별 URL 접근용
// 유효하지 않은 값이거나 파라미터가 없으면 기본값 '상담 진행 고객' 사용
const getInitialPage = () => {
  const p = new URLSearchParams(window.location.search).get('page');
  // 고객 상세 페이지는 PAGE_META 에 없지만 독립 레이아웃으로 렌더하기 위해 예외 허용
  if (p === 'customer-detail') return 'customer-detail';
  return p && PAGE_META[p] ? p : '상담 진행 고객';
};

export default function App() {
  const [data, setData] = useState<BoardData>(initialData);
  const [activePage, setActivePage] = useState<string>(getInitialPage);
  const [distributionDetailParams, setDistributionDetailParams] = useState<{period: string, status: string} | null>(null);
  const dashboardActions = null;

  const handlePageChange = (page: string) => {
    setActivePage(page);
    if (page !== 'DB 분배 현황 상세') {
      setDistributionDetailParams(null);
    }
  };

  const handleNavigateToDistributionDetail = (period: string, status: string) => {
    setDistributionDetailParams({ period, status });
    setActivePage('DB 분배 현황 상세');
  };

  const handleMoveTask = (taskId: string, targetColumnId: string) => {
    setData((prev) => {
      const task = prev.tasks[taskId];
      
      // Find current column
      let sourceColumnId = '';
      for (const colId of prev.columnOrder) {
        if (prev.columns[colId].taskIds.includes(taskId)) {
          sourceColumnId = colId;
          break;
        }
      }

      if (!sourceColumnId || sourceColumnId === targetColumnId) return prev;

      const sourceColumn = prev.columns[sourceColumnId];
      const targetColumn = prev.columns[targetColumnId];

      // Remove from source
      const newSourceTaskIds = sourceColumn.taskIds.filter((id) => id !== taskId);
      
      // Add to target
      const newTargetTaskIds = [...targetColumn.taskIds, taskId];

      return {
        ...prev,
        columns: {
          ...prev.columns,
          [sourceColumnId]: {
            ...sourceColumn,
            taskIds: newSourceTaskIds,
          },
          [targetColumnId]: {
            ...targetColumn,
            taskIds: newTargetTaskIds,
          },
        },
      };
    });
  };

  // 고객 상세 페이지는 Sidebar/TopBar 없이 독립 레이아웃으로 렌더 — 새 탭 전용 화면
  if (activePage === 'customer-detail') {
    return (
      <div className="h-screen overflow-x-auto overflow-y-hidden bg-white text-gray-900 font-sans">
        <CustomerDetailPage />
      </div>
    );
  }

  return (
    <div className="h-screen overflow-x-auto overflow-y-hidden bg-white text-gray-900 font-sans">
      <div className="flex h-full min-w-[1280px]">
      <Sidebar activePage={activePage === 'DB 분배 현황 상세' ? 'DB 분배 현황' : activePage} onPageChange={handlePageChange} />
      <div className="flex-1 flex flex-col min-w-[640px] overflow-hidden bg-bg-app-body">
        <TopBar
          onCreateTask={() => {}}
          title={PAGE_META[activePage]?.title}
          subtitle={PAGE_META[activePage]?.subtitle}
          actions={dashboardActions}
        />
        {activePage === '홈 대시보드' ? (
          <HomeDashboard />
        ) : activePage === '상담 진행 고객' ? (
          <Board 
            data={data} 
            onMoveTask={handleMoveTask} 
            onCreateTask={() => {}}
          />
        ) : activePage === '계약 예정 고객' ? (
          <ContractExpected />
        ) : activePage === '상담 종료 고객' ? (
          <ConsultationEnded />
        ) : activePage === '배정 완료 DB' ? (
          <AssignedDB />
        ) : activePage === '미배정 DB' ? (
          <UnassignedDB />
        ) : activePage === '운영/관리자' ? (
          <AdminManagement />
        ) : activePage === '설계사' ? (
          <PlannerManagement />
        ) : activePage === '직책·권한 설정' ? (
          <RolePermissionSettings />
        ) : activePage === '조직 구조 설정' ? (
          <OrgStructureSettings />
        ) : activePage === '재배정 타입 설정' ? (
          <ReassignTypeSettings />
        ) : activePage === '자동 회수 설정' ? (
          <AutoRetrieveSettings />
        ) : activePage === '자동 배정 설정' ? (
          <AutoAssignSettings />
        ) : activePage === 'DB 분배 현황' ? (
          <DBDistributionStatus onNavigateToDetail={handleNavigateToDistributionDetail} />
        ) : activePage === 'DB 분배 현황 상세' && distributionDetailParams ? (
          <DBDistributionDetail 
            period={distributionDetailParams.period} 
            status={distributionDetailParams.status}
            onBack={() => handlePageChange('DB 분배 현황')}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-bg-primary text-neutral">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{activePage}</h3>
              <p>준비 중인 페이지입니다.</p>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
