import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Console"
        description="Tenant management, site configuration, user access, role assignment, and feature toggle control."
      />
      <Card className="glass-card">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Admin-level controls and configurations will be available here. This includes managing tenants, users, roles, and system-wide settings.</p>
        </CardContent>
      </Card>
    </div>
  );
}
