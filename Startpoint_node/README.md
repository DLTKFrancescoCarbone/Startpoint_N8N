# Startpoint n8n Node

Community n8n node for Startpoint ERP API. Provides tools to manage projects, clients, employees, disciplines, phases, tasks, teams, plus meta and history endpoints.

## Install

- In your n8n instance, install the package:
  - npm: `npm install n8n-nodes-startpoint`
  - Or via n8n Community Nodes UI (search for `n8n-nodes-startpoint`).

## Credentials

Add credentials of type `Startpoint API`:
- API Token: Bearer token issued by the backend
- Base URL: e.g. `https://fc-smb-poc-backend-production.up.railway.app`

All requests include `Authorization: Bearer <token>`, `Content-Type: application/json`, `Accept: application/json`.

## Resources and Operations

The node exposes a single resource selector with multiple domains. Each operation maps 1:1 to a backend endpoint and respects path/query/body separation.

- Client
  - Create: POST `/api/clients`
  - Update: PUT `/api/clients/{id}`
  - Delete: DELETE `/api/clients/{id}`
  - Get Many: GET `/api/clients` (filters below)
  - Get: GET `/api/clients/{id}`
  - Meta: GET `/api/clients/meta/industries`, GET `/api/clients/meta/company-sizes`
  - History: GET `/api/clients/{id}/history`, GET `/api/clients/{id}/at?ts=...`, GET `/api/clients/{id}/diff?from=...&to=...`

- Employee
  - Create: POST `/api/employees`
  - Update: PUT `/api/employees/{id}`
  - Delete: DELETE `/api/employees/{id}`
  - Get Many: GET `/api/employees` (filters below)
  - Get: GET `/api/employees/{id}`
  - Deactivate: PATCH `/api/employees/{id}/deactivate`
  - Capabilities: GET `/api/employees/roles/capabilities` (filters below)
  - History: GET `/api/employees/{id}/history`

- Project
  - Create: POST `/api/projects`
  - Update: PUT `/api/projects/{id}`
  - Delete: DELETE `/api/projects/{id}`
  - Get: GET `/api/projects/{id}`
  - Get Many: GET `/api/projects` (filters below)
  - History: GET `/api/projects/{id}/history`, GET `/api/projects/{id}/at?ts=...`, GET `/api/projects/{id}/diff?from=...&to=...`

- Phase (nested under Project)
  - Create: POST `/api/projects/{projectId}/phases`
  - Update: PUT `/api/projects/{projectId}/phases/{phaseId}`
  - Delete: DELETE `/api/projects/{projectId}/phases/{phaseId}`
  - Get: GET `/api/projects/{projectId}/phases/{phaseId}`
  - Get Many: GET `/api/projects/{projectId}/phases`

- Task (nested under Project → Phase)
  - Create: POST `/api/projects/{projectId}/phases/{phaseId}/tasks`
  - Update: PUT `/api/projects/{projectId}/phases/{phaseId}/tasks/{taskId}`
  - Delete: DELETE `/api/projects/{projectId}/phases/{phaseId}/tasks/{taskId}`
  - Get: GET `/api/projects/{projectId}/phases/{phaseId}/tasks/{taskId}`
  - Get Many: GET `/api/projects/{projectId}/phases/{phaseId}/tasks`

- Team (nested under Project)
  - Get Many: GET `/api/projects/{projectId}/team`
  - Create: POST `/api/projects/{projectId}/team`
  - Delete: DELETE `/api/projects/{projectId}/team/{memberId}`

- Discipline
  - Create: POST `/api/disciplines`
  - Update: PUT `/api/disciplines/{id}`
  - Delete: DELETE `/api/disciplines/{id}`
  - Get Many: GET `/api/disciplines`
  - Get: GET `/api/disciplines/{id}`

Note: Future phases will add Rate Tables and Timesheets.

## List Filters

- Clients (GET /api/clients)
  - `page` (number, default 1)
  - `limit` (number, default 20)
  - `status` (active | inactive | prospect)
  - `industry` (see enum below)
  - `search` (string)

- Employees (GET /api/employees)
  - `page`, `limit`
  - `status` (ACTIVE | INACTIVE)
  - `search` (string)
  - `disciplineId` (uuid)
  - `isProjectManager`, `isPrincipal`, `isMarketing` (boolean)

- Employees Capabilities (GET /api/employees/roles/capabilities)
  - `page`, `limit`
  - `canBeProjectManager`, `canBePrincipal`, `canBeMarketing` (boolean)
  - `status` (ACTIVE | INACTIVE)

- Projects (GET /api/projects)
  - `status` (0 | 1 | 2 | 3)
  - `clientId`, `projectManagerId` (uuid)
  - `projectNumber`, `name`, `clientNumber`, `clientName`, `search` (string)
  - `view` (simple | detailed)
  - `include` (phases, phases.tasks, team)

## History Query Fields

Where applicable:
- `limit` (number, default 50)
- `since`, `until` (ISO date-time)
- `ts` for “At Timestamp” endpoints (ISO date-time)
- `from`, `to` for “Diff” endpoints (ISO date-time)

## Field Notes & Enums

- IDs are path-only: `projectId`, `phaseId`, `taskId`, `clientId`, `employeeId`, `disciplineId` are used only to build URLs.
- Response envelopes are preserved (status, data, metadata).

- Project Type: `RESIDENTIAL`, `COMMERCIAL`, `INSTITUTIONAL`, `INDUSTRIAL`, `MIXED_USE`, `RENOVATION`, `NEW_CONSTRUCTION` (UI also offers `Auto` which omits the field)
- Invoice Format: `STANDARD`, `DETAILED`, `SUMMARY`, `HOURLY_BREAKDOWN`, `MILESTONE_BASED` (UI also offers `Auto`)
- Client Status: `active`, `inactive`, `prospect`
- Employee Status: `ACTIVE`, `INACTIVE`
- Client Industry: `RESIDENTIAL_DEVELOPER`, `COMMERCIAL_REAL_ESTATE`, `HEALTHCARE`, `EDUCATION`, `HOSPITALITY`, `RETAIL`, `INDUSTRIAL_MANUFACTURING`, `GOVERNMENT`, `NON_PROFIT`, `TECHNOLOGY`, `FINANCIAL_SERVICES`, `OTHER`
- Company Size: `SMALL`, `MEDIUM`, `LARGE`, `ENTERPRISE`
- Project Status (filter): integer enum `0,1,2,3`

## Examples

- List projects with phases and team
  - Operation: Project → Get Many
  - Set `view = detailed` or `include = phases,team`

- Get client history
  - Operation: Client → Get History
  - Fields: `clientId`, optional `limit`, `since`, `until`

- Deactivate employee
  - Operation: Employee → Deactivate
  - Field: `employeeId`

## Development

- Build: `npm run build`
- Lint: `npm run lint`
- Dev (TS watch): `npm run dev`

This node targets Node `>= 20.15` and n8n Community Nodes API v1.
