import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function PeoplePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart People"
        description="Onboarding checklist, training matrix, compliance expiry &amp; alerts."
      />
      <Card className="glass-card">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">The personnel management module will be available here. This will feature onboarding checklists, a skills and training matrix, and alerts for compliance expiry.</p>
        </CardContent>
      </Card>
    </div>
  );
}
