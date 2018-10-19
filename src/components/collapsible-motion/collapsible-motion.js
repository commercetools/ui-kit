import PropTypes from 'prop-types';
import React from 'react';
import invariant from 'tiny-invariant';
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

  static getDerivedStateFromProps(props, state) {
    const animationName = props.isOpen
      ? createOpeningAnimation(state.fullHeight)
      : createClosingAnimation(state.fullHeight);
    return {
      animation: `${animationName} 200ms forwards`,
    };
  }

  nodeRef = React.createRef();

  state = { fullHeight: null, animation: '' };

  componentDidMount() {
    invariant(
      this.nodeRef.current,
      'You need to call `registerContentNode` in order to use this component'
    );

    // Sets the full height to the content's height.
    // We can't set this when initializing the state as the element in nodeRef
    // would not have mounted yet.
    if (this.props.isOpen) {
      this.setState({
        fullHeight: this.nodeRef.current.clientHeight,
      });
    }
  }

  handleToggle = () => {
    invariant(
      this.nodeRef.current,
      'You need to call `registerContentNode` in order to use this component'
    );

    // set panel height to the height of the content,
    // so we can animate between the height and 0
    this.setState(
      {
        fullHeight: this.nodeRef.current.clientHeight,
      },
      this.props.toggle
    );
  };

  render() {
    return this.props.children({
      containerStyles: this.props.isOpen
        ? { height: 'auto', animation: this.state.animation }
        : { height: 0, overflow: 'hidden', animation: this.state.animation },
      toggle: this.handleToggle,
      registerContentNode: this.nodeRef,
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
              containerStyles,
              toggle: animationToggle,
              registerContentNode,
            }) =>
              this.props.children({
                isOpen,
                toggle: animationToggle,
                containerStyles,
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
