import React from 'react';
import { render } from '../../../../src/test-utils';
import Stamp from './stamp';

it('should render the children', () => {
  const { container } = render(<Stamp tone="positive">Hello</Stamp>);
  expect(container).toHaveTextContent('Hello');
});
