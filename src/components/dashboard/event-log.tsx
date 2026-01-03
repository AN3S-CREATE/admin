'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '../ui/skeleton';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { Activity } from 'lucide-react';
import type { Event } from '@/types/event';

const MOCK_TENANT_ID = 'VeraMine'; // As defined in use-user.tsx

export function EventLog() {
  const firestore = useFirestore();

  const eventsColRef = useMemoFirebase(() => {
    if (!firestore) return null;
    const baseRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'events');
    return query(baseRef, orderBy('timestamp', 'desc'), limit(10));
  }, [firestore]);

  const { data: events, isLoading } = useCollection<Event>(eventsColRef);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Activity className="h-6 w-6" />
            Live Event Log
        </CardTitle>
        <CardDescription>A real-time stream of the latest events across the operation.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Type</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead className="text-right">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-2/3" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-5 w-20 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : !events || events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No events to display.
                </TableCell>
              </TableRow>
            ) : (
              events.map((event) => (
                <TableRow key={event.id} className="hover:bg-muted/30">
                  <TableCell>
                    <Badge variant="outline" className="capitalize border-primary/40">{event.eventType}</Badge>
                  </TableCell>
                  <TableCell className="font-medium max-w-sm truncate">{getEventDetails(event)}</TableCell>
                  <TableCell className="text-muted-foreground">{event.actor}</TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
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

function getEventDetails(event: Event): string {
    switch(event.eventType) {
        case 'downtime':
            return `Asset ${event.payload.assetId} reported ${event.payload.duration} mins downtime due to ${event.payload.reason}.`;
        case 'incident':
            return `Incident reported: ${event.payload.title}`;
        case 'handover':
            return `Shift handover notes submitted for ${event.payload.siteId}.`;
        default:
            return JSON.stringify(event.payload);
    }
}
