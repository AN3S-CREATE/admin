export type Event = {
  id: string;
  tenantId: string;
  timestamp: string;
  eventType: string;
  actor: string;
  payload: any; // Using 'any' to match the flexible 'object' with additionalProperties in backend.json
};
