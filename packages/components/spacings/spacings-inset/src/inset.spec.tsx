import { screen, render } from '../../../../../test/test-utils';
import Inset from './inset';

it('should render children', () => {
  render(
    <Inset>
      <div data-testid="first-child" />
      <div data-testid="second-child" />
    </Inset>
  );
  expect(screen.getByTestId('first-child')).toBeInTheDocument();
  expect(screen.getByTestId('second-child')).toBeInTheDocument();
});
