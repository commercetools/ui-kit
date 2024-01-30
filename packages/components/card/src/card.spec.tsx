import { screen, render, fireEvent } from '../../../../test/test-utils';
import Card from './card';
import { BrowserRouter } from 'react-router-dom'; // Required for testing <Link>

it('should render children', () => {
  render(<Card>Bread</Card>);
  expect(screen.getByText('Bread')).toBeInTheDocument();
});

it('should pass data attributes', () => {
  const { container } = render(<Card data-testid="hefe">Bread</Card>);
  expect(container.querySelector("[data-testid='hefe']")).toBeInTheDocument();
});

it('should call `onClick` when the card is clicked', () => {
  const handleClick = jest.fn();
  render(<Card onClick={handleClick}>Clickable Content</Card>);

  fireEvent.click(screen.getByText('Clickable Content'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

it('should not call `onClick` when the card is disabled', () => {
  const handleClick = jest.fn();
  render(
    <Card onClick={handleClick} isDisabled>
      Disabled Content
    </Card>
  );

  fireEvent.click(screen.getByText('Disabled Content'));
  expect(handleClick).not.toHaveBeenCalled();
});

it('should render as a react-router `Link` when `to` prop is provided', () => {
  const content = 'Internal Link';
  render(
    <BrowserRouter>
      <Card to="/internal-link">{content}</Card>
    </BrowserRouter>
  );

  const link = screen.getByText(content).closest('a');
  expect(link).toHaveAttribute('href', '/internal-link');
  expect(link).not.toHaveAttribute('target', '_blank');
  expect(link).not.toHaveAttribute('rel', 'noopener noreferrer');
});

it('should render as an external link when `to` and `isExternalLink` props are provided', () => {
  const content = 'External Link';
  render(
    <Card to="https://external.com" isExternalLink>
      {content}
    </Card>
  );

  const link = screen.getByText(content).closest('a');
  expect(link).toHaveAttribute('href', 'https://external.com');
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});

it('should visually indicate when the card is disabled', () => {
  const { container } = render(<Card isDisabled>Disabled Card</Card>);

  const card = container.firstChild;
  // Content should have opacity change, not the card container
  expect(card?.firstChild).toHaveStyle(`opacity: 0.5`);
  // Card should not be clickable
  expect(card).toHaveStyle(`pointer-events: none`);
});

it('should support accessibility as a button when the `onClick` prop is provided', () => {
  render(
    <Card data-testid="hefe" onClick={() => {}}>
      Content
    </Card>
  );

  const card = screen.getByTestId('hefe');
  expect(card).toHaveAttribute('role', 'button');
});
