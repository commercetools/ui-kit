import { screen, render } from '../../../../test/test-utils';
import LoadingSpinner from './loading-spinner';

it('should render children', () => {
  render(
    <LoadingSpinner>
      <div data-testid="child" />
    </LoadingSpinner>
  );

  expect(screen.getByTestId('child')).toBeInTheDocument();
});
