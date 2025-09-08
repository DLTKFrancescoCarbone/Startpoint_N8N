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
        operation: ["delete", "get", "update"],
      },
    },
    default: "",
    routing: {
      send: {
        type: "query",
        property: "projectId",
      },
    },
    description: "The ID of the project",
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
      },
    },
    description: "Filter by project status",
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
