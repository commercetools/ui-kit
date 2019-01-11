import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './toggle.mod.css';
import ToggleSwitch from './toggle-switch';
import filterDataAttributes from '../../../utils/filter-data-attributes';

export class Toggle extends React.PureComponent {
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
        className={classnames(styles.labelWrapper, {
          [styles.labelWrapperDisabled]: this.props.isDisabled,
        })}
      >
        <ToggleSwitch
          size={this.props.size}
          isChecked={this.props.isChecked}
          isDisabled={this.props.isDisabled}
        />
        <input
          className={styles.inputWrapper}
          id={this.props.id}
          name={this.props.name}
          onChange={this.props.onChange}
          disabled={this.props.isDisabled}
          defaultChecked={this.props.isChecked}
          type="checkbox"
          {...filterDataAttributes(this.props)}
        />
      </label>
    );
  }
}

export default Toggle;
