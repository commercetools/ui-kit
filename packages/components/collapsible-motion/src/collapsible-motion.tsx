import {
  useRef,
  useEffect,
  useCallback,
  ReactNode,
  CSSProperties,
  LegacyRef,
} from 'react';
import { warning } from '@commercetools-uikit/utils';
import { keyframes, ClassNames } from '@emotion/react';

import isNil from 'lodash/isNil';
import { useToggleState, usePrevious } from '@commercetools-uikit/hooks';

export type TContainerStyles = {
  height?: string | number;
  overflow?: string;
  visibility?: string;
  name?: string;
  animation?: string;
} & CSSProperties;

export type TRenderFunctionOptions = {
  isOpen: boolean;
  containerStyles: TContainerStyles;
  toggle: () => void;
  registerContentNode: TNodeRefObject;
};

export type TCollapsibleMotionProps = {
  /**
   * A render function, called with the following named arguments: `isOpen` (boolean), `toggle` (function),
   * `containerStyles` (css-in-js object), `registerContentNode` (React reference to be used on the animated container).
   * <br/>
   * Siganture: `({ isOpen, containerStyles, toggle, registerContentNode }) => React.node`
   */
  children: (options: TRenderFunctionOptions) => ReactNode;
  /**ReactNode
   * Determines the state of the toggle `isOpen`. Setting this prop will make the component **controlled**
   */
  isClosed?: boolean;
  /**
   * A callback function called when the `toggle` function is called. This prop is required when the component is **controlled**.
   */
  onToggle?: () => void;
  /**
   * The minimal height of the container being animated.
   */
  minHeight?: number;
  /**
   *The initial value to the internal toggle state `isOpen`.
   */
  isDefaultClosed?: boolean;
};

const defaultProps: Pick<TCollapsibleMotionProps, 'minHeight'> = {
  minHeight: 0,
};

const getMinHeight = (minHeight: number) =>
  minHeight !== 0 ? `${minHeight}px` : minHeight;

const getVisibility = (height: number) => (height === 0 ? 'hidden' : 'visible');

const createOpeningAnimation = (height: number, minHeight = 0) =>
  keyframes`
    0% { height: ${getMinHeight(
      minHeight
    )}; overflow: hidden; visibility: ${getVisibility(minHeight)}; }
    99% { height: ${height}px; overflow: hidden; }
    100% { height: auto; overflow: visible; }
  `;

const createClosingAnimation = (height: number, minHeight = 0) =>
  keyframes`
    from { height: ${height}px; }
    to { height: ${getMinHeight(
      minHeight
    )}; overflow: hidden; visibility: ${getVisibility(minHeight)}; }
  `;

export type TNodeRefObject = {
  clientHeight: number;
} & LegacyRef<HTMLDivElement>;

const useToggleAnimation = (
  isOpen: boolean,
  toggle?: () => void,
  minHeight = 0
) => {
  const nodeRef = useRef<TNodeRefObject>();
  const animationRef = useRef<ReturnType<typeof keyframes> | null>(null);
  const prevIsOpen = usePrevious(isOpen);

  useEffect(
    () => {
      warning(
        nodeRef.current,
        'You need to call `registerContentNode` in order to use this component'
      );
    },
    // to match the componentDidMount behaviour
    [nodeRef]
  );

  const handleToggle = useCallback(() => {
    warning(
      nodeRef.current,
      'You need to call `registerContentNode` in order to use this component'
    );

    // set panel height to the height of the content,
    // so we can animate between the height and 0
    toggle && toggle();
  }, [nodeRef, toggle]);

  const containerStyles: TContainerStyles = isOpen
    ? { height: 'auto' }
    : {
        height: getMinHeight(minHeight),
        overflow: 'hidden',
        visibility: getVisibility(minHeight),
      };

  // if state has changed
  if (
    typeof prevIsOpen !== 'undefined' &&
    prevIsOpen !== isOpen &&
    nodeRef.current
  ) {
    animationRef.current = isOpen
      ? createOpeningAnimation(nodeRef.current.clientHeight, minHeight)
      : createClosingAnimation(nodeRef.current.clientHeight, minHeight);
  }

  return [animationRef.current, containerStyles, handleToggle, nodeRef];
};

const ControlledCollapsibleMotion = (props: TCollapsibleMotionProps) => {
  const [animation, containerStyles, animationToggle, registerContentNode] =
    useToggleAnimation(!props.isClosed, props.onToggle, props.minHeight);

  return (
    <ClassNames>
      {({ css }) => {
        let animationStyle = {};

        if (animation) {
          // By calling `css`, emotion injects the required CSS into the document head.
          // eslint-disable-next-line no-unused-expressions
          css`
            animation: ${animation as ReturnType<typeof keyframes>} 200ms
              forwards;
          `;
          animationStyle = {
            animation: `${
              (animation as ReturnType<typeof keyframes>).name
            } 200ms forwards`,
          };
        }

        return props.children({
          isOpen: !props.isClosed,
          containerStyles: {
            ...(containerStyles as TContainerStyles),
            ...animationStyle,
          },
          toggle: animationToggle as () => void,
          registerContentNode: registerContentNode as TNodeRefObject,
        });
      }}
    </ClassNames>
  );
};
ControlledCollapsibleMotion.displayName = 'ControlledCollapsibleMotion';

const UncontrolledCollapsibleMotion = (props: TCollapsibleMotionProps) => {
  const [isOpen, toggle] = useToggleState(!props.isDefaultClosed);

  const [animation, containerStyles, animationToggle, registerContentNode] =
    useToggleAnimation(isOpen, toggle, props.minHeight);

  return (
    <ClassNames>
      {({ css }) => {
        let animationStyle = {};

        if (animation) {
          // By calling `css`, emotion injects the required CSS into the document head.
          // eslint-disable-next-line no-unused-expressions
          css`
            animation: ${animation as ReturnType<typeof keyframes>} 200ms
              forwards;
          `;
          animationStyle = {
            animation: `${
              (animation as ReturnType<typeof keyframes>).name
            } 200ms forwards`,
          };
        }

        return props.children({
          isOpen,
          containerStyles: {
            ...(containerStyles as TContainerStyles),
            ...animationStyle,
          },
          toggle: animationToggle as () => void,
          registerContentNode: registerContentNode as TNodeRefObject,
        });
      }}
    </ClassNames>
  );
};
UncontrolledCollapsibleMotion.displayName = 'UncontrolledCollapsibleMotion';
UncontrolledCollapsibleMotion.defaultProps = defaultProps;

const CollapsibleMotion = (props: TCollapsibleMotionProps) => {
  const isControlledComponent = !isNil(props.isClosed);

  if (isControlledComponent) {
    return <ControlledCollapsibleMotion {...props} />;
  }

  return <UncontrolledCollapsibleMotion {...props} />;
};
CollapsibleMotion.displayName = 'CollapsibleMotion';
CollapsibleMotion.defaultProps = defaultProps;

export default CollapsibleMotion;
