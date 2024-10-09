import { screen, render } from '../../../../test/test-utils';
import QuickFilters from './quick-filters';

/**
 * THIS IS A PLACEHOLDER, PLEASE UPDATE IT
 */
describe('QuickFilters', () => {
  it('should render the quick-filters', async () => {
    await render(
      <QuickFilters
        items={[
          { id: '1', label: 'Fooo', isActive: true },
          { id: '2', label: 'Bar', isActive: false },
        ]}
        onItemClick={() => {}}
      />
    );
    await screen.findByText('Fooo');
    await screen.findByText('Bar');
  });
});
