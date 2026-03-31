import React, { useState } from 'react';
import { BoardData, Task } from '../types';
import { BoardColumn } from './BoardColumn';
import { Search } from 'lucide-react';

interface BoardProps {
  data: BoardData;
  onMoveTask: (taskId: string, targetColumnId: string) => void;
  onCreateTask: (columnId?: string) => void;
}

export function Board({ data, onMoveTask, onCreateTask }: BoardProps) {
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.effectAllowed = 'move';
    // Optional: set a drag image or styling
  };

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      onMoveTask(taskId, columnId);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Board Header */}
      <div className="px-8 py-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">보닥 플래너 보드</h1>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="보드 검색" 
                className="pl-8 pr-4 py-1.5 bg-white border border-gray-300 focus:border-blue-500 rounded-md text-sm w-48 transition-all outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Board Columns */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-8">
        <div className="flex gap-4 h-full items-start">
          {data.columnOrder.map(columnId => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
            
            return (
              <BoardColumn
                key={column.id}
                column={column}
                tasks={tasks}
                onDragStart={handleDragStart}
                onDrop={handleDrop}
                onCreateTask={onCreateTask}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
