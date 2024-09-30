import { screen, render } from '../../../../test/test-utils';
import QuickFilters from './quick-filters';

/**
 * THIS IS A PLACEHOLDER, PLEASE UPDATE IT
 */
describe('QuickFilters', () => {
  it('should render the quick-filters', async () => {
    await render(<QuickFilters label="quickfilters" />);
    await screen.findByText('quickfilters');
  });
});
