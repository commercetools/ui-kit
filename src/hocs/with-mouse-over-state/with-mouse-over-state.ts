import {
  compose,
  withState,
  withHandlers,
  wrapDisplayName,
  setDisplayName,
} from 'recompose';

export const stateHandlers = {
  handleMouseOver: ({
    setMouseOver,
  }: {
    setMouseOver: (nextValue: boolean) => void;
  }) => () => setMouseOver(true),
  handleMouseOut: ({
    setMouseOver,
  }: {
    setMouseOver: (nextValue: boolean) => void;
  }) => () => setMouseOver(false),
};

type WithMouseOverStateProps = {
  handleMouseOver: () => void;
  handleMouseOut: () => void;
  isMouseOver: boolean;
};

type RequiredProps = {};

const withMouseOverState = <P extends RequiredProps>(
  component: React.ComponentType<WithMouseOverStateProps & P>
) =>
  compose(
    setDisplayName(wrapDisplayName(component, 'WithMouseOverState')),
    withState('isMouseOver', 'setMouseOver', false),
    withHandlers(stateHandlers)
  )(component);

export default withMouseOverState;
