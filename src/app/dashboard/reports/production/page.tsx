'use client';

import { PageHeader } from '@/components/shared/page-header';
import { DateRangePicker } from '@/components/shared/date-range-picker';
import { StatCard } from '@/components/dashboard/stat-card';
import { ProductionChart } from '@/components/dashboard/production-chart';
import { DowntimeChart } from '@/components/dashboard/downtime-chart';
import { motion } from 'framer-motion';
import { statCards } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ProductionReportPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Production Scorecard"
        description="An overview of production KPIs including output, uptime, and efficiency metrics."
      >
        <div className="flex items-center gap-2">
            <DateRangePicker />
            <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
            </Button>
        </div>
      </PageHeader>
      
      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {statCards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            trend={card.trend}
            trendValue={card.trendValue}
            period={card.period}
          />
        ))}
      </motion.div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProductionChart />
        </div>
        <div className="lg:col-span-1">
          <DowntimeChart />
        </div>
      </div>
    </div>
  );
}
