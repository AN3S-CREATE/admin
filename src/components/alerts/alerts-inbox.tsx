'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BellRing, MoreHorizontal, CheckCircle, ShieldAlert } from 'lucide-react';
import { useAlerts, type ActiveAlert } from '@/hooks/use-alerts';
import { Skeleton } from '../ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

export function AlertsInbox() {
  const { alerts, isLoading } = useAlerts();

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BellRing className="h-6 w-6" />
          Active Alerts Inbox
        </CardTitle>
        <CardDescription>
          A real-time view of all triggered alerts requiring attention.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)
          ) : alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-center text-muted-foreground">
              <CheckCircle className="h-10 w-10 text-green-500 mb-2" />
              <p className="font-semibold">All Clear</p>
              <p className="text-sm">No active alerts at this time.</p>
            </div>
          ) : (
            alerts.map(alert => (
              <div key={alert.id} className="flex items-center justify-between p-3 rounded-md bg-muted/50 border border-destructive/20 hover:bg-muted transition-colors">
                <div className="flex items-center gap-4">
                  <ShieldAlert className="h-6 w-6 text-destructive" />
                  <div>
                    <p className="font-semibold">{alert.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Triggered {formatDistanceToNow(new Date(alert.triggeredAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Acknowledge</DropdownMenuItem>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Silence for 1 Hour</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
