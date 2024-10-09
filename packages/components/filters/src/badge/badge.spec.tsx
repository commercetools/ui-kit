import { screen, render } from '../../../../../test/test-utils';
import Badge from './badge';

const defaultProps = {
  label: '+1',
  id: 'test-badge',
};
describe('Filters Badge', () => {
  it('should render the badge', async () => {
    await render(<Badge {...defaultProps} />);
    const badge = await screen.findByRole('status');
    expect(badge.textContent).toEqual('+1');
  });
});
