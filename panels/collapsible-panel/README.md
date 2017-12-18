# Panels: CollapsiblePanel

## Usage

```js
import CollapsiblePanel from '@commercetools-local/ui-kit/panels/collapsible-panel';
```

#### Usage

```js
// Uncontrolled
<CollapsiblePanel label="Lorem">{'Ipsum'}</CollapsiblePanel>;

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

| Props            | Type     | Required | Values                | Default   | Description                                                                                    |
| ---------------- | -------- | :------: | --------------------- | --------- | ---------------------------------------------------------------------------------------------- |
| `label`          | `String` |    ✅    | -                     | -         | The title text to go on the top of the panel                                                   |
| `onToggle`       | `func`   |  (required only if `isClosed` is passed)    | -                     | -         | function to be triggered whenever the user clicks the top area to collapse the panel's content |
| `isClosed`       | `bool`   |          | -                     | false     | Tells wether the panel's content should be collapsed or not                                    |
| `isSticky`       | `bool`   |          | -                     | false     | Makes the header of the panel sticky to the page's scroll                                      |
| `description`    | `String` |          | -                     |           | if provided, will display below the title with more information regarding the panel            |
| `isDisabled`     | `bool`   |          | -                     | false     | disables the panel and all actions towards it                                                  |
| `children`       | `node`   |          | -                     | -         | the content inside the panel                                                                   |
| `headerControls` | `node`   |          | -                     | -         | renders an element on the top right part of the panel                                          |
| `tone`           | `oneOf`  |          | ['urgent', 'primary'] | 'primary' | -                                                                                              |
| `className`      | `bool`   |          | -                     | -         | -                                                                                              |

#### Where to use

Whenever a content needs to be encapsulated into a panel shape
