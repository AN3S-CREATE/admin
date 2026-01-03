export type Event = {
  id: string;
  tenantId: string;
  timestamp: string;
  eventType: string;
  actor: string;
  payload: any;
};
