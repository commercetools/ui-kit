# Conversion recipe

How to turn a route file's JSX into story exports. Read
[repo-setup.md](./repo-setup.md) first for where output goes and how the opt-in
works.

## The governing rule

> **Preserve the file body. Replace only the Percy scaffolding.**

Keep imports, module-scope constants, `styled` components, local helper
components, and every `.map()` that generates variants, verbatim. Exactly four
things change:

| Percy                                               | Story                                                               |
| --------------------------------------------------- | ------------------------------------------------------------------- |
| `<Suite>`                                           | nothing; drop it. Its `IntlProvider` is already a global decorator. |
| `<Spec label=...>`                                  | `<VisualSpec label=...>`, optionally inside a `<VisualSpecGroup>`   |
| `export const routePath` / `export const component` | story exports appended to the component's existing `meta`           |
| `import { Suite, Spec } from '.../test/percy'`      | dropped                                                             |

Do **not** extract the `<Spec>` bodies into a fresh generated template. A third
of these files build variants inside `.map()` over local `styled` components and
size tables (`spacings` generates 14 of its 17 that way), and extraction drops
them with no error: the file typechecks, renders, and is missing most of its
coverage. That silent loss is the single largest risk in the migration.

## Story count

One story per **live `percySnapshot` call**, not per `<Spec>`. A route with 35
`<Spec>` elements and one `percySnapshot` call is one story, because Percy
captured the whole scrolling page at once. Repo-wide that is 926 `<Spec>`
elements and 79 live call sites.

## Imports

The target file already imports the component; the route file imports the
barrel. Merge, don't append.

```jsx
// route file
import { InformationIcon, PrimaryButton } from '@commercetools-frontend/ui-kit';
```

```tsx
// target file already has
import PrimaryButton from './primary-button';
```

Rules:

1. **Reuse the existing binding.** `PrimaryButton` is already imported; importing
   it again is a duplicate-identifier error.
2. **Resolve new bindings to their own package, not the barrel.** `InformationIcon`
   becomes `import { InformationIcon } from '@commercetools-uikit/icons'`. The
   barrel pulls the whole library into the story's module graph, which inflates
   what TurboSnap considers changed.
3. **Keep relative imports as-is** when the route file already used one
   (`from '../../../icons'`), adjusting depth if the target file sits elsewhere.
4. **Add `VisualSpec`** to the existing `@/storybook-helpers` import if the file
   has one (several already import `iconArgType`), otherwise a new line.

## Flat routes

`storyPlan[].source.kind === 'flat'`. The route exports a single `component`
with no react-router. 60-odd of the 77 files.

Before, `primary-button.visualroute.jsx`:

```jsx
import { InformationIcon, PrimaryButton } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

export const routePath = '/primary-button';

export const component = () => (
  <Suite>
    <Spec label="regular">
      <PrimaryButton label="A label text" onClick={() => {}} />
    </Spec>
    {/* ...34 more */}
  </Suite>
);
```

After, appended to `primary-button.stories.tsx`. The existing `meta`,
`type Story` and demo exports are untouched:

```tsx
import { InformationIcon } from '@commercetools-uikit/icons';
import { iconArgType, VisualSpec, VisualSpecGroup } from '@/storybook-helpers';

// ...existing meta and demo stories...

/** Every state Percy baselined for this component, stacked in one frame. */
export const AllVariants: StoryObj = {
  render: () => (
    <>
      <VisualSpecGroup label="as `button` (default)">
        <VisualSpec label="regular">
          <PrimaryButton label="A label text" onClick={() => {}} />
        </VisualSpec>
        {/* ...18 more, verbatim */}
      </VisualSpecGroup>

      <VisualSpecGroup label="with `as` as Link">
        {/* ...16 more, verbatim */}
      </VisualSpecGroup>
    </>
  ),
};
```

`StoryObj`, not the file's `Story` alias: `Story` is `StoryObj<typeof Component>`,
which makes `args` mandatory when the component has a required prop, and this
story is `render`-only.

The JSDoc comment renders as the story's description in autodocs. Add `tags` and
`parameters` only with `--enable-snapshots`.

## Grouping

Wrap runs of states that share an axis in a `VisualSpecGroup` and strip that axis
from their labels. Two runs differing by one axis is the signal; `primary-button`
splits into 19 plain-button states and 16 `as="a"` states.

Do this where it removes a repeated prefix or resolves ambiguity, not by reflex. It
earns its place when:

- **Labels carry a shared prefix.** Ten of `primary-button`'s labels began
  `` with `as` as Link -  ``; the heading now says it once.
- **Two states would otherwise share a label.** Seven of its labels appeared twice,
  once as `<button>` and once as `<a>`, rendering near-identically. Inside distinct
  groups the short labels are unambiguous.

Grouping may need a **reorder** where a run isn't contiguous in source.
`primary-button`'s last two plain-button states sat after the anchor block, and
moving them into the button group was the only way to get two contiguous groups.
That is a deliberate exception to preserving the body verbatim: the rule exists to
stop conversions silently dropping coverage, and reordering adjacent states drops
none. Count the states before and after, and say in the report that you reordered.

## Sub-routes

`storyPlan[].source.kind === 'subRoute'`. The route registers several URLs
through a `<Switch>`, because the states cannot share a frame. `select-input` is
the canonical case:

```jsx
export const component = () => (
  <Switch>
    <Route path={`${routePath}/open`} component={OpenRoute} />
    {/* ...two more `open*` routes... */}
    <Route path={routePath} render={() => <DefaultRoute />} />
  </Switch>
);
```

One story export per `<Route>`, named for the state:

| Route                                  | Export                           |
| -------------------------------------- | -------------------------------- |
| `routePath`                            | `AllVariants`                    |
| `/open`                                | `Open`                           |
| `/open-with-option-groups`             | `OpenWithOptionGroups`           |
| `/open-with-option-groups-and-divider` | `OpenWithOptionGroupsAndDivider` |

Drop `<Switch>`, `<Route>` and the `react-router-dom` import; each route's
component body becomes that story's `render`. Never a numbered suffix.

Check the visualspec before assuming these are parity: for `select-input` all
three `open*` snapshots are **commented out**, so those three stories are new
coverage with no baseline. Bucket them separately and do not count them toward
parity.

## Secondary route files

Six files (`date-input-open`, `date-time-input-open`, `async-select-input-open`,
`async-creatable-select-input-open`, `creatable-select-input-open`,
`search-select-input-open`) are a second URL for a component that has its own
route file. The plan sets `component.variantOf`. Append their export to the
**primary** component's stories file; do not create anything new.

## Composites

Three route files render several unrelated components on one page. Split one
story export per sub-component, each appended to that sub-component's own stories
file.

| Composite  | Sub-components                                     | Target files                                                                      |
| ---------- | -------------------------------------------------- | --------------------------------------------------------------------------------- |
| `spacings` | Inline, Inset, InsetSquish, Stack                  | `spacings/spacings-inline/src/inline.stories.tsx` and siblings                    |
| `messages` | ErrorMessage, WarningMessage                       | `messages/src/error-message/error-message.stories.tsx`, `.../warning-message/...` |
| `text`     | Headline, Subheadline, Body, Detail, Caption, Wrap | `text/src/stories/headline.stories.tsx` and siblings                              |

The list is asserted, not inferred; the `KNOWN_COMPOSITES` comment in
`analyze-visualroute.mjs` records which heuristics were tried and why they failed.
Trust the plan's `compositeTargets`, including for `text`, where two filenames
disagree with their contents.

`spacings` is the one that makes splitting mandatory rather than tidy: its own
directory has no `src/`, so nothing written there is ever discovered.

## Snapshot calls inside a loop

`manualReview` reports `looped-snapshot`. The analyzer sees one static call site
and understates real coverage. One case in ui-kit:

`icons.visualspec.js` aliases Percy to pin a viewport, then calls it once per
color:

<!-- prettier-ignore -->
```js
const snapshot = (page, description) => percySnapshot(page, description, { widths: [1600] });
const colors = ['solid', 'neutral60', 'surface', 'info', 'primary', 'primary40', 'warning', 'error', 'success'];

colors.map((color) => it(`Color ${color}`, async () => {
  await page.goto(`${globalThis.HOST}/icons/${color}`);
  await snapshot(page, `Icons - Color: ${color}`);
}));
```

Nine real screenshots, so **nine** stories, not one, and each carries
`parameters: { chromatic: { viewports: [1600] } }`. Enumerate the loop values
from the visualspec; the route's `<Route path>` interpolates the variable and
cannot tell you them. This is parity coverage, not new coverage, even though the
analyzer cannot attribute it.

## Typing the `.jsx` → `.tsx` move

- Local helper components gain implicit-`any` parameters. Annotate them; the
  errors do not surface until `tsc`.
- Keep `type Story = StoryObj<typeof Component>` from the target file. Where a
  story renders several components, `StoryObj` without a type argument is fine;
  it is `render`-only with no `args`.
- Some route files start with `/* eslint-disable react/prop-types */`. Drop it,
  it is meaningless in a `.tsx` file with real types.

## Frame-affecting props

Carry `backgroundColor` onto `<VisualSpec>`. It is load-bearing for inverted-tone
states, which are invisible against white: `link`, `flat-button`, `field-label`,
`spacings`×2. Every other `<Spec>` prop is dropped; see
[repo-setup.md](./repo-setup.md).

## Before you finish

- Every `<Spec>` label from the plan appears in the output, or is produced by a
  preserved loop. Count them.
- No `Suite`, `Spec`, `test/percy`, `routePath`, `react-router-dom` or
  `percySnapshot` reference survives.
- No duplicate imports and no duplicate export names against the existing demo
  stories.
- Parity and new-coverage stories are reported separately. A story whose
  `percySnapshot` call is commented out has no baseline and is not parity.
