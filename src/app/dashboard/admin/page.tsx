'use client';

import { PageHeader } from '@/components/shared/page-header';
import { UserInviteForm } from '@/components/admin/user-invite-form';
import { UserList } from '@/components/admin/user-list';
import { mockUsers } from '@/lib/mock-data';

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Console"
        description="Tenant management, site configuration, user access, role assignment, and feature toggle control."
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <UserInviteForm />
        </div>
        <div className="lg:col-span-2">
          <UserList users={mockUsers} />
        </div>
      </div>
    </div>
  );
}
