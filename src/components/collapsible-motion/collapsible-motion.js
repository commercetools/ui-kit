import PropTypes from 'prop-types';
import React from 'react';
import warning from 'warning';
import stringHash from '@sindresorhus/string-hash';
import styleInject from 'style-inject';
import Collapsible from '../collapsible';

// allows setting global css, basically a cheap version of styled-components
const injectedKeyframes = new Map();
const keyframes = frames => {
  // check if this already exists
  const hash = stringHash(frames);
  const hashedName = injectedKeyframes.get(hash);
  if (hashedName) return hashedName;

  const identifier = `keyframes-${hash}`;
  injectedKeyframes.set(hash, identifier);
  const css = `@keyframes ${identifier} { ${frames} }`;

  styleInject(css);

  return identifier;
};

const createOpeningAnimation = height =>
  keyframes(`
    0% { height: 0; overflow: hidden; }
    99% { height: ${height}px; overflow: hidden; }
    100% { height: auto; overflow: visible; }
  `);

const createClosingAnimation = height =>
  keyframes(`
    from { height: ${height}px; }
    to { height: 0; overflow: hidden; }
  `);

export class ToggleAnimation extends React.Component {
  static displayName = 'ToggleAnimation';
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
  };
  animation = '';
  fullHeight = null;

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    this.calcAnimation(this.props);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
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
    warning(
      this.node,
      'You need to call `registerContentNode` in order to use this component'
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
      containerStyles: this.props.isOpen
        ? { height: 'auto' }
        : { height: 0, overflow: 'hidden' },
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
    isDefaultClosed: PropTypes.bool,
  };

  render() {
    return (
      <Collapsible
        isClosed={this.props.isClosed}
        isDefaultClosed={this.props.isDefaultClosed}
        onToggle={this.props.onToggle}
      >
        {({ isOpen, toggle }) => (
          <ToggleAnimation isOpen={isOpen} toggle={toggle}>
            {({
              animation,
              containerStyles,
              toggle: animationToggle,
              registerContentNode,
            }) =>
              this.props.children({
                isOpen,
                toggle: animationToggle,
                containerStyles: {
                  animation,
                  ...containerStyles,
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
