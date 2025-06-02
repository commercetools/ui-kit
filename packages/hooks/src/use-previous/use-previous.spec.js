import isNil from 'lodash/isNil';
import { screen, render, fireEvent } from '../../../../test/test-utils';
import useToggleState from '../use-toggle-state';
import usePrevious from './use-previous';

const PrevOpenState = (props) => {
  let text = '';

  // eslint-disable-next-line react/prop-types
  const { isUndefined, isOpen } = props;
  if (isUndefined) {
    text = 'undefined';
  } else if (isOpen) {
    text = 'open';
  } else text = 'closed';

  return <div data-testid="prevOpenState">{text}</div>;
};

const TestComponent = (props) => {
  // eslint-disable-next-line react/prop-types
  const [isOpen, toggle] = useToggleState(props.isDefaultOpen);
  const prevIsOpen = usePrevious(isOpen);
  const isUndefined = isNil(prevIsOpen);

  return (
    <div>
      <div data-testid="openState">{isOpen ? 'open' : 'closed'}</div>
      <PrevOpenState isOpen={prevIsOpen} isUndefined={isUndefined} />
      <button data-testid="toggle" onClick={toggle}>
        Toggle
      </button>
    </div>
  );
};

it('should be `undefined` when no previous state', () => {
  render(<TestComponent />);
  expect(screen.getByTestId('openState')).toHaveTextContent('open');
  expect(screen.getByTestId('prevOpenState')).toHaveTextContent('undefined');
});

it('should maintain the previous state after changing state', () => {
  render(<TestComponent />);
  expect(screen.getByTestId('openState')).toHaveTextContent('open');
  fireEvent.click(screen.getByTestId('toggle'));
  expect(screen.getByTestId('openState')).toHaveTextContent('closed');
  expect(screen.getByTestId('prevOpenState')).toHaveTextContent('open');
  fireEvent.click(screen.getByTestId('toggle'));
  expect(screen.getByTestId('prevOpenState')).toHaveTextContent('closed');
  expect(screen.getByTestId('openState')).toHaveTextContent('open');
});
