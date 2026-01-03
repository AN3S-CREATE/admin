import { PageHeader } from "@/components/shared/page-header";
import { IncidentForm } from "@/components/risk/incident-form";
import { IncidentList } from "@/components/risk/incident-list";
import { mockIncidents } from "@/lib/mock-data";

export default function RiskPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart Risk"
        description="Incident capture, CAPA/actions board, and AI incident drafting."
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
            <IncidentForm />
        </div>
        <div className="lg:col-span-2">
            <IncidentList incidents={mockIncidents} />
        </div>
      </div>
    </div>
  );
}
