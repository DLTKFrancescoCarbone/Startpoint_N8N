# Startpoint N8N Node - Software Architecture Plan

## Executive Summary

This document outlines the software architecture for developing an N8N community node that integrates with the **Startpoint ERP Project Data Model POC** Backend API. The node will provide comprehensive workflow automation capabilities for project management, including projects, phases, tasks, team assignments, timesheets, and reference data management.

## 1. System Overview

### 1.1 API Analysis
- **API Base URL**: `https://fc-smb-poc-backend-production.up.railway.app`
- **Authentication**: Bearer Token (JWT)
- **API Standard**: OpenAPI 3.0.0
- **Response Format**: Standardized with `SuccessResponse` and `ErrorResponse` wrappers
- **Business Model**: 3-level hierarchy (Projects → Phases → Tasks)

### 1.2 Core Business Entities
1. **Projects**: Top-level project management with auto-generated P-prefix numbers
2. **Clients**: Client management with auto-generated C-prefix numbers  
3. **Employees**: Team member management with alphanumeric employee numbers
4. **Phases**: Project sub-components with budget allocation
5. **Tasks**: Granular work items within phases
6. **Disciplines**: Reference data for professional disciplines

## 2. N8N Node Architecture

### 2.1 Component Structure
```
Startpoint/
├── credentials/
│   └── StartpointApi.credentials.ts
├── nodes/
│   └── Startpoint/
│       ├── Startpoint.node.ts
│       ├── StartpointDescription.ts
│       ├── startpoint.svg
│       └── operations/
│           ├── ProjectOperations.ts
│           ├── ClientOperations.ts
│           ├── EmployeeOperations.ts
│           ├── PhaseOperations.ts
│           ├── TaskOperations.ts
│           └── DisciplineOperations.ts
```

### 2.2 Credential Management
**File**: `credentials/StartpointApi.credentials.ts`
- Bearer token authentication
- Configurable base URL (production/development)
- Built-in credential testing via `/health` endpoint
- Support for both production and local development environments

### 2.3 Main Node Structure
**File**: `nodes/Startpoint/Startpoint.node.ts`
- Single unified node with multiple resources
- Resource-based organization matching API structure
- Operation-based sub-navigation
- Comprehensive error handling and validation

## 3. Resource and Operation Matrix

### 3.1 Resource Design Pattern
Each resource follows consistent CRUD operation patterns:

| Resource | GET (List) | GET (Single) | POST (Create) | PUT (Update) | DELETE (Remove) |
|----------|------------|--------------|---------------|--------------|-----------------|
| Projects | ✓ | ✓ | ✓ | ✓ | ✓ |
| Clients | ✓ | ✓ | ✓ | ✓ | ✓ |
| Employees | ✓ | ✓ | ✓ | ✓ | ✓ |
| Phases | ✓ | ✓ | ✓ | ✓ | ✓ |
| Tasks | ✓ | ✓ | ✓ | ✓ | ✓ |
| Disciplines | ✓ | ✓ | ✓ | ✓ | ✓ |

### 3.2 Operation Implementation Strategy

#### 3.2.1 List Operations (GET /api/{resource})
- Support pagination parameters
- Include query parameter for related data
- Return array of entities in standardized format

#### 3.2.2 Single Entity Operations (GET /api/{resource}/{id})
- UUID-based entity retrieval
- Include query parameter for related data expansion
- Proper 404 error handling

#### 3.2.3 Create Operations (POST /api/{resource})
- Dynamic form generation based on OpenAPI schema
- Required field validation
- Auto-generation support (project numbers, client numbers, etc.)
- Enum dropdown support for constrained fields

#### 3.2.4 Update Operations (PUT /api/{resource}/{id})
- Partial update support
- Field validation matching create operations
- Audit trail maintenance (updatedBy field)

#### 3.2.5 Delete Operations (DELETE /api/{resource}/{id})
- UUID-based deletion
- Proper error handling for constraints
- Confirmation workflows for critical entities

## 4. Technical Implementation Details

### 4.1 Node Properties Architecture

#### 4.1.1 Resource Selection
```typescript
{
  displayName: 'Resource',
  name: 'resource',
  type: 'options',
  noDataExpression: true,
  options: [
    { name: 'Project', value: 'project' },
    { name: 'Client', value: 'client' },
    { name: 'Employee', value: 'employee' },
    { name: 'Phase', value: 'phase' },
    { name: 'Task', value: 'task' },
    { name: 'Discipline', value: 'discipline' }
  ],
  default: 'project'
}
```

#### 4.1.2 Operation Selection (Dynamic per Resource)
- **Create**: Form-based input with validation
- **Get All**: List retrieval with optional filtering
- **Get**: Single entity retrieval by ID
- **Update**: Partial update with field selection
- **Delete**: Entity removal with confirmation

#### 4.1.3 Dynamic Field Generation
- Enum fields → Dropdown options
- Required fields → Validation rules
- UUID fields → String input with validation
- Date fields → Date picker
- Decimal fields → Number input with precision

### 4.2 Error Handling Strategy

#### 4.2.1 API Error Mapping
- **400 Bad Request**: Input validation errors
- **404 Not Found**: Entity not found errors  
- **409 Conflict**: Business rule violations
- **500 Internal Server Error**: System errors

#### 4.2.2 N8N Error Integration
- Use `NodeOperationError` for user-facing errors
- Implement `continueOnFail` support
- Provide detailed error context with `itemIndex`
- Map API error codes to meaningful messages

### 4.3 Data Transformation Strategy

#### 4.3.1 Input Processing
- Convert N8N input data to API request format
- Handle UUID validation and conversion
- Process enum values and constraints
- Manage date format conversion

#### 4.3.2 Output Processing
- Transform API responses to N8N data format
- Preserve original response structure in metadata
- Handle pagination data extraction
- Process included/related entity data

## 5. Implementation Phases

### Phase 1: Foundation (Week 1)
1. **Credential Setup**
   - Implement `StartpointApi.credentials.ts`
   - Add credential testing functionality
   - Configure base URL management

2. **Core Node Structure**
   - Create main `Startpoint.node.ts`
   - Implement resource selection
   - Set up basic routing infrastructure

### Phase 2: Core Resources (Week 2-3)
1. **Project Management**
   - Implement all project CRUD operations
   - Add project type and status enums
   - Handle client lookup by ID/number

2. **Client Management**
   - Implement client CRUD operations
   - Add industry and company size enums
   - Handle contact information fields

### Phase 3: Extended Resources (Week 4)
1. **Employee Management**
   - Implement employee CRUD operations
   - Handle role-based permissions (PM, Principal, Marketing)
   - Add discipline assignment

2. **Hierarchical Resources**
   - Implement Phase operations (linked to projects)
   - Implement Task operations (linked to phases)
   - Handle parent-child relationships

### Phase 4: Reference Data & Polish (Week 5)
1. **Discipline Management**
   - Implement discipline CRUD operations
   - Add reference data caching strategies

2. **Testing & Documentation**
   - Comprehensive integration testing
   - Performance optimization
   - Documentation completion

## 6. Data Model Relationships

### 6.1 Entity Relationships
```
Client (1) ──────── (*) Project
                      │
                      ├── (1) Employee [Project Manager]
                      ├── (1) Employee [Principal in Charge]
                      ├── (1) Employee [Marketing Contact]
                      ├── (1) Employee [Billing Manager]
                      ├── (1) Discipline [Primary]
                      │
                      └── (*) Phase
                            │
                            └── (*) Task
```

### 6.2 Lookup Strategies
- **Client Lookup**: Support both `clientId` (UUID) and `clientNumber` (string)
- **Employee Lookup**: By UUID with role validation
- **Discipline Lookup**: By UUID for consistency
- **Parent Entity Validation**: Ensure phases belong to valid projects, tasks to valid phases

## 7. Configuration Management

### 7.1 Environment Configuration
- **Production**: `https://fc-smb-poc-backend-production.up.railway.app`
- **Development**: `http://localhost:3000`
- **Credential Testing**: Health check endpoint validation

### 7.2 API Integration Patterns
- **Request Headers**: `Authorization: Bearer {token}`, `Content-Type: application/json`
- **Response Handling**: Standardized success/error response processing
- **Pagination**: Handle paginated responses for list operations
- **Include Parameters**: Support related data expansion

## 8. Quality Assurance Strategy

### 8.1 Testing Approach
1. **Unit Tests**: Individual operation validation
2. **Integration Tests**: End-to-end API communication
3. **Error Handling Tests**: Comprehensive error scenario coverage
4. **Credential Tests**: Authentication and authorization validation

### 8.2 Performance Considerations
- **Request Batching**: Group related API calls when possible
- **Response Caching**: Cache reference data (disciplines, employees)
- **Connection Pooling**: Efficient HTTP connection management
- **Rate Limiting**: Respect API rate limits and implement backoff

## 9. Security Considerations

### 9.1 Authentication Security
- Secure bearer token storage in N8N credentials
- Token validation before API calls
- Proper error handling for authentication failures

### 9.2 Data Security
- No logging of sensitive data (tokens, personal information)
- Proper input sanitization and validation
- Secure handling of client and employee data

## 10. Development Workflow (Based on Starter Template)

### 10.1 Setup Process
1. **Initialize Development Environment**
   ```bash
   npm i                    # Install dependencies
   npm run build           # Build TypeScript and icons
   npm run dev            # Watch mode for development
   ```

2. **Code Quality**
   ```bash
   npm run lint           # Check for errors
   npm run lintfix       # Auto-fix errors when possible
   npm run format        # Format code with prettier
   ```

3. **Local Testing**
   - Follow [Run your node locally](https://docs.n8n.io/integrations/creating-nodes/test/run-node-locally/) guide
   - Test with both production and development API endpoints
   - Validate all CRUD operations and error scenarios

### 10.2 Package Configuration
- **Update package.json**: Replace template placeholders with Startpoint details
- **Node Registration**: Add Startpoint node and credentials to n8n configuration
- **Build Process**: `npm run build && npm run lint` before publishing
- **Distribution**: Submit to npm registry for community access

### 10.3 Documentation Requirements
- **Replace README**: Use README_TEMPLATE.md as starting point
- **Installation Guide**: NPM installation and setup instructions
- **Usage Examples**: Common Startpoint workflow patterns
- **API Reference**: Complete operation documentation with examples
- **Troubleshooting**: Common issues and solutions

## 11. Success Metrics

### 11.1 Functional Metrics
- All 6 core resources fully implemented (100% API coverage)
- All CRUD operations working correctly
- Proper error handling and user feedback
- Comprehensive credential management

### 11.2 Quality Metrics
- Zero critical security vulnerabilities
- <100ms average response overhead (N8N processing time)
- 95%+ test coverage
- Clear, maintainable code structure

## Conclusion

This architecture plan provides a comprehensive roadmap for building a robust, scalable, and user-friendly N8N node for the Stratpoint ERP API. The phased approach ensures systematic development while maintaining code quality and user experience standards.