'use client';

import { PageHeader } from "@/components/shared/page-header";
import { FleetOverview } from "@/components/transport/fleet-overview";
import { fleetData } from "@/lib/transport-data";

export default function TransportPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart Transport"
        description="Trips lifecycle, fleet overview, and exception flags."
      />
      <FleetOverview vehicles={fleetData} />
    </div>
  );
}
