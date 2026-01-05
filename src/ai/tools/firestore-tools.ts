'use server';
/**
 * @fileOverview This file defines Genkit tools for interacting with Firestore.
 */

import { ai } from '@/ai/genkit';
import { getIncidents } from '@/services/incidents';
import { z } from 'genkit';

export const getIncidentsTool = ai.defineTool(
  {
    name: 'getIncidents',
    description: 'Retrieves a list of the most recent incidents. Can be filtered by classification.',
    inputSchema: z.object({
      classification: z.string().optional().describe('The classification of incidents to retrieve (e.g., "Near Miss", "Safety").'),
      limit: z.number().optional().default(5).describe('The maximum number of incidents to return.'),
    }),
    outputSchema: z.array(z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        classification: z.string(),
        date: z.string(),
        status: z.string(),
    })),
  },
  async (input) => {
    console.log(`Using getIncidentsTool with input: ${JSON.stringify(input)}`);
    return await getIncidents(input.classification, input.limit);
  }
);
