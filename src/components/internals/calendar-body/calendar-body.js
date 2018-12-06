import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CalendarIcon, ClockIcon, CloseIcon } from '../../icons';
import Spacings from '../../spacings';
import styles from './calendar-body.mod.css';

export const ClearSection = props => (
  <div
    onClick={props.isDisabled ? undefined : props.onClear}
    className={classnames(styles['clear-icon-container'], {
      [styles['icon-container-disabled']]: props.isDisabled,
      [styles.invalid]: props.hasError,
    })}
  >
    {!props.isDisabled && (
      <CloseIcon size="medium" theme={props.isDisabled ? 'grey' : 'black'} />
    )}
  </div>
);
ClearSection.displayName = 'ClearSection';
ClearSection.propTypes = {
  isDisabled: PropTypes.bool,
  hasError: PropTypes.bool,
  onClear: PropTypes.func,
};

export default class CalendarBody extends React.PureComponent {
  static displayName = 'CalendarBody';

  static propTypes = {
    inputRef: PropTypes.object.isRequired,
    id: PropTypes.string,
    value: PropTypes.string,
    isDisabled: PropTypes.bool,
    isOpen: PropTypes.bool,
    hasError: PropTypes.bool,
    onClearPicker: PropTypes.func,
    placeholder: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
  };

  state = {
    isFocused: false,
  };

  render() {
    return (
      <Spacings.Inline alignItems="center">
        <div className={styles['date-input-container']}>
          <input
            ref={this.props.inputRef}
            className={classnames(styles['date-input'], {
              [styles.error]: !this.props.isDisabled && this.props.hasError,
              [styles.warning]: !this.props.isDisabled && this.props.hasWarning,
              [styles.focused]: this.props.isOpen || this.state.isFocused,
            })}
            {...this.props.inputProps}
            onFocus={event => {
              this.setState({ isFocused: true });
              if (this.props.inputProps.onFocus)
                this.props.inputProps.onFocus(event);
            }}
            onBlur={event => {
              this.setState({ isFocused: false });
              if (this.props.inputProps.onBlur)
                this.props.inputProps.onBlur(event);
            }}
          />
          {this.props.hasSelection && (
            <ClearSection
              isDisabled={this.props.isDisabled}
              hasError={this.props.hasError}
              onClear={this.props.onClear}
            />
          )}
          <button
            type="button"
            className={classnames(styles['calendar-icon-container'], {
              [styles['icon-container-disabled']]: this.props.isDisabled,
              [styles.error]: !this.props.isDisabled && this.props.hasError,
              [styles.warning]: !this.props.isDisabled && this.props.hasWarning,
              [styles.focused]: this.props.isOpen || this.state.isFocused,
            })}
            {...this.props.toggleButtonProps}
            onFocus={event => {
              this.setState({ isFocused: true });
              if (this.props.toggleButtonProps.onFocus)
                this.props.toggleButtonProps.onFocus(event);
            }}
            onBlur={event => {
              this.setState({ isFocused: false });
              if (this.props.toggleButtonProps.onBlur)
                this.props.toggleButtonProps.onBlur(event);
            }}
          >
            {this.props.icon === 'clock' ? (
              <ClockIcon theme={this.props.isDisabled ? 'grey' : 'black'} />
            ) : (
              <CalendarIcon theme={this.props.isDisabled ? 'grey' : 'black'} />
            )}
          </button>
        </div>
      </Spacings.Inline>
    );
  }
}
