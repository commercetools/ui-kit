import { screen, render } from '../../../../../../test/test-utils';
import Badge from './badge';

/**
 * THIS IS A PLACEHOLDER, PLEASE UPDATE IT
 */
describe('FilterMenu Badge', () => {
  it('should render the badge', async () => {
    await render(<Badge label="badge" />);
    await screen.findByText('badge');
  });
});
