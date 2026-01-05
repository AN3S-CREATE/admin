
# FULL PROJECT BACKUP

This file contains the complete source code for your VeraMine_Hub project. 
You can copy the contents of each file into new files on your local machine.

---
---
---

# FILE: .env

```

```

---
---
---

# FILE: README.md

```md
# VeraMine Hub

This is a NextJS starter in Firebase Studio, customized to be the VeraMine Hub.

To get started, take a look at src/app/page.tsx.
```

---
---
---

# FILE: apphosting.yaml

```yaml
# Settings to manage and configure a Firebase App Hosting backend.
# https://firebase.google.com/docs/app-hosting/configure

runConfig:
  # Increase this value if you'd like to automatically spin up
  # more instances in response to increased traffic.
  maxInstances: 1
```

---
---
---

# FILE: components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

---
---
---

# FILE: docs/backend.json

```json
{
  "entities": {
    "Tenant": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Tenant",
      "type": "object",
      "description": "Represents a tenant within the VeraMine Hub multi-tenant platform.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the Tenant entity."
        },
        "name": {
          "type": "string",
          "description": "The name of the tenant."
        },
        "description": {
          "type": "string",
          "description": "A description of the tenant."
        },
        "createdAt": {
          "type": "string",
          "description": "Timestamp of when the tenant was created.",
          "format": "date-time"
        }
      },
      "required": [
        "id",
        "name"
      ]
    },
    "User": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "User",
      "type": "object",
      "description": "Represents a user within the VeraMine Hub platform.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the User entity, matching Firebase Auth UID."
        },
        "tenantId": {
          "type": "string",
          "description": "Reference to Tenant. (Relationship: Tenant 1:N User)"
        },
        "email": {
          "type": "string",
          "description": "User's email address.",
          "format": "email"
        },
        "displayName": {
          "type": "string",
          "description": "User's display name."
        },
        "role": {
          "type": "string",
          "description": "The user's role within the tenant.",
          "enum": [
            "admin",
            "ops",
            "hr",
            "safety",
            "viewer"
          ]
        },
        "status": {
          "type": "string",
          "description": "The status of the user account.",
          "enum": [
            "pending",
            "active",
            "disabled"
          ]
        },
        "invitedAt": {
          "type": "string",
          "description": "Timestamp of when the user invitation was sent.",
          "format": "date-time"
        },
        "joinedAt": {
          "type": "string",
          "description": "Timestamp of when the user first logged in.",
          "format": "date-time"
        }
      },
      "required": [
        "id",
        "tenantId",
        "email",
        "role",
        "status"
      ]
    },
    "SiteConfiguration": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "SiteConfiguration",
      "type": "object",
      "description": "Represents the configuration settings for a specific site within a tenant.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the SiteConfiguration entity."
        },
        "tenantId": {
          "type": "string",
          "description": "Reference to Tenant. (Relationship: Tenant 1:N SiteConfiguration)"
        },
        "name": {
          "type": "string",
          "description": "Name of the site."
        },
        "settings": {
          "type": "string",
          "description": "JSON string containing site-specific settings."
        }
      },
      "required": [
        "id",
        "tenantId",
        "name",
        "settings"
      ]
    },
    "Event": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Event",
      "type": "object",
      "description": "Represents a unified event ingested into the system.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the Event entity."
        },
        "tenantId": {
          "type": "string",
          "description": "Reference to Tenant. (Relationship: Tenant 1:N Event)"
        },
        "timestamp": {
          "type": "string",
          "description": "Timestamp of when the event occurred.",
          "format": "date-time"
        },
        "eventType": {
          "type": "string",
          "description": "Type of the event (e.g., alarm, downtime, telemetry)."
        },
        "actor": {
          "type": "string",
          "description": "The user or system that generated the event."
        },
        "payload": {
          "type": "object",
          "description": "A structured object representing the event payload, which varies by eventType. For example, a 'downtime' event might have { assetId: 'string', duration: 'number' }.",
          "additionalProperties": true
        }
      },
      "required": [
        "id",
        "tenantId",
        "timestamp",
        "eventType",
        "payload",
        "actor"
      ]
    },
    "AiRecommendation": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "AiRecommendation",
      "type": "object",
      "description": "Represents an AI-suggested action with full audit trail.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the AiRecommendation entity."
        },
        "tenantId": {
          "type": "string",
          "description": "Reference to Tenant. (Relationship: Tenant 1:N AiRecommendation)"
        },
        "recommendation": {
          "type": "string",
          "description": "The AI-suggested action."
        },
        "owner": {
          "type": "string",
          "description": "The suggested owner of the recommendation."
        },
        "impact": {
          "type": "string",
          "description": "The potential impact of the recommendation."
        },
        "confidence": {
          "type": "number",
          "description": "The confidence level of the recommendation."
        },
        "evidenceLinks": {
          "type": "array",
          "description": "Links to the evidence supporting the recommendation.",
          "items": {
            "type": "string"
          }
        },
        "verified": {
          "type": [
            "boolean",
            "null"
          ],
          "description": "Indicates user feedback on the recommendation: true (accepted), false (rejected), or null (no feedback yet)."
        },
        "userId": {
          "type": "string",
          "description": "ID of the user who triggered the generation (or 'system' if automated)."
        },
        "timestamp": {
          "type": "string",
          "format": "date-time",
          "description": "Timestamp when the recommendation was generated."
        },
        "model": {
          "type": "string",
          "description": "The specific AI model used to generate the recommendation."
        },
        "prompt": {
          "type": "string",
          "description": "The full prompt sent to the AI model."
        }
      },
      "required": [
        "id",
        "tenantId",
        "recommendation",
        "owner",
        "impact",
        "confidence",
        "userId",
        "timestamp",
        "model",
        "prompt",
        "verified"
      ]
    },
    "ShiftSummary": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "ShiftSummary",
      "type": "object",
      "description": "Represents a shift or day summary.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the ShiftSummary entity."
        },
        "tenantId": {
          "type": "string",
          "description": "Reference to Tenant. (Relationship: Tenant 1:N ShiftSummary)"
        },
        "siteId": {
          "type": "string",
          "description": "The site to which this summary pertains."
        },
        "summary": {
          "type": "string",
          "description": "The generated shift summary."
        },
        "startTime": {
          "type": "string",
          "description": "The start time of the shift or day.",
          "format": "date-time"
        },
        "endTime": {
          "type": "string",
          "description": "The end time of the shift or day.",
          "format": "date-time"
        },
        "sources": {
          "type": "array",
          "description": "References to Events used to generate the summary.",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "id",
        "tenantId",
        "siteId",
        "summary",
        "startTime",
        "endTime"
      ]
    },
    "Incident": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Incident",
      "type": "object",
      "description": "Represents an incident within the VeraMine Hub platform.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the Incident entity."
        },
        "tenantId": {
          "type": "string",
          "description": "Reference to Tenant. (Relationship: Tenant 1:N Incident)"
        },
        "title": {
          "type": "string",
          "description": "Title of the incident."
        },
        "description": {
          "type": "string",
          "description": "Description of the incident."
        },
        "classification": {
          "type": "string",
          "description": "Classification of the incident."
        },
        "timeline": {
          "type": "string",
          "description": "Timeline of the incident."
        },
        "causes": {
          "type": "string",
          "description": "Causes of the incident."
        },
        "actions": {
          "type": "string",
          "description": "Actions taken during the incident."
        },
        "capaSuggestions": {
          "type": "string",
          "description": "CAPA suggestions for the incident."
        },
        "date": {
          "type": "string",
          "format": "date-time",
          "description": "The date and time the incident occurred."
        },
        "status": {
          "type": "string",
          "description": "The current status of the incident.",
          "enum": [
            "Under Investigation",
            "Closed",
            "CAPA Pending"
          ]
        },
        "reportedBy": {
          "type": "string",
          "description": "The name of the person who reported the incident."
        }
      },
      "required": [
        "id",
        "tenantId",
        "title",
        "description",
        "date",
        "status",
        "classification",
        "reportedBy"
      ]
    },
    "AlertRule": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "AlertRule",
      "type": "object",
      "description": "Represents an alert rule configuration.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the AlertRule entity."
        },
        "tenantId": {
          "type": "string",
          "description": "Reference to Tenant. (Relationship: Tenant 1:N AlertRule)"
        },
        "name": {
          "type": "string",
          "description": "Name of the alert rule."
        },
        "description": {
          "type": "string",
          "description": "Description of the alert rule."
        },
        "configuration": {
          "type": "string",
          "description": "JSON string containing the alert rule configuration."
        },
        "enabled": {
          "type": "boolean",
          "description": "Indicates if the alert rule is enabled or not."
        }
      },
      "required": [
        "id",
        "tenantId",
        "name",
        "description",
        "configuration",
        "enabled"
      ]
    },
    "Transport": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Transport",
      "type": "object",
      "description": "Represents a vehicle in the fleet.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the vehicle."
        },
        "tenantId": {
          "type": "string",
          "description": "Reference to Tenant. (Relationship: Tenant 1:N Transport)"
        },
        "type": {
          "type": "string",
          "description": "Type of vehicle.",
          "enum": ["Haul Truck", "Light Vehicle", "Excavator", "Dozer"]
        },
        "status": {
          "type": "string",
          "description": "Current status of the vehicle.",
          "enum": ["On Route", "Idle", "Maintenance", "Offline"]
        },
        "currentTrip": {
          "type": ["string", "null"],
          "description": "Identifier for the current trip or assignment."
        },
        "driver": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            }
          },
          "required": ["id", "name"]
        }
      },
      "required": [
        "id",
        "tenantId",
        "type",
        "status",
        "driver"
      ]
    }
  },
  "auth": {
    "providers": [
      "password",
      "anonymous"
    ]
  },
  "firestore": {
    "/tenants/{tenantId}": {
      "schema": {
        "$ref": "#/entities/Tenant"
      },
      "description": "Stores tenant-level information."
    },
    "/tenants/{tenantId}/users/{userId}": {
      "schema": {
        "$ref": "#/entities/User"
      },
      "description": "Stores user information, including their role within the tenant. Includes denormalized 'tenantId' for authorization independence."
    },
    "/tenants/{tenantId}/siteConfigurations/{siteConfigurationId}": {
      "schema": {
        "$ref": "#/entities/SiteConfiguration"
      },
      "description": "Stores site-specific configurations. Includes denormalized 'tenantId' for authorization independence."
    },
    "/tenants/{tenantId}/events/{eventId}": {
      "schema": {
        "$ref": "#/entities/Event"
      },
      "description": "Stores ingested events. Includes denormalized 'tenantId' for authorization independence."
    },
    "/tenants/{tenantId}/aiRecommendations/{aiRecommendationId}": {
      "schema": {
        "$ref": "#/entities/AiRecommendation"
      },
      "description": "Stores AI-suggested actions. Includes denormalized 'tenantId' for authorization independence."
    },
    "/tenants/{tenantId}/shiftSummaries/{shiftSummaryId}": {
      "schema": {
        "$ref": "#/entities/ShiftSummary"
      },
      "description": "Stores shift summaries. Includes denormalized 'tenantId' for authorization independence."
    },
    "/tenants/{tenantId}/incidents/{incidentId}": {
      "schema": {
        "$ref": "#/entities/Incident"
      },
      "description": "Stores incident data. Includes denormalized 'tenantId' for authorization independence."
    },
    "/tenants/{tenantId}/alertRules/{alertRuleId}": {
      "schema": {
        "$ref": "#/entities/AlertRule"
      },
      "description": "Stores alert rule configurations. Includes denormalized 'tenantId' for authorization independence."
    },
    "/tenants/{tenantId}/vehicles/{vehicleId}": {
      "schema": {
        "$ref": "#/entities/Transport"
      },
      "description": "Stores vehicle fleet data. Includes denormalized 'tenantId' for authorization independence."
    }
  }
}
```

---
---
---

# FILE: firestore.rules

```rules
/**
 * Core Philosophy: This ruleset enforces a strict multi-tenant data isolation model.
 * All data is sandboxed within a tenant's data tree, and a user's access is
 * strictly determined by their membership and role within that specific tenant.
 *
 * Data Structure: The entire database is structured hierarchically under the
 * `/tenants/{tenantId}` path. All application data, including user profiles,
 * configurations, and events, exists within a tenant's subcollections. This
 * structure is fundamental to enforcing tenant-based security.
 *
 * Key Security Decisions:
 * - Strict Tenant Isolation: A user can only access data within the tenant they belong to.
 *   There is no cross-tenant data access.
 * - Role-Based Access: User roles ('admin', 'ops', 'hr', 'safety', 'viewer') defined
 *   in their user profile (/tenants/{tenantId}/users/{userId}) determine write permissions.
 *   Admins have full control, other roles have content creation rights, and 'viewers' are read-only.
 * - Backend Provisioning: Tenant creation and deletion are disallowed from the client
 *   to ensure these are controlled administrative actions.
 * - No Public Enumeration: Listing tenants or all users within a tenant is
 *   restricted to prevent data leakage and enumeration attacks.
 *
 * Denormalization for Authorization: To ensure fast and secure authorization, a user's
 * permissions (their tenant ID and role) are determined by a single lookup to their
 * user document at `/tenants/{tenantId}/users/{request.auth.uid}`. All other data
 * documents contain a denormalized `tenantId` field to allow for efficient rules
 * without requiring costly cross-collection `get` calls during authorization checks.
 */
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ------------------------------------------------------------------------
    // Helper Functions
    // ------------------------------------------------------------------------

    /**
     * Checks if a user is authenticated.
     */
    function isSignedIn() {
      return request.auth != null;
    }

    /**
     * Checks if the currently authenticated user's UID matches the provided userId.
     */
    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }

    /**
     * Checks if a document exists. Used for safe updates and deletes.
     */
    function isExistingDoc() {
      return resource != null;
    }

    /**
     * Retrieves the authenticated user's profile document from within a specific tenant.
     * This is the source of truth for the user's role and tenant membership.
     */
    function getUserData(tenantId) {
      return get(/databases/$(database)/documents/tenants/$(tenantId)/users/$(request.auth.uid));
    }

    /**
     * Validates if the authenticated user is a legitimate member of the specified tenant.
     * It checks for the existence of their user profile and verifies the tenantId within it.
     * This is the primary function for enforcing tenant isolation.
     */
    function isTenantMember(tenantId) {
      let userData = getUserData(tenantId);
      return isSignedIn() && userData != null && userData.data.tenantId == tenantId;
    }

    /**
     * Validates if the user is an 'admin' within the specified tenant.
     */
    function isTenantAdmin(tenantId) {
      let userData = getUserData(tenantId);
      return isTenantMember(tenantId) && userData.data.role == 'admin';
    }

    /**
     * Validates if the user has a specific role within the tenant.
     */
    function hasRole(tenantId, role) {
      let userData = getUserData(tenantId);
      return isTenantMember(tenantId) && userData.data.role == role;
    }
    
    /**
     * Validates if the user has write permissions for the tenant.
     * This is the primary function for enforcing role-based write access.
     * 'viewer' is excluded, making it a read-only role.
     */
    function canWriteInTenant(tenantId) {
      let userData = getUserData(tenantId);
      return isTenantMember(tenantId) && userData.data.role in ['admin', 'ops', 'hr', 'safety'];
    }

    /**
     * Validates that the incoming document data contains the correct tenantId on create.
     */
    function incomingDataHasTenantId(tenantId) {
      return request.resource.data.tenantId == tenantId;
    }

    /**
     * Enforces that the tenantId field cannot be changed on update.
     */
    function tenantIdIsImmutable() {
      return request.resource.data.tenantId == resource.data.tenantId;
    }

    /**
     * Enforces that the user ID field cannot be changed on update.
     */
    function userIdIsImmutable() {
      return request.resource.data.id == resource.data.id;
    }

    // ------------------------------------------------------------------------
    // Collection Rules
    // ------------------------------------------------------------------------

    /**
     * @description Secures the root Tenant document.
     * @path /tenants/{tenantId}
     * @allow (get) A user who is a member of this tenant can read the tenant document.
     * @deny (list) Listing all tenants is disabled to prevent enumeration.
     * @deny (create, delete) Tenant documents can only be managed by a trusted backend process.
     * @principle Restricts access to tenant members and prevents destructive client operations.
     */
    match /tenants/{tenantId} {
      allow get: if isTenantMember(tenantId);
      allow list: if false;
      allow create: if false;
      allow update: if isTenantAdmin(tenantId) && isExistingDoc();
      allow delete: if false;

      /**
       * @description Secures User profile documents within a tenant.
       * @path /tenants/{tenantId}/users/{userId}
       * @allow (get, list) An admin can read and list all users in their tenant.
       * @allow (get) A user can read their own profile.
       * @allow (create) An admin can invite/create new users.
       * @allow (update) An admin can update any user; a user can update their own profile.
       * @principle Enforces ownership and administrative oversight for user data.
       */
      match /tenants/{tenantId}/users/{userId} {
        allow get, list: if isTenantAdmin(tenantId);
        allow get: if isOwner(userId) && isTenantMember(tenantId);
        allow create: if isTenantAdmin(tenantId) && incomingDataHasTenantId(tenantId);
        allow update: if (isTenantAdmin(tenantId) || (isOwner(userId) && isTenantMember(tenantId))) && isExistingDoc() && tenantIdIsImmutable() && userIdIsImmutable();
        allow delete: if isTenantAdmin(tenantId) && isExistingDoc();
      }

      /**
       * @description Generic rule for most data subcollections within a tenant.
       * @path /tenants/{tenantId}/{collection}/{docId}
       * @allow (read) Any member of the tenant can read data.
       * @allow (write) Only users with a role in ['admin', 'ops', 'hr', 'safety'] can write. 'viewer' is implicitly read-only.
       * @principle Enforces tenant isolation for reads and role-based access for writes.
       */
      match /{collection}/{docId} {
        allow read: if isTenantMember(tenantId);
        allow write: if canWriteInTenant(tenantId) && (isExistingDoc() ? tenantIdIsImmutable() : incomingDataHasTenantId(tenantId));
      }
    }
  }
}
```

---
---
---

# FILE: next.config.ts

```ts
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```

---
---
---

# FILE: package.json

```json
{
  "name": "veramine-hub",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "genkit:dev": "genkit start -- tsx src/ai/dev.ts",
    "genkit:watch": "genkit start -- tsx --watch src/ai/dev.ts",
    "build": "NODE_ENV=production next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@genkit-ai/google-genai": "^1.20.0",
    "@genkit-ai/next": "^1.20.0",
    "@hookform/resolvers": "^4.1.3",
    "@radix-ui/react-accordion": "^1.2.3",
    "@radix-ui/react-alert-dialog": "^1.1.6",
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-menubar": "^1.1.6",
    "@radix-ui/react-popover": "^1.1.6",
    "@radix-ui/react-progress": "^1.1.2",
    "@radix-ui/react-radio-group": "^1.2.3",
    "@radix-ui/react-scroll-area": "^1.2.3",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slider": "^1.2.3",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.1.3",
    "@radix-ui/react-tabs": "^1.1.3",
    "@radix-ui/react-toast": "^1.2.6",
    "@radix-ui/react-tooltip": "^1.1.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "dotenv": "^16.5.0",
    "embla-carousel-react": "^8.6.0",
    "firebase": "^11.9.1",
    "framer-motion": "^11.5.1",
    "genkit": "^1.20.0",
    "lucide-react": "^0.475.0",
    "next": "15.5.9",
    "patch-package": "^8.0.0",
    "react": "^19.2.1",
    "react-day-picker": "^9.11.3",
    "react-dom": "^19.2.1",
    "react-hook-form": "^7.54.2",
    "recharts": "^2.15.1",
    "tailwind-merge": "^3.0.1",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19.2.1",
    "@types/react-dom": "^19.2.1",
    "genkit-cli": "^1.20.0",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

---
---
---

# FILE: public/brand/bg-grid.svg

```svg
<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 60V0" stroke="#D2FF05" stroke-opacity="0.05"/>
<path d="M30 60V0" stroke="#D2FF05" stroke-opacity="0.05"/>
<path d="M45 60V0" stroke="#D2FF05" stroke-opacity="0.05"/>
<path d="M60 15L0 15" stroke="#D2FF05" stroke-opacity="0.05"/>
<path d="M60 30L0 30" stroke="#D2FF05" stroke-opacity="0.05"/>
<path d="M60 45L0 45" stroke="#D2FF05" stroke-opacity="0.05"/>
</svg>
```

---
---
---

# FILE: public/brand/bg-paths.svg

```svg
<svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.4">
<path d="M-224 456L426 123.5L1022.5 488L1306 310L1698.5 410.5L2083 176" stroke="#293642" stroke-width="2"/>
<path d="M-224 556L371.5 831.5L838 565.5L1306 886L1829.5 596L2083 723" stroke="#293642" stroke-width="2"/>
</g>
</svg>
```

---
---
---

# FILE: public/brand/hud-ticks.svg

```svg
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 10H10" stroke="#D2FF05" stroke-opacity="0.3"/>
<path d="M20 10H30" stroke="#D2FF05" stroke-opacity="0.3"/>
<path d="M40 10H50" stroke="#D2FF05" stroke-opacity="0.3"/>
<path d="M60 10H70" stroke="#D2FF05" stroke-opacity="0.3"/>
<path d="M80 10H90" stroke="#D2FF05" stroke-opacity="0.3"/>
<path d="M100 10H110" stroke="#D2FF05" stroke-opacity="0.3"/>
<path d="M120 10H130" stroke="#D2FF05" stroke-opacity="0.3"/>
<path d="M140 10H150" stroke="#D2FF05" stroke-opacity="0.3"/>
<path d="M160 10H170" stroke="#D2FF05" stroke-opacity="0.3"/>
<path d="M180 10H190" stroke="#D2FF05" stroke-opacity="0.3"/>
<path d="M10 0V10" stroke="#D2FF05" stroke-opacity="0.3"/>
<path d="M10 20V30" stroke="#D2FF05" stroke-opacity="0.3"/>
<path d="M10 40V50" stroke="#D2FF05" stroke-opacity="0.3"/>
<path d="M10 60V70" stroke="#D2FF05" stroke-opacity="0.3"/>
<path d="M10 80V90" stroke="#D2FF05" stroke-opacity="0.3"/>
<path d="M10 100V110" stroke="#D2FF05" stroke-opacity="0.3"/>
<path d="M10 120V130" stroke="#D2FF05" stroke-opacity="0.3"/>
<path d="M10 140V150" stroke="#D2FF05" stroke-opacity="0.3"/>
<path d="M10 160V170" stroke="#D2FF05" stroke-opacity="0.3"/>
<path d="M10 180V190" stroke="#D2FF05" stroke-opacity="0.3"/>
</svg>
```

---
---
---

# FILE: public/favicon.ico

```
This is a binary file. Content omitted.
```

---
---
---

# FILE: publish-to-github.sh

```sh
#!/bin/bash

# This script is designed to publish your project to GitHub.
# IMPORTANT: This script is intended to be run from your LOCAL machine
# after you have downloaded the project code. It will not work inside
# the Firebase Studio environment.

# --- Configuration ---
GITHUB_USERNAME="AN3S-CREATE"
REPO_NAME="VeraMine_Hub"
GIT_REMOTE_URL="https://github.com/AN3S-CREATE/VeraMine_Hub.git"

# --- Steps ---

echo "--- Initializing Git Repository ---"
# Check if .git directory exists
if [ -d ".git" ]; then
  echo "Git repository already initialized."
else
  git init
  echo "Initialized a new Git repository."
fi

echo "--- Setting Remote URL ---"
# Check if a remote named 'origin' already exists
if git remote get-url origin > /dev/null 2>&1; then
  echo "Remote 'origin' already exists. Setting URL to the correct one."
  git remote set-url origin "${GIT_REMOTE_URL}"
else
  echo "Adding new remote 'origin'."
  git remote add origin "${GIT_REMOTE_URL}"
fi

echo "--- Preparing to Commit ---"
git add .
git branch -M main

# Check if there's anything to commit
if git diff-index --quiet HEAD --; then
    echo "No changes to commit. Working tree is clean."
else
    echo "Committing all files..."
    git commit -m "Initial commit of VeraMine Hub project"
fi

echo "--- Pushing to GitHub ---"
echo "Pushing code to ${GIT_REMOTE_URL}..."
git push -u origin main

echo "--- Done! ---"
echo "Your project should now be available at https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
```

---
---
---

# FILE: src/ai/dev.ts

```ts
'use server';
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
import '@/services/vehicles.ts';
```

---
---
---

# FILE: src/ai/flows/draft-incident-report.ts

```ts
'use server';

/**
 * @fileOverview Generates a draft incident report from free text and selected events.
 *
 * - draftIncidentReport - A function that generates a draft incident report.
 * - DraftIncidentReportInput - The input type for the draftIncidentReport function.
 * - DraftIncidentReportOutput - The return type for the draftIncidentReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DraftIncidentReportInputSchema = z.object({
  freeText: z.string().describe('Free-text description of the incident.'),
  selectedEvents: z.array(z.string()).describe('List of selected event IDs related to the incident.'),
});
export type DraftIncidentReportInput = z.infer<typeof DraftIncidentReportInputSchema>;

const DraftIncidentReportOutputSchema = z.object({
  classification: z.string().describe('Classification of the incident (e.g., safety, security, operational).'),
  timeline: z.string().describe('A structured timeline of the incident events.'),
  causes: z.string().describe('Likely causes of the incident.'),
  actions: z.string().describe('Immediate actions taken in response to the incident.'),
  capaSuggestions: z.string().describe('Corrective and Preventative Actions (CAPA) suggestions.'),
});
export type DraftIncidentReportOutput = z.infer<typeof DraftIncidentReportOutputSchema>;

export async function draftIncidentReport(input: DraftIncidentReportInput): Promise<DraftIncidentReportOutput> {
  return draftIncidentReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'draftIncidentReportPrompt',
  input: {schema: DraftIncidentReportInputSchema},
  output: {schema: DraftIncidentReportOutputSchema},
  prompt: `You are an AI assistant specializing in drafting incident reports for mining operations.
  Based on the provided free text description and selected events, generate a structured incident report.

  Free Text Description: {{{freeText}}}
  Selected Events: {{{selectedEvents}}}

  Include the following sections in the report:
  - Classification: Classify the incident (e.g., safety, security, operational).
  - Timeline: Create a structured timeline of the incident events.
  - Causes: Identify the likely causes of the incident.
  - Actions: Describe the immediate actions taken in response to the incident.
  - CAPA Suggestions: Provide Corrective and Preventative Actions (CAPA) suggestions to prevent future occurrences.

  Format the output as a JSON object with the specified keys.
  `,
});

const draftIncidentReportFlow = ai.defineFlow(
  {
    name: 'draftIncidentReportFlow',
    inputSchema: DraftIncidentReportInputSchema,
    outputSchema: DraftIncidentReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
```

---
---
---

# FILE: src/ai/flows/generate-alert-rule.ts

```ts
'use server';

/**
 * @fileOverview Generates alert rule configurations from natural language descriptions.
 *
 * - generateAlertRule - A function that generates an alert rule configuration.
 * - GenerateAlertRuleInput - The input type for the generateAlertRule function.
 * - GenerateAlertRuleOutput - The return type for the generateAlertRule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAlertRuleInputSchema = z.object({
  description: z
    .string()
    .describe("The user's natural language description of the alert rule (e.g., 'Alert if plant pressure exceeds X for 10 minutes')."),
});
export type GenerateAlertRuleInput = z.infer<typeof GenerateAlertRuleInputSchema>;

const GenerateAlertRuleOutputSchema = z.object({
  name: z.string().describe('A descriptive name for the alert rule.'),
  configuration: z.string().describe('The generated alert rule configuration in a structured format (e.g., JSON).'),
  preview: z.string().describe('A preview of how the alert would function.'),
  testModeSuggestion: z.string().describe('A suggestion for how to test the rule before enabling it.'),
});
export type GenerateAlertRuleOutput = z.infer<typeof GenerateAlertRuleOutputSchema>;

export async function generateAlertRule(input: GenerateAlertRuleInput): Promise<GenerateAlertRuleOutput> {
  return generateAlertRuleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAlertRulePrompt',
  input: {schema: GenerateAlertRuleInputSchema},
  output: {schema: GenerateAlertRuleOutputSchema},
  prompt: `You are an AI assistant that helps mining operators create alert rules from plain English.
  
  Based on the user's description, generate a structured alert rule configuration.

  User Description: {{{description}}}

  Provide the following:
  - A descriptive name for the rule.
  - The rule configuration itself (as a JSON string).
  - A human-readable preview of what the rule will do.
  - A suggestion for how the user could test this rule in a safe environment.
  `,
});

const generateAlertRuleFlow = ai.defineFlow(
  {
    name: 'generateAlertRuleFlow',
    inputSchema: GenerateAlertRuleInputSchema,
    outputSchema: GenerateAlertRuleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
```

---
---
---

# FILE: src/ai/flows/generate-report-narrative.ts

```ts
'use server';

/**
 * @fileOverview Generates a narrative summary for a given report.
 *
 * - generateReportNarrative - A function that generates the report narrative.
 * - GenerateReportNarrativeInput - The input type for the generateReportNarrative function.
 * - GenerateReportNarrativeOutput - The return type for the generateReportNarrative function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReportNarrativeInputSchema = z.object({
  reportSummary: z.string().describe('A detailed summary of the report.'),
  keyChanges: z.string().describe('A summary of the key changes in the report.'),
  impactSummary: z.string().describe('A summary of the impact of the changes.'),
  recommendations: z.string().describe('Recommended actions based on the report findings.'),
  evidenceLinks: z.string().describe('Links to supporting evidence for the report.'),
});
export type GenerateReportNarrativeInput = z.infer<typeof GenerateReportNarrativeInputSchema>;

const GenerateReportNarrativeOutputSchema = z.object({
  narrative: z.string().describe('A short narrative summarizing the report.'),
});
export type GenerateReportNarrativeOutput = z.infer<typeof GenerateReportNarrativeOutputSchema>;

export async function generateReportNarrative(input: GenerateReportNarrativeInput): Promise<GenerateReportNarrativeOutput> {
  return generateReportNarrativeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReportNarrativePrompt',
  input: {schema: GenerateReportNarrativeInputSchema},
  output: {schema: GenerateReportNarrativeOutputSchema},
  prompt: `You are an expert analyst summarizing reports for quick understanding.

  Based on the following information, generate a concise 5-10 line narrative summarizing the report, highlighting key changes, their impact, and recommended actions, with citations to supporting evidence.

  Report Summary: {{{reportSummary}}}
  Key Changes: {{{keyChanges}}}
  Impact Summary: {{{impactSummary}}}
  Recommendations: {{{recommendations}}}
  Evidence Links: {{{evidenceLinks}}}
  `,
});

const generateReportNarrativeFlow = ai.defineFlow(
  {
    name: 'generateReportNarrativeFlow',
    inputSchema: GenerateReportNarrativeInputSchema,
    outputSchema: GenerateReportNarrativeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
```

---
---
---

# FILE: src/ai/flows/generate-shift-summary.ts

```ts
'use server';

/**
 * @fileOverview Automatically generates shift summaries for site managers.
 *
 * - generateShiftSummary - A function that generates a shift summary.
 * - GenerateShiftSummaryInput - The input type for the generateShiftSummary function.
 * - GenerateShiftSummaryOutput - The return type for the generateShiftSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateShiftSummaryInputSchema = z.object({
  siteName: z.string().describe('The name of the site.'),
  shiftNumber: z.number().describe('The shift number (e.g., 1, 2, 3).'),
  date: z.string().describe('The date of the shift (YYYY-MM-DD).'),
  events: z.string().describe('JSON array of significant events during the shift.'),
  downtimeData: z.string().describe('JSON array of downtime data during the shift.'),
});
export type GenerateShiftSummaryInput = z.infer<typeof GenerateShiftSummaryInputSchema>;

const GenerateShiftSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the shift.'),
  sources: z.string().describe('JSON array of sources used to generate the summary.'),
});
export type GenerateShiftSummaryOutput = z.infer<typeof GenerateShiftSummaryOutputSchema>;

export async function generateShiftSummary(input: GenerateShiftSummaryInput): Promise<GenerateShiftSummaryOutput> {
  return generateShiftSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateShiftSummaryPrompt',
  input: {schema: GenerateShiftSummaryInputSchema},
  output: {schema: GenerateShiftSummaryOutputSchema},
  prompt: `You are an AI assistant that generates shift summaries for site managers in mining operations. 
  Your goal is to provide a concise summary of key events and operational changes during a specific shift. 
  Use the provided events and downtime data to create the summary.

  Site Name: {{siteName}}
  Shift Number: {{shiftNumber}}
  Date: {{date}}
  Events: {{{events}}}
  Downtime Data: {{{downtimeData}}}

  Summary Guidelines:
  - Focus on key events and operational changes.
  - Include relevant details about downtime incidents and their impact.
  - Mention any significant anomalies or noteworthy occurrences.
  - Keep the summary concise and easy to understand.

  Output Format:
  {
    "summary": "The shift experienced a significant downtime incident due to a conveyor belt malfunction. Production was halted for 2 hours. Key events included ...",
    "sources": ["Event ID: 123", "Downtime Record: 456"]
  }
  `,
});

const generateShiftSummaryFlow = ai.defineFlow(
  {
    name: 'generateShiftSummaryFlow',
    inputSchema: GenerateShiftSummaryInputSchema,
    outputSchema: GenerateShiftSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
```

---
---
---

# FILE: src/ai/flows/natural-language-to-query.ts

```ts
'use server';

/**
 * @fileOverview Converts natural language queries into structured query/report configurations.
 *
 * - translateNaturalLanguageToQuery - A function that translates natural language queries.
 * - TranslateNaturalLanguageToQueryInput - The input type for the translateNaturalLanguageToQuery function.
 * - TranslateNaturalLanguageToQueryOutput - The return type for the translateNaturalLanguageToQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateNaturalLanguageToQueryInputSchema = z.object({
  naturalLanguageQuery: z
    .string()
    .describe("The user's natural language query (e.g., 'Show downtime by reason code last 7 days for Site A')."),
});
export type TranslateNaturalLanguageToQueryInput = z.infer<
  typeof TranslateNaturalLanguageToQueryInputSchema
>;

const TranslateNaturalLanguageToQueryOutputSchema = z.object({
  queryConfiguration: z
    .string()
    .describe(
      'A saved query/report configuration that corresponds to the natural language query.'
    ),
  confirmationPrompt: z
    .string()
    .describe(
      'A prompt to confirm the filters to avoid hallucinations (e.g., \'Are these filters correct?\').'
    ),
});
export type TranslateNaturalLanguageToQueryOutput = z.infer<
  typeof TranslateNaturalLanguageToQueryOutputSchema
>;

export async function translateNaturalLanguageToQuery(
  input: TranslateNaturalLanguageToQueryInput
): Promise<TranslateNaturalLanguageToQueryOutput> {
  return translateNaturalLanguageToQueryFlow(input);
}

const translateNaturalLanguageToQueryPrompt = ai.definePrompt({
  name: 'translateNaturalLanguageToQueryPrompt',
  input: {schema: TranslateNaturalLanguageToQueryInputSchema},
  output: {schema: TranslateNaturalLanguageToQueryOutputSchema},
  prompt: `You are an AI assistant that translates natural language queries into structured query/report configurations.  Your job is to take the user's query and turn it into a structured query.

User Query: {{{naturalLanguageQuery}}}

Respond with a queryConfiguration that represents a saved query/report configuration and a confirmationPrompt that asks the user to confirm the filters to avoid hallucinations.

Example:
User Query: Show downtime by reason code last 7 days for Site A
queryConfiguration: { \`report: 'downtime', dimensions: ['reasonCode'], filters: [{field: 'site', value: 'Site A'}, {field: 'timeRange', value: '7d'}]\` }
confirmationPrompt: "I'm about to generate a report showing downtime by reason code for 'Site A' over the last 7 days. Does that look correct?"`,
});

const translateNaturalLanguageToQueryFlow = ai.defineFlow(
  {
    name: 'translateNaturalLanguageToQueryFlow',
    inputSchema: TranslateNaturalLanguageToQueryInputSchema,
    outputSchema: TranslateNaturalLanguageToQueryOutputSchema,
  },
  async input => {
    const {output} = await translateNaturalLanguageToQueryPrompt(input);
    return output!;
  }
);
```

---
---
---

# FILE: src/ai/flows/ops-copilot-flow.ts

```ts
'use server';

/**
 * @fileOverview A conversational flow for the Ops Copilot.
 *
 * - opsCopilotFlow - A function that handles the conversational chat.
 * - OpsCopilotInput - The input type for the opsCopilotFlow function