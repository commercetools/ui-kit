// inspired from https://github.com/mui-org/material-ui/blob/9ecc8db8abbfb829111d3b5c0678267827984024/packages/material-ui/src/RootRef/RootRef.js#L7-L36
import PropTypes from 'prop-types';
import React from 'react';
import { isValidElementType } from 'react-is';
import styled from '@emotion/styled';
import { Manager, Reference, Popper } from 'react-popper';
import getFieldId from '../../utils/get-field-id';
import createSequentialId from '../../utils/create-sequential-id';
import RootRef from '../internals/root-ref';
import { getBodyStyles } from './tooltip.styles';

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
    leaveDelay: PropTypes.number.isRequired,
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
      WrapperComponent: (props, propName) => {
        if (props[propName] && !isValidElementType(props[propName])) {
          return new Error(
            `Invalid prop 'component' supplied to 'WrappedComponent': the prop is not a valid React component`
          );
        }
        return null;
      },
    }),
  };

  static defaultProps = {
    components: {},
    leaveDelay: 0,
    horizontalConstraint: 'scale',
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

    if (this.props.leaveDelay) {
      this.leaveTimer = setTimeout(() => {
        this.handleClose();
      }, this.props.leaveDelay);
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
    };

    const eventListeners = {
      onMouseOver: this.handleEnter,
      onMouseLeave: this.handleLeave,
      onFocus: this.handleEnter,
      onBlur: this.handleLeave,
    };

    const WrapperComponent = this.props.components.WrapperComponent || Wrapper;

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
                {this.props.title}
              </div>
            )}
          </Popper>
        )}
      </Manager>
    );
  }
}

export default Tooltip;
