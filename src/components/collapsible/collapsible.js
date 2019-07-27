import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import useCollapsible from '../../hooks/use-collapsible';

const Collapsible = props => {
  const isControlledComponent = !isNil(props.isClosed);

  if (isControlledComponent) {
    return props.children({
      isOpen: !props.isClosed,
      toggle: props.onToggle,
    });
  }

  const [isOpen, toggle] = useCollapsible(!props.isDefaultClosed);

  return props.children({
    isOpen,
    toggle,
  });
};

Collapsible.displayName = 'Collapsible';
Collapsible.propTypes = {
  // This is only used to initialize the `isOpen` state once,
  // when the component mounts. Therefore there should not be
  // any `componentWillReceiveProps` to update the state from
  // an external source.
  isDefaultClosed: PropTypes.bool,
  children: PropTypes.func.isRequired,

  // The component can be controlled or uncontrolled.
  // when uncontrolled (no isClosed passed)
  //  -> There may not be `onToggle`
  // when controlled (isClosed passed)
  //  -> `onToggle` is required
  isClosed: PropTypes.bool,
  onToggle(props, propName, componentName, ...rest) {
    const isControlledComponent = !isNil(props.isClosed);
    const hasOnToggle = !isNil(props.onToggle);

    // controlled
    if (isControlledComponent)
      return PropTypes.func.isRequired(props, propName, componentName, ...rest);

    if (hasOnToggle)
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. \`${propName}\` does not have any effect when the component is uncontrolled.`
      );

    // uncontrolled component does not have `onToggle` so no validation needed.
    return null;
  },
};

Collapsible.defaultProps = { isDefaultClosed: false };

export default Collapsible;
