import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function RiskPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart Risk"
        description="Incident capture, CAPA/actions board, and AI incident drafting."
      />
       <Card className="glass-card">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">The risk management module will be available here. This includes an incident capture system, a board for Corrective and Preventative Actions (CAPA), and an AI assistant for drafting incident reports.</p>
        </CardContent>
      </Card>
    </div>
  );
}
