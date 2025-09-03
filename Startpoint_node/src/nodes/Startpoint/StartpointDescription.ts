import { INodeProperties } from 'n8n-workflow';

// Resource operations - dynamically shown based on selected resource
export const startpointOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['project'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new project',
				action: 'Create a project',
				routing: {
					request: {
						method: 'POST',
						url: '/api/projects',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a project',
				action: 'Delete a project',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/projects/{{$parameter["projectId"]}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a project by ID',
				action: 'Get a project',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/projects/{{$parameter["projectId"]}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many projects',
				action: 'Get many projects',
				routing: {
					request: {
						method: 'GET',
						url: '/api/projects',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a project',
				action: 'Update a project',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/projects/{{$parameter["projectId"]}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['client'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new client',
				action: 'Create a client',
				routing: {
					request: {
						method: 'POST',
						url: '/api/clients',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a client',
				action: 'Delete a client',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/clients/{{$parameter["clientId"]}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a client by ID',
				action: 'Get a client',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/clients/{{$parameter["clientId"]}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many clients',
				action: 'Get many clients',
				routing: {
					request: {
						method: 'GET',
						url: '/api/clients',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a client',
				action: 'Update a client',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/clients/{{$parameter["clientId"]}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['employee'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new employee',
				action: 'Create an employee',
				routing: {
					request: {
						method: 'POST',
						url: '/api/employees',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an employee',
				action: 'Delete an employee',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/employees/{{$parameter["employeeId"]}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an employee by ID',
				action: 'Get an employee',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/employees/{{$parameter["employeeId"]}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many employees',
				action: 'Get many employees',
				routing: {
					request: {
						method: 'GET',
						url: '/api/employees',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an employee',
				action: 'Update an employee',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/employees/{{$parameter["employeeId"]}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['phase'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new phase',
				action: 'Create a phase',
				routing: {
					request: {
						method: 'POST',
						url: '/api/phases',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a phase',
				action: 'Delete a phase',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/phases/{{$parameter["phaseId"]}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a phase by ID',
				action: 'Get a phase',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/phases/{{$parameter["phaseId"]}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many phases',
				action: 'Get many phases',
				routing: {
					request: {
						method: 'GET',
						url: '/api/phases',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a phase',
				action: 'Update a phase',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/phases/{{$parameter["phaseId"]}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['task'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new task',
				action: 'Create a task',
				routing: {
					request: {
						method: 'POST',
						url: '/api/tasks',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a task',
				action: 'Delete a task',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/tasks/{{$parameter["taskId"]}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a task by ID',
				action: 'Get a task',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/tasks/{{$parameter["taskId"]}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many tasks',
				action: 'Get many tasks',
				routing: {
					request: {
						method: 'GET',
						url: '/api/tasks',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a task',
				action: 'Update a task',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/tasks/{{$parameter["taskId"]}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['discipline'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new discipline',
				action: 'Create a discipline',
				routing: {
					request: {
						method: 'POST',
						url: '/api/disciplines',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a discipline',
				action: 'Delete a discipline',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/disciplines/{{$parameter["disciplineId"]}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a discipline by ID',
				action: 'Get a discipline',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/disciplines/{{$parameter["disciplineId"]}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many disciplines',
				action: 'Get many disciplines',
				routing: {
					request: {
						method: 'GET',
						url: '/api/disciplines',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a discipline',
				action: 'Update a discipline',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/disciplines/{{$parameter["disciplineId"]}}',
					},
				},
			},
		],
		default: 'getAll',
	},
];

// Resource fields - define field behaviors and routing
export const startpointFields: INodeProperties[] = [
	// Project fields
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['delete', 'get', 'update'],
			},
		},
		default: '',
	routing: {
		send: {
			type: 'query',
			property: 'projectId',
		},
	},
		description: 'The ID of the project',
	},
	{
		displayName: 'Project Name',
		name: 'projectName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'projectName',
			},
		},
		description: 'Name of the project',
	},
	// ... truncated for brevity, rest of the fields remain unchanged ...
];
