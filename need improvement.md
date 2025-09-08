# N8N Startpoint Node Improvements Needed

## 1. Project Create/Update Issues

### Current State
- Only has `projectName` field that maps to `projectName` in body
- Severely limited functionality compared to API capabilities

### Required Changes

#### 1.1. Fix Critical Field Name Mapping
- **Issue**: Node sends `projectName` but API expects `name`
- **Fix**: Change routing property from `projectName` to `name`
- **CRITICAL**: This prevents project creation from working properly

#### 1.2. Add Missing Required Field Flags
- **name** (string) - Project name ✅ (exists but wrong property name)
- **Must add `required: true`** to the name field for create operations

#### 1.3. Add Missing Optional Fields for Full API Support

**Basic Project Info:**
- **projectNumber** (string) - Auto-generated if not provided
- **description** (string) - Project description  
- **status** (enum) - ACTIVE, INACTIVE (default: ACTIVE)
- **location** (string) - Project location
- **notes** (string) - Project notes

**Client Assignment:**
- **clientId** (UUID) - Client assignment by ID
- **clientNumber** (string) - Alternative client lookup by number

**Project Classification:**
- **projectType** (enum dropdown) - Exact values: SMALL_RENOVATION, LARGE_RENOVATION, NEW_CONSTRUCTION, COMMERCIAL_FIT_OUT, COMMERCIAL_NEW_BUILD, OTHER
- **invoiceFormat** (enum dropdown) - Exact values: TIME_AND_MATERIALS, FIXED_FEE, COST_PLUS_FIXED_FEE, COST_PLUS_PERCENTAGE, UNIT_PRICE, OTHER
- **primaryDisciplineId** (UUID) - Primary discipline assignment

**Project Management:**
- **projectManagerId** (UUID) - Project manager assignment
- **principalInChargeId** (UUID) - Principal in charge assignment  
- **marketingContactId** (UUID) - Marketing contact assignment
- **billingManagerId** (UUID) - Billing manager assignment

**Financial & Timeline:**
- **totalContractAmount** (number) - Total contract amount
- **estimatedStartDate** (date picker, ISO format) - Estimated start date
- **estimatedEndDate** (date picker, ISO format) - Estimated end date
- **rateTableId** (UUID) - Rate table assignment

#### 1.4. Enumeration Implementation Requirements
**Project Type Dropdown:**
```typescript
options: [
  { name: "Small Renovation", value: "SMALL_RENOVATION" },
  { name: "Large Renovation", value: "LARGE_RENOVATION" },
  { name: "New Construction", value: "NEW_CONSTRUCTION" },
  { name: "Commercial Fit-Out", value: "COMMERCIAL_FIT_OUT" },
  { name: "Commercial New Build", value: "COMMERCIAL_NEW_BUILD" },
  { name: "Other", value: "OTHER" }
]
```

**Invoice Format Dropdown:**
```typescript
options: [
  { name: "Time and Materials", value: "TIME_AND_MATERIALS" },
  { name: "Fixed Fee", value: "FIXED_FEE" },
  { name: "Cost Plus Fixed Fee", value: "COST_PLUS_FIXED_FEE" },
  { name: "Cost Plus Percentage", value: "COST_PLUS_PERCENTAGE" },
  { name: "Unit Price", value: "UNIT_PRICE" },
  { name: "Other", value: "OTHER" }
]
```

#### 1.5. Date Field Implementation  
- **Type**: `"dateTime"` with format validation
- **Format**: ISO 8601 (YYYY-MM-DD)  
- **UI**: N8N date picker component
- **Validation**: Ensure `estimatedEndDate` is after `estimatedStartDate`

---

## 2. Client Create/Update Issues

### Current State
- **MISSING COMPLETELY** - No fields exist for client create/update operations
- Only routing operations defined, no input fields

### Required Changes from OpenAPI (lines 1304-1345)

#### 2.1. Required Fields
- **name** (string) - Client company name

#### 2.2. Optional Fields for Full API Support

**Basic Client Info:**
- **clientNumber** (string) - Auto-generated if not provided  
- **industry** (enum) - RESIDENTIAL_DEVELOPER, COMMERCIAL_REAL_ESTATE, HEALTHCARE, EDUCATION, HOSPITALITY, RETAIL, INDUSTRIAL_MANUFACTURING, GOVERNMENT, NON_PROFIT, TECHNOLOGY, FINANCIAL_SERVICES, OTHER
- **companySize** (enum) - SMALL, MEDIUM, LARGE, ENTERPRISE
- **website** (string) - Client website URL
- **notes** (string) - Additional notes

**Primary Contact:**
- **primaryContactName** (string) - Primary contact name
- **primaryContactEmail** (email) - Primary contact email
- **primaryContactPhone** (string) - Primary contact phone

**Address:**
- **addressLine1** (string) - Address line 1
- **addressLine2** (string) - Address line 2  
- **city** (string) - City
- **state** (string) - State/Province
- **country** (string) - Country

---

## 3. Employee Create/Update Issues

### Current State
- **MISSING COMPLETELY** - No fields exist for employee create/update operations
- Only routing operations defined, no input fields

### Required Changes from OpenAPI (lines 1358-1376)

#### 3.1. Required Fields  
- **name** (string) - Employee full name

#### 3.2. Optional Fields for Full API Support
- **employeeNumber** (string) - Auto-generated if not provided
- **email** (email) - Employee email address
- **status** (enum) - ACTIVE, INACTIVE (default: ACTIVE)
- **isProjectManager** (boolean) - Whether employee can serve as Project Manager
- **isPrincipal** (boolean) - Whether employee can serve as Principal in Charge  
- **isMarketing** (boolean) - Whether employee can serve as Marketing Contact
- **primaryDisciplineId** (UUID) - Primary discipline assignment

---

## 4. Discipline Create/Update Issues

### Current State
- **MISSING COMPLETELY** - No fields exist for discipline create/update operations
- Only routing operations defined, no input fields

### Required Changes from OpenAPI (lines 1377-1395)

#### 4.1. Required Fields
- **name** (string) - Discipline name

#### 4.2. Optional Fields
- **description** (string) - Discipline description

---

## 5. Path Alignment Issues - Phase/Task Operations

### Current State
- Phase and Task operations correctly use nested paths under projects
- However, path parameters may be incorrectly configured for routing

### Required Changes

#### 5.1. Ensure Proper Path Parameter Handling
**All phase and task routes must use nested paths under projects for every operation:**

**Phase Operations:**
- Create: `POST /api/projects/{projectId}/phases`
- Get: `GET /api/projects/{projectId}/phases/{phaseId}` 
- Get All: `GET /api/projects/{projectId}/phases`
- Update: `PUT /api/projects/{projectId}/phases/{phaseId}`
- Delete: `DELETE /api/projects/{projectId}/phases/{phaseId}`

**Task Operations:**
- Create: `POST /api/projects/{projectId}/phases/{phaseId}/tasks`
- Get: `GET /api/projects/{projectId}/phases/{phaseId}/tasks/{taskId}`
- Get All: `GET /api/projects/{projectId}/phases/{phaseId}/tasks`
- Update: `PUT /api/projects/{projectId}/phases/{phaseId}/tasks/{taskId}`
- Delete: `DELETE /api/projects/{projectId}/phases/{phaseId}/tasks/{taskId}`

#### 5.2. Path Parameter Routing Rules
**CRITICAL**: Path parameters (`projectId`, `phaseId`, `taskId`) must:
- ✅ **Only be used to build the URL path**
- ❌ **NOT be sent in request body**  
- ❌ **NOT be sent as query parameters**

**Current Issues to Fix:**
- Ensure `projectId` fields for phase operations are path-only (not body)
- Ensure `projectId` and `phaseId` fields for task operations are path-only (not body)

---

## 6. Task List Filters Missing

### Current State
- Task getAll operation exists but lacks filtering capabilities
- No pagination support implemented

### Required Changes

#### 6.1. Add Missing Query Parameters for Task getAll
Add these fields for `task` resource, `getAll` operation:

**Search & Pagination:**
- **search** (string) - Search tasks by name (case-insensitive substring)
- **page** (number, default: 1, min: 1) - Page number for pagination
- **limit** (number, default: 50, min: 1) - Items per page

**Routing:** All as `query` parameters to match OpenAPI spec (lines 1006-1019)

#### 6.2. Pagination Handling Expectations
- Surface `page` and `limit` in the N8N UI as user-configurable options
- Return API response envelope as-is (don't unwrap pagination metadata)
- Allow users to access pagination info from the response

---

## 7. Team Resource Missing

### Current State  
- **MISSING COMPLETELY** - Team resource not implemented
- API supports team member management for projects

### Required Changes from OpenAPI (lines 1185-1283)

#### 7.1. Add Team Resource
Add new resource option: **"Team"** with operations:

**Get Team Members:**
- Operation: `GET /api/projects/{projectId}/team`
- Fields: `projectId` (path parameter)

**Add Team Member:**
- Operation: `POST /api/projects/{projectId}/team` 
- Fields: `projectId` (path), `employeeId` (body), `role` (body)

**Remove Team Member:**
- Operation: `DELETE /api/projects/{projectId}/team/{memberId}`
- Fields: `projectId` (path), `memberId` (path)

#### 7.2. Team Field Definitions
- **projectId** (string) - Project UUID (path parameter, required for all operations)
- **memberId** (string) - Team member UUID (path parameter, required for delete only)
- **employeeId** (string) - Employee UUID to add (body parameter, required for create)
- **role** (string) - Role of team member (body parameter, optional for create)

**Note:** No update operation available - team members must be removed and re-added to change roles.

---

## 8. Get/Get Many Operations Analysis

### Client Operations

#### Current N8N Implementation:
- ✅ **Get Many** (`/api/clients`) - Correctly implemented
- ❌ **Get by ID** (`/api/clients/{clientId}`) - **INCORRECTLY IMPLEMENTED** 

#### OpenAPI Specification:
- ✅ **Get Many** (`/api/clients`) - Supported
- ❌ **Get by ID** - **NOT SUPPORTED BY API**

#### Issues:
1. **Invalid Operation**: N8N node offers "Get by ID" operation that doesn't exist in the API
2. **Missing ID Field**: No `clientId` input field defined for the Get operation (would fail anyway)
3. **Broken Functionality**: Users selecting "Get" will get API errors

### Employee Operations  

#### Current N8N Implementation:
- ✅ **Get Many** (`/api/employees`) - Correctly implemented  
- ❌ **Get by ID** (`/api/employees/{employeeId}`) - **INCORRECTLY IMPLEMENTED**

#### OpenAPI Specification:
- ✅ **Get Many** (`/api/employees`) - Supported
- ❌ **Get by ID** - **NOT SUPPORTED BY API**

#### Issues:
1. **Invalid Operation**: N8N node offers "Get by ID" operation that doesn't exist in the API
2. **Missing ID Field**: No `employeeId` input field defined for the Get operation (would fail anyway)
3. **Broken Functionality**: Users selecting "Get" will get API errors

### Discipline Operations

#### Current N8N Implementation:  
- ✅ **Get Many** (`/api/disciplines`) - Correctly implemented
- ❌ **Get by ID** (`/api/disciplines/{disciplineId}`) - **INCORRECTLY IMPLEMENTED**

#### OpenAPI Specification:
- ✅ **Get Many** (`/api/disciplines`) - Supported  
- ❌ **Get by ID** - **NOT SUPPORTED BY API**

#### Issues:
1. **Invalid Operation**: N8N node offers "Get by ID" operation that doesn't exist in the API
2. **Missing ID Field**: No `disciplineId` input field defined for the Get operation (would fail anyway)
3. **Broken Functionality**: Users selecting "Get" will get API errors

### Required Fixes for Get Operations

#### 1. Remove Invalid Get Operations
**Remove these operations from the N8N node** (they don't exist in the API):
- Client → Get by ID
- Employee → Get by ID  
- Discipline → Get by ID

#### 2. Keep Valid Get Many Operations
**These are correctly implemented and should remain**:
- Client → Get Many
- Employee → Get Many
- Discipline → Get Many

---

## 9. Implementation Priority & Notes

### Critical Priority (Fix Broken/Missing Operations)
1. **Fix Project field name mapping** - `projectName` → `name` (prevents project creation)
2. **Remove invalid Get operations** - Client/Employee/Discipline Get by ID don't exist in API and will fail  
3. **Fix path parameter routing** - Phase/Task projectId/phaseId must be path-only, not body

### High Priority (Core Missing Functionality)
4. **Add Team resource** - Complete team management operations missing
5. **Add Task list filters** - Missing search and pagination for task getAll
6. **Project create/update fields** - Add all missing project fields with proper enums/dates
7. **Client create/update fields** - Completely missing, required for project assignment
8. **Employee create/update fields** - Completely missing, required for project roles

### Medium Priority  
9. **Discipline create/update fields** - Simple but useful for reference data

### Summary of Issues by Severity:
- **🔴 Broken**: Project name mapping, invalid get operations, path parameter routing
- **🟠 Missing Core**: Team resource, task filters, all create/update fields
- **🟡 Enhancement**: Additional optional fields and UI improvements

### Implementation Notes
- All enum fields should be dropdown options in N8N UI
- Date fields should use N8N's date picker with proper format
- UUID fields for assignments should have clear descriptions
- Email fields should have email validation
- Boolean fields should be checkboxes with proper defaults
- Consider making clientId/clientNumber mutually exclusive
- All fields should be optional except required ones per API spec
- Add proper field descriptions to guide users