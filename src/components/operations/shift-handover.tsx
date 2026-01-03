'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ClipboardPaste } from 'lucide-react';
import { Label } from '../ui/label';

export function ShiftHandover() {
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
            <CardContent className="space-y-4">
                 <div className='space-y-2'>
                    <Label htmlFor='handover-notes'>Handover Notes</Label>
                    <Textarea 
                        id='handover-notes'
                        placeholder="Enter notes here... e.g., 'Haul truck #5 is due for refueling. Watch for weather changes from the west.'"
                        className="min-h-[120px]"
                    />
                </div>
                <Button className="w-full">Submit Handover</Button>
            </CardContent>
        </Card>
    )
}
