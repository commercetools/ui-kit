import { screen, render } from '../../../../test/test-utils';
import RequiredIndicator from './required-indicator';

it('should render', () => {
  render(<RequiredIndicator />);
  expect(screen.getByText('*')).toBeInTheDocument();
});
