'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { draftIncidentReport, type DraftIncidentReportOutput } from '@/ai/flows/draft-incident-report';
import { useFirestore, useUser } from '@/firebase';
import { collection } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import type { Incident } from './incident-list';

const MOCK_TENANT_ID = 'VeraMine'; // As defined in use-user.tsx

export function IncidentForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(
    'Haul truck #7 nearly collided with a light vehicle at the intersection of Haul Road A and B. The LV failed to yield. No injuries, minor vehicle damage.'
  );
  const [classification, setClassification] = useState('Near Miss');
  const [reportedBy, setReportedBy] = useState('Demo User');

  // State for AI-generated fields
  const [aiDraft, setAiDraft] = useState<Omit<DraftIncidentReportOutput, 'classification'> | null>(null);

  const [isDrafting, setIsDrafting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useUser();

  const handleDraftReport = async () => {
    if (!description.trim()) {
      toast({
        variant: 'destructive',
        title: 'Description is empty',
        description: 'Please provide a description of the incident.',
      });
      return;
    }

    setIsDrafting(true);
    setAiDraft(null);
    try {
      const { classification: aiClassification, ...rest } = await draftIncidentReport({
        freeText: description,
        selectedEvents: ['EVT-123', 'EVT-456'], // Mock event IDs
      });

      // Populate form fields with AI suggestions
      setClassification(aiClassification);
      setAiDraft(rest);
      
      toast({
        title: 'AI Draft Generated',
        description: 'Review the auto-filled fields and submit the report.',
      });

    } catch (error) {
      console.error('Error drafting incident report:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate AI draft.',
      });
    } finally {
      setIsDrafting(false);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !user || !title || !description || !classification) {
        toast({ variant: "destructive", title: "Missing Fields", description: "Please fill out all required fields."});
        return;
    }

    setIsSubmitting(true);
    
    // Also log this as a generic event
    const eventsColRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'events');
    const newEvent = {
        tenantId: MOCK_TENANT_ID,
        timestamp: new Date().toISOString(),
        eventType: 'incident',
        actor: user.displayName || user.email,
        payload: {
            title,
            classification,
        }
    };
    addDocumentNonBlocking(eventsColRef, newEvent);

    const incidentsColRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'incidents');
    const newIncident: Omit<Incident, 'id'> = {
        tenantId: MOCK_TENANT_ID,
        title,
        description,
        date: new Date().toISOString(),
        status: 'Under Investigation',
        classification,
        reportedBy,
        timeline: aiDraft?.timeline || '',
        causes: aiDraft?.causes || '',
        actions: aiDraft?.actions || '',
        capaSuggestions: aiDraft?.capaSuggestions || '',
    };

    addDocumentNonBlocking(incidentsColRef, newIncident);

    // Immediate feedback, not waiting for promise
    toast({
        title: "Incident Logged",
        description: `${title} has been submitted for investigation.`
    });

    // Reset form
    setTitle('');
    setDescription('');
    setClassification('');
    setReportedBy('Demo User');
    setAiDraft(null);
    setIsSubmitting(false);
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Log New Incident</CardTitle>
        <CardDescription>Capture the details of a new incident or near-miss.</CardDescription>
      </CardHeader>
      <form onSubmit={handleManualSubmit}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="e.g., Near-miss with Haul Truck #7" value={title} onChange={e => setTitle(e.target.value)} disabled={isDrafting || isSubmitting} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Free-Text Description</Label>
          <Textarea
            id="description"
            placeholder="Describe what happened..."
            className="min-h-[120px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isDrafting || isSubmitting}
          />
        </div>
         <div className="space-y-2">
          <Label htmlFor="classification">Classification</Label>
          <Input id="classification" placeholder="e.g., Safety, Operational" value={classification} onChange={e => setClassification(e.target.value)} disabled={isDrafting || isSubmitting} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reportedBy">Reported By</Label>
          <Input id="reportedBy" placeholder="Your Name" value={reportedBy} onChange={e => setReportedBy(e.target.value)} disabled={isDrafting || isSubmitting} />
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Button onClick={handleDraftReport} disabled={isDrafting || isSubmitting} className="w-full font-bold" type="button">
            {isDrafting ? <Loader2 className="animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
            AI-Draft Report
          </Button>
          <Button variant="secondary" type="submit" className="w-full" disabled={isDrafting || isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            Submit Manually
          </Button>
        </div>
      </CardContent>
      </form>
    </Card>
  );
}
