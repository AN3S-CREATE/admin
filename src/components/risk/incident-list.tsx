'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { Skeleton } from '../ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import type { Incident } from '@/types/incident';


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
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : incidents.length === 0 ? (
          <div className="flex h-24 items-center justify-center text-muted-foreground">
            No incidents logged yet.
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {incidents.map((incident) => (
              <AccordionItem value={incident.id} key={incident.id}>
                <AccordionTrigger className="hover:no-underline hover:bg-muted/30 px-4 rounded-md">
                  <div className="flex flex-1 items-center justify-between text-sm">
                    <span className="font-medium max-w-xs truncate text-left">{incident.title}</span>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{incident.classification}</Badge>
                      <span className="hidden md:inline">{format(parseISO(incident.date), 'dd MMM yyyy')}</span>
                      <Badge variant="outline" className={`${statusColors[incident.status]} w-32 justify-center`}>
                        {incident.status}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4 text-muted-foreground space-y-4 bg-muted/20 border-l-2 border-primary/20">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pt-4">
                    <div>
                      <p className="font-semibold text-foreground mb-1">Reported By</p>
                      <p>{incident.reportedBy} on {format(parseISO(incident.date), 'dd MMM yyyy, HH:mm')}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Classification</p>
                      <p>{incident.classification}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Full Description</p>
                    <p>{incident.description}</p>
                  </div>
                  {incident.timeline && (
                    <div>
                      <p className="font-semibold text-foreground mb-1">AI-Generated Timeline</p>
                      <p className="whitespace-pre-wrap">{incident.timeline}</p>
                    </div>
                  )}
                  {incident.causes && (
                    <div>
                      <p className="font-semibold text-foreground mb-1">AI-Generated Causes</p>
                      <p className="whitespace-pre-wrap">{incident.causes}</p>
                    </div>
                  )}
                  {incident.actions && (
                    <div>
                      <p className="font-semibold text-foreground mb-1">AI-Generated Actions</p>
                      <p className="whitespace-pre-wrap">{incident.actions}</p>
                    </div>
                  )}
                   {incident.capaSuggestions && (
                    <div>
                      <p className="font-semibold text-foreground mb-1">AI-Suggested CAPA</p>
                      <p className="whitespace-pre-wrap">{incident.capaSuggestions}</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
