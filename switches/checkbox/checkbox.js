import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import filterDataAttributes from '../../utils/filter-data-attributes';
import Spacings from '../../materials/spacings';
import withMouseOverState from '../../hocs/with-mouse-over-state';
import Icons from './icons';
import styles from './checkbox.mod.css';

export class Checkbox extends React.PureComponent {
  static displayName = 'Checkbox';
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.oneOf([true, false, 'indeterminate']).isRequired,
    onChange: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool,
    hasError: PropTypes.bool,
    children: PropTypes.node,
    // HoC
    isMouseOver: PropTypes.bool.isRequired,
    handleMouseOver: PropTypes.func.isRequired,
    handleMouseOut: PropTypes.func.isRequired,
  };

  static defaultProps = {
    checked: false,
    isDisabled: false,
    hasError: false,
  };

  render() {
    return (
      <div
        onMouseOver={this.props.handleMouseOver}
        onMouseOut={this.props.handleMouseOut}
        {...filterDataAttributes(this.props)}
      >
        <label
          className={classnames(styles.labelWrapper, {
            [styles.labelWrapperDisabled]: this.props.isDisabled,
            [styles.labelWrapperError]: this.props.hasError,
          })}
        >
          <Spacings.Inline alignItems="center">
            <div
              className={classnames(styles.checkboxWrapper, {
                [styles.isDisabled]: this.props.isDisabled,
                [styles.hasError]: this.props.hasError,
              })}
            >
              {(() => {
                if (this.props.checked === true) return <Icons.Checked />;
                else if (this.props.checked === 'indeterminate')
                  return <Icons.Indeterminate />;
                return <Icons.Unchecked />;
              })()}
            </div>
            {this.props.children && (
              <span
                className={classnames({
                  [styles.textWrapperDisabled]: this.props.isDisabled,
                  [styles.textWrapperError]: this.props.hasError,
                })}
              >
                {this.props.children}
              </span>
            )}
            <input
              className={styles.inputWrapper}
              name={this.props.name}
              value={this.props.value}
              onChange={this.props.onChange}
              disabled={this.props.isDisabled}
              checked={this.props.checked === true ? this.props.checked : false}
              type="checkbox"
            />
          </Spacings.Inline>
        </label>
      </div>
    );
  }
}

export default withMouseOverState(Checkbox);
