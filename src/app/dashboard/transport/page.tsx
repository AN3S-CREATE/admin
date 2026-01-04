'use client';

import { PageHeader } from "@/components/shared/page-header";
import { FleetOverview } from "@/components/transport/fleet-overview";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from 'firebase/firestore';
import type { Vehicle } from "@/types/transport";

const MOCK_TENANT_ID = 'VeraMine';

export default function TransportPage() {
  const firestore = useFirestore();

  const vehiclesColRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'tenants', MOCK_TENANT_ID, 'vehicles');
  }, [firestore]);

  const { data: vehicles, isLoading } = useCollection<Vehicle>(vehiclesColRef);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart Transport"
        description="Trips lifecycle, fleet overview, and exception flags."
      />
      <FleetOverview vehicles={vehicles || []} isLoading={isLoading} />
    </div>
  );
}
