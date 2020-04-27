import React from 'react';
import { render } from '../../../../test/test-utils';
import Stack from './stack';

it('should render children', () => {
  const { getByTestId } = render(
    <Stack>
      <div data-testid="first-child" />
      <div data-testid="second-child" />
    </Stack>
  );
  expect(getByTestId('first-child')).toBeInTheDocument();
  expect(getByTestId('second-child')).toBeInTheDocument();
});
