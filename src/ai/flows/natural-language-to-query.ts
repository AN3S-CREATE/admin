'use server';

/**
 * @fileOverview Converts natural language queries into structured query/report configurations.
 *
 * - translateNaturalLanguageToQuery - A function that translates natural language queries.
 * - TranslateNaturalLanguageToQueryInput - The input type for the translateNaturalLanguageToQuery function.
 * - TranslateNaturalLanguageToQueryOutput - The return type for the translateNaturalLanguageToQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateNaturalLanguageToQueryInputSchema = z.object({
  naturalLanguageQuery: z
    .string()
    .describe("The user's natural language query (e.g., 'Show downtime by reason code last 7 days for Site A')."),
});
export type TranslateNaturalLanguageToQueryInput = z.infer<
  typeof TranslateNaturalLanguageToQueryInputSchema
>;

const TranslateNaturalLanguageToQueryOutputSchema = z.object({
  queryConfiguration: z
    .string()
    .describe(
      'A saved query/report configuration that corresponds to the natural language query.'
    ),
  confirmationPrompt: z
    .string()
    .describe(
      'A prompt to confirm the filters to avoid hallucinations (e.g., \'Are these filters correct?\').'
    ),
});
export type TranslateNaturalLanguageToQueryOutput = z.infer<
  typeof TranslateNaturalLanguageToQueryOutputSchema
>;

export async function translateNaturalLanguageToQuery(
  input: TranslateNaturalLanguageToQueryInput
): Promise<TranslateNaturalLanguageToQueryOutput> {
  return translateNaturalLanguageToQueryFlow(input);
}

const translateNaturalLanguageToQueryPrompt = ai.definePrompt({
  name: 'translateNaturalLanguageToQueryPrompt',
  input: {schema: TranslateNaturalLanguageToQueryInputSchema},
  output: {schema: TranslateNaturalLanguageToQueryOutputSchema},
  prompt: `You are an AI assistant that translates natural language queries into structured query/report configurations.  Your job is to take the user's query and turn it into a structured query.

User Query: {{{naturalLanguageQuery}}}

Respond with a queryConfiguration that represents a saved query/report configuration and a confirmationPrompt that asks the user to confirm the filters to avoid hallucinations.

Example:
User Query: Show downtime by reason code last 7 days for Site A
queryConfiguration: { \`report: 'downtime', dimensions: ['reasonCode'], filters: [{field: 'site', value: 'Site A'}, {field: 'timeRange', value: '7d'}]\` }
confirmationPrompt: "I'm about to generate a report showing downtime by reason code for 'Site A' over the last 7 days. Does that look correct?"`,
});

const translateNaturalLanguageToQueryFlow = ai.defineFlow(
  {
    name: 'translateNaturalLanguageToQueryFlow',
    inputSchema: TranslateNaturalLanguageToQueryInputSchema,
    outputSchema: TranslateNaturalLanguageToQueryOutputSchema,
  },
  async input => {
    const {output} = await translateNaturalLanguageToQueryPrompt(input);
    return output!;
  }
);
