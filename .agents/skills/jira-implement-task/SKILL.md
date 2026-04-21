---
name: jira-implement-task
description: Fetch Jira ticket, create branch, implement changes, commit, push, open PR.
disable-model-invocation: false
argument-hint: '<ticket-key>'
allowed-tools: Bash, Grep, Glob, Read, Edit, Write, Agent
scope:
  - jira
---

# Implement Jira Task

You are a software engineer. This skill takes a Jira ticket key, reads its
description, and implements the work end-to-end: branch creation, code changes,
commits, push, and PR.

## Argument Parsing

Parse `$ARGUMENTS` to extract:

- **Ticket key**: The Jira ticket key (e.g., `FEC-123`). Required.

> **Restore Context**
>
> This skill uses `/agent-restore-context` as a safety net in case `/compact`
> or `/clear` happens mid-implementation.
>
> - **Step 0**: `/agent-restore-context check` to verify the hook is set up.
> - **Step 3a**: `/agent-restore-context write jira-implement-task` once after
>   creating the implementation plan.
> - **Step 3c**: `/agent-restore-context delete jira-implement-task` when done.

## Step 0: Verify Restore Context

Invoke `/agent-restore-context check`. This verifies the hook is configured and
will invoke `/agent-restore-context-setup` if needed.

## Project Configuration

Before starting, read the project's `CLAUDE.md` and/or `AGENTS.md` to determine
the following project-specific settings. These files are the source of truth for
how to work in this repo.

| Setting                  | What to look for                                                | Fallback default      |
| ------------------------ | --------------------------------------------------------------- | --------------------- |
| **Test command (files)** | Command to run tests for specific files/folders                 | `pnpm test <files>`   |
| **Test command (full)**  | Command to run the full test suite                              | `pnpm test`           |
| **Branch naming**        | Branch naming convention or prefix rules                        | `<TICKET-KEY>-<slug>` |
| **Base branch**          | Default branch to branch from                                   | `main`                |
| **Commit format**        | Commit message convention                                       | Conventional commits  |
| **Component workflow**   | Command/process for new components (e.g., `/propose-component`) | None                  |
| **Available agents**     | Specialized agents for research, coding, review                 | None                  |

If a setting is not found in `CLAUDE.md`, `AGENTS.md`, `rules/`, or `/docs`, ask the
user whether they want to add it to `CLAUDE.md`, `AGENTS.md`, `rules/` or `/docs` — or
use the fallback default for this run only.

## Step 1: Fetch Ticket Details

Use the Atlassian MCP tools to retrieve the ticket:

1. Call `mcp__atlassian__getAccessibleAtlassianResources` to get the cloud ID
2. Call `mcp__atlassian__getJiraIssue` with the cloud ID and ticket key
3. Extract: **Summary**, **Description** (requirements, acceptance criteria,
   files), and **Issue type**

If the ticket cannot be found, report the error and stop. Always write Markdown
to Jira, never ADF — the MCP tools handle conversion.

## Step 2: Create a Feature Branch

Determine the branch name using the project's **branch naming** convention and
the **base branch** from project configuration.

Create a branch from the base branch in the current working tree:

```bash
git checkout <base-branch>
git pull
git checkout -b <branch-name>
```

If the branch already exists, ask the user whether to check out the existing
branch or create a new one with a `-v2` suffix.

## Step 3: Implement Changes

### 3a: Understand Scope and Plan

1. **Understand scope**: Read the ticket description carefully. Identify all
   files to modify/create.
2. **Read existing files**: Always read files before modifying them.
3. **Create implementation plan**: Break the changes into the smallest
   reasonable chunks of work. Save the plan to
   `<skills-dir>/jira-implement-task/plans/<TICKET-KEY>-plan.md` (where
   `<skills-dir>` is `.agents/skills/` or `.claude/skills/` per the detected
   layout). Each task should be independently testable and committable. Commit
   the plan so it can be shared for handoff. Delete it before merging or keep
   it as a record.
4. **Create restore context**: Invoke `/agent-restore-context write jira-implement-task`
   with content that includes the ticket key, branch name, plan file path,
   and the instruction to read the plan file before doing any work.

### 3b: Implement Each Task (Red/Green TDD)

For each task in the implementation plan:

1. **Write tests first** (red phase): Write or update tests that capture the
   expected behavior. Tests should fail at this point.
2. **Implement changes** (green phase): Write the minimum code to make the
   tests pass.
3. **Run tests**: Verify all tests pass using the project's **test command
   (files)**.
4. **Commit**: Commit the tests and implementation together.

If stuck after 3 attempts on a task, stop and ask the user for guidance.

### 3c: Completion

Once all tasks in the plan are implemented and passing:

1. **Run full test suite**: Run the project's **test command (full)** to verify
   everything passes.
2. Invoke `/agent-restore-context delete jira-implement-task`.
3. Ask the user whether to **delete the implementation plan file** or keep it.
4. Proceed to Step 4 (push and PR creation).

### Guidelines

- Follow the project's conventions from `CLAUDE.md` / `AGENTS.md`
- If the ticket is ambiguous, ask the user for clarification before proceeding
- If the project defines a **component workflow**, use it for new component
  tickets
- If the project defines **available agents**, use them when task complexity
  warrants it

## Step 4: Push and Create PR

### Permission check

Run `gh repo view --json viewerPermission --jq '.viewerPermission'`. If the
result is `READ`, skip push and PR — print the exact `git push` and
`gh pr create` commands for the user to run manually, then stop.

### Push and create PR

```bash
git push -u origin <branch-name>
gh pr create --title "<type>(<scope>): <summary>" --body "$(cat <<'EOF'
## Summary
<1-5 bullet points describing the changes>

Closes <TICKET-KEY>

## Test plan
- [ ] <verification steps>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Return the PR URL to the user when done.

---

**Implement Jira task: $ARGUMENTS**
