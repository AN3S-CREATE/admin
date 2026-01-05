'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2, SearchCheck, Waypoints, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { triageAnomaly, type TriageAnomalyOutput } from '@/ai/flows/triage-anomalies';
import { Separator } from '../ui/separator';

// Mock data to simulate an anomaly event
const mockAnomaly = {
  anomalyDescription: 'Sudden pressure drop in primary crusher hydraulic line H-12.',
  relevantEvents: 'Crusher motor speed fluctuated wildly 5 minutes prior. High-temperature alarm on bearing B-4 was acknowledged 10 minutes ago.',
  telemetryData: 'Hydraulic pressure dropped from 3000 PSI to 250 PSI in < 10 seconds. Flow rate shows a corresponding spike.',
};

export function AnomalyTriageCard() {
  const [isTriaging, setIsTriaging] = useState(false);
  const [triageResult, setTriageResult] = useState<TriageAnomalyOutput | null>(null);
  const { toast } = useToast();

  const handleTriage = async () => {
    setIsTriaging(true);
    setTriageResult(null);
    try {
      const result = await triageAnomaly(mockAnomaly);
      setTriageResult(result);
      toast({
        title: 'AI Triage Complete',
        description: 'Anomaly has been analyzed. See results below.',
      });
    } catch (error) {
      console.error('Error performing triage:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not perform AI triage.',
      });
    } finally {
      setIsTriaging(false);
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-primary" />
          Anomaly Triage Assistant
        </CardTitle>
        <CardDescription>
          Use AI to analyze an active anomaly and get likely causes and next steps.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm p-3 bg-muted/50 rounded-lg border border-dashed border-primary/20">
            <p className="font-semibold text-foreground">Current Anomaly (Mock Data)</p>
            <p className="text-muted-foreground">{mockAnomaly.anomalyDescription}</p>
        </div>

        <Button onClick={handleTriage} disabled={isTriaging} className="w-full font-bold">
          {isTriaging ? <Loader2 className="animate-spin" /> : 'Triage with AI'}
        </Button>

        {triageResult && (
          <div className="space-y-4 pt-4 border-t border-border mt-4">
            <h3 className="font-semibold text-lg text-center">AI Triage Results</h3>
            
            <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2 text-primary"><SearchCheck/> Likely Causes</h4>
                <ul className="list-disc list-inside text-muted-foreground bg-muted p-3 rounded-md space-y-1 text-sm">
                    {triageResult.likelyCauses.map((cause, i) => <li key={i}>{cause}</li>)}
                </ul>
            </div>

            <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2 text-primary"><Waypoints /> Recommended Next Steps</h4>
                 <ul className="list-decimal list-inside text-muted-foreground bg-muted p-3 rounded-md space-y-1 text-sm">
                    {triageResult.nextSteps.map((step, i) => <li key={i}>{step}</li>)}
                </ul>
            </div>
            
            <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2 text-primary"><Lightbulb /> Analysis</h4>
                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md">{triageResult.observedVsInferred}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
