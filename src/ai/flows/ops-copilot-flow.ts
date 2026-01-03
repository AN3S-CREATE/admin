'use server';

/**
 * @fileOverview A conversational flow for the Ops Copilot.
 *
 * - opsCopilotFlow - A function that handles the conversational chat.
 * - OpsCopilotInput - The input type for the opsCopilotFlow function.
 * - OpsCopilotOutput - The return type for the opsCopilotFlow function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OpsCopilotInputSchema = z.object({
  message: z.string().describe('The user\'s message to the copilot.'),
});
export type OpsCopilotInput = z.infer<typeof OpsCopilotInputSchema>;

const OpsCopilotOutputSchema = z.object({
  response: z.string().describe('The AI copilot\'s response.'),
});
export type OpsCopilotOutput = z.infer<typeof OpsCopilotOutputSchema>;

export async function opsCopilot(input: OpsCopilotInput): Promise<OpsCopilotOutput> {
  return opsCopilotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'opsCopilotPrompt',
  input: {schema: OpsCopilotInputSchema},
  output: {schema: OpsCopilotOutputSchema},
  prompt: `You are an expert AI assistant for mining operations called Ops Copilot. 
  Your goal is to provide helpful and accurate information to the user.
  For now, you are in a conversational mode. Respond to the user's message as helpfully as possible.

  User Message: {{{message}}}
  `,
});

const opsCopilotFlow = ai.defineFlow(
  {
    name: 'opsCopilotFlow',
    inputSchema: OpsCopilotInputSchema,
    outputSchema: OpsCopilotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      return { response: "I'm sorry, I couldn't generate a response." };
    }
    return { response: output.response };
  }
);
