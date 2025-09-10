import {
  INodeType,
  INodeTypeDescription,
  NodeConnectionType,
} from 'n8n-workflow';
import { uiEventsSimplifiedOperations, uiEventsSimplifiedFields } from './UiEventsSimplified';

export class UiEventsSimple implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'UI Events Simple',
    name: 'uiEventsSimple',
    icon: { light: 'file:ui-events.svg', dark: 'file:ui-events.svg' },
    group: ['productivity'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description:
      'Simplified UI Events tools using Startpoint routing pattern for better MCP compatibility.',
    defaults: {
      name: 'UI Events Simple',
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    usableAsTool: true,
    credentials: [
      {
        name: 'uiEventsApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: '={{$credentials.baseUrl}}',
      url: '',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          { name: 'Chart', value: 'chart', description: 'Create chart visualizations' },
          { name: 'Widget', value: 'widget', description: 'Manage widget state' },
        ],
        default: 'chart',
      },
      ...uiEventsSimplifiedOperations,
      ...uiEventsSimplifiedFields,
    ],
  };
}