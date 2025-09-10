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
            height: $parameter.height || 240,
            data: JSON.parse($parameter.data || '[]'),
            xKey: $parameter.xKey || 'name',
            yKeys: ($parameter.yKeys?.series || []).map(s => ({ key: s.key, color: s.color || undefined }))
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
    { name: 'Set Headline', value: 'set_headline', action: 'Set widget headline', routing: { request: { method: 'POST', url: '/publish', body: simpleWidgetStateBody('setHeadline', '$parameter.headline || ""') } } },
    { name: 'Set Severity', value: 'set_severity', action: 'Set widget severity', routing: { request: { method: 'POST', url: '/publish', body: `={{(e => { e.ops.push({ type: 'setSeverity', value: $parameter.severity }); return e; })(${baseEventExpr})}}` } } },
    { name: 'Set Badge', value: 'set_badge', action: 'Set widget badge', routing: { request: { method: 'POST', url: '/publish', body: `={{(e => { e.ops.push({ type: 'setBadge', value: $parameter.badge?.properties }); return e; })(${baseEventExpr})}}` } } },
    { name: 'Clear Badge', value: 'clear_badge', action: 'Clear widget badge', routing: { request: { method: 'POST', url: '/publish', body: `={{(e => { e.ops.push({ type: 'setBadge', value: null }); return e; })(${baseEventExpr})}}` } } },
    { name: 'Set Note', value: 'set_note', action: 'Set widget note', routing: { request: { method: 'POST', url: '/publish', body: `={{(e => { e.ops.push({ type: 'setNote', value: $parameter.note }); return e; })(${baseEventExpr})}}` } } },
    { name: 'Clear Note', value: 'clear_note', action: 'Clear widget note', routing: { request: { method: 'POST', url: '/publish', body: `={{(e => { e.ops.push({ type: 'setNote', value: null }); return e; })(${baseEventExpr})}}` } } },
    { name: 'Set CTA', value: 'set_cta', action: 'Set widget CTA', routing: { request: { method: 'POST', url: '/publish', body: `={{(e => { e.ops.push({ type: 'setCta', value: $parameter.cta?.properties }); return e; })(${baseEventExpr})}}` } } },
    { name: 'Clear CTA', value: 'clear_cta', action: 'Clear widget CTA', routing: { request: { method: 'POST', url: '/publish', body: `={{(e => { e.ops.push({ type: 'setCta', value: null }); return e; })(${baseEventExpr})}}` } } },
    { name: 'Update Data', value: 'update_data', action: 'Replace widget data blob', routing: { request: { method: 'POST', url: '/publish', body: `={{(e => { e.ops.push({ type: 'updateData', value: (typeof $parameter.data === 'string' ? (() => { try { return JSON.parse($parameter.data); } catch(e) { console.error('JSON Parse Error:', e, 'Data:', $parameter.data); return {}; } })() : $parameter.data) }); return e; })(${baseEventExpr})}}` } } },
    { name: 'Clear Component', value: 'clear_component', action: 'Unmount current component', routing: { request: { method: 'POST', url: '/publish', body: `={{(e => { e.ops.push({ type: 'setComponent', value: null }); return e; })(${baseEventExpr})}}` } } },
    { name: 'Set Widget State (multi)', value: 'set_widget_state', action: 'Set multiple state fields', routing: { request: { method: 'POST', url: '/publish', body: `={{(e => { const ops:any[]=[]; if ($parameter.headline) ops.push({type:'setHeadline',value:$parameter.headline}); if($parameter.severity) ops.push({type:'setSeverity',value:$parameter.severity}); if($parameter.badge?.properties&&($parameter.badge.properties.type||$parameter.badge.properties.text)) ops.push({type:'setBadge',value:$parameter.badge.properties}); if($parameter.note) ops.push({type:'setNote',value:$parameter.note}); if($parameter.cta?.properties&&$parameter.cta.properties.text) ops.push({type:'setCta',value:$parameter.cta.properties}); e.ops=ops; return e; })(${baseEventExpr})}}` } } },
  ],
  default: 'set_headline',
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
    type: 'string',
    default: '{}',
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
    { name: 'Set LineChart', value: 'set_recharts_linechart', action: 'Mount LineChart', routing: { request: { method: 'POST', url: '/publish', body: simpleChartBody('LineChart') } } },
    { name: 'Set BarChart', value: 'set_recharts_barchart', action: 'Mount BarChart', routing: { request: { method: 'POST', url: '/publish', body: simpleChartBody('BarChart') } } },
  ],
  default: 'set_recharts_linechart',
};

const seriesCollection: INodeProperties = {
  displayName: 'Series',
  name: 'yKeys',
  type: 'fixedCollection',
  typeOptions: { multipleValues: true },
  description: 'Series definitions',
  default: {},
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
  ...commonMetaFields.map((f) => ({ ...f, displayOptions: { show: { resource: ['recharts'] } } })),
  { displayName: 'X Key', name: 'xKey', type: 'string', default: 'name', required: true, displayOptions: { show: { resource: ['recharts'] } } },
  seriesCollection,
  { displayName: 'Height', name: 'height', type: 'number', default: 240, displayOptions: { show: { resource: ['recharts'] } } },
  { displayName: 'Data (JSON array)', name: 'data', type: 'string', default: '[]', typeOptions: { rows: 4 }, displayOptions: { show: { resource: ['recharts'] } } },
  // Convenience: optional state fields
  { displayName: 'Headline', name: 'headline', type: 'string', default: '', displayOptions: { show: { resource: ['recharts'] } } },
  { displayName: 'Severity', name: 'severity', type: 'options', options: [
    { name: '— none —', value: '' }, { name: 'none', value: 'none' }, { name: 'low', value: 'low' }, { name: 'medium', value: 'medium' }, { name: 'high', value: 'high' }, { name: 'critical', value: 'critical' },
  ], default: '', displayOptions: { show: { resource: ['recharts'] } } },
  { displayName: 'Badge', name: 'badge', type: 'fixedCollection', typeOptions: { multipleValues: false }, default: {}, options: [{ name: 'properties', displayName: 'Properties', values: [
    { displayName: 'Type', name: 'type', type: 'string', default: '' },
    { displayName: 'Count', name: 'count', type: 'number', default: 0 },
    { displayName: 'Text', name: 'text', type: 'string', default: '' },
  ] }], displayOptions: { show: { resource: ['recharts'] } } },
  { displayName: 'Note', name: 'note', type: 'string', default: '', displayOptions: { show: { resource: ['recharts'] } } },
  { displayName: 'CTA', name: 'cta', type: 'fixedCollection', typeOptions: { multipleValues: false }, default: {}, options: [{ name: 'properties', displayName: 'Properties', values: [
    { displayName: 'Text', name: 'text', type: 'string', default: '' },
    { displayName: 'URL', name: 'url', type: 'string', default: '' },
  ] }], displayOptions: { show: { resource: ['recharts'] } } },
];


const rechartsFields: INodeProperties[] = [];

// Shadcn components
const shadcnOperation: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['shadcn'] } },
  options: [
    { name: 'Set StatsCard', value: 'set_shadcn_statscard', action: 'Mount StatsCard', routing: { request: { method: 'POST', url: '/publish', body: shadcnBody('StatsCard', `({ title: $parameter.title, value: $parameter.value, change: $parameter.change, trend: $parameter.trend, icon: $parameter.icon, className: $parameter.className })`) } } },
    { name: 'Set Metric', value: 'set_shadcn_metric', action: 'Mount Metric', routing: { request: { method: 'POST', url: '/publish', body: shadcnBody('Metric', `({ label: $parameter.label, value: $parameter.metricValue, unit: $parameter.unit, variant: $parameter.variant, className: $parameter.className })`) } } },
    { name: 'Set KeyValueList', value: 'set_shadcn_keyvaluelist', action: 'Mount KeyValueList', routing: { request: { method: 'POST', url: '/publish', body: shadcnBody('KeyValueList', `({ items: ($parameter.kvItems.item || []).map(i => ({ key: i.key, value: i.value })), className: $parameter.className })`) } } },
    { name: 'Set Progress', value: 'set_shadcn_progress', action: 'Mount Progress', routing: { request: { method: 'POST', url: '/publish', body: shadcnBody('Progress', `({ value: $parameter.progressValue, max: $parameter.max, className: $parameter.className })`) } } },
    { name: 'Set Alert', value: 'set_shadcn_alert', action: 'Mount Alert', routing: { request: { method: 'POST', url: '/publish', body: shadcnBody('Alert', `({ variant: $parameter.variant, title: $parameter.title, description: $parameter.description, className: $parameter.className })`) } } },
    { name: 'Set Badge', value: 'set_shadcn_badge', action: 'Mount Badge', routing: { request: { method: 'POST', url: '/publish', body: shadcnBody('Badge', `({ variant: $parameter.variant, text: $parameter.text, className: $parameter.className })`) } } },
    { name: 'Set Button', value: 'set_shadcn_button', action: 'Mount Button', routing: { request: { method: 'POST', url: '/publish', body: shadcnBody('Button', `({ variant: $parameter.variant, size: $parameter.size, text: $parameter.text, className: $parameter.className, onClick: $parameter.onClick })`) } } },
    { name: 'Set Table', value: 'set_shadcn_table', action: 'Mount Table', routing: { request: { method: 'POST', url: '/publish', body: shadcnBody('Table', `({ headers: $parameter.headers, rows: $parameter.rows, className: $parameter.className })`) } } },
    { name: 'Set Card', value: 'set_shadcn_card', action: 'Mount Card', routing: { request: { method: 'POST', url: '/publish', body: shadcnBody('Card', `({ title: $parameter.title, description: $parameter.description, content: ($parameter.content ? (function(c){ try { return JSON.parse(c) } catch(_) { return c } })($parameter.content) : undefined), footer: $parameter.footer, className: $parameter.className })`) } } },
  ],
  default: 'set_shadcn_statscard',
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
  { displayName: 'Headers', name: 'headers', type: 'json', default: '[]', description: 'JSON array of strings', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_table'] } } },
  { displayName: 'Rows', name: 'rows', type: 'json', default: '[]', description: 'JSON array of rows (string|number)[]', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_table'] } } },
  { displayName: 'Class Name', name: 'className', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_table'] } } },
  

  // Card
  { displayName: 'Title', name: 'title', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_card'] } } },
  { displayName: 'Description', name: 'description', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_card'] } } },
  { displayName: 'Content (JSON or string)', name: 'content', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_card'] } } },
  { displayName: 'Footer', name: 'footer', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_card'] } } },
  { displayName: 'Class Name', name: 'className', type: 'string', default: '', displayOptions: { show: { resource: ['shadcn'], operation: ['set_shadcn_card'] } } },
  
];

export const uiEventsOperations: INodeProperties[] = [
  widgetStateOperation,
  rechartsOperation,
  shadcnOperation,
];

export const uiEventsFields: INodeProperties[] = [
  ...widgetStateFields,
  ...rechartsCommonFields,
  ...rechartsFields,
  ...shadcnCommon,
  ...shadcnFields,
];
