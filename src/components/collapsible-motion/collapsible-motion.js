import PropTypes from 'prop-types';
import React from 'react';
import invariant from 'tiny-invariant';
import { keyframes, ClassNames } from '@emotion/core';
import isNil from 'lodash/isNil';
import useToggleState from '../../hooks/use-toggle-state';

const collapsibleMotionPropTypes = {
  children: PropTypes.func.isRequired,
  isClosed: PropTypes.bool,
  onToggle: PropTypes.func,
  isDefaultClosed: PropTypes.bool,
};

const usePrevious = value => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
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

const useToggleAnimation = (isOpen, toggle) => {
  const nodeRef = React.useRef();
  const prevIsOpen = usePrevious(isOpen);

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

  const handleToggle = React.useCallback(() => {
    invariant(
      nodeRef.current,
      'You need to call `registerContentNode` in order to use this component'
    );

    // set panel height to the height of the content,
    // so we can animate between the height and 0
    toggle();
  }, [nodeRef, toggle]);

  const containerStyles = isOpen
    ? { height: 'auto' }
    : { height: 0, overflow: 'hidden' };

  let animation = null;

  // if state has changed
  if (typeof prevIsOpen !== 'undefined' && prevIsOpen !== isOpen) {
    animation = isOpen
      ? createOpeningAnimation(nodeRef.current.clientHeight)
      : createClosingAnimation(nodeRef.current.clientHeight);
  }

  return [animation, containerStyles, handleToggle, nodeRef];
};

const CollapsibleMotion = props => {
  const isControlledComponent = !isNil(props.isClosed);

  if (isControlledComponent) {
    return <ControlledCollapsibleMotion {...props} />;
  }

  return <UncontrolledCollapsibleMotion {...props} />;
};

const ControlledCollapsibleMotion = props => {
  const [
    animation,
    containerStyles,
    animationToggle,
    registerContentNode,
  ] = useToggleAnimation(!props.isClosed, props.onToggle);

  return (
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
          isOpen: !props.isClosed,
          containerStyles: {
            ...containerStyles,
            ...animationStyle,
          },
          toggle: animationToggle,
          registerContentNode,
        });
      }}
    </ClassNames>
  );
};

ControlledCollapsibleMotion.displayName = 'ControlledCollapsibleMotion';
ControlledCollapsibleMotion.propTypes = collapsibleMotionPropTypes;

const UncontrolledCollapsibleMotion = props => {
  const [isOpen, toggle] = useToggleState(!props.isDefaultClosed);

  const [
    animation,
    containerStyles,
    animationToggle,
    registerContentNode,
  ] = useToggleAnimation(isOpen, toggle);

  return (
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
  );
};

UncontrolledCollapsibleMotion.displayName = 'UncontrolledCollapsibleMotion';
UncontrolledCollapsibleMotion.propTypes = collapsibleMotionPropTypes;

CollapsibleMotion.displayName = 'CollapsibleMotion';
CollapsibleMotion.propTypes = collapsibleMotionPropTypes;

export default CollapsibleMotion;
