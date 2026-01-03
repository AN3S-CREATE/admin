"use client"

import { useState, useEffect } from "react";
import { Pie, PieChart, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { downtimeData } from "@/lib/mock-data"
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  hours: {
    label: "Hours",
  },
  mechanical: {
    label: "Mechanical",
    color: "hsl(var(--chart-1))",
  },
  electrical: {
    label: "Electrical",
    color: "hsl(var(--chart-2))",
  },
  operational: {
    label: "Operational",
    color: "hsl(var(--chart-3))",
  },
  weather: {
    label: "Weather",
    color: "hsl(var(--chart-4))",
  },
  scheduled: {
    label: "Scheduled",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function DowntimeChart() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="glass-card h-full flex flex-col">
      <CardHeader>
        <CardTitle>Downtime by Reason</CardTitle>
        <CardDescription>Total hours of downtime in the last 30 days.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        {isLoading ? (
          <Skeleton className="mx-auto aspect-square h-[250px] w-[250px] rounded-full" />
        ) : (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[250px]">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={downtimeData}
                dataKey="hours"
                nameKey="reason"
                innerRadius={60}
                strokeWidth={5}
              >
                {downtimeData.map((entry) => (
                  <Cell key={`cell-${entry.reason}`} fill={chartConfig[entry.reason.toLowerCase() as keyof typeof chartConfig]?.color || '#ccc'} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
