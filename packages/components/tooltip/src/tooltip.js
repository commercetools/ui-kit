// inspired from https://github.com/mui-org/material-ui/blob/9ecc8db8abbfb829111d3b5c0678267827984024/packages/material-ui/src/Tooltip/Tooltip.js
import PropTypes from 'prop-types';
import React from 'react';
import { isValidElementType } from 'react-is';
import isNil from 'lodash/isNil';
import usePopper from 'use-popper';
import { useFieldId, useToggleState } from '@commercetools-uikit/hooks';
import {
  createSequentialId,
  SafeHTMLElement,
} from '@commercetools-uikit/utils';
import { Body, getBodyStyles, Wrapper } from './tooltip.styles';

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
          handleClose();
        }, closeAfter);
      } else {
        handleClose();
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
  horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale'])
    .isRequired,
  closeAfter: PropTypes.number.isRequired,
  styles: PropTypes.shape({
    body: PropTypes.object.isRequired,
  }).isRequired,
  off: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool,
  id: PropTypes.string,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
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
  title: PropTypes.string.isRequired,
  components: PropTypes.shape({
    BodyComponent: (props, propName) => {
      if (props[propName] && !isValidElementType(props[propName])) {
        return new Error(
          `Invalid prop 'components.BodyComponent' supplied to 'Tooltip': the prop is not a valid React component`
        );
      }
      return null;
    },
    TooltipWrapperComponent: (props, propName) => {
      if (props[propName] && !isValidElementType(props[propName])) {
        return new Error(
          `Invalid prop 'components.TooltipWrapperComponent' supplied to 'Tooltip': the prop is not a valid React component`
        );
      }
      return null;
    },
    WrapperComponent: (props, propName) => {
      if (props[propName] && !isValidElementType(props[propName])) {
        return new Error(
          `Invalid prop 'components.WrapperComponent' supplied to 'Tooltip': the prop is not a valid React component`
        );
      }
      return null;
    },
  }),
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
  type: 'info',
};

export default Tooltip;
