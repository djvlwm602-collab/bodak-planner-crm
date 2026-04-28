/**
 * Role: 조직 트리 사이드바 — 배정 고객 관리, DB 배정 관리 페이지 공통
 * Key Features: 재귀적 트리 아이템, 활성 항목 하이라이트
 * Notes: 왼쪽 화살표 + depth 들여쓰기 — depth당 12px 증가, 추가 장식 없음
 */
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

interface SidebarTreeProps {
  title?: string;
  nodes: TreeNode[];
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export function SidebarTree({
  title = '문정 사업단',
  nodes,
  activeId,
  onSelect,
  className,
}: SidebarTreeProps) {
  return (
    <div
      className={cn(
        'w-[180px] min-w-[180px] max-w-[180px] bg-bg flex flex-col shrink-0 overflow-y-auto',
        className,
      )}
    >
      <div className="px-4 pt-8 pb-3">
        <h2 className="text-body4 font-semibold text-text-primary">{title}</h2>
      </div>
      <div className="p-2">
        {nodes.map((node) => (
          <TreeItem
            key={node.id}
            node={node}
            activeId={activeId}
            onSelect={onSelect}
            defaultExpanded
          />
        ))}
      </div>
    </div>
  );
}

interface TreeItemProps {
  node: TreeNode;
  activeId?: string;
  onSelect?: (id: string) => void;
  defaultExpanded?: boolean;
  depth?: number;
}

function TreeItem({
  node,
  activeId,
  onSelect,
  defaultExpanded = false,
  depth = 0,
}: TreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const hasChildren = (node.children?.length ?? 0) > 0;
  const isActive = activeId === node.id;

  return (
    <div className="flex flex-col">
      <div
        style={{ paddingLeft: `${8 + depth * 12}px` }}
        className={cn(
          'flex items-center gap-1 py-1.5 pr-2 cursor-pointer rounded-md text-body4 transition-colors',
          isActive
            ? 'bg-bg-selected-subtle text-text-strong font-medium'
            : 'text-text-primary hover:bg-bg',
        )}
        onClick={() => {
          if (hasChildren) setIsExpanded((v) => !v);
          onSelect?.(node.id);
        }}
      >
        {/* 화살표 — 자식 있을 때만, 없으면 동일 너비 공백 유지 */}
        <div className="w-4 h-4 flex items-center justify-center shrink-0">
          {hasChildren ? (
            isExpanded
              ? <ChevronDown size={13} className="text-text-secondary" />
              : <ChevronRight size={13} className="text-text-secondary" />
          ) : null}
        </div>
        <span className="truncate">{node.label}</span>
      </div>
      {hasChildren && isExpanded && (
        <div className="flex flex-col mt-0.5">
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              activeId={activeId}
              onSelect={onSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** 5단계 뎁스 예시 포함 기본 트리 데이터 */
export const defaultTreeNodes: TreeNode[] = [
  {
    id: 'branch-a',
    label: 'A 지점',
    children: [
      {
        id: 'team-a1',
        label: 'A 팀',
        children: [
          {
            id: 'group-a1-1',
            label: '1조',
            children: [
              {
                id: 'unit-a1-1-1',
                label: '가 그룹',
                children: [
                  { id: 'member-a1-1-1-1', label: '홍길동' },
                ],
              },
            ],
          },
        ],
      },
      { id: 'team-a2', label: 'B 팀' },
      { id: 'team-a3', label: 'C 팀' },
    ],
  },
  {
    id: 'branch-b',
    label: 'B 지점',
    children: [
      { id: 'team-b1', label: '1 팀' },
      { id: 'team-b2', label: '2 팀' },
    ],
  },
];
