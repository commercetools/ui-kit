import { screen, render } from '../../../../../test/test-utils';
import FiltersList from './filters-list';

/**
 * THIS IS A PLACEHOLDER, PLEASE UPDATE IT
 */
describe('FilterMenu FiltersList', () => {
  /* eslint-disable */
  it.skip('should render the filters-list', async () => {
    await render(
      <FiltersList
        filters={[
          {
            key: 'test',
            label: 'test',
            filter: () => <div />,
            onClearRequest: () => {},
          },
        ]}
        appliedFilters={[]}
        onClearAllRequest={() => {}}
      />
    );
    await screen.findByText('filters list');
  });
});
