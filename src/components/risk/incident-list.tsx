'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { Skeleton } from '../ui/skeleton';

export type Incident = {
  id: string;
  tenantId: string;
  title: string;
  description: string;
  date: string;
  status: 'Under Investigation' | 'Closed' | 'CAPA Pending';
  classification: string;
  reportedBy: string;
};

type IncidentListProps = {
  incidents: Incident[];
  isLoading: boolean;
};

const statusColors: Record<Incident['status'], string> = {
  'Under Investigation': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Closed: 'bg-green-500/20 text-green-400 border-green-500/30',
  'CAPA Pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

export function IncidentList({ incidents, isLoading }: IncidentListProps) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Recent Incidents</CardTitle>
        <CardDescription>A log of all captured safety and operational incidents.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Classification</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-5 w-3/4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-28 rounded-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : incidents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No incidents logged yet.
                </TableCell>
              </TableRow>
            ) : (
              incidents.map((incident) => (
                <TableRow key={incident.id} className="cursor-pointer hover:bg-muted/30">
                  <TableCell className="font-medium max-w-xs truncate">{incident.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{incident.classification}</Badge>
                  </TableCell>
                  <TableCell>{format(parseISO(incident.date), 'dd MMM yyyy, HH:mm')}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[incident.status]}>
                      {incident.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
