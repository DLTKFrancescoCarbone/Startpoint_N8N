# Stratpoint N8N Node Development

## Project Overview
This project creates an N8N community node for the **Startpoint ERP Project Data Model POC** Backend API. The node provides comprehensive N8N workflow integration for managing projects, phases, tasks, team assignments, timesheets, and reference data in an architectural/engineering firm ERP system.

## Package Information
- **Package Name**: n8n-nodes-startpoint
- **Version**: 0.1.0
- **License**: MIT
- **Author**: Francesco Carbone
- **Node.js Version**: >=20.15

## API Details
- **Base URL**: https://fc-smb-poc-backend-production.up.railway.app
- **Development URL**: http://localhost:3000  
- **Authentication**: Bearer token required for all endpoints
- **API Version**: 1.0.0
- **Documentation**: Full OpenAPI 3.0 specification available

## Core Business Entities & Workflow

### 3-Level Project Hierarchy
1. **Projects** → **Phases** → **Tasks**
2. **Clients** (with detailed contact information)
3. **Employees** (with roles and disciplines)
4. **Team Assignments** (role-based project assignments)
5. **Timesheet System** (with approval workflows)
6. **Reference Data** (disciplines, rate tables)

### Key Features
- **Auto-Generated IDs**: Project numbers (P1234), client numbers (C1234), employee numbers
- **Project Types**: SMALL_RENOVATION, LARGE_RENOVATION, NEW_CONSTRUCTION, COMMERCIAL_FIT_OUT, etc.
- **Invoice Formats**: TIME_AND_MATERIALS, FIXED_FEE, COST_PLUS_FIXED_FEE, COST_PLUS_PERCENTAGE, etc.
- **Timesheet Workflow**: Draft → Submitted → Approved/Rejected
- **Role Management**: Project Manager, Principal in Charge, Marketing Contact, Billing Manager
- **History Tracking**: Comprehensive audit trail with version control

## N8N Node Implementation Status

### ✅ Completed Components

#### 1. Stratpoint Credentials (`credentials/StartpointApi.credentials.ts`)
- Bearer token authentication with password masking
- Configurable base URL (production/development)
- Built-in credential testing via `/health` endpoint
- Generic authentication type with proper headers

#### 2. Main Stratpoint Node (`nodes/Startpoint/Startpoint.node.ts`)
- **Node Configuration**:
  - Display name: "Startpoint"
  - Icon support (light/dark themes)  
  - Group: "productivity"
  - Subtitle shows operation and resource
  - Single input/output connection
  - Tool integration support

#### 3. Resource Operations (`StartpointDescription.ts`)
**Supported Resources**:
- ✅ **Projects**: Create, Read, Update, Delete, List (with comprehensive filtering)
- ✅ **Clients**: Create, Read, Update, Delete, List  
- ✅ **Employees**: Create, Read, Update, Delete, List
- ✅ **Phases**: Create, Read, Update, Delete, List (nested under projects)
- ✅ **Tasks**: Create, Read, Update, Delete, List (nested under phases)
- ✅ **Disciplines**: Create, Read, Update, Delete, List
- ✅ **Team**: List, Add Member, Remove Member

### Advanced Features Implemented

#### Project Management
- **Filtering**: Search by name, project number, client info, status
- **View Options**: Simple vs Detailed (includes phases/tasks/team)
- **Include Control**: Granular control over nested data
- **Project Assignments**: Client, PM, Principal, Marketing Contact, Billing Manager
- **Financial**: Contract amounts, rate tables, budget allocation

#### Phase & Task Management  
- **Hierarchical Structure**: Projects/Phases/Tasks with proper URL routing
- **Budget Management**: Phase budgets, allocation percentages
- **Time Tracking**: Estimated vs actual hours
- **Status Management**: Numeric status codes with workflow support
- **Display Ordering**: Configurable ordering within projects/phases

#### Client Management
- **Industry Classification**: 12 industry types (Residential, Commercial, Healthcare, etc.)
- **Company Sizing**: Small, Medium, Large, Enterprise
- **Contact Management**: Primary contact with name, email, phone
- **Address Information**: Complete address fields
- **Notes & Website**: Additional client information

#### Employee Management
- **Role Capabilities**: PM, Principal, Marketing flags
- **Status Management**: Active/Inactive employee status
- **Discipline Assignment**: Primary discipline association
- **Contact Information**: Email and employee numbering

#### Team Management
- **Project Teams**: Add/remove team members from projects
- **Role Assignment**: Define team member roles
- **Member Management**: UUID-based team member operations

## Technical Implementation

### Routing & API Integration
- **Path Parameters**: Dynamic URL construction with project/phase/task IDs
- **Query Parameters**: Comprehensive filtering and pagination support
- **Request Body**: Proper routing for create/update operations
- **Error Handling**: Built-in N8N routing error management

### Field Configuration
- **Dynamic Fields**: Context-sensitive field display based on resource/operation
- **Data Types**: String, number, boolean, options, multiOptions, dateTime
- **Validation**: Required fields, min/max values, type constraints
- **Default Values**: Sensible defaults for all optional fields

### Authentication & Security
- **Bearer Token**: Secure token-based authentication
- **Credential Management**: N8N credential system integration
- **Base URL Configuration**: Environment-specific endpoint configuration

## Build & Development

### Scripts Available
```bash
npm run build       # Compile TypeScript and build icons
npm run dev         # Watch mode for development  
npm run format      # Prettier code formatting
npm run lint        # ESLint code analysis
npm run lintfix     # Auto-fix ESLint issues
npm run docker:build # Build Docker container
npm run docker:run  # Run in Docker container
```

### Dependencies
- **Development**: TypeScript 5.8.2, ESLint 8.57.0, Prettier 3.5.3
- **N8N Integration**: n8n-workflow 1.82.0
- **Build Tools**: Gulp 5.0.0, Rimraf for cleanup

### File Structure
```
Startpoint_node/
├── src/
│   ├── credentials/
│   │   ├── StartpointApi.credentials.ts      # ✅ Authentication
│   │   ├── HttpBinApi.credentials.ts         # Template reference
│   │   └── ExampleCredentialsApi.credentials.ts # Template reference
│   └── nodes/
│       ├── Startpoint/
│       │   ├── Startpoint.node.ts            # ✅ Main node
│       │   └── StartpointDescription.ts      # ✅ Operations & fields
│       ├── HttpBin/                          # Template reference
│       └── ExampleNode/                      # Template reference
├── dist/                                     # Compiled output
├── package.json                              # ✅ Package configuration
└── gulpfile.js                              # Build scripts
```

## Development Guidelines

### Code Standards
- Follow N8N community node best practices
- Use proper TypeScript typing with INodeProperties
- Implement comprehensive error handling with NodeOperationError
- Support continue-on-fail functionality for resilient workflows
- Use routing properties for clean API integration

### Testing & Quality
- Credential testing via health endpoint
- ESLint configuration for code quality
- Prettier for consistent formatting
- Pre-publish linting requirements

### API Integration Patterns
- **Resource-based routing**: `/api/{resource}` endpoints
- **Nested resource handling**: `/api/projects/{id}/phases/{id}/tasks`
- **Query parameter mapping**: Automatic routing to API filters
- **Body parameter mapping**: Clean request body construction
- **Response handling**: Proper data extraction and formatting

## Production Deployment

### Docker Support
- Multi-stage Dockerfile for optimized builds
- Development and production configurations
- Port 5678 exposure for N8N integration

### Package Distribution
- NPM-ready package configuration
- Community node package compliance
- Proper file inclusion for distribution
- Semantic versioning support

## Integration Examples

### Common Use Cases
1. **Project Lifecycle**: Create project → Add phases → Assign tasks → Add team members
2. **Client Onboarding**: Create client → Assign to projects → Track project progress  
3. **Team Management**: List available employees → Assign to projects → Track utilization
4. **Time Tracking**: Query tasks → Log time entries → Submit for approval
5. **Reporting**: Get projects with detailed view → Extract phase/task data → Generate reports

### Workflow Patterns
- **Synchronization**: Keep external systems in sync with Startpoint data
- **Automation**: Trigger actions based on project status changes
- **Integration**: Connect with CRM, accounting, and other business systems
- **Reporting**: Extract data for business intelligence and reporting

This implementation provides a comprehensive, production-ready N8N node for the Startpoint ERP system with full CRUD operations across all major business entities.

# Important Instruction Reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.