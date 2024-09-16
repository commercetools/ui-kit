import { screen, render } from '../../../../../../test/test-utils';
import Header from './header';

/**
 * THIS IS A PLACEHOLDER, PLEASE UPDATE IT
 */
describe('FilterMenu Header', () => {
  it('should render the header', async () => {
    await render(<Header label={'header'} />);
    await screen.findByText('header');
  });
});
