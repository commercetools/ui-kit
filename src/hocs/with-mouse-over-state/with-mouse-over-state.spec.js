import React from 'react';
import { render, fireEvent } from '../../test-utils';
import withMouseOverState from './with-mouse-over-state';

const Component = withMouseOverState(props => (
  <div
    data-testid="div"
    onMouseOver={props.handleMouseOver}
    onMouseOut={props.handleMouseOut}
  >
    {props.isMouseOver ? 'mouse over' : 'mouse not over'}
  </div>
));

it('should provide isMouseOver as "false" by default', () => {
  const { getByTestId } = render(<Component />);
  expect(getByTestId('div')).toHaveTextContent('mouse not over');
});

it('should work through the whole cycle', () => {
  const { getByTestId } = render(<Component />);

  // it should provide isMouseOver as "true" when mouse is over
  fireEvent(
    getByTestId('div'),
    new MouseEvent('mouseover', { bubbles: true, cancelable: true })
  );
  expect(getByTestId('div')).toHaveTextContent('mouse over');

  // it should provide isMouseOver as "false" when mouse is up again
  fireEvent(
    getByTestId('div'),
    new MouseEvent('mouseout', { bubbles: true, cancelable: true })
  );
  expect(getByTestId('div')).toHaveTextContent('mouse not over');
});
