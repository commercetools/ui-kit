import React from 'react';
import { screen, render } from '../../../../test/test-utils';
import Stack from './stack';

it('should render children', () => {
  render(
    <Stack>
      <div data-testid="first-child" />
      <div data-testid="second-child" />
    </Stack>
  );
  expect(screen.getByTestId('first-child')).toBeInTheDocument();
  expect(screen.getByTestId('second-child')).toBeInTheDocument();
});
