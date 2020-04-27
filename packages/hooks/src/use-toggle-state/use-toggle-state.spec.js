import React from 'react';
import { render } from '../../../../test/test-utils';
import useToggleState from './use-toggle-state';

const TestComponent = (props) => {
  // eslint-disable-next-line react/prop-types
  const [isOpen, toggle] = useToggleState(props.isDefaultOpen);
  const setOff = React.useCallback(() => {
    toggle(false);
  }, [toggle]);

  const setOn = React.useCallback(() => {
    toggle(true);
  }, [toggle]);

  return (
    <div>
      <div data-testid="openState">{isOpen ? 'open' : 'closed'}</div>
      <button data-testid="toggle" onClick={toggle}>
        Toggle
      </button>
      <button data-testid="setOff" onClick={setOff}>
        setOff
      </button>
      <button data-testid="setOn" onClick={setOn}>
        setOn
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

it('should be possible to set the state on and off', () => {
  const { getByTestId } = render(<TestComponent />);
  expect(getByTestId('openState')).toHaveTextContent('open');
  getByTestId('setOff').click();
  expect(getByTestId('openState')).toHaveTextContent('closed');
  getByTestId('setOn').click();
  expect(getByTestId('openState')).toHaveTextContent('open');
});

it('should respect the default closed state', () => {
  const { getByTestId } = render(<TestComponent isDefaultOpen={false} />);
  expect(getByTestId('openState')).toHaveTextContent('closed');
});
