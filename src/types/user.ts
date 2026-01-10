export type User = {
  id: string;
  tenantId: string;
  email: string;
  displayName: string | null;
  role: 'admin' | 'ops' | 'hr' | 'safety' | 'viewer';
  status: 'pending' | 'active' | 'disabled';
  invitedAt?: string;
  joinedAt?: string;
};
