"use client";

import { PageHeader } from "@/components/shared/page-header";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { StatCard } from "@/components/dashboard/stat-card";
import { ProductionChart } from "@/components/dashboard/production-chart";
import { DowntimeChart } from "@/components/dashboard/downtime-chart";
import { RecommendedActions } from "@/components/dashboard/recommended-actions";
import { motion } from "framer-motion";
import { EventLog } from "@/components/dashboard/event-log";
import { Activity, AlertTriangle, ArrowUp, Truck } from "lucide-react";
import { AnomalyTriageCard } from "@/components/dashboard/anomaly-triage-card";

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const statCards = [
    {
      title: "Overall Production",
      value: "14,280 Tonnes",
      icon: Activity,
      trend: "up" as const,
      trendValue: "12.5%",
      period: "vs last month",
    },
    {
      title: "Equipment Uptime",
      value: "98.2%",
      icon: ArrowUp,
      trend: "up" as const,
      trendValue: "1.2%",
      period: "vs last month",
    },
    {
      title: "Fleet Availability",
      value: "89%",
      icon: Truck,
      trend: "down" as const,
      trendValue: "2.1%",
      period: "vs last month",
    },
    {
      title: "Active Alerts",
      value: "3",
      icon: AlertTriangle,
      trend: "static" as const,
      trendValue: "High Priority",
      period: "needs attention",
    },
  ];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Executive Dashboard"
        description="An executive-level view of your entire mining operation."
      >
        <DateRangePicker />
      </PageHeader>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: KPI Cards */}
        <motion.div 
          className="lg:col-span-3 space-y-4"
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

        {/* Center Column: Main Charts */}
        <div className="lg:col-span-6 space-y-8">
          <ProductionChart />
          <DowntimeChart />
        </div>

        {/* Right Column: Actions & Triage */}
        <div className="lg:col-span-3 space-y-8">
          <RecommendedActions />
          <AnomalyTriageCard />
        </div>
      </div>
      <EventLog />
    </div>
  );
}
