---
name: renovate-review
description: Review Renovate dependency upgrade PRs to assess safety and effort. Use when reviewing PRs from Renovate bot that update NPM dependencies.
disable-model-invocation: false
argument-hint: '[pr-number] [--comment]'
allowed-tools: Bash, Grep, Glob, Read, WebFetch
---

# Renovate Dependency Upgrade Review

Review a Renovate PR to assess the safety and effort required to merge a dependency upgrade.

## Arguments

- `pr-number` (required): The PR number to review
- `--comment` (optional): Post the assessment as a PR comment. If omitted, only output the review locally.

## Process

### 1. Gather PR Information

```bash
gh pr view $ARGUMENTS --json title,body,files
```

Extract the following information:

- Package name being upgraded
- Previous version and new version
- Determine upgrade type: **patch**, **minor**, or **major**

### 2. Analyze Upgrade Type

#### Semantic Versioning

We assume packages follow Semantic Versioning. Fix and minor should contain no breaking changes per semver

In all cases you must:

- Focus on verifying the upgrade doesn't introduce regressions
- Check if CI passes

#### Major Upgrades

1. Research breaking changes by:

   - Fetching the GitHub releases page: `https://github.com/<owner>/<repo>/releases`
   - Looking for a CHANGELOG.md in the repository
   - Checking the package's migration guide if available

2. Identify which breaking changes may affect this codebase

### 3. Analyze Codebase Impact

Search for usage of the upgraded package:

1. Find imports/requires of the package
2. Identify which files and features depend on it
3. For major upgrades: check if any deprecated/removed APIs are used

### 4. Generate Safety Assessment

Create a markdown comment with the following structure:

```markdown
## Dependency Upgrade Review: `<package-name>`

<!-- For High risk only, add at the top: -->

> [!CAUTION]
> Breaking changes affect this codebase. Code changes required before merge.

<!-- For Medium risk only, add at the top: -->

> [!WARNING]
> Major upgrade with breaking changes. Review recommended.

`<old>` → `<new>` (**patch** / **minor** / **major**)

**Risk:** Low / Medium / High
**Impact:** <count> files
**Recommendation:** Safe to merge / Review recommended / Changes required

<one-line explanation>

<details>
<summary>Affected files</summary>

- `path/to/file.ts`
- ...

</details>

<!-- For major upgrades only: -->
<details>
<summary>Breaking changes</summary>

- <breaking change 1>
- <breaking change 2>

</details>

<details>
<summary>Required code changes</summary>

- <change 1>
- <change 2>

<!-- Or "None" if no changes needed -->

</details>
```

### 5. Post the Comment (if `--comment` flag provided)

Only post the comment to the PR if the `--comment` flag was included in the arguments.

If `--comment` is provided:

```bash
gh pr comment <pr-number> --body "<assessment>"
```

If `--comment` is NOT provided, skip this step and only display the assessment locally.

## Rating Guidelines

**Risk:**

- Low: Patch/minor upgrade, or major with no relevant breaking changes
- Medium: Major upgrade with breaking changes that don't affect current usage
- High: Major upgrade with breaking changes that affect current usage

**Impact:**

- Low: < 5 files, simple usage patterns
- Medium: 5-20 files, moderate complexity
- High: > 20 files, or critical infrastructure dependency

**Recommendation:**

- Safe to merge: CI passes, no breaking changes affect us
- Review recommended: Minor concerns, human review advised
- Changes required: Code modifications needed before merge
