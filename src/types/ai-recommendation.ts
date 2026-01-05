export type AiRecommendation = {
  id: string;
  tenantId: string;
  recommendation: string;
  owner: string;
  impact: string;
  confidence: number;
  evidenceLinks: string[];
  verified: boolean | null; // true for accepted, false for rejected, null for neutral
  userId: string;
  timestamp: string;
  model: string;
  prompt: string;
};
