# SeeZee Studios MCP Server

Authoritative Model Context Protocol (MCP) server for SeeZee Studios. This server provides canonical brand identity, services, tone, and operating rules that AI tools (like Cursor) can query to stay aligned with SeeZee standards.

## What is this?

This MCP server acts as SeeZee Studios' "brain" that AI tools can consult. Instead of relying on prompts that can drift, this server provides structured, authoritative data about:

- **Identity**: Company positioning, mission, team, differentiators
- **Services**: Service definitions, priorities, audiences, pricing
- **Tone**: Voice, language guidelines, words to avoid
- **Rules**: Hard constraints, positioning rules, agent behavior

## Tools Available

| Tool | Description |
|------|-------------|
| `get_identity` | Company name, mission, positioning, team info |
| `get_services` | Canonical service definitions and priorities |
| `get_tone` | Tone rules and language constraints |
| `get_rules` | Hard constraints and operating rules |
| `get_all` | All MCP data at once for comprehensive context |

## Installation

```bash
npm install
```

## Usage with Cursor

Add to your Cursor MCP configuration (`.cursor/mcp.json` in your user directory):

```json
{
  "mcpServers": {
    "seezeestudios": {
      "command": "npx",
      "args": ["tsx", "src/index.ts"],
      "cwd": "C:\\Users\\seans\\OneDrive\\Desktop\\cursor mcp server"
    }
  }
}
```

Then restart Cursor. The SeeZee Studios MCP will be available to all agents.

## Running Locally

```bash
npm start
```

## Data Files

All authoritative data lives in the `/data` directory:

- `identity.json` - Company identity and positioning
- `services.json` - Service definitions and audiences
- `tone.json` - Communication guidelines
- `rules.json` - Hard constraints and agent behavior

## Agent Behavior

This MCP configures agents to be **adaptable**:
- Can suggest improvements and challenge bad ideas
- Must flag conflicts with SeeZee positioning
- Should explain reasoning when challenging a direction
- Defers to MCP as authoritative when conflicts arise

## Updating

To update SeeZee standards:
1. Edit the relevant JSON file in `/data`
2. Commit and push changes
3. Restart Cursor to pick up changes

## Version

Current: 1.0.0

---

Built by SeeZee Studios - Your Community Technology Partner
