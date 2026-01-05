'use server';
/**
 * @fileOverview This file defines Genkit tools for interacting with Firestore.
 */

import { ai } from '@/ai/genkit';
import { getIncidents } from '@/services/incidents';
import { getVehicles } from '@/services/vehicles';
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


export const getVehiclesTool = ai.defineTool(
  {
    name: 'getVehicles',
    description: 'Retrieves a list of vehicles from the fleet. Can be filtered by vehicle type and/or status.',
    inputSchema: z.object({
      type: z.enum(['Haul Truck', 'Light Vehicle', 'Excavator', 'Dozer']).optional().describe('The type of vehicle to filter by.'),
      status: z.enum(['On Route', 'Idle', 'Maintenance', 'Offline']).optional().describe('The current status of vehicles to filter by.'),
      limit: z.number().optional().default(10).describe('The maximum number of vehicles to return.'),
    }),
    outputSchema: z.array(z.object({
        id: z.string(),
        type: z.string(),
        status: z.string(),
        driver: z.object({
            id: z.string(),
            name: z.string(),
        })
    })),
  },
  async (input) => {
    console.log(`Using getVehiclesTool with input: ${JSON.stringify(input)}`);
    return await getVehicles({ type: input.type, status: input.status }, input.limit);
  }
);
