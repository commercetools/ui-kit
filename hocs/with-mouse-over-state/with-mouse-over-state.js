import {
  compose,
  withState,
  withHandlers,
  wrapDisplayName,
  setDisplayName,
} from 'recompose';

export const stateHandlers = {
  handleMouseOver: ({ setMouseOver }) => () => setMouseOver(true),
  handleMouseOut: ({ setMouseOver }) => () => setMouseOver(false),
};

export default component =>
  compose(
    setDisplayName(wrapDisplayName(component, 'WithMouseOverState')),
    withState('isMouseOver', 'setMouseOver', false),
    withHandlers(stateHandlers)
  )(component);
