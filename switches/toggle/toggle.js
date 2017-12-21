import React from 'react';
import PropTypes from 'prop-types';
import withMouseOverState from '../../hocs/with-mouse-over-state';
import styles from './toggle.mod.css';
import ToggleSwitch from './toggle-switch';

export class Toggle extends React.PureComponent {
  static displayName = 'Toggle';
  static propTypes = {
    name: PropTypes.string,
    size: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    isChecked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node,
    // Hoc
    isMouseOver: PropTypes.bool.isRequired,
    handleMouseOver: PropTypes.func.isRequired,
    handleMouseOut: PropTypes.func.isRequired,
  };
  static defaultProps = {
    isDisabled: false,
    isChecked: false,
    size: 'big',
  };

  render() {
    return (
      <div
        onMouseOver={this.props.handleMouseOver}
        onMouseOut={this.props.handleMouseOut}
      >
        <ToggleSwitch
          size={this.props.size}
          isMouseOver={this.props.isMouseOver}
          isChecked={this.props.isChecked}
          isDisabled={this.props.isDisabled}
        />
        <input
          className={styles.inputWrapper}
          name={this.props.name}
          onChange={this.props.onChange}
          disabled={this.props.isDisabled}
          checked={this.props.isChecked}
          type="checkbox"
        />
      </div>
    );
  }
}

export default withMouseOverState(Toggle);
