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

  it('should render the badge with a custom aria-label attribute if provided', async () => {
    const ariaLabel = 'custom aria-label';

    render(<Badge {...defaultProps} aria-label={ariaLabel} />);
    const badge = await screen.findByRole('status', { name: ariaLabel });
    expect(badge).toBeInTheDocument();
  });

  it('should apply disabled styles when isDisabled is true', () => {
    render(<Badge {...defaultProps} isDisabled />);
    const badge = screen.getByRole('status');
    expect(badge.className).toMatch(/disabledBadgeStyles/i);
  });
});
