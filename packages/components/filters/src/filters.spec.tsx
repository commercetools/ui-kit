import { screen, render } from '../../../../test/test-utils';
import Filters from './filters';

/**
 * THIS IS A PLACEHOLDER, PLEASE UPDATE IT
 */
describe('FilterMenu FiltersList', () => {
  it('should render the filters-list', async () => {
    await render(<Filters label="filters list" />);
    await screen.findByText('filters list');
  });
});
