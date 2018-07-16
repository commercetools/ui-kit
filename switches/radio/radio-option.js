import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import filterDataAttributes from '../../utils/filter-data-attributes';
import Spacings from '../../materials/spacings';
import Text from '../../typography/text';
import Icons from './icons';
import styles from './radio-option.mod.css';

export class Option extends React.PureComponent {
  static displayName = 'RadioOption';
  static propTypes = {
    value: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    isChecked: PropTypes.bool,
    children: PropTypes.node,
    // Injected through as compound component
    // not required as `createElement` is used.
    name: PropTypes.string,
    onChange: PropTypes.func,
  };
  static defaultProps = {
    isDisabled: false,
  };

  render() {
    return (
      <div {...filterDataAttributes(this.props)}>
        <label
          className={classnames(styles.labelWrapper, {
            [styles.labelWrapperDisabled]: this.props.isDisabled,
          })}
        >
          <Spacings.Inline alignItems="center">
            <div
              className={classnames(styles.radioWrapper, {
                [styles.isDisabled]: this.props.isDisabled,
              })}
            >
              {(() => {
                if (this.props.isChecked) return <Icons.Checked />;
                return <Icons.Default />;
              })()}
            </div>
            {this.props.children && (
              <Text.Body
                // FIXME: add proper tones when we have disabled/primary in tones
                tone={this.props.isDisabled ? 'secondary' : undefined}
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
              checked={this.props.isChecked}
              type="radio"
            />
          </Spacings.Inline>
        </label>
      </div>
    );
  }
}

export default Option;
