'use server';
/**
 * @fileOverview This file defines a Genkit flow for triaging anomalies.
 *
 * - triageAnomaly - A function that generates a triage card with likely causes and next steps for a given anomaly.
 * - TriageAnomalyInput - The input type for the triageAnomaly function.
 * - TriageAnomalyOutput - The return type for the triageAnomaly function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TriageAnomalyInputSchema = z.object({
  anomalyDescription: z.string().describe('A detailed description of the anomaly that has occurred.'),
  relevantEvents: z.string().optional().describe('A summary of relevant events leading up to the anomaly, if available.'),
  telemetryData: z.string().optional().describe('Relevant telemetry data associated with the anomaly, if available.'),
});
export type TriageAnomalyInput = z.infer<typeof TriageAnomalyInputSchema>;

const TriageAnomalyOutputSchema = z.object({
  likelyCauses: z.array(z.string()).describe('A list of likely causes for the anomaly.'),
  nextSteps: z.array(z.string()).describe('A list of recommended next steps to investigate the anomaly.'),
  observedVsInferred: z.string().describe('Distinguishes between observed facts and inferred conclusions.'),
});
export type TriageAnomalyOutput = z.infer<typeof TriageAnomalyOutputSchema>;

export async function triageAnomaly(input: TriageAnomalyInput): Promise<TriageAnomalyOutput> {
  return triageAnomalyFlow(input);
}

const triageAnomalyPrompt = ai.definePrompt({
  name: 'triageAnomalyPrompt',
  input: {schema: TriageAnomalyInputSchema},
  output: {schema: TriageAnomalyOutputSchema},
  prompt: `You are an expert anomaly triage assistant for a mining operation.

You are provided with a description of an anomaly, relevant events, and telemetry data.

Based on this information, generate a triage card with likely causes and next steps to help the operator quickly assess the situation and take appropriate action.

Anomaly Description: {{{anomalyDescription}}}
Relevant Events: {{{relevantEvents}}}
Telemetry Data: {{{telemetryData}}}

Format your response as a JSON object with the following keys:
- likelyCauses: A list of likely causes for the anomaly.
- nextSteps: A list of recommended next steps to investigate the anomaly.
- observedVsInferred: A brief statement distinguishing between observed facts and inferred conclusions.
`,
});

const triageAnomalyFlow = ai.defineFlow(
  {
    name: 'triageAnomalyFlow',
    inputSchema: TriageAnomalyInputSchema,
    outputSchema: TriageAnomalyOutputSchema,
  },
  async input => {
    const {output} = await triageAnomalyPrompt(input);
    return output!;
  }
);
