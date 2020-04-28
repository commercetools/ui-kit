import React from 'react';
import { render } from '../../../../../test/test-utils';
import ErrorMessage from './error-message';

const intlMessage = { id: 'Title', defaultMessage: 'Hello' };

describe('ErrorMessage', () => {
  it('should render children', () => {
    const { container } = render(
      <ErrorMessage>Some error message</ErrorMessage>
    );

    expect(container).toHaveTextContent('Some error message');
  });

  it('should render given text with react-intl', () => {
    const { container } = render(<ErrorMessage intlMessage={intlMessage} />);
    expect(container).toHaveTextContent('Hello');
  });

  it('should forward data-attributes', () => {
    const { container } = render(
      <ErrorMessage data-foo="bar">Some error message</ErrorMessage>
    );
    expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument();
  });
});
