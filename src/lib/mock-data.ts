import type { Incident } from '@/types/incident';
import type { User } from '@/types/user';
import {
    Activity,
    ArrowUp,
    Truck,
    AlertTriangle,
  } from "lucide-react";

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
    id: 'rec_1',
    action: 'Investigate recurring conveyor belt C-03 faults.',
    owner: 'Maintenance Team',
    impact: 'Reduce unplanned downtime by an estimated 8%.',
    confidence: 0.92,
    evidenceLinks: ['/dashboard/plant?filter=C-03', '/dashboard/reports/downtime-analysis']
  },
  {
    id: 'rec_2',
    action: 'Review haul truck #12 telematics for inefficient routes.',
    owner: 'Dispatch',
    impact: 'Potential 5% fuel savings and faster cycle times.',
    confidence: 0.85,
    evidenceLinks: ['/dashboard/transport?vehicle=HT-12', '/dashboard/reports/fuel-efficiency']
  },
  {
    id: 'rec_3',
    action: 'Schedule refresher safety training for night shift personnel.',
    owner: 'HSE Manager',
    impact: 'Mitigate risk of near-miss incidents observed recently.',
    confidence: 0.98,
    evidenceLinks: ['/dashboard/risk?filter=near-miss', '/dashboard/people/training-matrix']
  }
];

export const statCards = [
    {
      title: "Overall Production",
      value: "14,280 Tonnes",
      icon: Activity,
      trend: "up" as const,
      trendValue: "12.5%",
      period: "vs last month",
    },
    {
      title: "Equipment Uptime",
      value: "98.2%",
      icon: ArrowUp,
      trend: "up" as const,
      trendValue: "1.2%",
      period: "vs last month",
    },
    {
      title: "Fleet Availability",
      value: "89%",
      icon: Truck,
      trend: "down" as const,
      trendValue: "2.1%",
      period: "vs last month",
    },
    {
      title: "Active Alerts",
      value: "3",
      icon: AlertTriangle,
      trend: "static" as const,
      trendValue: "High Priority",
      period: "needs attention",
    },
  ];
