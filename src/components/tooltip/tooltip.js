// inspired from https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Tooltip/Tooltip.js
import PropTypes from 'prop-types';
import React from 'react';
import { Manager, Reference, Popper } from 'react-popper';
import invariant from 'tiny-invariant';
import getFieldId from '../../utils/get-field-id';
import createSequentialId from '../../utils/create-sequential-id';
import { getBodyStyles } from './tooltip.styles';

const sequentialId = createSequentialId('tooltip-');

class Tooltip extends React.Component {
  static displayName = 'ToolTip';

  constructor(props) {
    super(props);
    this.isControlled = props.open != null;
    this.state = {
      open: null,
    };

    if (!this.isControlled) {
      // not controlled, use internal state
      this.state.open = false;
    }
  }

  static getDerivedStateFromProps = (props, state) => ({
    id: getFieldId(props, state, sequentialId),
  });

  componentDidMount() {
    // eslint-disable-next-line no-console
    const childrenProps = this.props.children.props;

    invariant(
      !(childrenProps.disabled || childrenProps.isDisabled),
      [
        'ui-kit: you are providing a disabled `button` child to the Tooltip component.',
        'A disabled element does not fire events.',
        "Tooltip needs to listen to the child element's events to display the title.",
        '',
        'Place a `div` container on top of the element.',
      ].join('\n')
    );
  }

  componentWillUnmount() {
    clearTimeout(this.leaveTimer);
  }

  handleEnter = event => {
    const childrenProps = this.props.children.props;

    // Remove the title ahead of time.
    // We don't want to wait for the next render commit.
    // We would risk displaying two tooltips at the same time (native + this one).
    this.childrenRef.setAttribute('title', '');

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

  onRootRef = ref => {
    this.childrenRef = ref;
  };

  render() {
    const open = this.isControlled ? this.props.open : this.state.open;

    const childrenProps = {
      'aria-describedby': open ? this.state.id : null,
      // for seo and accessibility, we add the tooltip's title
      // as a native title when the title is hidden
      title:
        !open && typeof this.props.title === 'string' ? this.props.title : null,
      ...this.props.children.props,
    };

    childrenProps.onMouseOver = this.handleEnter;
    childrenProps.onMouseLeave = this.handleLeave;
    childrenProps.onFocus = this.handleEnter;
    childrenProps.onBlur = this.handleLeave;

    return (
      <Manager>
        <Reference innerRef={this.onRootRef}>
          {({ ref }) =>
            React.cloneElement(this.props.children, {
              ...childrenProps,
              ref,
            })
          }
        </Reference>
        {open && (
          <Popper placement={this.props.placement}>
            {({ ref, style, placement }) => (
              <div
                ref={ref}
                css={{
                  ...style,
                  ...getBodyStyles({
                    constraint: this.props.constraint,
                    type: this.props.type,
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

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  constraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']).isRequired,
  leaveDelay: PropTypes.number.isRequired,
  open: PropTypes.bool,
  type: PropTypes.oneOf(['warning', 'info', 'error']).isRequired,
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
};

Tooltip.defaultProps = {
  leaveDelay: 0,
  constraint: 'scale',
  placement: 'bottom',
  type: 'info',
};

export default Tooltip;
