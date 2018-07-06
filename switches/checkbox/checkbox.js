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
    isDisabled: PropTypes.bool,
    isChecked: PropTypes.bool,
    isIndeterminate: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    hasError: PropTypes.bool,
    children: PropTypes.node,
    // HoC
    isMouseOver: PropTypes.bool.isRequired,
    handleMouseOver: PropTypes.func.isRequired,
    handleMouseOut: PropTypes.func.isRequired,
  };
  static defaultProps = {
    isDisabled: false,
    isChecked: false,
    isIndeterminate: false,
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
          })}
        >
          <Spacings.Inline alignItems="center">
            {(() => {
              if (this.props.hasError) {
                if (this.props.isChecked) return <Icons.CheckedError />;
                if (this.props.isIndeterminate)
                  return <Icons.IndeterminateError />;
                return <Icons.Error />;
              } else if (this.props.isDisabled) {
                if (this.props.isChecked) return <Icons.CheckedDisabled />;
                if (this.props.isIndeterminate)
                  return <Icons.IndeterminateDisabled />;
                return <Icons.Disabled />;
              } else if (this.props.isChecked) return <Icons.Checked />;
              else if (this.props.isIndeterminate)
                return <Icons.Indeterminate />;
              else if (this.props.isMouseOver) {
                if (this.props.isChecked) return <Icons.CheckedHover />;
                if (this.props.isIndeterminate)
                  return <Icons.IndeterminateHover />;
                return <Icons.Hover />;
              }
              return <Icons.Default />;
            })()}
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
              checked={this.props.isChecked}
              type="checkbox"
            />
          </Spacings.Inline>
        </label>
      </div>
    );
  }
}

export default withMouseOverState(Checkbox);
