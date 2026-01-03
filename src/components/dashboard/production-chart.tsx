"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { productionData } from "@/lib/mock-data"

const chartConfig = {
  coal: {
    label: "Coal",
    color: "hsl(var(--chart-1))",
  },
  iron: {
    label: "Iron Ore",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ProductionChart() {
  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <CardTitle>Production Output</CardTitle>
        <CardDescription>Daily tonnes of coal and iron ore produced.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={productionData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="coal" radius={4} />
            <Bar dataKey="iron" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
