// inspired from https://github.com/mui-org/material-ui/blob/9ecc8db8abbfb829111d3b5c0678267827984024/packages/material-ui/src/Tooltip/Tooltip.js
import PropTypes from 'prop-types';
import React from 'react';
import { isValidElementType } from 'react-is';
import styled from '@emotion/styled';
import isNil from 'lodash/isNil';
import { Manager, Reference, Popper } from 'react-popper';
import getFieldId from '../../utils/get-field-id';
import createSequentialId from '../../utils/create-sequential-id';
import RootRef from '../internals/root-ref';
import { Body, getBodyStyles } from './tooltip.styles';

const sequentialId = createSequentialId('tooltip-');

const Wrapper = styled.div`
  display: inline-block;
`;

const TooltipWrapper = props => (
  <React.Fragment>{props.children}</React.Fragment>
);
TooltipWrapper.displayName = 'TooltipWrapperComponent';
TooltipWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

const Tooltip = props => {
  const leaveTimer = React.useRef();
  const childrenRef = React.useRef();

  React.useEffect(() => {
    return () => {
      if (leaveTimer.current) {
        clearTimeout(leaveTimer.current);
      }
    };
  }, []);

  const [isOpen, setIsOpen] = React.useState(false);
  const closeTooltip = React.useCallback(() => {
    setIsOpen(false);
  }, []);
  const openTooltip = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const isControlled = !isNil(props.isOpen);
  const open = isControlled ? props.isOpen : isOpen;
  const id = getFieldId(props, {}, sequentialId);

  const { onClose } = props;
  const handleClose = React.useCallback(
    event => {
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
    event => {
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
    event => {
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

  const childrenProps = {
    'aria-describedby': open ? id : null,
    // for seo and accessibility, we add the tooltip's title
    // as a native title when the title is hidden
    title: !open && typeof props.title === 'string' ? props.title : null,
    ...props.children.props,
    // don't pass event listeners to children
    onFocus: null,
    onMouseOver: null,
    onMouseLeave: null,
    onBlur: null,
  };

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
    <Manager>
      <Reference innerRef={childrenRef}>
        {({ ref }) => (
          <WrapperComponent {...eventListeners}>
            <RootRef rootRef={ref}>
              {React.cloneElement(props.children, { ...childrenProps })}
            </RootRef>
          </WrapperComponent>
        )}
      </Reference>
      {open && (
        <TooltipWrapperComponent>
          <Popper placement={props.placement} positionFixed={true}>
            {({ ref, style, placement }) => (
              <div
                ref={ref}
                css={{
                  ...style,
                  ...getBodyStyles({
                    constraint: props.horizontalConstraint,
                    placement,
                    customStyles: props.styles.body,
                  }),
                }}
                data-placement={placement}
              >
                <BodyComponent>{props.title}</BodyComponent>
              </div>
            )}
          </Popper>
        </TooltipWrapperComponent>
      )}
    </Manager>
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
