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
    aria-label="clear"
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

export const CalendarBody = props => {
  const [isFocused, setIsFocused] = React.useState(false);

  const { onFocus: onInputFocus } = props.inputProps;

  const handleInputFocus = React.useCallback(
    event => {
      setIsFocused(true);
      if (onInputFocus) onInputFocus(event);
    },
    [onInputFocus]
  );

  const { onBlur: onInputBlur } = props.inputProps;

  const handleInputBlur = React.useCallback(
    event => {
      setIsFocused(false);
      if (onInputBlur) onInputBlur(event);
    },
    [onInputBlur]
  );

  const { onFocus: onToggleFocus } = props.toggleButtonProps;

  const handleToggleFocus = React.useCallback(
    event => {
      setIsFocused(true);
      if (onToggleFocus) onToggleFocus(event);
    },
    [onToggleFocus]
  );

  const { onBlur: onToggleBlur } = props.toggleButtonProps;

  const handleToggleBlur = React.useCallback(
    event => {
      setIsFocused(false);
      if (onToggleBlur) onToggleBlur(event);
    },
    [onToggleBlur]
  );

  return (
    <Spacings.Inline alignItems="center">
      <div css={getInputContainerStyles()}>
        <input
          ref={props.inputRef}
          css={getDateTimeInputStyles(props, { isFocused })}
          {...props.inputProps}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {props.hasSelection && props.isClearable && (
          <ClearSection
            isDisabled={props.isDisabled}
            hasError={props.hasError}
            isFocused={isFocused}
            onClear={props.onClear}
          />
        )}
        <button
          type="button"
          css={getCalendarIconContainerStyles(props, { isFocused })}
          {...props.toggleButtonProps}
          onFocus={handleToggleFocus}
          onBlur={handleToggleBlur}
        >
          {props.icon === 'clock' ? (
            <ClockIcon color={props.isDisabled ? 'neutral60' : 'solid'} />
          ) : (
            <CalendarIcon color={props.isDisabled ? 'neutral60' : 'solid'} />
          )}
        </button>
      </div>
    </Spacings.Inline>
  );
};

CalendarBody.displayName = 'CalendarBody';

CalendarBody.propTypes = {
  inputRef: PropTypes.object.isRequired,
  icon: PropTypes.string,
  id: PropTypes.string,
  inputProps: PropTypes.shape({
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  }),
  isClearable: PropTypes.bool,
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

CalendarBody.defaultProps = {
  isClearable: true,
};

export default CalendarBody;
