'use client';

import { PageHeader } from '@/components/shared/page-header';
import { IncidentForm } from '@/components/risk/incident-form';
import { IncidentList } from '@/components/risk/incident-list';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';

const MOCK_TENANT_ID = 'Veralogix'; // As defined in use-user.tsx

export default function RiskPage() {
  const firestore = useFirestore();

  const incidentsColRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'tenants', MOCK_TENANT_ID, 'incidents');
  }, [firestore]);

  const { data: incidents, isLoading } = useCollection(incidentsColRef);

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
          <IncidentList incidents={incidents || []} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
