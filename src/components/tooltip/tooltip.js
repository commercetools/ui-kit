import PropTypes from 'prop-types';
import React from 'react';
import getFieldId from '../../utils/get-field-id';
import { getBodyStyles, getWrapperStyles } from './tooltip.styles';

class Tooltip extends React.Component {
  static displayName = 'ToolTip';

  state = {
    isHidden: false,
  };

  static getDerivedStateFromProps = (props, state) => ({
    id: getFieldId(props, state, 'tooltip-'),
  });

  render() {
    return (
      <React.Fragment>
        {React.cloneElement(this.props.children, {
          ...this.props.children.props,
          'aria-describedby': this.state.id,
        })}
        <div
          css={getWrapperStyles()}
          aria-label={this.props.ariaLabel}
          aria-hidden={this.state.isHidden}
        >
          <span id={this.state.id} css={getBodyStyles()}>
            {this.props.title}
          </span>
        </div>
      </React.Fragment>
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
};

export default Tooltip;
