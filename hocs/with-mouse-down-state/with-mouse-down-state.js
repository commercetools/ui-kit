import {
  compose,
  withState,
  withHandlers,
  wrapDisplayName,
  setDisplayName,
} from 'recompose';

export const stateHandlers = {
  handleMouseDown: ({ setMouseDown }) => () => setMouseDown(true),
  handleMouseUp: ({ setMouseDown }) => () => setMouseDown(false),
};

export default component =>
  compose(
    setDisplayName(wrapDisplayName(component, 'WithMouseDownState')),
    withState('isMouseDown', 'setMouseDown', false),
    withHandlers(stateHandlers)
  )(component);
