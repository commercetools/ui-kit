import React from 'react';
import PropTypes from 'prop-types';
import { CalendarIcon, ClockIcon, CloseIcon } from '../../icons';
import Spacings from '../../spacings';
import {
  getClearSectionStyles,
  getCalendarIconContainerStyles,
  getDateTimeInputStyles,
  getInputContainerStyles,
} from './calendar-body.styles';

export const ClearSection = props => (
  <div
    onClick={props.isDisabled ? undefined : props.onClear}
    css={getClearSectionStyles(props)}
  >
    {!props.isDisabled && (
      <CloseIcon
        size="medium"
        color={props.isDisabled ? 'neutral60' : 'solid'}
      />
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
    icon: PropTypes.string,
    id: PropTypes.string,
    inputProps: PropTypes.shape({
      onBlur: PropTypes.func,
      onFocus: PropTypes.func,
    }),
    toggleButtonProps: PropTypes.shape({
      onBlur: PropTypes.func,
      onFocus: PropTypes.func,
    }),
    value: PropTypes.string,
    isDisabled: PropTypes.bool,
    isOpen: PropTypes.bool,
    hasSelection: PropTypes.bool,
    hasWarning: PropTypes.bool,
    hasError: PropTypes.bool,
    onClearPicker: PropTypes.func,
    onClear: PropTypes.func,
    placeholder: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
  };

  state = {
    isFocused: false,
  };

  render() {
    return (
      <Spacings.Inline alignItems="center">
        <div css={getInputContainerStyles()}>
          <input
            ref={this.props.inputRef}
            css={getDateTimeInputStyles(this.props, this.state)}
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
              isFocused={this.state.isFocused}
              onClear={this.props.onClear}
            />
          )}
          <button
            type="button"
            css={getCalendarIconContainerStyles(this.props, this.state)}
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
              <ClockIcon
                color={this.props.isDisabled ? 'neutral60' : 'solid'}
              />
            ) : (
              <CalendarIcon
                color={this.props.isDisabled ? 'neutral60' : 'solid'}
              />
            )}
          </button>
        </div>
      </Spacings.Inline>
    );
  }
}
