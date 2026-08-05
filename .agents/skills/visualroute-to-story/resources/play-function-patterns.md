# Play function patterns

Translating a visualspec's puppeteer steps into a Storybook `play`. Read this
only for a story the plan marks `needsPlay`.

The rules for whether a play lands a usable frame are not restated here. They are
section 4 of
[`nimbus/docs/chromatic-visual-testing.md`](https://github.com/commercetools/nimbus/blob/main/docs/chromatic-visual-testing.md),
"Does the play land the frame?", and they apply unchanged: the snapshot is the
play's **end state**, a click leaves the element focused, animations settle on
their last frame, and a native text caret needs hiding.

## How little of this there is

Only `dropdown-menu` needs a play for parity. Every other interaction in the repo
sits behind a commented-out `percySnapshot`, so it is deferred coverage, not
migration work.

**Do not add a play to a story that does not need one.** A resting frame that
props alone produce is already tested by the snapshot, and each added interaction
is another frame to land deliberately.

## Call mapping

Percy drove a real browser over HTTP; a play runs inside the rendered story. The
imports come from `storybook/test`:

```tsx
import { userEvent, within, waitFor, expect } from 'storybook/test';
```

| Puppeteer                                | Play equivalent                          |
| ---------------------------------------- | ---------------------------------------- |
| `page.goto(HOST + '/x')`                 | nothing; the story **is** the page       |
| `page.waitForSelector('text/Foo')`       | `await canvas.findByText('Foo')`         |
| `queries.findByText(doc, 'Foo')`         | `await canvas.findByText('Foo')`         |
| `queries.findByLabelText(doc, 'Foo')`    | `await canvas.findByLabelText('Foo')`    |
| `queries.findAllByLabelText(doc, 'Foo')` | `await canvas.findAllByLabelText('Foo')` |
| `queries.findByTestId(doc, 'foo')`       | `await canvas.findByTestId('foo')`       |
| `await el.click()`                       | `await userEvent.click(el)`              |
| `page.click('#css-selector')`            | prefer a semantic query; see below       |
| `page.evaluate(fn)`                      | inline DOM access, no wrapper needed     |
| `page.waitForFunction(fn)`               | `await waitFor(() => expect(...))`       |

Two things drop out entirely. `getDocument(page)` and the `pptr-testing-library`
`queries.*(doc, ...)` shape collapse into one `within(canvasElement)`, and every
`page.goto` disappears because the story replaces the URL.

Puppeteer's `'text/Foo'` selector prefix is its own syntax, not a real selector.
It maps to `findByText`, not `querySelector`.

**`page.click('#select-input')` and friends.** A raw CSS selector has no direct
equivalent worth preserving. Reach for `canvas.getByRole` or
`canvas.getByLabelText` first, since a semantic query survives a DOM refactor.
Fall back to `canvasElement.querySelector('#select-input')` only when the element
genuinely has no accessible name, and non-null-assert with a comment saying why.

**If a query cannot find an overlay**, it rendered into a portal outside the
story's canvas. Query `document.body` instead of `canvasElement`. Keep any inline
portal target div, its `id`, and its selector callback verbatim; that wiring is
the thing under test.

## The one parity play

`dropdown-menu.visualspec.js`, in full:

```js
describe('DropdownMenu', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/dropdown-menu`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/Trigger');
    const doc = await getDocument(page);
    const triggetButton = await queries.findByLabelText(
      doc,
      'Trigger default dropdown'
    );
    await triggetButton.click();
    await queries.findByText(doc, 'Some headline');
    await percySnapshot(page, 'DropdownMenu');
  });
});
```

Converted:

```tsx
export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="default dropdown menu">
        {/* ...verbatim... */}
      </VisualSpec>
      <VisualSpec label="list type dropdown menu">
        {/* ...verbatim... */}
      </VisualSpec>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      await canvas.findByLabelText('Trigger default dropdown')
    );
    await canvas.findByText('Some headline');
  },
};
```

Three things to notice, each generalizable:

1. **The final `findByText` is the settle, not an assertion.** Percy used it to
   wait for the menu before shooting. Keep it: without it the snapshot can land
   before the menu paints. Dropping "redundant-looking" waits is how a play
   captures an empty frame.
2. **The play opens one menu; the frame still contains both `<VisualSpec>`
   rows.** The whole story is captured, so the second menu appears closed in the
   same image. That is what Percy baselined, so it is correct here.
3. **The click leaves the trigger focused**, and its focus ring lands in the
   baseline. Percy's did too, so keep it for parity. For a _new_ story, blur
   first.

Nothing here needs `step()`. Use it once a play has more than about three actions
worth naming.

## Interaction states with no baseline

**Not part of the migration.** The remaining plays belong to stories whose
`percySnapshot` is commented out, so the skill skips them entirely. They are a
separate ticket. This section is here for whoever picks that up.

They are mostly `select-input`-family overlays:

```js
it('Open', async () => {
  await page.goto(`${globalThis.HOST}/select-input/open`);
  await page.click('#select-input');
  await page.waitForSelector('text/One');
  // TODO: uncomment when issue with Percy is resolved
  // await percySnapshot(page, 'SelectInput - open - without option groups');
});
```

Read that `TODO` before assuming they are safe wins. "Issue with Percy" was never
diagnosed, and an overlay flaky under Percy may be flaky under Chromatic for the
same underlying reason: an unsettled animation, a repositioning popper. Each
first capture is also a new baseline rather than a parity check, so land them
apart from parity work or sign-off gets ambiguous.

## Checklist

- The play's end state is the frame you meant to capture, not one step past it.
- Every puppeteer wait has a surviving equivalent. Waits are load-bearing.
- No `page.`, `getDocument`, `queries.` or `percySnapshot` reference remains.
- Semantic queries wherever the element has an accessible name.
- Parity plays reproduce Percy's end state exactly, focus ring included. New
  coverage gets the frame the authoring rules ask for.
