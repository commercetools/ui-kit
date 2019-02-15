// inspired from https://github.com/mui-org/material-ui/blob/9ecc8db8abbfb829111d3b5c0678267827984024/packages/material-ui/src/Tooltip/Tooltip.js
import PropTypes from 'prop-types';
import React from 'react';
import { isValidElementType } from 'react-is';
import styled from '@emotion/styled';
import { Manager, Reference, Popper } from 'react-popper';
import getFieldId from '../../utils/get-field-id';
import createSequentialId from '../../utils/create-sequential-id';
import RootRef from '../internals/root-ref';
import { Body, getBodyStyles } from './tooltip.styles';

const sequentialId = createSequentialId('tooltip-');

const Wrapper = styled.div`
  display: inline-block;
`;

class Tooltip extends React.Component {
  static displayName = 'ToolTip';

  static propTypes = {
    children: PropTypes.node.isRequired,
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale'])
      .isRequired,
    closeAfter: PropTypes.number.isRequired,
    isEnabled: PropTypes.bool.isRequired,
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

  static defaultProps = {
    components: {},
    closeAfter: 0,
    horizontalConstraint: 'scale',
    isEnabled: true,
    placement: 'top',
    type: 'info',
  };

  static getDerivedStateFromProps = (props, state) => ({
    id: getFieldId(props, state, sequentialId),
  });

  state = {
    open: this.isControlled ? this.props.isOpen : false,
  };

  componentWillUnmount() {
    clearTimeout(this.leaveTimer);
  }

  handleEnter = event => {
    const childrenProps = this.props.children.props;
    // Remove the title ahead of time.
    // We don't want to wait for the next render commit.
    // We would risk displaying two tooltips at the same time (native + this one).
    if (this.childrenRef && typeof this.childrenRef === 'function') {
      this.childrenRef.setAttribute('title', '');
    }

    if (event.type === 'mouseover' && childrenProps.onMouseOver) {
      childrenProps.onMouseOver(event);
    }

    if (event.type === 'focus' && childrenProps.onFocus) {
      childrenProps.onFocus(event);
    }

    if (!this.state.open && !this.isControlled) {
      this.setState({
        open: true,
      });
    }

    if (this.props.onOpen) {
      this.props.onOpen(event);
    }

    event.preventDefault();
    event.stopPropagation();
  };

  handleLeave = event => {
    const childrenProps = this.props.children.props;
    clearTimeout(this.leaveTimer);

    if (event.type === 'mouseleave' && childrenProps.onMouseLeave) {
      childrenProps.onMouseLeave(event);
    }

    if (event.type === 'blur' && childrenProps.onBlur) {
      childrenProps.onBlur(event);
    }

    if (this.props.closeAfter) {
      this.leaveTimer = setTimeout(() => {
        this.handleClose();
      }, this.props.closeAfter);
    } else {
      this.handleClose();
    }
  };

  handleClose = event => {
    if (!this.isControlled) {
      this.setState({
        open: false,
      });
    }
    if (this.props.onClose) {
      this.props.onClose(event);
    }
  };

  setChildrenRef = ref => {
    this.childrenRef = ref;
  };

  isControlled = this.props.isOpen != null;

  render() {
    const open = this.isControlled ? this.props.isOpen : this.state.open;

    const childrenProps = {
      'aria-describedby': open ? this.state.id : null,
      // for seo and accessibility, we add the tooltip's title
      // as a native title when the title is hidden
      title:
        !open && typeof this.props.title === 'string' ? this.props.title : null,
      ...this.props.children.props,
      // don't pass event listeners to children
      onFocus: null,
      onMouseOver: null,
      onMouseLeave: null,
      onBlur: null,
    };

    const eventListeners = this.props.isEnabled
      ? {
          onMouseOver: this.handleEnter,
          onMouseLeave: this.handleLeave,
          onFocus: this.handleEnter,
          onBlur: this.handleLeave,
        }
      : {};

    const WrapperComponent = this.props.components.WrapperComponent || Wrapper;
    const BodyComponent = this.props.components.BodyComponent || Body;

    return (
      <Manager>
        <Reference innerRef={this.setChildrenRef}>
          {({ ref }) => (
            <WrapperComponent {...eventListeners}>
              <RootRef rootRef={ref}>
                {React.cloneElement(this.props.children, { ...childrenProps })}
              </RootRef>
            </WrapperComponent>
          )}
        </Reference>
        {open && (
          <Popper placement={this.props.placement}>
            {({ ref, style, placement }) => (
              <div
                ref={ref}
                css={{
                  ...style,
                  ...getBodyStyles({
                    constraint: this.props.horizontalConstraint,
                    placement,
                  }),
                }}
                data-placement={placement}
              >
                <BodyComponent>{this.props.title}</BodyComponent>
              </div>
            )}
          </Popper>
        )}
      </Manager>
    );
  }
}

export default Tooltip;
