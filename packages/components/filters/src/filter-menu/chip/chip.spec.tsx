import { screen, render } from '../../../../../../test/test-utils';
import Chip from './chip';

/**
 * THIS IS A PLACEHOLDER, PLEASE UPDATE IT
 */
describe('FilterMenu Chip', () => {
  it('should render the chip', async () => {
    await render(<Chip />);
    await screen.findByText('chip');
  });
});
