"use client";

import { useState, useEffect } from 'react';
import { PageHeader } from "@/components/shared/page-header";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { StatCard } from "@/components/dashboard/stat-card";
import { ProductionChart } from "@/components/dashboard/production-chart";
import { DowntimeChart } from "@/components/dashboard/downtime-chart";
import { RecommendedActions, type SuggestedAction } from "@/components/dashboard/recommended-actions";
import {
  Activity,
  ArrowUp,
  Truck,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { suggestActions } from '@/ai/flows/suggest-actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
  const [recommendedActions, setRecommendedActions] = useState<SuggestedAction[]>([]);
  const [isLoadingActions, setIsLoadingActions] = useState(true);

  useEffect(() => {
    const getRecommendations = async () => {
      setIsLoadingActions(true);
      try {
        const result = await suggestActions({
          siteDescription: "A large open-pit iron ore mine in Western Australia. Currently running at 95% capacity.",
          recentEvents: "Recent events include two unplanned downtime incidents on conveyor C-03, a near-miss safety incident involving haul truck #12, and consistently high fuel consumption readings from the haul fleet.",
          operationalGoals: "Primary goal is to increase production by 5% quarter-over-quarter while maintaining a Total Recordable Injury Frequency Rate (TRIFR) below 0.5."
        });
        if (result.suggestedActions) {
          setRecommendedActions(result.suggestedActions);
        }
      } catch (error) {
        console.error("Error fetching AI recommendations:", error);
        // Optionally, set some default or error state actions
        setRecommendedActions([]);
      } finally {
        setIsLoadingActions(false);
      }
    };

    getRecommendations();
  }, []);

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
      
      {isLoadingActions ? (
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary"/>
                <CardTitle className="font-headline">Recommended Actions</CardTitle>
            </div>
            <CardDescription>AI-suggested actions based on recent operational data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      ) : (
        <RecommendedActions actions={recommendedActions} />
      )}
    </div>
  );
}
