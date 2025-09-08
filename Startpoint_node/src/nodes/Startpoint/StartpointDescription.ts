import { INodeProperties } from "n8n-workflow";

// Resource operations - dynamically shown based on selected resource
export const startpointOperations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["project"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new project",
        action: "Create a project",
        routing: {
          request: {
            method: "POST",
            url: "/api/projects",
          },
        },
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a project",
        action: "Delete a project",
        routing: {
          request: {
            method: "DELETE",
            url: '=/api/projects/{{$parameter["projectId"]}}',
          },
        },
      },
      {
        name: "Get",
        value: "get",
        description: "Get a project by ID",
        action: "Get a project",
        routing: {
          request: {
            method: "GET",
            url: '=/api/projects/{{$parameter["projectId"]}}',
          },
        },
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many projects",
        action: "Get many projects",
        routing: {
          request: {
            method: "GET",
            url: "/api/projects",
          },
        },
      },
      {
        name: "Update",
        value: "update",
        description: "Update a project",
        action: "Update a project",
        routing: {
          request: {
            method: "PUT",
            url: '=/api/projects/{{$parameter["projectId"]}}',
          },
        },
      },
      {
        name: "Get History",
        value: "getHistory",
        description: "Get project history",
        action: "Get project history",
        routing: {
          request: {
            method: "GET",
            url: '=/api/projects/{{$parameter["projectId"]}}/history',
          },
        },
      },
      {
        name: "Get At Timestamp",
        value: "getAt",
        description: "Get project state at a timestamp",
        action: "Get project at timestamp",
        routing: {
          request: {
            method: "GET",
            url: '=/api/projects/{{$parameter["projectId"]}}/at',
          },
        },
      },
      {
        name: "Get Diff",
        value: "getDiff",
        description: "Get diff between two timestamps",
        action: "Get project diff",
        routing: {
          request: {
            method: "GET",
            url: '=/api/projects/{{$parameter["projectId"]}}/diff',
          },
        },
      },
    ],
    default: "getAll",
  },
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["client"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new client",
        action: "Create a client",
        routing: {
          request: {
            method: "POST",
            url: "/api/clients",
          },
        },
      },
      {
        name: "Get",
        value: "get",
        description: "Get a client by ID",
        action: "Get a client",
        routing: {
          request: {
            method: "GET",
            url: '=/api/clients/{{$parameter["clientId"]}}',
          },
        },
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a client",
        action: "Delete a client",
        routing: {
          request: {
            method: "DELETE",
            url: '=/api/clients/{{$parameter["clientId"]}}',
          },
        },
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many clients",
        action: "Get many clients",
        routing: {
          request: {
            method: "GET",
            url: "/api/clients",
          },
        },
      },
      {
        name: "Get Industries",
        value: "getIndustries",
        description: "Get available client industries",
        action: "Get client industries",
        routing: {
          request: {
            method: "GET",
            url: "/api/clients/meta/industries",
          },
        },
      },
      {
        name: "Get Company Sizes",
        value: "getCompanySizes",
        description: "Get available company sizes",
        action: "Get company sizes",
        routing: {
          request: {
            method: "GET",
            url: "/api/clients/meta/company-sizes",
          },
        },
      },
      {
        name: "Get History",
        value: "getHistory",
        description: "Get client history",
        action: "Get client history",
        routing: {
          request: {
            method: "GET",
            url: '=/api/clients/{{$parameter["clientId"]}}/history',
          },
        },
      },
      {
        name: "Get At Timestamp",
        value: "getAt",
        description: "Get client state at a timestamp",
        action: "Get client at timestamp",
        routing: {
          request: {
            method: "GET",
            url: '=/api/clients/{{$parameter["clientId"]}}/at',
          },
        },
      },
      {
        name: "Get Diff",
        value: "getDiff",
        description: "Get diff between two timestamps",
        action: "Get client diff",
        routing: {
          request: {
            method: "GET",
            url: '=/api/clients/{{$parameter["clientId"]}}/diff',
          },
        },
      },
      {
        name: "Update",
        value: "update",
        description: "Update a client",
        action: "Update a client",
        routing: {
          request: {
            method: "PUT",
            url: '=/api/clients/{{$parameter["clientId"]}}',
          },
        },
      },
    ],
    default: "getAll",
  },
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["employee"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new employee",
        action: "Create an employee",
        routing: {
          request: {
            method: "POST",
            url: "/api/employees",
          },
        },
      },
      {
        name: "Get",
        value: "get",
        description: "Get an employee by ID",
        action: "Get an employee",
        routing: {
          request: {
            method: "GET",
            url: '=/api/employees/{{$parameter["employeeId"]}}',
          },
        },
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete an employee",
        action: "Delete an employee",
        routing: {
          request: {
            method: "DELETE",
            url: '=/api/employees/{{$parameter["employeeId"]}}',
          },
        },
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many employees",
        action: "Get many employees",
        routing: {
          request: {
            method: "GET",
            url: "/api/employees",
          },
        },
      },
      {
        name: "Get Capabilities",
        value: "getCapabilities",
        description: "Get employees filtered by role capabilities",
        action: "Get employees by capabilities",
        routing: {
          request: {
            method: "GET",
            url: "/api/employees/roles/capabilities",
          },
        },
      },
      {
        name: "Deactivate",
        value: "deactivate",
        description: "Deactivate an employee",
        action: "Deactivate employee",
        routing: {
          request: {
            method: "PATCH",
            url: '=/api/employees/{{$parameter["employeeId"]}}/deactivate',
          },
        },
      },
      {
        name: "Update",
        value: "update",
        description: "Update an employee",
        action: "Update an employee",
        routing: {
          request: {
            method: "PUT",
            url: '=/api/employees/{{$parameter["employeeId"]}}',
          },
        },
      },
      {
        name: "Get History",
        value: "getHistory",
        description: "Get employee history",
        action: "Get employee history",
        routing: {
          request: {
            method: "GET",
            url: '=/api/employees/{{$parameter["employeeId"]}}/history',
          },
        },
      },
    ],
    default: "getAll",
  },
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["phase"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new phase",
        action: "Create a phase",
        routing: {
          request: {
            method: "POST",
            url: '=/api/projects/{{$parameter["projectId"]}}/phases',
          },
        },
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a phase",
        action: "Delete a phase",
        routing: {
          request: {
            method: "DELETE",
            url:
              '=/api/projects/{{$parameter["projectId"]}}/phases/{{$parameter["phaseId"]}}',
          },
        },
      },
      {
        name: "Get",
        value: "get",
        description: "Get a phase by ID",
        action: "Get a phase",
        routing: {
          request: {
            method: "GET",
            url:
              '=/api/projects/{{$parameter["projectId"]}}/phases/{{$parameter["phaseId"]}}',
          },
        },
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many phases",
        action: "Get many phases",
        routing: {
          request: {
            method: "GET",
            url: '=/api/projects/{{$parameter["projectId"]}}/phases',
          },
        },
      },
      {
        name: "Update",
        value: "update",
        description: "Update a phase",
        action: "Update a phase",
        routing: {
          request: {
            method: "PUT",
            url:
              '=/api/projects/{{$parameter["projectId"]}}/phases/{{$parameter["phaseId"]}}',
          },
        },
      },
    ],
    default: "getAll",
  },
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["task"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new task",
        action: "Create a task",
        routing: {
          request: {
            method: "POST",
            url:
              '=/api/projects/{{$parameter["projectId"]}}/phases/{{$parameter["phaseId"]}}/tasks',
          },
        },
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a task",
        action: "Delete a task",
        routing: {
          request: {
            method: "DELETE",
            url:
              '=/api/projects/{{$parameter["projectId"]}}/phases/{{$parameter["phaseId"]}}/tasks/{{$parameter["taskId"]}}',
          },
        },
      },
      {
        name: "Get",
        value: "get",
        description: "Get a task by ID",
        action: "Get a task",
        routing: {
          request: {
            method: "GET",
            url:
              '=/api/projects/{{$parameter["projectId"]}}/phases/{{$parameter["phaseId"]}}/tasks/{{$parameter["taskId"]}}',
          },
        },
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many tasks",
        action: "Get many tasks",
        routing: {
          request: {
            method: "GET",
            url:
              '=/api/projects/{{$parameter["projectId"]}}/phases/{{$parameter["phaseId"]}}/tasks',
          },
        },
      },
      {
        name: "Update",
        value: "update",
        description: "Update a task",
        action: "Update a task",
        routing: {
          request: {
            method: "PUT",
            url:
              '=/api/projects/{{$parameter["projectId"]}}/phases/{{$parameter["phaseId"]}}/tasks/{{$parameter["taskId"]}}',
          },
        },
      },
    ],
    default: "getAll",
  },
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["discipline"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new discipline",
        action: "Create a discipline",
        routing: {
          request: {
            method: "POST",
            url: "/api/disciplines",
          },
        },
      },
      {
        name: "Get",
        value: "get",
        description: "Get a discipline by ID",
        action: "Get a discipline",
        routing: {
          request: {
            method: "GET",
            url: '=/api/disciplines/{{$parameter["disciplineId"]}}',
          },
        },
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a discipline",
        action: "Delete a discipline",
        routing: {
          request: {
            method: "DELETE",
            url: '=/api/disciplines/{{$parameter["disciplineId"]}}',
          },
        },
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many disciplines",
        action: "Get many disciplines",
        routing: {
          request: {
            method: "GET",
            url: "/api/disciplines",
          },
        },
      },
      {
        name: "Update",
        value: "update",
        description: "Update a discipline",
        action: "Update a discipline",
        routing: {
          request: {
            method: "PUT",
            url: '=/api/disciplines/{{$parameter["disciplineId"]}}',
          },
        },
      },
    ],
    default: "getAll",
  },
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["team"],
      },
    },
    options: [
      {
        name: "Get Many",
        value: "getAll",
        description: "List project team members",
        action: "Get team members",
        routing: {
          request: {
            method: "GET",
            url: '=/api/projects/{{$parameter["projectId"]}}/team',
          },
        },
      },
      {
        name: "Create",
        value: "create",
        description: "Add team member to project",
        action: "Add team member",
        routing: {
          request: {
            method: "POST",
            url: '=/api/projects/{{$parameter["projectId"]}}/team',
          },
        },
      },
      {
        name: "Delete",
        value: "delete",
        description: "Remove team member from project",
        action: "Remove team member",
        routing: {
          request: {
            method: "DELETE",
            url: '=/api/projects/{{$parameter["projectId"]}}/team/{{$parameter["memberId"]}}',
          },
        },
      },
    ],
    default: "getAll",
  },
];

// Resource fields - define field behaviors and routing
export const startpointFields: INodeProperties[] = [
  // Project fields
  {
    displayName: "Project ID",
    name: "projectId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["delete", "get", "update", "getHistory", "getAt", "getDiff"],
      },
    },
    default: "",
    description: "The ID of the project",
  },
  {
    displayName: "Limit",
    name: "projectHistoryLimit",
    type: "number",
    typeOptions: { minValue: 1 },
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getHistory"],
      },
    },
    default: 50,
    routing: { send: { type: "query", property: "limit" } },
    description: "Number of history entries to return",
  },
  {
    displayName: "Since",
    name: "projectHistorySince",
    type: "dateTime",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getHistory"],
      },
    },
    default: "",
    routing: { send: { type: "query", property: "since" } },
    description: "Show events since this timestamp",
  },
  {
    displayName: "Until",
    name: "projectHistoryUntil",
    type: "dateTime",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getHistory"],
      },
    },
    default: "",
    routing: { send: { type: "query", property: "until" } },
    description: "Show events until this timestamp",
  },
  {
    displayName: "Timestamp",
    name: "projectAtTs",
    type: "dateTime",
    required: true,
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getAt"],
      },
    },
    default: "",
    routing: { send: { type: "query", property: "ts" } },
    description: "Timestamp (ISO format)",
  },
  {
    displayName: "From",
    name: "projectDiffFrom",
    type: "dateTime",
    required: true,
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getDiff"],
      },
    },
    default: "",
    routing: { send: { type: "query", property: "from" } },
    description: "From timestamp",
  },
  {
    displayName: "To",
    name: "projectDiffTo",
    type: "dateTime",
    required: true,
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getDiff"],
      },
    },
    default: "",
    routing: { send: { type: "query", property: "to" } },
    description: "To timestamp",
  },
  // Phase fields
  {
    displayName: "Phase ID",
    name: "phaseId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["phase"],
        operation: ["delete", "get", "update"],
      },
    },
    default: "",
    description: "The ID of the phase",
  },
  {
    displayName: "Project ID",
    name: "projectId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["phase"],
        operation: ["create", "update", "get", "delete", "getAll"],
      },
    },
    default: "",
    description: "Project UUID this phase belongs to (path parameter)",
  },
  {
    displayName: "Phase Name",
    name: "name",
    type: "string",
    displayOptions: {
      show: {
        resource: ["phase"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "name",
      },
    },
    description: "Name of the phase",
  },
  {
    displayName: "Description",
    name: "description",
    type: "string",
    displayOptions: {
      show: {
        resource: ["phase"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "description",
      },
    },
    description: "Phase description",
  },
  {
    displayName: "Status Code",
    name: "status",
    type: "number",
    typeOptions: { minValue: 0 },
    displayOptions: {
      show: {
        resource: ["phase"],
        operation: ["update"],
      },
    },
    default: 0,
    routing: {
      send: {
        type: "body",
        property: "status",
      },
    },
    description: "Phase status code (integer)",
  },
  {
    displayName: "Display Order",
    name: "displayOrder",
    type: "number",
    typeOptions: { minValue: 1 },
    displayOptions: {
      show: {
        resource: ["phase"],
        operation: ["create", "update"],
      },
    },
    default: 1,
    routing: {
      send: {
        type: "body",
        property: "displayOrder",
      },
    },
    description: "Order within the project",
  },
  {
    displayName: "Budget Allocation %",
    name: "budgetAllocationPercent",
    type: "number",
    typeOptions: { minValue: 0 },
    displayOptions: {
      show: {
        resource: ["phase"],
        operation: ["create", "update"],
      },
    },
    default: 0,
    routing: {
      send: {
        type: "body",
        property: "budgetAllocationPercent",
      },
    },
    description: "Budget allocation percentage for the phase",
  },
  {
    displayName: "Estimated Hours",
    name: "estimatedHours",
    type: "number",
    typeOptions: { minValue: 0 },
    displayOptions: {
      show: {
        resource: ["phase"],
        operation: ["create", "update"],
      },
    },
    default: 0,
    routing: {
      send: {
        type: "body",
        property: "estimatedHours",
      },
    },
    description: "Estimated hours for the phase",
  },
  {
    displayName: "Phase Budget",
    name: "phaseBudget",
    type: "number",
    typeOptions: { minValue: 0 },
    displayOptions: {
      show: {
        resource: ["phase"],
        operation: ["create", "update"],
      },
    },
    default: 0,
    routing: {
      send: {
        type: "body",
        property: "phaseBudget",
      },
    },
    description: "Budget amount for the phase",
  },
  {
    displayName: "Notes",
    name: "notes",
    type: "string",
    displayOptions: {
      show: {
        resource: ["phase"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "notes",
      },
    },
    description: "Additional notes for the phase",
  },

  // Task fields
  {
    displayName: "Task ID",
    name: "taskId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["delete", "get", "update"],
      },
    },
    default: "",
    description: "The ID of the task",
  },
  {
    displayName: "Project ID",
    name: "projectId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create", "update", "get", "delete", "getAll"],
      },
    },
    default: "",
    description: "Project UUID (path parameter)",
  },
  {
    displayName: "Phase ID",
    name: "phaseId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create", "update", "get", "delete", "getAll"],
      },
    },
    default: "",
    description: "Phase UUID (path parameter)",
  },
  // Task list filters
  {
    displayName: "Search",
    name: "search",
    type: "string",
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["getAll"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "query",
        property: "search",
      },
    },
    description: "Search tasks by name (case-insensitive substring)",
  },
  {
    displayName: "Page",
    name: "page",
    type: "number",
    typeOptions: { minValue: 1 },
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["getAll"],
      },
    },
    default: 1,
    routing: {
      send: {
        type: "query",
        property: "page",
      },
    },
    description: "Page number for task listing",
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    typeOptions: { minValue: 1 },
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["getAll"],
      },
    },
    default: 50,
    routing: {
      send: {
        type: "query",
        property: "limit",
      },
    },
    description: "Items per page for task listing",
  },
  {
    displayName: "Task Name",
    name: "name",
    type: "string",
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "name",
      },
    },
    description: "Name of the task",
  },
  {
    displayName: "Description",
    name: "description",
    type: "string",
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "description",
      },
    },
    description: "Task description",
  },
  {
    displayName: "Status Code",
    name: "status",
    type: "number",
    typeOptions: { minValue: 0 },
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create", "update"],
      },
    },
    default: 0,
    routing: {
      send: {
        type: "body",
        property: "status",
      },
    },
    description: "Task status code (integer)",
  },
  {
    displayName: "Display Order",
    name: "displayOrder",
    type: "number",
    typeOptions: { minValue: 1 },
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create", "update"],
      },
    },
    default: 1,
    routing: {
      send: {
        type: "body",
        property: "displayOrder",
      },
    },
    description: "Order within the phase",
  },
  {
    displayName: "Estimated Hours",
    name: "estimatedHours",
    type: "number",
    typeOptions: { minValue: 0 },
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create", "update"],
      },
    },
    default: 0,
    routing: {
      send: {
        type: "body",
        property: "estimatedHours",
      },
    },
    description: "Estimated hours for the task",
  },
  {
    displayName: "Actual Hours",
    name: "actualHours",
    type: "number",
    typeOptions: { minValue: 0 },
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["update"],
      },
    },
    default: 0,
    routing: {
      send: {
        type: "body",
        property: "actualHours",
      },
    },
    description: "Actual hours logged",
  },
  {
    displayName: "Task Budget",
    name: "taskBudget",
    type: "number",
    typeOptions: { minValue: 0 },
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create", "update"],
      },
    },
    default: 0,
    routing: {
      send: {
        type: "body",
        property: "taskBudget",
      },
    },
    description: "Budget amount for the task",
  },
  {
    displayName: "Notes",
    name: "notes",
    type: "string",
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "notes",
      },
    },
    description: "Additional notes for the task",
  },
  {
    displayName: "Project Name",
    name: "projectName",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "name",
      },
    },
    description: "Name of the project (required)",
  },

  // Additional Project Create/Update Fields
  {
    displayName: "Project Number",
    name: "projectNumberCreate",
    type: "string",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "projectNumber",
      },
    },
    description: "Project number (auto-generated if not provided)",
  },
  {
    displayName: "Description",
    name: "description",
    type: "string",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "description",
        value: '={{ $parameter.description || undefined }}',
      },
    },
    description: "Project description",
  },
  {
    displayName: "Status",
    name: "status",
    type: "options",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["create", "update"],
      },
    },
    options: [
      { name: "Auto (server default)", value: "auto" },
      { name: "ACTIVE", value: "ACTIVE" },
      { name: "INACTIVE", value: "INACTIVE" },
    ],
    default: "auto",
    routing: {
      send: {
        type: "body",
        property: "status",
        value: '={{ $parameter.status === "auto" ? undefined : $parameter.status }}',
      },
    },
    description: "Project status",
  },
  {
    displayName: "Location",
    name: "location",
    type: "string",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "location",
      },
    },
    description: "Project location",
  },
  {
    displayName: "Notes",
    name: "notes",
    type: "string",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "notes",
      },
    },
    description: "Project notes",
  },
  {
    displayName: "Client ID",
    name: "clientIdCreate",
    type: "string",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "clientId",
      },
    },
    description: "Client UUID for assignment",
  },
  {
    displayName: "Client Number",
    name: "clientNumberCreate",
    type: "string",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "clientNumber",
      },
    },
    description: "Alternative client lookup by number (e.g., C1234)",
  },
  {
    displayName: "Project Type",
    name: "projectType",
    type: "options",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["create", "update"],
      },
    },
    options: [
      { name: "Auto (decide later)", value: "auto" },
      { name: "Residential", value: "RESIDENTIAL" },
      { name: "Commercial", value: "COMMERCIAL" },
      { name: "Institutional", value: "INSTITUTIONAL" },
      { name: "Industrial", value: "INDUSTRIAL" },
      { name: "Mixed Use", value: "MIXED_USE" },
      { name: "Renovation", value: "RENOVATION" },
      { name: "New Construction", value: "NEW_CONSTRUCTION" },
    ],
    default: "auto",
    routing: {
      send: {
        type: "body",
        property: "projectType",
        value: '={{ $parameter.projectType === "auto" ? undefined : $parameter.projectType }}',
      },
    },
    description: "Project type classification",
  },
  {
    displayName: "Invoice Format",
    name: "invoiceFormat",
    type: "options",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["create", "update"],
      },
    },
    options: [
      { name: "Auto (decide later)", value: "auto" },
      { name: "Standard", value: "STANDARD" },
      { name: "Detailed", value: "DETAILED" },
      { name: "Summary", value: "SUMMARY" },
      { name: "Hourly Breakdown", value: "HOURLY_BREAKDOWN" },
      { name: "Milestone Based", value: "MILESTONE_BASED" },
    ],
    default: "auto",
    routing: {
      send: {
        type: "body",
        property: "invoiceFormat",
        value: '={{ $parameter.invoiceFormat === "auto" ? undefined : $parameter.invoiceFormat }}',
      },
    },
    description: "Invoice format type",
  },
  {
    displayName: "Primary Discipline ID",
    name: "primaryDisciplineId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "primaryDisciplineId",
      },
    },
    description: "Primary discipline UUID",
  },
  {
    displayName: "Project Manager ID",
    name: "projectManagerIdCreate",
    type: "string",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "projectManagerId",
      },
    },
    description: "Project manager employee UUID",
  },
  {
    displayName: "Principal in Charge ID",
    name: "principalInChargeId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "principalInChargeId",
      },
    },
    description: "Principal in charge employee UUID",
  },
  {
    displayName: "Marketing Contact ID",
    name: "marketingContactId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "marketingContactId",
      },
    },
    description: "Marketing contact employee UUID",
  },
  {
    displayName: "Billing Manager ID",
    name: "billingManagerId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "billingManagerId",
      },
    },
    description: "Billing manager employee UUID",
  },
  {
    displayName: "Total Contract Amount",
    name: "totalContractAmount",
    type: "number",
    typeOptions: { minValue: 0 },
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["create", "update"],
      },
    },
    default: 0,
    routing: {
      send: {
        type: "body",
        property: "totalContractAmount",
      },
    },
    description: "Total contract amount",
  },
  {
    displayName: "Estimated Start Date",
    name: "estimatedStartDate",
    type: "dateTime",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "estimatedStartDate",
      },
    },
    description: "Estimated start date (ISO format: YYYY-MM-DD)",
  },
  {
    displayName: "Estimated End Date",
    name: "estimatedEndDate",
    type: "dateTime",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "estimatedEndDate",
      },
    },
    description: "Estimated end date (ISO format: YYYY-MM-DD)",
  },
  {
    displayName: "Rate Table ID",
    name: "rateTableId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "rateTableId",
      },
    },
    description: "Rate table UUID",
  },

  // Client Create/Update Fields
  {
    displayName: "Client ID",
    name: "clientId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["delete", "update", "get", "getHistory", "getAt", "getDiff"],
      },
    },
    default: "",
    required: true,
    description: "Client UUID (required for delete/update operations)",
  },
  {
    displayName: "Limit",
    name: "clientHistoryLimit",
    type: "number",
    typeOptions: { minValue: 1 },
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["getHistory"],
      },
    },
    default: 50,
    routing: { send: { type: "query", property: "limit" } },
    description: "Number of history entries to return",
  },
  {
    displayName: "Since",
    name: "clientHistorySince",
    type: "dateTime",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["getHistory"],
      },
    },
    default: "",
    routing: { send: { type: "query", property: "since" } },
    description: "Show events since this timestamp",
  },
  {
    displayName: "Until",
    name: "clientHistoryUntil",
    type: "dateTime",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["getHistory"],
      },
    },
    default: "",
    routing: { send: { type: "query", property: "until" } },
    description: "Show events until this timestamp",
  },
  {
    displayName: "Timestamp",
    name: "clientAtTs",
    type: "dateTime",
    required: true,
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["getAt"],
      },
    },
    default: "",
    routing: { send: { type: "query", property: "ts" } },
    description: "Timestamp (ISO format)",
  },
  {
    displayName: "From",
    name: "clientDiffFrom",
    type: "dateTime",
    required: true,
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["getDiff"],
      },
    },
    default: "",
    routing: { send: { type: "query", property: "from" } },
    description: "From timestamp",
  },
  {
    displayName: "To",
    name: "clientDiffTo",
    type: "dateTime",
    required: true,
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["getDiff"],
      },
    },
    default: "",
    routing: { send: { type: "query", property: "to" } },
    description: "To timestamp",
  },
  {
    displayName: "Client Name",
    name: "clientName",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "name",
      },
    },
    description: "Client company name (required)",
  },
  {
    displayName: "Client Number",
    name: "clientNumberField",
    type: "string",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "clientNumber",
      },
    },
    description: "Client number (auto-generated if not provided)",
  },
  {
    displayName: "Industry",
    name: "industry",
    type: "options",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["create", "update"],
      },
    },
    options: [
      {
        name: "Residential Developer",
        value: "RESIDENTIAL_DEVELOPER",
      },
      {
        name: "Commercial Real Estate",
        value: "COMMERCIAL_REAL_ESTATE",
      },
      {
        name: "Healthcare",
        value: "HEALTHCARE",
      },
      {
        name: "Education",
        value: "EDUCATION",
      },
      {
        name: "Hospitality",
        value: "HOSPITALITY",
      },
      {
        name: "Retail",
        value: "RETAIL",
      },
      {
        name: "Industrial Manufacturing",
        value: "INDUSTRIAL_MANUFACTURING",
      },
      {
        name: "Government",
        value: "GOVERNMENT",
      },
      {
        name: "Non-Profit",
        value: "NON_PROFIT",
      },
      {
        name: "Technology",
        value: "TECHNOLOGY",
      },
      {
        name: "Financial Services",
        value: "FINANCIAL_SERVICES",
      },
      {
        name: "Other",
        value: "OTHER",
      },
    ],
    default: "",
    routing: {
      send: {
        type: "body",
        property: "industry",
      },
    },
    description: "Client industry classification",
  },
  {
    displayName: "Company Size",
    name: "companySize",
    type: "options",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["create", "update"],
      },
    },
    options: [
      {
        name: "Small",
        value: "SMALL",
      },
      {
        name: "Medium",
        value: "MEDIUM",
      },
      {
        name: "Large",
        value: "LARGE",
      },
      {
        name: "Enterprise",
        value: "ENTERPRISE",
      },
    ],
    default: "",
    routing: {
      send: {
        type: "body",
        property: "companySize",
      },
    },
    description: "Company size classification",
  },
  {
    displayName: "Website",
    name: "website",
    type: "string",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "website",
      },
    },
    description: "Client website URL",
  },
  {
    displayName: "Primary Contact Name",
    name: "primaryContactName",
    type: "string",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "primaryContactName",
      },
    },
    description: "Primary contact name",
  },
  {
    displayName: "Primary Contact Email",
    name: "primaryContactEmail",
    type: "string",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "primaryContactEmail",
      },
    },
    description: "Primary contact email address",
  },
  {
    displayName: "Primary Contact Phone",
    name: "primaryContactPhone",
    type: "string",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "primaryContactPhone",
      },
    },
    description: "Primary contact phone number",
  },
  {
    displayName: "Address Line 1",
    name: "addressLine1",
    type: "string",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "addressLine1",
      },
    },
    description: "Address line 1",
  },
  {
    displayName: "Address Line 2",
    name: "addressLine2",
    type: "string",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "addressLine2",
      },
    },
    description: "Address line 2",
  },
  {
    displayName: "City",
    name: "city",
    type: "string",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "city",
      },
    },
    description: "City",
  },
  {
    displayName: "State",
    name: "state",
    type: "string",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "state",
      },
    },
    description: "State/Province",
  },
  {
    displayName: "Country",
    name: "country",
    type: "string",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "country",
      },
    },
    description: "Country",
  },
  {
    displayName: "Client Notes",
    name: "clientNotes",
    type: "string",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "notes",
      },
    },
    description: "Additional notes about the client",
  },
  {
    displayName: "Status",
    name: "clientStatus",
    type: "options",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["create", "update"],
      },
    },
    options: [
      { name: "Active", value: "active" },
      { name: "Inactive", value: "inactive" },
      { name: "Prospect", value: "prospect" },
    ],
    default: "active",
    routing: { send: { type: "body", property: "status" } },
    description: "Client status",
  },

  // Client list filters
  {
    displayName: "Page",
    name: "clientPage",
    type: "number",
    typeOptions: { minValue: 1 },
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["getAll"],
      },
    },
    default: 1,
    routing: { send: { type: "query", property: "page" } },
    description: "Page number for clients pagination",
  },
  {
    displayName: "Limit",
    name: "clientLimit",
    type: "number",
    typeOptions: { minValue: 1 },
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["getAll"],
      },
    },
    default: 20,
    routing: { send: { type: "query", property: "limit" } },
    description: "Number of clients per page",
  },
  {
    displayName: "Status",
    name: "clientStatusFilter",
    type: "options",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["getAll"],
      },
    },
    options: [
      { name: "Active", value: "active" },
      { name: "Inactive", value: "inactive" },
      { name: "Prospect", value: "prospect" },
    ],
    default: "",
    routing: { send: { type: "query", property: "status" } },
    description: "Filter by client status",
  },
  {
    displayName: "Industry",
    name: "clientIndustryFilter",
    type: "options",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["getAll"],
      },
    },
    options: [
      { name: "Residential Developer", value: "RESIDENTIAL_DEVELOPER" },
      { name: "Commercial Real Estate", value: "COMMERCIAL_REAL_ESTATE" },
      { name: "Healthcare", value: "HEALTHCARE" },
      { name: "Education", value: "EDUCATION" },
      { name: "Hospitality", value: "HOSPITALITY" },
      { name: "Retail", value: "RETAIL" },
      { name: "Industrial Manufacturing", value: "INDUSTRIAL_MANUFACTURING" },
      { name: "Government", value: "GOVERNMENT" },
      { name: "Non-Profit", value: "NON_PROFIT" },
      { name: "Technology", value: "TECHNOLOGY" },
      { name: "Financial Services", value: "FINANCIAL_SERVICES" },
      { name: "Other", value: "OTHER" },
    ],
    default: "",
    routing: { send: { type: "query", property: "industry" } },
    description: "Filter by industry type",
  },
  {
    displayName: "Search",
    name: "clientSearch",
    type: "string",
    displayOptions: {
      show: {
        resource: ["client"],
        operation: ["getAll"],
      },
    },
    default: "",
    routing: { send: { type: "query", property: "search" } },
    description: "Search in client name and primary contact",
  },

  // Employee Create/Update Fields
  {
    displayName: "Employee ID",
    name: "employeeId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["delete", "update", "get", "deactivate", "getHistory"],
      },
    },
    default: "",
    required: true,
    description: "Employee UUID (required for delete/update operations)",
  },
  {
    displayName: "Limit",
    name: "employeeHistoryLimit",
    type: "number",
    typeOptions: { minValue: 1 },
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["getHistory"],
      },
    },
    default: 50,
    routing: { send: { type: "query", property: "limit" } },
    description: "Number of history entries to return",
  },
  {
    displayName: "Since",
    name: "employeeHistorySince",
    type: "dateTime",
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["getHistory"],
      },
    },
    default: "",
    routing: { send: { type: "query", property: "since" } },
    description: "Show events since this timestamp",
  },
  {
    displayName: "Until",
    name: "employeeHistoryUntil",
    type: "dateTime",
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["getHistory"],
      },
    },
    default: "",
    routing: { send: { type: "query", property: "until" } },
    description: "Show events until this timestamp",
  },
  {
    displayName: "Employee Name",
    name: "employeeName",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "name",
      },
    },
    description: "Employee full name (required)",
  },
  {
    displayName: "Employee Number",
    name: "employeeNumberField",
    type: "string",
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "employeeNumber",
      },
    },
    description: "Employee number (auto-generated if not provided)",
  },
  {
    displayName: "Email",
    name: "email",
    type: "string",
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "email",
      },
    },
    description: "Employee email address",
  },
  {
    displayName: "Status",
    name: "employeeStatus",
    type: "options",
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["create", "update"],
      },
    },
    options: [
      {
        name: "Active",
        value: "ACTIVE",
      },
      {
        name: "Inactive",
        value: "INACTIVE",
      },
    ],
    default: "ACTIVE",
    routing: {
      send: {
        type: "body",
        property: "status",
      },
    },
    description: "Employee status",
  },
  {
    displayName: "Is Project Manager",
    name: "isProjectManager",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["create", "update"],
      },
    },
    default: false,
    routing: {
      send: {
        type: "body",
        property: "isProjectManager",
      },
    },
    description: "Whether employee can serve as Project Manager",
  },
  {
    displayName: "Is Principal",
    name: "isPrincipal",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["create", "update"],
      },
    },
    default: false,
    routing: {
      send: {
        type: "body",
        property: "isPrincipal",
      },
    },
    description: "Whether employee can serve as Principal in Charge",
  },
  {
    displayName: "Is Marketing",
    name: "isMarketing",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["create", "update"],
      },
    },
    default: false,
    routing: {
      send: {
        type: "body",
        property: "isMarketing",
      },
    },
    description: "Whether employee can serve as Marketing Contact",
  },
  {
    displayName: "Primary Discipline ID",
    name: "employeePrimaryDisciplineId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "primaryDisciplineId",
      },
    },
    description: "Primary discipline UUID for the employee",
  },

  // Employee list filters
  {
    displayName: "Page",
    name: "employeePage",
    type: "number",
    typeOptions: { minValue: 1 },
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["getAll"],
      },
    },
    default: 1,
    routing: { send: { type: "query", property: "page" } },
    description: "Page number for employees",
  },
  {
    displayName: "Limit",
    name: "employeeLimit",
    type: "number",
    typeOptions: { minValue: 1 },
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["getAll"],
      },
    },
    default: 20,
    routing: { send: { type: "query", property: "limit" } },
    description: "Number of employees per page",
  },
  {
    displayName: "Status",
    name: "employeeStatusFilter",
    type: "string",
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["getAll"],
      },
    },
    default: "",
    routing: { send: { type: "query", property: "status" } },
    description: "Filter by employee status",
  },
  {
    displayName: "Search",
    name: "employeeSearch",
    type: "string",
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["getAll"],
      },
    },
    default: "",
    routing: { send: { type: "query", property: "search" } },
    description: "Search in employee name and email",
  },
  {
    displayName: "Primary Discipline ID",
    name: "employeeDisciplineIdFilter",
    type: "string",
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["getAll"],
      },
    },
    default: "",
    routing: { send: { type: "query", property: "disciplineId" } },
    description: "Filter by primary discipline ID",
  },
  {
    displayName: "Is Project Manager",
    name: "isProjectManagerFilter",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["getAll"],
      },
    },
    default: false,
    routing: { send: { type: "query", property: "isProjectManager" } },
    description: "Filter by project manager capability",
  },
  {
    displayName: "Is Principal",
    name: "isPrincipalFilter",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["getAll"],
      },
    },
    default: false,
    routing: { send: { type: "query", property: "isPrincipal" } },
    description: "Filter by principal capability",
  },
  {
    displayName: "Is Marketing",
    name: "isMarketingFilter",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["getAll"],
      },
    },
    default: false,
    routing: { send: { type: "query", property: "isMarketing" } },
    description: "Filter by marketing capability",
  },

  // Employee capabilities endpoint filters
  {
    displayName: "Page",
    name: "employeeCapabilitiesPage",
    type: "number",
    typeOptions: { minValue: 1 },
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["getCapabilities"],
      },
    },
    default: 1,
    routing: { send: { type: "query", property: "page" } },
    description: "Page number",
  },
  {
    displayName: "Limit",
    name: "employeeCapabilitiesLimit",
    type: "number",
    typeOptions: { minValue: 1 },
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["getCapabilities"],
      },
    },
    default: 20,
    routing: { send: { type: "query", property: "limit" } },
    description: "Page size",
  },
  {
    displayName: "Can Be Project Manager",
    name: "canBeProjectManager",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["getCapabilities"],
      },
    },
    default: false,
    routing: { send: { type: "query", property: "canBeProjectManager" } },
    description: "Filter employees who can be project managers",
  },
  {
    displayName: "Can Be Principal",
    name: "canBePrincipal",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["getCapabilities"],
      },
    },
    default: false,
    routing: { send: { type: "query", property: "canBePrincipal" } },
    description: "Filter employees who can be principals",
  },
  {
    displayName: "Can Be Marketing",
    name: "canBeMarketing",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["getCapabilities"],
      },
    },
    default: false,
    routing: { send: { type: "query", property: "canBeMarketing" } },
    description: "Filter employees who can handle marketing",
  },
  {
    displayName: "Status",
    name: "employeeCapabilitiesStatus",
    type: "string",
    displayOptions: {
      show: {
        resource: ["employee"],
        operation: ["getCapabilities"],
      },
    },
    default: "",
    routing: { send: { type: "query", property: "status" } },
    description: "Filter by employee status",
  },

  // Discipline ID field for delete/update operations
  {
    displayName: "Discipline ID",
    name: "disciplineId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["discipline"],
        operation: ["delete", "update", "get"],
      },
    },
    default: "",
    required: true,
    description: "Discipline UUID (required for delete/update operations)",
  },

  // Discipline Create/Update Fields
  {
    displayName: "Discipline Name",
    name: "disciplineName",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["discipline"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "name",
      },
    },
    description: "Discipline name (required)",
  },
  {
    displayName: "Description",
    name: "disciplineDescription",
    type: "string",
    displayOptions: {
      show: {
        resource: ["discipline"],
        operation: ["create", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "description",
      },
    },
    description: "Discipline description (optional)",
  },

  // Project List Filters (for Get Many operation)
  {
    displayName: "Project Number",
    name: "projectNumber",
    type: "string",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getAll"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "query",
        property: "projectNumber",
      },
    },
    description: "Filter by exact project number (e.g., P0123)",
  },
  // Team fields
  {
    displayName: "Project ID",
    name: "projectId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["team"],
        operation: ["getAll", "create", "delete"],
      },
    },
    default: "",
    description: "Project UUID (path parameter)",
  },
  {
    displayName: "Member ID",
    name: "memberId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["team"],
        operation: ["delete"],
      },
    },
    default: "",
    description: "Team member UUID to remove",
  },
  {
    displayName: "Employee ID",
    name: "employeeId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["team"],
        operation: ["create"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "employeeId",
      },
    },
    description: "Employee UUID to add to the project team",
  },
  {
    displayName: "Role",
    name: "role",
    type: "string",
    displayOptions: {
      show: {
        resource: ["team"],
        operation: ["create"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "role",
      },
    },
    description: "Role of the team member",
  },
  {
    displayName: "Project Name Filter",
    name: "nameFilter",
    type: "string",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getAll"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "query",
        property: "name",
      },
    },
    description: "Filter by project name (case-insensitive substring match)",
  },
  {
    displayName: "Client Number",
    name: "clientNumber",
    type: "string",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getAll"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "query",
        property: "clientNumber",
      },
    },
    description: "Filter by exact client number (e.g., C1234)",
  },
  {
    displayName: "Client Name",
    name: "clientName",
    type: "string",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getAll"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "query",
        property: "clientName",
      },
    },
    description: "Filter by client name (case-insensitive substring match)",
  },
  {
    displayName: "Search",
    name: "search",
    type: "string",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getAll"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "query",
        property: "search",
      },
    },
    description:
      "Free-text search across project number, name, client number, and client name",
  },
  {
    displayName: "Status",
    name: "status",
    type: "options",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getAll"],
      },
    },
    options: [
      {
        name: "Active",
        value: 0,
      },
      {
        name: "On Hold",
        value: 1,
      },
      {
        name: "Completed",
        value: 2,
      },
      {
        name: "Cancelled",
        value: 3,
      },
    ],
    default: "",
    routing: {
      send: {
        type: "query",
        property: "status",
        value: '={{ $parameter.status !== "" ? $parameter.status : undefined }}',
      },
    },
    description: "Filter by project status (optional)",
  },
  {
    displayName: "Client ID",
    name: "clientId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getAll"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "query",
        property: "clientId",
      },
    },
    description: "Filter by client UUID",
  },
  {
    displayName: "Project Manager ID",
    name: "projectManagerId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getAll"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "query",
        property: "projectManagerId",
      },
    },
    description: "Filter by project manager UUID",
  },
  {
    displayName: "View",
    name: "view",
    type: "options",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getAll"],
      },
    },
    options: [
      {
        name: "Simple",
        value: "simple",
      },
      {
        name: "Detailed (includes phases, tasks, and team)",
        value: "detailed",
      },
    ],
    default: "simple",
    routing: {
      send: {
        type: "query",
        property: "view",
      },
    },
    description:
      "Choose view type - detailed automatically includes phases, tasks, and team",
  },
  {
    displayName: "Include",
    name: "include",
    type: "multiOptions",
    displayOptions: {
      show: {
        resource: ["project"],
        operation: ["getAll"],
      },
    },
    options: [
      {
        name: "Phases",
        value: "phases",
      },
      {
        name: "Phases with Tasks",
        value: "phases.tasks",
      },
      {
        name: "Team",
        value: "team",
      },
    ],
    default: [],
    routing: {
      send: {
        type: "query",
        property: "include",
        value:
          '={{ $parameter.include.length > 0 ? $parameter.include.join(",") : undefined }}',
      },
    },
    description:
      "Granular control over what additional data to include (alternative to view=detailed)",
  },
];
