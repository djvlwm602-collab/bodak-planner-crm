import React, { useState } from 'react';
import { BoardData } from '../types';
import { BoardColumn } from './BoardColumn';
import { Search, RotateCw, ChevronRight, ChevronDown, Calendar, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface BoardProps {
  data: BoardData;
  onMoveTask: (taskId: string, targetColumnId: string) => void;
  onCreateTask: (columnId?: string) => void;
}

export function Board({ data, onMoveTask, onCreateTask }: BoardProps) {
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['전체']);
  const [dateRangeType, setDateRangeType] = useState<string>('1개월');
  const [startDate, setStartDate] = useState('2024-03-10');
  const [endDate, setEndDate] = useState('2024-04-09');

  const regions = ['전체', '서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', '세종', '강원', '충북', '충남', '전남', '전북', '경북', '경남', '제주'];

  const toggleRegion = (region: string) => {
    if (region === '전체') {
      setSelectedRegions(['전체']);
    } else {
      setSelectedRegions(prev => {
        const newRegions = prev.includes(region) 
          ? prev.filter(r => r !== region)
          : [...prev.filter(r => r !== '전체'), region];
        return newRegions.length === 0 ? ['전체'] : newRegions;
      });
    }
  };

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
      <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between shrink-0">
        <div className="flex items-end gap-4">
          <h1 className="text-[19px] font-bold text-gray-900 tracking-tight">상담 진행 고객</h1>
          <span className="text-sm text-gray-500 mb-0.5">배정 된 고객의 상담을 관리할 수 있습니다.</span>
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
        <div className="flex-1 overflow-y-auto bg-gray-50/30">
          <div className="flex flex-col min-h-full">
            {/* Top Section (KPIs) */}
            <div className="px-6 py-4 space-y-4 shrink-0">
              {/* KPI Cards */}
              <div className="grid grid-cols-5 gap-4">
                <KpiCard title="평균 리드 시간" value="30:24" trend="+2.4%" isPositive={false} />
                <KpiCard title="평균 통화 시도율" value="82%" trend="+5.1%" isPositive={true} />
                <KpiCard title="평균 통화 성공율" value="45%" trend="-1.2%" isPositive={false} />
                <KpiCard title="평균 유효 통화율" value="28%" trend="+3.4%" isPositive={true} />
                <KpiCard title="평균 통화 시간" value="12분" trend="+0.5%" isPositive={true} />
              </div>
            </div>

            {/* Kanban View */}
            <div className="flex-1 flex flex-col bg-white">
              {/* Filter Area */}
              <div className="px-6 py-6 shrink-0">
                <div className="border border-gray-300 p-5 flex flex-col gap-4 bg-white">
                  {/* Row 1: Agent & Customer Name */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                      {/* Agent Filter */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-900">담당설계사</span>
                        <div className="relative w-48">
                          <select className="w-full appearance-none border border-gray-300 text-gray-900 text-sm rounded-sm pl-3 pr-8 py-1.5 focus:outline-none focus:border-gray-900 bg-white cursor-pointer">
                            <option>전체</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </div>
                      </div>

                      {/* Customer Name Filter */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-900">고객명</span>
                        <input
                          type="text"
                          className="w-48 px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-900"
                        />
                      </div>
                    </div>

                    {/* Search Buttons */}
                    <div className="flex items-center gap-2">
                      <button className="bg-black text-white px-8 py-1.5 rounded-sm text-sm font-medium hover:bg-gray-800 transition-colors">
                        검색
                      </button>
                      <button 
                        className="p-1.5 text-gray-500 border border-gray-300 hover:bg-gray-50 rounded-sm transition-colors flex items-center justify-center"
                        onClick={() => {
                          setSelectedRegions(['전체']);
                          setDateRangeType('1개월');
                          setStartDate('2024-03-10');
                          setEndDate('2024-04-09');
                        }}
                      >
                        <RotateCw size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Row 2: Date Filter */}
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-sm font-bold text-gray-900">기간</span>
                    <div className="flex items-center gap-1">
                      {['1개월', '3개월', '6개월'].map(type => (
                        <button
                          key={type}
                          className={cn(
                            "px-3 py-1.5 text-sm rounded-sm border transition-colors",
                            dateRangeType === type ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                          )}
                          onClick={() => setDateRangeType(type)}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <div className="relative">
                        <input 
                          type="date" 
                          className="w-32 px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-900" 
                          value={startDate} 
                          onChange={e => setStartDate(e.target.value)} 
                        />
                      </div>
                      <span className="text-gray-500">~</span>
                      <div className="relative">
                        <input 
                          type="date" 
                          className="w-32 px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-900" 
                          value={endDate} 
                          onChange={e => setEndDate(e.target.value)} 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Regions */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-2">
                    {regions.map(region => (
                      <label key={region} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          checked={selectedRegions.includes(region)}
                          onChange={() => toggleRegion(region)}
                        />
                        <span className="text-sm text-gray-900">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

            {/* Board Columns */}
            <div className="flex-1 overflow-x-auto px-6 pb-6 bg-white">
              <div className="flex gap-2 items-stretch min-w-max h-full">
                  
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
          </div>
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
