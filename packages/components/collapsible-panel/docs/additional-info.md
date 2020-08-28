## Where to use

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

## Static methods

### `CollapsiblePanel.getPanelContentId`

Returns the generated `id` used for the wrapper of the panel content section. It is used for setting the `aria-controls` attribute on the header and can also be useful for finding the child element when testing.

```js
CollapsiblePanel.getPanelContentId('example'); // -> panel-content-example
```
