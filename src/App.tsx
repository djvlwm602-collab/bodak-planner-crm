import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Board } from './components/Board';
import { BoardData, Task } from './types';

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

export default function App() {
  const [data, setData] = useState<BoardData>(initialData);

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

  return (
    <div className="flex h-screen bg-white text-gray-900 font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onCreateTask={() => {}} />
        <Board 
          data={data} 
          onMoveTask={handleMoveTask} 
          onCreateTask={() => {}}
        />
        <footer className="border-t border-gray-200 p-4 text-xs text-gray-500 flex items-center shrink-0 bg-white">
          <span>Copyright@ Aijinet. All right reserved</span>
          <div className="flex items-center gap-4 ml-8">
            <a href="#" className="hover:text-gray-800">서비스 이용약관</a>
            <span>|</span>
            <a href="#" className="hover:text-gray-800">개인정보처리방침</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
