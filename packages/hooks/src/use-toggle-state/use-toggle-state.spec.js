import { useCallback } from 'react';
import { screen, render, fireEvent } from '../../../../test/test-utils';
import useToggleState from './use-toggle-state';

const TestComponent = (props) => {
  // eslint-disable-next-line react/prop-types
  const [isOpen, toggle] = useToggleState(props.isDefaultOpen);
  const setOff = useCallback(() => {
    toggle(false);
  }, [toggle]);

  const setOn = useCallback(() => {
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
  render(<TestComponent />);
  expect(screen.getByTestId('openState')).toHaveTextContent('open');
});

it('should be possible to toggle the open state', () => {
  render(<TestComponent />);
  expect(screen.getByTestId('openState')).toHaveTextContent('open');
  fireEvent.click(screen.getByTestId('toggle'));
  expect(screen.getByTestId('openState')).toHaveTextContent('closed');
});

it('should be possible to set the state on and off', () => {
  render(<TestComponent />);
  expect(screen.getByTestId('openState')).toHaveTextContent('open');
  fireEvent.click(screen.getByTestId('setOff'));
  expect(screen.getByTestId('openState')).toHaveTextContent('closed');
  fireEvent.click(screen.getByTestId('setOn'));
  expect(screen.getByTestId('openState')).toHaveTextContent('open');
});

it('should respect the default closed state', () => {
  render(<TestComponent isDefaultOpen={false} />);
  expect(screen.getByTestId('openState')).toHaveTextContent('closed');
});
