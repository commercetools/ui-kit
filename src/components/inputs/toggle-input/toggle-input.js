import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import ToggleSwitch from './toggle-switch';
import filterDataAttributes from '../../../utils/filter-data-attributes';

class ToggleInput extends React.PureComponent {
  static displayName = 'Toggle';
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.oneOf(['small', 'big']).isRequired,
    isDisabled: PropTypes.bool,
    isChecked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isDisabled: false,
    isChecked: false,
    size: 'big',
  };

  render() {
    return (
      <label
        css={css`
          cursor: ${this.props.isDisabled ? 'not-allowed' : 'pointer'};
        `}
      >
        <ToggleSwitch
          size={this.props.size}
          isChecked={this.props.isChecked}
          isDisabled={this.props.isDisabled}
        />
        <input
          css={css`
            display: none;
          `}
          id={this.props.id}
          name={this.props.name}
          onChange={this.props.onChange}
          disabled={this.props.isDisabled}
          checked={this.props.isChecked}
          type="checkbox"
          {...filterDataAttributes(this.props)}
        />
      </label>
    );
  }
}

export default ToggleInput;
