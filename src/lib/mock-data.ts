import type { Incident } from '@/components/risk/incident-list';

export const productionData = [
    { date: '2024-05-01', coal: 4000, iron: 2400 },
    { date: '2024-05-02', coal: 3000, iron: 1398 },
    { date: '2024-05-03', coal: 2000, iron: 9800 },
    { date: '2024-05-04', coal: 2780, iron: 3908 },
    { date: '2024-05-05', coal: 1890, iron: 4800 },
    { date: '2024-05-06', coal: 2390, iron: 3800 },
    { date: '2024-05-07', coal: 3490, iron: 4300 },
    { date: '2024-05-08', coal: 3620, iron: 4100 },
    { date: '2024-05-09', coal: 2980, iron: 3500 },
    { date: '2024-05-10', coal: 4200, iron: 5100 },
    { date: '2024-05-11', coal: 3800, iron: 4500 },
    { date: '2024-05-12', coal: 4100, iron: 4900 },
];

export const downtimeData = [
  { reason: 'Mechanical', hours: 120 },
  { reason: 'Electrical', hours: 85 },
  { reason: 'Operational', hours: 60 },
  { reason: 'Weather', hours: 30 },
  { reason: 'Scheduled', hours: 150 },
];

export const recommendedActionsData = [
  {
    action: 'Investigate recurring conveyor belt C-03 faults.',
    owner: 'Maintenance Team',
    impact: 'Reduce unplanned downtime by an estimated 8%.',
    confidence: 0.92,
    evidenceLinks: ['/dashboard/plant?filter=C-03', '/dashboard/reports/downtime-analysis']
  },
  {
    action: 'Review haul truck #12 telematics for inefficient routes.',
    owner: 'Dispatch',
    impact: 'Potential 5% fuel savings and faster cycle times.',
    confidence: 0.85,
    evidenceLinks: ['/dashboard/transport?vehicle=HT-12', '/dashboard/reports/fuel-efficiency']
  },
  {
    action: 'Schedule refresher safety training for night shift personnel.',
    owner: 'HSE Manager',
    impact: 'Mitigate risk of near-miss incidents observed recently.',
    confidence: 0.98,
    evidenceLinks: ['/dashboard/risk?filter=near-miss', '/dashboard/people/training-matrix']
  }
];

export const mockIncidents: Incident[] = [
  {
    id: 'INC-001',
    title: 'Near-miss with Haul Truck #7',
    date: '2024-05-10T14:30:00Z',
    status: 'Under Investigation',
    classification: 'Safety',
    reportedBy: 'John Doe',
  },
  {
    id: 'INC-002',
    title: 'Conveyor Belt C-03 Failure',
    date: '2024-05-09T08:00:00Z',
    status: 'Closed',
    classification: 'Operational',
    reportedBy: 'Jane Smith',
  },
  {
    id: 'INC-003',
    title: 'Unauthorized Zone Entry',
    date: '2024-05-08T22:15:00Z',
    status: 'CAPA Pending',
    classification: 'Security',
    reportedBy: 'Alex Johnson',
  },
];
