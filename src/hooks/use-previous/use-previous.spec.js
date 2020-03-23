import React from 'react';
import isNil from 'lodash/isNil';
import { render } from '../../test-utils';
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
  const { getByTestId } = render(<TestComponent />);
  expect(getByTestId('openState')).toHaveTextContent('open');
  expect(getByTestId('prevOpenState')).toHaveTextContent('undefined');
});

it('should maintain the previous state after changing state', () => {
  const { getByTestId } = render(<TestComponent />);
  expect(getByTestId('openState')).toHaveTextContent('open');
  getByTestId('toggle').click();
  expect(getByTestId('openState')).toHaveTextContent('closed');
  expect(getByTestId('prevOpenState')).toHaveTextContent('open');
  getByTestId('toggle').click();
  expect(getByTestId('prevOpenState')).toHaveTextContent('closed');
  expect(getByTestId('openState')).toHaveTextContent('open');
});
