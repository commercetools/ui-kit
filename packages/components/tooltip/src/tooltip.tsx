// inspired from https://github.com/mui-org/material-ui/blob/9ecc8db8abbfb829111d3b5c0678267827984024/packages/material-ui/src/Tooltip/Tooltip.js
import { Modifiers } from 'popper.js';
import {
  ComponentType,
  FocusEvent,
  ChangeEvent,
  LegacyRef,
  CSSProperties,
  ReactElement,
  useRef,
  useEffect,
  useCallback,
  cloneElement,
} from 'react';
import { isValidElementType } from 'react-is';
import isNil from 'lodash/isNil';
import usePopper from 'use-popper';
import { useFieldId, useToggleState } from '@commercetools-uikit/hooks';
import { createSequentialId, warning } from '@commercetools-uikit/utils';
import { Wrapper, Body, getBodyStyles } from './tooltip.styles';

const sequentialId = createSequentialId('tooltip-');

export type TComponents = {
  /**
   * The component rendered as the tooltip body.
   */
  BodyComponent?: ComponentType;
  /**
   * Where the tooltip should be rendered. This can be useful to render the tooltip into another part of the document, using React portal.
   */
  TooltipWrapperComponent?: ComponentType;
  /**
   * A custom component wrapper for the tooltip.
   */
  WrapperComponent?: ComponentType;
};

export type TTooltipProps = {
  children: ReactElement;

  /**
   * Delay (in milliseconds) between the end of the user interaction, and the closing of the tooltip.
   */
  closeAfter: number;
  /**
   * Custom css-in-js object styles for the tooltip body.
   */
  styles?: Record<string, CSSProperties>;
  /**
   * Determines if the tooltip should not appear.
   */
  off: boolean;
  /**
   * An identifier for the tooltip, used for `aria-describedby`.
   */
  id?: string;
  /**
   * A callback function, called when the tooltip is closing.
   */
  onClose?: (e?: ChangeEvent | FocusEvent) => void;
  /**
   * A callback function, called when the tooltip is opening.
   */
  onOpen?: (e?: ChangeEvent | FocusEvent) => void;
  isOpen?: boolean;
  /**
   * How the tooltip is positioned relative to the child element.
   */
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end';
  /**
   * The message to show in the tooltip.
   */
  title: string;
  /**
   * Provides a way to fine-tune an appearance of underlying Popper tooltip element. For more information, please check [Popper.js documentation](https://popper.js.org/popper-documentation.html#modifiers).
   */
  modifiers?: Modifiers;
  /**
   * Customize the appearance of certain elements of the tooltip.
   */
  components?: TComponents;
  /**
   * Horizontal size limit of the tooltip.
   */
  horizontalConstraint?:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
};

const TooltipWrapper = (props: Pick<TTooltipProps, 'children'>) => (
  <>{props.children}</>
);
TooltipWrapper.displayName = 'TooltipWrapperComponent';

const tooltipDefaultProps: Pick<
  TTooltipProps,
  'closeAfter' | 'horizontalConstraint' | 'off' | 'placement'
> = {
  closeAfter: 0,
  horizontalConstraint: 'scale',
  off: false,
  placement: 'top',
};

const Tooltip = (props: TTooltipProps) => {
  const leaveTimer = useRef<ReturnType<typeof setTimeout>>();
  const childrenRef = useRef<ReturnType<typeof setTimeout>>();
  if (props.components?.BodyComponent) {
    warning(
      isValidElementType(props.components.BodyComponent),
      `ui-kit/Tooltip: the prop 'components.BodyComponent' is not a valid React element.`
    );
  }
  if (props.components?.TooltipWrapperComponent) {
    warning(
      isValidElementType(props.components.TooltipWrapperComponent),
      `ui-kit/Tooltip: the prop 'components.TooltipWrapperComponent' is not a valid React element.`
    );
  }
  if (props.components?.WrapperComponent) {
    warning(
      isValidElementType(props.components.WrapperComponent),
      `ui-kit/Tooltip: the prop 'components.WrapperComponent' is not a valid React element.`
    );
  }

  useEffect(() => {
    return () => {
      if (leaveTimer.current) {
        clearTimeout(leaveTimer.current);
      }
    };
  }, []);

  const { reference, popper } = usePopper({
    placement: props.placement,
    modifiers: props.modifiers,
  });
  const [isOpen, toggle] = useToggleState(false);
  const closeTooltip = useCallback(() => {
    toggle(false);
  }, [toggle]);
  const openTooltip = useCallback(() => {
    toggle(true);
  }, [toggle]);

  const isControlled = !isNil(props.isOpen);
  const tooltipIsOpen = isControlled ? props.isOpen : isOpen;
  const id = useFieldId(props.id, sequentialId);

  const { onClose } = props;
  const handleClose = useCallback(
    (event?: ChangeEvent | FocusEvent) => {
      if (!isControlled) {
        closeTooltip();
      }
      if (onClose) {
        onClose(event);
      }
    },
    [isControlled, closeTooltip, onClose]
  );

  const { onFocus, onMouseOver } = props.children.props;
  const { onOpen } = props;
  const handleEnter = useCallback(
    (event?: ChangeEvent | FocusEvent) => {
      // Remove the title ahead of time.
      // We don't want to wait for the next render commit.
      // We would risk displaying two tooltips at the same time (native + this one).
      if (childrenRef && typeof childrenRef === 'function') {
        // @ts-ignore
        childrenRef.setAttribute('title', '');
      }

      if (event) {
        if (event.type === 'mouseover' && onMouseOver) {
          onMouseOver(event);
        }

        if (event.type === 'focus' && onFocus) {
          onFocus(event);
        }

        if (!isOpen && !isControlled) {
          openTooltip();
        }

        if (onOpen) {
          onOpen(event);
        }

        event.preventDefault();
        event.stopPropagation();
      }
    },
    [onFocus, onOpen, onMouseOver, isControlled, isOpen, openTooltip]
  );

  const { onBlur, onMouseLeave } = props.children.props;
  const { closeAfter } = props;

  const handleLeave = useCallback(
    (event) => {
      if (leaveTimer.current) {
        clearTimeout(leaveTimer.current);
      }

      if (event.type === 'mouseleave' && onMouseLeave) {
        onMouseLeave(event);
      }

      if (event.type === 'blur' && onBlur) {
        onBlur(event);
      }

      if (closeAfter) {
        leaveTimer.current = setTimeout(() => {
          handleClose(event);
        }, closeAfter);
      } else {
        handleClose(event);
      }
    },
    [closeAfter, onBlur, onMouseLeave, handleClose]
  );

  useEffect(() => {
    // if tooltip was open, and then component
    // updated to be off, we should close the tooltip
    if (isOpen && props.off) {
      if (closeAfter) {
        leaveTimer.current = setTimeout(() => {
          handleClose();
        }, closeAfter);
      } else {
        handleClose();
      }
    }
  }, [props.off, closeAfter, handleClose, toggle, isOpen]);

  const childrenProps = {
    // don't pass event listeners to children
    onFocus: null,
    onMouseOver: null,
    onMouseLeave: null,
    onBlur: null,
  };

  const tooltipProps = !props.off
    ? {
        'aria-describedby': tooltipIsOpen ? id : null,
        // for seo and accessibility, we add the tooltip's title
        // as a native title when the title is hidden
        title:
          !tooltipIsOpen && typeof props.title === 'string'
            ? props.title
            : null,
      }
    : {};

  const eventListeners = !props.off
    ? {
        onMouseOver: handleEnter,
        onMouseLeave: handleLeave,
        onFocus: handleEnter,
        onBlur: handleLeave,
      }
    : {};

  const WrapperComponent = props.components?.WrapperComponent || Wrapper;
  const BodyComponent = props.components?.BodyComponent || Body;
  const TooltipWrapperComponent =
    props.components?.TooltipWrapperComponent || TooltipWrapper;

  return (
    <>
      <WrapperComponent
        {...eventListeners}
        // @ts-expect-error: yes, ref can be undefined
        ref={reference.ref}
      >
        {cloneElement(props.children, {
          ...childrenProps,
          ...tooltipProps,
        })}
      </WrapperComponent>
      {tooltipIsOpen && (
        <TooltipWrapperComponent>
          <div
            // ref accepts `LegacyRef`, which is a union of `RefObject` and `string`
            // propper.ref returns `RefObject`
            ref={popper.ref as LegacyRef<HTMLDivElement>}
            style={{
              ...popper.styles,
              ...getBodyStyles({
                constraint: props.horizontalConstraint,
                placement: popper.placement,
                customStyles: props.styles?.body,
              }),
            }}
            data-placement={popper.placement}
          >
            <BodyComponent>{props.title}</BodyComponent>
          </div>
        </TooltipWrapperComponent>
      )}
    </>
  );
};

Tooltip.displayName = 'ToolTip';
Tooltip.defaultProps = tooltipDefaultProps;

export default Tooltip;
