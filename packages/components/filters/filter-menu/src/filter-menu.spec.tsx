import { screen, render } from '../../../../../test/test-utils';
import FilterMenu from './filter-menu';

const TestFilter = () => <div></div>;

/**
 * THIS IS A PLACEHOLDER, PLEASE UPDATE IT
 */
describe('FilterMenu FilterMenu', () => {
  it('should render the filter-menu', async () => {
    await render(
      <FilterMenu
        filterKey="testKey"
        filter={<TestFilter />}
        label="filter menu"
        appliedFilterValues={null}
      />
    );
    await screen.findByRole('button', { name: /filter menu/i });
  });
});
