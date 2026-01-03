'use server';

/**
 * @fileOverview Generates alert rule configurations from natural language descriptions.
 *
 * - generateAlertRule - A function that generates an alert rule configuration.
 * - GenerateAlertRuleInput - The input type for the generateAlertRule function.
 * - GenerateAlertRuleOutput - The return type for the generateAlertRule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAlertRuleInputSchema = z.object({
  description: z
    .string()
    .describe("The user's natural language description of the alert rule (e.g., 'Alert if plant pressure exceeds X for 10 minutes')."),
});
export type GenerateAlertRuleInput = z.infer<typeof GenerateAlertRuleInputSchema>;

const GenerateAlertRuleOutputSchema = z.object({
  name: z.string().describe('A descriptive name for the alert rule.'),
  configuration: z.string().describe('The generated alert rule configuration in a structured format (e.g., JSON).'),
  preview: z.string().describe('A preview of how the alert would function.'),
  testModeSuggestion: z.string().describe('A suggestion for how to test the rule before enabling it.'),
});
export type GenerateAlertRuleOutput = z.infer<typeof GenerateAlertRuleOutputSchema>;

export async function generateAlertRule(input: GenerateAlertRuleInput): Promise<GenerateAlertRuleOutput> {
  return generateAlertRuleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAlertRulePrompt',
  input: {schema: GenerateAlertRuleInputSchema},
  output: {schema: GenerateAlertRuleOutputSchema},
  prompt: `You are an AI assistant that helps mining operators create alert rules from plain English.
  
  Based on the user's description, generate a structured alert rule configuration.

  User Description: {{{description}}}

  Provide the following:
  - A descriptive name for the rule.
  - The rule configuration itself (as a JSON string).
  - A human-readable preview of what the rule will do.
  - A suggestion for how the user could test this rule in a safe environment.
  `,
});

const generateAlertRuleFlow = ai.defineFlow(
  {
    name: 'generateAlertRuleFlow',
    inputSchema: GenerateAlertRuleInputSchema,
    outputSchema: GenerateAlertRuleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
