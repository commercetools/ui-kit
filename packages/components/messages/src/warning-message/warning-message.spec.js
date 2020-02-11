import React from 'react';
import { render } from '../../../../../src/test-utils';
import ErrorMessage from './warning-message';

it('should render children', () => {
  const { container } = render(
    <ErrorMessage>Some warning message</ErrorMessage>
  );

  expect(container).toHaveTextContent('Some warning message');
});
