import React from 'react';
import { render } from '../../../../../src/test-utils';
import Horizontal from './horizontal';

// The different constraints are tested in the visual regression tests.
// That tests also ensure this component accepts a "constraint" prop.

it('should render children', () => {
  const rendered = render(
    <Horizontal>
      <div data-testid="child" />
    </Horizontal>
  );
  expect(rendered.queryByTestId('child')).toBeInTheDocument();
});

it('should pass down `data` prop', () => {
  const rendered = render(
    <Horizontal data-testid="child">
      <div />
    </Horizontal>
  );
  expect(rendered.queryByTestId('child')).toBeInTheDocument();
});
