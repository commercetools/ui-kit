# Panels: CollapsiblePanel

## Usage

```js
import { CollapsiblePanel } from '@commercetools-frontend/ui-kit';
```

> Please have a look at the [Component Best Practices](<(#component-best-practices)>) to ensure that you are using the component as intended from a development and UX perspective.

#### Examples

The component can be used in a controlled or uncontrolled manner. Please refer to the [React documentation](https://reactjs.org/docs/forms.html#controlled-components) if you are unsure what either or entails.

```js
// 1. Uncontrolled
//   The `CollapsiblePanel` controls its own state. You do not pass handlers or state related props.
<CollapsiblePanel header="Lorem">
  <YourComponentAsContentOfThePanel />
</CollapsiblePanel>;

// 2. Controlled
//   You control the `CollapsiblePanel`. You do pass handlers or state related props.
//   Assume the parent rendering the `CollapsiblePanel` has `isPanelOpen` as state and a `togglePanel` as a handler.
<CollapsiblePanel
  isClosed={this.state.isPanelOpen}
  onToggle={this.togglePanel}
  header="Lorem"
>
  <YourComponentAsContentOfThePanel />
</CollapsiblePanel>;
```

#### Properties

| Props                     | Type     |                         Required                         | Values                | Default   | Description                                                                                                                                                                       |
| ------------------------- | -------- | :------------------------------------------------------: | --------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `header`                  | `node`   |                            ✅                            | -                     | -         | The title being rendered at top left of the panel                                                                                                                                 |
| `secondaryHeader`         | `node`   |                                                          | -                     | -         | A secondary header for the panel (only pass if needed)                                                                                                                            |  |
| `description`             | `String` |                                                          | -                     |           | If passed will be shown below the title as more information regarding the panel                                                                                                   |
| `className`               | `bool`   |                                                          | -                     | -         | -                                                                                                                                                                                 |
| `isSticky`                | `bool`   |                                                          | -                     | false     | Makes the panel's header sticky in regards to the page's scroll                                                                                                                   |
| `headerControls`          | `node`   |                                                          | -                     | -         | Controls at the top right part of the panel                                                                                                                                       |
| `isDisabled`              | `bool`   |                                                          | -                     | false     | Disables the panel and all interactions with it                                                                                                                                   |
| `children`                | `node`   |                                                          | -                     | -         | The actual content rendered inside the panel                                                                                                                                      |
| `tone`                    | `oneOf`  |                                                          | ['urgent', 'primary'] | 'primary' | -                                                                                                                                                                                 |
| `theme`                   | `string` |                                                          | ['dark', 'light']     | 'dark'    | The main color combination of the for the panel header and container                                                                                                              |
| `condensed`               | `bool`   |                                                          | -                     | false     | Whenever `true` the headers and content itself will consume less space in that to the borders are smaller and everything has less padding                                         |
| `hideExpansionControls`   | `bool`   |                                                          | -                     | -         | Controls the visibility of the expansion controls on the left                                                                                                                     |
| `isDefaultClosed`         | `bool`   |                                                          | -                     | false     | Indicates if the panel's content should be collapsed or shown by default. Updates to this value are not respected. Only used for uncontrolled mode (when no`onToggle` is passed.) |
| `isClosed`                | `bool`   |                                                          | -                     | false     | Indicates if the panel's content should be collapsed or shown                                                                                                                     |
| `onToggle`                | `func`   | (required only if controlled as in `isClosed` is passed) | -                     | -         | function to be triggered whenever the user clicks the top area to collapse the panel's content                                                                                    |
| `headerControlsAlignment` | `oneOf`  |                                                          | ['left', 'right']     | -         | Controls the position of the headerControls element, relative to the header                                                                                                       |

#### Where to use

Whenever some content on a given page should be concealed and/or expandible. This often holds true for instance for detailed but hidden information of some entity to save space.

**Header**

The header of this component should follow our design and UX conventions so it looks the same across the application. It accepts a `node` to accompany the two scenarios:

1.  Given the `CollapsiblePanel` is _condensed_

Whenever the component is configured to be `condensed` all content pased via the `header` will be wrapped in a `<Text.Detail />`. For this use case please ensure that _no combinations of components_ are passed via the `header`.

```js
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';

<CollapsiblePanel condensed={true} header={'My title'}>
  <YourComponentAsContentOfThePanel />
</CollapsiblePanel>;
```

2.  Given the `CollapsiblePanel` is _not condensed_

For this use case you will need to explicitly pass the `header` wrapped by the `<CollapsiblePanel.Header />` component to automatically ensure it follows our designs (enforced by the `<CollapsiblePanel.Header />`).

```js
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';

<CollapsiblePanel
  header={
    <CollapsiblePanel.Header>
      <FormattedMessage {...messages.title} />
    </CollapsiblePanel.Header>
  }
>
  <YourComponentAsContentOfThePanel />
</CollapsiblePanel>;
```

3.  Passing a combination of components (e.g. label and input)

Rendering any input(s) inside the `header` is allowed, but there are certain contraints that need to be taken into account:

- You can only render a _maximum amount of 3_ components inside the `header`.
- Given a combination of label and input
  - Then the input's _label should be bold_ and the _input only a `<TextInput />`_
- All has to be _vertically aligned_ in the `header` container.

**Theme**

The component supports themes (dark and light) to enable nesting of collapsible panels inside one another.

- Given the background of the parent is `dark`
  - Then the child needs to be `light` for better accessibility and visibility

**Condensed**

There are a some restrictions given using `condensed={true}`

1.  Nothing complex is passed as the `header`

- Nor button or inputs or anything that is not within title itself

2.  The title should be only (if possible) be a string or a combination or text components

- Everything is automatically wrapped within a `<Text.Detail />`

**SecondaryHeader**

The `secondaryHeader` allow rendering some secondary information in addition to the title.

It accepts a `node` but with few restrictions:

1.  _Bold text is allowed_ while the text component is `<Text.Detail />`
2.  Text size should not exceed the font size of `<Text.Detail />`

**headerControls**

The `headerControls` allows rendering a component which should only contain buttons or links. Apart from that there is one more limitation:

1.  You can only render a _maximum amount of 3 button_ inside the `headerControls`
