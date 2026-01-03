'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TimerOff } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

export function DowntimeCapture() {
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
            <CardContent className="space-y-4">
                <div className='space-y-2'>
                    <Label htmlFor='downtime-asset'>Asset ID</Label>
                    <Input id='downtime-asset' placeholder='e.g., Crusher-01, HT-004' />
                </div>
                 <div className='space-y-2'>
                    <Label htmlFor='downtime-reason'>Reason Code</Label>
                    <Input id='downtime-reason' placeholder='e.g., Mechanical, Electrical' />
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='downtime-notes'>Notes</Label>
                    <Textarea 
                        id='downtime-notes'
                        placeholder="Add optional notes..."
                        className="min-h-[80px]"
                    />
                </div>
                <Button className="w-full">Log Event</Button>
            </CardContent>
        </Card>
    )
}
