---
description: Update workspace catalog dependencies to latest minor/patch versions, with risk-ordered cohorts and validation between checkpoints
argument-hint: natural-language filter and/or "dry run" (e.g. "tooling only", "storybook dry run", "just the slate stack")
---

You are a **Senior DevOps Engineer** tasked with safely updating dependencies in
the `ui-kit` pnpm monorepo. Your mission is to update entries in
`pnpm-workspace.yaml` (`catalog:` and `catalogs.<name>:`) to their latest
**minor and patch versions only** (no major bumps) while preserving build,
type, lint, and test integrity for every publishable package.

This repo publishes `@commercetools-uikit/*` and
`@commercetools-frontend/ui-kit` to npm under a **single fixed version group**
(see `.changeset/config.json` — every bump applies to all). Treat every
runtime dependency change as semver-significant for the published surface.

---

## **Command Arguments**

`$ARGUMENTS` is free-form natural language. Interpret it to decide:

1. **Scope filter** (which catalogs / packages to touch). Examples:
   - empty / `"all"` → update every catalog except `peer` (always frozen)
   - `"tooling"` / `"toolchain"` → `build` + `lint` + `repo`
   - `"storybook"` → only the `storybook` catalog
   - `"jest"` / `"tests"` → only the `test` catalog
   - `"slate"` / `"rich text"` → only the `rich-text` catalog
   - `"react ecosystem"` → only the `react` catalog (peer remains frozen)
   - `"singletons"` / `"default catalog"` → only the unnamed `catalog:` block
   - `"just lodash and qs"` → only those specific deps within the default catalog
2. **Dry run flag** — any occurrence of `"dry run"` / `"dry-run"` /
   `"preview"` / `"don't apply"` activates dry-run mode.

When the filter is ambiguous (e.g. `"react"` could mean the `react` catalog
**or** anything React-bound), restate your interpretation in one line before
proceeding and let the user correct it. Never invent a target — if you cannot
map the request to a real catalog or set of deps in `pnpm-workspace.yaml`,
stop and ask.

**Target Filter:** $ARGUMENTS (defaults to all non-frozen catalogs)

---

## **Execution Strategy**

### **Validation strategy (read this first)**

The whole point of cohort-by-cohort processing is **fast, actionable triage
when something breaks**. You MUST run the full validation suite (`pnpm lint`,
`pnpm lint:css`, `pnpm lint:publint`, `pnpm typecheck`, `pnpm build`,
`pnpm test`, `node scripts/check-workspace-constraints.js`) immediately
after each catalog/cohort is bumped, and **before** moving to the next
cohort. This makes any failure trivially attributable to the cohort that was
just edited — no bisecting required. A failed cohort is rolled back locally
and the run continues with the next one; the failure is recorded in the
final report and PR body. Do NOT batch validation across cohorts.

### **Phase 1: Git Setup & Pre-flight Checks**

1. **Authentication / Permission Check:**

   ```bash
   gh auth status
   gh repo view --json viewerPermission --jq '.viewerPermission'
   ```

   If `READ`, still do the local work but skip push and PR — print the exact
   `git push` and `gh pr create` commands at the end for the user.

2. **Working Tree Check:**

   ```bash
   git status --porcelain
   ```

   If dirty, halt and ask the user to commit or stash. Never proceed on a
   dirty tree — rollbacks rely on a clean baseline.

3. **Branch Creation:**

   ```bash
   git checkout main
   git pull origin main
   git checkout -b housekeeping-$(date +%Y%m%d-%H%M)
   git branch --show-current   # verify
   ```

   Reuse the same timestamp for the changeset filename later. If branch
   creation fails (e.g. duplicate), stop immediately and report — do NOT
   continue on `main`.

4. **Workspace Analysis:**

   - Parse `pnpm-workspace.yaml`. Discover catalogs at runtime — do not
     hard-code names. Today the file contains: the default `catalog:` plus
     `catalogs.build`, `catalogs.lint`, `catalogs.peer`, `catalogs.react`,
     `catalogs.repo`, `catalogs.rich-text`, `catalogs.storybook`,
     `catalogs.test`. If new catalogs appear, treat them per the rules in
     Phase 2.
   - Preserve the **sub-cohort comment groupings** inside each named catalog
     (e.g. `# Babel`, `# Emotion (CSS-in-JS)`, `# Storybook ecosystem`). When
     editing, modify entries in place — never reorder or strip comments.
   - The default `catalog:` is alphabetical. Keep it alphabetical.

### **Phase 2: Dependency Categorization & Risk Ordering**

Catalogs are **upgrade cohorts** — bumping one entry in a named catalog
requires checking compatibility with its siblings. Risk-ordered (safest
first):

#### 🛠 `repo` (Lowest Risk — Update First)

Monorepo plumbing & release tooling. All devDependency-only.

- `@changesets/cli`, `@changesets/changelog-github`,
  `conventional-changelog-cli`
- `@manypkg/cli`, `@manypkg/find-root`, `@manypkg/get-packages`
- `husky`, `lint-staged`, `@commitlint/cli`,
  `@commitlint/config-conventional`
- `@commercetools-frontend/babel-preset-mc-app`,
  `@commercetools-frontend/eslint-config-mc-app` — external commercetools
  shared configs; safe to bump within their major.

#### 🧹 `lint` (Low Risk)

Code-quality enforcers. All devDependency-only. **Bump prettier within `2.x`
only** — the `peer` catalog pins `prettier: '2.x'` because consumers rely on
prettier 2 output formatting; never break that contract from housekeeping.

#### 🧪 `test` (Low Risk)

Jest core (`30.x`), `jest-environment-jsdom`, `@testing-library/*`,
`@percy/*`, `puppeteer`, `pptr-testing-library`. Jest runs through several
specialized runners here (`jest-runner-eslint`, `jest-runner-stylelint`) so
verify these still load after a bump.

#### 📚 `storybook` (Low Risk, Strict Lockstep)

**All `storybook` + `@storybook/*` entries MUST be the exact same version.**
The catalog comment already states this. If `storybook@9.1.20 → 9.1.21`,
every `@storybook/*` entry in the catalog moves to `9.1.21` together —
no partial bumps. Includes `eslint-plugin-storybook` which is also pinned
to the storybook version.

#### 📦 default `catalog:` (Medium Risk)

Singleton utilities (`lodash`, `qs`, `dompurify`, `glob`, `moment-timezone`,
etc.). Members are independent and safe to bump individually. Keep
alphabetical order intact. Note: `lodash: 4.18.1` already exceeds public
`4.17.x` releases because of an internal override — don't try to "fix" the
version downward.

#### 🏗 `build` (Medium-High Risk — Affects Runtime)

Compile/bundle/style toolchain consumed by published packages at build time
**and** as peer/runtime deps in some cases:

- **Babel** (`@babel/core`, `@babel/runtime`, `@babel/runtime-corejs3`) —
  `@babel/runtime*` ships in published bundles via preconstruct; treat
  bumps as runtime-affecting.
- **Emotion** (`@emotion/react`, `@emotion/styled`, `@emotion/css`,
  `@emotion/is-prop-valid`, `@swc/plugin-emotion`) — `@emotion/react` is a
  **peer dep** of every published component. Bump only within the major
  the consumer compatibility allows; if `@emotion/react: ^11.10.5` would
  bump to `12.x`, halt and classify as manual.
- **SVGR** (`@svgr/*`) — code-gen pipeline for icons.
- **Vite** (`vite`, `@vitejs/plugin-react`, `@vitejs/plugin-react-swc`,
  `@modyfi/vite-plugin-yaml`) — used by `storybook` and `visual-testing-app`.
- **PostCSS** (`postcss`, `postcss-styled-syntax`, `postcss-syntax`,
  `postcss-value-parser`).
- **TypeScript** (`typescript`, `ts-node`, `tsc-files`) — TS major moves
  are breaking for consumers (peer is `'5.x'`); bump only within `5.x`.
- **Output / bundling** (`@preconstruct/cli`, `browserslist`,
  `bundlewatch`).

#### ✍️ `rich-text` (High Risk — Tight Cohort)

The Slate + remark + unified stack is **deeply interlinked**. Even minor
version drift between `slate`, `slate-history`, `slate-react`,
`slate-hyperscript` will break the editor. Move the four `slate*` entries
together. Move the `remark-*` entries together. Move the `unified` /
`vfile` family together. If any sibling lacks a compatible minor bump,
classify the whole sub-cohort as manual rather than partial-bumping.

`remark-gfm-v1: 'npm:remark-gfm@1.0.0'` is intentionally pinned to an old
version under an alias — **do not bump it**.

#### ⚛️ `react` (Highest Risk — Consumer-Facing)

Runtime React stack, formatjs, React-bound utilities.

- **React core** (`react`, `react-dom`, `react-is`, `@types/react*`):
  bumping within `19.x` is allowed because the `peer` catalog declares
  `react: '19.x'` / `react-dom: '19.x'`. **Never** bump out of `19.x` from
  housekeeping — that's a coordinated major release.
- **React Router 5.x** (`react-router`, `react-router-dom`,
  `@types/react-router-dom`): the `peer` catalog pins
  `react-router-dom: '5.x'`. Legacy. Do not bump to 6.x. Treat as frozen
  at major.
- **formatjs** (`@formatjs/cli`, `@formatjs/intl-relativetimeformat`,
  `babel-plugin-formatjs`, `intl-pluralrules`, `react-intl`): the `peer`
  catalog pins `react-intl: '7.x'`. Move within major only.
- **React-bound utilities** (`@hello-pangea/dnd`,
  `@radix-ui/react-popover`, `downshift`, `formik`, `prop-types`,
  `react-docgen`, `react-from-dom`, `react-select`,
  `react-textarea-autosize`, `react-value`): safe to bump within major.
  Note `react-from-dom: 0.7.3` in catalog vs `react-from-dom: 0.6.2`
  override — leave the override alone.

#### 🔒 `peer` (FROZEN — NEVER UPDATE)

`catalogs.peer` declares consumer compatibility ranges (`react: '19.x'`,
`react-intl: '7.x'`, `react-router-dom: '5.x'`, `prettier: '2.x'`,
`typescript: '5.x'`, `moment: '2.x'`, `moment-timezone: '0.6.x'`). These
are deliberate consumer-facing decisions. Bumping them changes who can
install our packages. **Housekeeping MUST NOT touch any entry in the
`peer` catalog.** If a non-peer catalog bump would require widening a peer
range, halt and classify as manual.

### **Phase 3: Progressive Updates with Safety Checks**

For each catalog in the filter, in the risk order above:

1. **Fetch Latest Versions** (skip catalogs the filter excluded):

   ```bash
   pnpm view <package-name> versions --json
   ```

   Use `versions` (plural) so you can pick the latest minor/patch within the
   current major rather than blindly taking `latest` (which may have crossed
   a major).

2. **Version Comparison Rules:**

   - You MUST only update to the latest minor/patch within the **current
     major**. No major bumps.
   - You MUST respect any `peer` catalog range for the same dep (e.g.
     `react: '19.x'` in peer means `react` in the `react` catalog stays
     in `19.x`).
   - You MUST NOT bump entries in the `peer` catalog.
   - You MUST NOT bump `remark-gfm-v1` (intentionally aliased to `1.0.0`).
   - For named catalogs marked as cohorts (`storybook`, `rich-text`),
     either move every required sibling together or skip the cohort.
   - If a bump would require widening a peer range, classify as **manual**
     and skip.

3. **Update Workspace Catalog:**

   - Edit `pnpm-workspace.yaml` in place. **Never** edit a workspace
     `package.json` for a catalog-managed dep — `scripts/check-workspace-constraints.js`
     will reject it, and our CI runs that check.
   - Preserve sub-cohort comments and blank-line groupings. Don't
     reorder named-catalog entries. Keep the default catalog alphabetical.

4. **Install & Validate (run after EVERY cohort, before moving on):**

   This is the single atomic gate per cohort. Run all of these in order
   immediately after the cohort's edits — never carry a cohort forward
   without a green validation run. If anything fails, you know exactly
   which cohort caused it.

   ```bash
   pnpm install
   node scripts/check-workspace-constraints.js   # catalog references intact
   pnpm lint              # jest-runner-eslint
   pnpm lint:css          # jest-runner-stylelint
   pnpm lint:publint      # scripts/check-publint.js
   pnpm typecheck         # tsc --noEmit --skipLibCheck
   pnpm build             # codegen + preconstruct build
   pnpm test              # jest --projects jest.{ts-test,test}.config.js
   ```

   `pnpm test:bundle` (bundlewatch) needs a token — skip locally if absent
   and rely on CI; mention this in the PR body.

   If any step fails, **rollback this cohort** (see Phase 6 below), log
   which step failed plus the relevant error excerpt, and continue with
   the next cohort. Do not abandon the whole run for one cohort's failure
   unless the rollback itself fails. The whole reason for the per-cohort
   gate is that any failure is unambiguously attributable to the cohort
   that just changed — preserve that property.

5. **Safety Checkpoint:**

   After a cohort's full validation passes, create a checkpoint commit:

   ```bash
   git add pnpm-workspace.yaml pnpm-lock.yaml
   git commit -m "chore(deps): update <catalog-name> catalog"
   ```

   Use the exact catalog name as the scope (`chore(deps): update build`,
   `chore(deps): update storybook`, etc.). If multiple unrelated default-
   catalog singletons were bumped in one cohort, `chore(deps): update
default catalog` is fine.

### **Phase 4: Final Verification**

After all cohorts in the filter are processed:

```bash
pnpm install                  # confirm lockfile is consistent
pnpm build                    # full build including codegen
pnpm test                     # complete suite
node scripts/check-workspace-constraints.js
```

If any final step fails despite per-cohort validation having passed, fall
back to the last good checkpoint commit and stop. Investigate the
interaction between cohorts before retrying.

### **Phase 5: Changeset (Required When Published Packages Are Affected)**

This repo uses [changesets](https://github.com/changesets/changesets) with
a **fixed version group**: `@commercetools-frontend/*` and
`@commercetools-uikit/*` always release in lockstep.

**When to create a changeset:**

- If any updated dep is consumed (as `dependencies` or `peerDependencies`,
  **not** just `devDependencies`) by a publishable workspace package
  (anything in `packages/**` that lacks `"private": true` in its
  `package.json`), you MUST create a changeset.
- Catalogs that almost always require changesets: `react`, `build` (via
  `@babel/runtime*` and Emotion), `rich-text`, and any default-catalog
  entry that's a runtime dep.
- Catalogs that typically do NOT require changesets: `repo`, `lint`,
  `test`, `storybook` — devDeps only. Verify by checking whether any
  publishable package lists the updated dep outside `devDependencies`.

**How to create the changeset:**

Reuse the branch timestamp so branch and changeset always correspond:

```bash
# Branch: housekeeping-20260519-1430  →  Changeset:
.changeset/housekeeping-deps-20260519-1430.md
```

Because of the fixed-version group, you only need to list **one** member;
the rest follow. Pick `@commercetools-frontend/ui-kit` (the all-in-one
preset) as the canonical listing:

```markdown
---
'@commercetools-frontend/ui-kit': patch
---

Update <catalog> dependencies: <key packages and version bumps>
```

Always use `patch` — minor/patch dependency bumps are backward compatible
by definition for this command. If a bump genuinely warrants `minor`
(e.g. it surfaces a new public API), the user should escalate it out of
housekeeping into a feature PR.

Commit the changeset together with the final cohort:

```bash
git add .changeset/housekeeping-deps-*.md
git commit -m "chore(deps): add housekeeping changeset"
```

### **Phase 6: Per-Cohort Rollback Procedure**

If a cohort's validation fails:

1. Restore the catalog block from git:

   ```bash
   git checkout HEAD -- pnpm-workspace.yaml pnpm-lock.yaml
   pnpm install
   ```

2. If a mid-cohort commit was already made (rare — should not happen with
   the per-cohort flow), reset to the previous checkpoint:

   ```bash
   git reset --hard HEAD~1
   ```

3. Record the cohort as **failed** in the final report — do NOT silently
   skip it.

4. Continue to the next cohort. A failed cohort does not abort the run.

### **Phase 7: Push & Pull Request**

1. **Confirm with user before pushing:**

   ```
   Cohorts processed: <list>
   Updated: <N> packages
   Failed cohorts: <list or "none">
   Push branch and open PR? (y/n)
   ```

2. **Push:**

   ```bash
   git push -u origin housekeeping-$(date +%Y%m%d-%H%M)
   ```

3. **PR (use the timestamp from the branch, not `date` recomputed):**

   Replace all bracketed placeholders before creating the PR.

   ```bash
   gh pr create \
     --title "chore(deps): housekeeping — update workspace catalog dependencies" \
     --body "$(cat <<'EOF'
   ## Summary

   This PR bumps workspace catalog dependencies in `pnpm-workspace.yaml` to their latest minor and patch versions, processed in risk-ordered cohorts with per-cohort validation.

   ## 📦 Updates by Catalog

   ### 🛠 `repo`
   - [package]: [old] → [new]

   ### 🧹 `lint`
   - [package]: [old] → [new]

   ### 🧪 `test`
   - [package]: [old] → [new]

   ### 📚 `storybook` (moved in lockstep)
   - storybook + @storybook/*: [old] → [new]

   ### 📦 default `catalog:`
   - [package]: [old] → [new]

   ### 🏗 `build`
   - [package]: [old] → [new]

   ### ✍️ `rich-text`
   - [package]: [old] → [new]

   ### ⚛️ `react`
   - [package]: [old] → [new]

   ## 🔒 Frozen / Skipped

   - `catalogs.peer` — consumer compatibility ranges, never bumped from housekeeping
   - `remark-gfm-v1` — intentionally pinned to aliased 1.0.0
   - Cross-major bumps available but not applied: [list, or "none"]

   ## ⚠️ Failed Cohorts

   [List any cohorts whose validation failed and were rolled back. Include the failing step (lint / typecheck / build / test) and the relevant error excerpt. Omit this section if all cohorts passed.]

   ## 🧪 Validation

   - ✅ `pnpm lint`
   - ✅ `pnpm lint:css`
   - ✅ `pnpm lint:publint`
   - ✅ `pnpm typecheck`
   - ✅ `pnpm build`
   - ✅ `pnpm test`
   - ✅ `node scripts/check-workspace-constraints.js`
   - ⏭ `pnpm test:bundle` — deferred to CI (requires BundleWatch token)

   ## 📝 Changeset

   [`@commercetools-frontend/ui-kit: patch` — included] / [No publishable packages affected — no changeset needed]

   ## 🔍 Review Notes

   1. Bumps are patch/minor only — no major version changes.
   2. `peer` catalog untouched: consumer compatibility ranges remain stable.
   3. Storybook and rich-text cohorts moved in lockstep where bumped.
   4. Fixed version group means a single changeset covers every publishable package.
   EOF
   )"
   ```

4. **If `viewerPermission` was `READ` (Phase 1)**, skip the push and PR.
   Print the exact `git push` and `gh pr create` commands for the user to
   run manually and stop.

---

## **Dry Run Mode**

Activated by any of `"dry run"`, `"dry-run"`, `"preview"`, or
`"don't apply"` in `$ARGUMENTS`. When active:

- Run all of Phase 1 (branch is still useful as a planning artifact — but
  you MAY skip branch creation if the user prefers; ask).
- Run Phase 2 analysis and Phase 3 step 1 (version fetching) fully.
- For each catalog, print the proposed bump list (current → target) and
  the predicted classification (auto / manual / frozen).
- Do **not** edit `pnpm-workspace.yaml`, do not run `pnpm install`, do not
  commit, do not push, do not create a PR.

---

## **Example Output**

```
🧹 HOUSEKEEPING — ui-kit catalog updates

✅ Pre-flight: clean tree, branch housekeeping-20260519-1430 created
📦 Analyzing catalogs in pnpm-workspace.yaml
   default     → 12 singletons
   build       → 24 entries
   lint        → 8 entries
   peer        → 7 entries (FROZEN, skipped)
   react       → 18 entries
   repo        → 11 entries
   rich-text   → 13 entries
   storybook   → 5 entries (lockstep)
   test        → 17 entries

🛠 repo (11 pkgs, 3 bumps):
   @changesets/cli: 2.29.7 → 2.29.8
   husky: 9.1.7 → 9.2.0
   @manypkg/cli: 0.25.1 → 0.25.2
   ✅ lint / typecheck / build / test passed
   ✅ checkpoint commit: chore(deps): update repo

🧹 lint (8 pkgs, 1 bump):
   eslint: 9.18.0 → 9.20.1
   ✅ checkpoint commit: chore(deps): update lint

🧪 test (17 pkgs, 4 bumps):
   jest: 30.3.0 → 30.4.1
   @testing-library/dom: 10.4.0 → 10.5.0
   …
   ✅ checkpoint commit: chore(deps): update test

📚 storybook (5 pkgs, lockstep): 9.1.20 → 9.1.21
   ✅ checkpoint commit: chore(deps): update storybook

📦 default catalog (12 pkgs, 2 bumps):
   lodash: 4.18.1 → 4.18.2
   yaml: 2.8.3 → 2.8.4
   ✅ checkpoint commit: chore(deps): update default catalog

🏗 build (24 pkgs, 5 bumps): typescript 5.9.3 → 5.9.4, vite 6.4.2 → 6.4.3, …
   ✅ checkpoint commit: chore(deps): update build

✍️ rich-text (13 pkgs): no internally-consistent bumps available — skipped

⚛️ react (18 pkgs, 3 bumps):
   react-intl: 7.1.4 → 7.1.10
   downshift: 9.0.10 → 9.0.11
   formik: 2.4.6 → 2.4.7
   ⏸ react / react-dom — already at 19.2.0, latest in 19.x
   ✅ checkpoint commit: chore(deps): update react

📝 Changeset: .changeset/housekeeping-deps-20260519-1430.md
   '@commercetools-frontend/ui-kit': patch (fixed group propagates)

✅ Final verification: build, test, workspace constraints all pass

📊 SUMMARY
   - 15 packages updated across 7 cohorts
   - 1 cohort skipped (rich-text — no consistent cohort bump)
   - 0 cohorts failed
   - peer catalog frozen as designed
   - PR ready for review
```

---

## **RFC 2119 Key Words**

- **MUST** / **REQUIRED** / **SHALL** — Absolute requirement
- **MUST NOT** / **SHALL NOT** — Absolute prohibition
- **SHOULD** / **RECOMMENDED** — Default unless valid reason not to
- **SHOULD NOT** / **NOT RECOMMENDED** — Avoid unless valid reason
- **MAY** / **OPTIONAL** — Truly optional

---

## **Important Constraints**

- You MUST verify GitHub CLI auth and viewer permission before pushing.
- You MUST start from a clean working tree on `main`.
- You MUST create the `housekeeping-YYYYMMDD-HHMM` branch successfully
  before any edits — abort if branch creation fails.
- You MUST NOT update any entry in `catalogs.peer` from this command.
- You MUST NOT bump `remark-gfm-v1` (aliased pin).
- You MUST NOT bump beyond the current major for any dep.
- You MUST move `storybook` + `@storybook/*` entries together as one
  version, and you MUST move `rich-text` sub-cohorts (slate, remark,
  unified/vfile) together or not at all.
- You MUST edit catalog entries in `pnpm-workspace.yaml` directly — never
  bump a catalog-managed dep via `pnpm update` against a workspace
  `package.json`. `scripts/check-workspace-constraints.js` will reject it.
- You MUST run `pnpm lint`, `pnpm lint:css`, `pnpm lint:publint`,
  `pnpm typecheck`, `pnpm build`, `pnpm test`, and
  `node scripts/check-workspace-constraints.js` per cohort and again at
  the end.
- You MUST rollback a cohort's edits if its validation fails, then
  continue with the next cohort. A single failed cohort MUST NOT abort
  the whole run.
- You MUST add a `patch` changeset listing
  `@commercetools-frontend/ui-kit` whenever any runtime / peer dep of a
  publishable package is bumped. The fixed version group propagates.
- You MUST ask the user before pushing and before creating the PR.
- You SHOULD preserve sub-cohort comment groupings and blank lines inside
  named catalogs. The default `catalog:` SHOULD remain alphabetical.
- You SHOULD interpret `$ARGUMENTS` as natural language and restate your
  scope interpretation in one line before proceeding when the request is
  ambiguous.

---

**Remember:** Safety first. Validate after every cohort. Roll back early
and locally rather than carrying a broken cohort into a later one. The
fixed version group means one bad bump can affect every published package.
