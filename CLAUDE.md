# Stratpoint N8N Node Development

## Project Overview
This project creates an N8N community node for the **Stratpoint ERP Project Data Model POC** Backend API. The node will provide N8N workflow integration for managing projects, phases, tasks, team assignments, timesheets, and reference data.

## API Details
- **Base URL**: https://fc-smb-poc-backend-production.up.railway.app
- **Authentication**: Bearer token required for all endpoints
- **API Version**: 1.0.0

## Core Business Entities

### 3-Level Project Hierarchy
1. **Projects** → **Phases** → **Tasks**
2. Role-based team member assignments
3. Timesheet system with approval workflows
4. Client management with contact details
5. Reference data (disciplines, rate tables)

### Key Features
- Auto-generated project numbers (P1234 format)
- Auto-generated client numbers (C-prefix format) 
- Auto-generated employee numbers (alphanumeric)
- Project types: SMALL_RENOVATION, LARGE_RENOVATION, NEW_CONSTRUCTION, etc.
- Invoice formats: TIME_AND_MATERIALS, FIXED_FEE, COST_PLUS_FIXED_FEE, etc.
- Timesheet approval workflow: Draft → Submitted → Approved/Rejected

## N8N Node Structure

### Template Analysis
The starter template provides:
- **HttpBin node**: Shows API integration patterns with HTTP verbs
- **ExampleNode**: Basic node structure template
- **Credentials**: Bearer token authentication template

### Required Components

#### 1. Stratpoint Credentials (`credentials/StratpointApi.credentials.ts`)
- Bearer token authentication
- Configurable base URL (production/development)
- API token credential testing

#### 2. Main Stratpoint Node (`nodes/Stratpoint/Stratpoint.node.ts`)
Resources to implement:
- **Projects**: CRUD operations for projects
- **Clients**: Client management
- **Employees**: Employee management  
- **Phases**: Project phase management
- **Tasks**: Task management within phases
- **Disciplines**: Reference data management

#### 3. Operations per Resource
- **GET**: List and retrieve individual records
- **POST**: Create new records
- **PUT/PATCH**: Update existing records
- **DELETE**: Remove records

## Build Commands
- `npm run build`: Compile TypeScript and build icons
- `npm run dev`: Watch mode for development
- `npm run lint`: Code linting
- `npm run format`: Code formatting

## Development Guidelines
- Follow N8N node development best practices
- Use proper error handling with NodeOperationError
- Implement proper input/output data handling
- Support continue-on-fail functionality
- Use routing properties for API calls
- Implement proper credential management

## Next Steps
1. Create Stratpoint credentials file
2. Implement main Stratpoint node with resource/operation structure
3. Add proper API endpoint routing
4. Implement error handling
5. Add comprehensive testing
6. Update package.json with Stratpoint node configuration