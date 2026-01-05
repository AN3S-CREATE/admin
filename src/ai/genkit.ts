import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI({
    // It is recommended to use a service account for authentication in production.
    // Visit https://firebase.google.com/docs/genkit/plugins/google-genai#authentication
    // for more information.
  })],
  // Log to a file, to the console, or turn them off completely.
  logLevel: "debug",
  // Correlate related operations with a single trace ID.
  enableTracingAndMetrics: true,
});
