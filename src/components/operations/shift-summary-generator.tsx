'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateShiftSummary } from '@/ai/flows/generate-shift-summary';
import { useFirestore, useUser } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection } from 'firebase/firestore';

const MOCK_TENANT_ID = 'VeraMine';
const MOCK_SITE_ID = 'SiteA';

export function ShiftSummaryGenerator() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedSummary, setGeneratedSummary] = useState<string | null>(null);
    const { toast } = useToast();
    const firestore = useFirestore();
    const { user } = useUser();

    const handleGenerateSummary = async () => {
        if (!firestore || !user) return;
        
        setIsGenerating(true);
        setGeneratedSummary(null);

        try {
            // In a real app, you'd fetch real events and downtime data.
            // For now, we'll use mock data to demonstrate the flow.
            const mockEvents = JSON.stringify([
                { id: 'EVT-001', type: 'downtime', details: 'Crusher-01 stopped for 45 mins.' },
                { id: 'EVT-002', type: 'maintenance', details: 'Haul Truck #5 refueled.' }
            ]);
            const mockDowntime = JSON.stringify([
                { asset: 'Crusher-01', duration: 45, reason: 'Mechanical' }
            ]);

            const result = await generateShiftSummary({
                siteName: MOCK_SITE_ID,
                shiftNumber: 2,
                date: new Date().toISOString().split('T')[0],
                events: mockEvents,
                downtimeData: mockDowntime,
            });

            // Save the generated summary to Firestore
            const summariesColRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'shiftSummaries');
            const newSummary = {
                tenantId: MOCK_TENANT_ID,
                siteId: MOCK_SITE_ID,
                summary: result.summary,
                startTime: new Date().toISOString(),
                endTime: new Date().toISOString(), // Placeholder
                sources: JSON.parse(result.sources),
            };
            addDocumentNonBlocking(summariesColRef, newSummary);
            
            setGeneratedSummary(result.summary);
            toast({
                title: 'AI Summary Generated',
                description: 'The shift summary has been created and saved.',
            });

        } catch (error) {
            console.error("Error generating shift summary:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not generate shift summary.',
            });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Card className="glass-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-6 w-6" />
                    Auto-Generate Shift Summary
                </CardTitle>
                <CardDescription>
                    Use AI to automatically generate a summary for the last shift based on logged events.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button onClick={handleGenerateSummary} disabled={isGenerating} className="w-full font-bold">
                    {isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    Generate Last Shift Summary
                </Button>
                {generatedSummary && (
                    <div className="space-y-2 pt-4 border-t border-border mt-4">
                        <h3 className="font-semibold">Generated Summary:</h3>
                        <p className="text-sm text-muted-foreground p-4 bg-muted rounded-md whitespace-pre-wrap">
                            {generatedSummary}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
