import PropTypes from 'prop-types';
import React from 'react';
import { keyframes } from 'styled-components';
import Collapsible from '../collapsible';

const createOpeningAnimation = height => keyframes`
  0% {
    height: 0;
    overflow: hidden;
  }

  99% {
    height: ${height}px;
    overflow: hidden;
  }
  100% {
    height: auto;
    overflow: visible;
  }
`;
const createClosingAnimation = height => keyframes`
  from {
    height: ${height}px;
  }

  to {
    height: 0;
    overflow: hidden;
  }
`;

const getAnimationName = props =>
  props.isOpen
    ? createOpeningAnimation(props.height)
    : createClosingAnimation(props.height);

class CollapsibleMotion extends React.PureComponent {
  static displayName = 'CollapsibleMotion';
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  state = { fullHeight: null };

  handleToggle = ({ isOpen: prevIsOpen, toggle }) => {
    this.setState(prevState => {
      this.isOpen = !prevIsOpen;
      const newState = {};
      if (process.env.NODE_ENV !== 'production')
        if (!this.node)
          // eslint-disable-next-line no-console
          console.warn(
            'You need to call `registerContentNode` in order to use this ' +
              'component'
          );
      // set panel height to the height of the content,
      // so we can animate between the height and 0
      newState.fullHeight = this.calcFullHeight(prevState);
      return newState;
    });
    toggle();
  };

  calcFullHeight = state =>
    state.fullHeight === this.node.clientHeight
      ? state.fullHeight
      : this.node.clientHeight;

  registerContentNode = node => {
    if (!node) return;
    this.node = node;
  };

  render() {
    return (
      <Collapsible>
        {({ isOpen, toggle }) => {
          const animationName = getAnimationName({
            isOpen,
            height: this.state.fullHeight,
          });
          const animation = `${animationName} 200ms forwards`;
          return this.props.children({
            isOpen,
            toggle: () => this.handleToggle({ isOpen, toggle }),
            containerStyles: {
              animation,
            },
            registerContentNode: this.registerContentNode,
          });
        }}
      </Collapsible>
    );
  }
}

export default CollapsibleMotion;
