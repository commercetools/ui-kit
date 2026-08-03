# Repo setup

One-time prerequisites, checked once per session rather than per file.

Chromatic authoring rules that are not ui-kit-specific are **not** restated
here. They live in
[`nimbus/docs/chromatic-visual-testing.md`](https://github.com/commercetools/nimbus/blob/main/docs/chromatic-visual-testing.md),
which is the source of truth for how the mechanism works, and
[`nimbus/docs/chromatic-ci.md`](https://github.com/commercetools/nimbus/blob/main/docs/chromatic-ci.md)
for CI, TurboSnap and baseline acceptance.

## Checklist

| Thing                                                  | What it does                                                                       | State                                                                            | If missing                                                                             |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `VisualSpec` helper                                    | Wraps each captured state with its label. The successor to Percy's `Spec`          | `storybook/src/helpers/visual-spec.tsx`, exported from `@/storybook-helpers`     | Scaffold once. See below.                                                              |
| `chromatic: { disableSnapshot: true }` project default | Makes capture opt-in, so only stories that override it are screenshotted           | `storybook/.storybook/preview.tsx`                                               | Add it. Without it every story in the repo is captured, including the 92 demo stories. |
| Intl decorator                                         | Supplies the `IntlProvider` every component needs to render its strings            | `WithIntlDecorator`, registered globally in `preview.tsx`                        | Nothing to do. Replaces Percy's `Suite`.                                               |
| Theme decorator                                        | Applies the design-token custom properties the styles resolve against              | `withThemeDecorator`, registered globally                                        | Nothing to do.                                                                         |
| Stories globs                                          | Determines which files Storybook discovers, so an unmatched path is a silent no-op | `packages/components/*/src/**` and `packages/components/*/*/src/**` in `main.ts` | Nothing to do, and no change is needed. See "Output location".                         |
| Full-height parent                                     | Lets a story that fills the viewport measure correctly instead of collapsing       | Missing                                                                          | Ticket 2. `card`, `icons` and `spacings` need it; see below.                           |

Framework is `@storybook/react-vite`, Storybook `9.1.20`, alias
`@/storybook-helpers` → `storybook/src/helpers` (declared in both
`tsconfig.json` and `main.ts`).

## `VisualSpec` and `VisualSpecGroup`

`VisualSpec` replaces Percy's `Spec` (`test/percy/spec.jsx`). It keeps the variant
label and drops Percy's props read-out. The component renders first, with the
label inline beside it in plain black:

```tsx
import { VisualSpec, VisualSpecGroup } from '@/storybook-helpers';

<VisualSpec label='tone - when "urgent"'>
  <PrimaryButton label="A label text" tone="urgent" onClick={() => {}} />
</VisualSpec>;
```

`VisualSpecGroup` puts a bolder heading over a run of specs that share an axis, so
their own labels don't each repeat it:

```tsx
<VisualSpecGroup label="with `as` as Link">
  <VisualSpec label='size - when "big"'>{/* ... */}</VisualSpec>
</VisualSpecGroup>
```

When to reach for one is in
[conversion-recipe.md](./conversion-recipe.md#grouping).

`VisualSpec`'s full API is `label` (required), `backgroundColor`, `children`;
`VisualSpecGroup`'s is `label` and `children`. That covers every prop ui-kit's
`Spec` actually accepts across all 77 route files, so nothing else needs carrying
over. In particular `size`, `contentAlignment` and `tone` are **not** `Spec` props
in this repo.

**Why the layout is dense.** Percy's `Spec` stacked a purple label bar above the
component inside a `min-height: 400px` box. Carried over literally, a 35-state
`primary-button` frame measured 14,032px of which **83% was whitespace**, and it
took twenty screens to review. The label moved beside the component and the
min-height dropped to 56px, giving 2,100px for the same 35 states. The min-height
is kept, just sized to a control rather than to the tallest component in the repo:
it stops a small height change in one state shifting every state below it and
lighting up the whole diff.

`propsToList`, `listPropsOfNestedChild` and `omitPropsList` configured only the
read-out, so they have no successor. Drop them silently.

Why the read-out goes: everything rendered into a frame becomes part of the
baseline, so reflecting prop values into the DOM diffs the snapshot on a rename
or a changed default with no visual change. The label stays because it is static,
and because a 30-state stack is unreviewable uncaptioned. The test is whether a
wrapper is load-bearing and static, which the label passes and the read-out fails.

## Snapshots are opt-out globally, opt-in per story

`preview.tsx` sets the project default; a story overrides it with **both** halves:

```tsx
tags: ['vrt'],
parameters: { chromatic: { disableSnapshot: false } },
```

Chromatic reads only `disableSnapshot`. `vrt` is a findability label. Omit either
half and the story silently never gets captured.

**Generated stories are born opted in.** Both lines are written at conversion
time; `--no-snapshots` omits them. The reviewable batch is the PR, so baselines
land a few components at a time rather than ~98 at once.

Catch a story that was converted but never opted in:

```bash
grep -rln 'AllVariants' --include='*.stories.tsx' packages/components \
  | xargs grep -L "'vrt'"
```

`grep --include='*.visual.stories.tsx'` does **not** work; generated stories are
appended to each component's existing `*.stories.tsx` and have no distinct
filename.

## Output location

Generated stories are appended to the component's existing
`*.stories.tsx`, alongside its demo stories, under that file's existing `title`:
one stories file per component, not a parallel one.

Consequences:

- **No glob risk.** The target file is already discovered by Storybook, so the
  silent-failure mode (a story that typechecks and never appears) cannot happen.
- **No `!autodocs`.** One file, one `title`, one docs page, so there is no
  duplicate `Props` page to suppress. The VRT story does render into that docs
  page, and for a 35-state component that is a ~2,100px canvas.
- **Imports merge.** The demo file usually already imports the component
  (`import PrimaryButton from './primary-button'`) while the route file imports
  the barrel (`from '@commercetools-frontend/ui-kit'`). Reuse the existing local
  import and add only genuinely new bindings. See
  [conversion-recipe.md](./conversion-recipe.md).

Two routes have no stories file to append to, and the plan flags both as
`no-target-stories-file`:

- **`content-notification`** — its directory has no demo story, and
  `notification.stories.tsx` is a different component. Create
  `content-notification.stories.tsx` beside it.
- **`icons`** — `icons/src/` holds only `.mdx`. Create `icons/src/icon.stories.tsx`
  for the 9 colors; the `leading-icon`, `inline-svg` and `custom-icon` snapshots
  append to those sub-directories' own stories files.

## Full-height parent (ticket 2)

The Percy app's `visual-testing-app/src/globals.css` set
`html, body { height: 100vh }`. Storybook's `preview.tsx` imports only
`resets.css`, so that is gone. Three routes depend on it: `card` (its "Content
using all vertical space from the parent" variant tests exactly this), `icons`,
`spacings`.

Restore it **per story via a decorator on the affected stories**, never globally
in `preview.tsx`, so the 92 existing demo stories are unaffected.

## Verifying

```bash
pnpm exec tsc --noEmit --skipLibCheck
pnpm --filter storybook build
```

Build from the `storybook` workspace. Running the binary from the repo root fails
on `storybook/manager-api` not resolving.

`tsc` catches the typing problems listed in
[conversion-recipe.md](./conversion-recipe.md#typing-the-jsx--tsx-move); the
build catches a story that throws, which matters because Chromatic would
baseline the error overlay.

**If `tsc` reports `Module '@storybook/react-vite' has no exported member 'Meta'`
for every story file in the repo**, the install is stale, not broken. Check
`storybook/node_modules/storybook`: if it resolves to an `8.x` path or dangles,
node_modules predates the Storybook 9 upgrade, and in 8.x `Meta` came from
`@storybook/react`. Reinstall, or hand the reinstall to whoever owns the
environment. Neither verify command above is meaningful until it is fixed.
