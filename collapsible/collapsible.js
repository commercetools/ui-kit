import PropTypes from 'prop-types';
import React from 'react';
import isNil from 'lodash.isnil';

class Collapsible extends React.PureComponent {
  static displayName = 'Collapsible';
  static propTypes = {
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
    onToggle: PropTypes.func,
  };

  static defaultProps = { isDefaultClosed: false };
  state = { isOpen: !this.props.isDefaultClosed };

  toggle = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const isControlledComponent = !isNil(this.props.isClosed);

    return this.props.children({
      isOpen: isControlledComponent ? !this.props.isClosed : this.state.isOpen,
      toggle: isControlledComponent ? this.props.onToggle : this.toggle,
    });
  }
}

export default Collapsible;
