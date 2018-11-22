import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withMouseOverState from '../../../hocs/with-mouse-over-state';
import { CalendarIcon, ClockIcon, CloseIcon } from '../../icons';
import Spacings from '../../spacings';
import styles from './date-calendar-body.mod.css';

const getIconTheme = (isDisabled, isMouseOver) => {
  if (isDisabled) return 'grey';
  if (isMouseOver) return 'orange';
  return 'black';
};

export const ClearSection = props => (
  <div
    onClick={props.isDisabled ? undefined : props.onClear}
    className={classnames(styles['clear-icon-container'], {
      [styles['icon-container-disabled']]: props.isDisabled,
      [styles.invalid]: props.hasError,
    })}
    onMouseOver={props.handleMouseOver}
    onMouseOut={props.handleMouseOut}
  >
    {!props.isDisabled && (
      <CloseIcon
        size="medium"
        theme={getIconTheme(props.isDisabled, props.isMouseOver)}
      />
    )}
  </div>
);
ClearSection.displayName = 'ClearSection';
ClearSection.propTypes = {
  isDisabled: PropTypes.bool,
  hasError: PropTypes.bool,
  isMouseOver: PropTypes.bool.isRequired,
  onClear: PropTypes.func,

  // HoC
  handleMouseOut: PropTypes.func.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
};

ClearSection.defaultProps = {
  hasError: false,
};

export const ClearSectionWithMouseOverState = withMouseOverState(ClearSection);

export default class DateCalendarBody extends React.PureComponent {
  static displayName = 'DateCalendarBody';

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
              [styles.invalid]: this.props.hasError,
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
            <ClearSectionWithMouseOverState
              isDisabled={this.props.isDisabled}
              hasError={this.props.hasError}
              onClear={this.props.onClear}
            />
          )}
          <button
            type="button"
            className={classnames(styles['calendar-icon-container'], {
              [styles['icon-container-disabled']]: this.props.isDisabled,
              [styles.invalid]: this.props.hasError,
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
