export type Priority = 'Highest' | 'High' | 'Medium' | 'Low' | 'Lowest';

export type TaskType = 'Story' | 'Bug' | 'Task';

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Task {
  id: string;
  key: string;
  title: string;
  description?: string;
  status: string;
  priority: Priority;
  type: TaskType;
  assigneeId?: string;
  reporterId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface BoardData {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
}
