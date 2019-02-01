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

  state = {
    open: false,
  };

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

  handleEnter = event => {
    const childrenProps = this.props.children.props;

    if (event.type === 'mouseover' && childrenProps.onMouseOver) {
      childrenProps.onMouseOver(event);
    }

    if (event.type === 'focus' && childrenProps.onFocus) {
      childrenProps.onFocus(event);
    }

    if (!this.state.open) {
      this.setState({
        open: true,
      });
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

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const childrenProps = {
      'aria-describedby': this.state.open ? this.state.id : null,
      ...this.props.children.props,
    };

    childrenProps.onMouseOver = this.handleEnter;
    childrenProps.onMouseLeave = this.handleLeave;
    childrenProps.onFocus = this.handleEnter;
    childrenProps.onBlur = this.handleLeave;

    return (
      <Manager>
        <Reference>
          {({ ref }) =>
            React.cloneElement(this.props.children, {
              ...childrenProps,
              ref,
            })
          }
        </Reference>
        <Popper placement={this.props.placement}>
          {({ ref, style, placement }) => (
            <div
              ref={ref}
              css={{ ...style, ...getBodyStyles({ type: this.props.type }) }}
              data-placement={placement}
              aria-hidden={!this.state.open}
            >
              {this.props.title}
            </div>
          )}
        </Popper>
      </Manager>
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  leaveDelay: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['warning', 'info', 'error']).isRequired,
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
  placement: 'bottom',
  type: 'info',
};

export default Tooltip;
