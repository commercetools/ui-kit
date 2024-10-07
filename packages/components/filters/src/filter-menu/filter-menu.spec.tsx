import { screen, render } from '../../../../../test/test-utils';
import FilterMenu from './filter-menu';

/**
 * THIS IS A PLACEHOLDER, PLEASE UPDATE IT
 */
describe('FilterMenu FilterMenu', () => {
  it('should render the filter-menu', async () => {
    await render(<FilterMenu label="filter menu" />);
    await screen.findByText('filter menu');
  });
});
