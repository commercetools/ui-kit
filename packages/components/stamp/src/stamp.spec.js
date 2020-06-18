import React from 'react';
import { screen, render } from '../../../../test/test-utils';
import Stamp from './stamp';

it('should render the children', () => {
  render(<Stamp tone="positive">Hello</Stamp>);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
