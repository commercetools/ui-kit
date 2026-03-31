---
name: remember
description: Persist guidelines, conventions, and architectural decisions into the repository's knowledge base. Use when told to remember something for future sessions.
disable-model-invocation: false
argument-hint: <guideline, convention, or architectural decision to persist>
allowed-tools: Bash, Grep, Glob, Read, Edit, Write
---

# Remember

Persist new guidelines, best practices, or architectural decisions into the
repository's knowledge base so they are available in future AI sessions.

## Arguments

- `thing to remember` (required): A guideline, convention, or decision to
  persist. Natural language input describing what should be remembered.

## Usage Examples

- `/remember always use the --frozen-lockfile flag in CI`
- `/remember the auth module was refactored to use middleware in PR #342`
- `/remember integration tests must hit a real database, never use mocks`

## Process

### 1. Intent Distillation

- Identify the core principle, rule, or technical intent from the user's input
- Rephrase concisely using precise software development terminology

### 2. Identify Target File

Determine which file should contain this knowledge. Repositories follow a
layered structure, preferring tool-agnostic paths when they exist:

| Intent type                                                           | Preferred target                | Fallback             |
| --------------------------------------------------------------------- | ------------------------------- | -------------------- |
| Project-wide convention or standard                                   | `AGENTS.md`                     | `CLAUDE.md`          |
| Domain-specific best practice (testing, components, API design, etc.) | `rules/` or `docs/conventions/` | See resolution rules |
| Change to an automated workflow or skill                              | `.agents/skills/`               | `.claude/skills/`    |
| Agent behavior guideline                                              | `.agents/agents/`               | `.claude/agents/`    |
| Claude-specific configuration (MCP, hooks, permissions)               | `CLAUDE.md`                     | —                    |

**Resolution rules:**

1. Check whether `rules/` or `docs/conventions/` exists
2. If both exist, prefer `rules/`
3. If only one exists, write there
4. If only `docs/conventions/` exists, ask the user whether they want to
   create a symlink from `rules/` to `docs/conventions/` so both paths
   resolve to the same location. If they confirm, create the symlink before
   writing.
5. If neither exists, create `rules/` and write there
6. For other target types:
   - For `.agents/skills/` or `.agents/agents/`: Use the `.claude/` equivalent
     if the `.agents/` directory does not exist
   - For `AGENTS.md`: Use `CLAUDE.md` if `AGENTS.md` does not exist
7. Only write to `CLAUDE.md` or `.claude/` directly when the information is
   Claude-specific or no tool-agnostic target exists

### 3. Conflict Analysis

- Thoroughly scan the identified file(s) for any existing content that
  contradicts the new intent
- Additionally, scan the corresponding file in the other layer (e.g., if writing
  to `AGENTS.md`, also scan `CLAUDE.md` and vice versa). If the other layer
  contains conflicting or duplicated content, resolve it by replacing that
  content in `CLAUDE.md` with a reference to `AGENTS.md` (e.g.,
  "See `AGENTS.md` for project conventions.")
- A contradiction is any statement that would be invalidated or made obsolete by
  the new guideline

**If a conflict is found:**

- Halt execution immediately
- Quote the exact conflicting statement(s) from the document
- Inform the user about the contradiction and ask for clarification on how to
  proceed
- Do NOT proceed with any updates until the conflict is resolved

**If no conflicts are found:**

- Identify the most logical section within the file to add the new information
- If no suitable section exists, create a new one with an appropriate heading
- Refactor existing content as needed to keep the document coherent and
  well-structured

### 4. Write the Update

When writing the update:

- Only include production-ready patterns and examples that can be safely copied.
  Use precise, declarative language. Do not include anti-patterns or cautionary
  examples.

### 5. Skill Discovery and Synchronization

After successfully updating documentation, discover which skills may need
updates by scanning skill files in `.agents/skills/*/SKILL.md` and
`.claude/skills/*/SKILL.md` (whichever exist). When reading skill files, resolve
symlinks to access the actual content rather than treating symlinks as empty or
opaque files.

**Discovery criteria** — a skill is affected if it contains:

- Explicit references to the updated documentation file
- Content that covers the same topic or concept as the update
- Inline templates, code examples, or patterns related to the updated guideline
- Instructions or rules that may now be outdated or contradicted by the new
  documentation

**If no skills are affected, skip this step.**

**For each affected skill, determine whether it is local or shared:**

A skill is **shared** if it is a symlink pointing outside the current repo or
was installed by a package manager and has not been modified locally. A skill is
**local** if it was authored or edited in this repo. Symlinks between
`.claude/skills/` and `.agents/skills/` within the same repo are internal
bridges and do not affect this determination.

**Local skills** — edit directly:

- Update the skill's templates, examples, and instructions to align with the
  new documentation

**Shared skills** — report and offer to update:

- Report the affected shared skill and the specific inconsistency to the user
- Ask: "Shared skill `<skill-name>` is affected. Add repo-specific additions?"
- If the user confirms:

  1. Resolve the original shared skill path (the symlink target or CLI cache
     location where the shared skill was installed)

  2. Determine which layer to use:

     **If `.agents/skills/` directory exists:**

     Create or update `.agents/skills/<skill-name>/SKILL.md` with repo-specific
     additions listed **before** the shared skill reference, so local rules take
     priority:

     ```markdown
     ---
     name: <skill-name>
     description: <same description as the shared skill>
     allowed-tools: <same allowed-tools as the shared skill>
     ---

     ## Repo-specific additions

     - <the new convention or guideline>

     ## Shared skill

     Read and follow the shared skill at `<original-shared-skill-path>`.
     ```

     Then ensure `.claude/skills/<skill-name>/SKILL.md` is a symlink to
     `.agents/skills/<skill-name>/SKILL.md`:

     - If it is already a symlink to the correct path, no action needed
     - If it exists as a regular file, delete it and create the symlink
     - If it does not exist, create the symlink

     **If `.agents/skills/` directory does not exist:**

     Create or update `.claude/skills/<skill-name>/SKILL.md` directly with the
     same structure (repo-specific additions before the shared skill reference).

- If the user declines, log the inconsistency in the final confirmation but
  take no action

### 6. Final Confirmation

Report all changes made:

- Documentation file(s) updated
- Skill file(s) updated (if any), with rationale explaining why each skill was
  identified as affected
- Summary of what was added or modified in each file

## Guidelines

- Always read target files before modifying them
- Prefer adding to an existing section over creating a new one
- Keep entries concise; one to two sentences per guideline is ideal
- If the user's input is ambiguous, ask for clarification before writing
- Do not duplicate information that already exists in the target file
- When creating skill files, create the `<skill-name>/` subdirectory if needed
  but do NOT create `.agents/` or `.agents/skills/` directories — only use them
  if they already exist
