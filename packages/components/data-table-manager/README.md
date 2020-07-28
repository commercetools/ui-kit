# DataTableManager

> THIS COMPONENT IS IN BETA!
> Please be aware that it may be subject to upcoming breaking changes as it's still in active development.

---

## Description

This component enhances the `<DataTable>` component and additionally provides a UI and state management to handle configuration of the table such as column manager.

- The `disableDisplaySettings` enables / disables the display settings panel, allowing the user to select wrapping text and density display options.
- The `disableColumnManager` enables / disables the column manager panel, allowing the user to select which columns are visible.

Both panels delegate the handling of the settings change on the parent through function properties, allowing the settings to be persisted or just used as state props.

## Usage

```jsx
import DataTableManager from '@commercetools-uikit/data-table-manager';
import DataTable from '@commercetools-uikit/data-table';

const rows = [
  { id: 'parasite', title: 'Parasite', country: 'South Korea' },
  { id: 'portrait', title: 'Portrait of a Lady on Fire', country: 'France' },
  { id: 'wat', title: 'Woman at War', country: 'Iceland' },
];

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'country', label: 'Country' },
];

return (
  <DataTableManager columns={columns}>
    <DataTable rows={rows} />
  </DataTableManager>
  );
```

## Properties

> Check the `DataTable` properties [here](https://github.com/commercetools/ui-kit/blob/master/packages/components/data-table/README.md)

| Props                     | Type              | Required | Default                              | Description                                                                                                                                                                                                                                                                             |
| ------------------------- | ----------------- | -------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `topBar` | `node`           | -        | -                              | Node element to place on the left corner of the table settings dropdown option row. |
| `displaySettings` | `object`           | -        | -                              | Object containing the properties for the display settings management. |
| `columnManager` | `object`           | -        | -                              | Object containing the properties for the column manager. |
| `onTableSettingsChange` | `func`           | -        | -                              | Function triggered when any of the properties within `displaySettings` or `columnManager` is modified. Should implement the following interface: `(action: string, nextValue: object): void`  |



### Display Settings

> An object containing the properties to handle text-wrapping and density-display options over the table

| Props                  | Type      | Required | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------- | --------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disableDisplaySettings` | `bool`            | -        | `true`                              | Enable this flag to enable display settings panel option.                                                                                                                                                |
| `isCondensed`             | `boolean`         | -        | `false`                              | Set this to `true` to reduce the paddings of all cells, allowing the Table to display more data in less space. Required if `disableDisplaySettings` is set to `true`.                                                                                                                                                                         |
| `isWrappingText`             | `boolean`         | -        | `false`                              | Set this to `true` to set truncation on all cells. Required if `disableDisplaySettings` is set to `true`.                                                                                                                                                                             |      
| `primaryButton` | `PrimaryButton`           | -        | -                              | UIKit Primary Button element to set at the bottom right to be used as primary action in case the display settings is working as a form. |
| `secondaryButton` | `SecondaryButton`           | -        | -                              | UIKit Secondary Button element to set at the bottom right to be used as secondary action in case the display settings is working as a form. |


### Column Manager

> An object containing the properties to handle the visibility of the columns and the order in which are shown over the table

| Props                  | Type      | Required | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------- | --------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |                           
| `disableColumnManager` | `bool`            | -        | `true`                              | Enable this flag to enable column manager panel option.                                                                                                                                                |
| `visibleColumnKeys` | array of `string`           | -        | -                              | Visible columns keys. Required if `disableColumnManager` is `true`.  |
| `hideableColumns` | array of `object`           | -        | -                              | Columns to be managed by the column manager. Required if `disableColumnManager` is `true`.  |
| `onUpdateColumns` | `func`           | -        | -                              | Function called when the visible columns change on the column manager. Required if `disableColumnManager` is `true`.  |
| `areHiddenColumnsSearchable` | `bool`           | -        | -                              | Enable this flag to set a search input for the hidden columns panel.  |
| `searchHiddenColumns` | `func`           | -        | -                              | Function called when the search input for the hidden columns change.  |
| `searchHiddenColumnsPlaceholder` | `string`           | -        | -                              | Placeholder for the search input for the hidden columns.  |
| `primaryButton` | `PrimaryButton`           | -        | -                              | UIKit Primary Button element to set at the bottom right to be used as primary action in case the display settings is working as a form. |
| `secondaryButton` | `SecondaryButton`           | -        | -                              | UIKit Secondary Button element to set at the bottom right to be used as secondary action in case the display settings is working as a form. |
