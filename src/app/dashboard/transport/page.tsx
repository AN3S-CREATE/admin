'use client';

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { FleetOverview } from "@/components/transport/fleet-overview";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from 'firebase/firestore';
import type { Vehicle } from "@/types/transport";
import { VehicleForm } from "@/components/transport/vehicle-form";

const MOCK_TENANT_ID = 'Veralogix';

export default function TransportPage() {
  const firestore = useFirestore();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const vehiclesColRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'tenants', MOCK_TENANT_ID, 'vehicles');
  }, [firestore]);

  const { data: vehicles, isLoading } = useCollection<Vehicle>(vehiclesColRef);

  const handleEdit = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleFormClose = () => {
    setSelectedVehicle(null);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart Transport"
        description="Manage the vehicle fleet, track trips, and flag exceptions."
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <VehicleForm 
            vehicleToEdit={selectedVehicle} 
            onFormClose={handleFormClose}
          />
        </div>
        <div className="lg:col-span-2">
            <FleetOverview 
                vehicles={vehicles || []} 
                isLoading={isLoading} 
                onEdit={handleEdit}
            />
        </div>
      </div>
    </div>
  );
}
