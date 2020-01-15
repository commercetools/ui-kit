import React from 'react';
import { render } from '../../../../../src/test-utils';
import ErrorMessage from './error-message';

describe('ErrorMessage', () => {
  it('should render children', () => {
    const { container } = render(
      <ErrorMessage>Some error message</ErrorMessage>
    );

    expect(container).toHaveTextContent('Some error message');
  });

  it('should forward data-attributes', () => {
    const { container } = render(
      <ErrorMessage data-foo="bar">Some error message</ErrorMessage>
    );
    expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument();
  });
});
