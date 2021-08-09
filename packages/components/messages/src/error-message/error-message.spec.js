import { screen, render } from '../../../../../test/test-utils';
import ErrorMessage from './error-message';

const intlMessage = { id: 'Title', defaultMessage: 'Hello' };

describe('ErrorMessage', () => {
  it('should render children', () => {
    render(<ErrorMessage>Some error message</ErrorMessage>);
    expect(screen.getByText('Some error message')).toBeInTheDocument();
  });

  it('should render given text with react-intl', () => {
    render(<ErrorMessage intlMessage={intlMessage} />);

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should forward data-attributes', () => {
    const { container } = render(
      <ErrorMessage data-foo="bar">Some error message</ErrorMessage>
    );
    expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument();
  });
});
