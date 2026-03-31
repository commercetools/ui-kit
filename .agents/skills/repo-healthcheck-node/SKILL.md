---
name: repo-healthcheck-node
description: Verify a Node.js/TypeScript repo's development environment is correctly set up. Checks Node.js version, pnpm version, dependency installation, and build success. Use when onboarding, troubleshooting CI failures, or verifying a fresh clone.
disable-model-invocation: false
argument-hint: '[--fix]'
allowed-tools: Bash, Grep, Glob, Read
---

# Repo Healthcheck — Node.js

Verify that a Node.js/TypeScript repository's development environment is
correctly set up. Reads `AGENTS.md` and `CLAUDE.md` (if present) for
repo-specific version requirements and build commands, then runs each check and
reports a clear pass/fail summary.

## Arguments

- `--fix` (optional): Attempt to auto-fix failures where possible (e.g. run
  `pnpm install` if dependencies are missing). Without this flag, the skill
  only reports — it does not modify the environment.

## Process

### 1. Read Repo Configuration

Read the following sources in priority order (later sources override earlier):

1. `AGENTS.md` — repo-specific commands and version requirements
2. `CLAUDE.md` (if present) — may contain additional or overriding requirements
3. `.nvmrc` or `.node-version` (if present) — authoritative Node.js version
4. `package.json` `engines` field — authoritative pnpm/node version constraints

Look for:

- **Expected Node.js version** — check `.nvmrc` / `.node-version` first, then
  `package.json` `engines.node`, then patterns in `AGENTS.md`/`CLAUDE.md` like
  `node 24`, `node: 24.13`, or explicit version statements.
- **Expected pnpm version** — check `package.json` `engines.pnpm` first, then
  patterns in `AGENTS.md`/`CLAUDE.md` like `pnpm 10`, `pnpm: 10.29.3`, or
  explicit version statements.
- **Install command** — default `pnpm install`. Override if the docs specify a
  different command (e.g. `pnpm install --frozen-lockfile`).
- **Build command** — default `pnpm build`. Override if the docs specify
  something different (e.g. `pnpm build:packages`, `pnpm run compile`).

If no version or command overrides are found, use the defaults and note that
expectations came from defaults, not from repo configuration.

### 2. Run Checks

Run each check in order. Capture the result (pass/fail), the actual value, and
the required value for the summary table.

**Critical checks** are Node.js and pnpm version. If either critical check
fails, you MUST skip the dependent checks (install and build) and note the
reason in the output.

#### Check 1 — Node.js Version

```bash
node --version
```

- If an expected version was found: compare using prefix matching (see
  Guidelines). Pass if they match; fail with actual vs expected.
- If no expected version was found: report the installed version as
  informational (no pass/fail judgment).
- Fix command (if `--fix` and failing): `nvm install` (reads from `.nvmrc`
  automatically, if present).

#### Check 2 — pnpm Version

```bash
pnpm --version
```

- If pnpm is not installed: MUST skip checks 3 and 4, report as missing.
- If an expected version was found: compare using prefix matching (see
  Guidelines). Pass if they match; fail with actual vs expected.
- If no expected version was found: report the installed version as
  informational (no pass/fail judgment).
- Fix command (if `--fix` and failing): `npm install -g pnpm@latest`.

#### Check 3 — Dependency Installation

Only run if checks 1 and 2 did not produce critical failures.

Use the install command from step 1 (default: `pnpm install`).

```bash
pnpm install 2>&1
```

- Pass if exit code is 0.
- Fail with the last 20 lines of output if exit code is non-zero.
- If `--fix` was passed and the default frozen-lockfile variant failed, retry
  without `--frozen-lockfile` and report whether the retry succeeded.

#### Check 4 — Build

Only run if check 3 passed.

Run the build command from step 1 (default: `pnpm build`).

- Pass if exit code is 0.
- Fail with the last 30 lines of output if exit code is non-zero.

### 3. Report Results

Output a summary table showing actual version vs required version for each
check:

```markdown
## 🏥 Repo Healthcheck — Node.js

| Check             | Status                     |
| ----------------- | -------------------------- |
| Node.js >= 24.0.0 | ✅ v24.13.0                |
| pnpm >= 10.0.0    | ✅ v10.29.3                |
| pnpm install      | ✅                         |
| Build             | ❌ Exit code 1 (see below) |
```

Status format:

- Pass with version: `✅ vX.X.X`
- Pass without version: `✅`
- Fail with version mismatch: `❌ vX.X.X (requires >= Y.Y)`
- Fail with error: `❌ <short reason>`
- Skipped: `⏭ Skipped (Node.js check failed)`
- Informational (no expected version): `ℹ vX.X.X`

Follow the table with the full output for any failed checks so the user can
diagnose the issue.

#### Issues Found

If any checks failed, add an Issues Found section with copy-pasteable fix
commands:

```markdown
### ❌ Issues Found

- **Node.js**: Run `nvm install` to install the required version
- **Build**: Run `pnpm build` and review the output above
```

#### Success

If ALL checks pass, add a success message with next steps:

```markdown
### ✅ All Systems Go!

Environment is ready. Start the dev server with:

\`\`\`bash
pnpm start
\`\`\`
```

## Guidelines

- You MUST read `AGENTS.md` and `CLAUDE.md` before running any checks — repo
  configuration takes precedence over defaults.
- You MUST always show the full results table even if some checks fail.
- You MUST skip install and build checks if a critical check (Node.js or pnpm)
  fails, since those checks depend on correct tooling.
- You SHOULD provide clear, copy-pasteable fix commands for any failures.
- Version comparison is prefix-based: if the expected version is `24`, match
  any `24.x.y`; if the expected version is `24.13`, match any `24.13.y`.
- Do not fail a version check when no expected version is found — report
  informational only.
- Only use `--fix` behaviour when the flag is explicitly passed.
- Keep output concise: show only the last N lines of command output on failure,
  not the full log.

## RFC 2119 Key Words

- **MUST** / **REQUIRED** — Absolute requirement
- **MUST NOT** — Absolute prohibition
- **SHOULD** / **RECOMMENDED** — Should do unless there is a valid reason not to
- **MAY** / **OPTIONAL** — Truly optional
