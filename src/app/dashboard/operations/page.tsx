import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function OperationsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart Operations"
        description="Shift handover, downtime capture, and shift summary."
      />
      <Card className="glass-card">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">The operations management module will be available here. This includes tools for shift handovers, logging downtime events with reason codes, and viewing an operational KPI board.</p>
        </CardContent>
      </Card>
    </div>
  );
}
