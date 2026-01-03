'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting actions with AI.
 *
 * - suggestActions - A function that suggests actions based on the input.
 * - SuggestActionsInput - The input type for the suggestActions function.
 * - SuggestActionsOutput - The output type for the suggestActions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestActionsInputSchema = z.object({
  siteDescription: z.string().describe('A description of the mine site and its current operational status.'),
  recentEvents: z.string().describe('A summary of recent events at the mine site, including any incidents, downtime, or anomalies.'),
  operationalGoals: z.string().describe('The operational goals for the mine site, such as production targets or safety improvements.'),
});
export type SuggestActionsInput = z.infer<typeof SuggestActionsInputSchema>;

const SuggestActionsOutputSchema = z.object({
  suggestedActions: z.array(
    z.object({
      action: z.string().describe('A suggested action to take.'),
      owner: z.string().describe('The person or team responsible for the action.'),
      impact: z.string().describe('The potential impact of the action.'),
      confidence: z.number().describe('The confidence level in the action suggestion (0-1).'),
      evidenceLinks: z.array(z.string()).describe('Links to evidence supporting the action suggestion.'),
    })
  ).describe('A list of suggested actions.'),
});
export type SuggestActionsOutput = z.infer<typeof SuggestActionsOutputSchema>;

export async function suggestActions(input: SuggestActionsInput): Promise<SuggestActionsOutput> {
  return suggestActionsFlow(input);
}

const suggestActionsPrompt = ai.definePrompt({
  name: 'suggestActionsPrompt',
  input: {schema: SuggestActionsInputSchema},
  output: {schema: SuggestActionsOutputSchema},
  prompt: `You are an AI assistant helping mine supervisors proactively address potential issues and improve operational efficiency. Based on the provided site description, recent events, and operational goals, suggest a list of actions that the supervisor should consider taking.

Site Description: {{{siteDescription}}}
Recent Events: {{{recentEvents}}}
Operational Goals: {{{operationalGoals}}}

Consider the following when suggesting actions:
* Safety: Actions that improve the safety of the mine site.
* Efficiency: Actions that improve the efficiency of operations.
* Cost: Actions that reduce costs.
* Compliance: Actions that ensure compliance with regulations.

Format your response as a JSON object with a 'suggestedActions' field. Each action should include the action itself, the owner, the impact, the confidence level, and links to supporting evidence.
`, 
});

const suggestActionsFlow = ai.defineFlow(
  {
    name: 'suggestActionsFlow',
    inputSchema: SuggestActionsInputSchema,
    outputSchema: SuggestActionsOutputSchema,
  },
  async input => {
    const {output} = await suggestActionsPrompt(input);
    return output!;
  }
);
