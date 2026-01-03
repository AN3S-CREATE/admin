"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { draftIncidentReport } from '@/ai/flows/draft-incident-report';

export function IncidentForm() {
  const [description, setDescription] = useState('Haul truck #7 nearly collided with a light vehicle at the intersection of Haul Road A and B. The LV failed to yield. No injuries, minor vehicle damage.');
  const [isDrafting, setIsDrafting] = useState(false);
  const { toast } = useToast();

  const handleDraftReport = async () => {
    if (!description.trim()) {
      toast({
        variant: "destructive",
        title: "Description is empty",
        description: "Please provide a description of the incident.",
      });
      return;
    }
    
    setIsDrafting(true);
    try {
      const result = await draftIncidentReport({
        freeText: description,
        selectedEvents: ['EVT-123', 'EVT-456'], // Mock event IDs
      });

      toast({
        title: "AI Draft Generated",
        description: (
          <div className="w-full mt-2">
            <h4 className="font-bold">Incident Draft</h4>
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(result, null, 2)}</code>
            </pre>
          </div>
        ),
      });
    } catch (error) {
      console.error("Error drafting incident report:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate AI draft.",
      });
    } finally {
      setIsDrafting(false);
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Log New Incident</CardTitle>
        <CardDescription>
          Capture the details of a new incident or near-miss.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="e.g., Near-miss with Haul Truck #7" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Free-Text Description</Label>
          <Textarea
            id="description"
            placeholder="Describe what happened..."
            className="min-h-[120px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="events">Link Relevant Events</Label>
          <Input id="events" placeholder="Search for event IDs..." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="classification">Classification</Label>
          <Input id="classification" placeholder="e.g., Safety, Operational" />
        </div>

        <div className="flex flex-col gap-2 pt-2">
            <Button
                onClick={handleDraftReport}
                disabled={isDrafting}
                className="w-full font-bold"
            >
                {isDrafting ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                )}
                AI-Draft Full Report
            </Button>
            <Button variant="secondary" className="w-full">
                Submit Manually
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
