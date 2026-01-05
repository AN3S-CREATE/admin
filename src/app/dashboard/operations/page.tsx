'use client';

import { PageHeader } from '@/components/shared/page-header';
import { DowntimeCapture } from '@/components/operations/downtime-capture';
import { ShiftHandover } from '@/components/operations/shift-handover';
import { KpiBoard } from '@/components/operations/kpi-board';
import { ShiftSummaryGenerator } from '@/components/operations/shift-summary-generator';

export default function OperationsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart Operations"
        description="Shift handover, downtime capture, and operational KPIs."
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <KpiBoard />
          <ShiftSummaryGenerator />
        </div>
        <div className="lg:col-span-1 space-y-8">
          <ShiftHandover />
          <DowntimeCapture />
        </div>
      </div>
    </div>
  );
}
