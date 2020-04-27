import React from 'react';
import { render } from '../../../../test/test-utils';
import RequiredIndicator from './required-indicator';

it('should render', () => {
  const { container } = render(<RequiredIndicator />);
  expect(container).toHaveTextContent('*');
});
