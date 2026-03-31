import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Board } from './components/Board';
import { CreateTaskModal } from './components/CreateTaskModal';
import { BoardData, Task } from './types';

const initialData: BoardData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      key: 'PROJ-1',
      title: '프로젝트 저장소 설정',
      description: 'Git 초기화, ESLint 및 Prettier 구성.',
      status: 'done',
      priority: 'High',
      type: 'Task',
      assigneeId: 'JD',
      reporterId: 'currentUser',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    'task-2': {
      id: 'task-2',
      key: 'PROJ-2',
      title: '데이터베이스 스키마 설계',
      description: '핵심 테이블을 위한 ERD 및 SQL 스크립트 작성.',
      status: 'in-progress',
      priority: 'Highest',
      type: 'Story',
      assigneeId: 'AS',
      reporterId: 'currentUser',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    'task-3': {
      id: 'task-3',
      key: 'PROJ-3',
      title: '인증 API 구현',
      description: '로그인 및 회원가입을 위한 JWT 기반 인증 엔드포인트.',
      status: 'todo',
      priority: 'High',
      type: 'Story',
      assigneeId: 'MK',
      reporterId: 'currentUser',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    'task-4': {
      id: 'task-4',
      key: 'PROJ-4',
      title: '모바일 네비게이션 버그 수정',
      description: '외부 클릭 시 햄버거 메뉴가 닫히지 않는 문제 수정.',
      status: 'todo',
      priority: 'Medium',
      type: 'Bug',
      reporterId: 'currentUser',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  columns: {
    'todo': {
      id: 'todo',
      title: '할 일',
      taskIds: ['task-3', 'task-4'],
    },
    'in-progress': {
      id: 'in-progress',
      title: '진행 중',
      taskIds: ['task-2'],
    },
    'in-review': {
      id: 'in-review',
      title: '리뷰 중',
      taskIds: [],
    },
    'done': {
      id: 'done',
      title: '완료',
      taskIds: ['task-1'],
    },
  },
  columnOrder: ['todo', 'in-progress', 'in-review', 'done'],
};

export default function App() {
  const [data, setData] = useState<BoardData>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskCounter, setTaskCounter] = useState(5);
  const [defaultColumnId, setDefaultColumnId] = useState<string | undefined>();

  const handleMoveTask = (taskId: string, targetColumnId: string) => {
    setData((prev) => {
      const task = prev.tasks[taskId];
      if (!task || task.status === targetColumnId) return prev;

      const sourceColumnId = task.status;
      const sourceColumn = prev.columns[sourceColumnId];
      const targetColumn = prev.columns[targetColumnId];

      // Remove from source
      const newSourceTaskIds = sourceColumn.taskIds.filter((id) => id !== taskId);
      
      // Add to target
      const newTargetTaskIds = [...targetColumn.taskIds, taskId];

      return {
        ...prev,
        tasks: {
          ...prev.tasks,
          [taskId]: {
            ...task,
            status: targetColumnId,
            updatedAt: new Date().toISOString(),
          },
        },
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

  const handleCreateTask = (newTaskData: Omit<Task, 'id' | 'key' | 'createdAt' | 'updatedAt'>) => {
    const newTaskId = `task-${taskCounter}`;
    const newTaskKey = `PROJ-${taskCounter}`;
    setTaskCounter((prev) => prev + 1);

    const newTask: Task = {
      ...newTaskData,
      id: newTaskId,
      key: newTaskKey,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setData((prev) => {
      const targetColumnId = newTask.status;
      const targetColumn = prev.columns[targetColumnId];

      return {
        ...prev,
        tasks: {
          ...prev.tasks,
          [newTaskId]: newTask,
        },
        columns: {
          ...prev.columns,
          [targetColumnId]: {
            ...targetColumn,
            taskIds: [...targetColumn.taskIds, newTaskId],
          },
        },
      };
    });
  };

  const openCreateModal = (columnId?: string) => {
    setDefaultColumnId(columnId);
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-white text-gray-900 font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onCreateTask={() => openCreateModal()} />
        <Board 
          data={data} 
          onMoveTask={handleMoveTask} 
          onCreateTask={openCreateModal}
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

      <CreateTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreate={handleCreateTask}
        defaultColumnId={defaultColumnId}
      />
    </div>
  );
}
