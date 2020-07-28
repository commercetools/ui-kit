---
'@commercetools-uikit/data-table-manager': minor
---

New beta component `<DataTableManager>`.
This component provides a UI and state management to handle configuration of the table such as column manager over a table component such as the `<DataTable>`.

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
