export type Incident = {
  id: string;
  tenantId: string;
  title: string;
  description: string;
  classification: string;
  timeline?: string;
  causes?: string;
  actions?: string;
  capaSuggestions?: string;
  date: string;
  status: 'Under Investigation' | 'Closed' | 'CAPA Pending';
  reportedBy: string;
};
