'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, TimerOff } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useFirestore, useUser } from '@/firebase';
import { collection } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';

const MOCK_TENANT_ID = 'Veralogix';

export function DowntimeCapture() {
    const [assetId, setAssetId] = useState('Crusher-01');
    const [duration, setDuration] = useState('45');
    const [reason, setReason] = useState('Unscheduled Maintenance');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const firestore = useFirestore();
    const { user } = useUser();
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!firestore || !user) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'You must be logged in to perform this action.',
            });
            return;
        }

        if (!assetId || !duration || !reason) {
             toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please fill out Asset ID, Duration, and Reason.',
            });
            return;
        }

        setIsSubmitting(true);

        const eventsColRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'events');
        
        const newEvent = {
            tenantId: MOCK_TENANT_ID,
            timestamp: new Date().toISOString(),
            eventType: 'downtime',
            actor: user.displayName || user.email,
            payload: {
                assetId,
                duration: parseInt(duration, 10),
                reason,
                notes,
            }
        };

        addDocumentNonBlocking(eventsColRef, newEvent);

        toast({
            title: 'Downtime Event Logged',
            description: `Downtime for ${assetId} has been successfully recorded.`
        });

        // Reset form
        setAssetId('');
        setDuration('');
        setReason('');
        setNotes('');
        setIsSubmitting(false);
    }

    return (
        <Card className="glass-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TimerOff className="h-6 w-6" />
                    Log Downtime Event
                </CardTitle>
                <CardDescription>
                    Quickly capture a new downtime event.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='downtime-asset'>Asset ID</Label>
                            <Input id='downtime-asset' placeholder='e.g., Crusher-01' value={assetId} onChange={e => setAssetId(e.target.value)} disabled={isSubmitting} />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='downtime-duration'>Duration (mins)</Label>
                            <Input id='downtime-duration' type='number' placeholder='e.g., 45' value={duration} onChange={e => setDuration(e.target.value)} disabled={isSubmitting} />
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='downtime-reason'>Reason Code</Label>
                        <Input id='downtime-reason' placeholder='e.g., Unscheduled Maintenance' value={reason} onChange={e => setReason(e.target.value)} disabled={isSubmitting} />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='downtime-notes'>Notes</Label>
                        <Textarea 
                            id='downtime-notes'
                            placeholder="Add optional notes about the cause..."
                            className="min-h-[80px]"
                            value={notes} 
                            onChange={e => setNotes(e.target.value)} 
                            disabled={isSubmitting}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="animate-spin" /> : 'Log Event'}
                    </Button>
                </CardContent>
            </form>
        </Card>
    )
}
