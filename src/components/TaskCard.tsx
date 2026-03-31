import React from 'react';
import { motion } from 'motion/react';
import { Task } from '../types';
import { ArrowUp, ArrowRight, ArrowDown, CheckSquare, Bookmark, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

export function TaskCard({ task, onDragStart }: TaskCardProps) {
  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'Highest':
        return <ArrowUp size={16} className="text-red-600" />;
      case 'High':
        return <ArrowUp size={16} className="text-orange-500" />;
      case 'Medium':
        return <ArrowRight size={16} className="text-yellow-500" />;
      case 'Low':
        return <ArrowDown size={16} className="text-blue-500" />;
      case 'Lowest':
        return <ArrowDown size={16} className="text-gray-400" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: Task['type']) => {
    switch (type) {
      case 'Story':
        return <Bookmark size={16} className="text-green-500 fill-green-500" />;
      case 'Bug':
        return <AlertCircle size={16} className="text-red-500 fill-red-500" />;
      case 'Task':
        return <CheckSquare size={16} className="text-blue-500 fill-blue-500" />;
      default:
        return null;
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
      className="bg-white p-3 rounded-md shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing hover:bg-gray-50 transition-colors group"
    >
      <p className="text-sm text-gray-800 mb-3 leading-snug">{task.title}</p>
      
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <div title={task.type}>{getTypeIcon(task.type)}</div>
          <span className="text-xs font-medium text-gray-500 hover:underline cursor-pointer">
            {task.key}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <div title={`우선순위: ${task.priority}`}>
            {getPriorityIcon(task.priority)}
          </div>
          {task.assigneeId ? (
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold" title={task.assigneeId}>
              {task.assigneeId.substring(0, 2).toUpperCase()}
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs" title="담당자 없음">
              ?
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
