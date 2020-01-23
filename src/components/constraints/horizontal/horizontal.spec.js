import React from 'react';
import { render } from '../../../test-utils';
import Horizontal from './horizontal';

// The different constraints are tested in the visual regression tests.
// That tests also ensure this component accepts a "constraint" prop.

it('should render children', () => {
  const { getByTestId } = render(
    <Horizontal>
      <div data-testid="child" />
    </Horizontal>
  );
  expect(getByTestId('child')).toBeInTheDocument();
});

it('should pass down `data` prop', () => {
  const { getByTestId } = render(
    <Horizontal data-testid="child">
      <div />
    </Horizontal>
  );
  expect(getByTestId('child')).toBeInTheDocument();
});
