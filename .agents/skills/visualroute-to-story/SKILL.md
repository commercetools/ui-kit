---
name: visualroute-to-story
description: Convert a ui-kit Percy `*.visualroute.jsx` file into a CSF3 Storybook story for Chromatic visual regression testing. Use when migrating ui-kit from Percy to Chromatic, or when converting a remaining visual route.
argument-hint: '<component-name|visualroute-file|directory> [--dry-run] [--enable-snapshots]'
allowed-tools: Bash, Grep, Glob, Read, Edit, Write
scope:
  - mc-foundation-team
  - node
  - migration
---

# Visualroute to Story

Convert ui-kit's Percy visual routes (`*.visualroute.jsx` + companion
`*.visualspec.js`) into CSF3 Storybook stories that Chromatic can snapshot.

Scoped to **ui-kit only** (77 route files). It is migration tooling with a
bounded life: its input is deleted when Percy is decommissioned, and this skill
should be deleted in the same PR. The ongoing "add VRT to a new component" tool
is a separate, later thing built on stabilized conventions.

## Arguments

- `component-name|visualroute-file|directory` (required): a bare component name
  (`primary-button`), a single `*.visualroute.jsx`, or a directory to convert
  every route file underneath.
- `--dry-run` (optional): print the conversion plan and the story file that
  _would_ be written, without writing anything.
- `--enable-snapshots` (optional): also opt the generated stories into Chromatic
  capture. **Default off.** Converting and enabling are separate steps so
  baselines land in reviewable batches rather than 94 at once. See
  [step 2](#2-confirm-one-time-repo-setup).

## Scope and exclusions

**Convert in two tiers.** They have different risk profiles and the second is
optional.

Counts are for the **75 route files kept** after the two exclusions below.

| Tier             | What                                                              | Count | Play functions     |
| ---------------- | ----------------------------------------------------------------- | ----- | ------------------ |
| **Parity**       | One `AllVariants` story per route file, plus 3 `Icons` sub-routes | 72    | 1 (`DropdownMenu`) |
| **New coverage** | Sub-route stories for interaction states                          | 17    | 16                 |

Every one of the 69 `AllVariants` stories maps to a live Percy baseline; there are
zero orphans, which is a consequence of the two exclusions. `Icons.Color` is
attributed as new coverage by the analyzer but is really parity, and expands to 9
stories rather than 1, so the total lands near 98.

Every one of the 17 sub-route stories corresponds to a **commented-out**
`percySnapshot` call, so none has a Percy baseline. They are a coverage
_increase_, safe to defer past the Percy cutover, and must not be counted toward
1:1 parity sign-off.

**Excluded: `rich-text-input.visualspec.js`.** Zero live snapshots (import
commented out on line 1, all 3 calls commented out) with 41 interaction call
sites. It is a behavioral test living in the VRT folder. Do not convert it to VRT
stories; converting it invents coverage that never existed. Leave it for the
Percy teardown to delete, or relocate it as an interaction test.

**Excluded: `design-system/src/theme-provider.visualroute.jsx`.** `ThemeProvider`
renders no DOM: it is `return null` and works by calling
`target.style.setProperty()` in a `useLayoutEffect`. Every visible pixel in the
route comes from `DummyComponent`, scaffolding written for Percy. A primitive with
no painted surface gets no VRT at all, so snapshot nothing. This is a deliberate coverage drop of one live Percy baseline, and it is
paired with a DOM test asserting the custom property resolves inside the scoped
subtree (ticket 2), which is the better tool for a `setProperty` side effect.

## What this skill does not do

- **It does not delete Percy files.** Removing `*.visualroute.*`,
  `*.visualspec.*`, `visual-testing-app/` and Percy deps is the teardown step,
  gated on parity sign-off.
- **It does not configure Chromatic.** ui-kit has no Chromatic setup yet; project
  token, CI workflow and TurboSnap are separate work.
- **It does not finish play functions.** It scaffolds them from the puppeteer
  calls in the visualspec; the interaction sequence needs review.

## Process

### 1. Parse inputs

From `$ARGUMENTS`: first positional is the target (required; print usage and stop
if absent). `--dry-run` and `--enable-snapshots` are booleans, both default false.

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

### 2. Confirm one-time repo setup

Read [resources/repo-setup.md](resources/repo-setup.md) and verify the
`VisualSpec` helper exists. Scaffold it **once**, not per file.

ui-kit's other prerequisites are already in place, so no work is needed on them:
Intl and theme decorators are registered globally in
`storybook/.storybook/preview.tsx`, the framework package is
`@storybook/react-vite`, Storybook is 9.1.20, and the stories globs in
`storybook/.storybook/main.ts` already match `packages/components/*/src/**` and
`packages/components/*/*/src/**`.

**Snapshots are opt-out globally, opt-in per story.** `preview.tsx` sets
`chromatic: { disableSnapshot: true }` as the project default. A story is
captured only when it overrides that.

**Converting a route and enabling its snapshot are two separate steps.** The
rollout is deliberately slow: convert files, then enable snapshots a batch at a
time so each baseline gets reviewed before it lands. So by default a generated
story is **not** opted in. It renders in Storybook and costs nothing.

Default output, snapshot off: no `tags` and no `chromatic` parameters at all. The
story renders in Storybook, appears in the component's docs page, and costs
nothing.

With `--enable-snapshots`, add the opt-in, which takes **both** halves:

```tsx
tags: ['vrt'],
parameters: { chromatic: { disableSnapshot: false } },
```

Chromatic reads only `disableSnapshot`. The `vrt` tag is a findability label so a
sweep can locate enabled stories.
Omit either half and the story silently never gets captured, which is the failure
mode to watch for when enabling by hand later.

No `'!autodocs'`. Generated stories are appended to the component's existing
`*.stories.tsx` under its existing `title`, so there is one docs page, not two,
and nothing to suppress. The VRT story does render into that page; for a
35-state component that is a ~2,100px canvas.

Find converted stories still awaiting opt-in:

```bash
grep -rln 'AllVariants' --include='*.stories.tsx' packages/components \
  | xargs grep -L "'vrt'"
```

**Consequence for the budget.** Under global opt-out, ui-kit's 92 existing demo
stories are **not** captured, and neither are generated stories until enabled, so
the per-build snapshot count is however many have been opted in so far, rising
toward ~98 as the rollout proceeds. Two follow-ons: the demo stories carry no
visual coverage, so they cannot count toward parity; and parity sign-off can only
consider components whose generated story is actually enabled.

**Light theme only.** No `chromatic.modes` anywhere, in `meta` or per story.
Modes capture a story under different _global_ settings, whereas
`theme-provider.visualroute.jsx` tests several differently-themed scopes
coexisting in one DOM via `LocalThemeProvider` and a `parentSelector`. That is
the component's own behavior and it is captured correctly in a single light-mode
snapshot. Keep the local providers inline in the story body.

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

The governing rule:

> **Preserve the file body. Replace only the Percy scaffolding.**
>
> Keep imports, module-scope constants, `styled` components, local helper
> components, and every `.map()` that generates variants, verbatim. Swap
> `routePath`/`component` for a CSF3 `meta` plus story exports, `<Suite>` for a
> fragment, and `<Spec>` for `<VisualSpec>`.

The one sanctioned exception is grouping: runs of states that share an axis get a
`VisualSpecGroup` heading and shorter labels, which can require reordering
non-contiguous states. Coverage must not change; count the states before and after.

Extracting variants into a fresh template instead loses the loops, local
components and styling these files depend on, and is the main way a conversion
silently drops coverage.

For a `needsPlay` story, read
[resources/play-function-patterns.md](resources/play-function-patterns.md).

### 6. Write the output

**Append story exports to the component's existing `*.stories.tsx`**, under its
existing `meta` and `title`, alongside its demo stories: one stories file per
component, not a parallel one.

The plan resolves the target for you. `component.target` gives
`{ file, exists, action, title }`, and for a composite `component.compositeTargets`
gives one such entry per sub-component. `action` is `append` or `create`, and
`title` is the title read out of the existing file, which the new story inherits.

Because the target file is already discovered by Storybook, the silent-failure
mode is gone: a story cannot typecheck, render locally and never appear. Do not
create a parallel `*.visual.stories.tsx`.

What the plan is reporting, and why:

1. **Sibling demo story.** `<base>.stories.tsx` beside the route file. 65 of 77
   files.
2. **`component.variantOf` set.** A `*-open` secondary route belongs to its
   primary component (`date-input-open` → `date-input.stories.tsx`). Six files.
3. **`composite-route`.** One export per sub-component, each appended to that
   sub-component's own stories file:

   | Composite  | Target files                                                                                              |
   | ---------- | --------------------------------------------------------------------------------------------------------- |
   | `spacings` | `spacings/spacings-inline/src/inline.stories.tsx` and its three siblings                                  |
   | `messages` | `messages/src/error-message/error-message.stories.tsx`, `.../warning-message/warning-message.stories.tsx` |
   | `text`     | `text/src/stories/headline.stories.tsx` and its five siblings                                             |

4. **No stories file exists** (`action: 'create'`, flagged as
   `no-target-stories-file`). Create one at the conventional path, matching the
   neighbouring `title` scheme. Two files need this: `content-notification` (its
   directory has no demo story, and `notification.stories.tsx` is a different
   component) and `icons`' 9-color group (`icons/src/` holds only `.mdx`; create
   `icons/src/icon.stories.tsx`). `icons`' other three snapshots append to the
   `leading-icon`, `inline-svg` and `custom-icon` sub-dir stories files.

`text`'s composite targets are keyed to file **contents**, not filenames:
`detail.stories.tsx` holds `WrapProxy` titled `Text.Wrap` and `wrap.stories.tsx`
holds `DetailProxy` titled `Text.Detail`. The plan already accounts for the swap;
trust `compositeTargets`, not the filename.

**Merge imports, do not append them.** The target file usually already imports
the component; the route file imports the barrel. A second `import PrimaryButton`
is a duplicate-identifier error. See
[resources/conversion-recipe.md](resources/conversion-recipe.md).

Leave the existing demo stories themselves untouched. Only imports and new
exports are added.

Under `--dry-run`, print the diff instead of applying it.

### 7. Verify

```bash
pnpm exec tsc --noEmit --skipLibCheck
```

Converting `.jsx` to `.tsx` surfaces implicit-`any` on local helper components,
which is the most common failure and will not appear until you typecheck.

If `tsc` reports `Module '@storybook/react-vite' has no exported member 'Meta'`
for **every** story file in the repo, including pre-existing ones, the install is
stale rather than your conversion broken. See the last section of
[resources/repo-setup.md](resources/repo-setup.md); neither verify command is
meaningful until it is fixed.

Then confirm the story renders, from the `storybook` workspace:

```bash
pnpm --filter storybook build
```

A story that throws is worse than no story: Chromatic will baseline the error
overlay.

### 8. Report

Per converted file:

```markdown
## <ComponentName> — <n> story/stories

**Source:** `<route-file>` (+ `<spec-file>`)
**Appended to:** `<target-stories-file>` (or **Created:** if it did not exist)

| Story       | Variants | Play | Tier         | Snapshot             |
| ----------- | -------- | ---- | ------------ | -------------------- |
| AllVariants | 35       | no   | parity       | off (pending opt-in) |
| Open        | 1        | yes  | new coverage | off (pending opt-in) |

**Parity:** <n> live Percy snapshot(s) → <n> parity story/stories.
**New coverage:** <n> story/stories with no Percy baseline.
**Needs review:** <manualReview entries, or "none">
```

State the snapshot column plainly, because "converted" and "covered by Chromatic"
are different things during this rollout and conflating them is how a component
gets signed off with no baseline behind it. Without `--enable-snapshots` every
row reads `off (pending opt-in)`.

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
  order, with a JSDoc comment above it that renders as the story description. One
  story per component is settled; a per-state split is deferred until after the
  migration, so do not split a frame just because it is long.
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
