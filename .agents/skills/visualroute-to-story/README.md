# Percy to Chromatic migration

ui-kit's visual regression tests run on Percy today. Each component has a
`*.visualroute.jsx` (a page rendering every variant) and a `*.visualspec.js` (a
puppeteer script that drives the page and calls `percySnapshot`).

We are converting those into CSF3 Storybook stories so Chromatic can screenshot
them instead. The `visualroute-to-story` skill in this directory does the
conversion. See [SKILL.md](SKILL.md) for how to run it.

**Parity only.** The goal is to replicate the coverage that exists today, not to
add to it. Where a `percySnapshot` call is commented out, no screenshot exists,
so we convert nothing and record the gap under
[Deferred coverage](#deferred-coverage) below.

### Where we deviate on purpose

Parity is about which states are covered, not matching Percy pixel for pixel.
Four departures, none changing what is under test:

- **Padding.** A global decorator adds `1rem` inside each story: Chromatic crops
  to rendered content, so anything painted at the edge would clip.
- **Layout.** Label beside the component, smaller per-state min-height, so a long
  frame stays reviewable.
- **Grouping.** Runs of states sharing an axis may get a `VisualSpecGroup`
  heading, only where it removes ambiguity.
- **Light fixes.** A prop the component's types reject gets corrected, not cast,
  and called out in the PR. If the fix moves pixels, the route file gets it too,
  so Percy and Chromatic stay comparable while both run.

## Percy vs Storybook + Chromatic

The same job, split across different pieces:

| Concern                 | Percy                                                  | Storybook + Chromatic                                    |
| ----------------------- | ------------------------------------------------------ | -------------------------------------------------------- |
| Page under test         | `*.visualroute.jsx`, served by `visual-testing-app`    | a story export in `*.stories.tsx`, served by Storybook   |
| Per-state wrapper       | `<Spec>` (`test/percy/spec.jsx`)                       | `<VisualSpec>` (`storybook/src/helpers/visual-spec.tsx`) |
| What triggers a capture | a live `percySnapshot()` call in `*.visualspec.js`     | a story with `chromatic: { disableSnapshot: false }`     |
| Interactions first      | puppeteer, in the visualspec                           | a Storybook `play` function                              |
| Captured area           | the whole route page                                   | the story canvas                                         |
| Snapshot identity       | the name string passed to `percySnapshot()`            | story title + export name                                |
| Global config           | `.percy.yml` (widths `[1024]`)                         | `preview.tsx` + `storybook/chromatic.config.json`        |
| Per-capture config      | options on the `percySnapshot()` call                  | `parameters.chromatic` on the story                      |
| Run locally             | `visual-testing-app:start`, then `pnpm vrt:components` | `pnpm start`, then `pnpm --filter storybook chromatic`   |
| CI                      | a step in `main.yml`                                   | `.github/workflows/chromatic.yml`                        |
| Token                   | `PERCY_TOKEN`                                          | `CHROMATIC_PROJECT_TOKEN`                                |
| Cost control            | none, every live snapshot every run                    | TurboSnap (`onlyChanged`) plus a changed-files gate      |

## The pieces

**Percy side.** All of it is deleted at teardown; nothing here should be edited
except to fix a bug you are deliberately carrying across.

| File                  | What it is                                                                    |
| --------------------- | ----------------------------------------------------------------------------- |
| `*.visualroute.jsx`   | The page rendering every variant of one component. The input to a conversion  |
| `*.visualspec.js`     | Puppeteer script. Its live `percySnapshot()` calls decide what Percy captures |
| `test/percy/spec.jsx` | The `<Spec>` wrapper: label bar, prop table, 400px min-height per state       |
| `visual-testing-app/` | Vite app serving the routes on `:3000` for Percy to visit                     |
| `.percy.yml`          | Global Percy config. Sets `widths: [1024]`                                    |

**Chromatic side.** Already in place; you should not need to touch any of it.

| File                                    | What it is                                                                           |
| --------------------------------------- | ------------------------------------------------------------------------------------ |
| `storybook/src/helpers/visual-spec.tsx` | `VisualSpec` and `VisualSpecGroup`, the successors to `<Spec>`                       |
| `storybook/.storybook/preview.tsx`      | Global `disableSnapshot: true`, plus the Intl and theme decorators every story needs |
| `storybook/chromatic.config.json`       | TurboSnap and build settings                                                         |
| `.github/workflows/chromatic.yml`       | CI: changed-files gate, then the Chromatic build                                     |
| `<component>.stories.tsx`               | Where a converted story is appended, beside the component's existing demo stories    |

**The skill**, in this directory.

| File                                  | What it is                                                                                |
| ------------------------------------- | ----------------------------------------------------------------------------------------- |
| `SKILL.md`                            | The procedure, step by step. Start here to run a conversion                               |
| `resources/analyze-visualroute.mjs`   | Reads a route file and its spec, emits a JSON plan. Decides what converts, writes nothing |
| `resources/conversion-recipe.md`      | How to shape the JSX: imports, grouping, routers, sub-routes, composites                  |
| `resources/repo-setup.md`             | One-time prerequisites and the rationale for what `VisualSpec` keeps and drops            |
| `resources/play-function-patterns.md` | Puppeteer interactions to a Storybook `play` function                                     |
| `README.md`                           | This file: what the migration is, what is done, what is deferred                          |

## Pipeline

```
 ┌────────────────────────┐   ┌────────────────────────┐
 │  *.visualroute.jsx     │   │  *.visualspec.js       │
 │  the page Percy shoots │   │  puppeteer + snapshots │
 └───────────┬────────────┘   └───────────┬────────────┘
             └───────────────┬────────────┘
                             ▼
                  analyze-visualroute.mjs
              emits a JSON plan, writes no files
                             │
              ┌──────────────┴──────────────┐
              ▼                             ▼
      live Percy baseline           snapshot commented out
         → convert (73)                  → skip (17)
              │                             │
              ▼                             ▼
   appended to the component's       recorded in this file
     existing *.stories.tsx          as deferred coverage
   with tags: ['vrt'] and
   chromatic.disableSnapshot: false
              │
              ▼
      Chromatic baseline, reviewed and accepted in the PR
```

The story is written already opted in. Snapshots are opt-out globally, so the two
lines are what make Chromatic capture it; a converted story missing them renders
in Storybook and carries no coverage.

## Converting one component

```
/visualroute-to-story <component-name>
```

Then verify, both from the repo root:

```bash
pnpm exec tsc --noEmit --skipLibCheck
pnpm --filter storybook build
```

Then count. A silently dropped state is the failure mode this migration is most
exposed to, and nothing else catches it:

```bash
grep -c '<VisualSpec label' <component>.stories.tsx
grep -c '<Spec ' <component>.visualroute.jsx
```

Doing it by hand instead of through the skill is the same three steps: run
`analyze-visualroute.mjs` for the plan, read the route file and its spec, then
apply [resources/conversion-recipe.md](resources/conversion-recipe.md).

Progress and the per-component list live in
`planning-files/Chromatic/uikit-vrt-migration-decisions.md`.

## What a converted story changes

The conversion is 1:1 on **what is under test** and deliberately not on pixels.
A converted story renders the same states, from the same props, in the same
source order. What changes is the scaffolding Percy wrapped around them.

Percy's `Spec` (`test/percy/spec.jsx`) becomes `VisualSpec`
(`storybook/src/helpers/visual-spec.tsx`):

|                      | Percy `Spec`                             | `VisualSpec`               |
| -------------------- | ---------------------------------------- | -------------------------- |
| Layout               | column: label bar, prop table, component | row: component, then label |
| Label                | purple bar, bold, full width             | plain text                 |
| Prop read-out        | monospace table of every prop            | dropped                    |
| min-height per state | 400px                                    | 56px                       |
| Grouping             | none                                     | `VisualSpecGroup` headings |

The min-height drop is the visible difference, cutting a 35-state frame to about
a seventh of its height. Why the read-out goes, why the label stays, and the
measurements behind the 56px are in
[resources/repo-setup.md](resources/repo-setup.md#visualspec-and-visualspecgroup).

**Cross-comparing against Percy.** Every labeled state in the Percy snapshot
should have a matching row in the story, rendering identically. The frames will
not overlay, and are not meant to. `.percy.yml` also captures at 1024px while
Chromatic defaults to 1200px unless a story sets `chromatic.viewports`.

## Scope

77 route files: 69 with parity work, 6 `*-open` routes whose only story is
deferred, 2 excluded. Those 69 produce 73 story exports, or ~81 rendered once
`Icons.Color` expands across its 9 colors.

The parity rule, the two exclusions, and what the skill deliberately leaves to
other work are in [SKILL.md](SKILL.md#scope-and-exclusions).

## Deferred coverage

States the Percy specs describe but do **not** screenshot today, because the
`percySnapshot` call is commented out.

None of this is a regression. These states are uncovered today and stay
uncovered after the migration. The list exists so the gap is a decision on
record rather than something rediscovered later.

Regenerate with:

```bash
node .agents/skills/visualroute-to-story/resources/analyze-visualroute.mjs --all packages
```

Every story below is a `storyPlan` entry with `hasNoLiveBaseline: true`.

### Skipped stories (17)

`Play steps` is the number of puppeteer interactions the analyzer found for that
route. It is the rough cost of writing the story later: each one becomes a step
in a Storybook `play` function and needs its end state verified by hand.

| Component                   | Story                              | Sub-route                                                           | Play steps | Target stories file                                                                |
| --------------------------- | ---------------------------------- | ------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------- |
| `AsyncCreatableSelectField` | `Interaction`                      | `/async-creatable-select-field/interaction`                         | 1          | `fields/async-creatable-select-field/src/async-creatable-select-field.stories.tsx` |
| `AsyncCreatableSelectField` | `InteractionWithoutDefaultOptions` | `/async-creatable-select-field/interaction/without-default-options` | 2          | `fields/async-creatable-select-field/src/async-creatable-select-field.stories.tsx` |
| `AsyncSelectField`          | `Interaction`                      | `/async-select-field/interaction`                                   | 1          | `fields/async-select-field/src/async-select-field.stories.tsx`                     |
| `AsyncSelectField`          | `InteractionWithoutDefaultOptions` | `/async-select-field/interaction/without-default-options`           | 2          | `fields/async-select-field/src/async-select-field.stories.tsx`                     |
| `AsyncCreatableSelectInput` | `Open`                             | (whole `-open` route file)                                          | 2          | `inputs/async-creatable-select-input/src/async-creatable-select-input.stories.tsx` |
| `AsyncSelectInput`          | `Open`                             | (whole `-open` route file)                                          | 2          | `inputs/async-select-input/src/async-select-input.stories.tsx`                     |
| `CreatableSelectInput`      | `Open`                             | (whole `-open` route file)                                          | 2          | `inputs/creatable-select-input/src/creatable-select-input.stories.tsx`             |
| `DateInput`                 | `Open`                             | (whole `-open` route file)                                          | 8          | `inputs/date-input/src/date-input.stories.tsx`                                     |
| `DateTimeInput`             | `Open`                             | (whole `-open` route file)                                          | 2          | `inputs/date-time-input/src/date-time-input.stories.tsx`                           |
| `SearchSelectInput`         | `Open`                             | (whole `-open` route file)                                          | 2          | `inputs/search-select-input/src/search-select-input.stories.tsx`                   |
| `SelectInput`               | `Open`                             | `/select-input/open`                                                | 2          | `inputs/select-input/src/select-input.stories.tsx`                                 |
| `SelectInput`               | `OpenWithOptionGroups`             | `/select-input/open-with-option-groups`                             | 1          | `inputs/select-input/src/select-input.stories.tsx`                                 |
| `SelectInput`               | `OpenWithOptionGroupsAndDivider`   | `/select-input/open-with-option-groups-and-divider`                 | 1          | `inputs/select-input/src/select-input.stories.tsx`                                 |
| `LocalizedRichTextInput`    | `Interactive`                      | `/localized-rich-text-input/interactive`                            | 11         | `inputs/localized-rich-text-input/src/localized-rich-text-input.stories.tsx`       |
| `PrimaryActionDropdown`     | `Interaction`                      | `/primary-action-dropdown/interaction`                              | 0          | `primary-action-dropdown/src/primary-action-dropdown.stories.tsx`                  |
| `RichTextInput`             | `AllVariants`                      | `/rich-text-input`                                                  | 1          | `inputs/rich-text-input/src/rich-text-input.stories.tsx`                           |
| `RichTextInput`             | `Interactive`                      | `/rich-text-input/interactive`                                      | 28         | `inputs/rich-text-input/src/rich-text-input.stories.tsx`                           |

Paths are relative to `packages/components/`.

15 of the 17 need a `play` function. `PrimaryActionDropdown.Interaction` needs
none, and `RichTextInput.AllVariants` is a plain render.

The two `RichTextInput` rows sit inside the excluded
`rich-text-input.visualspec.js`. Do not revive them as VRT without deciding
first whether that file should become an interaction test instead.

### Commented-out snapshots with no story planned (1)

`SearchSelectField - open` (`search-select-field.visualspec.js:20`). The spec
opens the menu and would have screenshotted it, but the route file exposes no
sub-route for that state, so the analyzer plans nothing to attach it to. Adding
it later means writing the route state as well as the story.

### Deliberate drop of a live baseline (1)

`design-system/src/theme-provider.visualroute.jsx` has a live Percy baseline and
is still excluded. `ThemeProvider` returns `null` and works by calling
`target.style.setProperty()` in a `useLayoutEffect`, so every visible pixel in
that route comes from `DummyComponent`, scaffolding written for Percy. A
primitive with no painted surface gets no VRT. It is replaced by a DOM test
asserting the custom property resolves inside the scoped subtree.

This is the one place where the migration is not 1:1 with Percy, so it needs
calling out at parity sign-off.

## Before deleting the skill

This file lives beside the `visualroute-to-story` skill, which is deleted at
Percy teardown. Move the deferred coverage section somewhere durable first, or
fold it into whatever ticket tracks the follow-up work.
