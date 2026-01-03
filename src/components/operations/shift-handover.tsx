'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ClipboardPaste, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';

const MOCK_TENANT_ID = 'VeraMine';
const MOCK_SITE_ID = 'SiteA';

export function ShiftHandover() {
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const firestore = useFirestore();
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!firestore) {
            toast({ variant: 'destructive', title: 'Error', description: 'Firestore is not available.' });
            return;
        }

        if (!notes.trim()) {
            toast({ variant: 'destructive', title: 'Notes are empty', description: 'Please enter handover notes to submit.' });
            return;
        }

        setIsSubmitting(true);

        const summariesColRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'shiftSummaries');
        
        const newSummary = {
            tenantId: MOCK_TENANT_ID,
            siteId: MOCK_SITE_ID,
            summary: notes,
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(), // Placeholder for a real shift end time
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
