import DataTableManager, {
  DataTableManagerProvider,
} from '@commercetools-uikit/data-table-manager';
import DataTable from '@commercetools-uikit/data-table';
import SearchTextInput from '@commercetools-uikit/search-text-input';

const rows = [
  { id: 'parasite', title: 'Parasite', country: 'South Korea' },
  { id: 'portrait', title: 'Portrait of a Lady on Fire', country: 'France' },
  { id: 'wat', title: 'Woman at War', country: 'Iceland' },
];

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'country', label: 'Country' },
];

export const Example = () => (
  <DataTableManager columns={columns}>
    <DataTable rows={rows} />
  </DataTableManager>
);
export default Example;

// Introduce this component to test that DataTable and DataTableManager should not necessarily be direct descendants
const SomeOtherComponent = () => {
  return <div>Some other component</div>;
};

// With the data table settings decoupled.
//  It can also be exported as default.
export const ExampleWithDecoupledDataTableManager = () => (
  <DataTableManagerProvider columns={columns}>
    <header>
      <DataTableManager />
      <SearchTextInput />
    </header>
    <main>
      <SomeOtherComponent />
      <DataTable rows={rows} />
    </main>
  </DataTableManagerProvider>
);
