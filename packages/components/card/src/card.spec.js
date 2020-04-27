import React from 'react';
import { render } from '../../../../test/test-utils';
import Card from './card';

it('should render children', () => {
  const { container } = render(<Card>Bread</Card>);
  expect(container).toHaveTextContent('Bread');
});

it('should pass data attributes', () => {
  const { container } = render(<Card data-testid="hefe">Bread</Card>);
  expect(container.querySelector("[data-testid='hefe']")).toBeInTheDocument();
});
