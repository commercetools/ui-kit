import PropTypes from 'prop-types';
import React from 'react';

class Collapsible extends React.PureComponent {
  static displayName = 'Collapsible';
  static propTypes = {
    // This is only used to initialize the `isOpen` state once,
    // when the component mounts. Therefore there should not be
    // any `componentWillReceiveProps` to update the state from
    // an external source.
    isDefaultClosed: PropTypes.bool,
    children: PropTypes.func.isRequired,
  };

  static defaultProps = { isDefaultClosed: false };
  state = { isOpen: !this.props.isDefaultClosed };

  toggle = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    return this.props.children({
      isOpen: this.state.isOpen,
      toggle: this.toggle,
    });
  }
}

export default Collapsible;
