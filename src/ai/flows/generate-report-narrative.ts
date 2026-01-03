'use server';

/**
 * @fileOverview Generates a narrative summary for a given report.
 *
 * - generateReportNarrative - A function that generates the report narrative.
 * - GenerateReportNarrativeInput - The input type for the generateReportNarrative function.
 * - GenerateReportNarrativeOutput - The return type for the generateReportNarrative function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReportNarrativeInputSchema = z.object({
  reportSummary: z.string().describe('A detailed summary of the report.'),
  keyChanges: z.string().describe('A summary of the key changes in the report.'),
  impactSummary: z.string().describe('A summary of the impact of the changes.'),
  recommendations: z.string().describe('Recommended actions based on the report findings.'),
  evidenceLinks: z.string().describe('Links to supporting evidence for the report.'),
});
export type GenerateReportNarrativeInput = z.infer<typeof GenerateReportNarrativeInputSchema>;

const GenerateReportNarrativeOutputSchema = z.object({
  narrative: z.string().describe('A short narrative summarizing the report.'),
});
export type GenerateReportNarrativeOutput = z.infer<typeof GenerateReportNarrativeOutputSchema>;

export async function generateReportNarrative(input: GenerateReportNarrativeInput): Promise<GenerateReportNarrativeOutput> {
  return generateReportNarrativeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReportNarrativePrompt',
  input: {schema: GenerateReportNarrativeInputSchema},
  output: {schema: GenerateReportNarrativeOutputSchema},
  prompt: `You are an expert analyst summarizing reports for quick understanding.

  Based on the following information, generate a concise 5-10 line narrative summarizing the report, highlighting key changes, their impact, and recommended actions, with citations to supporting evidence.

  Report Summary: {{{reportSummary}}}
  Key Changes: {{{keyChanges}}}
  Impact Summary: {{{impactSummary}}}
  Recommendations: {{{recommendations}}}
  Evidence Links: {{{evidenceLinks}}}
  `,
});

const generateReportNarrativeFlow = ai.defineFlow(
  {
    name: 'generateReportNarrativeFlow',
    inputSchema: GenerateReportNarrativeInputSchema,
    outputSchema: GenerateReportNarrativeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
