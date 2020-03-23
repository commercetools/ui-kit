import React from 'react';
import { render } from '../../../../src/test-utils';
import LoadingSpinner from './loading-spinner';

it('should render children', () => {
  const { getByTestId } = render(
    <LoadingSpinner>
      <div data-testid="child" />
    </LoadingSpinner>
  );

  expect(getByTestId('child')).toBeInTheDocument();
});
