---
name: agent-restore-context-setup
description: Set up the restore-context hook so skills can resume workflows after /clear and /compact. Use when setting up a new project or after cloning a repo that uses restore-context skills.
disable-model-invocation: false
allowed-tools: Bash, Grep, Glob, Read, Edit, Write
scope:
  - knowledge
---

# Setup Restore Context

Set up a generic `SessionStart` hook that re-injects context after `/clear` or
`/compact`. Any skill that writes a `.agent-restore-context-<name>` file in the
project root will have its contents automatically injected into the fresh
conversation.

## How It Works

1. Skills write `.agent-restore-context-<skill-name>` files with resume prompts.
2. A `SessionStart` hook with matcher `clear|compact` runs `agent-restore-context.sh`.
3. The script globs for `.agent-restore-context-*` and outputs their contents.
4. The model receives that output and follows the resume instructions.
5. Skills manage their own file lifecycle (write/delete).

> **Security:** The contents of `.agent-restore-context-*` files are injected
> verbatim into the model's context on every session start after `/clear` or
> `/compact`. Treat these files with the same trust as other executable config.
> Only skills running in your project should write them — this is why the
> `.gitignore` entry in step 5 is important.

## Process

### 1. Detect Layout

Determine which configuration layer the project uses:

| Check                       | Layout   | Skills directory  |
| --------------------------- | -------- | ----------------- |
| `.agents/` directory exists | `agents` | `.agents/skills/` |
| Only `.claude/` exists      | `claude` | `.claude/skills/` |

Settings files always live under `.claude/` regardless of layout.

> **Note:** When installed via the skills CLI targeting the Claude Code agent,
> the skill is placed under `.claude/skills/`. When targeting a universal agent
> (Amp, Cline, Cursor, etc.), it is placed under `.agents/skills/`.

### 2. Check if Already Configured

Read `.claude/settings.json` and `.claude/settings.local.json` (if it exists).
Search both for `restore-context`. If found in either file, report that the hook
is already configured and stop.

### 3. Locate the Hook Script

Find the script by checking both potential locations in order:

1. `.claude/skills/agent-restore-context-setup/resources/agent-restore-context.sh`
2. `.agents/skills/agent-restore-context-setup/resources/agent-restore-context.sh`

Use whichever path exists. If neither exists, stop and report that the skill
files could not be found — the user may need to re-install the skill.

Verify the script is executable. If not executable, run `chmod +x`.

> **Optional — symlink for dual-layout projects:** If both
> `.claude/skills/` and `.agents/skills/` directories exist but the skill is
> only in one of them, you may create a symlink at the missing location so
> both layouts share a single copy. For example, if the script was found under
> `.claude/skills/`, create a symlink under `.agents/skills/`:
>
> ```bash
> ln -s ../../.claude/skills/agent-restore-context-setup \
>       .agents/skills/agent-restore-context-setup
> ```
>
> Reverse the paths if the script was found under `.agents/skills/` instead.
> This is optional — the hook only needs the one resolved path to work.

### 4. Register the Hook

#### Choose settings file

Ask the user:

> "Should I add the restore-context hook to `.claude/settings.json`
> (shared — committed to the repo, takes effect for all teammates once pushed)
> or `.claude/settings.local.json` (local only — never committed, affects only
> your machine)?"
>
> **Recommendation:** choose `settings.json` if you want the whole team to
> benefit from the hook. Choose `settings.local.json` if you are the only one
> who will use this workflow, or if teammates install their skills to different
> paths.

If the chosen settings file does not exist, create it as an empty JSON object
(`{}`) before merging.

Use the resolved script path from step 3 (relative to the project root), then
merge the following into the chosen file's `hooks` object. Do **not** overwrite
existing hooks — add to or create the `SessionStart` array:

```json
{
  "SessionStart": [
    {
      "matcher": "clear|compact",
      "hooks": [
        {
          "type": "command",
          "command": "bash <resolved-script-path>"
        }
      ]
    }
  ]
}
```

Where `<resolved-script-path>` is the relative path found in step 3, e.g.
`.claude/skills/agent-restore-context-setup/resources/agent-restore-context.sh`
or `.agents/skills/agent-restore-context-setup/resources/agent-restore-context.sh`.

### 5. Add Gitignore Entry

Check `.gitignore` for `.agent-restore-context-*`. If the pattern is already
present, skip this step. If `.gitignore` does not exist, check whether the
project is a git repo (`git rev-parse --is-inside-work-tree`). If it is,
create `.gitignore`; if not, skip this step entirely. Once the file exists,
append:

```
# Restore context files (used by skills to resume workflows after /clear and /compact)
.agent-restore-context-*
```

### 6. Confirm

Report to the user:

- Where the hook was registered (which settings file)
- The path to the script
- That any skill can now write `.agent-restore-context-<name>` files to use
  this pattern

## Guidelines

- Always read target files before modifying them
- Do not create `.agents/` or `.agents/skills/` directories — only use them if
  they already exist
- This skill is idempotent — safe to run multiple times
