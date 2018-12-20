import React from 'react';
import { render } from '../../../test-utils';
import ErrorMessage from './error-message';

it('should render children', () => {
  const { container } = render(<ErrorMessage>Some error message</ErrorMessage>);

  expect(container).toHaveTextContent('Some error message');
});
