# VeraMine Hub: Application Overview

VeraMine Hub is a comprehensive, AI-powered operational management platform designed for the mining industry. It serves as a central nervous system, integrating real-time data from various operational silos into a single, intuitive interface. The platform provides executive dashboards, detailed module-specific pages, and powerful AI-driven tools to enhance safety, efficiency, and decision-making.

This document provides a detailed overview of the application's features, architecture, and technical implementation.

---

## 1. All Features & Capabilities

VeraMine Hub is organized into several key modules, each targeting a specific area of mining operations.

### Core Modules & User-Facing Functions

*   **Executive Dashboard:** A high-level, real-time view of the entire operation.
    *   **KPI Stat Cards:** At-a-glance cards for key metrics like Overall Production, Equipment Uptime, Fleet Availability, and Active Alerts, with trend indicators.
    *   **Production & Downtime Charts:** Visualizations of production output over time and a breakdown of downtime reasons.
    *   **Live Event Log:** A real-time stream of significant events across the operation, filterable by type (e.g., downtime, incident, handover).

*   **Smart Transport:** Fleet management and logistics.
    *   **Fleet Overview:** A real-time table of all vehicles, showing their ID, type, status, and assigned driver.
    *   **Vehicle Management:** A form to add new vehicles to the fleet or edit existing ones.

*   **Smart Plant:** (Placeholder) Intended for visualizing plant telemetry, managing alarms, and viewing historical trend data.

*   **Smart Operations:** Tools for shift and event management.
    *   **Shift Handover:** A form for shift managers to submit crucial notes for the next shift.
    *   **Downtime Capture:** A quick-capture form to log downtime events, including asset ID, duration, and reason.

*   **Smart Risk:** Incident management and reporting.
    *   **Incident Capture:** A form to log new safety or operational incidents and near-misses.
    *   **Recent Incidents List:** An accordion-style list of all logged incidents, with detailed views.

*   **Smart People:** Personnel management and compliance.
    *   **People Profiles:** A list of all personnel, showing their role, status, and a mock compliance progress bar.

*   **Smart Reporting:** A gallery of pre-built reports.
    *   **Production Scorecard:** A detailed report with KPIs, charts, and an AI narrative generation feature.
    *   **Safety Scorecard:** An incident-focused report, also featuring AI-generated narratives.

*   **Smart Tracking & Integrations:** (Placeholders) Future modules for device tracking/geofencing and managing third-party data integrations.

*   **Alerts Engine:** Configuration and monitoring of operational alerts.
    *   **Alerts Inbox:** A real-time view of currently active alerts.
    *   **Alert Rule List:** A table of all configured alert rules, with options to enable/disable or delete them.

*   **Admin Console:** Tenant and user management.
    *   **User Management:** A list of all users within the tenant, with their role and status.
    *   **User Invitation:** A form for admins to invite new users to the platform.

### AI-Powered & Automation Features

VeraMine Hub leverages Google's AI (via Genkit) to provide intelligent assistance and automation throughout the application.

*   **Ops Copilot:** A conversational AI assistant accessible from a slide-out panel. It can answer natural language questions about operational data by using tools to query the live database for information on incidents and vehicles.
*   **AI-Suggested Actions (Dashboard):** An AI-powered card that analyzes recent operational data (mocked for prototype) to suggest proactive actions for supervisors, complete with confidence scores and evidence links. Users can provide feedback (thumbs up/down) to train the model.
*   **Anomaly Triage Assistant (Dashboard):** An AI tool that takes a description of an anomaly and generates a "triage card" with likely causes, recommended next steps, and an analysis of observed vs. inferred facts.
*   **AI-Drafted Incident Reports (Risk Module):** Users can describe an incident in free text, and the AI will automatically draft a structured report, classifying the incident and generating a timeline, likely causes, and corrective action (CAPA) suggestions.
*   **AI-Generated Report Narratives (Reporting Module):** On the Production and Safety Scorecard pages, users can click a button to have an AI generate a concise, executive-level narrative summary of the report's key findings, impacts, and recommendations.
*   **Natural Language to Query (Search Bar):** The main search bar can translate plain English queries (e.g., "downtime last 7 days") into a structured JSON query configuration, demonstrating a powerful analytics and reporting capability.
*   **AI-Generated Alert Rules (Alerts Module):** Users can describe a desired alert in plain English (e.g., "Alert if pressure exceeds 150 PSI for 5 minutes"), and the AI will generate a formal rule name, JSON configuration, and a human-readable preview.

---

## 2. Unique Selling Points & Advantages

*   **AI at the Core:** The app is not just a data viewer; it's an active participant in the operational workflow. AI is used to suggest, draft, analyze, and translate, turning raw data into actionable intelligence.
*   **Real-Time & Reactive:** Built on Firebase's Firestore database, the UI is fully reactive. Changes made by one user (e.g., logging an incident, updating a vehicle's status) are reflected in near real-time for all other users without needing to refresh the page.
*   **Production-Grade Architecture:**
    *   **Multi-Tenant Security:** The entire data model and security rules are built around a strict multi-tenant architecture, ensuring that one tenant's data is completely isolated from another's.
    *   **Non-Blocking UI:** The app uses an optimistic-update pattern for database writes. When a user submits a form, the UI provides immediate feedback while the data is sent to the database in the background. This makes the application feel extremely fast and responsive.
    *   **Centralized Error Handling:** A custom, robust error handling system is in place specifically for Firestore security rule violations. It captures detailed context about the failed request and presents it in the Next.js development overlay, making it much easier to debug security rules.
    *   **Scalable & Modern Tech:** Built on the Next.js App Router, React Server Components, and hosted on Firebase App Hosting for excellent performance and scalability.

---

## 3. Files & Project Structure

The project is organized logically, separating UI components, application logic, AI flows, and configuration.

*   `src/app/`: The core of the application, containing all pages and layouts based on the Next.js App Router.
    *   `src/app/dashboard/`: Contains the layout and individual pages for each module (e.g., `operations/page.tsx`, `risk/page.tsx`).
    *   `src/app/layout.tsx`: The root layout of the application.
*   `src/components/`: Contains all React components, organized by module or function.
    *   `src/components/dashboard/`: Components specific to the main dashboard.
    *   `src/components/risk/`: Components for the Risk module (e.g., `IncidentForm.tsx`).
    *   `src/components/layout/`: App-wide layout components like the header and sidebar.
    *   `src/components/ui/`: Reusable, low-level UI components from ShadCN (Button, Card, etc.).
*   `src/ai/`: All Genkit-related AI logic.
    *   `src/ai/flows/`: Contains all the individual AI flows (e.g., `ops-copilot-flow.ts`, `draft-incident-report.ts`). Each file defines the input/output schemas and the prompt for the LLM.
    *   `src/ai/tools/`: Defines "tools" that the AI can use to interact with other parts of the system, like querying the database.
    *   `src/ai/genkit.ts`: The central Genkit configuration file.
*   `src/firebase/`: All Firebase-related setup and hooks.
    *   `src/firebase/config.ts`: The client-side Firebase configuration object.
    *   `src/firebase/provider.tsx`: The core React context provider for Firebase services.
    *   `src/firebase/auth/use-user.tsx`: A custom hook for managing the currently authenticated user's state and profile.
    *   `src/firebase/firestore/`: Custom hooks (`useCollection.tsx`, `useDoc.tsx`) for real-time data fetching.
*   `src/services/`: Server-side functions designed to be called by AI tools to securely fetch data from Firestore (e.g., `incidents.ts`, `vehicles.ts`).
*   `docs/`: Contains the data model definition and security rules blueprint.
    *   `docs/backend.json`: A JSON file that serves as a blueprint for the application's data entities and Firestore structure.
*   `firestore.rules`: The security rules for the Firestore database, enforcing the multi-tenant data isolation.
*   `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`: Standard Next.js and TypeScript project configuration files.
*   `package.json`: Defines all project dependencies and scripts.

---

## 4. How It Was Built (Architecture)

*   **Frontend:** A Next.js 15 application using the App Router. Components are built with React 19 and TypeScript. Styling is handled by Tailwind CSS, with a component library provided by ShadCN UI.
*   **Backend / AI:** Generative AI features are powered by **Firebase Genkit**. Genkit orchestrates calls to Google's AI models (Gemini) and defines the structured flows, tools, and prompts. These flows are exposed as server-side functions that the frontend can call.
*   **Database:** **Cloud Firestore** is used as the primary NoSQL database. It's used in a real-time fashion, where the frontend subscribes to data changes, and the UI updates automatically.
*   **Authentication:** **Firebase Authentication** handles user sign-in (Email/Password and Anonymous/Guest mode are configured). A custom React hook (`useUser`) combines the auth state with the user's profile from Firestore.
*   **Cloud Logic:** While not using explicit Cloud Functions in this build, the Genkit flows and service functions are designed to run on a server-side environment, which Firebase App Hosting provides.

---

## 5. Programming Languages & Technologies

*   **Languages:** TypeScript (primarily), JavaScript, CSS, Handlebars (in Genkit prompts).
*   **Frameworks/Libraries:**
    *   **Next.js 15** / **React 19**: Core frontend framework.
    *   **Genkit**: The framework for building AI-powered features.
    *   **Firebase SDK (v11)**: For all interactions with Firestore and Firebase Auth.
    *   **ShadCN UI** / **Radix UI**: For accessible, unstyled UI component primitives.
    *   **Tailwind CSS**: For all styling.
    *   **Zod**: For schema validation, especially in AI flow inputs/outputs.
    *   **Lucide React**: For icons.
    *   **Recharts**: For data visualization (charts).
    *   **Framer Motion**: For UI animations.

---

## 6. Deployment & Hosting

*   **Hosting:** The `apphosting.yaml` file configures the project for deployment on **Firebase App Hosting**, a managed Next.js hosting service that provides CI/CD, scalability, and integration with the Firebase ecosystem.
*   **GitHub Integration:** A `publish-to-github.sh` script is included to facilitate pushing the codebase to a GitHub repository from a local machine, enabling standard version control and CI/CD workflows.

---

## 7. Testing & Quality Assurance

*   **Security Testing:** The primary security model is enforced by `firestore.rules`. The custom `FirestorePermissionError` class and its corresponding listener component are a key part of the development and testing strategy, allowing developers to quickly identify and fix security rule denials during development.
*   **Functional & Integration:** The application is built with distinct, testable components and modules. The use of server-side data-fetching functions (`/services`) and well-defined AI flows (`/ai/flows`) allows for isolated testing of backend logic.
*   **Type Safety:** The entire codebase is written in TypeScript with `strict` mode enabled, ensuring a high degree of type safety and reducing runtime errors.

---

## 8. Mobile & Offline Capabilities

*   **Responsive Design:** The UI is fully responsive and designed to work across desktop, tablet, and mobile screen sizes.
*   **Offline Data Persistence:** While not fully implemented as a PWA, the core architecture leverages Firestore's built-in offline persistence. This means that if a user loses their network connection, they can still view all previously loaded data and can even write new data (like logging an incident). Firestore automatically syncs these changes back to the server once the connection is restored. This is a powerful, production-grade feature that comes out-of-the-box with the chosen architecture.

---

## 9. Security & Compliance

*   **Tenant Data Isolation:** Enforced at the database level via `firestore.rules`. A user can *only* read or write data that belongs to their assigned `tenantId`.
*   **Role-Based Access Control (RBAC):** Within a tenant, user permissions are governed by their role (e.g., `admin`, `viewer`). Admins have elevated privileges, while `viewer` roles are read-only for most data.
*   **AI Guardrail Logging:** The AI flows (`suggest-actions.ts`, `ops-copilot-flow.ts`) include placeholder logic for audit logging. In a production scenario, every AI-generated suggestion, the prompt used, and the user who triggered it would be logged to a secure collection for audit and compliance purposes.

---

## 10. Analytics & Monitoring

*   **Analytics:** While a dedicated analytics provider is not integrated, the structured nature of the `Event` collection in Firestore (`/tenants/{tenantId}/events/{eventId}`) provides a powerful foundation for building analytics dashboards. Events for downtime, incidents, and handovers are all captured in a consistent format.
*   **Monitoring & Alerting:** The "Alerts Engine" module is designed for this purpose. It allows users to configure rules based on operational data, and the "Alerts Inbox" provides a real-time view of triggered alerts, forming the basis of a comprehensive monitoring system.
