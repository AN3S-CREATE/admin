import { config } from 'dotenv';
config();

import '@/ai/flows/generate-shift-summary.ts';
import '@/ai/flows/triage-anomalies.ts';
import '@/ai/flows/natural-language-to-query.ts';
import '@/ai/flows/draft-incident-report.ts';
import '@/ai/flows/generate-report-narrative.ts';
import '@/ai/flows/suggest-actions.ts';
import '@/ai/flows/ops-copilot-flow.ts';
import '@/ai/flows/generate-alert-rule.ts';
import '@/ai/tools/firestore-tools.ts';
