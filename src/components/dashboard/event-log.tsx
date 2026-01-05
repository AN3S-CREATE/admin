'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '../ui/skeleton';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { Activity, ClipboardPaste, ShieldAlert, TimerOff } from 'lucide-react';
import type { Event } from '@/types/event';

const MOCK_TENANT_ID = 'VeraMine'; // As defined in use-user.tsx

const eventTypeConfig: Record<string, { icon: React.ElementType; color: string; }> = {
    downtime: { icon: TimerOff, color: 'text-orange-400' },
    incident: { icon: ShieldAlert, color: 'text-red-400' },
    handover: { icon: ClipboardPaste, color: 'text-blue-400' },
    default: { icon: Activity, color: 'text-primary' },
};


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
              <TableHead className="w-[150px]">Event Type</TableHead>
              <TableHead>Details</TableHead>
              <TableHead className="w-[200px]">Actor</TableHead>
              <TableHead className="text-right w-[150px]">Timestamp</TableHead>
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
              events.map((event) => {
                const config = eventTypeConfig[event.eventType] || eventTypeConfig.default;
                const Icon = config.icon;
                return (
                    <TableRow key={event.id} className="hover:bg-muted/30">
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 ${config.color}`} />
                            <Badge variant="outline" className="capitalize border-primary/40">{event.eventType}</Badge>
                        </div>
                    </TableCell>
                    <TableCell className="font-medium max-w-sm truncate">{getEventDetails(event)}</TableCell>
                    <TableCell className="text-muted-foreground">{event.actor}</TableCell>
                    <TableCell className="text-right text-muted-foreground">
                        {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
                    </TableCell>
                    </TableRow>
                )
              })
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
            return `Asset '${event.payload.assetId}' reported ${event.payload.duration} mins downtime. Reason: ${event.payload.reason}.`;
        case 'incident':
            return `New Incident: '${event.payload.title}' classified as '${event.payload.classification}'.`;
        case 'handover':
            return `Shift handover notes submitted for site '${event.payload.siteId}'.`;
        default:
            return JSON.stringify(event.payload);
    }
}
