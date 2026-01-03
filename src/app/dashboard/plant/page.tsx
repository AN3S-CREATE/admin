import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function PlantPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart Plant"
        description="Visualize critical plant telemetry with alarm consoles and historical trend charts."
      />
      <Card className="glass-card">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">The plant monitoring module will be available here. This will provide visualizations of critical plant telemetry, including real-time alarm consoles and historical trend charts.</p>
        </CardContent>
      </Card>
    </div>
  );
}
