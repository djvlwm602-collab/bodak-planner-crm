import React, { useState } from 'react';
import { Column, Task } from '../types';
import { TaskCard } from './TaskCard';
import { cn } from '../lib/utils';
import { MoreHorizontal, Plus } from 'lucide-react';

interface BoardColumnProps {
  column: Column;
  tasks: Task[];
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
  onCreateTask: (columnId: string) => void;
}

export function BoardColumn({ column, tasks, onDragStart, onDrop, onCreateTask }: BoardColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop(e, column.id);
  };

  return (
    <div className="flex flex-col w-[280px] shrink-0">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider truncate">
          {column.title} <span className="ml-1 text-gray-400 font-normal">{tasks.length}</span>
        </h3>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => onCreateTask(column.id)}
            className="p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700 rounded transition-colors"
          >
            <Plus size={16} />
          </button>
          <button className="p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700 rounded transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "flex-1 bg-[#F4F5F7] rounded-md p-2 flex flex-col gap-2 min-h-[150px] transition-colors",
          isDragOver ? "bg-blue-50 border-2 border-dashed border-blue-300" : "border-2 border-transparent"
        )}
      >
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onDragStart={onDragStart} 
          />
        ))}
        
        {tasks.length === 0 && !isDragOver && (
          <div className="h-full flex items-center justify-center text-sm text-gray-400 border-2 border-dashed border-gray-200 rounded-md">
            여기에 이슈를 드롭하세요
          </div>
        )}
      </div>
    </div>
  );
}
