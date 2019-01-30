import PropTypes from 'prop-types';
import React from 'react';
import { css } from '@emotion/core';
import getFieldId from '../../utils/get-field-id';
import { getBodyStyles } from './tooltip.styles';

class Tooltip extends React.Component {
  static displayName = 'ToolTip';

  state = {
    open: false,
  };

  static getDerivedStateFromProps = (props, state) => ({
    id: getFieldId(props, state, 'tooltip-'),
  });

  handleEnter = () => {
    this.setState({
      open: true,
    });
  };

  handleLeave = () => {
    clearTimeout(this.leaveTimer);

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
    return (
      <React.Fragment>
        <div
          // this is the container
          css={css`
            position: relative;
          `}
          onMouseOver={this.handleEnter}
          onMouseOut={this.handleLeave}
          onFocus={this.handleEnter}
          onBlur={this.handleLeave}
        >
          {React.cloneElement(this.props.children, {
            ...this.props.children.props,
            'aria-describedby': this.state.id,
          })}
        </div>
        <div
          css={css`
            box-sizing: content-box;
            max-height: 150px;
            opacity: 1;
            visibility: visible;
            position: absolute;
            margin-left: auto;
            margin-right: auto;
            cursor: default;
          `}
        >
          <span
            id={this.state.id}
            css={getBodyStyles({ type: this.props.type })}
            aria-label={this.props.title}
            aria-hidden={!this.state.open}
            role="tooltip"
          >
            {this.props.title}
          </span>
        </div>
      </React.Fragment>
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  leaveDelay: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['warning', 'info', 'error']).isRequired,
  position: PropTypes.oneOf(['top', 'top-right', 'bottom', 'left', 'right']),
  title: PropTypes.string.isRequired,
};

Tooltip.defaultProps = {
  leaveDelay: 0,
  type: 'info',
};

export default Tooltip;
