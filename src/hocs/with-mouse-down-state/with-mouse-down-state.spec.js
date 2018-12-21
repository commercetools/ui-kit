import React from 'react';
import { render, fireEvent } from '../../test-utils';
import withMouseDownState from './with-mouse-down-state';

const Component = withMouseDownState(props => (
  <div
    data-testid="div"
    onMouseDown={props.handleMouseDown}
    onMouseUp={props.handleMouseUp}
  >
    {props.isMouseDown ? 'mouse down' : 'mouse not down'}
  </div>
));

it('should provide isMouseDown as "false" by default', () => {
  const { getByTestId } = render(<Component />);
  expect(getByTestId('div')).toHaveTextContent('mouse not down');
});

it('should work through the whole cycle', () => {
  const { getByTestId } = render(<Component />);

  // it should provide isMouseDown as "true" when mouse is down
  fireEvent(
    getByTestId('div'),
    new MouseEvent('mousedown', { bubbles: true, cancelable: true })
  );
  expect(getByTestId('div')).toHaveTextContent('mouse down');

  // it should provide isMouseDown as "false" when mouse is up again
  fireEvent(
    getByTestId('div'),
    new MouseEvent('mouseup', { bubbles: true, cancelable: true })
  );
  expect(getByTestId('div')).toHaveTextContent('mouse not down');
});
