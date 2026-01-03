'use server';

/**
 * @fileOverview Generates a draft incident report from free text and selected events.
 *
 * - draftIncidentReport - A function that generates a draft incident report.
 * - DraftIncidentReportInput - The input type for the draftIncidentReport function.
 * - DraftIncidentReportOutput - The return type for the draftIncidentReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DraftIncidentReportInputSchema = z.object({
  freeText: z.string().describe('Free-text description of the incident.'),
  selectedEvents: z.array(z.string()).describe('List of selected event IDs related to the incident.'),
});
export type DraftIncidentReportInput = z.infer<typeof DraftIncidentReportInputSchema>;

const DraftIncidentReportOutputSchema = z.object({
  classification: z.string().describe('Classification of the incident (e.g., safety, security, operational).'),
  timeline: z.string().describe('A structured timeline of the incident events.'),
  causes: z.string().describe('Likely causes of the incident.'),
  actions: z.string().describe('Immediate actions taken in response to the incident.'),
  capaSuggestions: z.string().describe('Corrective and Preventative Actions (CAPA) suggestions.'),
});
export type DraftIncidentReportOutput = z.infer<typeof DraftIncidentReportOutputSchema>;

export async function draftIncidentReport(input: DraftIncidentReportInput): Promise<DraftIncidentReportOutput> {
  return draftIncidentReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'draftIncidentReportPrompt',
  input: {schema: DraftIncidentReportInputSchema},
  output: {schema: DraftIncidentReportOutputSchema},
  prompt: `You are an AI assistant specializing in drafting incident reports for mining operations.
  Based on the provided free text description and selected events, generate a structured incident report.

  Free Text Description: {{{freeText}}}
  Selected Events: {{{selectedEvents}}}

  Include the following sections in the report:
  - Classification: Classify the incident (e.g., safety, security, operational).
  - Timeline: Create a structured timeline of the incident events.
  - Causes: Identify the likely causes of the incident.
  - Actions: Describe the immediate actions taken in response to the incident.
  - CAPA Suggestions: Provide Corrective and Preventative Actions (CAPA) suggestions to prevent future occurrences.

  Format the output as a JSON object with the specified keys.
  `,
});

const draftIncidentReportFlow = ai.defineFlow(
  {
    name: 'draftIncidentReportFlow',
    inputSchema: DraftIncidentReportInputSchema,
    outputSchema: DraftIncidentReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
