# @commercetools-uikit/data-table-manager

## 10.23.3

### Patch Changes

- [`49419ac`](https://github.com/commercetools/ui-kit/commit/49419ac8b604b9c3a2d51df6f4e25af912c5f80a) [#1509](https://github.com/commercetools/ui-kit/pull/1509) Thanks [@emmenko](https://github.com/emmenko)! - Generate README for `<DataTableManager>`. Some of the conditional prop types have been refactored to be validated on runtime using the invariant package. Furthermore, the generate-readme package has been refined to support more edge cases.

## 10.23.2

### Patch Changes

- [`cc40d76`](https://github.com/commercetools/ui-kit/commit/cc40d765fdeff8626a9886e080eab35dad97b805) [#1502](https://github.com/commercetools/ui-kit/pull/1502) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies

* [`db6b77c`](https://github.com/commercetools/ui-kit/commit/db6b77c3baf110136440dfc7c6d42cace74eb85e) [#1492](https://github.com/commercetools/ui-kit/pull/1492) Thanks [@emmenko](https://github.com/emmenko)! - Use ranged versions for emotion dependencies

* Updated dependencies [[`cc40d76`](https://github.com/commercetools/ui-kit/commit/cc40d765fdeff8626a9886e080eab35dad97b805), [`2ab294a`](https://github.com/commercetools/ui-kit/commit/2ab294a36e98dc3483507127a0b5d35862cf5429), [`db6b77c`](https://github.com/commercetools/ui-kit/commit/db6b77c3baf110136440dfc7c6d42cace74eb85e), [`5734a25`](https://github.com/commercetools/ui-kit/commit/5734a2507bb7d5bc1a1eb32aab166aff43e8fc32)]:
  - @commercetools-uikit/accessible-button@10.30.1
  - @commercetools-uikit/primary-button@10.30.1
  - @commercetools-uikit/secondary-button@10.30.1
  - @commercetools-uikit/secondary-icon-button@10.30.1
  - @commercetools-uikit/collapsible-motion@10.30.1
  - @commercetools-uikit/async-select-input@10.30.1
  - @commercetools-uikit/select-input@10.30.1
  - @commercetools-uikit/text@10.30.1
  - @commercetools-uikit/hooks@10.30.1
  - @commercetools-uikit/field-label@10.30.1
  - @commercetools-uikit/radio-input@10.30.1
  - @commercetools-uikit/grid@10.30.1
  - @commercetools-uikit/icons@10.30.1
  - @commercetools-uikit/tag@10.30.1
  - @commercetools-uikit/spacings@10.18.7

## 10.23.1

### Patch Changes

- [`0619f3f`](https://github.com/commercetools/ui-kit/commit/0619f3f97b96c6a89bf92abcd4c10fbe0a265c0a) [#1457](https://github.com/commercetools/ui-kit/pull/1457) Thanks [@jonnybel](https://github.com/jonnybel)! - Bumped version to include patch to prop-types added in previous PR [#1454](https://github.com/commercetools/ui-kit/pull/1454)

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
