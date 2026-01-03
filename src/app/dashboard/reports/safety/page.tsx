'use client';

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { DateRangePicker } from "@/components/shared/date-range-picker";

export default function SafetyReportPage() {
  return (
    <div className="space-y-8">
       <PageHeader
        title="Safety Scorecard"
        description="An overview of safety performance, including incident rates and compliance status."
      >
        <div className="flex items-center gap-2">
            <DateRangePicker />
            <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
            </Button>
        </div>
      </PageHeader>
      <Card className="glass-card">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Safety metrics and incident reports will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
