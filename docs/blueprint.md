# **App Name**: VeraMine Hub

## Core Features:

- Authentication and Authorization: Secure multi-tenant access using Firebase Auth, with role-based access control (RBAC) to manage user permissions within the platform. Includes demo login panel.
- Admin Console: Tenant management, site configuration, user access, role assignment, and feature toggle control.
- Real-time Unified Event Ingestion: A scalable ingestion pipeline via Cloud Functions to collect raw payloads and transform those events for storage.
- Executive Dashboard: Executive-level view, filtered for tenants and roles.
- Smart Transport Module: A way to observe transportation vehicles in the mining operations in order to ensure mine safety.
- Smart Plant Monitoring: Visualize critical plant telemetry with alarm consoles and historical trend charts to get up to date metrics.
- AI Ops Copilot: A conversational tool that uses generative AI to provide insights into operational changes and incidents, answering questions based on events and downtime data.
- Shift/Day Auto-Summaries: Scheduled function creates daily + shift summaries per site, storing the summary and sources used.
- Recommended Actions Engine: Overview page panel showing 3 AI-suggested actions with owner, impact, confidence, and evidence links. Stores recommendations, sources, and user acceptance.
- Anomaly Triage Assistant: Generates a triage card on abnormal spikes (alarms/downtime/events) with likely causes, next checks, and linked evidence, distinguishing observed vs inferred.
- Incident Drafting Assistant: Turns free-text + selected events into a structured incident draft with classification, timeline, causes, actions, and CAPA suggestions, allowing human edits before saving.
- Report Narratives: Generates a 5–10 line narrative for each exportable report, summarizing changes, impact, and recommended actions with cited evidence.
- Natural-Language-to-Insights: Converts user's natural language queries (e.g., 'Show downtime by reason code last 7 days for Site A') into saved query/report configurations, confirming filters to avoid hallucinations.
- Alert Rule Generator: Generates alert rule configurations from user descriptions (e.g., 'Alert if plant pressure exceeds X for 10 minutes'), providing a preview and test mode before enabling.
- Smart Reporting: Report gallery with 2 prototype reports, CSV export, and AI narrative.
- Smart People: Onboarding checklist, training matrix, compliance expiry + alerts.
- Smart Risk: Incident capture + CAPA/actions board + AI incident drafting.
- Smart Operations: Shift handover + downtime capture + shift summary.
- Smart Transport: Trips lifecycle + fleet overview + exception flags.
- Smart Tracking: Device assignment + location pings + geofences + muster list.
- Smart Plant: Alarms console + trend charts.
- Smart Data & Integrations: Connector registry + mapping UI (v1) + ingestion logs viewer.

## Style Guidelines:

- Primary color: Accent Primary, a bright lime green (#D2FF05) symbolizing activity, tech and life.
- Background color: A very dark desaturated blue, mimicking a deep space, and providing maximum contrast (#0B0E15).
- Accent color: Accent Secondary, a forest green (#9AD153), providing depth.
- Headings: 'Space Grotesk' sans-serif ExtraBold for a tech-inspired, modern feel.
- Body: 'Inter' sans-serif Regular/Medium for readability and a neutral appearance.
- Numbers: 'Inter' sans-serif SemiBold for emphasizing numerical data.
- Use minimal line icons in white, with status icons sparingly using Accent Primary.
- Employ a 12-column grid system and an 8pt spacing system (8/16/24/32/48) for consistent spacing and alignment.
- Implement dark glass panels with faint blur and thin lime/grey stroke.
- Use neon 'data path' lines and subtle HUD ticks for visual interest.
- Use Framer Motion for subtle animations, including route transitions (fade + slight y shift) and KPI card entrances (opacity + 0.98 scale).
- alert badge pulse on new alerts
- Use skeleton loaders for tables/charts