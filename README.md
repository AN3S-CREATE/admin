# VeraMine Hub: Technical Engineering Report

**Version:** 1.0
**Date:** 2024-07-29

This document provides a comprehensive, engineering-level technical overview of the VeraMine Hub application. It is intended for developers, architects, and technical stakeholders.

---

## 1. Full Feature Inventory

This section details every implemented feature, including the primary files and modules involved.

### 1.1. Core Application & UI

| Feature | Description | Key Files & Modules |
| :--- | :--- | :--- |
| **Root Layout** | Main HTML shell, font loading, global styles, and provider setup. | `src/app/layout.tsx`, `src/app/globals.css` |
| **Authentication** | User login via Email/Password or Anonymous Guest mode. | `src/app/login/page.tsx`, `src/components/auth/login-form.tsx`, `src/firebase/auth/use-user.tsx` |
| **Dashboard Layout** | Main application shell with persistent sidebar and header. | `src/app/dashboard/layout.tsx`, `src/components/layout/app-sidebar.tsx`, `src/components/layout/app-header.tsx` |
| **Routing** | Handled by Next.js App Router. A root page redirects to login or dashboard. | `src/app/page.tsx` |

### 1.2. Modules & Pages

| Module | Feature | Description | Key Files & Modules |
| :--- | :--- | :--- | :--- |
| **Executive Dashboard**| Main landing page with a high-level operational overview. | `src/app/dashboard/page.tsx` |
| | KPI Stat Cards | Displays key metrics: Production, Uptime, Fleet Availability, Alerts. | `src/components/dashboard/stat-card.tsx` |
| | Production Chart | Bar chart visualizing daily production output. | `src/components/dashboard/production-chart.tsx` |
| | Downtime Chart | Pie chart breaking down downtime by reason code. | `src/components/dashboard/downtime-chart.tsx` |
| | Live Event Log | Real-time, filterable log of system-wide events. | `src/components/dashboard/event-log.tsx` |
| **Smart Transport** | Fleet management module. | `src/app/dashboard/transport/page.tsx` |
| | Fleet Overview | Real-time list of all vehicles, their status, and drivers. | `src/components/transport/fleet-overview.tsx` |
| | Vehicle Form | Add or edit vehicles in the fleet. Data is saved to Firestore. | `src/components/transport/vehicle-form.tsx` |
| **Smart Operations**| Shift and event management. | `src/app/dashboard/operations/page.tsx` |
| | Downtime Capture | Form to log equipment downtime events into Firestore. | `src/components/operations/downtime-capture.tsx` |
| | Shift Handover | Form for submitting shift handover notes. | `src/components/operations/shift-handover.tsx` |
| **Smart Risk** | Incident and risk management. | `src/app/dashboard/risk/page.tsx` |
| | Incident List | Displays all incidents from Firestore in an accordion view. | `src/components/risk/incident-list.tsx` |
| **Smart People** | Personnel overview. | `src/app/dashboard/people/page.tsx` |
| | People List | Displays all users with role, status, and mock compliance data. | `src/components/people/people-list.tsx` |
| **Smart Reporting** | Central hub for all reports. | `src/app/dashboard/reports/page.tsx` |
| | Production Report | Detailed production scorecard page. | `src/app/dashboard/reports/production/page.tsx` |
| | Safety Report | Detailed safety scorecard page. | `src/app/dashboard/reports/safety/page.tsx` |
| **Alerts Engine** | Alert configuration and monitoring. | `src/app/dashboard/alerts/page.tsx` |
| | Alerts Inbox | Displays active alerts based on enabled rules in Firestore. | `src/components/alerts/alerts-inbox.tsx` |
| | Alert Rule List | Manages all alert rules, allowing enable/disable/delete. | `src/components/alerts/alert-rule-list.tsx` |
| **Admin Console** | User and tenant administration. | `src/app/dashboard/admin/page.tsx` |
| | User Management | Lists all users in the tenant with their roles and statuses. | `src/components/admin/user-list.tsx` |
| | User Invitation | Form for admins to create new "pending" user records. | `src/components/admin/user-invite-form.tsx` |
| **Placeholder Modules**| `Plant`, `Tracking`, `Integrations` | These pages are placeholders for future development. | `src/app/dashboard/{plant,tracking,integrations}/page.tsx` |

### 1.3. AI-Powered Features (Genkit)

| Feature | Description | Key Files & Modules |
| :--- | :--- | :--- |
| **Ops Copilot** | Conversational AI chat assistant. Uses tools to fetch live data. | `src/components/copilot/copilot-panel.tsx`, `src/ai/flows/ops-copilot-flow.ts`, `src/ai/tools/firestore-tools.ts` |
| **AI-Suggested Actions** | Dashboard card suggesting actions based on operational data. All suggestions and their guardrail metadata (user, timestamp, model) are persisted to Firestore. | `src/components/dashboard/recommended-actions.tsx`, `src/ai/flows/suggest-actions.ts` |
| **Anomaly Triage** | AI analysis of a simulated anomaly event. | `src/components/dashboard/anomaly-triage-card.tsx`, `src/ai/flows/triage-anomalies.ts` |
| **AI Incident Drafting**| Auto-fills an incident report from a free-text description. | `src/components/risk/incident-form.tsx`, `src/ai/flows/draft-incident-report.ts` |
| **AI Report Narrative**| Generates an executive summary for reports on demand. | `src/app/dashboard/reports/production/page.tsx`, `src/app/dashboard/reports/safety/page.tsx`, `src/ai/flows/generate-report-narrative.ts`|
| **NLQ Search** | Translates natural language into structured query JSON in the header search bar. | `src/components/layout/app-header.tsx`, `src/ai/flows/natural-language-to-query.ts` |
| **AI Alert Rule Generation** | Creates structured alert rule JSON from a plain-text description. | `src/components/alerts/alert-rule-generator.tsx`, `src/ai/flows/generate-alert-rule.ts` |
| **Shift Summary Generation**| Generates a shift summary from mock event data and saves it to Firestore. | `src/components/operations/shift-summary-generator.tsx`, `src/ai/flows/generate-shift-summary.ts` |

---

## 2. Source Code Structure

```
.
├── docs/
│   └── backend.json        # Data entity and Firestore path blueprint
├── public/                 # Static assets (images, fonts, etc.)
├── src/
│   ├── ai/
│   │   ├── flows/          # Genkit flows defining AI agent logic
│   │   ├── tools/          # Genkit tools for AI to interact with services
│   │   ├── dev.ts          # Main entry point for Genkit development server
│   │   └── genkit.ts       # Genkit initialization and configuration
│   ├── app/
│   │   ├── (dashboard)/    # Main application pages
│   │   ├── login/
│   │   ├── app-provider.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Root page (redirect logic)
│   ├── components/
│   │   ├── admin/
│   │   ├── alerts/
│   │   ├── auth/
│   │   ├── copilot/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   ├── operations/
│   │   ├── people/
│   │   ├── reports/
│   │   ├── risk/
│   │   ├── shared/
│   │   ├── transport/
│   │   ├── ui/             # ShadCN UI components
│   │   └── FirebaseErrorListener.tsx
│   ├── firebase/
│   │   ├── auth/
│   │   │   └── use-user.tsx # Hook for getting current user and profile
│   │   ├── firestore/
│   │   │   ├── use-collection.tsx # Real-time collection hook
│   │   │   └── use-doc.tsx      # Real-time document hook
│   │   ├── client-provider.tsx # Client-side Firebase initializer
│   │   ├── config.ts         # Firebase project configuration
│   │   ├── error-emitter.ts  # Typed event emitter for global errors
│   │   ├── errors.ts         # Custom FirestorePermissionError class
│   │   ├── index.ts          # Barrel file for all Firebase exports
│   │   ├── non-blocking-login.tsx
│   │   ├── non-blocking-updates.tsx
│   │   └── provider.tsx      # Core Firebase context provider
│   ├── hooks/
│   │   ├── use-alerts.ts
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/
│   │   ├── mock-data.ts
│   │   ├── placeholder-images.ts
│   │   ├── placeholder-images.json
│   │   └── utils.ts
│   ├── services/
│   │   ├── incidents.ts      # Server-side function for AI to get incidents
│   │   └── vehicles.ts       # Server-side function for AI to get vehicles
│   └── types/                # TypeScript type definitions for data models
├── .env
├── apphosting.yaml
├── firestore.rules         # Firestore security rules
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 3. Key Files and Their Roles

- **`src/app/layout.tsx`**: Root layout for the entire application. Imports global CSS, fonts, and wraps children in the `AppProvider`.
- **`src/app/app-provider.tsx`**: A client-side component that wraps the `FirebaseClientProvider`, ensuring Firebase is initialized only on the client.
- **`src/firebase/index.ts`**: The central hub for Firebase functionality. It initializes the Firebase app and exports all necessary hooks (`useAuth`, `useFirestore`, `useUser`, `useCollection`) for use throughout the application.
- **`src/firebase/provider.tsx`**: Defines the `FirebaseProvider` and the core `useFirebase` hook. It makes the Firebase `app`, `auth`, and `firestore` instances available to all child components via React Context. It also includes the `<FirebaseErrorListener />`.
- **`src/firebase/auth/use-user.tsx`**: A critical custom hook that combines the Firebase Auth `onAuthStateChanged` listener with a real-time Firestore `onSnapshot` listener on the user's profile document. This provides a single, unified `user` object containing both auth state and application-specific profile data (like `role`).
- **`src/firebase/non-blocking-updates.tsx`**: Contains utility functions (`setDocumentNonBlocking`, `addDocumentNonBlocking`, etc.) that perform Firestore write operations. Crucially, these functions do **not** `await` the promise, allowing the UI to remain responsive. Instead, they attach a `.catch()` block to handle and globally emit any security rule errors.
- **`src/firebase/errors.ts` & `src/components/FirebaseErrorListener.tsx`**: These files form the contextual error handling system. `errors.ts` defines a custom `FirestorePermissionError` that captures rich context about a failed operation. `FirebaseErrorListener.tsx` is an invisible component that listens for these errors (via `error-emitter.ts`) and throws them, which are then caught by the Next.js error overlay for easy debugging.
- **`src/ai/genkit.ts`**: Initializes and configures the Genkit instance, specifying the `googleAI` plugin. This is the entry point for all AI functionality.
- **`src/ai/flows/*.ts`**: Each file defines a specific AI capability. It includes Zod schemas for strongly-typed inputs and outputs, and the Handlebars prompt template that instructs the LLM.
- **`src/ai/tools/firestore-tools.ts`**: Defines functions (`getIncidentsTool`, `getVehiclesTool`) that are exposed to the AI as "tools." This allows the AI in `ops-copilot-flow.ts` to decide to call these functions to fetch live data from Firestore via the `src/services` functions.
- **`docs/backend.json`**: A JSON Schema-based definition of all data entities (`User`, `Incident`, etc.) and their locations within the Firestore database. This file serves as a static blueprint and source of truth for the data model.
- **`firestore.rules`**: The security policy for the database. It enforces strict tenant isolation (`isTenantMember`) and role-based access control (`canWriteInTenant`) for all data operations.

---

## 4. Architecture Diagram & Explanation

The application follows a modern, server-enhanced web architecture based on Next.js and Firebase.

**Diagram (ASCII):**

```
+----------------+      +---------------------+      +---------------------+
|   User/Browser | <--> |   Next.js Frontend  | <--> |  Genkit AI Flows    |
| (React/ShadCN) |      | (React Server/Client|      | (Server-side Logic) |
+----------------+      |   Components)       |      +----------+----------+
       |                +----------+----------+                 |
       |                           | (RPC)                      | (Google AI API)
       | (HTTPS/Auth)              |                            |
       |                           |                            v
       |                           |                      +-----------+
       |                           |                      | Gemini LLM|
       |                           |                      +-----------+
       v                           v
+----------+----------+      +---------------------+
| Firebase Services   |      |  Firestore Database |
| (Auth, App Hosting) | <--> | (Data & Security    |
+---------------------+      |    Rules)           |
                             +---------------------+
```

**Explanation:**

1.  **Frontend (Client)**: The user interacts with a Next.js application built with React and ShadCN UI components. Most components are Client Components (`'use client'`) to allow for interactivity and hooks.
2.  **Frontend (Server)**: Next.js renders pages on the server first for performance. The `app/` directory structure dictates the routes.
3.  **Firebase Connection**: On the client, the app initializes a connection to Firebase. All data fetching is done in real-time using `useCollection` and `useDoc` hooks, which subscribe to Firestore snapshots. All data mutations are "non-blocking," providing an optimistic UI.
4.  **Authentication**: Firebase Authentication handles user sign-in. The `useUser` hook listens for auth state changes and fetches the corresponding user profile from Firestore, creating a unified user context.
5.  **Database & Security**: Firestore is the backend database. Security is not handled in application code but is **enforced directly by `firestore.rules`**. Every single read and write from the client is validated against these rules, ensuring tenant isolation and role-based permissions.
6.  **AI Backend (Genkit)**: The AI features are not run in the browser. When a user triggers an AI feature, the frontend makes a server-side call (RPC) to a Genkit Flow.
7.  **Genkit Flows**: These server-side TypeScript functions (`/src/ai/flows`) orchestrate the AI logic. They may call "tools" (`/src/ai/tools`) to fetch data from Firestore (via `/src/services`). They then construct a prompt and make an API call to the Google Gemini LLM. The structured response from the LLM is then returned to the frontend.

---

## 5. Programming Languages & Frameworks

-   **Languages**:
    -   **TypeScript**: Primary language for all frontend and backend logic.
    -   **CSS**: Used for global styles and Tailwind CSS directives.
    -   **Handlebars**: Used within Genkit prompt templates for variable substitution.
    -   **Firestore Rules Language**: A specialized language for defining security rules.
-   **Frameworks & Libraries**:
    -   **Next.js 15**: Core web framework.
    -   **React 19**: UI library.
    -   **Genkit**: Framework for orchestrating AI flows.
    -   **Firebase SDK (v11)**: Client-side SDK for Auth and Firestore.
    -   **Tailwind CSS**: Utility-first CSS framework.
    -   **ShadCN UI / Radix UI**: Unstyled, accessible UI component primitives.
    -   **Zod**: Schema validation for AI flow inputs/outputs.
    -   **Recharts**: Charting library for visualizations.
    -   **Framer Motion**: For UI animations.
    -   **Lucide React**: Icon library.

---

## 6. Build & Deployment Process

-   **Build**: The application is built using the standard Next.js build process.
    -   `npm run build`
-   **Deployment**: The project is configured for deployment via **Firebase App Hosting**.
    1.  A `firebase.json` would be needed to link to the App Hosting backend (not currently present but required for real deployment).
    2.  The `apphosting.yaml` file configures the runtime environment, such as the maximum number of server instances.
    3.  Deployment is typically handled by connecting a GitHub repository to the Firebase App Hosting backend, which provides automatic CI/CD.
-   **Local Git to GitHub Push**: A script (`publish-to-github.sh`) is provided to help the user publish the code to their own GitHub repository from their local machine.
-   **Environment Variables**:
    -   `NEXT_PUBLIC_DEMO_MODE='true'`: Enables the "Continue as Guest" button on the login form.
    -   **Firebase Configuration**: The Firebase SDK configuration is hardcoded in `src/firebase/config.ts`. In a production setup, these should be managed by Firebase App Hosting's built-in environment variables.
    -   `GEMINI_API_KEY`: Required for Genkit to authenticate with the Google AI backend. This should be set in a `.env` file locally or as a secret in the hosting environment.

---

## 7. Testing & Quality Assurance

-   **Security Rules Testing**: The primary testing mechanism for security is the real-time feedback loop created by the `FirestorePermissionError` system. During development, any action that violates a rule immediately throws a detailed error in the browser overlay, showing the exact request context that was denied. This allows for rapid, iterative testing of the security rules.
-   **Static Analysis**: `typescript` and `eslint` are used for static type checking and linting to catch errors before runtime. `tsc --noEmit` can be run to check for type errors.
-   **Unit/Integration Tests**: No formal test suites (e.g., Jest, Playwright) are included in this prototype. However, the architecture is testable:
    -   UI Components can be tested individually.
    -   Genkit flows and services can be tested as isolated server-side functions.

---

## 8. Security & Compliance

-   **Authentication**: Handled by Firebase Authentication. Supports Email/Password and Anonymous providers.
-   **Authorization (Data Access)**: The most critical security feature. Handled entirely by `firestore.rules`.
    -   **Tenant Isolation**: All rules are predicated on a `isTenantMember(tenantId)` check, which verifies that the authenticated user belongs to the tenant whose data is being accessed. This prevents any cross-tenant data leakage.
    -   **Role-Based Access Control (RBAC)**: Write permissions are granted based on the user's role (e.g., `admin`, `ops`) stored in their Firestore profile, using the `canWriteInTenant(tenantId)` function. `viewer` roles are implicitly read-only.
-   **Audit Logging**: The AI flows (`suggest-actions.ts`, `ops-copilot-flow.ts`) are designed to support a structured audit trail. The `suggestActionsFlow`, for example, now persists every recommendation to Firestore, including the user who triggered it, the timestamp, and the model used.
-   **Client-Side Security**: The application disallows critical operations from the client. For example, tenant creation/deletion and user creation (invites only create a pending document) are restricted by security rules, assuming they would be handled by a trusted backend process.

---

## 9. Analytics & Monitoring

-   **Analytics**: A robust foundation for analytics is provided by the `events` collection in Firestore. Every significant action (downtime logs, incident creation, shift handovers) is recorded as a structured document. This data can be easily piped into analytics tools like BigQuery or visualized directly. The `EventLog` component on the dashboard is a simple example of this.
-   **Monitoring & Alerting**: The "Alerts Engine" module is the core of the monitoring system.
    -   Users can define alert rules in plain English, which are converted to JSON configurations by an AI.
    -   These rules are stored in the `alertRules` collection in Firestore.
    -   The `AlertsInbox` component simulates a real-time view of active alerts by querying for rules that are currently `enabled: true`.

---

## 10. Known Issues & TODOs

-   **Incomplete Modules**: The "Smart Plant," "Smart Tracking," and "Smart Integrations" pages are placeholders and contain no functional components.
-   **Mock Data Usage**: Several components still rely on mock data from `src/lib/mock-data.ts` (e.g., `ProductionChart`, `DowntimeChart`) instead of fetching live data from Firestore.
-   **User Invitation Flow**: The current "Invite User" feature only creates a `pending` document in Firestore. A full implementation would require a Cloud Function to create a real Firebase Auth user and send an invitation email.
-   **AI Tool Limitations**: The Ops Copilot's tools are limited to fetching incidents and vehicles. Additional tools would need to be created to answer questions about other data types (e.g., plant telemetry, user compliance).
-   **Hardcoded Tenant ID**: The `MOCK_TENANT_ID` ('VeraMine') is hardcoded throughout the application. A full multi-tenant implementation would require a mechanism to dynamically determine the current tenant (e.g., from the URL subdomain).
-   **Error Handling for AI Flows**: While Firestore errors are handled gracefully, errors within the Genkit flows (e.g., LLM API failures) are currently caught with a generic `console.error` and a user-facing toast message. This could be made more robust.
-   **No Pagination**: Lists (e.g., `IncidentList`, `UserList`) fetch a limited number of documents but do not include UI for paginating through older data.

---

## 11. Appendix

-   **Firebase Genkit Documentation**: [https://firebase.google.com/docs/genkit](https://firebase.google.com/docs/genkit)
-   **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
-   **Firestore Security Rules Documentation**: [https://firebase.google.com/docs/firestore/security/get-started](https://firebase.google.com/docs/firestore/security/get-started)
-   **ShadCN UI Components**: [https://ui.shadcn.com/](https://ui.shadcn.com/)
