import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class UiEventsApi implements ICredentialType {
  name = 'uiEventsApi';
  displayName = 'UI Events API';
  documentationUrl = 'https://github.com/DLTKFrancescoCarbone/SMB/tree/main/ui-events-spike';

  properties: INodeProperties[] = [
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: 'http://localhost:3001',
      required: true,
      description: 'Base URL for the UI Events Spike server',
    },
    {
      displayName: 'API Token',
      name: 'token',
      type: 'string',
      default: '',
      description: 'Optional Bearer token to include in Authorization header',
      typeOptions: { password: true },
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        ...( // include Authorization only if provided
          {
            Authorization: "={{$credentials.token ? 'Bearer ' + $credentials.token : undefined}}",
          }
        ),
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials?.baseUrl}}',
      url: '/audit',
      method: 'GET',
    },
  };
}

