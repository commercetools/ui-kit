// inspired from https://github.com/mui-org/material-ui/blob/9ecc8db8abbfb829111d3b5c0678267827984024/packages/material-ui/src/Tooltip/Tooltip.js
import PropTypes from 'prop-types';
import React from 'react';
import { isValidElementType } from 'react-is';
import invariant from 'tiny-invariant';
import isNil from 'lodash/isNil';
import usePopper from 'use-popper';
import { useFieldId, useToggleState } from '@commercetools-uikit/hooks';
import {
  createSequentialId,
  SafeHTMLElement,
} from '@commercetools-uikit/utils';
import { Wrapper, Body, getBodyStyles } from './tooltip.styles';

const sequentialId = createSequentialId('tooltip-');

const TooltipWrapper = (props) => (
  <React.Fragment>{props.children}</React.Fragment>
);
TooltipWrapper.displayName = 'TooltipWrapperComponent';
TooltipWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

const Tooltip = (props) => {
  const leaveTimer = React.useRef();
  const childrenRef = React.useRef();

  invariant(
    props.components.BodyComponent
      ? isValidElementType(props.components.BodyComponent)
      : true,
    `ui-kit/Tooltip: the prop 'components.BodyComponent' is not a valid React element.`
  );
  invariant(
    props.components.TooltipWrapperComponent
      ? isValidElementType(props.components.TooltipWrapperComponent)
      : true,
    `ui-kit/Tooltip: the prop 'components.TooltipWrapperComponent' is not a valid React element.`
  );
  invariant(
    props.components.WrapperComponent
      ? isValidElementType(props.components.WrapperComponent)
      : true,
    `ui-kit/Tooltip: the prop 'components.WrapperComponent' is not a valid React element.`
  );

  React.useEffect(() => {
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
  const closeTooltip = React.useCallback(() => {
    toggle(false);
  }, [toggle]);
  const openTooltip = React.useCallback(() => {
    toggle(true);
  }, [toggle]);

  const isControlled = !isNil(props.isOpen);
  const tooltipIsOpen = isControlled ? props.isOpen : isOpen;
  const id = useFieldId(props.id, sequentialId);

  const { onClose } = props;
  const handleClose = React.useCallback(
    (event) => {
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
  const handleEnter = React.useCallback(
    (event) => {
      // Remove the title ahead of time.
      // We don't want to wait for the next render commit.
      // We would risk displaying two tooltips at the same time (native + this one).
      if (childrenRef && typeof childrenRef === 'function') {
        childrenRef.setAttribute('title', '');
      }

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
    },
    [onFocus, onOpen, onMouseOver, isControlled, isOpen, openTooltip]
  );

  const { onBlur, onMouseLeave } = props.children.props;
  const { closeAfter } = props;

  const handleLeave = React.useCallback(
    (event) => {
      clearTimeout(leaveTimer);

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

  React.useEffect(() => {
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

  const WrapperComponent = props.components.WrapperComponent || Wrapper;
  const BodyComponent = props.components.BodyComponent || Body;
  const TooltipWrapperComponent =
    props.components.TooltipWrapperComponent || TooltipWrapper;

  return (
    <React.Fragment>
      <WrapperComponent {...eventListeners} ref={reference.ref}>
        {React.cloneElement(props.children, {
          ...childrenProps,
          ...tooltipProps,
        })}
      </WrapperComponent>
      {tooltipIsOpen && (
        <TooltipWrapperComponent>
          <div
            ref={popper.ref}
            css={{
              ...popper.styles,
              ...getBodyStyles({
                constraint: props.horizontalConstraint,
                placement: popper.placement,
                customStyles: props.styles.body,
              }),
            }}
            data-placement={popper.placement}
          >
            <BodyComponent>{props.title}</BodyComponent>
          </div>
        </TooltipWrapperComponent>
      )}
    </React.Fragment>
  );
};

Tooltip.displayName = 'ToolTip';

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Horizontal size limit of the tooltip.
   */
  horizontalConstraint: PropTypes.oneOf([
    'xs',
    's',
    'm',
    'l',
    'xl',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    'scale',
    'auto',
  ]).isRequired,
  /**
   * Delay (in milliseconds) between the end of the user interaction, and the closing of the tooltip.
   */
  closeAfter: PropTypes.number.isRequired,
  /**
   * Custom css-in-js object styles for the tooltip body.
   */
  styles: PropTypes.shape({
    body: PropTypes.object.isRequired,
  }).isRequired,
  /**
   * Determines if the tooltip should not appear.
   */
  off: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool,
  /**
   * An identifier for the tooltip, used for `aria-describedby`.
   */
  id: PropTypes.string,
  /**
   * A callback function, called when the tooltip is closing.
   * <br>
   * Signature `(event) => void`
   */
  onClose: PropTypes.func,
  /**
   * A callback function, called when the tooltip is opening.
   * <br>
   * Signature `(event) => void`
   */
  onOpen: PropTypes.func,
  /**
   * How the tooltip is positioned relative to the child element.
   */
  placement: PropTypes.oneOf([
    'top',
    'top-start',
    'top-end',
    'right',
    'right-start',
    'right-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end',
  ]),
  /**
   * The message to show in the tooltip.
   */
  title: PropTypes.string.isRequired,
  /**
   * Customize the appearance of certain elements of the tooltip.
   */
  components: PropTypes.shape({
    /**
     * The component rendered as the tooltip body.
     */
    BodyComponent: PropTypes.elementType,
    /**
     * Where the tooltip should be rendered. This can be useful to render the tooltip into another part of the document, using React portal.
     */
    TooltipWrapperComponent: PropTypes.elementType,
    /**
     * A custom component wrapper for the tooltip.
     */
    WrapperComponent: PropTypes.elementType,
  }),
  /**
   * Provides a way to fine-tune an appearance of underlying Popper tooltip element. For more information, please check [Popper.js documentation](https://popper.js.org/popper-documentation.html#modifiers).
   */
  modifiers: PropTypes.shape({
    shift: PropTypes.shape({
      order: PropTypes.number,
      enabled: PropTypes.bool,
      fn: PropTypes.func,
    }),
    offset: PropTypes.shape({
      order: PropTypes.number,
      enabled: PropTypes.bool,
      fn: PropTypes.func,
      offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    preventOverflow: PropTypes.shape({
      order: PropTypes.number,
      enabled: PropTypes.bool,
      fn: PropTypes.func,
      priority: PropTypes.arrayOf(['left', 'right', 'top', 'bottom']),
      padding: PropTypes.number,
      boundariesElement: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(SafeHTMLElement),
      ]),
    }),
    keepTogether: PropTypes.shape({
      order: PropTypes.number,
      enabled: PropTypes.bool,
      fn: PropTypes.func,
    }),
    arrow: PropTypes.shape({
      order: PropTypes.number,
      enabled: PropTypes.bool,
      fn: PropTypes.func,
      element: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(SafeHTMLElement),
      ]),
    }),
    flip: PropTypes.shape({
      order: PropTypes.number,
      enabled: PropTypes.bool,
      fn: PropTypes.func,
      behavior: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
      ]),
      padding: PropTypes.number,
      boundariesElement: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(SafeHTMLElement),
      ]),
    }),
    inner: PropTypes.shape({
      order: PropTypes.number,
      enabled: PropTypes.bool,
      fn: PropTypes.func,
    }),
    hide: PropTypes.shape({
      order: PropTypes.number,
      enabled: PropTypes.bool,
      fn: PropTypes.func,
    }),
    computeStyle: PropTypes.shape({
      order: PropTypes.number,
      enabled: PropTypes.bool,
      fn: PropTypes.func,
      gpuAcceleration: PropTypes.bool,
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    applyStyle: PropTypes.shape({
      order: PropTypes.number,
      enabled: PropTypes.bool,
      fn: PropTypes.func,
      onLoad: PropTypes.func,
    }),
  }),
};

Tooltip.defaultProps = {
  components: {},
  styles: { body: {} },
  closeAfter: 0,
  horizontalConstraint: 'scale',
  off: false,
  placement: 'top',
};

export default Tooltip;
