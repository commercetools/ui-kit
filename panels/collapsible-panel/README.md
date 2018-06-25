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
  label="Lorem"
>
  {'Ipsum'}
</CollapsiblePanel>;
```

#### Properties

| Props             | Type     |                Required                 | Values                | Default   | Description                                                                                                     |
| ----------------- | -------- | :-------------------------------------: | --------------------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| `header`          | `node`   |                   ✅                    | -                     | -         | The title text to go on the top left of the panel                                                               |
| `onToggle`        | `func`   | (required only if `isClosed` is passed) | -                     | -         | function to be triggered whenever the user clicks the top area to collapse the panel's content                  |
| `isClosed`        | `bool`   |                                         | -                     | false     | Tells wether the panel's content should be collapsed or not                                                     |
| `isSticky`        | `bool`   |                                         | -                     | false     | Makes the header of the panel sticky to the page's scroll                                                       |
| `description`     | `String` |                                         | -                     |           | if provided, will display below the title with more information regarding the panel                             |
| `isDisabled`      | `bool`   |                                         | -                     | false     | disables the panel and all actions towards it                                                                   |
| `children`        | `node`   |                                         | -                     | -         | the content inside the panel                                                                                    |
| `headerControls`  | `node`   |                                         | -                     | -         | renders an element on the top right part of the panel                                                           |
| `tone`            | `oneOf`  |                                         | ['urgent', 'primary'] | 'primary' | -                                                                                                               |
| `className`       | `bool`   |                                         | -                     | -         | -                                                                                                               |
| `theme`           | `string` |                                         | ['dark', 'light']     | 'light    | Specifies the main colors of the for the panel header and container                                             |
| `condensed`       | `bool`   |                                         | -                     | false     | if true the content in the header and in the content itself will be more attached to the borders, less padding. |
| `secondaryHeader` | `node`   |                                         | -                     | -         | A subheader for the panel in case some secondary information need to be showed                                  |

#### Where to use

Whenever a content needs to be encapsulated into a panel shape

#### Component best practices

**Header**
The header of this component should follow our design and UX conventions so it looks the same way all across the application. It accepts a `node` so two scenarios may occur:

1.  Passing a `string` to the header

In that case, you only need to provide the basic text, the component will apply for you the proper styles for the header in that particular case

2.  Passing a Component (e.g. `<FormattedMessage />` from `react-intl`)

In this second case you need to take into account that the component does not know what is exactly what you are defining in the `node`, so can not always wrap the content within the same component. For this, we introduced a new component called `CollapsiblePanel.Header` which be responsible of applygin the proper style so it's inline with our UX Guide.

3.  Passing a combination of components (e.g. Label + Input)

Render inputs inside the `header` is allowed, but there are certain things that need to be taken into account:

- You can only render a maximum amount of 3 components inside the `header`.
- In case you need to display the combination of Label + Input. The input label should be bold and the input only a `<TextInput />`
- All has to be centered in the `header` container.

```js
import CollapsiblePanel from '@commercetools-local/ui-kit/panels/collapsible-panel';

<CollapsiblePanel
    header={
        <CollapsiblePanel.Header>
            <FormattedMessage {...messages.title} />
        </CollapsiblePanel.Header>
    }
>
    </div>
</CollapsiblePanel>
```

**Theme**
The themes were added to the component in order to put collapsible panels inside others. In case the background of the parent is `dark`,then the child needs to be `light` for consistency and better visibility in the UI.

**Condensed**
There are a few reestriction while using `condensed: true`

1.  You should not render anything besides the title. Nor button or inputs or anything that is not the title itself.
2.  The title should be only (if possible) a string or a combination of text components since all it's wrapped within a `<Text.Detail />`

**Secondarylabel**
The `secondaryLabel` prop was added in case the UI needs to render some secondary information besides the title. It accepts a `node` but with few reestrictions:

1.  Bold text is allowed while the text component is `<Text.Detail />`
2.  The text size should not exceed the font size of `<Text.Detail />`

**headerControls**
The `headerControls` allows you to render a component which can only contain buttons or links. Besides that, just one limitation:

1.  You can only render a maximu amount of 3 button inside the `headerControls`
