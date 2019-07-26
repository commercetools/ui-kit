import React from 'react';
import useCollapsible from './use-collapsible';
import { render } from '../../test-utils';

const TestComponent = props => {
  // eslint-disable-next-line react/prop-types
  const [isOpen, toggle] = useCollapsible(props.isDefaultOpen);
  return (
    <div>
      <div data-testid="openState">{isOpen ? 'open' : 'closed'}</div>
      <button data-testid="toggle" onClick={toggle}>
        Toggle
      </button>
    </div>
  );
};

it('should be open by default', () => {
  const { getByTestId } = render(<TestComponent />);
  expect(getByTestId('openState')).toHaveTextContent('open');
});

it('should be possible to toggle the open state', () => {
  const { getByTestId } = render(<TestComponent />);
  expect(getByTestId('openState')).toHaveTextContent('open');
  getByTestId('toggle').click();
  expect(getByTestId('openState')).toHaveTextContent('closed');
});

it('should respect the default closed state', () => {
  const { getByTestId } = render(<TestComponent isDefaultOpen={false} />);
  expect(getByTestId('openState')).toHaveTextContent('closed');
});
