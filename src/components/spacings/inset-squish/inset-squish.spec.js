import React from 'react';
import { render } from '../../../../test/test-utils';
import InsetSquish from './inset-squish';

it('should render children', () => {
  const { getByTestId } = render(
    <InsetSquish>
      <div data-testid="first-child" />
      <div data-testid="second-child" />
    </InsetSquish>
  );
  expect(getByTestId('first-child')).toBeInTheDocument();
  expect(getByTestId('second-child')).toBeInTheDocument();
});
