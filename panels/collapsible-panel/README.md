# Panels: CollapsiblePanel

## Usage

```js
import CollapsiblePanel from '@commercetools-local/ui-kit/panels/collapsible-panel';
```

#### Usage

```js
<CollapsiblePanel label="Lorem">{'Ipsum'}</CollapsiblePanel>;
```

#### Properties

| Props            | Type     | Required | Values                | Default | Description                                                                                    |
| ---------------- | -------- | :------: | --------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `label`          | `String` |    ✅    | -                     | -       | The title text to go on the top of the panel                                                   |
| `isClosed`       | `bool`   |    ✅    | -                     | false   | Tells wether the panel's content should be collapsed or not |
| `isSticky`       | `bool`   |    ✅    | -                     | false   | Makes the header of the panel sticky to the window's scroll |
| `onToggle`       | `func`   |    ✅    | -                     | false   | function to be triggered whenever the user clicks the top area to collapse the panel's content |
| `description`    | `String` |          | -                     | false   | if provided, will display below the title with more information regarding the panel            |
| `isDisabled`     | `bool`   |          | -                     | false   | disables the panel and all actions towards it                                                  |
| `children`       | `node`   |          | -                     | false   | the content inside the panel                                                                   |
| `headerControls` | `node`   |          | -                     | false   | renders an element on the top right part of the panel                                          |
| `tone`           | `oneOf`  |          | ['urgent', 'primary'] | false   | -                                                                                              |
| `className`      | `bool`   |          | -                     | false   | -                                                                                              |

#### Where to use

Whenever a content needs to be encapsulated into a panel shape
