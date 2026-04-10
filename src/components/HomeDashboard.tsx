import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../lib/utils';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, PieChart, Pie, Cell
} from 'recharts';

// Chart Data
const leadTimeData = [
  { name: '1일 이내', value: 50 },
  { name: '2일', value: 50 },
  { name: '3일', value: 50 },
  { name: '4일 이상', value: 50 },
];

const performanceData = [
  { date: '01.01', 시도율: 12, 성공율: 8, 유효율: 5 },
  { date: '01.08', 시도율: 18, 성공율: 12, 유효율: 8 },
  { date: '01.15', 시도율: 22, 성공율: 18, 유효율: 12 },
  { date: '01.22', 시도율: 25, 성공율: 20, 유효율: 18 },
  { date: '01.29', 시도율: 20, 성공율: 20, 유효율: 20 },
];

const unresponsiveData = [
  { name: '~1일', value: 10 },
  { name: '2~4일', value: 10 },
  { name: '5~7일', value: 10 },
  { name: '8~10일', value: 10 },
  { name: '10일~', value: 10 },
];

const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'];

import { Footer } from './Footer';

export function HomeDashboard() {
  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between shrink-0">
        <div className="flex items-end gap-4">
          <h1 className="text-[19px] font-bold text-gray-900 tracking-tight">홈 대시보드</h1>
          <span className="text-sm text-gray-500 mb-0.5">조직별 주요 현황을 확인할 수 있습니다.</span>
        </div>
        
        {/* Date Range Picker */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-gray-900">기간</span>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input 
                type="text" 
                value="2026.01.01" 
                readOnly 
                className="border border-gray-300 rounded-sm pl-3 pr-10 py-1.5 text-sm w-32 focus:outline-none focus:border-gray-900 bg-white"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            </div>
            <span className="text-gray-500">~</span>
            <div className="relative">
              <input 
                type="text" 
                value="2026.01.31" 
                readOnly 
                className="border border-gray-300 rounded-sm pl-3 pr-10 py-1.5 text-sm w-32 focus:outline-none focus:border-gray-900 bg-white"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Inner Sidebar */}
        <div className="w-[180px] border-r border-gray-200 flex flex-col bg-gray-50/50 shrink-0 overflow-y-auto">
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-800">흥국화재</h2>
          </div>
          <div className="p-2">
            <TreeItem label="문정 사업단" defaultExpanded>
              <TreeItem label="A 지점" defaultExpanded>
                <TreeItem label="A 팀" active />
                <TreeItem label="B 팀" />
                <TreeItem label="C 팀" />
              </TreeItem>
              <TreeItem label="B 지점">
                <TreeItem label="1 팀" />
                <TreeItem label="2 팀" />
              </TreeItem>
            </TreeItem>
            <TreeItem label="강남 사업단">
              <TreeItem label="A 팀" />
              <TreeItem label="B 팀" />
            </TreeItem>
            <TreeItem label="서초 지점">
              <TreeItem label="A 팀" />
              <TreeItem label="B 팀" />
            </TreeItem>
            <TreeItem label="선릉 1팀" />
            <TreeItem label="선릉 2팀" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50/30">
          <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10">
            
            {/* Section 1: 리드 타임 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <h3 className="text-base font-bold text-gray-900">리드 타임</h3>
              </div>
              
              <div className="grid grid-cols-5 gap-4 mb-6">
                <KpiCard title="평균 반응 시간" value="23시간" trend="-1.5h" isPositive={true} />
                <KpiCard title="1일 이내 ( ~ 24시간)" value="50건" trend="+12" isPositive={true} />
                <KpiCard title="2일 ( 25 ~ 48시간)" value="50건" trend="-3" isPositive={true} />
                <KpiCard title="3일 ( 49 ~ 56시간)" value="50건" trend="+5" isPositive={false} />
                <KpiCard title="4일 이상 (57시간 ~)" value="50건" trend="-2" isPositive={true} />
              </div>

              {/* Amplitude Style Chart for Lead Time */}
              <div className="h-[240px] w-full border border-gray-200 rounded-md p-4 bg-white">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leadTimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                    <Tooltip 
                      cursor={{ fill: '#f3f4f6' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Section 2: 성과/품질 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <h3 className="text-base font-bold text-gray-900">성과/품질</h3>
              </div>
              
              <div className="grid grid-cols-5 gap-4 mb-6">
                <KpiCard title="총 배정 수" value="2,000건" trend="+150" isPositive={true} />
                <KpiCard title="평균 통화 시도율" value="20%" trend="+2.1%" isPositive={true} />
                <KpiCard title="평균 통화 성공율" value="20%" trend="-0.5%" isPositive={false} />
                <KpiCard title="평균 유효 통화율" value="20%" trend="+1.2%" isPositive={true} />
                <KpiCard title="평균 통화 시간" value="30:00" trend="+0:45" isPositive={true} />
              </div>

              {/* Amplitude Style Chart for Performance */}
              <div className="h-[280px] w-full border border-gray-200 rounded-md p-4 bg-white">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(val) => `${val}%`} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Line type="monotone" dataKey="시도율" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="성공율" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="유효율" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Section 3: 미 대응 상황 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <h3 className="text-base font-bold text-gray-900">미 대응 상황</h3>
              </div>
              
              <div className="grid grid-cols-5 gap-4 mb-6">
                <KpiCard title="~ 1일" value="10건" trend="-2" isPositive={true} />
                <KpiCard title="2 ~ 4일" value="10건" trend="+3" isPositive={false} />
                <KpiCard title="5 ~ 7일" value="10건" trend="-1" isPositive={true} />
                <KpiCard title="8 ~ 10일" value="10건" trend="+5" isPositive={false} />
                <KpiCard title="10일 ~" value="10건" trend="-4" isPositive={true} />
              </div>

              {/* Amplitude Style Chart for Unresponsive Status */}
              <div className="h-[240px] w-full border border-gray-200 rounded-md p-4 bg-white flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={unresponsiveData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {unresponsiveData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <Footer />
          </div>
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
