# Percy to Chromatic migration

ui-kit's visual regression tests run on Percy today. Each component has a
`*.visualroute.jsx` (a page rendering every variant) and a `*.visualspec.js` (a
puppeteer script that drives the page and calls `percySnapshot`).

We are converting those into CSF3 Storybook stories so Chromatic can screenshot
them instead. The `visualroute-to-story` skill in this directory does the
conversion. See [SKILL.md](SKILL.md) for how to run it.

**Parity only.** The goal is to replicate the coverage that exists today, not to
add to it. Where a `percySnapshot` call is commented out, no screenshot exists,
so we convert nothing and record the gap.

## Where we deviate on purpose

Parity is about which states are covered, not matching Percy pixel for pixel.
Four departures, none changing what is under test:

- **Padding.** A global decorator adds `1rem` inside each story: Chromatic crops
  to rendered content, so anything painted at the edge would clip.
- **Layout.** Label beside the component, smaller per-state min-height, so a long
  frame stays reviewable. A state whose content overflows its container needs
  `overflow: hidden` on that container, or the overflow draws over the label:
  Percy's label sat above the component, ours sits next to it.
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
| `resources/conversion-recipe.md`      | Where output goes, the `VisualSpec` API, and how to shape the JSX                         |
| `resources/play-function-patterns.md` | Puppeteer interactions to a Storybook `play`. Only for a story the plan marks `needsPlay` |
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
           → convert                      → skip
              │                             │
              ▼                             ▼
   appended to the component's       recorded in the
     existing *.stories.tsx          planning doc as
   already opted in                  deferred coverage
              │
              ▼
      Chromatic baseline, reviewed and accepted in the PR
```

Opted in means `tags: ['vrt', '!autodocs']` plus
`parameters: { chromatic: { disableSnapshot: false } }`. Without both, the story
renders in Storybook and Chromatic ignores it.

## Converting one component

```
/visualroute-to-story <component-name>
```

The skill typechecks, builds, and counts states before and after; [SKILL.md
step 7](SKILL.md#7-verify) covers what each check catches.

Doing it by hand is the same three steps: run `analyze-visualroute.mjs` for the
plan, read the route file and its spec, then apply
[resources/conversion-recipe.md](resources/conversion-recipe.md).

Where Percy clicked or typed before capturing, the plan marks the story
`needsPlay` and that interaction becomes a Storybook `play` function. Only
`dropdown-menu` needs one for parity; the rest belong to deferred coverage. See
[resources/play-function-patterns.md](resources/play-function-patterns.md).

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
[resources/conversion-recipe.md](resources/conversion-recipe.md#visualspec-and-visualspecgroup).

**Cross-comparing against Percy.** Every labeled state in the Percy snapshot
should have a matching row in the story, rendering identically. The frames will
not overlay, and are not meant to. `.percy.yml` also captures at 1024px while
Chromatic defaults to 1200px unless a story sets `chromatic.viewports`.

## Scope

The parity rule, the two exclusions, and what the skill deliberately leaves to
other work are in [SKILL.md](SKILL.md#scope-and-exclusions).

Where a `percySnapshot` call is commented out no baseline exists, so nothing is
converted. Those states are uncovered today and stay uncovered after the
migration.

Everything that moves as the migration proceeds lives in
`planning-files/Chromatic/uikit-vrt-migration-decisions.md`: counts, progress,
the per-component list, the deferred coverage list, and the
Percy-captures-to-stories mapping. Regenerate the underlying data with:

```bash
node .agents/skills/visualroute-to-story/resources/analyze-visualroute.mjs --all packages
```
