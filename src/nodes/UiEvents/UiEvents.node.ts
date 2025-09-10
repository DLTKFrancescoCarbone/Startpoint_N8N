import {
  INodeType,
  INodeTypeDescription,
  NodeConnectionType,
} from 'n8n-workflow';
import { uiEventsOperations, uiEventsFields } from './UiEventsDescription';

export class UiEvents implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'UI Events',
    name: 'uiEvents',
    icon: { light: 'file:ui-events.svg', dark: 'file:ui-events.svg' },
    group: ['productivity'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description:
      'Publish WidgetUpdate events to UI Events Spike server (/publish) to drive dashboard UI.',
    defaults: {
      name: 'UI Events',
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
          { name: 'Widget State', value: 'widgetState' },
          { name: 'Recharts', value: 'recharts' },
          { name: 'Shadcn UI', value: 'shadcn' },
        ],
        default: 'widgetState',
      },
      ...uiEventsOperations,
      ...uiEventsFields,
    ],
  };
}

