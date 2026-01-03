'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ClipboardPaste, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { useFirestore, useUser } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { addDocumentNonBlocking, setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';

const MOCK_TENANT_ID = 'VeraMine';
const MOCK_SITE_ID = 'SiteA';

export function ShiftHandover() {
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const firestore = useFirestore();
    const { user } = useUser();
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!firestore || !user) {
            toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to perform this action.' });
            return;
        }

        if (!notes.trim()) {
            toast({ variant: 'destructive', title: 'Notes are empty', description: 'Please enter handover notes to submit.' });
            return;
        }

        setIsSubmitting(true);

        // Also log this as a generic event
        const eventsColRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'events');
        const newEvent = {
            tenantId: MOCK_TENANT_ID,
            timestamp: new Date().toISOString(),
            eventType: 'handover',
            actor: user.displayName || user.email,
            payload: {
                siteId: MOCK_SITE_ID,
                summary: notes.substring(0, 100) + (notes.length > 100 ? '...' : ''),
            }
        };
        addDocumentNonBlocking(eventsColRef, newEvent);

        // Save the full summary
        const summariesColRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'shiftSummaries');
        const newSummary = {
            tenantId: MOCK_TENANT_ID,
            siteId: MOCK_SITE_ID,
            summary: notes,
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(), // Placeholder
            sources: ['manual_handover_note'],
        };
        addDocumentNonBlocking(summariesColRef, newSummary);


        toast({
            title: 'Handover Notes Submitted',
            description: 'Your notes have been saved for the next shift.'
        });

        setNotes('');
        setIsSubmitting(false);
    }

    return (
        <Card className="glass-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ClipboardPaste className="h-6 w-6" />
                    Shift Handover Notes
                </CardTitle>
                <CardDescription>
                    Record key information for the next shift manager.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                     <div className='space-y-2'>
                        <Label htmlFor='handover-notes'>Handover Notes</Label>
                        <Textarea 
                            id='handover-notes'
                            placeholder="Enter notes here... e.g., 'Haul truck #5 is due for refueling. Watch for weather changes from the west.'"
                            className="min-h-[120px]"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                         {isSubmitting ? <Loader2 className="animate-spin" /> : 'Submit Handover'}
                    </Button>
                </CardContent>
            </form>
        </Card>
    );
}
