import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function AlertsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Alerts Engine"
        description="Configure, test, and manage alert rules for your operation."
      />
      <Card className="glass-card">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">The alert rule management module will be available here. This section will allow you to create new rules using natural language, test them in a sandbox, and enable/disable them for your sites.</p>
        </CardContent>
      </Card>
    </div>
  );
}
