import { INodeProperties } from 'n8n-workflow';

// Simplified UI Events operations using Startpoint's successful routing pattern
export const uiEventsSimplifiedOperations: INodeProperties[] = [
  // Chart operations
  {
    displayName: 'Operation',
    name: 'operation', 
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['chart'] } },
    options: [
      {
        name: 'Set Bar Chart',
        value: 'set_barchart',
        description: 'Create a bar chart visualization',
        action: 'Set bar chart',
        routing: {
          request: {
            method: 'POST',
            url: '/publish'
          }
        }
      },
      {
        name: 'Set Line Chart', 
        value: 'set_linechart',
        description: 'Create a line chart visualization',
        action: 'Set line chart',
        routing: {
          request: {
            method: 'POST',
            url: '/publish'
          }
        }
      }
    ],
    default: 'set_barchart'
  },

  // Widget state operations
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options', 
    noDataExpression: true,
    displayOptions: { show: { resource: ['widget'] } },
    options: [
      {
        name: 'Set Headline',
        value: 'set_headline',
        description: 'Set widget headline text',
        action: 'Set headline',
        routing: {
          request: {
            method: 'POST',
            url: '/publish'
          }
        }
      },
      {
        name: 'Set Alert',
        value: 'set_alert', 
        description: 'Set widget alert message',
        action: 'Set alert',
        routing: {
          request: {
            method: 'POST',
            url: '/publish'
          }
        }
      }
    ],
    default: 'set_headline'
  }
];

export const uiEventsSimplifiedFields: INodeProperties[] = [
  // Common fields
  {
    displayName: 'Widget ID',
    name: 'widgetId',
    type: 'string',
    default: 'left',
    required: true,
    routing: { send: { type: 'body', property: 'widgetId' } },
    description: 'Target widget ID (e.g., left, center, right)'
  },
  
  {
    displayName: 'Agent Name', 
    name: 'agentName',
    type: 'string',
    default: 'ui-events-agent',
    required: true,
    routing: { send: { type: 'body', property: 'agentName' } },
    description: 'Name of the agent making the request'
  },

  // Chart-specific fields
  {
    displayName: 'Chart Data',
    name: 'chartData',
    type: 'string',
    displayOptions: { show: { resource: ['chart'] } },
    default: '[]',
    routing: { send: { type: 'body', property: 'data' } },
    description: 'Chart data as JSON string'
  },

  {
    displayName: 'X Key',
    name: 'xKey', 
    type: 'string',
    displayOptions: { show: { resource: ['chart'] } },
    default: 'name',
    routing: { send: { type: 'body', property: 'xKey' } },
    description: 'Property name for X-axis data'
  },

  {
    displayName: 'Chart Height',
    name: 'height',
    type: 'number',
    displayOptions: { show: { resource: ['chart'] } },
    default: 240,
    routing: { send: { type: 'body', property: 'height' } },
    description: 'Chart height in pixels'
  },

  // Widget-specific fields
  {
    displayName: 'Headline',
    name: 'headline',
    type: 'string',
    displayOptions: { show: { resource: ['widget'] } },
    default: '',
    routing: { send: { type: 'body', property: 'headline' } },
    description: 'Widget headline text'
  },

  {
    displayName: 'Alert Message',
    name: 'alertMessage',
    type: 'string',
    displayOptions: { show: { resource: ['widget'], operation: ['set_alert'] } },
    default: '',
    routing: { send: { type: 'body', property: 'message' } },
    description: 'Alert message text'
  },

  {
    displayName: 'Alert Type',
    name: 'alertType',
    type: 'options',
    displayOptions: { show: { resource: ['widget'], operation: ['set_alert'] } },
    options: [
      { name: 'Info', value: 'info' },
      { name: 'Warning', value: 'warning' },
      { name: 'Error', value: 'error' },
      { name: 'Success', value: 'success' }
    ],
    default: 'info',
    routing: { send: { type: 'body', property: 'alertType' } },
    description: 'Type of alert'
  }
];