'use client';

import { useMemo } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { UserInviteForm } from '@/components/admin/user-invite-form';
import { UserList } from '@/components/admin/user-list';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';

const MOCK_TENANT_ID = 'VeraMine'; // As defined in use-user.tsx

export default function AdminPage() {
  const firestore = useFirestore();
  const { user: currentUser } = useUser();

  const usersColRef = useMemoFirebase(() => {
    if (!firestore || !currentUser) return null;
    // Only admins should be able to fetch the user list
    if (currentUser.role !== 'admin') return null;
    return collection(firestore, 'tenants', MOCK_TENANT_ID, 'users');
  }, [firestore, currentUser]);

  const { data: users, isLoading } = useCollection(usersColRef);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Console"
        description="Manage user access, assign roles, and monitor tenant activity."
      >
        <a
          href="/api/screenshots/download"
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Download Screenshots
        </a>
      </PageHeader>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <UserInviteForm />
        </div>
        <div className="lg:col-span-2">
          <UserList users={users || []} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
