import { screen, render } from '../../../../../test/test-utils';
import InsetSquish from './inset-squish';

it('should render children', () => {
  render(
    <InsetSquish>
      <div data-testid="first-child" />
      <div data-testid="second-child" />
    </InsetSquish>
  );
  expect(screen.getByTestId('first-child')).toBeInTheDocument();
  expect(screen.getByTestId('second-child')).toBeInTheDocument();
});
