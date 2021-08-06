import { screen, render } from '../../../../test/test-utils';
import Card from './card';

it('should render children', () => {
  render(<Card>Bread</Card>);
  expect(screen.getByText('Bread')).toBeInTheDocument();
});

it('should pass data attributes', () => {
  const { container } = render(<Card data-testid="hefe">Bread</Card>);
  expect(container.querySelector("[data-testid='hefe']")).toBeInTheDocument();
});
