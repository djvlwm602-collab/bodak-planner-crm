import React from 'react';

interface TopBarProps {
  onCreateTask: () => void;
}

export function TopBar({ onCreateTask }: TopBarProps) {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-end px-6 sticky top-0 z-10 shrink-0">
      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-700 text-sm">10:00</span>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-sm transition-colors font-medium">
            연장
          </button>
        </div>

        <button className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs hover:bg-emerald-700 transition-colors">
          김
        </button>
      </div>
    </header>
  );
}

