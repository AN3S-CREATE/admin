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
import { getIncidentsTool, getVehiclesTool } from '../tools/firestore-tools';

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
  tools: [getIncidentsTool, getVehiclesTool],
  system: `You are an expert AI assistant for mining operations called Ops Copilot. 
  Your goal is to provide helpful and accurate information to the user.
  
  You have access to tools that can retrieve live data from the operation's database, including incidents and the vehicle fleet.
  When a user asks a question that requires information about incidents, events, vehicles, or other operational data,
  you MUST use the available tools to fetch that information.

  Do not invent or hallucinate facts. If the tools do not provide the information, state that you
  do not have access to that information and suggest what data might be needed.
  
  When you provide an answer based on tool output, be sure to cite the source of the information.
  `,
  prompt: `User Message: {{{message}}}`,
});

const opsCopilotFlow = ai.defineFlow(
  {
    name: 'opsCopilotFlow',
    inputSchema: OpsCopilotInputSchema,
    outputSchema: OpsCopilotOutputSchema,
  },
  async input => {
    const llmResponse = await prompt(input);
    const { output, history } = llmResponse;
    if (!output) {
      return { response: "I'm sorry, I couldn't generate a response." };
    }
    
    // Log tool usage for guardrails/auditing
    const toolCalls = history.filter(m => m.role === 'tool');
    if (toolCalls.length > 0) {
      console.log('OpsCopilot used the following tools:', toolCalls.map(t => t.content[0].toolRequest.name).join(', '));
    }

    return { response: output.response };
  }
);
