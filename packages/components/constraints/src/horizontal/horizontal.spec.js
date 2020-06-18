import React from 'react';
import { screen, render } from '../../../../../test/test-utils';
import Horizontal from './horizontal';

// The different constraints are tested in the visual regression tests.
// That tests also ensure this component accepts a "constraint" prop.

it('should render children', () => {
  render(
    <Horizontal>
      <div data-testid="child" />
    </Horizontal>
  );
  expect(screen.queryByTestId('child')).toBeInTheDocument();
});

it('should pass down `data` prop', () => {
  render(
    <Horizontal data-testid="child">
      <div />
    </Horizontal>
  );
  expect(screen.queryByTestId('child')).toBeInTheDocument();
});
