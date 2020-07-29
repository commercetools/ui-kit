# @commercetools-uikit/data-table-manager

## 10.23.0
### Minor Changes



- [`6de258e`](https://github.com/commercetools/ui-kit/commit/6de258ec80861525a3db11a481203cd45f75ad1d) [#1452](https://github.com/commercetools/ui-kit/pull/1452) Thanks [@jonnybel](https://github.com/jonnybel)! - New beta component `<DataTableManager>`.
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

### Patch Changes

- Updated dependencies []:
  - @commercetools-uikit/primary-button@10.27.1
  - @commercetools-uikit/secondary-button@10.27.1
  - @commercetools-uikit/field-label@10.27.1
  - @commercetools-uikit/radio-input@10.27.1
  - @commercetools-uikit/spacings@10.18.6
  - @commercetools-uikit/async-select-input@10.27.1
  - @commercetools-uikit/secondary-icon-button@10.27.1
