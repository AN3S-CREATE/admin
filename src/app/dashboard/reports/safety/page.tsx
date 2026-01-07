'use client';

import { useState } from 'react';
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Download, Wand2, Loader2, FileText } from "lucide-react";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from 'firebase/firestore';
import { IncidentList } from "@/components/risk/incident-list";
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateReportNarrative } from '@/ai/flows/generate-report-narrative';
import type { Incident } from '@/types/incident';

const MOCK_TENANT_ID = 'Veralogix'; // As defined in use-user.tsx

export default function SafetyReportPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [narrative, setNarrative] = useState<string | null>(null);

  const incidentsColRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'tenants', MOCK_TENANT_ID, 'incidents');
  }, [firestore]);

  const { data: incidents, isLoading } = useCollection<Incident>(incidentsColRef);
  
  const handleExport = () => {
    toast({
      title: 'Export to CSV',
      description: 'This feature is a placeholder in the prototype.',
    });
  };

  const handleGenerateNarrative = async () => {
    if (!incidents || incidents.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No Data Available',
        description: 'There is no incident data to generate a narrative from.',
      });
      return;
    }

    setIsGenerating(true);
    setNarrative(null);
    try {
      // Create summaries from the live incident data
      const reportSummary = `This report covers ${incidents.length} total incidents. The most common classification is '${incidents.reduce((acc, incident) => { acc[incident.classification] = (acc[incident.classification] || 0) + 1; return acc; }, {} as Record<string, number>)[Object.keys(incidents.reduce((acc, incident) => { acc[incident.classification] = (acc[incident.classification] || 0) + 1; return acc; }, {} as Record<string, number>)).reduce((a, b) => (incidents.reduce((acc, incident) => { acc[incident.classification] = (acc[incident.classification] || 0) + 1; return acc; }, {} as Record<string, number>)[a] > incidents.reduce((acc, incident) => { acc[incident.classification] = (acc[incident.classification] || 0) + 1; return acc; }, {} as Record<string, number>)[b] ? a : b))] || 'N/A'}'.`;
      const keyChanges = incidents.slice(0, 2).map(i => `${i.title} (${i.classification})`).join('; ');
      const impactSummary = `The incidents primarily involve near-misses and operational issues, indicating a need for procedural review.`;
      const recommendations = `Focus on root cause analysis for the top incident classifications and review associated training materials.`;
      
      const result = await generateReportNarrative({
        reportSummary,
        keyChanges,
        impactSummary,
        recommendations,
        evidenceLinks: JSON.stringify(incidents.slice(0,3).map(i => `/dashboard/risk#${i.id}`)),
      });
      
      setNarrative(result.narrative);
      toast({
        title: 'AI Narrative Generated',
        description: 'The executive summary has been created below.',
      });

    } catch (error) {
      console.error("Error generating report narrative:", error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate AI narrative.',
      });
    } finally {
      setIsGenerating(false);
    }
  };


  return (
    <div className="space-y-8">
       <PageHeader
        title="Safety Scorecard"
        description="An overview of safety performance, including incident rates and compliance status."
      >
        <div className="flex flex-wrap items-center gap-2">
            <DateRangePicker />
            <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
            </Button>
            <Button onClick={handleGenerateNarrative} disabled={isGenerating}>
              {isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Generate AI Narrative
            </Button>
        </div>
      </PageHeader>
      
      {narrative && (
         <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="text-primary" />
                AI-Generated Narrative
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{narrative}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <IncidentList incidents={incidents || []} isLoading={isLoading} />
      
    </div>
  );
}
