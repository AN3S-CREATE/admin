import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart Reporting"
        description="Report gallery with prototype reports, CSV export, and AI narrative."
      />
       <Card className="glass-card">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">The reporting module will be available here. It will feature a gallery of pre-built reports, options for CSV export, and AI-generated narrative summaries for each report.</p>
        </CardContent>
      </Card>
    </div>
  );
}
