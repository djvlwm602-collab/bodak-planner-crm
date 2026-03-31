import React, { useState } from 'react';
import { BoardData } from '../types';
import { BoardColumn } from './BoardColumn';
import { Search, RotateCw, ChevronRight, ChevronDown, Calendar, Filter, ArrowUpRight, ArrowDownRight, LayoutDashboard, KanbanSquare } from 'lucide-react';
import { cn } from '../lib/utils';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BoardProps {
  data: BoardData;
  onMoveTask: (taskId: string, targetColumnId: string) => void;
  onCreateTask: (columnId?: string) => void;
}

// Mock Data for Dashboard
const trendData = [
  { date: '3/24', total: 120, success: 45 },
  { date: '3/25', total: 132, success: 52 },
  { date: '3/26', total: 101, success: 38 },
  { date: '3/27', total: 145, success: 65 },
  { date: '3/28', total: 150, success: 70 },
  { date: '3/29', total: 162, success: 82 },
  { date: '3/30', total: 180, success: 95 },
];

const typeData = [
  { name: '보험 리모델링', value: 400 },
  { name: '신규 가입 문의', value: 300 },
  { name: '보상 청구', value: 200 },
  { name: '기타 문의', value: 100 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6b7280'];

const agentData = [
  { name: '김보닥', value: 95 },
  { name: '이플래너', value: 88 },
  { name: '박상담', value: 76 },
  { name: '최보험', value: 65 },
  { name: '정고객', value: 54 },
];

export function Board({ data, onMoveTask, onCreateTask }: BoardProps) {
  const [viewMode, setViewMode] = useState<'dashboard' | 'kanban'>('dashboard');

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      onMoveTask(taskId, columnId);
    }
  };

  // Group columns
  const waitingColumns = data.columnOrder.filter(id => data.columns[id].group === '상담 대기');
  const inProgressColumns = data.columnOrder.filter(id => data.columns[id].group === '상담 중');

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Board Header */}
      <div className="px-4 py-5 border-b border-gray-200 flex items-end justify-between">
        <div className="flex items-end gap-4">
          <h1 className="text-[19px] font-bold text-gray-900 tracking-tight">상담 진행 고객</h1>
          <span className="text-sm text-gray-500 mb-0.5">배정 된 고객의 상담을 관리할 수 있습니다.</span>
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setViewMode('dashboard')}
            className={cn("flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all", viewMode === 'dashboard' ? "bg-white text-gray-900 border border-gray-200" : "text-gray-500 hover:text-gray-700 border border-transparent")}
          >
            <LayoutDashboard size={16} />
            대시보드
          </button>
          <button 
            onClick={() => setViewMode('kanban')}
            className={cn("flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all", viewMode === 'kanban' ? "bg-white text-gray-900 border border-gray-200" : "text-gray-500 hover:text-gray-700 border border-transparent")}
          >
            <KanbanSquare size={16} />
            칸반보드
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Inner Sidebar */}
        <div className="w-[180px] border-r border-gray-200 flex flex-col bg-gray-50/50 shrink-0 overflow-y-auto">
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-800">문정 사업단</h2>
          </div>
          <div className="p-2">
            <TreeItem label="A 지점" defaultExpanded>
              <TreeItem label="A 팀" />
              <TreeItem label="B 팀" active />
              <TreeItem label="C 팀" />
            </TreeItem>
            <TreeItem label="B 지점" defaultExpanded>
              <TreeItem label="1 팀" />
              <TreeItem label="2 팀" />
            </TreeItem>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50/30">
          
          {viewMode === 'dashboard' ? (
            /* Dashboard View (Amplitude Style) */
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              {/* Filters */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    <Calendar size={16} className="text-gray-500" />
                    최근 7일
                    <ChevronDown size={14} className="text-gray-500" />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    <Filter size={16} className="text-gray-500" />
                    필터 추가
                  </button>
                </div>
                <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md transition-colors flex items-center justify-center">
                  <RotateCw size={16} />
                </button>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-5 gap-4">
                <KpiCard title="평균 리드 시간" value="30:24" trend="+2.4%" isPositive={false} />
                <KpiCard title="평균 통화 시도율" value="82%" trend="+5.1%" isPositive={true} />
                <KpiCard title="평균 통화 성공율" value="45%" trend="-1.2%" isPositive={false} />
                <KpiCard title="평균 유효 통화율" value="28%" trend="+3.4%" isPositive={true} />
                <KpiCard title="평균 통화 시간" value="12분" trend="+0.5%" isPositive={true} />
              </div>

              {/* Main Chart */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-semibold text-gray-900">일자별 통화 성공 추이</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                      <span className="text-gray-600">총 시도 건수</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                      <span className="text-gray-600">성공 건수</span>
                    </div>
                  </div>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: 'none' }}
                        itemStyle={{ fontSize: '14px', fontWeight: 500 }}
                      />
                      <Area type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
                      <Area type="monotone" dataKey="success" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorSuccess)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bottom Grid */}
              <div className="grid grid-cols-2 gap-6">
                {/* Left: Pie Chart */}
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <h3 className="text-base font-semibold text-gray-900 mb-6">상담 유형별 비율</h3>
                  <div className="h-[250px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={typeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {typeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: 'none' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    {typeData.map((entry, index) => (
                      <div key={entry.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                        {entry.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Bar Chart */}
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <h3 className="text-base font-semibold text-gray-900 mb-6">우수 상담원 Top 5 (성공 건수)</h3>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={agentData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 13, fontWeight: 500 }} width={80} />
                        <Tooltip 
                          cursor={{ fill: '#f3f4f6' }}
                          contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: 'none' }}
                        />
                        <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24}>
                          {agentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? '#2563eb' : '#60a5fa'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Kanban View (Original) */
            <div className="flex-1 flex flex-col overflow-hidden bg-white">
              {/* Filter Area */}
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <select className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-sm pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer hover:bg-gray-100 transition-colors">
                      <option>담당설계사 전체</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="고객명 검색"
                      className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 hover:bg-gray-100 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="bg-blue-600 text-white px-4 py-1.5 rounded-sm text-sm font-medium hover:bg-blue-700 transition-colors">
                    검색
                  </button>
                  <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-sm transition-colors flex items-center justify-center">
                    <RotateCw size={16} />
                  </button>
                </div>
              </div>

              {/* Board Columns */}
              <div className="flex-1 overflow-auto px-6 py-6">
                <div className="flex gap-2 items-stretch min-w-max">
                  
                  {/* 상담 대기 Group */}
                  <div className="flex flex-col">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                      상담 대기
                    </h3>
                    <div className="flex gap-2 flex-1">
                      {waitingColumns.map(columnId => {
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

                  {/* Divider */}
                  <div className="w-px bg-gray-200 mx-0 mt-8"></div>

                  {/* 상담 중 Group */}
                  <div className="flex flex-col">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      상담 중
                    </h3>
                    <div className="flex gap-2 flex-1">
                      {inProgressColumns.map(columnId => {
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, trend, isPositive }: { title: string; value: string; trend: string; isPositive: boolean }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col">
      <span className="text-sm font-medium text-gray-500 mb-2">{title}</span>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <div className={cn(
          "flex items-center text-xs font-medium px-1.5 py-0.5 rounded-md",
          isPositive ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
        )}>
          {isPositive ? <ArrowUpRight size={14} className="mr-0.5" /> : <ArrowDownRight size={14} className="mr-0.5" />}
          {trend}
        </div>
      </div>
    </div>
  );
}

function TreeItem({ label, children, defaultExpanded = false, active = false }: { label: string; children?: React.ReactNode; defaultExpanded?: boolean; active?: boolean }) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);
  const hasChildren = React.Children.count(children) > 0;

  return (
    <div className="flex flex-col">
      <div 
        className={cn(
          "flex items-center gap-1.5 py-1.5 px-2 cursor-pointer rounded-sm text-sm transition-colors",
          active ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-100"
        )}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        <div className="w-4 h-4 flex items-center justify-center shrink-0">
          {hasChildren ? (
            isExpanded ? <ChevronDown size={14} className="text-gray-500" /> : <ChevronRight size={14} className="text-gray-500" />
          ) : null}
        </div>
        <span className="truncate">{label}</span>
      </div>
      {hasChildren && isExpanded && (
        <div className="ml-4 flex flex-col mt-0.5">
          {children}
        </div>
      )}
    </div>
  );
}
