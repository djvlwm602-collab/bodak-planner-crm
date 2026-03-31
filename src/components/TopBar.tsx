import React from 'react';
import { Search, Bell, HelpCircle, Grid, Plus } from 'lucide-react';

interface TopBarProps {
  onCreateTask: () => void;
}

export function TopBar({ onCreateTask }: TopBarProps) {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-10 shrink-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Grid size={20} className="text-gray-600" />
          <span className="font-bold text-lg text-blue-600 tracking-tight">보닥 플래너</span>
        </div>
        
        <div className="hidden md:flex items-center">
          <button 
            onClick={onCreateTask}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-1"
          >
            <Plus size={16} />
            만들기
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="검색" 
            className="pl-8 pr-4 py-1.5 bg-gray-100 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-md text-sm w-48 transition-all outline-none"
          />
        </div>
        
        <div className="flex items-center gap-3 border-l border-gray-200 pl-4 ml-2">
          <span className="font-bold text-gray-700 text-sm">10:00</span>
          <button className="bg-gray-800 hover:bg-gray-700 text-white text-xs px-2 py-1 rounded transition-colors">
            연장
          </button>
        </div>

        <button className="text-gray-600 hover:text-gray-900 ml-2">
          <Bell size={20} />
        </button>
        <button className="text-gray-600 hover:text-gray-900">
          <HelpCircle size={20} />
        </button>
        <button className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-medium text-sm">
          JD
        </button>
      </div>
    </header>
  );
}

