# Claude Code Configuration

Read `AGENTS.md` for full project context — it is the primary reference for this
repository's architecture, commands, constraints, and conventions.

## MCP Servers

See `.mcp.json` for configured servers:

- **commercetools-developer** — commercetools API docs, GraphQL schemas, OpenAPI
  specs
- **context7** — third-party library documentation
- **playwright** — visual UI verification
- **sequential-thinking** — structured multi-step reasoning

## Hooks

See `.claude/settings.json` for configured hooks:

- Post-write: auto-format with Prettier

## Skills

Skills live in `.agents/skills/` and are symlinked into `.claude/skills/`.
Update with `npx skills update` — check `git diff` afterward for lost repo-specific content.

Shared skills installed via `skills add commercetools/agent-skills/skills/<name>`:

- `/repo-healthcheck-node` — verify repo setup
- `/remember` — persistent memory across sessions
- `/repo-maintenance-node` — formatting, dead code, dependency validation
- `/jira-create-epic-from-plan` — create Jira epic from markdown plan
- `/jira-implement-task` — implement a Jira ticket end-to-end
- `/renovate-review` — review Renovate dependency PRs
- `/renovate-migrate` — migrate code for Renovate breaking changes
- `/pr-review-navigator` — PR file dependency diagrams and review order
- `/security-auditor` — security audit with OWASP mapping
