import { PageHeader } from "@/components/shared/page-header";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { StatCard } from "@/components/dashboard/stat-card";
import { ProductionChart } from "@/components/dashboard/production-chart";
import { DowntimeChart } from "@/components/dashboard/downtime-chart";
import { RecommendedActions } from "@/components/dashboard/recommended-actions";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Truck,
  AlertTriangle,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Executive Dashboard"
        description="An executive-level view of your entire mining operation."
      >
        <DateRangePicker />
      </PageHeader>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Overall Production"
          value="14,280 Tonnes"
          icon={Activity}
          trend="up"
          trendValue="12.5%"
          period="vs last month"
        />
        <StatCard
          title="Equipment Uptime"
          value="98.2%"
          icon={ArrowUp}
          trend="up"
          trendValue="1.2%"
          period="vs last month"
        />
        <StatCard
          title="Fleet Availability"
          value="89%"
          icon={Truck}
          trend="down"
          trendValue="2.1%"
          period="vs last month"
        />
        <StatCard
          title="Active Alerts"
          value="3"
          icon={AlertTriangle}
          trend="static"
          trendValue="High Priority"
          period="needs attention"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProductionChart />
        </div>
        <div className="lg:col-span-1">
          <DowntimeChart />
        </div>
      </div>
      
      <RecommendedActions />
    </div>
  );
}
