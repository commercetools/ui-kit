import flowRight from 'lodash.flowright';
import {
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
  flowRight(
    setDisplayName(wrapDisplayName(component, 'WithMouseOverState')),
    withState('isMouseOver', 'setMouseOver', false),
    withHandlers(stateHandlers)
  )(component);
