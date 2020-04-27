import React from 'react';
import { render } from '../../../../test/test-utils';
import Inline from './inline';

it('should render children', () => {
  const { getByTestId } = render(
    <Inline>
      <div data-testid="first-child" />
      <div data-testid="second-child" />
    </Inline>
  );
  expect(getByTestId('first-child')).toBeInTheDocument();
  expect(getByTestId('second-child')).toBeInTheDocument();
});
