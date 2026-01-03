"use client"

import { Pie, PieChart, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { downtimeData } from "@/lib/mock-data"

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
  return (
    <Card className="glass-card h-full flex flex-col">
      <CardHeader>
        <CardTitle>Downtime by Reason</CardTitle>
        <CardDescription>Total hours of downtime in the last 30 days.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
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
                <Cell key={`cell-${entry.reason}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
