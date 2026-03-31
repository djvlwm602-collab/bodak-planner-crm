import React from 'react';
import { motion } from 'motion/react';
import { Task } from '../types';
import { cn } from '../lib/utils';

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

export function TaskCard({ task, onDragStart }: TaskCardProps) {
  const getTagColor = (tag: Task['tag']) => {
    switch (tag) {
      case '종합진단':
        return 'bg-red-500 text-white';
      case '보험료점검':
        return 'bg-green-500 text-white';
      case '보장확대':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getBorderColor = (tag: Task['tag']) => {
    switch (tag) {
      case '종합진단':
        return 'border-l-red-500';
      case '보험료점검':
        return 'border-l-green-500';
      case '보장확대':
        return 'border-l-blue-600';
      default:
        return 'border-l-gray-500';
    }
  };

  return (
    <motion.div
      layout
      layoutId={task.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      draggable
      onDragStart={(e: any) => onDragStart(e, task.id)}
      className={cn(
        "bg-white p-3 rounded-sm shadow-sm border border-gray-200 border-l-4 cursor-grab active:cursor-grabbing hover:bg-gray-50 transition-colors group relative",
        getBorderColor(task.tag),
        task.isCancelled && "opacity-60 bg-gray-100"
      )}
    >
      {task.isCancelled && (
        <div className="absolute inset-0 bg-gray-900/60 z-10 rounded-sm flex items-center justify-center p-4 text-center">
          <p className="text-white font-bold text-sm leading-tight">
            고객 상담취소 요청으로<br />
            {task.firstCallDate}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-1 mb-3">
        <h4 className="font-medium text-gray-900 text-sm leading-tight hover:underline cursor-pointer">
          {task.name} ({task.age}세 / {task.gender} / {task.location})
        </h4>
        <p className="text-gray-500 text-xs">{task.phone}</p>
      </div>
      
      <div className="flex flex-col gap-1 mb-3 text-xs text-gray-600">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">배정일</span>
          <span>{task.assignedDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">최초통화</span>
          <span>{task.isCancelled ? '삭제 예정' : task.firstCallDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">최근통화</span>
          <span>{task.recentCallDate}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <span className={cn("text-[10px] px-1.5 py-0.5 rounded-sm font-medium", getTagColor(task.tag))}>
            {task.tag}
          </span>
          <button className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded-sm font-medium hover:bg-gray-200 transition-colors">
            AI 상담내역
          </button>
        </div>
        <span className="text-xs font-medium text-gray-500">
          {task.callCount}회 통화
        </span>
      </div>
    </motion.div>
  );
}
