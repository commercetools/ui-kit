import PropTypes from 'prop-types';
import React from 'react';
import invariant from 'tiny-invariant';
import { keyframes, ClassNames } from '@emotion/core';
import isNil from 'lodash/isNil';
import useToggleState from '../../hooks/use-toggle-state';
import Collapsible from '../collapsible';

const usePrevious = value => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

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

const ToggleAnimation = props => {
  const nodeRef = React.useRef();
  const prevIsOpen = usePrevious(props.isOpen);

  React.useEffect(
    () => {
      invariant(
        nodeRef.current,
        'You need to call `registerContentNode` in order to use this component'
      );
    },
    // to match the componentDidMount behaviour
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nodeRef]
  );

  const { toggle } = props;
  const handleToggle = React.useCallback(() => {
    invariant(
      nodeRef.current,
      'You need to call `registerContentNode` in order to use this component'
    );

    // set panel height to the height of the content,
    // so we can animate between the height and 0
    toggle();
  }, [nodeRef, toggle]);

  const containerStyles = props.isOpen
    ? { height: 'auto' }
    : { height: 0, overflow: 'hidden' };

  let animation = null;

  // if state has changed
  if (typeof prevIsOpen !== 'undefined' && prevIsOpen !== props.isOpen) {
    animation = props.isOpen
      ? createOpeningAnimation(nodeRef.current.clientHeight)
      : createClosingAnimation(nodeRef.current.clientHeight);
  }

  return props.children({
    animation,
    containerStyles,
    toggle: handleToggle,
    registerContentNode: nodeRef,
  });
};

ToggleAnimation.displayName = 'ToggleAnimation';
ToggleAnimation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};

const CollapsibleMotion = props => {
  const isControlledComponent = !isNil(props.isClosed);

  if (isControlledComponent) {
    return <ControlledCollapsibleMotion {...props} />;
  }

  return <UncontrolledCollapsibleMotion {...props} />;
};

const ControlledCollapsibleMotion = props => {
  return (
    <Collapsible
      isClosed={props.isClosed}
      isDefaultClosed={props.isDefaultClosed}
      onToggle={props.onToggle}
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
                  // eslint-disable-next-line no-unused-expressions
                  css`
                    animation: ${animation} 200ms forwards;
                  `;
                  animationStyle = {
                    animation: `${animation.name} 200ms forwards`,
                  };
                }

                return props.children({
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
};

ControlledCollapsibleMotion.displayName = 'ControlledCollapsibleMotion';
ControlledCollapsibleMotion.propTypes = {
  children: PropTypes.func.isRequired,
  isClosed: PropTypes.bool,
  onToggle: PropTypes.func,
  isDefaultClosed: PropTypes.bool,
};

const UncontrolledCollapsibleMotion = props => {
  const [isOpen, toggle] = useToggleState(!props.isDefaultClosed);

  return (
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
              // eslint-disable-next-line no-unused-expressions
              css`
                animation: ${animation} 200ms forwards;
              `;
              animationStyle = {
                animation: `${animation.name} 200ms forwards`,
              };
            }

            return props.children({
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
  );
};

UncontrolledCollapsibleMotion.displayName = 'UncontrolledCollapsibleMotion';
UncontrolledCollapsibleMotion.propTypes = {
  children: PropTypes.func.isRequired,
  isClosed: PropTypes.bool,
  onToggle: PropTypes.func,
  isDefaultClosed: PropTypes.bool,
};

CollapsibleMotion.displayName = 'CollapsibleMotion';
CollapsibleMotion.propTypes = {
  children: PropTypes.func.isRequired,
  isClosed: PropTypes.bool,
  onToggle: PropTypes.func,
  isDefaultClosed: PropTypes.bool,
};

export default CollapsibleMotion;
