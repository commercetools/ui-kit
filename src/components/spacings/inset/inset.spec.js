import React from 'react';
import { render } from '../../../../test/test-utils';
import Inset from './inset';

it('should render children', () => {
  const { getByTestId } = render(
    <Inset>
      <div data-testid="first-child" />
      <div data-testid="second-child" />
    </Inset>
  );
  expect(getByTestId('first-child')).toBeInTheDocument();
  expect(getByTestId('second-child')).toBeInTheDocument();
});
