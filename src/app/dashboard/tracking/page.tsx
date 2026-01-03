import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function TrackingPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart Tracking"
        description="Device assignment, location pings, geofences, and muster list."
      />
      <Card className="glass-card">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">The personnel and asset tracking module will be available here. This section will feature device assignment, live location pings, geofence management, and emergency muster lists.</p>
        </CardContent>
      </Card>
    </div>
  );
}
