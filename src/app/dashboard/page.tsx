"use client";

import { PageHeader } from "@/components/shared/page-header";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { StatCard } from "@/components/dashboard/stat-card";
import { ProductionChart } from "@/components/dashboard/production-chart";
import { DowntimeChart } from "@/components/dashboard/downtime-chart";
import { RecommendedActions } from "@/components/dashboard/recommended-actions";
import { motion } from "framer-motion";
import { recommendedActionsData, statCards } from '@/lib/mock-data';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Executive Dashboard"
        description="An executive-level view of your entire mining operation."
      >
        <DateRangePicker />
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
      
      <RecommendedActions actions={recommendedActionsData} />
    </div>
  );
}
