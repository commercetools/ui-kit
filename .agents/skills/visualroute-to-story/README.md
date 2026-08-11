# Percy to Chromatic migration

ui-kit's visual regression tests still run on Percy. Each component has a
`*.visualroute.jsx` (a page rendering every variant) and a `*.visualspec.js` (a
puppeteer script that drives the page and calls `percySnapshot`).

We are converting those into CSF3 Storybook stories for Chromatic. The
`visualroute-to-story` skill in this directory does the conversion; see
[SKILL.md](SKILL.md) for how to run it.

**Parity only.** Replicate the coverage that exists today, don't add to it.
Where a `percySnapshot` call is commented out no baseline exists, so nothing is
converted and the gap is recorded in the planning doc.

## Where we deviate on purpose

Parity is about which states are covered, not matching Percy pixel for pixel.
Four departures, none changing what is under test:

- **Padding.** A global decorator adds `1rem` inside each story: Chromatic crops
  to rendered content, so anything painted at the edge would clip.
- **Layout.** Label beside the component, smaller per-state min-height, so a long
  frame stays reviewable. A state whose content overflows its container needs
  `overflow: hidden` on that container, or the overflow draws over the label.
- **Grouping.** Runs of states sharing an axis may get a `VisualSpecGroup`
  heading, only where it removes ambiguity.
- **Light fixes.** A prop the component's types reject gets corrected, not cast,
  and called out in the PR. If the fix moves pixels, the route file gets it too,
  so Percy and Chromatic stay comparable while both run.

## Percy vs Storybook + Chromatic

| Concern                 | Percy                                                  | Storybook + Chromatic                                    |
| ----------------------- | ------------------------------------------------------ | -------------------------------------------------------- |
| Page under test         | `*.visualroute.jsx`, served by `visual-testing-app`    | a story export in `*.stories.tsx`, served by Storybook   |
| Per-state wrapper       | `<Spec>` (`test/percy/spec.jsx`)                       | `<VisualSpec>` (`storybook/src/helpers/visual-spec.tsx`) |
| What triggers a capture | a live `percySnapshot()` call in `*.visualspec.js`     | a story with `chromatic: { disableSnapshot: false }`     |
| Interactions first      | puppeteer, in the visualspec                           | a Storybook `play` function                              |
| Captured area           | the whole route page                                   | the story canvas                                         |
| Snapshot identity       | the name passed to `percySnapshot()`                   | story title + export name                                |
| Global config           | `.percy.yml` (widths `[1024]`)                         | `preview.tsx` + `storybook/chromatic.config.json`        |
| Per-capture config      | options on the `percySnapshot()` call                  | `parameters.chromatic` on the story                      |
| Run locally             | `visual-testing-app:start`, then `pnpm vrt:components` | `pnpm start`, then `pnpm --filter storybook chromatic`   |
| CI                      | a step in `main.yml`                                   | `.github/workflows/chromatic.yml`                        |
| Token                   | `PERCY_TOKEN`                                          | `CHROMATIC_PROJECT_TOKEN`                                |
| Cost control            | none, every live snapshot every run                    | TurboSnap (`onlyChanged`) plus a changed-files gate      |

## The pieces

**Percy side.** Deleted at teardown; don't edit except to carry a bug fix across.

| File                  | What it is                                                                    |
| --------------------- | ----------------------------------------------------------------------------- |
| `*.visualroute.jsx`   | The page rendering every variant. The input to a conversion                   |
| `*.visualspec.js`     | Puppeteer script. Its live `percySnapshot()` calls decide what Percy captures |
| `test/percy/spec.jsx` | The `<Spec>` wrapper: label bar, prop table, 400px min-height                 |
| `visual-testing-app/` | Vite app serving the routes on `:3000`                                        |
| `.percy.yml`          | Global Percy config. Sets `widths: [1024]`                                    |

**Chromatic side.** Already in place; you should not need to touch any of it.

| File                                    | What it is                                                         |
| --------------------------------------- | ------------------------------------------------------------------ |
| `storybook/src/helpers/visual-spec.tsx` | `VisualSpec` and `VisualSpecGroup`, the successors to `<Spec>`     |
| `storybook/.storybook/preview.tsx`      | Global `disableSnapshot: true`, plus the Intl and theme decorators |
| `storybook/chromatic.config.json`       | TurboSnap and build settings                                       |
| `.github/workflows/chromatic.yml`       | CI: changed-files gate, then the Chromatic build                   |
| `<component>.stories.tsx`               | Where a converted story is appended, beside the demo stories       |

**The skill**, in this directory.

| File                                  | What it is                                                        |
| ------------------------------------- | ----------------------------------------------------------------- |
| `SKILL.md`                            | The procedure. Start here to run a conversion                     |
| `resources/analyze-visualroute.mjs`   | Reads a route and its spec, emits a JSON plan. Writes nothing     |
| `resources/conversion-recipe.md`      | Where output goes, the `VisualSpec` API, how to shape the JSX     |
| `resources/play-function-patterns.md` | Puppeteer interactions to a `play` function. Only for `needsPlay` |
| `README.md`                           | This file                                                         |

## Converting one component

```
/visualroute-to-story <component-name>
```

Opted in means `tags: ['vrt', '!autodocs']` plus
`parameters: { chromatic: { disableSnapshot: false } }`. Without both, the story
renders in Storybook and Chromatic ignores it.

The skill typechecks, builds, and counts states before and after;
[SKILL.md step 7](SKILL.md#7-verify) covers what each check catches. By hand it
is the same three steps: run `analyze-visualroute.mjs` for the plan, read the
route file and its spec, then apply
[resources/conversion-recipe.md](resources/conversion-recipe.md).

Where Percy clicked or typed before capturing, the plan marks the story
`needsPlay`. No parity story needs one: those interactions all sit behind a
commented-out `percySnapshot`. See
[resources/play-function-patterns.md](resources/play-function-patterns.md).

## What a converted story changes

Same states, same props, same source order. Only Percy's scaffolding differs:

|                      | Percy `Spec`                             | `VisualSpec`               |
| -------------------- | ---------------------------------------- | -------------------------- |
| Layout               | column: label bar, prop table, component | row: component, then label |
| Label                | purple bar, bold, full width             | plain text                 |
| Prop read-out        | monospace table of every prop            | dropped                    |
| min-height per state | 400px                                    | 120px                      |
| Grouping             | none                                     | `VisualSpecGroup` headings |

The min-height drop is the visible difference, cutting a long frame to about a
third of its height.

**Cross-comparing against Percy.** Every labeled state in the Percy snapshot
should have a matching row in the story, rendering identically. The frames will
not overlay, and are not meant to: `.percy.yml` captures at 1024px, Chromatic
defaults to 1200px unless a story sets `chromatic.viewports`.

## Scope

The parity rule, the two exclusions, and what the skill leaves to other work are
in [SKILL.md](SKILL.md#scope-and-exclusions).

Counts, progress, the per-component list, the deferred coverage list and the
Percy-captures-to-stories mapping live in
`planning-files/Chromatic/uikit-vrt-migration-decisions.md`. Regenerate the
underlying data with:

```bash
node .agents/skills/visualroute-to-story/resources/analyze-visualroute.mjs --all packages
```
