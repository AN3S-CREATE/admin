"use client"

import { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { productionData } from "@/lib/mock-data"
import { Skeleton } from "@/components/ui/skeleton";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate loading delay
    return () => clearTimeout(timer);
  }, []);


  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <CardTitle>Production Output</CardTitle>
        <CardDescription>Daily tonnes of coal and iron ore produced.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
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
              <Bar dataKey="coal" fill="var(--color-coal)" radius={4} />
              <Bar dataKey="iron" fill="var(--color-iron)" radius={4} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
