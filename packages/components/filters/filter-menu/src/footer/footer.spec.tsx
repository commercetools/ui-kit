import { screen, render } from '../../../../../../test/test-utils';
import Footer from './footer';

/**
 * THIS IS A PLACEHOLDER, PLEASE UPDATE IT
 */
describe('FilterMenu Footer', () => {
  it('should render the footer', async () => {
    await render(<Footer onClearFilter={() => {}} />);
    await screen.findByRole('button', { name: /clear all/i });
  });
});
