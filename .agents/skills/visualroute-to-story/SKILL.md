---
name: visualroute-to-story
description: Convert a ui-kit Percy `*.visualroute.jsx` file into a CSF3 Storybook story for Chromatic visual regression testing. Use when migrating ui-kit from Percy to Chromatic, or when converting a remaining visual route.
argument-hint: '<component-name|visualroute-file|directory> [--dry-run] [--no-snapshots]'
allowed-tools: Bash, Grep, Glob, Read, Edit, Write
scope:
  - mc-foundation-team
  - migration
---

# Visualroute to Story

Convert ui-kit's Percy visual routes (`*.visualroute.jsx` + companion
`*.visualspec.js`) into CSF3 Storybook stories that Chromatic can snapshot.

Scoped to **ui-kit only** (77 route files). Migration tooling with a bounded
life: its input is deleted when Percy is decommissioned, and this skill goes with
it. The ongoing "add VRT to a new component" tool is separate and later, built on
conventions this migration settles.

## Arguments

- `component-name|visualroute-file|directory` (required): a bare component name
  (`primary-button`), a single `*.visualroute.jsx`, or a directory to convert
  every route file underneath.
- `--dry-run` (optional): print the conversion plan and the story file that
  _would_ be written, without writing anything.
- `--no-snapshots` (optional): write the stories without opting them into
  Chromatic capture. **Snapshots are on by default**; a generated story exists to
  be screenshotted, and one that is not captured carries no coverage. See
  [step 2](#2-repo-conventions).

## Scope and exclusions

**Convert parity only.** A story is parity when its `percySnapshot` call is live,
which the plan reports as `hasNoLiveBaseline: false`. Skip the rest: those calls
are commented out, so no baseline exists and generating them would be a coverage
_increase_, not a migration. The list is in the planning doc.

Two route files are excluded outright, and the six `*-open` routes have no parity
work: their only story is deferred.

**`icons` is the one orphan.** Its plan includes an `AllVariants` story for the
bare `/icons` route, which the spec never visits. `hasNoLiveBaseline` reads
`false` only because no segment matched. Skip it.

**Excluded: `rich-text-input.visualroute.jsx`.** Zero live snapshots, 41
interaction call sites. A behavioral test living in the VRT folder; converting it
invents coverage that never existed.

**Excluded: `design-system/src/theme-provider.visualroute.jsx`.** `ThemeProvider`
returns `null` and works via `target.style.setProperty()` in a `useLayoutEffect`,
so every visible pixel comes from Percy-only scaffolding. A primitive with no
painted surface gets no VRT. Replaced by a DOM test.

## What this skill does not do

- **It does not delete Percy files.** Removing `*.visualroute.*`,
  `*.visualspec.*`, `visual-testing-app/` and Percy deps is the teardown step,
  gated on parity sign-off.
- **It does not finish play functions.** It scaffolds them from the puppeteer
  calls in the visualspec; the interaction sequence needs review.

## Process

### 1. Parse inputs

From `$ARGUMENTS`: first positional is the target (required; print usage and stop
if absent). `--dry-run` and `--no-snapshots` are booleans, both default false.

Resolve the target in this order:

1. **An existing path** — use it as given, whether a file or a directory.
2. **Otherwise a component name.** Find the route file by exact basename:

   ```bash
   find . -name '<name>.visualroute.*' -not -path '*/node_modules/*'
   ```

   All 77 basenames are unique, so exactly one match is the normal case. Exact
   basename matching is what keeps `date-input` off `date-input-open` and
   `select-input` off `async-select-input`; do not substring-match.

3. **Two or more exact matches** — list them and ask which.
4. **Zero exact matches** — widen once before giving up, because a partial name is
   the likely intent (`button` meaning one of five, `buttons` meaning the family).
   Match the name against route filenames **and** against directory names, but
   report only real route files, so empty directories like
   `buttons/accessible-button/` never reach the user:

   ```bash
   { find . -name '*<name>*.visualroute.*' -not -path '*/node_modules/*'
     find . -type d -name '*<name>*' -not -path '*/node_modules/*' \
       -exec find {} -name '*.visualroute.*' \; 2>/dev/null
   } | sort -u
   ```

   List the hits and ask which, offering "all of them" when they share a parent.
   Never pick one silently. If this finds nothing either, say so and stop; do not
   guess at a near-miss.

If the target is or contains `rich-text-input.visualroute.jsx` or
`theme-provider.visualroute.jsx`, skip it and say so.

### 2. Repo conventions

Everything a generated story depends on is already in place: the `VisualSpec`
helpers, the Intl and theme decorators, the padding decorator, and
`disableSnapshot: true` as the project default in `preview.tsx`. Nothing to set
up. Where output goes and what the story must carry is in
[resources/conversion-recipe.md](resources/conversion-recipe.md#where-the-output-goes).

**Light theme only.** No `chromatic.modes` anywhere, in `meta` or per story.
Modes capture a story under different _global_ settings, whereas the route files
that use `LocalThemeProvider` are testing several themed scopes coexisting in one
DOM. That is the component's own behavior and it captures correctly in a single
light-mode snapshot. Keep the local providers inline in the story body.

### 3. Run the analyzer

```bash
node .claude/skills/visualroute-to-story/resources/analyze-visualroute.mjs <route-file> --pretty
```

It emits a JSON conversion plan: component name, the resolved target stories file
(`component.target` or `component.compositeTargets`), imports to keep vs drop,
`<Spec>` variants with labels and frame-affecting props, react-router sub-routes,
and everything read out of the companion visualspec (snapshot names, viewport
overrides, interactions, commented-out snapshots). Plus a `storyPlan`,
`warnings`, and a `manualReview` list.

Use `--all <root>` for a directory to get one plan per file.

The analyzer decides _what_ to convert and never writes files. Shaping the JSX is
step 5.

### 4. Read both source files

Read the route file and its visualspec. The plan summarizes them; the transform
needs the actual JSX.

If `component.nameConfidence` is `filename-fallback`, confirm the component name
against the imports before continuing.

### 5. Transform

Read [resources/conversion-recipe.md](resources/conversion-recipe.md) and apply
the recipe matching the plan's `storyPlan[].source.kind` (`flat` or `subRoute`).

The governing rule, which the recipe expands into a table of exactly what
changes: **preserve the file body, replace only the Percy scaffolding.**
Extracting variants into a fresh template loses the loops, local components and
styling these files depend on, and is the main way a conversion silently drops
coverage. Grouping is the one sanctioned exception, and even then the state count
must match before and after.

For a `needsPlay` story, read
[resources/play-function-patterns.md](resources/play-function-patterns.md).

### 6. Write the output

Trust the plan's `component.target` (`{ file, exists, action, title }`), or
`component.compositeTargets` for one entry per sub-component. `action` is
`append` or `create`; the new story inherits the file's existing `title`.

Never create a parallel `*.visual.stories.tsx`. Why, plus the two routes that
need `action: 'create'`, is in
[resources/conversion-recipe.md](resources/conversion-recipe.md#where-the-output-goes). Composite
targets are in
[resources/conversion-recipe.md](resources/conversion-recipe.md#composites).

Add only imports and new exports; leave the demo stories untouched. Merge
imports rather than appending them, or the component gets imported twice.

Under `--dry-run`, print the diff instead of applying it.

### 7. Verify

```bash
pnpm exec tsc --noEmit --skipLibCheck
pnpm --filter storybook build
```

Then count: `<VisualSpec>` in the output must equal `<Spec>` in the route file,
unless a preserved `.map()` generates them.

`tsc` catches the typing problems listed in
[resources/conversion-recipe.md](resources/conversion-recipe.md#typing-the-jsx--tsx-move).
The build catches a story that throws, which matters because Chromatic would
baseline the error overlay. Build from the `storybook` workspace; running the
binary from the repo root fails on `storybook/manager-api` not resolving.

**If `tsc` reports `Module '@storybook/react-vite' has no exported member 'Meta'`
for every story file in the repo**, the install is stale, not your conversion.
Check `storybook/node_modules/storybook`: if it resolves to an `8.x` path or
dangles, node_modules predates the Storybook 9 upgrade, and in 8.x `Meta` came
from `@storybook/react`. Neither command above means anything until that is
fixed.

### 8. Report

Per converted file:

```markdown
## <ComponentName> — <n> story/stories

**Source:** `<route-file>` (+ `<spec-file>`)
**Appended to:** `<target-stories-file>` (or **Created:** if it did not exist)

| Story       | Variants | Play | Tier         | Snapshot |
| ----------- | -------- | ---- | ------------ | -------- |
| AllVariants | 35       | no   | parity       | on       |
| Open        | 1        | yes  | new coverage | on       |

**Parity:** <n> live Percy snapshot(s) → <n> parity story/stories.
**New coverage:** <n> story/stories with no Percy baseline.
**Needs review:** <manualReview entries, or "none">
```

State the snapshot column plainly, because "converted" and "covered by Chromatic"
are different things and conflating them is how a component gets signed off with
no baseline behind it. With `--no-snapshots` the column reads `off`, and that
story cannot count toward parity until it is enabled.

For a bulk run, finish with totals and the union of `manualReview` kinds with
counts, keeping the parity and new-coverage tiers separate.

## Edge cases

Each is detected by the analyzer and reported in `manualReview` or `warnings`.

| Signal                         | What it means                                           | What to do                                                                      |
| ------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `variant-route`                | A `*-open` secondary route (`component.variantOf` set)  | Append the export to the primary component's file; 6 files in ui-kit            |
| `commented-out-percy-snapshot` | No Percy baseline for that state today                  | Generate it, but bucket it as new coverage, never parity                        |
| `interactive-play-function`    | The spec clicks or types before snapshotting            | Scaffold the play, then verify the sequence and the end state                   |
| `generated-variants`           | `<Spec>` elements come from `.map()`                    | Keep the loop; replace only the `<Spec>` tag                                    |
| `looped-snapshot`              | A snapshot call sits inside `.map()`                    | Enumerate the loop values, one story each. `icons` is the case: 9 colors        |
| `scoped-portal`                | Overlays render into inline portal targets              | Keep the portal div, its id, and the selector callback verbatim                 |
| `theme-providers`              | Renders `LocalThemeProvider` / `LocalDarkThemeProvider` | Local theme scoping is the thing under test; keep providers inline              |
| `possible-composite`           | Many imports across many variants                       | Check against the asserted list of three; if it is one, split per sub-component |
| `no-target-stories-file`       | No existing `*.stories.tsx` to append to                | Create one at the conventional path; 2 files in ui-kit                          |
| Frame-prop warning             | `<Spec>` sets `backgroundColor`                         | Carry onto `<VisualSpec>`; it sets the backdrop color                           |

Two things the analyzer flags but cannot resolve:

- **`<Route path>` interpolating a loop variable**
  (`` `${routePath}/${color}` `` in `icons`). Read the visualspec to enumerate
  the real values, then emit one story per value.
- **Snapshot calls through a local alias inside a loop.** `icons.visualspec.js`
  wraps Percy in a `snapshot()` helper to pin `widths: [1600]` and calls it once
  per color. The static count understates real coverage there.

## Story naming and titles

- **No dedicated title.** Stories inherit the target file's existing `title`
  (`components/Buttons/PrimaryButton`), so they sit beside that component's demo
  stories. There is no `Visual Regression/*` group.
- One stacked story per component named `AllVariants`, every `<Spec>` in source
  order, and no JSDoc comment above it. One story per component is settled; a
  per-state split is deferred until after the migration, so do not split a frame
  just because it is long.
- Runs of states sharing an axis go in a `VisualSpecGroup` with the shared part
  hoisted out of their labels. See
  [resources/conversion-recipe.md](resources/conversion-recipe.md).
- A state that cannot share a frame gets its own export named for the state
  (`Open`, `OpenWithOptionGroups`), never a numbered suffix.

## Examples

```
/visualroute-to-story primary-button --dry-run
/visualroute-to-story primary-button
/visualroute-to-story packages/components/buttons/primary-button/src/primary-button.visualroute.jsx
/visualroute-to-story packages/components/buttons
```
