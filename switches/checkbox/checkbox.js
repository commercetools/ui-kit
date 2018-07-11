import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import filterDataAttributes from '../../utils/filter-data-attributes';
import Text from '../../typography/text';
import Spacings from '../../materials/spacings';
import withMouseOverState from '../../hocs/with-mouse-over-state';
import Icons from './icons';
import styles from './checkbox.mod.css';

const getTextTone = ({ isDisabled, hasError }) => {
  if (isDisabled) return 'secondary';
  if (hasError) return 'negative';
  return undefined;
};
export class Checkbox extends React.PureComponent {
  static displayName = 'Checkbox';
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    isChecked: PropTypes.bool,
    isIndeterminate: PropTypes.bool,
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
    isChecked: false,
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
                if (this.props.isIndeterminate) return <Icons.Indeterminate />;
                else if (this.props.isChecked) return <Icons.Checked />;
                return <Icons.Unchecked />;
              })()}
            </div>
            {this.props.children && (
              <Text.Body
                tone={getTextTone({
                  isDisabled: this.props.isDisabled,
                  hasError: this.props.hasError,
                })}
              >
                {this.props.children}
              </Text.Body>
            )}
            <input
              className={styles.inputWrapper}
              name={this.props.name}
              value={this.props.value}
              onChange={this.props.onChange}
              disabled={this.props.isDisabled}
              checked={this.props.isChecked && !this.props.isIndeterminate}
              type="checkbox"
            />
          </Spacings.Inline>
        </label>
      </div>
    );
  }
}

export default withMouseOverState(Checkbox);
