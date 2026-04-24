/**
 * Role: 고객 상세 페이지 루트 — 헤더 + 사이드바 + 탭 컨텐츠 배치
 * Key Features: URL ?tab= 쿼리로 초기 탭 결정, 탭 전환은 로컬 state 관리
 */
import React, { useState } from 'react';
import { CustomerHeader } from './CustomerHeader';
import { CustomerSidebar } from './CustomerSidebar';
import { SummaryTab } from './tabs/SummaryTab';
import { ProductSummaryTab } from './tabs/ProductSummaryTab';
import { ProductDetailTab } from './tabs/ProductDetailTab';
import { AgeCoverageTab } from './tabs/AgeCoverageTab';
import { ConsultationHistoryTab } from './tabs/ConsultationHistoryTab';
import { AIConsultTab } from './tabs/AIConsultTab';
import type { CustomerStatus } from './StatusDropdown';
import { TAB_ORDER, type TabKey } from './mock-data';

// URL ?tab= 쿼리로 초기 탭 결정 — 새 탭 오픈 시 원하는 탭으로 바로 진입하기 위함
const getInitialTab = (): TabKey => {
  const t = new URLSearchParams(window.location.search).get('tab');
  return (TAB_ORDER as string[]).includes(t || '') ? (t as TabKey) : 'summary';
};

export function CustomerDetailPage() {
  const [tab, setTab] = useState<TabKey>(getInitialTab);
  const [status, setStatus] = useState<CustomerStatus>('계약예정');

  return (
    <div className="h-screen flex flex-col bg-white min-w-[1280px]">
      <CustomerHeader status={status} onStatusChange={setStatus} />

      <div className="flex-1 flex overflow-hidden">
        <CustomerSidebar activeTab={tab} onTabChange={setTab} />

        <main className="flex-1 overflow-y-auto bg-bg">
          {tab === 'summary' && <SummaryTab />}
          {tab === 'product-summary' && <ProductSummaryTab />}
          {tab === 'product-detail' && <ProductDetailTab />}
          {tab === 'age-coverage' && <AgeCoverageTab />}
          {tab === 'consultation' && <ConsultationHistoryTab />}
          {tab === 'ai-consult' && <AIConsultTab />}
        </main>
      </div>
    </div>
  );
}
