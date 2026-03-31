---
name: pr-review-navigator
description: Generate AI-assisted navigation aids to help humans start reviewing a pull request more efficiently.
disable-model-invocation: false
argument-hint: '[pr-number] [--comment]'
allowed-tools: Bash, Grep, Glob, Read
---

# PR Review Navigator

Generate navigation aids to help humans review pull requests more efficiently. Provides orientation and structure, not pre-review or judgment.

**Important constraints:**

- No interpretation of business intent or purpose, only factual descriptions of what changed

## Arguments

- `pr-number` (required): The PR number to review
- `--comment` (optional): Post the navigator output as a PR comment. If omitted, write to a local markdown file.

## Process

### 1. Fetch PR Information

```bash
gh pr view $ARGUMENTS --json title,body,files,additions,deletions,url
```

Extract: changed files, additions/deletions count, PR URL for link construction.

For commits/branches without a PR, use `git show --name-status` and `git diff`.

### 2. Fetch the Diff

```bash
gh pr diff <pr-number>
```

Understand file contents and relationships from the diff.

### 3. Analyze Dependencies

Read imports/references in the diff to determine which files depend on which.

### 4. Determine Review Order

Based on dependency flow, use outside-in ordering:

1. API endpoints, HTTP routes, GraphQL resolvers
2. Service/business logic layer
3. Repository/persistence layer
4. Data models/entities
5. Wiring/configuration
6. Unit tests (after the implementation files they test)
7. Cornichon/integration tests last (they test the full stack from outside)

### 5. Generate Mermaid Diagram

Create a `flowchart TB` showing:

- All changed files as nodes with circled numbers: ①, ②, ③, etc.
- Dependency relationships (arrows showing "depends on" or "uses")
- Test files connected to implementation files they test
- Subgraphs grouped by architectural layer
- Color coding: unit tests green (`fill:#e8f5e9`), integration tests blue (`fill:#e3f2fd`, dashed border)

Node format: `["① filename.ext<br/><i>one-liner</i>"]`

**Cornichon test styling:**

```mermaid
subgraph "🧪 Integration Tests (Cornichon)"
    style IntegrationTests fill:#e3f2fd,stroke:#1976d2,stroke-width:2px,stroke-dasharray: 5 5
    ...
end
```

### 6. Create Review Table

A numbered table with columns:

- `#` - Review order number
- `File` - Filename (short, without full path)
- `What it does` - One factual sentence about what the file contains/does
- `Link` - Anchor link to the file in the PR

### 7. Construct File Links

GitHub uses SHA256 hashes of file paths for PR file anchors:

```bash
hash=$(echo -n "<filepath>" | shasum -a 256 | cut -d' ' -f1)
# Link: https://github.com/{owner}/{repo}/pull/{number}/files#diff-{hash}
```

Use the file path exactly as returned by `gh pr view --json files`. Compute the hash for each file.

For commits/branches without a PR, omit the Link column.

### 8. Output the Result

If `--comment` flag is provided, post as a PR comment:

```bash
gh pr comment <pr-number> --body "<content>"
```

If `--comment` is NOT provided, write to `pr-review-navigator.md` in the workspace root and inform the user of the file path.

## Output Format

The output (whether file or comment) should be valid markdown structured as:

```markdown
## AI Review Navigator

**Summary:** <one factual sentence about what was added/changed/removed>

---

### File Relationships & Review Order

\`\`\`mermaid
flowchart TB
subgraph "1️⃣ API Layer"
A["① FeatureXController.scala<br/><i>HTTP endpoints</i>"]
end

    subgraph "2️⃣ Service Layer"
        B["② FeatureXService.scala<br/><i>Business logic</i>"]
    end

    subgraph "3️⃣ Unit Tests"
        C["③ FeatureXServiceSpec.scala"]
    end

    subgraph IntegrationTests ["🧪 Integration Tests (Cornichon)"]
        D["④ FeatureXFeature.scala"]
    end

    A --> B
    B -.->|tested by| C
    A -.->|tested by| D

    style C fill:#e8f5e9
    style IntegrationTests fill:#e3f2fd,stroke:#1976d2,stroke-width:2px,stroke-dasharray: 5 5

\`\`\`

---

### Suggested Review Order

| #   | File                        | What it does                 | Link         |
| --- | --------------------------- | ---------------------------- | ------------ |
| 1   | `FeatureXController.scala`  | HTTP endpoints for FeatureX  | [View](link) |
| 2   | `FeatureXService.scala`     | Business logic               | [View](link) |
| 3   | `FeatureXServiceSpec.scala` | Unit tests for service layer | [View](link) |
| 4   | `FeatureXFeature.scala`     | Cornichon integration tests  | [View](link) |
```

**Summary rules:**

- State only facts about what changed
- Do NOT interpret purpose, intent, or business value
- Do NOT use phrases like "optimized for", "designed to", "intended for"

## Guidelines

- This skill assists with review orientation only. The human reviewer makes all judgments about code quality, correctness, and approval.
- If the PR is too large (>30 files), suggest reviewing in logical chunks.
- Wrap the mermaid diagram in triple backticks with `mermaid` language identifier so GitHub renders it as a diagram.
