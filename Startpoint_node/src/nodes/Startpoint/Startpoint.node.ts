import {
  INodeType,
  INodeTypeDescription,
  NodeConnectionType,
} from "n8n-workflow";
import {
  startpointOperations,
  startpointFields,
} from "./StartpointDescription";

export class Startpoint implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Startpoint",
    name: "startpoint",
    icon: { light: "file:startpoint.svg", dark: "file:startpoint.svg" },
    group: ["productivity"],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: "Interact with Startpoint ERP API for project management",
    defaults: {
      name: "Startpoint",
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    usableAsTool: true,
    credentials: [
      {
        name: "startpointApi",
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: "={{$credentials.baseUrl}}",
      url: "",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: '={{"Bearer " + $credentials.token}}',
      },
    },
    properties: [
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        noDataExpression: true,
        options: [
          {
            name: "Client",
            value: "client",
            description: "Manage clients and their information",
          },
          {
            name: "Discipline",
            value: "discipline",
            description: "Manage professional disciplines",
          },
          {
            name: "Employee",
            value: "employee",
            description: "Manage employees and team members",
          },
          {
            name: "Phase",
            value: "phase",
            description: "Manage project phases",
          },
          {
            name: "Project",
            value: "project",
            description: "Manage projects in the ERP system",
          },
          {
            name: "Task",
            value: "task",
            description: "Manage tasks within phases",
          },
          {
            name: "Team",
            value: "team",
            description: "Manage project team members",
          },
        ],
        default: "project",
      },
      ...startpointOperations,
      ...startpointFields,
    ],
  };
}
