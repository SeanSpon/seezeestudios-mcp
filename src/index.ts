#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get directory path for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataDir = join(__dirname, "..", "data");

// Load JSON data files
function loadData(filename: string): unknown {
  const filepath = join(dataDir, filename);
  const content = readFileSync(filepath, "utf-8");
  return JSON.parse(content);
}

// Create the MCP server
const server = new Server(
  {
    name: "seezeestudios",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_identity",
        description:
          "Get SeeZee Studios company identity, positioning, mission, team, and differentiators. Use this to understand who SeeZee Studios is and what makes them unique.",
        inputSchema: {
          type: "object" as const,
          properties: {},
          required: [],
        },
      },
      {
        name: "get_services",
        description:
          "Get SeeZee Studios canonical service definitions, priorities, audiences, and pricing models. Use this before writing about services or making service-related decisions.",
        inputSchema: {
          type: "object" as const,
          properties: {},
          required: [],
        },
      },
      {
        name: "get_tone",
        description:
          "Get SeeZee Studios tone, voice, language guidelines, and communication rules. Use this before writing any copy, documentation, or communications.",
        inputSchema: {
          type: "object" as const,
          properties: {},
          required: [],
        },
      },
      {
        name: "get_rules",
        description:
          "Get SeeZee Studios hard constraints, positioning rules, and agent behavior guidelines. Use this to understand boundaries and absolute constraints.",
        inputSchema: {
          type: "object" as const,
          properties: {},
          required: [],
        },
      },
      {
        name: "get_all",
        description:
          "Get all SeeZee Studios MCP data at once (identity, services, tone, rules). Use this for comprehensive context when starting a new task.",
        inputSchema: {
          type: "object" as const,
          properties: {},
          required: [],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;

  switch (name) {
    case "get_identity":
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(loadData("identity.json"), null, 2),
          },
        ],
      };

    case "get_services":
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(loadData("services.json"), null, 2),
          },
        ],
      };

    case "get_tone":
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(loadData("tone.json"), null, 2),
          },
        ],
      };

    case "get_rules":
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(loadData("rules.json"), null, 2),
          },
        ],
      };

    case "get_all":
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                identity: loadData("identity.json"),
                services: loadData("services.json"),
                tone: loadData("tone.json"),
                rules: loadData("rules.json"),
              },
              null,
              2
            ),
          },
        ],
      };

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("SeeZee Studios MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
