import PropTypes from 'prop-types';
import React from 'react';
import invariant from 'tiny-invariant';
import { keyframes, ClassNames } from '@emotion/core';
import Collapsible from '../collapsible';

const createOpeningAnimation = height =>
  keyframes`
    0% { height: 0; overflow: hidden; }
    99% { height: ${height}px; overflow: hidden; }
    100% { height: auto; overflow: visible; }
  `;

const createClosingAnimation = height =>
  keyframes`
    from { height: ${height}px; }
    to { height: 0; overflow: hidden; }
  `;

export class ToggleAnimation extends React.Component {
  static displayName = 'ToggleAnimation';
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    let animation = null;

    const containerStyles = props.isOpen
      ? { height: 'auto' }
      : { height: 0, overflow: 'hidden' };

    if (props.isOpen !== state.isOpen) {
      animation = props.isOpen
        ? createOpeningAnimation(state.fullHeight)
        : createClosingAnimation(state.fullHeight);
    }

    return {
      isOpen: props.isOpen,
      containerStyles,

      animation,
    };
  }

  nodeRef = React.createRef();

  state = {
    isOpen: this.props.isOpen,
    fullHeight: null,
    animation: null,
    containerStyles: this.props.isOpen
      ? { height: 'auto' }
      : { height: 0, overflow: 'hidden' },
  };

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
      animation: this.state.animation,
      containerStyles: this.state.containerStyles,
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
              animation,
              containerStyles,
              toggle: animationToggle,
              registerContentNode,
            }) => (
              <ClassNames>
                {({ css }) => {
                  let animationStyle = {};

                  if (animation) {
                    // By calling `css`, emotion injects the required CSS into the document head.
                    css`
                      animation: ${animation} 200ms forwards;
                    `;
                    animationStyle = {
                      animation: `${animation.name} 200ms forwards`,
                    };
                  }

                  return this.props.children({
                    isOpen,
                    containerStyles: {
                      ...containerStyles,
                      ...animationStyle,
                    },
                    toggle: animationToggle,
                    registerContentNode,
                  });
                }}
              </ClassNames>
            )}
          </ToggleAnimation>
        )}
      </Collapsible>
    );
  }
}

export default CollapsibleMotion;
