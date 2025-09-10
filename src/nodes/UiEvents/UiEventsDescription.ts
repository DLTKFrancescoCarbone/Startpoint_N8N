import { INodeProperties } from 'n8n-workflow';

// Common fields used by most operations
const commonMetaFields: INodeProperties[] = [
  {
    displayName: 'Widget ID',
    name: 'widgetId',
    type: 'string',
    default: 'left',
    required: true,
    description: 'Target widget ID (e.g., left, center, right or any ID)',
  },
  {
    displayName: 'Agent Name',
    name: 'agentName',
    type: 'string',
    default: 'ui-events-n8n',
    required: true,
  },
  {
    displayName: 'Run ID',
    name: 'runId',
    type: 'string',
    default: '={{$execution.id || $workflow.id || $now}}',
    required: true,
  },
  {
    displayName: 'Timestamp',
    name: 'ts',
    type: 'string',
    default: '={{$now}}',
    description: 'ISO timestamp; defaults to now',
  },
];

// Helper to build the base WidgetUpdate body expression
const baseEventExpr = `({
  type: 'WidgetUpdate',
  version: '1.0',
  widgetId: $parameter.widgetId,
  ops: [],
  agent: { name: $parameter.agentName, runId: $parameter.runId },
  ts: $parameter.ts,
})`;

// Simplified chart body builder - avoids complex JavaScript, uses direct JSON parsing
const simpleChartBody = (chartType: 'LineChart' | 'BarChart') =>
  `={{
    JSON.stringify({
      type: 'WidgetUpdate',
      version: '1.0',
      widgetId: $parameter.widgetId,
      ops: [
        ...(($parameter.headline) ? [{ type: 'setHeadline', value: $parameter.headline }] : []),
        ...(($parameter.severity) ? [{ type: 'setSeverity', value: $parameter.severity }] : []),
        ...(($parameter.note) ? [{ type: 'setNote', value: $parameter.note }] : []),
        {
          type: 'setComponent',
          value: {
            lib: 'recharts',
            type: '${chartType}',
            height: $parameter.height || 300,
            data: JSON.parse($parameter.data || '[]'),
            xKey: $parameter.xKey || 'name',
            yKeys: ($parameter.yKeys?.series || []).map(s => typeof s === 'string' ? s : ({ key: s.key, color: s.color || undefined }))
          }
        }
      ],
      agent: {
        name: $parameter.agentName,
        runId: $parameter.runId
      },
      ts: $parameter.ts || new Date().toISOString()
    })
  }}}`;

const simpleShadcnBody = (type: string, propsExpr: string) =>
  `={{
    JSON.stringify({
      type: 'WidgetUpdate',
      version: '1.0',
      widgetId: $parameter.widgetId,
      ops: [{
        type: 'setComponent',
        value: {
          lib: 'shadcn',
          type: '${type}',
          props: ${propsExpr}
        }
      }],
      agent: {
        name: $parameter.agentName,
        runId: $parameter.runId
      },
      ts: $parameter.ts || new Date().toISOString()
    })
  }}}`;

const simpleWidgetStateBody = (opType: string, valueExpr: string) =>
  `={{
    JSON.stringify({
      type: 'WidgetUpdate',
      version: '1.0',
      widgetId: $parameter.widgetId,
      ops: [{
        type: '${opType}',
        value: ${valueExpr}
      }],
      agent: {
        name: $parameter.agentName,
        runId: $parameter.runId
      },
      ts: $parameter.ts || new Date().toISOString()
    })
  }}}`;

// Legacy complex builders (to be replaced gradually)
const shadcnBody = (type: string, propsExpr: string) =>
  simpleShadcnBody(type, propsExpr);

// Widget State operations
const widgetStateOperation: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['widgetState'] } },
  options: [
    { name: 'Set Headline (API)', value: 'set_headline_api', action: 'Set widget headline via dedicated API', routing: { request: { method: 'POST', url: '=/api/widgets/{{$parameter.widgetId}}/headline' } } },
    { name: 'Set Headline (Publish)', value: 'set_headline', action: 'Set widget headline via /publish', routing: { request: { method: 'POST', url: '/publish', body: simpleWidgetStateBody('setHeadline', '$parameter.headline || ""') } } },
    { name: 'Set Severity', value: 'set_severity', action: 'Set widget severity', routing: { request: { method: 'POST', url: '/publish', body: `={{(e => { e.ops.push({ type: 'setSeverity', value: $parameter.severity }); return e; })(${baseEventExpr})}}` } } },
    { name: 'Set Badge', value: 'set_badge', action: 'Set widget badge', routing: { request: { method: 'POST', url: '/publish', body: `={{(e => { e.ops.push({ type: 'setBadge', value: $parameter.badge?.properties }); return e; })(${baseEventExpr})}}` } } },
    { name: 'Set Note', value: 'set_note', action: 'Set widget note', routing: { request: { method: 'POST', url: '/publish', body: `={{(e => { e.ops.push({ type: 'setNote', value: $parameter.note }); return e; })(${baseEventExpr})}}` } } },
    { name: 'Set CTA', value: 'set_cta', action: 'Set widget CTA', routing: { request: { method: 'POST', url: '/publish', body: `={{(e => { e.ops.push({ type: 'setCta', value: $parameter.cta?.properties }); return e; })(${baseEventExpr})}}` } } },
    { name: 'Update Data', value: 'update_data', action: 'Replace widget data blob', routing: { request: { method: 'POST', url: '/publish', body: `={{(e => { e.ops.push({ type: 'updateData', value: (typeof $parameter.data === 'string' ? (() => { try { return JSON.parse($parameter.data); } catch(e) { console.error('JSON Parse Error:', e, 'Data:', $parameter.data); return {}; } })() : $parameter.data) }); return e; })(${baseEventExpr})}}` } } },
  ],
  default: 'set_headline_api',
};

const widgetStateFields: INodeProperties[] = [
  // Common fields for widgetState
  ...commonMetaFields.map((f) => ({
    ...f,
    displayOptions: { show: { resource: ['widgetState'] } },
  })),

  // set_headline
  {
    displayName: 'Headline',
    name: 'headline',
    type: 'string',
    default: '',
    description: 'Text; empty clears visually',
    displayOptions: { show: { resource: ['widgetState'], operation: ['set_headline'] } },
  },

  // set_severity
  {
    displayName: 'Severity',
    name: 'severity',
    type: 'options',
    options: [
      { name: 'none', value: 'none' },
      { name: 'low', value: 'low' },
      { name: 'medium', value: 'medium' },
      { name: 'high', value: 'high' },
      { name: 'critical', value: 'critical' },
    ],
    default: 'none',
    required: true,
    displayOptions: { show: { resource: ['widgetState'], operation: ['set_severity'] } },
    
  },

  // set_badge
  {
    displayName: 'Badge',
    name: 'badge',
    type: 'fixedCollection',
    typeOptions: { multipleValues: false },
    default: {},
    options: [
      {
        name: 'properties',
        displayName: 'Properties',
        values: [
          { displayName: 'Type', name: 'type', type: 'string', default: 'info' },
          { displayName: 'Count', name: 'count', type: 'number', default: 0 },
          { displayName: 'Text', name: 'text', type: 'string', default: '' },
        ],
      },
    ],
    displayOptions: { show: { resource: ['widgetState'], operation: ['set_badge'] } },
    
  },

  // clear_badge
  {
    displayName: 'Confirm',
    name: 'confirmClearBadge',
    type: 'boolean',
    default: true,
    displayOptions: { show: { resource: ['widgetState'], operation: ['clear_badge'] } },
    
  },

  // set_note
  {
    displayName: 'Note',
    name: 'note',
    type: 'string',
    default: '',
    displayOptions: { show: { resource: ['widgetState'], operation: ['set_note'] } },
    
  },

  // clear_note
  {
    displayName: 'Confirm',
    name: 'confirmClearNote',
    type: 'boolean',
    default: true,
    displayOptions: { show: { resource: ['widgetState'], operation: ['clear_note'] } },
    
  },

  // set_cta
  {
    displayName: 'CTA',
    name: 'cta',
    type: 'fixedCollection',
    typeOptions: { multipleValues: false },
    default: {},
    options: [
      {
        name: 'properties',
        displayName: 'Properties',
        values: [
          { displayName: 'Text', name: 'text', type: 'string', default: '' },
          { displayName: 'URL', name: 'url', type: 'string', default: '' },
        ],
      },
    ],
    displayOptions: { show: { resource: ['widgetState'], operation: ['set_cta'] } },
    
  },

  // clear_cta
  {
    displayName: 'Confirm',
    name: 'confirmClearCta',
    type: 'boolean',
    default: true,
    displayOptions: { show: { resource: ['widgetState'], operation: ['clear_cta'] } },
    
  },

  // update_data
  {
    displayName: 'Data (JSON)',
    name: 'data',
    type: 'json',
    default: {},
    typeOptions: { rows: 4 },
    displayOptions: { show: { resource: ['widgetState'], operation: ['update_data'] } },
    
  },

  // clear_component
  {
    displayName: 'Confirm',
    name: 'confirmClearComponent',
    type: 'boolean',
    default: true,
    displayOptions: { show: { resource: ['widgetState'], operation: ['clear_component'] } },
    
  },

  // set_widget_state (multi)
  { displayName: 'Headline', name: 'headline', type: 'string', default: '', description: 'Optional', displayOptions: { show: { resource: ['widgetState'], operation: ['set_widget_state'] } } },
  
  
  // set_headline_api fields - simple routing like Startpoint
  { displayName: 'Widget ID', name: 'widgetId', type: 'string', default: 'left', required: true, displayOptions: { show: { resource: ['widgetState'], operation: ['set_headline_api'] } }, description: 'Target widget ID (left, center, right, or custom)' },
  { displayName: 'Headline Text', name: 'text', type: 'string', default: '', required: true, displayOptions: { show: { resource: ['widgetState'], operation: ['set_headline_api'] } }, routing: { send: { type: 'body', property: 'text' } }, description: 'The headline text to display' },
  { displayName: 'Agent Name', name: 'agentName', type: 'string', default: 'n8n-api-agent', displayOptions: { show: { resource: ['widgetState'], operation: ['set_headline_api'] } }, routing: { send: { type: 'body', property: 'agentName' } }, description: 'Name of the agent setting this headline' },
  { displayName: 'Run ID', name: 'runId', type: 'string', default: '={{$execution.id}}', displayOptions: { show: { resource: ['widgetState'], operation: ['set_headline_api'] } }, routing: { send: { type: 'body', property: 'runId' } }, description: 'Unique run identifier' },
  {
    displayName: 'Severity',
    name: 'severity',
    type: 'options',
    options: [
      { name: '— none —', value: '' },
      { name: 'none', value: 'none' },
      { name: 'low', value: 'low' },
      { name: 'medium', value: 'medium' },
      { name: 'high', value: 'high' },
      { name: 'critical', value: 'critical' },
    ],
    default: '',
    displayOptions: { show: { resource: ['widgetState'], operation: ['set_widget_state'] } },
  },
  {
    displayName: 'Badge',
    name: 'badge',
    type: 'fixedCollection',
    typeOptions: { multipleValues: false },
    default: {},
    options: [
      {
        name: 'properties',
        displayName: 'Properties',
        values: [
          { displayName: 'Type', name: 'type', type: 'string', default: '' },
          { displayName: 'Count', name: 'count', type: 'number', default: 0 },
          { displayName: 'Text', name: 'text', type: 'string', default: '' },
        ],
      },
    ],
    description: 'Optional',
    displayOptions: { show: { resource: ['widgetState'], operation: ['set_widget_state'] } },
  },
  {
    displayName: 'Note',
    name: 'note',
    type: 'string',
    default: '',
    description: 'Optional',
    displayOptions: { show: { resource: ['widgetState'], operation: ['set_widget_state'] } },
  },
  {
    displayName: 'CTA',
    name: 'cta',
    type: 'fixedCollection',
    typeOptions: { multipleValues: false },
    default: {},
    options: [
      {
        name: 'properties',
        displayName: 'Properties',
        values: [
          { displayName: 'Text', name: 'text', type: 'string', default: '' },
          { displayName: 'URL', name: 'url', type: 'string', default: '' },
        ],
      },
    ],
    description: 'Optional',
    displayOptions: { show: { resource: ['widgetState'], operation: ['set_widget_state'] } },
  },
  // No explicit "apply" field; operation routing handles request
];

// Recharts operations
const rechartsOperation: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['recharts'] } },
  options: [
    { name: 'Set BarChart (API)', value: 'set_barchart_api', action: 'Create bar chart via dedicated API', routing: { request: { method: 'POST', url: '=/api/widgets/{{$parameter.widgetId}}/chart/bar' } } },
    { name: 'Set LineChart (API)', value: 'set_linechart_api', action: 'Create line chart via dedicated API', routing: { request: { method: 'POST', url: '=/api/widgets/{{$parameter.widgetId}}/chart/line' } } },
    { name: 'Set BarChart (Publish)', value: 'set_recharts_barchart', action: 'Mount BarChart via /publish', routing: { request: { method: 'POST', url: '/publish', body: simpleChartBody('BarChart') } } },
    { name: 'Set LineChart (Publish)', value: 'set_recharts_linechart', action: 'Mount LineChart via /publish', routing: { request: { method: 'POST', url: '/publish', body: simpleChartBody('LineChart') } } },
  ],
  default: 'set_barchart_api',
};

const seriesCollection: INodeProperties = {
  displayName: 'Series',
  name: 'yKeys',
  type: 'fixedCollection',
  typeOptions: { multipleValues: true },
  description: 'Series definitions',
  default: {},
  displayOptions: { show: { resource: ['recharts'], operation: ['set_recharts_linechart', 'set_recharts_barchart'] } },
  options: [
    {
      name: 'series',
      displayName: 'Series',
      values: [
        { displayName: 'Key', name: 'key', type: 'string', default: '' },
        { displayName: 'Color', name: 'color', type: 'string', default: '' },
      ],
    },
  ],
};

const rechartsCommonFields: INodeProperties[] = [
  ...commonMetaFields.map((f) => ({ ...f, displayOptions: { show: { resource: ['recharts'], operation: ['set_recharts_linechart', 'set_recharts_barchart'] } } })),
  { displayName: 'X Key', name: 'xKey', type: 'string', default: 'name', required: true, displayOptions: { show: { resource: ['recharts'], operation: ['set_recharts_linechart', 'set_recharts_barchart'] } } },
  seriesCollection,
  { displayName: 'Height', name: 'height', type: 'number', default: 300, displayOptions: { show: { resource: ['recharts'], operation: ['set_recharts_linechart', 'set_recharts_barchart'] } } },
  { displayName: 'Data (JSON array)', name: 'data', type: 'json', default: [], typeOptions: { rows: 4 }, displayOptions: { show: { resource: ['recharts'], operation: ['set_recharts_linechart', 'set_recharts_barchart'] } } },
  // Convenience: optional state fields
  { displayName: 'Headline', name: 'headline', type: 'string', default: '', displayOptions: { show: { resource: ['recharts'], operation: ['set_recharts_linechart', 'set_recharts_barchart'] } } },
  { displayName: 'Severity', name: 'severity', type: 'options', options: [
    { name: '— none —', value: '' }, { name: 'none', value: 'none' }, { name: 'low', value: 'low' }, { name: 'medium', value: 'medium' }, { name: 'high', value: 'high' }, { name: 'critical', value: 'critical' },
  ], default: '', displayOptions: { show: { resource: ['recharts'], operation: ['set_recharts_linechart', 'set_recharts_barchart'] } } },
  { displayName: 'Badge', name: 'badge', type: 'fixedCollection', typeOptions: { multipleValues: false }, default: {}, options: [{ name: 'properties', displayName: 'Properties', values: [
    { displayName: 'Type', name: 'type', type: 'string', default: '' },
    { displayName: 'Count', name: 'count', type: 'number', default: 0 },
    { displayName: 'Text', name: 'text', type: 'string', default: '' },
  ] }], displayOptions: { show: { resource: ['recharts'], operation: ['set_recharts_linechart', 'set_recharts_barchart'] } } },
  { displayName: 'Note', name: 'note', type: 'string', default: '', displayOptions: { show: { resource: ['recharts'], operation: ['set_recharts_linechart', 'set_recharts_barchart'] } } },
  { displayName: 'CTA', name: 'cta', type: 'fixedCollection', typeOptions: { multipleValues: false }, default: {}, options: [{ name: 'properties', displayName: 'Properties', values: [
    { displayName: 'Text', name: 'text', type: 'string', default: '' },
    { displayName: 'URL', name: 'url', type: 'string', default: '' },
  ] }], displayOptions: { show: { resource: ['recharts'], operation: ['set_recharts_linechart', 'set_recharts_barchart'] } } },
];


const rechartsFields: INodeProperties[] = [
  
  // API-based chart fields - simple form routing like Startpoint
  {
    displayName: 'Widget ID',
    name: 'widgetId',
    type: 'string',
    default: 'left',
    required: true,
    displayOptions: { show: { resource: ['recharts'], operation: ['set_barchart_api', 'set_linechart_api'] } },
    description: 'Target widget ID (left, center, right, or custom ID)'
  },
  {
    displayName: 'Chart Data',
    name: 'data',
    type: 'json',
    default: [],
    required: true,
    displayOptions: { show: { resource: ['recharts'], operation: ['set_barchart_api', 'set_linechart_api'] } },
    routing: { send: { type: 'body', property: 'data' } },
    description: 'Array of data objects. Example: [{"name": "Project A", "value": 1000}]'
  },
  {
    displayName: 'X Key',
    name: 'xKey',
    type: 'string',
    default: 'name',
    displayOptions: { show: { resource: ['recharts'], operation: ['set_barchart_api', 'set_linechart_api'] } },
    routing: { send: { type: 'body', property: 'xKey' } },
    description: 'Property name for X-axis values'
  },
  {
    displayName: 'Chart Height',
    name: 'height',
    type: 'number',
    default: 240,
    displayOptions: { show: { resource: ['recharts'], operation: ['set_barchart_api', 'set_linechart_api'] } },
    routing: { send: { type: 'body', property: 'height' } },
    description: 'Chart height in pixels'
  },
  {
    displayName: 'Agent Name',
    name: 'agentName',
    type: 'string',
    default: 'n8n-api-agent',
    displayOptions: { show: { resource: ['recharts'], operation: ['set_barchart_api', 'set_linechart_api'] } },
    routing: { send: { type: 'body', property: 'agentName' } },
    description: 'Name of the agent creating this chart'
  },
  {
    displayName: 'Run ID',
    name: 'runId',
    type: 'string',
    default: '={{$execution.id}}',
    displayOptions: { show: { resource: ['recharts'], operation: ['set_barchart_api', 'set_linechart_api'] } },
    routing: { send: { type: 'body', property: 'runId' } },
    description: 'Unique run identifier'
  }
];

// Shadcn components
const shadcnOperation: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['shadcn'] } },
  options: [
    { name: 'Set StatsCard (API)', value: 'set_statscard_api', action: 'Create stats card via dedicated API', routing: { request: { method: 'POST', url: '=/api/widgets/{{$parameter.widgetId}}/statscard' } } },
    { name: 'Set Alert (API)', value: 'set_alert_api', action: 'Create alert via dedicated API', routing: { request: { method: 'POST', url: '=/api/widgets/{{$parameter.widgetId}}/alert' } } },
    { name: 'Set Table (API)', value: 'set_table_api', action: 'Create table via dedicated API', routing: { request: { method: 'POST', url: '=/api/widgets/{{$parameter.widgetId}}/table' } } },
    { name: 'Clear Component', value: 'clear_component_api', action: 'Clear widget component via API', routing: { request: { method: 'DELETE', url: '=/api/widgets/{{$parameter.widgetId}}/component' } } },
    { name: 'Set StatsCard (Publish)', value: 'set_shadcn_statscard', action: 'Mount StatsCard via /publish', routing: { request: { method: 'POST', url: '/publish', body: shadcnBody('StatsCard', `({ title: $parameter.title, value: $parameter.value, change: $parameter.change, trend: $parameter.trend, icon: $parameter.icon, className: $parameter.className })`) } } },
    { name: 'Set Alert (Publish)', value: 'set_shadcn_alert', action: 'Mount Alert via /publish', routing: { request: { method: 'POST', url: '/publish', body: shadcnBody('Alert', `({ variant: $parameter.variant, title: $parameter.title, description: $parameter.description, className: $parameter.className })`) } } },
    { name: 'Set Table (Publish)', value: 'set_shadcn_table', action: 'Mount Table via /publish', routing: { request: { method: 'POST', url: '/publish', body: shadcnBody('Table', `({ headers: $parameter.headers, rows: $parameter.rows, className: $parameter.className })`) } } },
  ],
  default: 'set_statscard_api',
};

const shadcnCommon: INodeProperties[] = [
  ...commonMetaFields.map((f) => ({ ...f, displayOptions: { show: { resource: ['shadcn'] } } })),
];


const shadcnFields: INodeProperties[] = [
  // StatsCard
  { displayName: 'Title', name: 'title', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_statscard'] } } },
  { displayName: 'Value', name: 'value', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_statscard'] } } },
  { displayName: 'Change', name: 'change', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_statscard'] } } },
  { displayName: 'Trend', name: 'trend', type: 'options', options: [ { name: 'up', value: 'up' }, { name: 'down', value: 'down' }, { name: 'flat', value: 'flat' } ], default: 'flat', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_statscard'] } } },
  { displayName: 'Icon', name: 'icon', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_statscard'] } } },
  { displayName: 'Class Name', name: 'className', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_statscard'] } } },
  // Request defined on operation option

  // Metric
  { displayName: 'Label', name: 'label', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_metric'] } } },
  { displayName: 'Value', name: 'metricValue', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_metric'] } } },
  { displayName: 'Unit', name: 'unit', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_metric'] } } },
  { displayName: 'Variant', name: 'variant', type: 'options', options: [ { name: 'default', value: 'default' }, { name: 'success', value: 'success' }, { name: 'warning', value: 'warning' }, { name: 'danger', value: 'danger' } ], default: 'default', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_metric'] } } },
  { displayName: 'Class Name', name: 'className', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_metric'] } } },
  

  // KeyValueList
  { displayName: 'Headers', name: 'kvItems', type: 'fixedCollection', typeOptions: { multipleValues: true }, default: {}, options: [ { name: 'item', displayName: 'Item', values: [ { displayName: 'Key', name: 'key', type: 'string', default: '' }, { displayName: 'Value', name: 'value', type: 'string', default: '' } ] } ], displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_keyvaluelist'] } } },
  { displayName: 'Class Name', name: 'className', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_keyvaluelist'] } } },
  

  // Progress
  { displayName: 'Value', name: 'progressValue', type: 'number', default: 0, displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_progress'] } } },
  { displayName: 'Max', name: 'max', type: 'number', default: 100, displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_progress'] } } },
  { displayName: 'Class Name', name: 'className', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_progress'] } } },
  

  // Alert
  { displayName: 'Variant', name: 'variant', type: 'options', options: [ { name: 'default', value: 'default' }, { name: 'destructive', value: 'destructive' } ], default: 'default', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_alert'] } } },
  { displayName: 'Title', name: 'title', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_alert'] } } },
  { displayName: 'Description', name: 'description', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_alert'] } } },
  { displayName: 'Class Name', name: 'className', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_alert'] } } },
  

  // Badge
  { displayName: 'Variant', name: 'variant', type: 'options', options: [ { name: 'default', value: 'default' }, { name: 'secondary', value: 'secondary' }, { name: 'destructive', value: 'destructive' }, { name: 'outline', value: 'outline' } ], default: 'default', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_badge'] } } },
  { displayName: 'Text', name: 'text', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_badge'] } } },
  { displayName: 'Class Name', name: 'className', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_badge'] } } },
  

  // Button
  { displayName: 'Variant', name: 'variant', type: 'options', options: [ { name: 'default', value: 'default' }, { name: 'destructive', value: 'destructive' }, { name: 'outline', value: 'outline' }, { name: 'secondary', value: 'secondary' }, { name: 'ghost', value: 'ghost' }, { name: 'link', value: 'link' } ], default: 'default', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_button'] } } },
  { displayName: 'Size', name: 'size', type: 'options', options: [ { name: 'default', value: 'default' }, { name: 'sm', value: 'sm' }, { name: 'lg', value: 'lg' }, { name: 'icon', value: 'icon' } ], default: 'default', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_button'] } } },
  { displayName: 'Text', name: 'text', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_button'] } } },
  { displayName: 'On Click', name: 'onClick', type: 'string', default: '', description: 'Logged in demo', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_button'] } } },
  { displayName: 'Class Name', name: 'className', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_button'] } } },
  

  // Table
  { displayName: 'Headers', name: 'headers', type: 'json', default: [], description: 'JSON array of strings', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_table'] } } },
  { displayName: 'Rows', name: 'rows', type: 'json', default: [], description: 'JSON array of rows (string|number)[]', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_table'] } } },
  { displayName: 'Class Name', name: 'className', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_table'] } } },
  

  // Card
  { displayName: 'Title', name: 'title', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_card'] } } },
  { displayName: 'Description', name: 'description', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_card'] } } },
  { displayName: 'Content (JSON or string)', name: 'content', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_card'] } } },
  { displayName: 'Footer', name: 'footer', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_card'] } } },
  { displayName: 'Class Name', name: 'className', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_card'] } } },
  
  // API-based Shadcn component fields - simple routing like Startpoint
  // StatsCard API fields
  { displayName: 'Widget ID', name: 'widgetId', type: 'string', default: 'left', required: true, displayOptions: { show: { resource: ['shadcn'], operation: ['set_statscard_api'] } }, description: 'Target widget ID' },
  { displayName: 'Card Title', name: 'title', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_statscard_api'] } }, routing: { send: { type: 'body', property: 'title' } }, description: 'Stats card title' },
  { displayName: 'Card Value', name: 'value', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_statscard_api'] } }, routing: { send: { type: 'body', property: 'value' } }, description: 'Main value to display' },
  { displayName: 'Change', name: 'change', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_statscard_api'] } }, routing: { send: { type: 'body', property: 'change' } }, description: 'Change value (e.g., +10% or -5%)' },
  { displayName: 'Trend', name: 'trend', type: 'options', options: [{ name: 'Up', value: 'up' }, { name: 'Down', value: 'down' }, { name: 'Flat', value: 'flat' }], default: 'flat', displayOptions: { show: { resource: ['shadcn'], operation: ['set_statscard_api'] } }, routing: { send: { type: 'body', property: 'trend' } }, description: 'Trend direction' },
  { displayName: 'Agent Name', name: 'agentName', type: 'string', default: 'n8n-api-agent', displayOptions: { show: { resource: ['shadcn'], operation: ['set_statscard_api'] } }, routing: { send: { type: 'body', property: 'agentName' } }, description: 'Agent name' },
  { displayName: 'Run ID', name: 'runId', type: 'string', default: '={{$execution.id}}', displayOptions: { show: { resource: ['shadcn'], operation: ['set_statscard_api'] } }, routing: { send: { type: 'body', property: 'runId' } }, description: 'Unique run identifier' },
  
  // Alert API fields
  { displayName: 'Widget ID', name: 'widgetId', type: 'string', default: 'left', required: true, displayOptions: { show: { resource: ['shadcn'], operation: ['set_alert_api'] } }, description: 'Target widget ID' },
  { displayName: 'Alert Title', name: 'title', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_alert_api'] } }, routing: { send: { type: 'body', property: 'title' } }, description: 'Alert title text' },
  { displayName: 'Alert Description', name: 'description', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_alert_api'] } }, routing: { send: { type: 'body', property: 'description' } }, description: 'Alert description text' },
  { displayName: 'Alert Variant', name: 'variant', type: 'options', options: [{ name: 'Default', value: 'default' }, { name: 'Destructive', value: 'destructive' }], default: 'default', displayOptions: { show: { resource: ['shadcn'], operation: ['set_alert_api'] } }, routing: { send: { type: 'body', property: 'variant' } }, description: 'Alert style variant' },
  { displayName: 'Agent Name', name: 'agentName', type: 'string', default: 'n8n-api-agent', displayOptions: { show: { resource: ['shadcn'], operation: ['set_alert_api'] } }, routing: { send: { type: 'body', property: 'agentName' } }, description: 'Agent name' },
  { displayName: 'Run ID', name: 'runId', type: 'string', default: '={{$execution.id}}', displayOptions: { show: { resource: ['shadcn'], operation: ['set_alert_api'] } }, routing: { send: { type: 'body', property: 'runId' } }, description: 'Unique run identifier' },
  
  // Table API fields  
  { displayName: 'Widget ID', name: 'widgetId', type: 'string', default: 'left', required: true, displayOptions: { show: { resource: ['shadcn'], operation: ['set_table_api'] } }, description: 'Target widget ID' },
  { displayName: 'Table Headers', name: 'headers', type: 'json', default: [], displayOptions: { show: { resource: ['shadcn'], operation: ['set_table_api'] } }, routing: { send: { type: 'body', property: 'headers' } }, description: 'Array of column header names' },
  { displayName: 'Table Rows', name: 'rows', type: 'json', default: [], displayOptions: { show: { resource: ['shadcn'], operation: ['set_table_api'] } }, routing: { send: { type: 'body', property: 'rows' } }, description: 'Array of row data arrays' },
  { displayName: 'Agent Name', name: 'agentName', type: 'string', default: 'n8n-api-agent', displayOptions: { show: { resource: ['shadcn'], operation: ['set_table_api'] } }, routing: { send: { type: 'body', property: 'agentName' } }, description: 'Agent name' },
  { displayName: 'Run ID', name: 'runId', type: 'string', default: '={{$execution.id}}', displayOptions: { show: { resource: ['shadcn'], operation: ['set_table_api'] } }, routing: { send: { type: 'body', property: 'runId' } }, description: 'Unique run identifier' },
  
  // Clear Component API fields
  { displayName: 'Widget ID', name: 'widgetId', type: 'string', default: 'left', required: true, displayOptions: { show: { resource: ['shadcn'], operation: ['clear_component_api'] } }, description: 'Target widget ID' },
  { displayName: 'Agent Name', name: 'agentName', type: 'string', default: 'n8n-api-agent', displayOptions: { show: { resource: ['shadcn'], operation: ['clear_component_api'] } }, routing: { send: { type: 'body', property: 'agentName' } }, description: 'Agent name' },
  { displayName: 'Run ID', name: 'runId', type: 'string', default: '={{$execution.id}}', displayOptions: { show: { resource: ['shadcn'], operation: ['clear_component_api'] } }, routing: { send: { type: 'body', property: 'runId' } }, description: 'Unique run identifier' }
];

// Server State operations
const serverStateOperation: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['serverState'] } },
  options: [
    { name: 'Get State', value: 'get_state', action: 'Get current widget states', routing: { request: { method: 'GET', url: '/state' } } },
    { name: 'Get Defaults', value: 'get_defaults', action: 'Get default events', routing: { request: { method: 'GET', url: '/defaults' } } },
  ],
  default: 'get_state',
};

// Audit operations  
const auditOperation: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['audit'] } },
  options: [
    { name: 'Get Audit Events', value: 'get_audit', action: 'Get recent audit events', routing: { request: { method: 'GET', url: '/audit' } } },
  ],
  default: 'get_audit',
};

const serverStateFields: INodeProperties[] = [];

const auditFields: INodeProperties[] = [
  {
    displayName: 'Widget ID',
    name: 'widgetId',
    type: 'string',
    default: '',
    displayOptions: { show: { resource: ['audit'], operation: ['get_audit'] } },
    routing: { send: { type: 'query', property: 'widgetId' } },
    description: 'Filter by widget ID (optional)'
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    default: 20,
    displayOptions: { show: { resource: ['audit'], operation: ['get_audit'] } },
    routing: { send: { type: 'query', property: 'limit' } },
    description: 'Maximum number of events to return (default: 20, max: 100)'
  }
];

// Interactive Widgets operations (new)
const interactiveOperation: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['interactive'] } },
  options: [
    { name: 'Interactive List (API)', value: 'set_interactive_list_api', action: 'Create interactive list via API', routing: { request: { method: 'POST', url: '=/api/widgets/{{$parameter.widgetId}}/list' } } },
    { name: 'Action Button Group (API)', value: 'set_action_buttons_api', action: 'Create action button group via API', routing: { request: { method: 'POST', url: '=/api/widgets/{{$parameter.widgetId}}/actions' } } },
    { name: 'Selection Card (API)', value: 'set_selection_card_api', action: 'Create selection card via API', routing: { request: { method: 'POST', url: '=/api/widgets/{{$parameter.widgetId}}/selection' } } },
    { name: 'Task List (API)', value: 'set_task_list_api', action: 'Create task list via API', routing: { request: { method: 'POST', url: '=/api/widgets/{{$parameter.widgetId}}/tasks' } } },
    { name: 'Interactive List (Publish)', value: 'set_interactive_list_publish', action: 'Create interactive list via /publish', routing: { request: { method: 'POST', url: '/publish', body: simpleShadcnBody('InteractiveList', `({ items: JSON.parse($parameter.items || '[]'), onSelect: $parameter.onSelect !== false, onAction: $parameter.onAction !== false, selected: JSON.parse($parameter.selected || '[]') })`) } } },
    { name: 'Action Button Group (Publish)', value: 'set_action_buttons_publish', action: 'Create action button group via /publish', routing: { request: { method: 'POST', url: '/publish', body: simpleShadcnBody('ActionButtonGroup', `({ actions: JSON.parse($parameter.actions || '[]'), variant: $parameter.variant, onAction: true })`) } } },
    { name: 'Selection Card (Publish)', value: 'set_selection_card_publish', action: 'Create selection card via /publish', routing: { request: { method: 'POST', url: '/publish', body: simpleShadcnBody('SelectionCard', `({ title: $parameter.title, description: $parameter.description, options: JSON.parse($parameter.options || '[]'), selected: JSON.parse($parameter.selected || '[]'), multiSelect: $parameter.multiSelect !== false, onSelect: true })`) } } },
    { name: 'Task List (Publish)', value: 'set_task_list_publish', action: 'Create task list via /publish', routing: { request: { method: 'POST', url: '/publish', body: simpleShadcnBody('TaskList', `({ tasks: JSON.parse($parameter.tasks || '[]'), onTaskAction: true })`) } } },
  ],
  default: 'set_interactive_list_api',
};

const interactiveFields: INodeProperties[] = [
  // Interactive List API fields
  { displayName: 'Widget ID', name: 'widgetId', type: 'string', default: 'left', required: true, displayOptions: { show: { resource: ['interactive'], operation: ['set_interactive_list_api'] } }, description: 'Target widget ID' },
  { displayName: 'List Items', name: 'items', type: 'json', default: [], displayOptions: { show: { resource: ['interactive'], operation: ['set_interactive_list_api'] } }, routing: { send: { type: 'body', property: 'items' } }, description: 'Array of list items with title, description, and actions' },
  { displayName: 'Enable Selection', name: 'onSelect', type: 'boolean', default: true, displayOptions: { show: { resource: ['interactive'], operation: ['set_interactive_list_api'] } }, routing: { send: { type: 'body', property: 'onSelect' } }, description: 'Enable item selection' },
  { displayName: 'Enable Actions', name: 'onAction', type: 'boolean', default: true, displayOptions: { show: { resource: ['interactive'], operation: ['set_interactive_list_api'] } }, routing: { send: { type: 'body', property: 'onAction' } }, description: 'Enable action buttons' },
  { displayName: 'Pre-selected Items', name: 'selected', type: 'json', default: [], displayOptions: { show: { resource: ['interactive'], operation: ['set_interactive_list_api'] } }, routing: { send: { type: 'body', property: 'selected' } }, description: 'Array of indices for pre-selected items' },
  { displayName: 'Agent Name', name: 'agentName', type: 'string', default: 'n8n-interactive-agent', displayOptions: { show: { resource: ['interactive'], operation: ['set_interactive_list_api'] } }, routing: { send: { type: 'body', property: 'agentName' } }, description: 'Agent name' },
  { displayName: 'Run ID', name: 'runId', type: 'string', default: '={{$execution.id}}', displayOptions: { show: { resource: ['interactive'], operation: ['set_interactive_list_api'] } }, routing: { send: { type: 'body', property: 'runId' } }, description: 'Unique run identifier' },

  // Action Button Group API fields
  { displayName: 'Widget ID', name: 'widgetId', type: 'string', default: 'left', required: true, displayOptions: { show: { resource: ['interactive'], operation: ['set_action_buttons_api'] } }, description: 'Target widget ID' },
  { displayName: 'Button Actions', name: 'actions', type: 'json', default: [], displayOptions: { show: { resource: ['interactive'], operation: ['set_action_buttons_api'] } }, routing: { send: { type: 'body', property: 'actions' } }, description: 'Array of button actions with type, label, and variant' },
  { displayName: 'Button Variant', name: 'variant', type: 'options', options: [{ name: 'Default', value: 'default' }, { name: 'Outline', value: 'outline' }, { name: 'Secondary', value: 'secondary' }, { name: 'Destructive', value: 'destructive' }], default: 'default', displayOptions: { show: { resource: ['interactive'], operation: ['set_action_buttons_api'] } }, routing: { send: { type: 'body', property: 'variant' } }, description: 'Default button variant' },
  { displayName: 'Agent Name', name: 'agentName', type: 'string', default: 'n8n-interactive-agent', displayOptions: { show: { resource: ['interactive'], operation: ['set_action_buttons_api'] } }, routing: { send: { type: 'body', property: 'agentName' } }, description: 'Agent name' },
  { displayName: 'Run ID', name: 'runId', type: 'string', default: '={{$execution.id}}', displayOptions: { show: { resource: ['interactive'], operation: ['set_action_buttons_api'] } }, routing: { send: { type: 'body', property: 'runId' } }, description: 'Unique run identifier' },

  // Selection Card API fields
  { displayName: 'Widget ID', name: 'widgetId', type: 'string', default: 'left', required: true, displayOptions: { show: { resource: ['interactive'], operation: ['set_selection_card_api'] } }, description: 'Target widget ID' },
  { displayName: 'Card Title', name: 'title', type: 'string', default: '', displayOptions: { show: { resource: ['interactive'], operation: ['set_selection_card_api'] } }, routing: { send: { type: 'body', property: 'title' } }, description: 'Selection card title' },
  { displayName: 'Card Description', name: 'description', type: 'string', default: '', displayOptions: { show: { resource: ['interactive'], operation: ['set_selection_card_api'] } }, routing: { send: { type: 'body', property: 'description' } }, description: 'Selection card description' },
  { displayName: 'Selection Options', name: 'options', type: 'json', default: [], displayOptions: { show: { resource: ['interactive'], operation: ['set_selection_card_api'] } }, routing: { send: { type: 'body', property: 'options' } }, description: 'Array of selectable options with name and description' },
  { displayName: 'Pre-selected Options', name: 'selected', type: 'json', default: [], displayOptions: { show: { resource: ['interactive'], operation: ['set_selection_card_api'] } }, routing: { send: { type: 'body', property: 'selected' } }, description: 'Array of indices for pre-selected options' },
  { displayName: 'Multi-Select', name: 'multiSelect', type: 'boolean', default: true, displayOptions: { show: { resource: ['interactive'], operation: ['set_selection_card_api'] } }, routing: { send: { type: 'body', property: 'multiSelect' } }, description: 'Allow multiple selections' },
  { displayName: 'Agent Name', name: 'agentName', type: 'string', default: 'n8n-interactive-agent', displayOptions: { show: { resource: ['interactive'], operation: ['set_selection_card_api'] } }, routing: { send: { type: 'body', property: 'agentName' } }, description: 'Agent name' },
  { displayName: 'Run ID', name: 'runId', type: 'string', default: '={{$execution.id}}', displayOptions: { show: { resource: ['interactive'], operation: ['set_selection_card_api'] } }, routing: { send: { type: 'body', property: 'runId' } }, description: 'Unique run identifier' },

  // Task List API fields
  { displayName: 'Widget ID', name: 'widgetId', type: 'string', default: 'left', required: true, displayOptions: { show: { resource: ['interactive'], operation: ['set_task_list_api'] } }, description: 'Target widget ID' },
  { displayName: 'Task Items', name: 'tasks', type: 'json', default: [], displayOptions: { show: { resource: ['interactive'], operation: ['set_task_list_api'] } }, routing: { send: { type: 'body', property: 'tasks' } }, description: 'Array of tasks with title, description, status, and actions' },
  { displayName: 'Agent Name', name: 'agentName', type: 'string', default: 'n8n-interactive-agent', displayOptions: { show: { resource: ['interactive'], operation: ['set_task_list_api'] } }, routing: { send: { type: 'body', property: 'agentName' } }, description: 'Agent name' },
  { displayName: 'Run ID', name: 'runId', type: 'string', default: '={{$execution.id}}', displayOptions: { show: { resource: ['interactive'], operation: ['set_task_list_api'] } }, routing: { send: { type: 'body', property: 'runId' } }, description: 'Unique run identifier' },

  // Common fields for publish operations  
  ...commonMetaFields.map((f) => ({ ...f, displayOptions: { show: { resource: ['interactive'], operation: ['set_interactive_list_publish', 'set_action_buttons_publish', 'set_selection_card_publish', 'set_task_list_publish'] } } })),

  // Interactive List Publish fields
  { displayName: 'List Items (JSON)', name: 'items', type: 'json', default: [], displayOptions: { show: { resource: ['interactive'], operation: ['set_interactive_list_publish'] } }, description: 'Array of list items with title, description, and actions' },
  { displayName: 'Enable Selection', name: 'onSelect', type: 'boolean', default: true, displayOptions: { show: { resource: ['interactive'], operation: ['set_interactive_list_publish'] } }, description: 'Enable item selection' },
  { displayName: 'Enable Actions', name: 'onAction', type: 'boolean', default: true, displayOptions: { show: { resource: ['interactive'], operation: ['set_interactive_list_publish'] } }, description: 'Enable action buttons' },
  { displayName: 'Pre-selected Items (JSON)', name: 'selected', type: 'json', default: [], displayOptions: { show: { resource: ['interactive'], operation: ['set_interactive_list_publish'] } }, description: 'Array of indices for pre-selected items' },

  // Action Button Group Publish fields
  { displayName: 'Button Actions (JSON)', name: 'actions', type: 'json', default: [], displayOptions: { show: { resource: ['interactive'], operation: ['set_action_buttons_publish'] } }, description: 'Array of button actions with type, label, and variant' },
  { displayName: 'Button Variant', name: 'variant', type: 'options', options: [{ name: 'Default', value: 'default' }, { name: 'Outline', value: 'outline' }, { name: 'Secondary', value: 'secondary' }, { name: 'Destructive', value: 'destructive' }], default: 'default', displayOptions: { show: { resource: ['interactive'], operation: ['set_action_buttons_publish'] } }, description: 'Default button variant' },

  // Selection Card Publish fields
  { displayName: 'Card Title', name: 'title', type: 'string', default: '', displayOptions: { show: { resource: ['interactive'], operation: ['set_selection_card_publish'] } }, description: 'Selection card title' },
  { displayName: 'Card Description', name: 'description', type: 'string', default: '', displayOptions: { show: { resource: ['interactive'], operation: ['set_selection_card_publish'] } }, description: 'Selection card description' },
  { displayName: 'Selection Options (JSON)', name: 'options', type: 'json', default: [], displayOptions: { show: { resource: ['interactive'], operation: ['set_selection_card_publish'] } }, description: 'Array of selectable options with name and description' },
  { displayName: 'Pre-selected Options (JSON)', name: 'selected', type: 'json', default: [], displayOptions: { show: { resource: ['interactive'], operation: ['set_selection_card_publish'] } }, description: 'Array of indices for pre-selected options' },
  { displayName: 'Multi-Select', name: 'multiSelect', type: 'boolean', default: true, displayOptions: { show: { resource: ['interactive'], operation: ['set_selection_card_publish'] } }, description: 'Allow multiple selections' },

  // Task List Publish fields  
  { displayName: 'Task Items (JSON)', name: 'tasks', type: 'json', default: [], displayOptions: { show: { resource: ['interactive'], operation: ['set_task_list_publish'] } }, description: 'Array of tasks with title, description, status, and actions' }
];

export const uiEventsOperations: INodeProperties[] = [
  widgetStateOperation,
  rechartsOperation,
  shadcnOperation,
  interactiveOperation,
  serverStateOperation,
  auditOperation,
];

export const uiEventsFields: INodeProperties[] = [
  ...widgetStateFields,
  ...rechartsCommonFields,
  ...rechartsFields,
  ...shadcnCommon,
  ...shadcnFields,
  ...interactiveFields,
  ...serverStateFields,
  ...auditFields,
];
