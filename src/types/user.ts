export type User = {
  id: string;
  email: string;
  displayName: string | null;
  role: 'admin' | 'ops' | 'hr' | 'safety' | 'viewer';
  status: 'pending' | 'active' | 'disabled';
};
