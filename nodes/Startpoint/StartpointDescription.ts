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

// Project operation fields
const projectFields: INodeProperties[] = [
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'UUID of the project',
	},
	{
		displayName: 'Include Related Data',
		name: 'include',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['getAll', 'get'],
			},
		},
		default: '',
		placeholder: 'client,primaryDiscipline,projectManager',
		description: 'Comma-separated list of related data to include',
	},
	{
		displayName: 'Project Name',
		name: 'name',
		type: 'string',
		required: true,
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
				property: 'name',
			},
		},
		description: 'Name of the project',
	},
	{
		displayName: 'Project Number',
		name: 'projectNumber',
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
				property: 'projectNumber',
			},
		},
		description: 'Project number (auto-generated if not provided)',
	},
	{
		displayName: 'Description',
		name: 'description',
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
				property: 'description',
			},
		},
		description: 'Project description',
	},
	{
		displayName: 'Client ID',
		name: 'clientId',
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
				property: 'clientId',
			},
		},
		description: 'UUID of the client',
	},
	{
		displayName: 'Client Number',
		name: 'clientNumber',
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
				property: 'clientNumber',
			},
		},
		description: 'Alternative to Client ID - lookup client by number',
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		options: [
			{
				name: 'Active',
				value: 'ACTIVE',
			},
			{
				name: 'Inactive',
				value: 'INACTIVE',
			},
		],
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['create', 'update'],
			},
		},
		default: 'ACTIVE',
		routing: {
			send: {
				type: 'body',
				property: 'status',
			},
		},
		description: 'Project status',
	},
	{
		displayName: 'Project Type',
		name: 'projectType',
		type: 'options',
		options: [
			{
				name: 'Commercial Fit Out',
				value: 'COMMERCIAL_FIT_OUT',
			},
			{
				name: 'Commercial New Build',
				value: 'COMMERCIAL_NEW_BUILD',
			},
			{
				name: 'Large Renovation',
				value: 'LARGE_RENOVATION',
			},
			{
				name: 'New Construction',
				value: 'NEW_CONSTRUCTION',
			},
			{
				name: 'Other',
				value: 'OTHER',
			},
			{
				name: 'Small Renovation',
				value: 'SMALL_RENOVATION',
			},
		],
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['create', 'update'],
			},
		},
		default: 'NEW_CONSTRUCTION',
		routing: {
			send: {
				type: 'body',
				property: 'projectType',
			},
		},
		description: 'Type of project',
	},
	{
		displayName: 'Invoice Format',
		name: 'invoiceFormat',
		type: 'options',
		options: [
			{
				name: 'Cost Plus Fixed Fee',
				value: 'COST_PLUS_FIXED_FEE',
			},
			{
				name: 'Cost Plus Percentage',
				value: 'COST_PLUS_PERCENTAGE',
			},
			{
				name: 'Fixed Fee',
				value: 'FIXED_FEE',
			},
			{
				name: 'Other',
				value: 'OTHER',
			},
			{
				name: 'Time and Materials',
				value: 'TIME_AND_MATERIALS',
			},
			{
				name: 'Unit Price',
				value: 'UNIT_PRICE',
			},
		],
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['create', 'update'],
			},
		},
		default: 'TIME_AND_MATERIALS',
		routing: {
			send: {
				type: 'body',
				property: 'invoiceFormat',
			},
		},
		description: 'Invoice format type',
	},
	{
		displayName: 'Total Contract Amount',
		name: 'totalContractAmount',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['create', 'update'],
			},
		},
		default: 0,
		routing: {
			send: {
				type: 'body',
				property: 'totalContractAmount',
			},
		},

	},
	{
		displayName: 'Estimated Start Date',
		name: 'estimatedStartDate',
		type: 'dateTime',
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
				property: 'estimatedStartDate',
			},
		},
		description: 'Estimated project start date',
	},
	{
		displayName: 'Estimated End Date',
		name: 'estimatedEndDate',
		type: 'dateTime',
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
				property: 'estimatedEndDate',
			},
		},
		description: 'Estimated project end date',
	},
	{
		displayName: 'Location',
		name: 'location',
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
				property: 'location',
			},
		},
		description: 'Project location',
	},
	{
		displayName: 'Notes',
		name: 'notes',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
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
				property: 'notes',
			},
		},
		description: 'Project notes',
	},
];

// Client operation fields
const clientFields: INodeProperties[] = [
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['client'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'UUID of the client',
	},
	{
		displayName: 'Client Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['client'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
		description: 'Client company name',
	},
	{
		displayName: 'Client Number',
		name: 'clientNumber',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['client'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'clientNumber',
			},
		},
		description: 'Client number (auto-generated if not provided)',
	},
	{
		displayName: 'Industry',
		name: 'industry',
		type: 'options',
		options: [
			{
				name: 'Commercial Real Estate',
				value: 'COMMERCIAL_REAL_ESTATE',
			},
			{
				name: 'Education',
				value: 'EDUCATION',
			},
			{
				name: 'Financial Services',
				value: 'FINANCIAL_SERVICES',
			},
			{
				name: 'Government',
				value: 'GOVERNMENT',
			},
			{
				name: 'Healthcare',
				value: 'HEALTHCARE',
			},
			{
				name: 'Hospitality',
				value: 'HOSPITALITY',
			},
			{
				name: 'Industrial Manufacturing',
				value: 'INDUSTRIAL_MANUFACTURING',
			},
			{
				name: 'Non Profit',
				value: 'NON_PROFIT',
			},
			{
				name: 'Other',
				value: 'OTHER',
			},
			{
				name: 'Residential Developer',
				value: 'RESIDENTIAL_DEVELOPER',
			},
			{
				name: 'Retail',
				value: 'RETAIL',
			},
			{
				name: 'Technology',
				value: 'TECHNOLOGY',
			},
		],
		displayOptions: {
			show: {
				resource: ['client'],
				operation: ['create', 'update'],
			},
		},
		default: 'COMMERCIAL_REAL_ESTATE',
		routing: {
			send: {
				type: 'body',
				property: 'industry',
			},
		},
		description: 'Client industry',
	},
	{
		displayName: 'Company Size',
		name: 'companySize',
		type: 'options',
		options: [
			{
				name: 'Small',
				value: 'SMALL',
			},
			{
				name: 'Medium',
				value: 'MEDIUM',
			},
			{
				name: 'Large',
				value: 'LARGE',
			},
			{
				name: 'Enterprise',
				value: 'ENTERPRISE',
			},
		],
		displayOptions: {
			show: {
				resource: ['client'],
				operation: ['create', 'update'],
			},
		},
		default: 'MEDIUM',
		routing: {
			send: {
				type: 'body',
				property: 'companySize',
			},
		},
		description: 'Company size classification',
	},
	{
		displayName: 'Primary Contact Name',
		name: 'primaryContactName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['client'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'primaryContactName',
			},
		},

	},
	{
		displayName: 'Primary Contact Email',
		name: 'primaryContactEmail',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['client'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'primaryContactEmail',
			},
		},
		description: 'Primary contact email address',
	},
	{
		displayName: 'Website',
		name: 'website',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['client'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'website',
			},
		},
		description: 'Client website URL',
	},
	{
		displayName: 'Address Line 1',
		name: 'addressLine1',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['client'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'addressLine1',
			},
		},
		description: 'Primary address line',
	},
	{
		displayName: 'City',
		name: 'city',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['client'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'city',
			},
		},

	},
	{
		displayName: 'State',
		name: 'state',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['client'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'state',
			},
		},
		description: 'State or province',
	},
	{
		displayName: 'Country',
		name: 'country',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['client'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'country',
			},
		},

	},
];

// Employee operation fields
const employeeFields: INodeProperties[] = [
	{
		displayName: 'Employee ID',
		name: 'employeeId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['employee'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'UUID of the employee',
	},
	{
		displayName: 'Employee Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['employee'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
		description: 'Employee full name',
	},
	{
		displayName: 'Employee Number',
		name: 'employeeNumber',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['employee'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'employeeNumber',
			},
		},
		description: 'Auto-generated alphanumeric employee number',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		displayOptions: {
			show: {
				resource: ['employee'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'email',
			},
		},
		description: 'Employee email address',
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		options: [
			{
				name: 'Active',
				value: 'ACTIVE',
			},
			{
				name: 'Inactive',
				value: 'INACTIVE',
			},
		],
		displayOptions: {
			show: {
				resource: ['employee'],
				operation: ['create', 'update'],
			},
		},
		default: 'ACTIVE',
		routing: {
			send: {
				type: 'body',
				property: 'status',
			},
		},
		description: 'Employee status',
	},
	{
		displayName: 'Is Project Manager',
		name: 'isProjectManager',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['employee'],
				operation: ['create', 'update'],
			},
		},
		default: false,
		routing: {
			send: {
				type: 'body',
				property: 'isProjectManager',
			},
		},
		description: 'Whether employee can serve as Project Manager',
	},
	{
		displayName: 'Is Principal',
		name: 'isPrincipal',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['employee'],
				operation: ['create', 'update'],
			},
		},
		default: false,
		routing: {
			send: {
				type: 'body',
				property: 'isPrincipal',
			},
		},
		description: 'Whether employee can serve as Principal in Charge',
	},
	{
		displayName: 'Is Marketing',
		name: 'isMarketing',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['employee'],
				operation: ['create', 'update'],
			},
		},
		default: false,
		routing: {
			send: {
				type: 'body',
				property: 'isMarketing',
			},
		},
		description: 'Whether employee can serve as Marketing Contact',
	},
	{
		displayName: 'Primary Discipline ID',
		name: 'primaryDisciplineId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['employee'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'primaryDisciplineId',
			},
		},
		description: 'UUID of the primary discipline',
	},
];

// Discipline operation fields
const disciplineFields: INodeProperties[] = [
	{
		displayName: 'Discipline ID',
		name: 'disciplineId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['discipline'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'UUID of the discipline',
	},
	{
		displayName: 'Discipline Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['discipline'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},

	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['discipline'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'description',
			},
		},
		description: 'Discipline description',
	},
];

// Phase operation fields
const phaseFields: INodeProperties[] = [
	{
		displayName: 'Phase ID',
		name: 'phaseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['phase'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'UUID of the phase',
	},
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['phase'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'projectId',
			},
		},
		description: 'UUID of the project this phase belongs to',
	},
	{
		displayName: 'Phase Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['phase'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},

	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['phase'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'description',
			},
		},
		description: 'Phase description',
	},
	{
		displayName: 'Display Order',
		name: 'displayOrder',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['phase'],
				operation: ['create', 'update'],
			},
		},
		default: 1,
		routing: {
			send: {
				type: 'body',
				property: 'displayOrder',
			},
		},
		description: 'Display order within project',
	},
	{
		displayName: 'Budget Allocation Percent',
		name: 'budgetAllocationPercent',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['phase'],
				operation: ['create', 'update'],
			},
		},
		default: 0,
		routing: {
			send: {
				type: 'body',
				property: 'budgetAllocationPercent',
			},
		},
		description: 'Budget allocation percentage',
	},
	{
		displayName: 'Estimated Hours',
		name: 'estimatedHours',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['phase'],
				operation: ['create', 'update'],
			},
		},
		default: 0,
		routing: {
			send: {
				type: 'body',
				property: 'estimatedHours',
			},
		},
		description: 'Estimated hours for phase',
	},
	{
		displayName: 'Phase Budget',
		name: 'phaseBudget',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['phase'],
				operation: ['create', 'update'],
			},
		},
		default: 0,
		routing: {
			send: {
				type: 'body',
				property: 'phaseBudget',
			},
		},
		description: 'Phase budget amount',
	},
	{
		displayName: 'Notes',
		name: 'notes',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
		displayOptions: {
			show: {
				resource: ['phase'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'notes',
			},
		},
		description: 'Phase notes',
	},
];

// Task operation fields
const taskFields: INodeProperties[] = [
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'UUID of the task',
	},
	{
		displayName: 'Phase ID',
		name: 'phaseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'phaseId',
			},
		},
		description: 'UUID of the phase this task belongs to',
	},
	{
		displayName: 'Task Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},

	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'description',
			},
		},
		description: 'Task description',
	},
	{
		displayName: 'Display Order',
		name: 'displayOrder',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create', 'update'],
			},
		},
		default: 1,
		routing: {
			send: {
				type: 'body',
				property: 'displayOrder',
			},
		},
		description: 'Display order within phase',
	},
	{
		displayName: 'Estimated Hours',
		name: 'estimatedHours',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create', 'update'],
			},
		},
		default: 0,
		routing: {
			send: {
				type: 'body',
				property: 'estimatedHours',
			},
		},
		description: 'Estimated hours for task',
	},
	{
		displayName: 'Task Budget',
		name: 'taskBudget',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create', 'update'],
			},
		},
		default: 0,
		routing: {
			send: {
				type: 'body',
				property: 'taskBudget',
			},
		},
		description: 'Task budget amount',
	},
	{
		displayName: 'Notes',
		name: 'notes',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'notes',
			},
		},
		description: 'Task notes',
	},
];

export const startpointFields: INodeProperties[] = [
	...projectFields,
	...clientFields,
	...employeeFields,
	...disciplineFields,
	...phaseFields,
	...taskFields,
];
