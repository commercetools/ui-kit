# Panels: CollapsiblePanel

## Usage

```js
import CollapsiblePanel from '@commercetools-frontend/ui-kit/panels/collapsible-panel';
```

Remember to take a look at **Component Best Practices** in case you have doubts on some situations.

#### Examples

```js
// Uncontrolled
<CollapsiblePanel header="Lorem">{'Ipsum'}</CollapsiblePanel>;

// Controlled
<CollapsiblePanel
  isClosed={false}
  onToggle={() => alert('clicked')}
  header="Lorem"
>
  {'Ipsum'}
</CollapsiblePanel>;
```

#### Properties

| Props             | Type     |                Required                 | Values                | Default   | Description                                                                                                     |
| ----------------- | -------- | :-------------------------------------: | --------------------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| `header`          | `node`   |                   ✅                    | -                     | -         | The title text to go on the top left of the panel                                                               |
| `secondaryHeader` | `node`   |                                         | -                     | -         | A subheader for the panel in case some secondary information need to be showed                                  |  |
| `onToggle`        | `func`   | (required only if `isClosed` is passed) | -                     | -         | function to be triggered whenever the user clicks the top area to collapse the panel's content                  |
| `isClosed`        | `bool`   |                                         | -                     | false     | Tells wether the panel's content should be collapsed or not                                                     |
| `isSticky`        | `bool`   |                                         | -                     | false     | Makes the header of the panel sticky to the page's scroll                                                       |
| `description`     | `String` |                                         | -                     |           | if provided, will display below the title with more information regarding the panel                             |
| `isDisabled`      | `bool`   |                                         | -                     | false     | disables the panel and all actions towards it                                                                   |
| `children`        | `node`   |                                         | -                     | -         | the content inside the panel                                                                                    |
| `headerControls`  | `node`   |                                         | -                     | -         | renders an element on the top right part of the panel                                                           |
| `tone`            | `oneOf`  |                                         | ['urgent', 'primary'] | 'primary' | -                                                                                                               |
| `className`       | `bool`   |                                         | -                     | -         | -                                                                                                               |
| `theme`           | `string` |                                         | ['dark', 'light']     | 'light'   | Specifies the main colors of the for the panel header and container                                             |
| `condensed`       | `bool`   |                                         | -                     | false     | if true the content in the header and in the content itself will be more attached to the borders, less padding. |

#### Where to use

Whenever a content needs to be encapsulated into a panel shape

#### Component best practices

For a visual explanation take a look at:

- [Designs](https://projects.invisionapp.com/share/EMKHNWODTZA#/screens/299345214)
- [Wiki](https://wiki.commercetools.com/display/DD/Collapsible+Panel+-+Documentation)

**Header**

The header of this component should follow our design and UX conventions so it looks the same way all across the application. It accepts a `node` so two scenarios may occur:

1.  If the `CollapsiblePanel` is condensed

If the component is configured as `condensed`, all the content defined in the `header` will be wrapped in a `<Text.Detail />`. Take into account that in this scenario
no combinations of components are allowed.

```js
import CollapsiblePanel from '@commercetools-local/ui-kit/panels/collapsible-panel';

<CollapsiblePanel
  condensed={true}
  header={'My title'}
>
    </div>
</CollapsiblePanel>
```

2.  If the `CollapsiblePanel` is not condensed

In this case you will need to explicitly declare the header so it follows the designs.

```js
import CollapsiblePanel from '@commercetools-local/ui-kit/panels/collapsible-panel';

<CollapsiblePanel
  header={
    <CollapsiblePanel.Header>
      <FormattedMessage {...messages.title} />
    </CollapsiblePanel.Header>
  }
>
  <div />
</CollapsiblePanel>;
```

3.  Passing a combination of components (e.g. Label + Input)

Render inputs inside the `header` is allowed, but there are certain things that need to be taken into account:

- You can only render a maximum amount of 3 components inside the `header`.
- In case you need to display the combination of Label + Input. The input label should be bold and the input only a `<TextInput />`
- All has to be vertically aligned in the `header` container.

**Theme**

The themes were added to the component in order to put collapsible panels inside others. In case the background of the parent is `dark`,then the child needs to be `light` for consistency and better visibility in the UI.

**Condensed**

There are a few restrictions while using `condensed: true`

1.  You should not render anything besides the title. Nor button or inputs or anything that is not the title itself.
2.  The title should be only (if possible) a string or a combination of text components since all it's wrapped within a `<Text.Detail />`

**SecondaryHeader**

The `secondaryHeader` prop was added in case the UI needs to render some secondary information besides the title. It accepts a `node` but with few restrictions:

1.  Bold text is allowed while the text component is `<Text.Detail />`
2.  The text size should not exceed the font size of `<Text.Detail />`

**headerControls**

The `headerControls` allows you to render a component which can only contain buttons or links. Besides that, just one limitation:

1.  You can only render a maximu amount of 3 button inside the `headerControls`
