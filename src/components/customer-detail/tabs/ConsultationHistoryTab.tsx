/**
 * Role: 상담 이력 및 메모 탭 — 타임라인 + 우측 상담 현황 통계
 * Key Features: 세로 타임라인, 통화 상태 뱃지, 메모 카드/입력 폼 (UI만)
 * Notes: 메모 입력/편집/삭제 실제 동작 없음 (스펙 결정)
 */
import React from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { mockTimeline, mockCallStats, type CallStatus } from '../mock-data';

const statusMeta: Record<CallStatus, { label: (d?: string) => string; className: string }> = {
  missed:  { label: () => '부재중',                  className: 'text-danger' },
  valid:   { label: (d) => `유효통화 (${d ?? ''})`,  className: 'text-success' },
  success: { label: (d) => `통화성공 (${d ?? ''})`,  className: 'text-primary' },
};

export function ConsultationHistoryTab() {
  return (
    <div className="flex p-6 gap-6">
      {/* 좌측 — 타임라인 */}
      <div className="flex-1 min-w-0">
        <h2 className="text-[16px] font-semibold text-text-primary mb-6">상담 이력 및 메모</h2>

        <div className="relative pl-6">
          {/* 세로 라인 */}
          <div className="absolute left-2 top-1.5 bottom-0 w-px bg-border-strong" />

          <ul className="flex flex-col gap-8">
            {mockTimeline.map((evt) => (
              <li key={evt.id} className="relative">
                {/* 도트 */}
                <span className="absolute -left-[22px] top-1 w-2.5 h-2.5 rounded-full bg-text-primary ring-2 ring-surface" />

                {/* 제목 라인 */}
                <div className="flex items-center flex-wrap gap-2 text-[13px] mb-2">
                  <span className="font-semibold text-text-primary">{evt.datetime}</span>
                  <span className="text-text-disabled">-</span>
                  <span className="font-semibold text-text-primary">{evt.title}</span>
                  {evt.status && (
                    <span className={cn('font-semibold', statusMeta[evt.status].className)}>
                      {statusMeta[evt.status].label(evt.duration)}
                    </span>
                  )}
                </div>

                {/* 메모 추가 버튼 */}
                <button type="button" className="inline-flex items-center gap-1 text-[12px] text-text-secondary hover:text-text-primary mb-2">
                  <Plus size={13} />
                  <span>상담 메모추가</span>
                </button>

                {/* 메모 입력 폼 (두 번째 이벤트에만 노출) */}
                {evt.id === 'evt-2' && <MemoInputForm />}

                {/* 저장된 메모 카드들 */}
                {evt.memos.map((memo) => (
                  <MemoCard key={memo.id} content={memo.content} createdAt={memo.createdAt} />
                ))}

                {/* 세 번째 이벤트(evt-4)는 기존 메모 + 추가 입력 폼 병존 */}
                {evt.id === 'evt-4' && <MemoInputForm />}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 우측 — 상담 현황 */}
      <aside className="w-[220px] shrink-0">
        <div className="border border-border rounded-lg bg-surface p-5">
          <h3 className="text-[16px] font-semibold text-text-primary mb-4">상담 현황</h3>
          <ul className="flex flex-col gap-3 text-[13px]">
            <Stat label="총 통화 수" value={`${mockCallStats.totalCalls}회`} />
            <Stat label="부재중" value={`${mockCallStats.missedCalls}회`} />
            <Stat label="통화 성공 수" value={`${mockCallStats.successCalls}회`} />
            <Stat label="유효 통화 수" value={`${mockCallStats.validCalls}회`} />
            <Stat label="총 통화 시간" value={mockCallStats.totalTime} />
            <Stat label="평균 통화 시간" value={mockCallStats.averageTime} />
          </ul>
        </div>
      </aside>
    </div>
  );
}

// ── 메모 입력 폼 (UI만) ──
function MemoInputForm() {
  return (
    <div className="mt-1 mb-3">
      <textarea
        className="w-full border border-border rounded-md px-3 py-2 text-[13px] min-h-[72px] resize-none bg-surface focus:outline-none focus:border-primary"
        placeholder="상담 메모를 입력해 주세요."
      />
      <div className="flex justify-end gap-2 mt-2">
        <button type="button" className="px-3 py-1 text-[13px] border border-border rounded-md text-text-secondary hover:bg-bg transition-colors">
          취소
        </button>
        <button type="button" className="px-3 py-1 text-[13px] bg-primary text-white rounded-md hover:bg-primary-hover transition-colors">
          확인
        </button>
      </div>
    </div>
  );
}

// ── 저장된 메모 카드 (UI만) ──
function MemoCard({ content, createdAt }: { content: string; createdAt: string }) {
  return (
    <div className="mt-2 border border-border rounded-md bg-surface px-4 py-3">
      <p className="text-[13px] text-text-secondary leading-relaxed">{content}</p>
      <div className="flex items-center justify-between mt-2.5 text-[12px] text-text-disabled">
        <span>{createdAt}</span>
        <div className="flex items-center gap-1.5">
          <button type="button" className="p-1 hover:text-text-primary transition-colors" aria-label="메모 수정"><Pencil size={13} /></button>
          <button type="button" className="p-1 hover:text-text-primary transition-colors" aria-label="메모 삭제"><Trash2 size={13} /></button>
        </div>
      </div>
    </div>
  );
}

// ── 상담 현황 행 ──
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between">
      <span className="flex items-center gap-1.5 text-text-secondary">
        <span className="w-1 h-1 bg-text-disabled rounded-full" />
        {label}
      </span>
      <span className="font-semibold text-text-primary">{value}</span>
    </li>
  );
}
