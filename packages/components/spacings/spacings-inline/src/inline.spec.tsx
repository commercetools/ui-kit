import { screen, render } from '../../../../../test/test-utils';
import Inline from './inline';

it('should render children', () => {
  render(
    <Inline>
      <div data-testid="first-child" />
      <div data-testid="second-child" />
    </Inline>
  );
  expect(screen.getByTestId('first-child')).toBeInTheDocument();
  expect(screen.getByTestId('second-child')).toBeInTheDocument();
});
