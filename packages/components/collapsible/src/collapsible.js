import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import invariant from 'tiny-invariant';
import { useToggleState } from '@commercetools-uikit/hooks';

const collapsiblePropTypes = {
  /**
   * This is only used to initialize the `isOpen` state once, when the component mounts.
   * Therefore there should not be any `componentWillReceiveProps` to update the state
   * from an external source.
   */
  isDefaultClosed: PropTypes.bool,

  /**
   * A render-prop function.
   * <br>
   * Signature: `({ isOpen: boolean, toggle: (event) => void }) => void`
   */
  children: PropTypes.func.isRequired,

  /**
   * Passing this prop makes the component a controlled component.
   * Controlled components also require to pass a `onToggle` callback function.
   */
  isClosed: PropTypes.bool,

  /**
   * A callback function, called when the consumer calls the `toggle` function.
   * This function is only required when the component is controlled.
   * <br>
   * Signature: `(event) => void`
   */
  onToggle: PropTypes.func,
};

const ControlledCollapsible = (props) => (
  <>
    {props.children({
      isOpen: !props.isClosed,
      toggle: props.onToggle,
    })}
  </>
);
ControlledCollapsible.displayName = 'ControlledCollapsible';
ControlledCollapsible.propTypes = collapsiblePropTypes;

const UncontrolledCollapsible = (props) => {
  const [isOpen, toggle] = useToggleState(!props.isDefaultClosed);
  return (
    <>
      {props.children({
        isOpen,
        toggle,
      })}
    </>
  );
};
UncontrolledCollapsible.displayName = 'UncontrolledCollapsible';
UncontrolledCollapsible.propTypes = collapsiblePropTypes;

const Collapsible = (props) => {
  const isControlledComponent = !isNil(props.isClosed);
  const hasOnToggle = !isNil(props.onToggle);

  if (isControlledComponent) {
    invariant(
      hasOnToggle,
      `ui-kit/Collapsible: missing required prop "onToggle" when using the "isClosed" prop (controlled component).`
    );
    return <ControlledCollapsible {...props} />;
  }

  invariant(
    !hasOnToggle,
    `ui-kit/Collapsible: the prop "onToggle" does not have any effect (uncontrolled component). Please remove it.`
  );
  return <UncontrolledCollapsible {...props} />;
};

Collapsible.displayName = 'Collapsible';
Collapsible.propTypes = collapsiblePropTypes;
Collapsible.defaultProps = { isDefaultClosed: false };

export default Collapsible;
