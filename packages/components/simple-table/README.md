# Table

## Usage

```js
import { SimpleTable } from '@commercetools-uikit/simple-table';
```

### `<SimpleTable />`

Shows tabular data, defined by a list of items: the `rows`, and another list with their corresponding definitions: the `columns`. Both these lists are arrays of objects.

- The `rows` list defines the items you want to render, where each item only requires a unique `id` which is used for mapping, and the remaining properties to be shown under each column.
- On the `columns` list, each object requires a unique `key` which should correspond to property key of the items of `rows` that you want to render under this column, and a `label` which defines the name shown on the header of the column.

These are the only requirements for rendering the most simple table which should suffice for most use cases and is scaled automatically for the available space.

For more advanced configuration and layout customization, a plethora of other options are available, including <i>per-column</i> specific options.

For adding a Row Selection behaviour, check the `useRowSelection` hook which you can use to prepare your `rows` and `columns` before passing them to the SimpleTable component.

#### Usage

```js
const rows = [
  { id: 'parasite', title: 'Parasite', country: 'South Korea' },
  { id: 'portrait', title: 'Portrait of a Lady on Fire', country: 'France' },
  { id: 'wat', title: 'Woman at War', country: 'Iceland' },
];

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'country', label: 'Country' },
];

<SimpleTable rows={rows} columns={columns} />;
```

... (More Soon™ )
