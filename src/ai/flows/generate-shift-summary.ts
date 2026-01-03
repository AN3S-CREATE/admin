'use server';

/**
 * @fileOverview Automatically generates shift summaries for site managers.
 *
 * - generateShiftSummary - A function that generates a shift summary.
 * - GenerateShiftSummaryInput - The input type for the generateShiftSummary function.
 * - GenerateShiftSummaryOutput - The return type for the generateShiftSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateShiftSummaryInputSchema = z.object({
  siteName: z.string().describe('The name of the site.'),
  shiftNumber: z.number().describe('The shift number (e.g., 1, 2, 3).'),
  date: z.string().describe('The date of the shift (YYYY-MM-DD).'),
  events: z.string().describe('JSON array of significant events during the shift.'),
  downtimeData: z.string().describe('JSON array of downtime data during the shift.'),
});
export type GenerateShiftSummaryInput = z.infer<typeof GenerateShiftSummaryInputSchema>;

const GenerateShiftSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the shift.'),
  sources: z.string().describe('JSON array of sources used to generate the summary.'),
});
export type GenerateShiftSummaryOutput = z.infer<typeof GenerateShiftSummaryOutputSchema>;

export async function generateShiftSummary(input: GenerateShiftSummaryInput): Promise<GenerateShiftSummaryOutput> {
  return generateShiftSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateShiftSummaryPrompt',
  input: {schema: GenerateShiftSummaryInputSchema},
  output: {schema: GenerateShiftSummaryOutputSchema},
  prompt: `You are an AI assistant that generates shift summaries for site managers in mining operations. 
  Your goal is to provide a concise summary of key events and operational changes during a specific shift. 
  Use the provided events and downtime data to create the summary.

  Site Name: {{siteName}}
  Shift Number: {{shiftNumber}}
  Date: {{date}}
  Events: {{{events}}}
  Downtime Data: {{{downtimeData}}}

  Summary Guidelines:
  - Focus on key events and operational changes.
  - Include relevant details about downtime incidents and their impact.
  - Mention any significant anomalies or noteworthy occurrences.
  - Keep the summary concise and easy to understand.

  Output Format:
  {
    "summary": "The shift experienced a significant downtime incident due to a conveyor belt malfunction. Production was halted for 2 hours. Key events included ...",
    "sources": ["Event ID: 123", "Downtime Record: 456"]
  }
  `,
});

const generateShiftSummaryFlow = ai.defineFlow(
  {
    name: 'generateShiftSummaryFlow',
    inputSchema: GenerateShiftSummaryInputSchema,
    outputSchema: GenerateShiftSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
