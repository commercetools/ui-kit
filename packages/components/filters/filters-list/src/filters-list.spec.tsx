import { screen, render } from '../../../../../test/test-utils';
import FiltersList from './filters-list';

/**
 * THIS IS A PLACEHOLDER, PLEASE UPDATE IT
 */
describe('FilterMenu FiltersList', () => {
  it('should render the filters-list', async () => {
    await render(<FiltersList label="filters list" />);
    await screen.findByText('filters list');
  });
});
