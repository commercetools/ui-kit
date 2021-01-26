import PropTypes from 'prop-types';
import React from 'react';
import invariant from 'tiny-invariant';
import { keyframes, ClassNames } from '@emotion/react';
import isNil from 'lodash/isNil';
import { useToggleState, usePrevious } from '@commercetools-uikit/hooks';

const collapsibleMotionPropTypes = {
  /**
   * A render function, called with the following named arguments: `isOpen` (boolean), `toggle` (function),
   * `containerStyles` (css-in-js object), `registerContentNode` (React reference to be used on the animated container).
   * <br/>
   * Siganture: `({ isOpen, containerStyles, toggle, registerContentNode }) => React.node`
   */
  children: PropTypes.func.isRequired,
  /**
   * Determines the state of the toggle `isOpen`. Setting this prop will make the component **controlled**
   */
  // eslint-disable-next-line react/no-unused-prop-types
  isClosed: PropTypes.bool,
  /**
   * A callback function called when the `toggle` function is called. This prop is required when the component is **controlled**.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  onToggle: PropTypes.func,
  /**
   * The minimal height of the container being animated.
   */
  minHeight: PropTypes.number,
  /**
   *The initial value to the internal toggle state `isOpen`.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  isDefaultClosed: PropTypes.bool,
};

const defaultProps = {
  minHeight: 0,
};

const getMinHeight = (minHeight) =>
  minHeight !== 0 ? `${minHeight}px` : minHeight;

const getVisibility = (height) => (height === 0 ? 'hidden' : 'visible');

const createOpeningAnimation = (height, minHeight = 0) =>
  keyframes`
    0% { height: ${getMinHeight(
      minHeight
    )}; overflow: hidden; visibility: ${getVisibility(minHeight)}; }
    99% { height: ${height}px; overflow: hidden; }
    100% { height: auto; overflow: visible; }
  `;

const createClosingAnimation = (height, minHeight) =>
  keyframes`
    from { height: ${height}px; }
    to { height: ${getMinHeight(
      minHeight
    )}; overflow: hidden; visibility: ${getVisibility(minHeight)}; }
  `;

const useToggleAnimation = (isOpen, toggle, minHeight) => {
  const nodeRef = React.useRef();
  const animationRef = React.useRef(null);
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
    : {
        height: getMinHeight(minHeight),
        overflow: 'hidden',
        visibility: getVisibility(minHeight),
      };

  // if state has changed
  if (typeof prevIsOpen !== 'undefined' && prevIsOpen !== isOpen) {
    animationRef.current = isOpen
      ? createOpeningAnimation(nodeRef.current.clientHeight, minHeight)
      : createClosingAnimation(nodeRef.current.clientHeight, minHeight);
  }

  return [animationRef.current, containerStyles, handleToggle, nodeRef];
};

const ControlledCollapsibleMotion = (props) => {
  const [
    animation,
    containerStyles,
    animationToggle,
    registerContentNode,
  ] = useToggleAnimation(!props.isClosed, props.onToggle, props.minHeight);

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

const UncontrolledCollapsibleMotion = (props) => {
  const [isOpen, toggle] = useToggleState(!props.isDefaultClosed);

  const [
    animation,
    containerStyles,
    animationToggle,
    registerContentNode,
  ] = useToggleAnimation(isOpen, toggle, props.minHeight);

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
UncontrolledCollapsibleMotion.defaultProps = defaultProps;
UncontrolledCollapsibleMotion.propTypes = collapsibleMotionPropTypes;

const CollapsibleMotion = (props) => {
  const isControlledComponent = !isNil(props.isClosed);

  if (isControlledComponent) {
    return <ControlledCollapsibleMotion {...props} />;
  }

  return <UncontrolledCollapsibleMotion {...props} />;
};
CollapsibleMotion.displayName = 'CollapsibleMotion';
CollapsibleMotion.defaultProps = defaultProps;
CollapsibleMotion.propTypes = collapsibleMotionPropTypes;

export default CollapsibleMotion;
