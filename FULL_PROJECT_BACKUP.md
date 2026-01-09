
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
[This is a binary file and its content is omitted]
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
 * - opsCopilot - A function that handles the conversational chat.
 * - OpsCopilotInput - The input type for the opsCopilot function.
 * - OpsCopilotOutput - The return type for the opsCopilot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getIncidentsTool, getVehiclesTool } from '../tools/firestore-tools';

const OpsCopilotInputSchema = z.object({
  message: z.string().describe('The user\'s message to the copilot.'),
});
export type OpsCopilotInput = z.infer<typeof OpsCopilotInputSchema>;

const OpsCopilotOutputSchema = z.object({
  response: z.string().describe('The AI copilot\'s response.'),
});
export type OpsCopilotOutput = z.infer<typeof OpsCopilotOutputSchema>;

export async function opsCopilot(input: OpsCopilotInput): Promise<OpsCopilotOutput> {
  return opsCopilotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'opsCopilotPrompt',
  input: {schema: OpsCopilotInputSchema},
  output: {schema: OpsCopilotOutputSchema},
  tools: [getIncidentsTool, getVehiclesTool],
  system: `You are an expert AI assistant for mining operations called Ops Copilot. 
  Your goal is to provide helpful and accurate information to the user.
  
  You have access to tools that can retrieve live data from the operation's database, including incidents and the vehicle fleet.
  When a user asks a question that requires information about incidents, events, vehicles, or other operational data,
  you MUST use the available tools to fetch that information.

  Do not invent or hallucinate facts. If the tools do not provide the information, state that you
  do not have access to that information and suggest what data might be needed.
  
  When you provide an answer based on tool output, be sure to cite the source of the information.
  `,
  prompt: `User Message: {{{message}}}`,
});

const opsCopilotFlow = ai.defineFlow(
  {
    name: 'opsCopilotFlow',
    inputSchema: OpsCopilotInputSchema,
    outputSchema: OpsCopilotOutputSchema,
  },
  async input => {
    const llmResponse = await prompt(input);
    const { output, history } = llmResponse;
    if (!output) {
      return { response: "I'm sorry, I couldn't generate a response." };
    }
    
    // Log tool usage for guardrails/auditing
    const toolCalls = history.filter(m => m.role === 'tool');
    if (toolCalls.length > 0) {
      console.log('OpsCopilot used the following tools:', toolCalls.map(t => t.content[0].toolRequest.name).join(', '));
    }

    return { response: output.response };
  }
);
```

---
---
---

# FILE: src/ai/flows/suggest-actions.ts

```ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting actions with AI.
 *
 * - suggestActions - A function that suggests actions based on the input.
 * - SuggestActionsInput - The input type for the suggestActions function.
 * - SuggestActionsOutput - The output type for the suggestActions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestActionsInputSchema = z.object({
  siteDescription: z.string().describe('A description of the mine site and its current operational status.'),
  recentEvents: z.string().describe('A summary of recent events at the mine site, including any incidents, downtime, or anomalies.'),
  operationalGoals: z.string().describe('The operational goals for the mine site, such as production targets or safety improvements.'),
  userId: z.string().describe("The ID of the user triggering the action suggestion."),
});
export type SuggestActionsInput = z.infer<typeof SuggestActionsInputSchema>;

const SuggestedActionSchema = z.object({
  action: z.string().describe('A suggested action to take.'),
  owner: z.string().describe('The person or team responsible for the action.'),
  impact: z.string().describe('The potential impact of the action.'),
  confidence: z.number().describe('The confidence level in the action suggestion (0-1).'),
  evidenceLinks: z.array(z.string()).describe('Links to evidence supporting the action suggestion.'),
});

const SuggestActionsOutputSchema = z.object({
  suggestedActions: z.array(SuggestedActionSchema).describe('A list of suggested actions.'),
});
export type SuggestActionsOutput = z.infer<typeof SuggestActionsOutputSchema>;

export async function suggestActions(input: SuggestActionsInput): Promise<SuggestActionsOutput> {
  return suggestActionsFlow(input);
}

const PROMPT_TEMPLATE = `You are an AI assistant helping mine supervisors proactively address potential issues and improve operational efficiency. Based on the provided site description, recent events, and operational goals, suggest a list of actions that the supervisor should consider taking.

Site Description: {{{siteDescription}}}
Recent Events: {{{recentEvents}}}
Operational Goals: {{{operationalGoals}}}

Consider the following when suggesting actions:
* Safety: Actions that improve the safety of the mine site.
* Efficiency: Actions that improve the efficiency of operations.
* Cost: Actions that reduce costs.
* Compliance: Actions that ensure compliance with regulations.

Format your response as a JSON object with a 'suggestedActions' field. Each action should include the action itself, the owner, the impact, the confidence level, and links to supporting evidence.
`;

const suggestActionsPrompt = ai.definePrompt({
  name: 'suggestActionsPrompt',
  input: {schema: SuggestActionsInputSchema},
  output: {schema: SuggestActionsOutputSchema},
  prompt: PROMPT_TEMPLATE, 
});

const suggestActionsFlow = ai.defineFlow(
  {
    name: 'suggestActionsFlow',
    inputSchema: SuggestActionsInputSchema,
    outputSchema: SuggestActionsOutputSchema,
  },
  async (input) => {
    const response = await suggestActionsPrompt(input);
    const { output, usage } = response;
    
    // This is where we would persist the recommendations with guardrail metadata.
    // In a real implementation, you would replace this log with a call to a Firestore service.
    // For the prototype, we will return the data and let the client-side component handle storage.
    
    console.log("AI Guardrail Log for suggestActionsFlow:");
    console.log({
      userId: input.userId,
      timestamp: new Date().toISOString(),
      model: usage?.response?.model,
      prompt: PROMPT_TEMPLATE, // Storing the template
      // In a real app, you'd save each generated recommendation to Firestore here.
    });

    return output!;
  }
);
```

---
---
---

# FILE: src/ai/flows/triage-anomalies.ts

```ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for triaging anomalies.
 *
 * - triageAnomaly - A function that generates a triage card with likely causes and next steps for a given anomaly.
 * - TriageAnomalyInput - The input type for the triageAnomaly function.
 * - TriageAnomalyOutput - The return type for the triageAnomaly function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TriageAnomalyInputSchema = z.object({
  anomalyDescription: z.string().describe('A detailed description of the anomaly that has occurred.'),
  relevantEvents: z.string().optional().describe('A summary of relevant events leading up to the anomaly, if available.'),
  telemetryData: z.string().optional().describe('Relevant telemetry data associated with the anomaly, if available.'),
});
export type TriageAnomalyInput = z.infer<typeof TriageAnomalyInputSchema>;

const TriageAnomalyOutputSchema = z.object({
  likelyCauses: z.array(z.string()).describe('A list of likely causes for the anomaly.'),
  nextSteps: z.array(z.string()).describe('A list of recommended next steps to investigate the anomaly.'),
  observedVsInferred: z.string().describe('Distinguishes between observed facts and inferred conclusions.'),
});
export type TriageAnomalyOutput = z.infer<typeof TriageAnomalyOutputSchema>;

export async function triageAnomaly(input: TriageAnomalyInput): Promise<TriageAnomalyOutput> {
  return triageAnomalyFlow(input);
}

const triageAnomalyPrompt = ai.definePrompt({
  name: 'triageAnomalyPrompt',
  input: {schema: TriageAnomalyInputSchema},
  output: {schema: TriageAnomalyOutputSchema},
  prompt: `You are an expert anomaly triage assistant for a mining operation.

You are provided with a description of an anomaly, relevant events, and telemetry data.

Based on this information, generate a triage card with likely causes and next steps to help the operator quickly assess the situation and take appropriate action.

Anomaly Description: {{{anomalyDescription}}}
Relevant Events: {{{relevantEvents}}}
Telemetry Data: {{{telemetryData}}}

Format your response as a JSON object with the following keys:
- likelyCauses: A list of likely causes for the anomaly.
- nextSteps: A list of recommended next steps to investigate the anomaly.
- observedVsInferred: A brief statement distinguishing between observed facts and inferred conclusions.
`,
});

const triageAnomalyFlow = ai.defineFlow(
  {
    name: 'triageAnomalyFlow',
    inputSchema: TriageAnomalyInputSchema,
    outputSchema: TriageAnomalyOutputSchema,
  },
  async input => {
    const {output} = await triageAnomalyPrompt(input);
    return output!;
  }
);
```

---
---
---

# FILE: src/ai/genkit.ts

```ts
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
```

---
---
---

# FILE: src/ai/tools/firestore-tools.ts

```ts
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
```

---
---
---

# FILE: src/app/app-provider.tsx

```tsx
'use client';

import { FirebaseClientProvider } from '@/firebase';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseClientProvider>
      {children}
    </FirebaseClientProvider>
  );
}
```

---
---
---

# FILE: src/app/dashboard/admin/page.tsx

```tsx
'use client';

import { useMemo } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { UserInviteForm } from '@/components/admin/user-invite-form';
import { UserList } from '@/components/admin/user-list';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';

const MOCK_TENANT_ID = 'VeraMine'; // As defined in use-user.tsx

export default function AdminPage() {
  const firestore = useFirestore();
  const { user: currentUser } = useUser();

  const usersColRef = useMemoFirebase(() => {
    if (!firestore || !currentUser) return null;
    // Only admins should be able to fetch the user list
    if (currentUser.role !== 'admin') return null;
    return collection(firestore, 'tenants', MOCK_TENANT_ID, 'users');
  }, [firestore, currentUser]);

  const { data: users, isLoading } = useCollection(usersColRef);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Console"
        description="Manage user access, assign roles, and monitor tenant activity."
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <UserInviteForm />
        </div>
        <div className="lg:col-span-2">
          <UserList users={users || []} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
```

---
---
---

# FILE: src/app/dashboard/alerts/page.tsx

```tsx
'use client';

import { PageHeader } from '@/components/shared/page-header';
import { AlertRuleGenerator } from '@/components/alerts/alert-rule-generator';
import { AlertRuleList } from '@/components/alerts/alert-rule-list';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { AlertsInbox } from '@/components/alerts/alerts-inbox';

const MOCK_TENANT_ID = 'VeraMine'; // As defined in use-user.tsx

export default function AlertsPage() {
  const firestore = useFirestore();

  const alertRulesColRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'tenants', MOCK_TENANT_ID, 'alertRules');
  }, [firestore]);

  const { data: alertRules, isLoading } = useCollection(alertRulesColRef);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Alerts Engine"
        description="Configure, test, and manage alert rules for your operation."
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <AlertRuleGenerator />
        </div>
        <div className="lg:col-span-2 space-y-8">
          <AlertRuleList alertRules={alertRules || []} isLoading={isLoading} />
          <AlertsInbox />
        </div>
      </div>
    </div>
  );
}
```

---
---
---

# FILE: src/app/dashboard/integrations/page.tsx

```tsx
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function IntegrationsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart Data &amp; Integrations"
        description="Connector registry, mapping UI, and ingestion logs viewer."
      />
      <Card className="glass-card">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">The data integration module will be available here. This section will allow you to manage data connectors in a registry, configure event mappings, and monitor ingestion logs.</p>
        </CardContent>
      </Card>
    </div>
  );
}
```

---
---
---

# FILE: src/app/dashboard/layout.tsx

```tsx
'use client';

import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarInset className="min-h-screen flex flex-col">
          <AppHeader />
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex-1 p-4 sm:p-6 lg:p-8"
          >
            {children}
          </motion.main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
```

---
---
---

# FILE: src/app/dashboard/operations/page.tsx

```tsx
'use client';

import { PageHeader } from '@/components/shared/page-header';
import { DowntimeCapture } from '@/components/operations/downtime-capture';
import { ShiftHandover } from '@/components/operations/shift-handover';
import { KpiBoard } from '@/components/operations/kpi-board';
import { ShiftSummaryGenerator } from '@/components/operations/shift-summary-generator';

export default function OperationsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart Operations"
        description="Shift handover, downtime capture, and operational KPIs."
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <KpiBoard />
        </div>
        <div className="space-y-8">
          <ShiftSummaryGenerator />
          <ShiftHandover />
          <DowntimeCapture />
        </div>
      </div>
    </div>
  );
}
```

---
---
---

# FILE: src/app/dashboard/page.tsx

```tsx
"use client";

import { PageHeader } from "@/components/shared/page-header";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { StatCard } from "@/components/dashboard/stat-card";
import { ProductionChart } from "@/components/dashboard/production-chart";
import { DowntimeChart } from "@/components/dashboard/downtime-chart";
import { RecommendedActions } from "@/components/dashboard/recommended-actions";
import { motion } from "framer-motion";
import { EventLog } from "@/components/dashboard/event-log";
import { Activity, AlertTriangle, ArrowUp, Truck } from "lucide-react";
import { AnomalyTriageCard } from "@/components/dashboard/anomaly-triage-card";

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const statCards = [
    {
      title: "Overall Production",
      value: "14,280 Tonnes",
      icon: Activity,
      trend: "up" as const,
      trendValue: "12.5%",
      period: "vs last month",
    },
    {
      title: "Equipment Uptime",
      value: "98.2%",
      icon: ArrowUp,
      trend: "up" as const,
      trendValue: "1.2%",
      period: "vs last month",
    },
    {
      title: "Fleet Availability",
      value: "89%",
      icon: Truck,
      trend: "down" as const,
      trendValue: "2.1%",
      period: "vs last month",
    },
    {
      title: "Active Alerts",
      value: "3",
      icon: AlertTriangle,
      trend: "static" as const,
      trendValue: "High Priority",
      period: "needs attention",
    },
  ];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Executive Dashboard"
        description="An executive-level view of your entire mining operation."
      >
        <DateRangePicker />
      </PageHeader>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: KPI Cards */}
        <motion.div 
          className="lg:col-span-3 space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {statCards.map((card) => (
            <StatCard
              key={card.title}
              title={card.title}
              value={card.value}
              icon={card.icon}
              trend={card.trend}
              trendValue={card.trendValue}
              period={card.period}
            />
          ))}
        </motion.div>

        {/* Center Column: Main Charts */}
        <div className="lg:col-span-6 space-y-8">
          <ProductionChart />
          <DowntimeChart />
        </div>

        {/* Right Column: Actions & Triage */}
        <div className="lg:col-span-3 space-y-8">
          <RecommendedActions />
          <AnomalyTriageCard />
        </div>
      </div>
      <EventLog />
    </div>
  );
}
```

---
---
---

# FILE: src/app/dashboard/people/page.tsx

```tsx
'use client';

import { PageHeader } from '@/components/shared/page-header';
import { PeopleList } from '@/components/people/people-list';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';

const MOCK_TENANT_ID = 'VeraMine'; // As defined in use-user.tsx

export default function PeoplePage() {
  const firestore = useFirestore();

  const usersColRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'tenants', MOCK_TENANT_ID, 'users');
  }, [firestore]);

  const { data: users, isLoading } = useCollection(usersColRef);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart People"
        description="Onboarding checklist, training matrix, compliance expiry &amp; alerts."
      />
      <PeopleList users={users || []} isLoading={isLoading} />
    </div>
  );
}
```

---
---
---

# FILE: src/app/dashboard/plant/page.tsx

```tsx
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function PlantPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart Plant"
        description="Visualize critical plant telemetry with alarm consoles and historical trend charts."
      />
      <Card className="glass-card">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">The plant monitoring module will be available here. This section will allow you to manage plant assets, view a real-time alarm console, and analyze historical data with trend charts.</p>
        </CardContent>
      </Card>
    </div>
  );
}
```

---
---
---

# FILE: src/app/dashboard/reports/page.tsx

```tsx
'use client';

import { PageHeader } from '@/components/shared/page-header';
import { ReportCard } from '@/components/reports/report-card';
import { FileText, Shield, Activity, AlertTriangle, Fuel } from 'lucide-react';

const reports = [
  {
    title: 'Production Scorecard',
    description: 'A summary of production KPIs including output, uptime, and efficiency metrics.',
    href: '/dashboard/reports/production',
    icon: Activity,
  },
  {
    title: 'Safety Scorecard',
    description: 'An overview of safety performance, including incident rates and compliance status.',
    href: '/dashboard/reports/safety',
    icon: Shield,
  },
  {
    title: 'Downtime Analysis',
    description: 'Deep dive into downtime events, causes, and impact on production.',
    href: '#',
    icon: FileText,
  },
    {
    title: 'Fuel Consumption Report',
    description: 'Track and analyze fuel usage across the entire vehicle fleet.',
    href: '#',
    icon: Fuel,
  },
  {
    title: 'Incidents by Classification',
    description: 'Review a breakdown of all incidents by their classification.',
    href: '#',
    icon: AlertTriangle,
  }
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart Reporting"
        description="Report gallery with prototype reports, CSV export, and AI narrative."
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <ReportCard
            key={report.title}
            href={report.href}
            title={report.title}
            description={report.description}
            icon={report.icon}
          />
        ))}
      </div>
    </div>
  );
}
```

---
---
---

# FILE: src/app/dashboard/reports/production/page.tsx

```tsx
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { DateRangePicker } from '@/components/shared/date-range-picker';
import { StatCard } from '@/components/dashboard/stat-card';
import { ProductionChart } from '@/components/dashboard/production-chart';
import { DowntimeChart } from '@/components/dashboard/downtime-chart';
import { motion } from 'framer-motion';
import { statCards, productionData } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Download, Wand2, Loader2, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateReportNarrative } from '@/ai/flows/generate-report-narrative';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ProductionReportPage() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [narrative, setNarrative] = useState<string | null>(null);

  const handleExport = () => {
    toast({
      title: 'Export to CSV',
      description: 'This feature is a placeholder in the prototype.',
    });
  };

  const handleGenerateNarrative = async () => {
    setIsGenerating(true);
    setNarrative(null);
    try {
      // In a real app, you'd dynamically generate these summaries from the report data.
      const mockReportSummary = `The report covers production from ${productionData[0].date} to ${productionData[productionData.length-1].date}. Total production was ${statCards[0].value}.`;
      const mockKeyChanges = `Production shows an upward trend of ${statCards[0].trendValue}. Equipment uptime is at ${statCards[1].value}.`;
      const mockImpactSummary = `The primary driver of downtime was 'Scheduled' maintenance, accounting for a large portion of non-productive hours.`;
      const mockRecommendations = `Consider optimizing scheduled maintenance windows to reduce their impact on overall production time.`;
      
      const result = await generateReportNarrative({
        reportSummary: mockReportSummary,
        keyChanges: mockKeyChanges,
        impactSummary: mockImpactSummary,
        recommendations: mockRecommendations,
        evidenceLinks: "[]", // No links for this example
      });
      
      setNarrative(result.narrative);
      toast({
        title: 'AI Narrative Generated',
        description: 'The executive summary has been created below.',
      });

    } catch (error) {
      console.error("Error generating report narrative:", error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate AI narrative.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Production Scorecard"
        description="An overview of production KPIs including output, uptime, and efficiency metrics."
      >
        <div className="flex flex-wrap items-center gap-2">
            <DateRangePicker />
            <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
            </Button>
             <Button onClick={handleGenerateNarrative} disabled={isGenerating}>
              {isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Generate AI Narrative
            </Button>
        </div>
      </PageHeader>
      
      {narrative && (
         <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="text-primary" />
                AI-Generated Narrative
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{narrative}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {statCards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            trend={card.trend}
            trendValue={card.trendValue}
            period={card.period}
          />
        ))}
      </motion.div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProductionChart />
        </div>
        <div className="lg:col-span-1">
          <DowntimeChart />
        </div>
      </div>
    </div>
  );
}
```

---
---
---

# FILE: src/app/dashboard/reports/safety/page.tsx

```tsx
'use client';

import { useState } from 'react';
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Download, Wand2, Loader2, FileText } from "lucide-react";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from 'firebase/firestore';
import { IncidentList } from "@/components/risk/incident-list";
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateReportNarrative } from '@/ai/flows/generate-report-narrative';
import type { Incident } from '@/types/incident';

const MOCK_TENANT_ID = 'VeraMine'; // As defined in use-user.tsx

export default function SafetyReportPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [narrative, setNarrative] = useState<string | null>(null);

  const incidentsColRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'tenants', MOCK_TENANT_ID, 'incidents');
  }, [firestore]);

  const { data: incidents, isLoading } = useCollection<Incident>(incidentsColRef);
  
  const handleExport = () => {
    toast({
      title: 'Export to CSV',
      description: 'This feature is a placeholder in the prototype.',
    });
  };

  const handleGenerateNarrative = async () => {
    if (!incidents || incidents.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No Data Available',
        description: 'There is no incident data to generate a narrative from.',
      });
      return;
    }

    setIsGenerating(true);
    setNarrative(null);
    try {
      // Create summaries from the live incident data
      const reportSummary = `This report covers ${incidents.length} total incidents. The most common classification is '${incidents.reduce((acc, incident) => { acc[incident.classification] = (acc[incident.classification] || 0) + 1; return acc; }, {} as Record<string, number>)[Object.keys(incidents.reduce((acc, incident) => { acc[incident.classification] = (acc[incident.classification] || 0) + 1; return acc; }, {} as Record<string, number>)).reduce((a, b) => (incidents.reduce((acc, incident) => { acc[incident.classification] = (acc[incident.classification] || 0) + 1; return acc; }, {} as Record<string, number>)[a] > incidents.reduce((acc, incident) => { acc[incident.classification] = (acc[incident.classification] || 0) + 1; return acc; }, {} as Record<string, number>)[b] ? a : b))] || 'N/A'}'.`;
      const keyChanges = incidents.slice(0, 2).map(i => `${i.title} (${i.classification})`).join('; ');
      const impactSummary = `The incidents primarily involve near-misses and operational issues, indicating a need for procedural review.`;
      const recommendations = `Focus on root cause analysis for the top incident classifications and review associated training materials.`;
      
      const result = await generateReportNarrative({
        reportSummary,
        keyChanges,
        impactSummary,
        recommendations,
        evidenceLinks: JSON.stringify(incidents.slice(0,3).map(i => `/dashboard/risk#${i.id}`)),
      });
      
      setNarrative(result.narrative);
      toast({
        title: 'AI Narrative Generated',
        description: 'The executive summary has been created below.',
      });

    } catch (error) {
      console.error("Error generating report narrative:", error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate AI narrative.',
      });
    } finally {
      setIsGenerating(false);
    }
  };


  return (
    <div className="space-y-8">
       <PageHeader
        title="Safety Scorecard"
        description="An overview of safety performance, including incident rates and compliance status."
      >
        <div className="flex flex-wrap items-center gap-2">
            <DateRangePicker />
            <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
            </Button>
            <Button onClick={handleGenerateNarrative} disabled={isGenerating}>
              {isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Generate AI Narrative
            </Button>
        </div>
      </PageHeader>
      
      {narrative && (
         <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="text-primary" />
                AI-Generated Narrative
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{narrative}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <IncidentList incidents={incidents || []} isLoading={isLoading} />
      
    </div>
  );
}
```

---
---
---

# FILE: src/app/dashboard/risk/page.tsx

```tsx
'use client';

import { PageHeader } from '@/components/shared/page-header';
import { IncidentForm } from '@/components/risk/incident-form';
import { IncidentList } from '@/components/risk/incident-list';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';

const MOCK_TENANT_ID = 'VeraMine'; // As defined in use-user.tsx

export default function RiskPage() {
  const firestore = useFirestore();

  const incidentsColRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'tenants', MOCK_TENANT_ID, 'incidents');
  }, [firestore]);

  const { data: incidents, isLoading } = useCollection(incidentsColRef);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart Risk"
        description="Incident capture, CAPA/actions board, and AI incident drafting."
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <IncidentForm />
        </div>
        <div className="lg:col-span-2">
          <IncidentList incidents={incidents || []} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
```

---
---
---

# FILE: src/app/dashboard/tracking/page.tsx

```tsx
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function TrackingPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart Tracking"
        description="Device assignment, location pings, geofences, and muster list."
      />
      <Card className="glass-card">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">The personnel and asset tracking module will be available here. This section will feature device assignment, live location pings, geofence management, and emergency muster lists.</p>
        </CardContent>
      </Card>
    </div>
  );
}
```

---
---
---

# FILE: src/app/dashboard/transport/page.tsx

```tsx
'use client';

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { FleetOverview } from "@/components/transport/fleet-overview";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from 'firebase/firestore';
import type { Vehicle } from "@/types/transport";
import { VehicleForm } from "@/components/transport/vehicle-form";

const MOCK_TENANT_ID = 'VeraMine';

export default function TransportPage() {
  const firestore = useFirestore();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const vehiclesColRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'tenants', MOCK_TENANT_ID, 'vehicles');
  }, [firestore]);

  const { data: vehicles, isLoading } = useCollection<Vehicle>(vehiclesColRef);

  const handleEdit = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleFormClose = () => {
    setSelectedVehicle(null);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart Transport"
        description="Manage the vehicle fleet, track trips, and flag exceptions."
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <VehicleForm 
            vehicleToEdit={selectedVehicle} 
            onFormClose={handleFormClose}
          />
        </div>
        <div className="lg:col-span-2">
            <FleetOverview 
                vehicles={vehicles || []} 
                isLoading={isLoading} 
                onEdit={handleEdit}
            />
        </div>
      </div>
    </div>
  );
}
```

---
---
---

# FILE: src/app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 222 57% 5%; /* #0B0E15 */
    --foreground: 48 43% 97%; /* #F6F3EA */

    --card: 216 28% 14%; /* #1D262B */
    --card-foreground: 48 43% 97%;

    --popover: 222 57% 5%;
    --popover-foreground: 48 43% 97%;

    --primary: 71 100% 51%; /* #D2FF05 */
    --primary-foreground: 71 100% 10%; /* Darker green for contrast */

    --secondary: 213 27% 20%; /* #293642 -> similar to #303E47 */
    --secondary-foreground: 48 43% 97%;

    --muted: 213 27% 20%;
    --muted-foreground: 215 20% 65%;

    --accent: 82 49% 57%; /* #9AD153 */
    --accent-foreground: 210 40% 98%;

    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;

    --border: 211 26% 27%; /* a lighter shade from the dark blues */
    --input: 211 26% 27%;
    --ring: 71 100% 51%;

    --radius: 0.5rem;

    --chart-1: 71 100% 51%; /* Accent primary: #D2FF05 */
    --chart-2: 82 49% 57%; /* Accent secondary: #9AD153 */
    --chart-3: 48 84% 65%; /* Warm highlight light: #EED56F */
    --chart-4: 52 64% 46%; /* Warm highlight dark: #B8901F */
    --chart-5: 56 63% 35%; /* Deep green: #527D2D */
    
    --sidebar-background: 222 57% 5%;
    --sidebar-foreground: 48 43% 97%;
    --sidebar-primary: 71 100% 51%;
    --sidebar-primary-foreground: 71 100% 10%;
    --sidebar-accent: 216 28% 14%;
    --sidebar-accent-foreground: 71 100% 51%;
    --sidebar-border: 211 26% 27%;
    --sidebar-ring: 71 100% 51%;
  }

  .dark {
    --background: 222 57% 5%; /* #0B0E15 */
    --foreground: 48 43% 97%; /* #F6F3EA */

    --card: 216 28% 14%; /* #1D262B */
    --card-foreground: 48 43% 97%;

    --popover: 222 57% 5%;
    --popover-foreground: 48 43% 97%;

    --primary: 71 100% 51%; /* #D2FF05 */
    --primary-foreground: 71 100% 10%;

    --secondary: 213 27% 20%;
    --secondary-foreground: 48 43% 97%;

    --muted: 213 27% 20%;
    --muted-foreground: 215 20% 65%;

    --accent: 82 49% 57%; /* #9AD153 */
    --accent-foreground: 210 40% 98%;

    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;

    --border: 211 26% 27%;
    --input: 211 26% 27%;
    --ring: 71 100% 51%;

    --chart-1: 71 100% 51%;
    --chart-2: 82 49% 57%;
    --chart-3: 48 84% 65%;
    --chart-4: 52 64% 46%;
    --chart-5: 56 63% 35%;

    --sidebar-background: 222 57% 5%;
    --sidebar-foreground: 48 43% 97%;
    --sidebar-primary: 71 100% 51%;
    --sidebar-primary-foreground: 71 100% 10%;
    --sidebar-accent: 216 28% 14%;
    --sidebar-accent-foreground: 71 100% 51%;
    --sidebar-border: 211 26% 27%;
    --sidebar-ring: 71 100% 51%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    background-color: hsl(var(--background));
    background-image:
      url('/brand/hud-ticks.svg'),
      url('/brand/bg-paths.svg'),
      url('/brand/bg-grid.svg'),
      linear-gradient(180deg, hsl(var(--background)) 0%, #101520 100%);
    background-size:
      200px 200px,
      100% 100%,
      auto,
      100% 100%;
    background-position:
      20px 20px,
      center,
      center,
      center;
    background-repeat:
      no-repeat,
      no-repeat,
      repeat,
      no-repeat;
    background-attachment: fixed;
  }
}

@layer utilities {
  .glass-card {
    @apply bg-card/60 backdrop-blur-xl border border-primary/10 rounded-lg shadow-lg;
  }
}
```

---
---
---

# FILE: src/app/layout.tsx

```tsx
import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import { AppProvider } from '@/app/app-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'VeraMine Hub',
  description: 'The central nervous system for your mining operations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@700&family=Montserrat:wght@800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning={true}>
        <AppProvider>
          {children}
        </AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
```

---
---
---

# FILE: src/app/login/page.tsx

```tsx
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center p-4">
      <LoginForm />
    </main>
  );
}
```

---
---
---

# FILE: src/app/page.tsx

```tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import { useUser }_from '@/firebase/auth/use-user';_

_export default function Home() {_
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (!isUserLoading) {
      if (user) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [user, isUserLoading, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Loader className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
```

---
---
---

# FILE: src/components/FirebaseErrorListener.tsx

```tsx
'use client';

import { useState, useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * An invisible component that listens for globally emitted 'permission-error' events.
 * It throws any received error to be caught by Next.js's global-error.tsx.
 */
export function FirebaseErrorListener() {
  // Use the specific error type for the state for type safety.
  const [error, setError] = useState<FirestorePermissionError | null>(null);

  useEffect(() => {
    // The callback now expects a strongly-typed error, matching the event payload.
    const handleError = (error: FirestorePermissionError) => {
      // Set error in state to trigger a re-render.
      setError(error);
    };

    // The typed emitter will enforce that the callback for 'permission-error'
    // matches the expected payload type (FirestorePermissionError).
    errorEmitter.on('permission-error', handleError);

    // Unsubscribe on unmount to prevent memory leaks.
    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  // On re-render, if an error exists in state, throw it.
  if (error) {
    throw error;
  }

  // This component renders nothing.
  return null;
}
```

---
---
---

# FILE: src/components/admin/user-invite-form.tsx

```tsx
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserPlus } from "lucide-react";
import { useFirestore, useUser } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import type { User } from '@/types/user';

const roles = ["admin", "ops", "hr", "safety", "viewer"];
const MOCK_TENANT_ID = 'VeraMine'; // As defined in use-user.tsx

export function UserInviteForm() {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('viewer');
    const [isInviting, setIsInviting] = useState(false);
    const { toast } = useToast();
    const firestore = useFirestore();
    const { user } = useUser();

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!firestore || !user) return;
        
        if (!email) {
            toast({
                variant: 'destructive',
                title: 'Email is required',
                description: 'Please enter an email address to send an invitation.',
            });
            return;
        }

        setIsInviting(true);

        // This is a simplified user creation flow. 
        // In a real app, you'd likely use a Cloud Function to create the auth user
        // and send a proper email. For the prototype, we create a placeholder user ID
        // and set the document in Firestore.
        const newUserId = `invited_${new Date().getTime()}`;
        const usersColRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'users');
        const newUserDocRef = doc(usersColRef, newUserId);

        const newUser: Omit<User, 'id'> & { id: string; invitedAt: string; tenantId: string } = {
            id: newUserId,
            tenantId: MOCK_TENANT_ID,
            email,
            role,
            status: 'pending',
            invitedAt: new Date().toISOString(),
            displayName: 'Invited User'
        };

        // Use the non-blocking update function
        setDocumentNonBlocking(newUserDocRef, newUser);

        // We don't await the result, but we can give immediate feedback.
        toast({
            title: "Invitation Sent",
            description: `An invitation record for ${email} has been created.`,
        });
        
        setEmail('');
        setRole('viewer');
        setIsInviting(false);
    };

    // Only render the component if the user is an admin
    if (user?.role !== 'admin') {
        return null;
    }

    return (
        <Card className="glass-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-6 w-6" />
                    Invite New User
                </CardTitle>
                <CardDescription>
                    Send an invitation to a new user to join this tenant.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleInvite}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                            id="email" 
                            type="email" 
                            placeholder="new.user@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isInviting}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select 
                            value={role} 
                            onValueChange={setRole}
                            disabled={isInviting}
                        >
                            <SelectTrigger id="role">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map(r => (
                                    <SelectItem key={r} value={r} className="capitalize">{r}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="w-full font-bold" disabled={isInviting}>
                        {isInviting ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            "Send Invitation"
                        )}
                    </Button>
                </CardContent>
            </form>
        </Card>
    );
}
```

---
---
---

# FILE: src/components/admin/user-list.tsx

```tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Users } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useFirestore } from "@/firebase";
import { doc } from "firebase/firestore";
import { updateDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useToast } from "@/hooks/use-toast";
import type { User } from '@/types/user';


type UserListProps = {
  users: User[];
  isLoading: boolean;
};

const MOCK_TENANT_ID = 'VeraMine';

const statusColors: Record<User['status'], string> = {
    'active': 'bg-green-500/20 text-green-400 border-green-500/30',
    'pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'disabled': 'bg-red-500/20 text-red-500 border-red-500/30'
}

export function UserList({ users, isLoading }: UserListProps) {
  const firestore = useFirestore();
  const { toast } = useToast();

  const handleUpdateUserStatus = (userId: string, status: User['status']) => {
    if (!firestore) return;
    const userDocRef = doc(firestore, 'tenants', MOCK_TENANT_ID, 'users', userId);
    updateDocumentNonBlocking(userDocRef, { status });
    toast({
      title: 'User status updated',
      description: `The user has been ${status}.`,
    });
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            User Management
        </CardTitle>
        <CardDescription>A list of all users in the current tenant.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Display Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                </TableRow>
              ))
            ) : (
              users.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{user.displayName || '-'}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize border-primary/40">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${statusColors[user.status]} capitalize`}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                              </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit User</DropdownMenuItem>
                              {user.status === 'pending' && <DropdownMenuItem>Resend Invitation</DropdownMenuItem>}
                              {user.status !== 'disabled' ? (
                                <DropdownMenuItem 
                                  className="text-destructive" 
                                  onClick={() => handleUpdateUserStatus(user.id, 'disabled')}
                                >
                                  Disable User
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handleUpdateUserStatus(user.id, 'active')}>
                                  Enable User
                                </DropdownMenuItem>
                              )}
                          </DropdownMenuContent>
                      </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
```

---
---
---

# FILE: src/components/alerts/alert-rule-generator.tsx

```tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Loader2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateAlertRule, type GenerateAlertRuleOutput } from '@/ai/flows/generate-alert-rule';
import { useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Input } from '../ui/input';

const MOCK_TENANT_ID = 'VeraMine'; // As defined in use-user.tsx

export function AlertRuleGenerator() {
  const [description, setDescription] = useState('Alert if plant pressure exceeds 150 PSI for more than 5 minutes.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedRule, setGeneratedRule] = useState<GenerateAlertRuleOutput | null>(null);

  const { toast } = useToast();
  const firestore = useFirestore();

  const handleGenerateRule = async () => {
    if (!description.trim()) {
      toast({
        variant: 'destructive',
        title: 'Description is empty',
        description: 'Please describe the alert rule you want to create.',
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedRule(null);
    try {
      const result = await generateAlertRule({ description });
      setGeneratedRule(result);
      toast({
        title: 'AI Rule Generated',
        description: 'Review the generated rule below and save it.',
      });
    } catch (error) {
      console.error('Error generating alert rule:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate alert rule.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveRule = async () => {
    if (!firestore || !generatedRule) return;

    setIsSaving(true);
    const alertRulesColRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'alertRules');
    
    const newRule = {
      tenantId: MOCK_TENANT_ID,
      name: generatedRule.name,
      description,
      configuration: generatedRule.configuration,
      enabled: false, // Rules are disabled by default
    };

    addDocumentNonBlocking(alertRulesColRef, newRule);

    toast({
        title: "Alert Rule Saved",
        description: `The rule "${generatedRule.name}" has been saved.`
    });

    // Reset form
    setGeneratedRule(null);
    setDescription('');
    setIsSaving(false);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Generate New Alert Rule</CardTitle>
        <CardDescription>Use natural language to create a new alert rule.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">Rule Description</Label>
          <Textarea
            id="description"
            placeholder="e.g., 'Alert if a haul truck enters the main pit geofence.'"
            className="min-h-[100px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isGenerating || isSaving}
          />
        </div>
        <Button onClick={handleGenerateRule} disabled={isGenerating || isSaving} className="w-full font-bold">
          {isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
          Generate with AI
        </Button>

        {generatedRule && (
          <div className="space-y-4 pt-4 border-t border-border mt-4">
             <div className="space-y-2">
                <Label htmlFor="ruleName">Rule Name</Label>
                <Input id="ruleName" value={generatedRule.name} readOnly disabled />
            </div>
            <div className="space-y-2">
                <Label htmlFor="configuration">Generated Configuration (JSON)</Label>
                <Textarea id="configuration" value={generatedRule.configuration} readOnly className="font-mono text-xs min-h-[120px]" disabled />
            </div>
             <div className="space-y-2">
                <Label>Rule Preview</Label>
                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md">{generatedRule.preview}</p>
            </div>
            <div className="space-y-2">
                <Label>Testing Suggestion</Label>
                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md">{generatedRule.testModeSuggestion}</p>
            </div>
          </div>
        )}
      </CardContent>
      {generatedRule && (
        <CardFooter>
            <Button onClick={handleSaveRule} disabled={isSaving || isGenerating} className="w-full">
                {isSaving ? <Loader2 className="animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Rule
            </Button>
        </CardFooter>
      )}
    </Card>
  );
}
```

---
---
---

# FILE: src/components/alerts/alert-rule-list.tsx

```tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '../ui/skeleton';
import { Switch } from '../ui/switch';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { updateDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


export type AlertRule = {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  configuration: string;
  enabled: boolean;
};

type AlertRuleListProps = {
  alertRules: AlertRule[];
  isLoading: boolean;
};

const MOCK_TENANT_ID = 'VeraMine';

export function AlertRuleList({ alertRules, isLoading }: AlertRuleListProps) {
    const firestore = useFirestore();
    const { toast } = useToast();
    const [ruleToDelete, setRuleToDelete] = useState<AlertRule | null>(null);
    
    const handleToggleRule = (rule: AlertRule) => {
        if (!firestore) return;
        const ruleDocRef = doc(firestore, 'tenants', MOCK_TENANT_ID, 'alertRules', rule.id);
        const newStatus = !rule.enabled;
        updateDocumentNonBlocking(ruleDocRef, { enabled: newStatus });
        toast({
            title: `Rule ${newStatus ? 'Enabled' : 'Disabled'}`,
            description: `"${rule.name}" is now ${newStatus ? 'active' : 'inactive'}.`
        });
    };

    const handleDeleteRule = () => {
        if (!firestore || !ruleToDelete) return;
        const ruleDocRef = doc(firestore, 'tenants', MOCK_TENANT_ID, 'alertRules', ruleToDelete.id);
        deleteDocumentNonBlocking(ruleDocRef);
        toast({
            title: 'Rule Deleted',
            description: `The rule "${ruleToDelete.name}" has been deleted.`,
        });
        setRuleToDelete(null);
    };

  return (
    <>
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Existing Alert Rules</CardTitle>
        <CardDescription>A list of all configured alert rules for the tenant.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-2/3" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-12" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : alertRules.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No alert rules configured yet.
                </TableCell>
              </TableRow>
            ) : (
              alertRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell className="text-muted-foreground max-w-sm truncate">{rule.description}</TableCell>
                  <TableCell>
                    <Badge variant={rule.enabled ? 'default' : 'outline'} className={rule.enabled ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}>
                      {rule.enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                        <Switch
                            checked={rule.enabled}
                            onCheckedChange={() => handleToggleRule(rule)}
                            aria-label="Toggle rule"
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit Rule</DropdownMenuItem>
                                <DropdownMenuItem>Test Rule</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                    className="text-destructive"
                                    onClick={() => setRuleToDelete(rule)}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Rule
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
     <AlertDialog open={!!ruleToDelete} onOpenChange={(open) => !open && setRuleToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the alert rule
              <span className="font-bold"> "{ruleToDelete?.name}"</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRule} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
```

---
---
---

# FILE: src/components/alerts/alerts-inbox.tsx

```tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BellRing, MoreHorizontal, CheckCircle, ShieldAlert } from 'lucide-react';
import { useAlerts, type ActiveAlert } from '@/hooks/use-alerts';
import { Skeleton } from '../ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

export function AlertsInbox() {
  const { alerts, isLoading } = useAlerts();

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BellRing className="h-6 w-6" />
          Active Alerts Inbox
        </CardTitle>
        <CardDescription>
          A real-time view of all triggered alerts requiring attention.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)
          ) : alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-center text-muted-foreground">
              <CheckCircle className="h-10 w-10 text-green-500 mb-2" />
              <p className="font-semibold">All Clear</p>
              <p className="text-sm">No active alerts at this time.</p>
            </div>
          ) : (
            alerts.map(alert => (
              <div key={alert.id} className="flex items-center justify-between p-3 rounded-md bg-muted/50 border border-destructive/20 hover:bg-muted transition-colors">
                <div className="flex items-center gap-4">
                  <ShieldAlert className="h-6 w-6 text-destructive" />
                  <div>
                    <p className="font-semibold">{alert.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Triggered {formatDistanceToNow(new Date(alert.triggeredAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Acknowledge</DropdownMenuItem>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Silence for 1 Hour</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

---
---
---

# FILE: src/components/auth/login-form.tsx

```tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { HardHat, Loader2 } from 'lucide-react';
import { useAuth } from '@/firebase';
import { useUser } from '@/firebase/auth/use-user';
import { signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

export function LoginForm() {
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('demo@veramine.com');
  const [password, setPassword] = useState('password');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { user, isUserLoading } = useUser();

  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  useEffect(() => {
    if (!isUserLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;

    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // The useUser hook will handle the redirect via the useEffect above
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Sign In Failed',
        description: error.message || 'An unexpected error occurred.',
      });
      setIsLoggingIn(false);
    }
  };

  const handleDemoLogin = async () => {
    if (!auth) return;

    setIsLoggingIn(true);
    try {
      await signInAnonymously(auth);
      // The useUser hook will handle the redirect
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Demo Sign In Failed',
        description: error.message || 'Could not sign in as guest.',
      });
      setIsLoggingIn(false);
    }
  };

  const isLoading = isLoggingIn || isUserLoading;

  return (
    <Card className="w-full max-w-md glass-card">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <HardHat className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="font-headline text-3xl">VeraMine Hub</CardTitle>
        <CardDescription>Central nervous system for your mining operations.</CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full font-bold" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : 'Sign In'}
          </Button>
          {isDemoMode && (
            <>
              <div className="relative w-full">
                <Separator className="absolute left-0 top-1/2 -translate-y-1/2" />
                <p className="text-center text-xs text-muted-foreground bg-card px-2 relative">
                  DEMO LOGIN
                </p>
              </div>
              <Button variant="outline" type="button" className="w-full" onClick={handleDemoLogin} disabled={isLoading}>
                 {isLoading ? <Loader2 className="animate-spin" /> : 'Continue as Guest'}
              </Button>
            </>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
```

---
---
---

# FILE: src/components/copilot/copilot-panel.tsx

```tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { CornerDownLeft, Mic, Paperclip, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ScrollArea } from '../ui/scroll-area';
import { opsCopilot } from '@/ai/flows/ops-copilot-flow';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const initialMessages: Message[] = [
  {
    role: 'assistant',
    content: "Welcome to the Ops Copilot. I'm a conversational AI assistant. Right now, I'm not connected to your live operational data, but you can ask me general questions or for help with analysis. How can I assist you today?",
  },
];

export function CopilotPanel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        // A bit of a hack to scroll to the bottom.
        // The underlying Radix component doesn't expose a direct API.
        const viewport = scrollAreaRef.current.querySelector('div');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await opsCopilot({ message: input });
      const assistantMessage: Message = { role: 'assistant', content: result.response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling copilot flow:', error);
      const errorMessage: Message = { role: 'assistant', content: "Sorry, I encountered an error. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="p-4 border-b border-primary/10">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <SheetTitle className="font-headline text-2xl">Ops Copilot</SheetTitle>
        </div>
        <SheetDescription>
          Your AI assistant for mining operations. Ask questions, get insights.
        </SheetDescription>
      </SheetHeader>
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="space-y-6 text-sm p-4">
          {messages.map((message, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${message.role === 'assistant' ? 'bg-primary/10' : 'bg-muted'}`}>
                {message.role === 'assistant' ? <Bot className="h-5 w-5 text-primary" /> : <User className="h-5 w-5 text-foreground" />}
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-semibold">{message.role === 'assistant' ? 'Ops Copilot' : 'You'}</p>
                <div className={`p-3 rounded-lg ${message.role === 'assistant' ? 'bg-muted' : ''}`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
               <div className="p-2 rounded-full bg-primary/10">
                    <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                    <p className="font-semibold">Ops Copilot</p>
                    <div className="p-3 flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        <p className="text-muted-foreground">Thinking...</p>
                    </div>
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-primary/10">
        <form onSubmit={handleSubmit} className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Ask the Ops Copilot..."
            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                }
            }}
            disabled={isLoading}
          />
          <div className="flex items-center p-3 pt-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={isLoading}>
                  <Paperclip className="h-4 w-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Attach File</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={isLoading}>
                  <Mic className="h-4 w-4" />
                  <span className="sr-only">Use Microphone</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Use Microphone</TooltipContent>
            </Tooltip>
            <Button type="submit" size="sm" className="ml-auto gap-1.5" disabled={isLoading}>
              Send
              <CornerDownLeft className="h-3.5 w-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

---
---
---

# FILE: src/components/dashboard/anomaly-triage-card.tsx

```tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2, SearchCheck, Waypoints, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { triageAnomaly, type TriageAnomalyOutput } from '@/ai/flows/triage-anomalies';

// Mock data to simulate an anomaly event
const mockAnomaly = {
  anomalyDescription: 'Sudden pressure drop in primary crusher hydraulic line H-12.',
  relevantEvents: 'Crusher motor speed fluctuated wildly 5 minutes prior. High-temperature alarm on bearing B-4 was acknowledged 10 minutes ago.',
  telemetryData: 'Hydraulic pressure dropped from 3000 PSI to 250 PSI in < 10 seconds. Flow rate shows a corresponding spike.',
};

export function AnomalyTriageCard() {
  const [isTriaging, setIsTriaging] = useState(false);
  const [triageResult, setTriageResult] = useState<TriageAnomalyOutput | null>(null);
  const { toast } = useToast();

  const handleTriage = async () => {
    setIsTriaging(true);
    setTriageResult(null);
    try {
      const result = await triageAnomaly(mockAnomaly);
      setTriageResult(result);
      toast({
        title: 'AI Triage Complete',
        description: 'Anomaly has been analyzed. See results below.',
      });
    } catch (error) {
      console.error('Error performing triage:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not perform AI triage.',
      });
    } finally {
      setIsTriaging(false);
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-primary" />
          Anomaly Triage Assistant
        </CardTitle>
        <CardDescription>
          Use AI to analyze an active anomaly and get likely causes and next steps.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm p-3 bg-muted/50 rounded-lg border border-dashed border-primary/20">
            <p className="font-semibold text-foreground">Current Anomaly (Mock Data)</p>
            <p className="text-muted-foreground">{mockAnomaly.anomalyDescription}</p>
        </div>

        <Button onClick={handleTriage} disabled={isTriaging} className="w-full font-bold">
          {isTriaging ? <Loader2 className="animate-spin" /> : 'Triage with AI'}
        </Button>

        {triageResult && (
          <div className="space-y-4 pt-4 border-t border-border mt-4">
            <h3 className="font-semibold text-lg text-center">AI Triage Results</h3>
            
            <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2 text-primary"><SearchCheck/> Likely Causes</h4>
                <ul className="list-disc list-inside text-muted-foreground bg-muted p-3 rounded-md space-y-1 text-sm">
                    {triageResult.likelyCauses.map((cause, i) => <li key={i}>{cause}</li>)}
                </ul>
            </div>

            <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2 text-primary"><Waypoints /> Recommended Next Steps</h4>
                 <ul className="list-decimal list-inside text-muted-foreground bg-muted p-3 rounded-md space-y-1 text-sm">
                    {triageResult.nextSteps.map((step, i) => <li key={i}>{step}</li>)}
                </ul>
            </div>
            
            <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2 text-primary"><Lightbulb /> Analysis</h4>
                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md">{triageResult.observedVsInferred}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

---
---
---

# FILE: src/components/dashboard/downtime-chart.tsx

```tsx
"use client"

import { Pie, PieChart, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { downtimeData } from "@/lib/mock-data"

const chartConfig = {
  hours: {
    label: "Hours",
  },
  mechanical: {
    label: "Mechanical",
    color: "hsl(var(--chart-1))",
  },
  electrical: {
    label: "Electrical",
    color: "hsl(var(--chart-2))",
  },
  operational: {
    label: "Operational",
    color: "hsl(var(--chart-3))",
  },
  weather: {
    label: "Weather",
    color: "hsl(var(--chart-4))",
  },
  scheduled: {
    label: "Scheduled",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function DowntimeChart() {
  return (
    <Card className="glass-card h-full flex flex-col">
      <CardHeader>
        <CardTitle>Downtime by Reason</CardTitle>
        <CardDescription>Total hours of downtime in the last 30 days.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[250px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={downtimeData}
              dataKey="hours"
              nameKey="reason"
              innerRadius={60}
              strokeWidth={5}
            >
              {downtimeData.map((entry) => (
                <Cell key={`cell-${entry.reason}`} fill={chartConfig[entry.reason.toLowerCase() as keyof typeof chartConfig]?.color || '#ccc'} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
```

---
---
---

# FILE: src/components/dashboard/event-log.tsx

```tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '../ui/skeleton';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit, where } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { Activity, ClipboardPaste, ShieldAlert, TimerOff } from 'lucide-react';
import type { Event } from '@/types/event';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

const MOCK_TENANT_ID = 'VeraMine'; // As defined in use-user.tsx

const eventTypeConfig: Record<string, { icon: React.ElementType; color: string; }> = {
    downtime: { icon: TimerOff, color: 'text-orange-400' },
    incident: { icon: ShieldAlert, color: 'text-red-400' },
    handover: { icon: ClipboardPaste, color: 'text-blue-400' },
    default: { icon: Activity, color: 'text-primary' },
};

const eventTypes = ['downtime', 'incident', 'handover'];


export function EventLog() {
  const firestore = useFirestore();
  const [filter, setFilter] = useState<string | null>(null);

  const eventsColRef = useMemoFirebase(() => {
    if (!firestore) return null;
    const baseRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'events');
    
    const queries = [orderBy('timestamp', 'desc'), limit(15)];
    if (filter) {
      queries.unshift(where('eventType', '==', filter));
    }
    
    return query(baseRef, ...queries);
  }, [firestore, filter]);

  const { data: events, isLoading } = useCollection<Event>(eventsColRef);

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
                <CardTitle className="flex items-center gap-2">
                    <Activity className="h-6 w-6" />
                    Live Event Log
                </CardTitle>
                <CardDescription>A real-time stream of the latest events across the operation.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <Button 
                    variant={!filter ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setFilter(null)}
                >
                    All
                </Button>
                {eventTypes.map(type => (
                    <Button 
                        key={type}
                        variant={filter === type ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setFilter(type)}
                        className="capitalize"
                    >
                        {type}
                    </Button>
                ))}
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Event Type</TableHead>
              <TableHead>Details</TableHead>
              <TableHead className="w-[200px]">Actor</TableHead>
              <TableHead className="text-right w-[150px]">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-2/3" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-5 w-20 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : !events || events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No {filter ? `${filter} ` : ''}events to display.
                </TableCell>
              </TableRow>
            ) : (
              events.map((event) => {
                const config = eventTypeConfig[event.eventType] || eventTypeConfig.default;
                const Icon = config.icon;
                return (
                    <TableRow key={event.id} className="hover:bg-muted/30">
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 ${config.color}`} />
                            <Badge variant="outline" className="capitalize border-primary/40">{event.eventType}</Badge>
                        </div>
                    </TableCell>
                    <TableCell className="font-medium max-w-sm truncate">{getEventDetails(event)}</TableCell>
                    <TableCell className="text-muted-foreground">{event.actor}</TableCell>
                    <TableCell className="text-right text-muted-foreground">
                        {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
                    </TableCell>
                    </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function getEventDetails(event: Event): string {
    if (!event.payload || typeof event.payload !== 'object') {
        return event.payload ? String(event.payload) : 'No details';
    }

    switch(event.eventType) {
        case 'downtime':
            return `Asset '${event.payload.assetId}' reported ${event.payload.duration} mins downtime. Reason: ${event.payload.reason}.`;
        case 'incident':
            return `New Incident: '${event.payload.title}' classified as '${event.payload.classification}'.`;
        case 'handover':
            return `Shift handover notes submitted for site '${event.payload.siteId}'.`;
        default:
            // Fallback for any other event types
            return event.payload.details || event.payload.message || JSON.stringify(event.payload);
    }
}
```

---
---
---

# FILE: src/components/dashboard/production-chart.tsx

```tsx
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { productionData } from "@/lib/mock-data"

const chartConfig = {
  coal: {
    label: "Coal",
    color: "hsl(var(--chart-1))",
  },
  iron: {
    label: "Iron Ore",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ProductionChart() {
  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <CardTitle>Production Output</CardTitle>
        <CardDescription>Daily tonnes of coal and iron ore produced.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={productionData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="coal" radius={4} />
            <Bar dataKey="iron" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
```

---
---
---

# FILE: src/components/dashboard/recommended-actions.tsx

```tsx
"use client"

import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "../ui/button"
import { ThumbsDown, ThumbsUp, Zap, Loader2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "../ui/badge"
import { useCollection, useFirestore, useMemoFirebase, useUser, updateDocumentNonBlocking } from "@/firebase";
import { collection, query, where, limit, doc } from "firebase/firestore";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import type { AiRecommendation } from "@/types/ai-recommendation";

const MOCK_TENANT_ID = 'VeraMine';

export function RecommendedActions() {
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();

  // This hook now fetches live data from Firestore.
  // It fetches the 3 most recent recommendations for the current tenant that haven't been verified yet.
  const recommendationsColRef = useMemoFirebase(() => {
    if (!firestore) return null;
    const baseRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'aiRecommendations');
    // For now, we fetch any recommendations. In a real app, you might filter by `verified: null`.
    return query(baseRef, limit(3), where('verified', '==', null));
  }, [firestore]);

  const { data: recommendations, isLoading } = useCollection<AiRecommendation>(recommendationsColRef);

  const handleVerification = (recommendationId: string, accepted: boolean) => {
    if (!firestore || !user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to verify a recommendation."
      });
      return;
    }

    const recommendationDocRef = doc(firestore, 'tenants', MOCK_TENANT_ID, 'aiRecommendations', recommendationId);
    
    // Use non-blocking update for quick UI feedback
    updateDocumentNonBlocking(recommendationDocRef, { verified: accepted });

    toast({
      title: `Recommendation ${accepted ? 'Accepted' : 'Rejected'}`,
      description: "Thank you for your feedback.",
    });
  };


  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary"/>
            <CardTitle className="font-headline">Recommended Actions</CardTitle>
        </div>
        <CardDescription>AI-suggested actions based on recent operational data.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-4 rounded-lg border border-border p-3">
              <div className="space-y-2">
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-24" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-7 w-7 rounded-full" />
                  <Skeleton className="h-7 w-7 rounded-full" />
                </div>
              </div>
            </div>
          ))
        ) : !recommendations || recommendations.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
            <p>No new AI recommendations at this time.</p>
          </div>
        ) : (
          recommendations.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 rounded-lg border border-border p-3 transition-colors hover:bg-muted/30">
              <div className="space-y-2">
                <p className="font-semibold text-sm">{item.recommendation}</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p><span className="font-medium text-foreground">Owner:</span> {item.owner}</p>
                  <p><span className="font-medium text-foreground">Impact:</span> {item.impact}</p>
                  {item.evidenceLinks && item.evidenceLinks.length > 0 && (
                    <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
                        <span className="font-medium text-foreground">Evidence:</span>
                        {item.evidenceLinks.map(link => (
                          <Link href={link} key={link} className="text-primary/80 hover:text-primary underline text-xs capitalize">
                            {link.split('/').pop()?.split('?')[0].replace(/-/g, ' ')}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 shrink-0">
                  <Badge variant="outline" className="border-primary/50 text-primary text-xs">
                      Confidence: {(item.confidence * 100).toFixed(0)}%
                  </Badge>
                  <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7 border-green-500/50 text-green-500 hover:bg-green-500/10 hover:text-green-400 disabled:opacity-50"
                        onClick={() => handleVerification(item.id, true)}
                        disabled={item.verified === true}
                        aria-label="Accept Recommendation"
                      >
                          <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7 border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                        onClick={() => handleVerification(item.id, false)}
                        disabled={item.verified === false}
                        aria-label="Reject Recommendation"
                      >
                          <ThumbsDown className="h-4 w-4" />
                      </Button>
                  </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
```

---
---
---

# FILE: src/components/dashboard/stat-card.tsx

```tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { motion } from "framer-motion";

type StatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: "up" | "down" | "static";
  trendValue: string;
  period: string;
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  period,
}: StatCardProps) {

  const TrendIcon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : Minus;
  
  const trendColor = trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-orange-400' : 'text-muted-foreground';

  return (
    <motion.div variants={cardVariants}>
      <Card className="glass-card transition-all hover:border-primary/30 h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold font-sans text-primary">{value}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <p className={cn("flex items-center gap-0.5 font-semibold", trendColor)}>
              <TrendIcon className="h-3 w-3" />
              {trendValue}
            </p>
            <span>{period}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
```

---
---
---

# FILE: src/components/layout/app-header.tsx

```tsx
'use client';

import { Bell, MessageSquare, Search, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import { useAuth } from '@/firebase';
import { useUser } from '@/firebase/auth/use-user';
import { Sheet, SheetContent } from '../ui/sheet';
import { CopilotPanel } from '../copilot/copilot-panel';
import { translateNaturalLanguageToQuery } from '@/ai/flows/natural-language-to-query';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const auth = useAuth();
  const { user } = useUser();
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

  const handleLogout = () => {
    if (auth) {
      auth.signOut();
    }
    router.replace('/login');
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const result = await translateNaturalLanguageToQuery({
        naturalLanguageQuery: searchQuery,
      });
      toast({
        title: "AI Query Generated",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(result, null, 2)}</code>
          </pre>
        ),
      });
    } catch (error) {
      console.error("Error translating query:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not translate natural language query.",
      });
    }
  };

  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-primary/10 bg-background/80 px-4 backdrop-blur-sm md:px-6">
        <SidebarTrigger className="md:hidden" />

        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-headline text-foreground">VeraMine</span>
          {pathSegments.map((segment, index) => (
            <Fragment key={segment}>
              <ChevronRight className="h-4 w-4" />
              <span
                className={
                  index === pathSegments.length - 1
                    ? 'text-foreground capitalize'
                    : 'capitalize'
                }
              >
                {segment}
              </span>
            </Fragment>
          ))}
        </div>

        <div className="flex-1">
          <form
            className="relative ml-auto flex-1 md:grow-0"
            onSubmit={handleSearchSubmit}
          >
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Ask for a report: 'downtime last 7 days'..."
              className="w-full rounded-lg bg-muted pl-8 md:w-[200px] lg:w-[320px] font-sans"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setIsCopilotOpen(true)}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="sr-only">AI Copilot</span>
        </Button>

        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-badge rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={userAvatar?.imageUrl}
                  alt={userAvatar?.description}
                  data-ai-hint={userAvatar?.imageHint}
                />
                <AvatarFallback>
                  {user?.email?.charAt(0).toUpperCase() ?? 'G'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              {user?.displayName ?? user?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <Sheet open={isCopilotOpen} onOpenChange={setIsCopilotOpen}>
        <SheetContent className="w-full max-w-lg p-0">
          <CopilotPanel />
        </SheetContent>
      </Sheet>
    </>
  );
}
```

---
---
---

# FILE: src/components/layout/app-sidebar.tsx

```tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HardHat, LayoutDashboard, Truck, Factory, ClipboardList, ShieldAlert, Users, FileText, MapPin, Plug, Settings, Bell } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/transport', icon: Truck, label: 'Transport' },
  { href: '/dashboard/plant', icon: Factory, label: 'Plant' },
  { href: '/dashboard/operations', icon: ClipboardList, label: 'Operations' },
  { href: '/dashboard/risk', icon: ShieldAlert, label: 'Risk' },
  { href: '/dashboard/people', icon: Users, label: 'People' },
  { href: '/dashboard/reports', icon: FileText, label: 'Reports' },
  { href: '/dashboard/tracking', icon: MapPin, label: 'Tracking' },
  { href: '/dashboard/alerts', icon: Bell, label: 'Alerts' },
  { href: '/dashboard/integrations', icon: Plug, label: 'Integrations' },
];

const bottomNavItems = [
  { href: '/dashboard/admin', icon: Settings, label: 'Admin' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-primary/10 bg-card/60">
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <HardHat className="h-6 w-6 text-primary" />
          </div>
          <span className={cn(
            "font-headline text-2xl font-bold text-primary",
            "group-data-[collapsible=icon]:hidden"
          )}>
            VeraMine
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
          {bottomNavItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
```

---
---
---

# FILE: src/components/operations/downtime-capture.tsx

```tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, TimerOff } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useFirestore, useUser } from '@/firebase';
import { collection } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';

const MOCK_TENANT_ID = 'VeraMine';

export function DowntimeCapture() {
    const [assetId, setAssetId] = useState('Crusher-01');
    const [duration, setDuration] = useState('45');
    const [reason, setReason] = useState('Unscheduled Maintenance');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const firestore = useFirestore();
    const { user } = useUser();
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!firestore || !user) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'You must be logged in to perform this action.',
            });
            return;
        }

        if (!assetId || !duration || !reason) {
             toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please fill out Asset ID, Duration, and Reason.',
            });
            return;
        }

        setIsSubmitting(true);

        const eventsColRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'events');
        
        const newEvent = {
            tenantId: MOCK_TENANT_ID,
            timestamp: new Date().toISOString(),
            eventType: 'downtime',
            actor: user.displayName || user.email,
            payload: {
                assetId,
                duration: parseInt(duration, 10),
                reason,
                notes,
            }
        };

        addDocumentNonBlocking(eventsColRef, newEvent);

        toast({
            title: 'Downtime Event Logged',
            description: `Downtime for ${assetId} has been successfully recorded.`
        });

        // Reset form
        setAssetId('');
        setDuration('');
        setReason('');
        setNotes('');
        setIsSubmitting(false);
    }

    return (
        <Card className="glass-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TimerOff className="h-6 w-6" />
                    Log Downtime Event
                </CardTitle>
                <CardDescription>
                    Quickly capture a new downtime event.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='downtime-asset'>Asset ID</Label>
                            <Input id='downtime-asset' placeholder='e.g., Crusher-01' value={assetId} onChange={e => setAssetId(e.target.value)} disabled={isSubmitting} />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='downtime-duration'>Duration (mins)</Label>
                            <Input id='downtime-duration' type='number' placeholder='e.g., 45' value={duration} onChange={e => setDuration(e.target.value)} disabled={isSubmitting} />
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='downtime-reason'>Reason Code</Label>
                        <Input id='downtime-reason' placeholder='e.g., Unscheduled Maintenance' value={reason} onChange={e => setReason(e.target.value)} disabled={isSubmitting} />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='downtime-notes'>Notes</Label>
                        <Textarea 
                            id='downtime-notes'
                            placeholder="Add optional notes about the cause..."
                            className="min-h-[80px]"
                            value={notes} 
                            onChange={e => setNotes(e.target.value)} 
                            disabled={isSubmitting}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="animate-spin" /> : 'Log Event'}
                    </Button>
                </CardContent>
            </form>
        </Card>
    )
}
```

---
---
---

# FILE: src/components/operations/kpi-board.tsx

```tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'lucide-react';

export function KpiBoard() {
    return (
        <Card className="glass-card h-full min-h-[400px]">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-6 w-6" />
                    Operational KPI Board
                </CardTitle>
                <CardDescription>
                    A real-time view of key operational performance indicators.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-full text-muted-foreground">
                <p>Operational KPI charts will be displayed here.</p>
            </CardContent>
        </Card>
    )
}
```

---
---
---

# FILE: src/components/operations/shift-handover.tsx

```tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ClipboardPaste, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { useFirestore, useUser } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { addDocumentNonBlocking, setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';

const MOCK_TENANT_ID = 'VeraMine';
const MOCK_SITE_ID = 'SiteA';

export function ShiftHandover() {
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const firestore = useFirestore();
    const { user } = useUser();
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!firestore || !user) {
            toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to perform this action.' });
            return;
        }

        if (!notes.trim()) {
            toast({ variant: 'destructive', title: 'Notes are empty', description: 'Please enter handover notes to submit.' });
            return;
        }

        setIsSubmitting(true);

        // Also log this as a generic event
        const eventsColRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'events');
        const newEvent = {
            tenantId: MOCK_TENANT_ID,
            timestamp: new Date().toISOString(),
            eventType: 'handover',
            actor: user.displayName || user.email,
            payload: {
                siteId: MOCK_SITE_ID,
                summary: notes.substring(0, 100) + (notes.length > 100 ? '...' : ''),
            }
        };
        addDocumentNonBlocking(eventsColRef, newEvent);

        // Save the full summary
        const summariesColRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'shiftSummaries');
        const newSummary = {
            tenantId: MOCK_TENANT_ID,
            siteId: MOCK_SITE_ID,
            summary: notes,
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(), // Placeholder
            sources: ['manual_handover_note'],
        };
        addDocumentNonBlocking(summariesColRef, newSummary);


        toast({
            title: 'Handover Notes Submitted',
            description: 'Your notes have been saved for the next shift.'
        });

        setNotes('');
        setIsSubmitting(false);
    }

    return (
        <Card className="glass-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ClipboardPaste className="h-6 w-6" />
                    Shift Handover Notes
                </CardTitle>
                <CardDescription>
                    Record key information for the next shift manager.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                     <div className='space-y-2'>
                        <Label htmlFor='handover-notes'>Handover Notes</Label>
                        <Textarea 
                            id='handover-notes'
                            placeholder="Enter notes here... e.g., 'Haul truck #5 is due for refueling. Watch for weather changes from the west.'"
                            className="min-h-[120px]"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                         {isSubmitting ? <Loader2 className="animate-spin" /> : 'Submit Handover'}
                    </Button>
                </CardContent>
            </form>
        </Card>
    );
}
```

---
---
---

# FILE: src/components/operations/shift-summary-generator.tsx

```tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateShiftSummary } from '@/ai/flows/generate-shift-summary';
import { useFirestore, useUser } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection } from 'firebase/firestore';

const MOCK_TENANT_ID = 'VeraMine';
const MOCK_SITE_ID = 'SiteA';

export function ShiftSummaryGenerator() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedSummary, setGeneratedSummary] = useState<string | null>(null);
    const { toast } = useToast();
    const firestore = useFirestore();
    const { user } = useUser();

    const handleGenerateSummary = async () => {
        if (!firestore || !user) return;
        
        setIsGenerating(true);
        setGeneratedSummary(null);

        try {
            // In a real app, you'd fetch real events and downtime data.
            // For now, we'll use mock data to demonstrate the flow.
            const mockEvents = JSON.stringify([
                { id: 'EVT-001', type: 'downtime', details: 'Crusher-01 stopped for 45 mins.' },
                { id: 'EVT-002', type: 'maintenance', details: 'Haul Truck #5 refueled.' }
            ]);
            const mockDowntime = JSON.stringify([
                { asset: 'Crusher-01', duration: 45, reason: 'Mechanical' }
            ]);

            const result = await generateShiftSummary({
                siteName: MOCK_SITE_ID,
                shiftNumber: 2,
                date: new Date().toISOString().split('T')[0],
                events: mockEvents,
                downtimeData: mockDowntime,
            });

            // Save the generated summary to Firestore
            const summariesColRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'shiftSummaries');
            const newSummary = {
                tenantId: MOCK_TENANT_ID,
                siteId: MOCK_SITE_ID,
                summary: result.summary,
                startTime: new Date().toISOString(),
                endTime: new Date().toISOString(), // Placeholder
                sources: JSON.parse(result.sources),
            };
            addDocumentNonBlocking(summariesColRef, newSummary);
            
            setGeneratedSummary(result.summary);
            toast({
                title: 'AI Summary Generated',
                description: 'The shift summary has been created and saved.',
            });

        } catch (error) {
            console.error("Error generating shift summary:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not generate shift summary.',
            });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Card className="glass-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-6 w-6 text-primary" />
                    AI-Powered Shift Summary
                </CardTitle>
                <CardDescription>
                    Automatically generate a summary for the last shift based on logged events and downtime.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button onClick={handleGenerateSummary} disabled={isGenerating} className="w-full font-bold">
                    {isGenerating ? <Loader2 className="animate-spin" /> : 'Generate Last Shift Summary'}
                </Button>
                {generatedSummary && (
                    <div className="space-y-2 pt-4 border-t border-border mt-4">
                        <h3 className="font-semibold flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Generated Summary
                        </h3>
                        <p className="text-sm text-muted-foreground p-4 bg-muted rounded-md whitespace-pre-wrap">
                            {generatedSummary}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
```

---
---
---

# FILE: src/components/people/people-list.tsx

```tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '../ui/skeleton';
import type { User } from '@/types/user';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

type PeopleListProps = {
  users: User[];
  isLoading: boolean;
};

const statusColors: Record<User['status'], string> = {
  active: 'bg-green-500/20 text-green-400 border-green-500/30',
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  disabled: 'bg-red-500/20 text-red-500 border-red-500/30',
};

// Helper to get a consistent "random" compliance value for a user
const getComplianceValue = (userId: string) => {
    // Simple hash function to get a value between 0 and 100
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
        const char = userId.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash % 71) + 30; // Return a value between 30 and 100
}

export function PeopleList({ users, isLoading }: PeopleListProps) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>People Profiles</CardTitle>
        <CardDescription>A list of all personnel in the tenant, with their compliance status.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Compliance</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className='space-y-1'>
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                   <TableCell>
                    <Skeleton className="h-5 w-28" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              users.map((user) => {
                const compliance = getComplianceValue(user.id);
                return (
                    <TableRow key={user.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.displayName || 'User'} />
                            <AvatarFallback>{user.displayName?.charAt(0) ?? user.email.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p>{user.displayName || '-'}</p>
                            <p className='text-xs text-muted-foreground'>{user.email}</p>
                        </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline" className="capitalize border-primary/40">
                        {user.role}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline" className={`${statusColors[user.status]} capitalize`}>
                        {user.status}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <div className='flex items-center gap-2'>
                            <Progress value={compliance} className='w-24 h-2' />
                            <Badge variant='secondary' className='w-14 justify-center'>{compliance}%</Badge>
                        </div>
                    </TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit Training Records</DropdownMenuItem>
                            <DropdownMenuItem>Manage Compliance</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
```

---
---
---

# FILE: src/components/reports/report-card.tsx

```tsx
'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

type ReportCardProps = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export function ReportCard({ title, description, href, icon: Icon }: ReportCardProps) {
  return (
    <Link href={href} className="group">
      <Card className="glass-card h-full transition-all hover:border-primary/50 hover:shadow-primary/10 flex flex-col">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <div className="rounded-lg bg-primary/10 p-3">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription>{description}</CardDescription>
        </CardContent>
        <div className="flex justify-end p-4 pt-0">
            <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </div>
      </Card>
    </Link>
  );
}
```

---
---
---

# FILE: src/components/risk/incident-form.tsx

```tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { draftIncidentReport, type DraftIncidentReportOutput } from '@/ai/flows/draft-incident-report';
import { useFirestore, useUser } from '@/firebase';
import { collection } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import type { Incident } from '@/types/incident';

const MOCK_TENANT_ID = 'VeraMine'; // As defined in use-user.tsx

export function IncidentForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(
    'Haul truck #7 nearly collided with a light vehicle at the intersection of Haul Road A and B. The LV failed to yield. No injuries, minor vehicle damage.'
  );
  const [classification, setClassification] = useState('Near Miss');
  const [reportedBy, setReportedBy] = useState('Demo User');

  // State for AI-generated fields
  const [aiDraft, setAiDraft] = useState<Omit<DraftIncidentReportOutput, 'classification'> | null>(null);

  const [isDrafting, setIsDrafting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useUser();

  const handleDraftReport = async () => {
    if (!description.trim()) {
      toast({
        variant: 'destructive',
        title: 'Description is empty',
        description: 'Please provide a description of the incident.',
      });
      return;
    }

    setIsDrafting(true);
    setAiDraft(null);
    try {
      const { classification: aiClassification, ...rest } = await draftIncidentReport({
        freeText: description,
        selectedEvents: ['EVT-123', 'EVT-456'], // Mock event IDs
      });

      // Populate form fields with AI suggestions
      setClassification(aiClassification);
      setAiDraft(rest);
      
      toast({
        title: 'AI Draft Generated',
        description: 'Review the auto-filled fields and submit the report.',
      });

    } catch (error) {
      console.error('Error drafting incident report:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate AI draft.',
      });
    } finally {
      setIsDrafting(false);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !user || !title || !description || !classification) {
        toast({ variant: "destructive", title: "Missing Fields", description: "Please fill out all required fields."});
        return;
    }

    setIsSubmitting(true);
    
    // Also log this as a generic event
    const eventsColRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'events');
    const newEvent = {
        tenantId: MOCK_TENANT_ID,
        timestamp: new Date().toISOString(),
        eventType: 'incident',
        actor: user.displayName || user.email,
        payload: {
            title,
            classification,
        }
    };
    addDocumentNonBlocking(eventsColRef, newEvent);

    const incidentsColRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'incidents');
    const newIncident: Omit<Incident, 'id'> = {
        tenantId: MOCK_TENANT_ID,
        title,
        description,
        date: new Date().toISOString(),
        status: 'Under Investigation',
        classification,
        reportedBy,
        timeline: aiDraft?.timeline || '',
        causes: aiDraft?.causes || '',
        actions: aiDraft?.actions || '',
        capaSuggestions: aiDraft?.capaSuggestions || '',
    };

    addDocumentNonBlocking(incidentsColRef, newIncident);

    // Immediate feedback, not waiting for promise
    toast({
        title: "Incident Logged",
        description: `${title} has been submitted for investigation.`
    });

    // Reset form
    setTitle('');
    setDescription('');
    setClassification('');
    setReportedBy('Demo User');
    setAiDraft(null);
    setIsSubmitting(false);
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Log New Incident</CardTitle>
        <CardDescription>Capture the details of a new incident or near-miss.</CardDescription>
      </CardHeader>
      <form onSubmit={handleManualSubmit}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="e.g., Near-miss with Haul Truck #7" value={title} onChange={e => setTitle(e.target.value)} disabled={isDrafting || isSubmitting} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Free-Text Description</Label>
          <Textarea
            id="description"
            placeholder="Describe what happened..."
            className="min-h-[120px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isDrafting || isSubmitting}
          />
        </div>
         <div className="space-y-2">
          <Label htmlFor="classification">Classification</Label>
          <Input id="classification" placeholder="e.g., Safety, Operational" value={classification} onChange={e => setClassification(e.target.value)} disabled={isDrafting || isSubmitting} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reportedBy">Reported By</Label>
          <Input id="reportedBy" placeholder="Your Name" value={reportedBy} onChange={e => setReportedBy(e.target.value)} disabled={isDrafting || isSubmitting} />
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Button onClick={handleDraftReport} disabled={isDrafting || isSubmitting} className="w-full font-bold" type="button">
            {isDrafting ? <Loader2 className="animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
            AI-Draft Report
          </Button>
          <Button variant="secondary" type="submit" className="w-full" disabled={isDrafting || isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            Submit Manually
          </Button>
        </div>
      </CardContent>
      </form>
    </Card>
  );
}
```

---
---
---

# FILE: src/components/risk/incident-list.tsx

```tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { Skeleton } from '../ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import type { Incident } from '@/types/incident';


type IncidentListProps = {
  incidents: Incident[];
  isLoading: boolean;
};

const statusColors: Record<Incident['status'], string> = {
  'Under Investigation': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Closed: 'bg-green-500/20 text-green-400 border-green-500/30',
  'CAPA Pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

export function IncidentList({ incidents, isLoading }: IncidentListProps) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Recent Incidents</CardTitle>
        <CardDescription>A log of all captured safety and operational incidents.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : incidents.length === 0 ? (
          <div className="flex h-24 items-center justify-center text-muted-foreground">
            No incidents logged yet.
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {incidents.map((incident) => (
              <AccordionItem value={incident.id} key={incident.id}>
                <AccordionTrigger className="hover:no-underline hover:bg-muted/30 px-4 rounded-md">
                  <div className="flex flex-1 items-center justify-between text-sm">
                    <span className="font-medium max-w-xs truncate text-left">{incident.title}</span>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{incident.classification}</Badge>
                      <span className="hidden md:inline">{format(parseISO(incident.date), 'dd MMM yyyy')}</span>
                      <Badge variant="outline" className={`${statusColors[incident.status]} w-32 justify-center`}>
                        {incident.status}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4 text-muted-foreground space-y-4 bg-muted/20 border-l-2 border-primary/20">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pt-4">
                    <div>
                      <p className="font-semibold text-foreground mb-1">Reported By</p>
                      <p>{incident.reportedBy} on {format(parseISO(incident.date), 'dd MMM yyyy, HH:mm')}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Classification</p>
                      <p>{incident.classification}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Full Description</p>
                    <p>{incident.description}</p>
                  </div>
                  {incident.timeline && (
                    <div>
                      <p className="font-semibold text-foreground mb-1">AI-Generated Timeline</p>
                      <p className="whitespace-pre-wrap">{incident.timeline}</p>
                    </div>
                  )}
                  {incident.causes && (
                    <div>
                      <p className="font-semibold text-foreground mb-1">AI-Generated Causes</p>
                      <p className="whitespace-pre-wrap">{incident.causes}</p>
                    </div>
                  )}
                  {incident.actions && (
                    <div>
                      <p className="font-semibold text-foreground mb-1">AI-Generated Actions</p>
                      <p className="whitespace-pre-wrap">{incident.actions}</p>
                    </div>
                  )}
                   {incident.capaSuggestions && (
                    <div>
                      <p className="font-semibold text-foreground mb-1">AI-Suggested CAPA</p>
                      <p className="whitespace-pre-wrap">{incident.capaSuggestions}</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
```

---
---
---

# FILE: src/components/shared/date-range-picker.tsx

```tsx
"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 4, 1),
    to: addDays(new Date(2024, 4, 1), 11),
  })

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full sm:w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
```

---
---
---

# FILE: src/components/shared/page-header.tsx

```tsx
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
};

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row items-start md:items-center justify-between gap-4", className)}>
      <div className="grid gap-1">
        <h1 className="font-headline text-3xl md:text-4xl tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
```

---
---
---

# FILE: src/components/transport/fleet-overview.tsx

```tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Truck, Shovel, Construction, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';
import type { Vehicle } from '@/types/transport';
import { useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type FleetOverviewProps = {
  vehicles: Vehicle[];
  isLoading: boolean;
  onEdit: (vehicle: Vehicle) => void;
};

const statusColors: Record<Vehicle['status'], string> = {
  'On Route': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Idle': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  'Maintenance': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Offline': 'bg-red-500/20 text-red-400 border-red-500/30',
};

const vehicleTypeIcons: Record<Vehicle['type'], React.ElementType> = {
    'Haul Truck': Truck,
    'Light Vehicle': Truck, // Could use a car icon if available
    'Excavator': Shovel,
    'Dozer': Construction,
};

const MOCK_TENANT_ID = 'VeraMine';

export function FleetOverview({ vehicles, isLoading, onEdit }: FleetOverviewProps) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);

  const handleDelete = () => {
    if (!firestore || !vehicleToDelete) return;
    const vehicleDocRef = doc(firestore, 'tenants', MOCK_TENANT_ID, 'vehicles', vehicleToDelete.id);
    deleteDocumentNonBlocking(vehicleDocRef);
    toast({
        title: 'Vehicle Deleted',
        description: `Vehicle ${vehicleToDelete.id} has been removed from the fleet.`,
    });
    setVehicleToDelete(null);
  };


  return (
    <>
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Truck className="h-6 w-6"/>
            Fleet Overview
        </CardTitle>
        <CardDescription>A real-time overview of all vehicles in the fleet.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
               Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-28" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                </TableRow>
              ))
            ) : vehicles.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        No vehicles found.
                    </TableCell>
                </TableRow>
            ) : (
              vehicles.map((vehicle) => {
                const Icon = vehicleTypeIcons[vehicle.type] || Truck;
                return (
                  <TableRow key={vehicle.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-primary" />
                        {vehicle.id}
                      </div>
                    </TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${statusColors[vehicle.status]} w-28 justify-center`}>
                        {vehicle.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                              <AvatarImage src={`https://i.pravatar.cc/150?u=${vehicle.driver.id}`} alt={vehicle.driver.name} />
                              <AvatarFallback>{vehicle.driver.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{vehicle.driver.name}</span>
                        </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEdit(vehicle)}>Edit Vehicle</DropdownMenuItem>
                          <DropdownMenuItem>Assign New Trip</DropdownMenuItem>
                          <DropdownMenuItem>Schedule Maintenance</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => setVehicleToDelete(vehicle)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Vehicle
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <AlertDialog open={!!vehicleToDelete} onOpenChange={(open) => !open && setVehicleToDelete(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete vehicle 
            <span className="font-bold"> "{vehicleToDelete?.id}"</span> from the fleet.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
```

---
---
---

# FILE: src/components/transport/vehicle-form.tsx

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, Save } from 'lucide-react';
import { useFirestore, useUser, setDocumentNonBlocking } from '@/firebase';
import { doc, collection } from 'firebase/firestore';
import type { Vehicle } from '@/types/transport';

const vehicleTypes: Vehicle['type'][] = ["Haul Truck", "Light Vehicle", "Excavator", "Dozer"];
const vehicleStatuses: Vehicle['status'][] = ["On Route", "Idle", "Maintenance", "Offline"];

const MOCK_TENANT_ID = 'VeraMine';

type VehicleFormProps = {
  vehicleToEdit: Vehicle | null;
  onFormClose: () => void;
};

export function VehicleForm({ vehicleToEdit, onFormClose }: VehicleFormProps) {
  const [vehicleId, setVehicleId] = useState('');
  const [type, setType] = useState<Vehicle['type']>('Haul Truck');
  const [status, setStatus] = useState<Vehicle['status']>('Idle');
  const [driverName, setDriverName] = useState('');
  const [driverId, setDriverId] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useUser();

  const isEditing = !!vehicleToEdit;

  useEffect(() => {
    if (isEditing) {
      setVehicleId(vehicleToEdit.id);
      setType(vehicleToEdit.type);
      setStatus(vehicleToEdit.status);
      setDriverName(vehicleToEdit.driver.name);
      setDriverId(vehicleToEdit.driver.id);
    } else {
      // Reset form when switching from edit to create
      setVehicleId('');
      setType('Haul Truck');
      setStatus('Idle');
      setDriverName('');
      setDriverId('');
    }
  }, [vehicleToEdit, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !user) return;
    
    if (!vehicleId || !type || !status || !driverName) {
      toast({
        variant: 'destructive',
        title: 'All fields are required',
      });
      return;
    }

    setIsSubmitting(true);

    const vehicleDocRef = doc(firestore, 'tenants', MOCK_TENANT_ID, 'vehicles', vehicleId);

    const vehicleData: Omit<Vehicle, 'id'> = {
      tenantId: MOCK_TENANT_ID,
      type,
      status,
      currentTrip: vehicleToEdit?.currentTrip || null,
      driver: {
        id: driverId || `driver_${Date.now()}`, // Create a mock ID if none exists
        name: driverName,
      },
    };

    setDocumentNonBlocking(vehicleDocRef, vehicleData, { merge: isEditing });

    toast({
      title: isEditing ? "Vehicle Updated" : "Vehicle Added",
      description: `Vehicle ${vehicleId} has been successfully saved.`,
    });
    
    setIsSubmitting(false);
    onFormClose(); // Close form/reset selection after submit
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-6 w-6" />
            {isEditing ? 'Edit Vehicle' : 'Add New Vehicle'}
        </CardTitle>
        <CardDescription>
            {isEditing ? `Editing vehicle: ${vehicleToEdit.id}` : 'Add a new vehicle to the fleet.'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="vehicleId">Vehicle ID</Label>
                <Input 
                    id="vehicleId" 
                    placeholder="e.g., HT-001"
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    disabled={isSubmitting || isEditing}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="type">Vehicle Type</Label>
                <Select value={type} onValueChange={(v) => setType(v as Vehicle['type'])} disabled={isSubmitting}>
                    <SelectTrigger id="type"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {vehicleTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as Vehicle['status'])} disabled={isSubmitting}>
                    <SelectTrigger id="status"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {vehicleStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            
             <div className="space-y-2">
                <Label htmlFor="driverName">Driver Name</Label>
                <Input 
                    id="driverName" 
                    placeholder="e.g., Jane Doe"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    disabled={isSubmitting}
                />
            </div>
            
        </CardContent>
        <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full font-bold" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                {isEditing ? 'Save Changes' : 'Add Vehicle'}
            </Button>
            {isEditing && (
                <Button variant="outline" className="w-full" onClick={onFormClose} disabled={isSubmitting}>
                    Cancel Edit
                </Button>
            )}
        </CardFooter>
      </form>
    </Card>
  );
}
```

---
---
---

# FILE: src/components/ui/accordion.tsx

```tsx
"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
```

---
---
---

# FILE: src/components/ui/alert-dialog.tsx

```tsx
"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
```

---
---
---

# FILE: src/components/ui/alert.tsx

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
```

---
---
---

# FILE: src/components/ui/avatar.tsx

```tsx
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
```

---
---
---

# FILE: src/components/ui/badge.tsx

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
```

---
---
---

# FILE: src/components/ui/button.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

---
---
---

# FILE: src/components/ui/calendar.tsx

```tsx
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
```

---
---
---

# FILE: src/components/ui/card.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

---
---
---

# FILE: src/components/ui/carousel.tsx

```tsx
"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
```

---
---
---

# FILE: src/components/ui/chart.tsx

```tsx
"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
```

---
---
---

# FILE: src/components/ui/checkbox.tsx

```tsx
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
```

---
---
---

# FILE: src/components/ui/collapsible.tsx

```tsx
"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
```

---
---
---

# FILE: src/components/ui/dialog.tsx

```tsx
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
```

---
---
---

# FILE: src/components/ui/dropdown-menu.tsx

```tsx
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
```

---
---
---

# FILE: src/components/ui/form.tsx

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
```

---
---
---

# FILE: src/components/ui/input.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
```

---
---
---

# FILE: src/components/ui/label.tsx

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
```

---
---
---

# FILE: src/components/ui/menubar.tsx

```tsx
"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const MenubarMenu = MenubarPrimitive.Menu

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
      className
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayName = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarRadioGroup,
  MenubarShortcut,
}
```

---
---
---

# FILE: src/components/ui/popover.tsx

```tsx
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
```

---
---
---

# FILE: src/components/ui/progress.tsx

```tsx
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
```

---
---
---

# FILE: src/components/ui/radio-group.tsx

```tsx
"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
```

---
---
---

# FILE: src/components/ui/scroll-area.tsx

```tsx
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
```

---
---
---

# FILE: src/components/ui/select.tsx

```tsx
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
```

---
---
---

# FILE: src/components/ui/separator.tsx

```tsx
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
```

---
---
---

# FILE: src/components/ui/sheet.tsx

```tsx
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
```

---
---
---

# FILE: src/components/ui/sidebar.tsx

```tsx
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = openProp ?? _open
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      },
      [setOpenProp, open]
    )

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open)
    }, [isMobile, setOpen, setOpenMobile])

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      )
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        ref={ref}
        className="group peer hidden md:block text-sidebar-foreground"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            "duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear",
            "group-data-[collapsible=offcanvas]:w-0",
            "group-data-[side=right]:rotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
          )}
        />
        <div
          className={cn(
            "duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex",
            side === "left"
              ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
              : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
            className
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
})
SidebarRail.displayName = "SidebarRail"

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className
      )}
      {...props}
    />
  )
})
SidebarInset.displayName = "SidebarInset"

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className
      )}
      {...props}
    />
  )
})
SidebarInput.displayName = "SidebarInput"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  )
})
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupAction.displayName = "SidebarGroupAction"

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full text-sm", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const { isMobile, state } = useSidebar()

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    )

    if (!tooltip) {
      return button
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      }
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltip}
        />
      </Tooltip>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    showOnHover?: boolean
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuAction.displayName = "SidebarMenuAction"

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuBadge.displayName = "SidebarMenuBadge"

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("rounded-md h-8 flex gap-2 px-2 items-center", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 flex-1 max-w-[--skeleton-width]"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
})
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />)
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean
    size?: "sm" | "md"
    isActive?: boolean
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
```

---
---
---

# FILE: src/components/ui/skeleton.tsx

```tsx
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
```

---
---
---

# FILE: src/components/ui/slider.tsx

```tsx
"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
```

---
---
---

# FILE: src/components/ui/switch.tsx

```tsx
"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
```

---
---
---

# FILE: src/components/ui/table.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
```

---
---
---

# FILE: src/components/ui/tabs.tsx

```tsx
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
```

---
---
---

# FILE: src/components/ui/textarea.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
```

---
---
---

# FILE: src/components/ui/toast.tsx

```tsx
"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
```

---
---
---

# FILE: src/components/ui/toaster.tsx

```tsx
"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
```

---
---
---

# FILE: src/components/ui/tooltip.tsx

```tsx
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
```

---
---
---

# FILE: src/firebase/auth/use-user.tsx

```tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { onAuthStateChanged, type User as FirebaseAuthUser } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth, useFirestore, useMemoFirebase } from '@/firebase';
import type { User as AppUser } from '@/types/user';

export interface UseUserResult {
  user: (AppUser & { uid: string }) | null;
  isUserLoading: boolean;
  userError: Error | null;
}

const MOCK_TENANT_ID = 'VeraMine';

export function useUser(): UseUserResult {
  const auth = useAuth();
  const firestore = useFirestore();
  
  const [firebaseUser, setFirebaseUser] = useState<FirebaseAuthUser | null>(null);
  const [profile, setProfile] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!auth) {
      setIsLoading(false);
      return;
    }
    
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setFirebaseUser(user);
        if (!user) {
          setProfile(null);
          setIsLoading(false);
        }
      },
      (err) => {
        console.error("Auth state error:", err);
        setError(err);
        setFirebaseUser(null);
        setProfile(null);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [auth]);

  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !firebaseUser) return null;
    // In a real multi-tenant app, the tenantId would be determined dynamically
    // (e.g., from a subdomain, a previous selection, or user's custom claims).
    // For this prototype, we'll use a mocked tenant ID.
    return doc(firestore, 'tenants', MOCK_TENANT_ID, 'users', firebaseUser.uid);
  }, [firestore, firebaseUser]);

  useEffect(() => {
    if (!userDocRef) {
      if (!firebaseUser) {
        setIsLoading(false);
      }
      return;
    }
    
    setIsLoading(true);
    const unsubscribe = onSnapshot(
      userDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setProfile(snapshot.data() as AppUser);
        } else {
          // Handle cases where user exists in Auth but not Firestore
          // This could be a new user, or a guest.
          if (firebaseUser?.isAnonymous) {
            setProfile({
              id: firebaseUser.uid,
              email: 'guest@veramine.com',
              displayName: 'Guest User',
              role: 'viewer',
              status: 'active'
            });
          } else {
             console.warn(`No profile found for user ${firebaseUser?.uid} in tenant ${MOCK_TENANT_ID}`);
             // For demo purposes, create a temporary profile if one doesn't exist
             setProfile({
                id: firebaseUser?.uid || '',
                email: firebaseUser?.email || '',
                displayName: firebaseUser?.displayName || 'Demo User',
                role: 'admin', // Default to admin for demo ease
                status: 'active'
             });
          }
        }
        setIsLoading(false);
      },
      (err) => {
        console.error("Firestore profile snapshot error:", err);
        setError(err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userDocRef, firebaseUser]);
  
  const user = useMemo(() => {
    if (!firebaseUser || !profile) return null;
    return {
      ...profile,
      uid: firebaseUser.uid,
    };
  }, [firebaseUser, profile]);

  return { user, isUserLoading: isLoading, userError: error };
}
```

---
---
---

# FILE: src/firebase/client-provider.tsx

```tsx
'use client';

import React, { useMemo, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    // Initialize Firebase on the client side, once per component mount.
    return initializeFirebase();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
```

---
---
---

# FILE: src/firebase/config.ts

```ts
export const firebaseConfig = {
  "projectId": "studio-9149615369-40f80",
  "appId": "1:140972664538:web:6f8b93263d4679c4b7a7e3",
  "apiKey": "AIzaSyCmUdyEyF-p3shG-tWXIuPNlAmf6w8t9Iw",
  "authDomain": "studio-9149615369-40f80.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "140972664538"
};
```

---
---
---

# FILE: src/firebase/error-emitter.ts

```ts
'use client';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * Defines the shape of all possible events and their corresponding payload types.
 * This centralizes event definitions for type safety across the application.
 */
export interface AppEvents {
  'permission-error': FirestorePermissionError;
}

// A generic type for a callback function.
type Callback<T> = (data: T) => void;

/**
 * A strongly-typed pub/sub event emitter.
 * It uses a generic type T that extends a record of event names to payload types.
 */
function createEventEmitter<T extends Record<string, any>>() {
  // The events object stores arrays of callbacks, keyed by event name.
  // The types ensure that a callback for a specific event matches its payload type.
  const events: { [K in keyof T]?: Array<Callback<T[K]>> } = {};

  return {
    /**
     * Subscribe to an event.
     * @param eventName The name of the event to subscribe to.
     * @param callback The function to call when the event is emitted.
     */
    on<K extends keyof T>(eventName: K, callback: Callback<T[K]>) {
      if (!events[eventName]) {
        events[eventName] = [];
      }
      events[eventName]?.push(callback);
    },

    /**
     * Unsubscribe from an event.
     * @param eventName The name of the event to unsubscribe from.
     * @param callback The specific callback to remove.
     */
    off<K extends keyof T>(eventName: K, callback: Callback<T[K]>) {
      if (!events[eventName]) {
        return;
      }
      events[eventName] = events[eventName]?.filter(cb => cb !== callback);
    },

    /**
     * Publish an event to all subscribers.
     * @param eventName The name of the event to emit.
     * @param data The data payload that corresponds to the event's type.
     */
    emit<K extends keyof T>(eventName: K, data: T[K]) {
      if (!events[eventName]) {
        return;
      }
      events[eventName]?.forEach(callback => callback(data));
    },
  };
}

// Create and export a singleton instance of the emitter, typed with our AppEvents interface.
export const errorEmitter = createEventEmitter<AppEvents>();
```

---
---
---

# FILE: src/firebase/errors.ts

```ts
'use client';
import { getAuth, type User } from 'firebase/auth';

export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete' | 'write';
  requestResourceData?: any;
};

interface FirebaseAuthToken {
  name: string | null;
  picture?: string;
  email: string | null;
  email_verified: boolean;
  phone_number: string | null;
  sub: string;
  firebase: {
    identities: Record<string, any>;
    sign_in_provider: string;
    tenant: string | null;
  };
}

interface FirebaseAuthObject {
  uid: string;
  token: FirebaseAuthToken;
}

interface SecurityRuleRequest {
  auth: FirebaseAuthObject | null;
  method: string;
  path: string;
  resource?: {
    data: any;
  };
}

/**
 * Builds a security-rule-compliant auth object from the Firebase User.
 * @param currentUser The currently authenticated Firebase user.
 * @returns An object that mirrors request.auth in security rules, or null.
 */
function buildAuthObject(currentUser: User | null): FirebaseAuthObject | null {
  if (!currentUser) {
    return null;
  }

  const token: FirebaseAuthToken = {
    name: currentUser.displayName,
    picture: currentUser.photoURL ?? undefined,
    email: currentUser.email,
    email_verified: currentUser.emailVerified,
    phone_number: currentUser.phoneNumber,
    sub: currentUser.uid,
    firebase: {
      identities: currentUser.providerData.reduce((acc, p) => {
        if (p.providerId) {
          acc[p.providerId] = [p.uid];
        }
        return acc;
      }, {} as Record<string, any>),
      sign_in_provider: currentUser.providerData[0]?.providerId || 'custom',
      tenant: currentUser.tenantId,
    },
  };

  return {
    uid: currentUser.uid,
    token: token,
  };
}

/**
 * Builds the complete, simulated request object for the error message.
 * It safely tries to get the current authenticated user.
 * @param context The context of the failed Firestore operation.
 * @returns A structured request object.
 */
function buildRequestObject(context: SecurityRuleContext): SecurityRuleRequest {
  let authObject: FirebaseAuthObject | null = null;
  try {
    // Safely attempt to get the current user.
    const firebaseAuth = getAuth();
    const currentUser = firebaseAuth.currentUser;
    if (currentUser) {
      authObject = buildAuthObject(currentUser);
    }
  } catch {
    // This will catch errors if the Firebase app is not yet initialized.
    // In this case, we'll proceed without auth information.
  }

  return {
    auth: authObject,
    method: context.operation,
    path: `/databases/(default)/documents/${context.path}`,
    resource: context.requestResourceData ? { data: context.requestResourceData } : undefined,
  };
}

/**
 * Builds the final, formatted error message for the LLM.
 * @param requestObject The simulated request object.
 * @returns A string containing the error message and the JSON payload.
 */
function buildErrorMessage(requestObject: SecurityRuleRequest): string {
  return `FirestoreError: Missing or insufficient permissions: The following request was denied by Firestore Security Rules:
${JSON.stringify(requestObject, null, 2)}`;
}

/**
 * A custom error class designed to be consumed by an LLM for debugging.
 * It structures the error information to mimic the request object
 * available in Firestore Security Rules.
 */
export class FirestorePermissionError extends Error {
  public readonly request: SecurityRuleRequest;

  constructor(context: SecurityRuleContext) {
    const requestObject = buildRequestObject(context);
    super(buildErrorMessage(requestObject));
    this.name = 'FirestorePermissionError';
    this.request = requestObject;
  }
}
```

---
---
---

# FILE: src/firebase/firestore/use-collection.tsx

```tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Query,
  onSnapshot,
  DocumentData,
  FirestoreError,
  QuerySnapshot,
  CollectionReference,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/** Utility type to add an 'id' field to a given type T. */
export type WithId<T> = T & { id: string };

/**
 * Interface for the return value of the useCollection hook.
 * @template T Type of the document data.
 */
export interface UseCollectionResult<T> {
  data: WithId<T>[] | null; // Document data with ID, or null.
  isLoading: boolean;       // True if loading.
  error: FirestoreError | Error | null; // Error object, or null.
}

/* Internal implementation of Query:
  https://github.com/firebase/firebase-js-sdk/blob/c5f08a9bc5da0d2b0207802c972d53724ccef055/packages/firestore/src/lite-api/reference.ts#L143
*/
export interface InternalQuery extends Query<DocumentData> {
  _query: {
    path: {
      canonicalString(): string;
      toString(): string;
    }
  }
}

/**
 * React hook to subscribe to a Firestore collection or query in real-time.
 * Handles nullable references/queries.
 * 
 *
 * IMPORTANT! YOU MUST WRAP the query/reference passed to this hook in `useMemoFirebase`.
 * This prevents re-renders from creating new query objects and causing infinite loops.
 *  
 * @template T Optional type for document data. Defaults to any.
 * @param {CollectionReference<DocumentData> | Query<DocumentData> | null | undefined} targetRefOrQuery -
 * The Firestore CollectionReference or Query, wrapped in `useMemoFirebase`. Waits if null/undefined.
 * @returns {UseCollectionResult<T>} Object with data, isLoading, error.
 */
export function useCollection<T = any>(
    memoizedTargetRefOrQuery: ((CollectionReference<DocumentData> | Query<DocumentData>) & {__memo?: boolean})  | null | undefined,
): UseCollectionResult<T> {
  type ResultItemType = WithId<T>;
  type StateDataType = ResultItemType[] | null;

  if (memoizedTargetRefOrQuery && !memoizedTargetRefOrQuery.__memo) {
    throw new Error('The query/reference passed to useCollection must be wrapped in useMemoFirebase.');
  }

  const [data, setData] = useState<StateDataType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | Error | null>(null);

  useEffect(() => {
    if (!memoizedTargetRefOrQuery) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      memoizedTargetRefOrQuery,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const results: ResultItemType[] = [];
        for (const doc of snapshot.docs) {
          results.push({ ...(doc.data() as T), id: doc.id });
        }
        setData(results);
        setError(null);
        setIsLoading(false);
      },
      (error: FirestoreError) => {
        const path: string =
          memoizedTargetRefOrQuery.type === 'collection'
            ? (memoizedTargetRefOrQuery as CollectionReference).path
            : (memoizedTargetRefOrQuery as unknown as InternalQuery)._query.path.canonicalString()

        const contextualError = new FirestorePermissionError({
          operation: 'list',
          path,
        })

        setError(contextualError)
        setData(null)
        setIsLoading(false)

        errorEmitter.emit('permission-error', contextualError);
      }
    );

    return () => unsubscribe();
  }, [memoizedTargetRefOrQuery]);

  return { data, isLoading, error };
}
```

---
---
---

# FILE: src/firebase/firestore/use-doc.tsx

```tsx
'use client';
    
import { useState, useEffect } from 'react';
import {
  DocumentReference,
  onSnapshot,
  DocumentData,
  FirestoreError,
  DocumentSnapshot,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/** Utility type to add an 'id' field to a given type T. */
type WithId<T> = T & { id: string };

/**
 * Interface for the return value of the useDoc hook.
 * @template T Type of the document data.
 */
export interface UseDocResult<T> {
  data: WithId<T> | null; // Document data with ID, or null.
  isLoading: boolean;       // True if loading.
  error: FirestoreError | Error | null; // Error object, or null.
}

/**
 * React hook to subscribe to a single Firestore document in real-time.
 * Handles nullable references.
 * 
 * IMPORTANT! YOU MUST WRAP the document reference passed to this hook in `useMemoFirebase`.
 * This prevents re-renders from creating new reference objects and causing infinite loops.
 *
 * @template T Optional type for document data. Defaults to any.
 * @param {DocumentReference<DocumentData> | null | undefined} docRef -
 * The Firestore DocumentReference, wrapped in `useMemoFirebase`. Waits if null/undefined.
 * @returns {UseDocResult<T>} Object with data, isLoading, error.
 */
export function useDoc<T = any>(
  memoizedDocRef: (DocumentReference<DocumentData> & {__memo?: boolean}) | null | undefined,
): UseDocResult<T> {
  type StateDataType = WithId<T> | null;

  if (memoizedDocRef && !memoizedDocRef.__memo) {
    throw new Error('The document reference passed to useDoc must be wrapped in useMemoFirebase.');
  }

  const [data, setData] = useState<StateDataType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | Error | null>(null);

  useEffect(() => {
    if (!memoizedDocRef) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      memoizedDocRef,
      (snapshot: DocumentSnapshot<DocumentData>) => {
        if (snapshot.exists()) {
          setData({ ...(snapshot.data() as T), id: snapshot.id });
        } else {
          setData(null);
        }
        setError(null);
        setIsLoading(false);
      },
      (error: FirestoreError) => {
        const contextualError = new FirestorePermissionError({
          operation: 'get',
          path: memoizedDocRef.path,
        })

        setError(contextualError)
        setData(null)
        setIsLoading(false)

        errorEmitter.emit('permission-error', contextualError);
      }
    );

    return () => unsubscribe();
  }, [memoizedDocRef]);

  return { data, isLoading, error };
}
```

---
---
---

# FILE: src/firebase/index.ts

```ts
'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (!getApps().length) {
    // Important! initializeApp() is called without any arguments because Firebase App Hosting
    // integrates with the initializeApp() function to provide the environment variables needed to
    // populate the FirebaseOptions in production. It is critical that we attempt to call initializeApp()
    // without arguments.
    let firebaseApp;
    try {
      // Attempt to initialize via Firebase App Hosting environment variables
      firebaseApp = initializeApp();
    } catch (e) {
      // Only warn in production because it's normal to use the firebaseConfig to initialize
      // during development
      if (process.env.NODE_ENV === "production") {
        console.warn('Automatic initialization failed. Falling back to firebase config object.', e);
      }
      firebaseApp = initializeApp(firebaseConfig);
    }

    return getSdks(firebaseApp);
  }

  // If already initialized, return the SDKs with the already initialized App
  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
```

---
---
---

# FILE: src/firebase/non-blocking-login.tsx

```tsx
'use client';
import {
  Auth, // Import Auth type for type hinting
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // Assume getAuth and app are initialized elsewhere
} from 'firebase/auth';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  // CRITICAL: Call signInAnonymously directly. Do NOT use 'await signInAnonymously(...)'.
  signInAnonymously(authInstance).catch(error => {
    // Although we don't block, we should still handle potential errors,
    // like network issues or if anonymous auth is disabled.
    console.error("Anonymous sign-in failed:", error);
    // You might want to show a toast to the user here.
  });
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): void {
  // CRITICAL: Call createUserWithEmailAndPassword directly. Do NOT use 'await createUserWithEmailAndPassword(...)'.
  createUserWithEmailAndPassword(authInstance, email, password).catch(error => {
    console.error("Email sign-up failed:", error);
    // Handle errors like email already in use, weak password etc.
    // You might want to show a toast to the user here.
  });
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  // CRITICAL: Call signInWithEmailAndPassword directly. Do NOT use 'await signInWithEmailAndPassword(...)'.
  signInWithEmailAndPassword(authInstance, email, password).catch(error => {
    console.error("Email sign-in failed:", error);
    // Handle errors like wrong password, user not found etc.
    // You might want to show a toast to the user here.
  });
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}
```

---
---
---

# FILE: src/firebase/non-blocking-updates.tsx

```tsx
'use client';
    
import {
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  CollectionReference,
  DocumentReference,
  SetOptions,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import {FirestorePermissionError} from '@/firebase/errors';

/**
 * Initiates a setDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function setDocumentNonBlocking(docRef: DocumentReference, data: any, options?: SetOptions) {
  const promise = options ? setDoc(docRef, data, options) : setDoc(docRef, data);
  promise.catch(error => {
    errorEmitter.emit(
      'permission-error',
      new FirestorePermissionError({
        path: docRef.path,
        operation: 'write', // or 'create'/'update' based on options
        requestResourceData: data,
      })
    )
  })
  // Execution continues immediately
}


/**
 * Initiates an addDoc operation for a collection reference.
 * Does NOT await the write operation internally.
 * Returns the Promise for the new doc ref, but typically not awaited by caller.
 */
export function addDocumentNonBlocking(colRef: CollectionReference, data: any) {
  const promise = addDoc(colRef, data)
    .catch(error => {
      errorEmitter.emit(
        'permission-error',
        new FirestorePermissionError({
          path: colRef.path,
          operation: 'create',
          requestResourceData: data,
        })
      )
    });
  return promise;
}


/**
 * Initiates an updateDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function updateDocumentNonBlocking(docRef: DocumentReference, data: any) {
  updateDoc(docRef, data)
    .catch(error => {
      errorEmitter.emit(
        'permission-error',
        new FirestorePermissionError({
          path: docRef.path,
          operation: 'update',
          requestResourceData: data,
        })
      )
    });
}


/**
 * Initiates a deleteDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function deleteDocumentNonBlocking(docRef: DocumentReference) {
  deleteDoc(docRef)
    .catch(error => {
      errorEmitter.emit(
        'permission-error',
        new FirestorePermissionError({
          path: docRef.path,
          operation: 'delete',
        })
      )
    });
}
```

---
---
---

# FILE: src/firebase/provider.tsx

```tsx
'use client';

import React, { DependencyList, createContext, useContext, ReactNode, useMemo } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener'

interface FirebaseProviderProps {
  children: ReactNode;
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
}

// Combined state for the Firebase context
export interface FirebaseContextState {
  areServicesAvailable: boolean; // True if core services (app, firestore, auth instance) are provided
  firebaseApp: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null; // The Auth service instance
}

// React Context
export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

/**
 * FirebaseProvider manages and provides Firebase services and user authentication state.
 */
export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
  firebaseApp,
  firestore,
  auth,
}) => {
  // Memoize the context value
  const contextValue = useMemo((): FirebaseContextState => {
    const servicesAvailable = !!(firebaseApp && firestore && auth);
    return {
      areServicesAvailable: servicesAvailable,
      firebaseApp: servicesAvailable ? firebaseApp : null,
      firestore: servicesAvailable ? firestore : null,
      auth: servicesAvailable ? auth : null,
    };
  }, [firebaseApp, firestore, auth]);

  return (
    <FirebaseContext.Provider value={contextValue}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
};

/**
 * Hook to access core Firebase services.
 * Throws error if core services are not available or used outside provider.
 */
export const useFirebase = (): FirebaseContextState => {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider.');
  }

  if (!context.areServicesAvailable || !context.firebaseApp || !context.firestore || !context.auth) {
    throw new Error('Firebase core services not available. Check FirebaseProvider props.');
  }

  return context;
};

/** Hook to access Firebase Auth instance. */
export const useAuth = (): Auth => {
  const { auth } = useFirebase();
  if (!auth) throw new Error("Auth service not available");
  return auth;
};

/** Hook to access Firestore instance. */
export const useFirestore = (): Firestore => {
  const { firestore } = useFirebase();
  if (!firestore) throw new Error("Firestore service not available");
  return firestore;
};

/** Hook to access Firebase App instance. */
export const useFirebaseApp = (): FirebaseApp => {
  const { firebaseApp } = useFirebase();
  if (!firebaseApp) throw new Error("FirebaseApp not available");
  return firebaseApp;
};

/**
 * A wrapper around React's `useMemo` that adds a flag to the memoized object.
 * This is used by `useCollection` and `useDoc` to ensure that the queries
 * and references passed to them are stable and won't cause infinite re-renders.
 */
export function useMemoFirebase<T>(factory: () => T, deps: DependencyList): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoized = useMemo(factory, deps);
  
  if (typeof memoized === 'object' && memoized !== null) {
    Object.defineProperty(memoized, '__memo', {
      value: true,
      writable: false,
      enumerable: false,
    });
  }
  
  return memoized;
}
```

---
---
---

# FILE: src/hooks/use-alerts.ts

```ts
'use client';

import { useMemo } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

const MOCK_TENANT_ID = 'VeraMine';

export type ActiveAlert = {
    id: string;
    name: string;
    triggeredAt: string;
    // In a real system, you'd have more details
};

export function useAlerts() {
    const firestore = useFirestore();

    // In a real app, you would likely have a separate 'activeAlerts' collection.
    // For this prototype, we'll simulate active alerts by querying for *enabled* rules
    // and transforming them into an "active alert" shape.
    const activeAlertsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        const rulesRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'alertRules');
        return query(rulesRef, where('enabled', '==', true));
    }, [firestore]);

    const { data: enabledRules, isLoading, error } = useCollection(activeAlertsQuery);

    const alerts: ActiveAlert[] = useMemo(() => {
        if (!enabledRules) return [];
        // Transform the rule data into the ActiveAlert shape
        return enabledRules.map(rule => ({
            id: rule.id,
            name: rule.name,
            // Use a semi-random but consistent time for the prototype
            triggeredAt: new Date(Date.now() - (rule.name.length * 60 * 1000)).toISOString(),
        }));
    }, [enabledRules]);


    return { alerts, isLoading, error };
}
```

---
---
---

# FILE: src/hooks/use-mobile.tsx

```tsx
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
```

---
---
---

# FILE: src/hooks/use-toast.ts

```ts
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
```

---
---
---

# FILE: src/lib/mock-data.ts

```ts
import type { Incident } from '@/types/incident';
import type { User } from '@/types/user';
import {
    Activity,
    ArrowUp,
    Truck,
    AlertTriangle,
  } from "lucide-react";

export const productionData = [
    { date: '2024-05-01', coal: 4000, iron: 2400 },
    { date: '2024-05-02', coal: 3000, iron: 1398 },
    { date: '2024-05-03', coal: 2000, iron: 9800 },
    { date: '2024-05-04', coal: 2780, iron: 3908 },
    { date: '2024-05-05', coal: 1890, iron: 4800 },
    { date: '2024-05-06', coal: 2390, iron: 3800 },
    { date: '2024-05-07', coal: 3490, iron: 4300 },
    { date: '2024-05-08', coal: 3620, iron: 4100 },
    { date: '2024-05-09', coal: 2980, iron: 3500 },
    { date: '2024-05-10', coal: 4200, iron: 5100 },
    { date: '2024-05-11', coal: 3800, iron: 4500 },
    { date: '2024-05-12', coal: 4100, iron: 4900 },
];

export const downtimeData = [
  { reason: 'Mechanical', hours: 120 },
  { reason: 'Electrical', hours: 85 },
  { reason: 'Operational', hours: 60 },
  { reason: 'Weather', hours: 30 },
  { reason: 'Scheduled', hours: 150 },
];

export const recommendedActionsData = [
  {
    id: 'rec_1',
    action: 'Investigate recurring conveyor belt C-03 faults.',
    owner: 'Maintenance Team',
    impact: 'Reduce unplanned downtime by an estimated 8%.',
    confidence: 0.92,
    evidenceLinks: ['/dashboard/plant?filter=C-03', '/dashboard/reports/downtime-analysis']
  },
  {
    id: 'rec_2',
    action: 'Review haul truck #12 telematics for inefficient routes.',
    owner: 'Dispatch',
    impact: 'Potential 5% fuel savings and faster cycle times.',
    confidence: 0.85,
    evidenceLinks: ['/dashboard/transport?vehicle=HT-12', '/dashboard/reports/fuel-efficiency']
  },
  {
    id: 'rec_3',
    action: 'Schedule refresher safety training for night shift personnel.',
    owner: 'HSE Manager',
    impact: 'Mitigate risk of near-miss incidents observed recently.',
    confidence: 0.98,
    evidenceLinks: ['/dashboard/risk?filter=near-miss', '/dashboard/people/training-matrix']
  }
];

export const statCards = [
    {
      title: "Overall Production",
      value: "14,280 Tonnes",
      icon: Activity,
      trend: "up" as const,
      trendValue: "12.5%",
      period: "vs last month",
    },
    {
      title: "Equipment Uptime",
      value: "98.2%",
      icon: ArrowUp,
      trend: "up" as const,
      trendValue: "1.2%",
      period: "vs last month",
    },
    {
      title: "Fleet Availability",
      value: "89%",
      icon: Truck,
      trend: "down" as const,
      trendValue: "2.1%",
      period: "vs last month",
    },
    {
      title: "Active Alerts",
      value: "3",
      icon: AlertTriangle,
      trend: "static" as const,
      trendValue: "High Priority",
      period: "needs attention",
    },
  ];
```

---
---
---

# FILE: src/lib/placeholder-images.json

```json
{
  "placeholderImages": [
    {
      "id": "user-avatar",
      "description": "User avatar for header",
      "imageUrl": "https://images.unsplash.com/photo-1548544149-4835e62ee5b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwZXJzb24lMjBmYWNlfGVufDB8fHx8MTc2NzM0NjY5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "person face"
    },
    {
      "id": "dashboard-hero",
      "description": "Hero image for dashboard",
      "imageUrl": "https://images.unsplash.com/photo-1759934555144-bcf83353144c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxtaW5pbmclMjBvcGVyYXRpb258ZW58MHx8fHwxNzY3NDA4Mjg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "mining operation"
    },
    {
      "id": "transport-map",
      "description": "Map background for transport page",
      "imageUrl": "https://images.unsplash.com/photo-1742228900252-4ec66498a53c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxzYXRlbGxpdGUlMjBtYXB8ZW58MHx8fHwxNzY3MzAyNjM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "satellite map"
    }
  ]
}
```

---
---
---

# FILE: src/lib/placeholder-images.ts

```ts
import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
```

---
---
---

# FILE: src/lib/utils.ts

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---
---
---

# FILE: src/services/incidents.ts

```ts
'use server';

import { getFirestore, collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import type { Incident } from '@/types/incident';

const MOCK_TENANT_ID = 'VeraMine';

/**
 * Fetches incidents from Firestore.
 * This is a server-side function intended to be used by AI tools.
 */
export async function getIncidents(classification?: string, queryLimit = 5): Promise<Partial<Incident>[]> {
  try {
    const { firestore } = initializeFirebase();
    const incidentsColRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'incidents');
    
    let q;
    if (classification) {
      q = query(
        incidentsColRef, 
        where('classification', '==', classification),
        orderBy('date', 'desc'),
        limit(queryLimit)
      );
    } else {
      q = query(incidentsColRef, orderBy('date', 'desc'), limit(queryLimit));
    }

    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return [];
    }

    const incidents = snapshot.docs.map(doc => {
      const data = doc.data() as Incident;
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        classification: data.classification,
        date: data.date,
        status: data.status,
      };
    });

    return incidents;

  } catch (error) {
    console.error("Error fetching incidents:", error);
    // In case of an error, return an empty array to the AI
    // so it can report that it couldn't retrieve the data.
    return [];
  }
}
```

---
---
---

# FILE: src/services/vehicles.ts

```ts
'use server';

import { getFirestore, collection, query, where, getDocs, limit, orderBy, QueryConstraint } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import type { Vehicle } from '@/types/transport';

const MOCK_TENANT_ID = 'VeraMine';

/**
 * Fetches vehicles from Firestore.
 * This is a server-side function intended to be used by AI tools.
 */
export async function getVehicles(
    filters: { type?: Vehicle['type'], status?: Vehicle['status'] }, 
    queryLimit = 10
): Promise<Partial<Vehicle>[]> {
  try {
    const { firestore } = initializeFirebase();
    const vehiclesColRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'vehicles');
    
    const queryConstraints: QueryConstraint[] = [limit(queryLimit)];

    if (filters.type) {
      queryConstraints.push(where('type', '==', filters.type));
    }
    if (filters.status) {
        queryConstraints.push(where('status', '==', filters.status));
    }

    const q = query(vehiclesColRef, ...queryConstraints);

    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return [];
    }

    const vehicles = snapshot.docs.map(doc => {
      const data = doc.data() as Vehicle;
      return {
        id: doc.id,
        type: data.type,
        status: data.status,
        driver: data.driver
      };
    });

    return vehicles;

  } catch (error) {
    console.error("Error fetching vehicles:", error);
    // In case of an error, return an empty array to the AI
    // so it can report that it couldn't retrieve the data.
    return [];
  }
}
```

---
---
---

# FILE: src/types/ai-recommendation.ts

```ts
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
```

---
---
---

# FILE: src/types/event.ts

```ts
export type Event = {
  id: string;
  tenantId: string;
  timestamp: string;
  eventType: string;
  actor: string;
  payload: any;
};
```

---
---
---

# FILE: src/types/incident.ts

```ts
export type Incident = {
  id: string;
  tenantId: string;
  title: string;
  description: string;
  classification: string;
  timeline?: string;
  causes?: string;
  actions?: string;
  capaSuggestions?: string;
  date: string;
  status: 'Under Investigation' | 'Closed' | 'CAPA Pending';
  reportedBy: string;
};
```

---
---
---

# FILE: src/types/transport.ts

```ts
export type Vehicle = {
    id: string;
    tenantId: string;
    type: 'Haul Truck' | 'Light Vehicle' | 'Excavator' | 'Dozer';
    status: 'On Route' | 'Idle' | 'Maintenance' | 'Offline';
    currentTrip: string | null;
    driver: {
        id: string;
        name: string;
    }
};
```

---
---
---

# FILE: src/types/user.ts

```ts
export type User = {
  id: string;
  tenantId: string;
  email: string;
  displayName: string | null;
  role: 'admin' | 'ops' | 'hr' | 'safety' | 'viewer';
  status: 'pending' | 'active' | 'disabled';
  invitedAt?: string;
  joinedAt?: string;
};
```

---
---
---

# FILE: tailwind.config.ts

```ts
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['"Space Grotesk"', 'Montserrat', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'pulse-badge': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.75', transform: 'scale(1.2)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-badge': 'pulse-badge 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
```

---
---
---

# FILE: tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```
