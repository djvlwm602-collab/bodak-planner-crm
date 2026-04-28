import React from 'react';
import { motion } from 'motion/react';
import { Task } from '../types';
import { cn } from '../lib/utils';
import { Badge } from './ui/badge';

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

export function TaskCard({ task, onDragStart }: TaskCardProps) {
  const getTagVariant = (tag: Task['tag']): 'primary' | 'teal' | 'green' | 'default' => {
    switch (tag) {
      case '종합진단':   return 'primary';
      case '보험료점검': return 'teal';
      case '보장확대':   return 'default';
      default:           return 'default';
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
        "bg-white p-4 rounded-md border border-border-primary cursor-grab active:cursor-grabbing hover:bg-bg-primary transition-colors group relative overflow-hidden",
        task.isCancelled && "bg-bg-primary"
      )}
    >
      {task.isCancelled && (
        <div className="absolute inset-0 bg-gray-900/60 z-10 flex items-center justify-center p-4 text-center">
          <p className="text-white font-semibold text-sm leading-tight drop-shadow-md">
            고객 상담취소 요청으로<br />
            {task.firstCallDate}
          </p>
        </div>
      )}

      <div className={cn("flex flex-col h-full", task.isCancelled && "opacity-30")}>
        <div className="flex flex-col gap-1.5 mb-4">
        <h4
          className="font-medium text-gray-900 text-sm leading-snug hover:underline cursor-pointer"
          onClick={(e) => {
            // 카드 드래그 이벤트와 분리 — 이름 클릭 시 고객 상세 새 탭
            e.stopPropagation();
            window.open(`/?page=customer-detail&id=${task.id}`, '_blank');
          }}
        >
          {task.name} ({task.age}세 / {task.gender} / {task.location})
        </h4>
        <p className="text-neutral text-xs">{task.phone}</p>
      </div>

      <div className="flex flex-col gap-0.5 mb-4 text-xs text-text-strong">
        <div className="flex items-center justify-between">
          <span className="text-text-quaternary">배정일</span>
          <span>{task.assignedDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-text-quaternary">최초통화</span>
          <span>{task.isCancelled ? '삭제 예정' : task.firstCallDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-text-quaternary">최근통화</span>
          <span>{task.recentCallDate}</span>
        </div>
      </div>

        <div className="flex items-center justify-between mt-auto pt-3">
          <div className="flex items-center gap-1.5">
            <Badge variant={getTagVariant(task.tag)} className="text-[11px] px-[8px] py-[6px] rounded-md border-0 leading-none">{task.tag}</Badge>
            <Badge variant="green" className="text-[11px] px-[8px] py-[6px] rounded-md border-0 leading-none">AI 상담내역</Badge>
          </div>
          <span className="text-body4 font-semibold text-text-secondary">
            {task.callCount}회 통화
          </span>
        </div>
      </div>
    </motion.div>
  );
}
