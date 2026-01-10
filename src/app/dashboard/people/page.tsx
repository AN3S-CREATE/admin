'use client';

import { PageHeader } from '@/components/shared/page-header';
import { PeopleList } from '@/components/people/people-list';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';

const MOCK_TENANT_ID = 'Veralogix'; // As defined in use-user.tsx

export default function PeoplePage() {
  const firestore = useFirestore();

  const usersColRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'tenants', MOCK_TENANT_ID, 'users');
  }, [firestore]);

  const { data: users, isLoading } = useCollection(usersColRef);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart People"
        description="Onboarding checklist, training matrix, compliance expiry &amp; alerts."
      />
      <PeopleList users={users || []} isLoading={isLoading} />
    </div>
  );
}
