'use client';

import { PageHeader } from '@/components/shared/page-header';
import { ReportCard } from '@/components/reports/report-card';
import { FileText, Shield, Activity, AlertTriangle } from 'lucide-react';

const reports = [
  {
    title: 'Production Scorecard',
    description: 'A summary of production KPIs including output, uptime, and efficiency metrics.',
    href: '/dashboard/reports/production',
    icon: Activity,
  },
  {
    title: 'Safety Scorecard',
    description: 'An overview of safety performance, including incident rates and compliance status.',
    href: '/dashboard/reports/safety',
    icon: Shield,
  },
  {
    title: 'Downtime Analysis',
    description: 'Deep dive into downtime events, causes, and impact on production.',
    href: '#',
    icon: FileText,
  },
    {
    title: 'Fuel Consumption Report',
    description: 'Track and analyze fuel usage across the entire vehicle fleet.',
    href: '#',
    icon: FileText,
  },
  {
    title: 'Incidents by Classification',
    description: 'Review a breakdown of all incidents by their classification.',
    href: '#',
    icon: AlertTriangle,
  }
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart Reporting"
        description="Report gallery with prototype reports, CSV export, and AI narrative."
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <ReportCard
            key={report.title}
            href={report.href}
            title={report.title}
            description={report.description}
            icon={report.icon}
          />
        ))}
      </div>
    </div>
  );
}
