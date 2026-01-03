'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Loader2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateAlertRule, type GenerateAlertRuleOutput } from '@/ai/flows/generate-alert-rule';
import { useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Input } from '../ui/input';

const MOCK_TENANT_ID = 'VeraMine'; // As defined in use-user.tsx

export function AlertRuleGenerator() {
  const [description, setDescription] = useState('Alert if plant pressure exceeds 150 PSI for more than 5 minutes.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedRule, setGeneratedRule] = useState<GenerateAlertRuleOutput | null>(null);

  const { toast } = useToast();
  const firestore = useFirestore();

  const handleGenerateRule = async () => {
    if (!description.trim()) {
      toast({
        variant: 'destructive',
        title: 'Description is empty',
        description: 'Please describe the alert rule you want to create.',
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedRule(null);
    try {
      const result = await generateAlertRule({ description });
      setGeneratedRule(result);
      toast({
        title: 'AI Rule Generated',
        description: 'Review the generated rule below and save it.',
      });
    } catch (error) {
      console.error('Error generating alert rule:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate alert rule.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveRule = async () => {
    if (!firestore || !generatedRule) return;

    setIsSaving(true);
    const alertRulesColRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'alertRules');
    
    const newRule = {
      tenantId: MOCK_TENANT_ID,
      name: generatedRule.name,
      description,
      configuration: generatedRule.configuration,
      enabled: false, // Rules are disabled by default
    };

    addDocumentNonBlocking(alertRulesColRef, newRule);

    toast({
        title: "Alert Rule Saved",
        description: `The rule "${generatedRule.name}" has been saved.`
    });

    // Reset form
    setGeneratedRule(null);
    setDescription('');
    setIsSaving(false);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Generate New Alert Rule</CardTitle>
        <CardDescription>Use natural language to create a new alert rule.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">Rule Description</Label>
          <Textarea
            id="description"
            placeholder="e.g., 'Alert if a haul truck enters the main pit geofence.'"
            className="min-h-[100px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isGenerating || isSaving}
          />
        </div>
        <Button onClick={handleGenerateRule} disabled={isGenerating || isSaving} className="w-full font-bold">
          {isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
          Generate with AI
        </Button>

        {generatedRule && (
          <div className="space-y-4 pt-4 border-t border-border mt-4">
             <div className="space-y-2">
                <Label htmlFor="ruleName">Rule Name</Label>
                <Input id="ruleName" value={generatedRule.name} readOnly disabled />
            </div>
            <div className="space-y-2">
                <Label htmlFor="configuration">Generated Configuration (JSON)</Label>
                <Textarea id="configuration" value={generatedRule.configuration} readOnly className="font-mono text-xs min-h-[120px]" disabled />
            </div>
             <div className="space-y-2">
                <Label>Rule Preview</Label>
                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md">{generatedRule.preview}</p>
            </div>
            <div className="space-y-2">
                <Label>Testing Suggestion</Label>
                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md">{generatedRule.testModeSuggestion}</p>
            </div>
          </div>
        )}
      </CardContent>
      {generatedRule && (
        <CardFooter>
            <Button onClick={handleSaveRule} disabled={isSaving || isGenerating} className="w-full">
                {isSaving ? <Loader2 className="animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Rule
            </Button>
        </CardFooter>
      )}
    </Card>
  );
}
