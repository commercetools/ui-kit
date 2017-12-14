import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Spacings from '../../materials/spacings';
import withMouseOverState from '../../hocs/with-mouse-over-state';
import styles from './toggle.mod.css';
import ToggleSwitch from './toggle-switch';
import ToggleOn from './toggle-on';
import ToggleOff from './toggle-off';

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
        <label
          className={classnames(styles.labelWrapper, {
            [styles.labelWrapperDisabled]: this.props.isDisabled,
          })}
        >
          <Spacings.Inline alignItems="center">
            {React.Children.map(this.props.children, child => {
              if (child.type.displayName === ToggleOn.displayName)
                return React.cloneElement(child, {
                  isChecked: this.props.isChecked,
                  isDisabled: this.props.isDisabled,
                });
              else if (child.type.displayName === ToggleOff.displayName)
                return React.cloneElement(child, {
                  isChecked: this.props.isChecked,
                  isDisabled: this.props.isDisabled,
                });
              return child;
            })}
            <ToggleSwitch
              size={this.props.size}
              isMouseOver={this.props.isMouseOver}
              isChecked={this.props.isChecked}
              isDisabled={this.props.isDisabled}
              className={styles.toggleSwitch}
            />
            <input
              className={styles.inputWrapper}
              name={this.props.name}
              onChange={this.props.onChange}
              disabled={this.props.isDisabled}
              checked={this.props.isChecked}
              type="checkbox"
            />
          </Spacings.Inline>
        </label>
      </div>
    );
  }
}

export default withMouseOverState(Toggle);
