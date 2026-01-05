'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { DateRangePicker } from '@/components/shared/date-range-picker';
import { StatCard } from '@/components/dashboard/stat-card';
import { ProductionChart } from '@/components/dashboard/production-chart';
import { DowntimeChart } from '@/components/dashboard/downtime-chart';
import { motion } from 'framer-motion';
import { statCards, productionData } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Download, Wand2, Loader2, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateReportNarrative } from '@/ai/flows/generate-report-narrative';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ProductionReportPage() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [narrative, setNarrative] = useState<string | null>(null);

  const handleExport = () => {
    toast({
      title: 'Export to CSV',
      description: 'This feature is a placeholder in the prototype.',
    });
  };

  const handleGenerateNarrative = async () => {
    setIsGenerating(true);
    setNarrative(null);
    try {
      // In a real app, you'd dynamically generate these summaries from the report data.
      const mockReportSummary = `The report covers production from ${productionData[0].date} to ${productionData[productionData.length-1].date}. Total production was ${statCards[0].value}.`;
      const mockKeyChanges = `Production shows an upward trend of ${statCards[0].trendValue}. Equipment uptime is at ${statCards[1].value}.`;
      const mockImpactSummary = `The primary driver of downtime was 'Scheduled' maintenance, accounting for a large portion of non-productive hours.`;
      const mockRecommendations = `Consider optimizing scheduled maintenance windows to reduce their impact on overall production time.`;
      
      const result = await generateReportNarrative({
        reportSummary: mockReportSummary,
        keyChanges: mockKeyChanges,
        impactSummary: mockImpactSummary,
        recommendations: mockRecommendations,
        evidenceLinks: "[]", // No links for this example
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
        title="Production Scorecard"
        description="An overview of production KPIs including output, uptime, and efficiency metrics."
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

      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {statCards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            trend={card.trend}
            trendValue={card.trendValue}
            period={card.period}
          />
        ))}
      </motion.div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProductionChart />
        </div>
        <div className="lg:col-span-1">
          <DowntimeChart />
        </div>
      </div>
    </div>
  );
}
