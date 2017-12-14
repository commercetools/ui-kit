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

export class ToggleAnimation extends React.Component {
  static displayName = 'ToggleAnimation';
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
  };
  animation = '';
  fullHeight = null;

  componentWillMount() {
    this.calcAnimation(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen) {
      this.calcAnimation(nextProps);
    } else {
      this.animation = '';
    }
  }

  calcAnimation = props => {
    const animationName = this.getAnimationName({
      isOpen: props.isOpen,
      height: this.fullHeight,
    });
    this.animation = `${animationName} 200ms forwards`;
  };

  getAnimationName = props => {
    // in case the render callback was called without the isOpen value actually
    // having changed we need to avoid to replay the last animation.
    if (props.isOpen === this.prevIsOpen) return '';
    this.prevIsOpen = props.isOpen;
    return props.isOpen
      ? createOpeningAnimation(props.height)
      : createClosingAnimation(props.height);
  };

  handleToggle = () => {
    if (process.env.NODE_ENV !== 'production')
      if (!this.node)
        // eslint-disable-next-line no-console
        console.warn(
          'You need to call `registerContentNode` in order to use this ' +
            'component'
        );
    // set panel height to the height of the content,
    // so we can animate between the height and 0
    this.fullHeight = this.calcFullHeight();
    this.props.toggle();
  };

  calcFullHeight = () =>
    this.fullHeight === this.node.clientHeight
      ? this.fullHeight
      : this.node.clientHeight;

  registerContentNode = node => {
    if (!node) return;
    this.node = node;
  };

  render() {
    return this.props.children({
      animation: this.animation,
      toggle: this.handleToggle,
      registerContentNode: this.registerContentNode,
    });
  }
}

class CollapsibleMotion extends React.PureComponent {
  static displayName = 'CollapsibleMotion';
  static propTypes = {
    children: PropTypes.func.isRequired,
    isClosed: PropTypes.bool,
    onToggle: PropTypes.func,
  };

  render() {
    return (
      <Collapsible
        isClosed={this.props.isClosed}
        onToggle={this.props.onToggle}
      >
        {({ isOpen, toggle }) => (
          <ToggleAnimation isOpen={isOpen} toggle={toggle}>
            {({ animation, toggle: animationToggle, registerContentNode }) =>
              this.props.children({
                isOpen,
                toggle: animationToggle,
                containerStyles: {
                  animation,
                },
                registerContentNode,
              })
            }
          </ToggleAnimation>
        )}
      </Collapsible>
    );
  }
}

export default CollapsibleMotion;
