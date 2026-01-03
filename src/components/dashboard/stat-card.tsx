"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { motion } from "framer-motion";

type StatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: "up" | "down" | "static";
  trendValue: string;
  period: string;
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  period,
}: StatCardProps) {

  const TrendIcon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : Minus;
  
  const trendColor = trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-orange-400' : 'text-muted-foreground';

  return (
    <motion.div variants={cardVariants}>
      <Card className="glass-card transition-all hover:border-primary/30 h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold font-sans text-primary">{value}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <p className={cn("flex items-center gap-0.5 font-semibold", trendColor)}>
              <TrendIcon className="h-3 w-3" />
              {trendValue}
            </p>
            <span>{period}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
