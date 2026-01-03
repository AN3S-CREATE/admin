"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";

export type Incident = {
  id: string;
  title: string;
  date: string;
  status: 'Under Investigation' | 'Closed' | 'CAPA Pending';
  classification: string;
  reportedBy: string;
};

type IncidentListProps = {
  incidents: Incident[];
};

const statusColors: Record<Incident['status'], string> = {
    'Under Investigation': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'Closed': 'bg-green-500/20 text-green-400 border-green-500/30',
    'CAPA Pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
}

export function IncidentList({ incidents }: IncidentListProps) {
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
              <TableHead>Incident ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incidents.map((incident) => (
              <TableRow key={incident.id} className="cursor-pointer hover:bg-muted/30">
                <TableCell className="font-medium text-primary/80">{incident.id}</TableCell>
                <TableCell>{incident.title}</TableCell>
                <TableCell>{format(parseISO(incident.date), "dd MMM yyyy, HH:mm")}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[incident.status]}>
                    {incident.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
