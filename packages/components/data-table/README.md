# Table

> THIS COMPONENT IS IN BETA!
> This component is ultimately intented to replace the current `Table` component.
> Please be aware that it may be subject to upcoming breaking changes as it's still in active development.

---

## Usage

```js
import { DataTable } from '@commercetools-uikit/data-table';
```

### `<DataTable />`

Shows tabular data, defined by a list of items: the `rows`, and another list with their corresponding definitions: the `columns`. Both these lists are arrays of objects.

- The `rows` list defines the items you want to render, where each item only requires a unique `id` which is used for mapping, and the remaining properties to be shown under each column.
- On the `columns` list, each object requires a unique `key` which should correspond to property key of the items of `rows` that you want to render under this column, and a `label` which defines the name shown on the header of the column.

These are the only requirements for rendering the most simple table which should suffice for most use cases and is scaled automatically for the available space.

For more advanced configuration and layout customization, a plethora of other options are available, including <i>per-column</i> specific options.

For adding a Row Selection behaviour, check the `useRowSelection` hook which you can use to prepare your `rows` and `columns` before passing them to the DataTable component.

## Usage

```jsx
const rows = [
  { id: 'parasite', title: 'Parasite', country: 'South Korea' },
  { id: 'portrait', title: 'Portrait of a Lady on Fire', country: 'France' },
  { id: 'wat', title: 'Woman at War', country: 'Iceland' },
];

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'country', label: 'Country' },
];

return <DataTable rows={rows} columns={columns} />;
```

## Properties

| Props                     | Type              | Required | Default                              | Description                                                                                                                                                                                                                                                                             |
| ------------------------- | ----------------- | -------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rows`                    | array of `object` | ✅       | -                                    | The items you want to render. Each item is an object which requires their own unique `id` field, and remaining fields are the data to be displayed.                                                                                                                                     |
| `columns`                 | array of `object` | ✅       | -                                    | Each object requires a unique `key` which should correspond to property key of the items of `rows` that you want to render under this column, and a `label` which defines the name shown on the header. Check the `Columns` table below to understand more about the available options. |
| `itemRenderer`            | `func`            | -        | `(item, column) => item[column.key]` | The default function used to render the content of each item in a cell. Each column definition may have its own specific renderer, which will override this one.                                                                                                                        |
| `maxWidth`                | `number`          | -        | -                                    | The max width (in pixels) for which the table is allowed to grow. If unset, the table will grow horizontally to fill its parent.                                                                                                                                                        |
| `maxHeight`               | `number`          | -        | -                                    | The max height (in pixels) for which the table is allowed to grow. If unset, the table will grow vertically to fill its parent.                                                                                                                                                         |
| `onRowClick`              | `func`            | -        | -                                    | Function called when a user clicks a row. Should implement the following interface: `(row: object, rowIndex: number): void`                                                                                                                                                             |
| `isCondensed`             | `boolean`         | -        | `false`                              | Set this to `true` to reduce the paddings of all cells, allowing the Table to display more data in less space.                                                                                                                                                                          |
| `horizontalCellAlignment` | `string`          | -        | `left`                               | The default cell horizontal alignment. Can be one of [`left`, `center`, `right`]. Each column definition may have its own specific alignment, which will override this one.                                                                                                             |
| `verticalCellAlignment`   | `string`          | -        | `top`                                | The default cell vertical alignment. Can be one of [`top`, `center`, `bottom`]. Does not affect Header cells, only Data cells.                                                                                                                                                          |
| `wrapHeaderLabels`        | `boolean`         | -        | `true`                               | Sets whether the column header labels should be allowed to break in several lines or not. If true, the header may grow in height, otherwise the columns will guarantee larger minimum widths, enough to contain their labels in one line.                                               |
| `sortedBy`                | `string`          | -        | -                                    | The key of the column for which the data is currently sorted by.                                                                                                                                                                                                                        |
| `sortDirection`           | [`desc`, `asc`]   | -        | -                                    | The direction towards which the sorting is applied.                                                                                                                                                                                                                                     |
| `onSortChange`            | `func`            | -        | -                                    | Function called when a sortable column's header is clicked. Required if you set `isSortable` on at least on column. Should implement the following interface: (columnKey: string, sortDirection: string).                                                                               |
| `footer`                  | `node`            | -        | -                                    | Element to render within the `tfoot` (footer) element of the table.                                                                                                                                                                                                                     |
| `disableHeaderStickiness` | `bool`            | -        | `false`                              | Enable this flag to disable the sticky behaviour of the header.                                                                                                                                                                                                                         |
| `disableFooterStickiness` | `bool`            | -        | `false`                              | Enable this flag to disable the sticky behaviour of the footer.                                                                                                                                                                                                                         |

### Columns

> An array of objects describing the table's column definitions and options for each of them.

| Props                  | Type      | Required | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------- | --------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `key`                  | `string`  | ✅       | -       | The unique key of the column that is used to identify your data type. Each key should correspond to the fields of the items you want to display as data.                                                                                                                                                                                                                                                                                                              |
| `label`                | `string`  | ✅       | -       | The label of the column that will be shown on the column header.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `align`                | `string`  | -        | -       | Use this to override the table's own `horizontalCellAlignment` prop for this specific column. Can be one of [`left`, `center`, `right`].                                                                                                                                                                                                                                                                                                                                        |
| `width`                | `string`  | -        | `auto`  | Sets a `width` for this column. Accepts the same values as the ones specified for individual [grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns). Some common useful examples are `minmax` pairs (e.g. `minmax(200px, 400px)`), combinations of fraction values (`1fr`/`2fr`/etc), or fixed values such as `200px`. By default, the column grows according to the content and respecting the total table available width. |
| `renderItem`           | `func`    | -        | -       | Callback function to render the content of cells under this column, overriding the default `itemRenderer` prop of the table. The `row` object is passed as an argument to this fn.                                                                                                                                                                                                                                                                                    |
| `isTruncated`          | `boolean` | -        | `false` | Set this to `true` to allow text content of this cell to be truncated with an ellipsis, instead of breaking into multiple lines. Read the note about this option below.                                                                                                                                                                                                                                                                                               |
| `isSortable`           | `boolean` | -        | `false` | If this is `true`, this column's header will be a become a button which calls `onSortChange` when clicked. You should enable this flag for every column you want to be able to sort. When at least one column is sortable, the table props `sortBy`, `sortDirection` and `onSortChange` should be set.                                                                                                                                                                |
| `disableResizing`      | `boolean` | -        | `false` | Set this to `true` to prevent this column from being manually resized by dragging the edge of the header with a mouse.                                                                                                                                                                                                                                                                                                                                                |
| `shouldIgnoreRowClick` | `boolean` | -        | `false` | Set this to `true` to prevent click event propagation for this cell. You might want this if you need the column to have its own call-to-action or input while the row also has a defined `onRowClick`.                                                                                                                                                                                                                                                                |

> Note about `isTruncated`: When using this option, it is recommended to specify a `width` for the column, because if the table doesn't have enough space for all columns, it will start clipping the columns with _truncated_ content, and if no `width` is set (or the value is set `auto` -- the default) it can shrink until the column disappears completely. By enforcing a minimum width for these columns, the table will respect them and grow horizontally, adding scrollbars if needed.
