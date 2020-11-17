import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'emotion-theming';
import { CalendarIcon, ClockIcon, CloseIcon } from '@commercetools-uikit/icons';
import Inline from '@commercetools-uikit/spacings-inline';
import { useToggleState } from '@commercetools-uikit/hooks';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import {
  getClearSectionStyles,
  getCalendarIconContainerStyles,
  getDateTimeInputStyles,
  getInputContainerStyles,
} from './calendar-body.styles';

export const ClearSection = (props) => (
  <AccessibleButton
    css={getClearSectionStyles(props)}
    label="clear"
    onClick={props.onClear}
    aria-label="clear"
  >
    <CloseIcon size="medium" color="solid" />
  </AccessibleButton>
);
ClearSection.displayName = 'ClearSection';
ClearSection.propTypes = {
  isDisabled: PropTypes.bool,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  onClear: PropTypes.func,
};

export const CalendarBody = (props) => {
  const [isFocused, toggleIsFocused] = useToggleState(false);

  const { onFocus: onInputFocus } = props.inputProps;

  const handleInputFocus = React.useCallback(
    (event) => {
      toggleIsFocused(true);
      if (onInputFocus) onInputFocus(event);
    },
    [onInputFocus, toggleIsFocused]
  );

  const { onBlur: onInputBlur } = props.inputProps;

  const handleInputBlur = React.useCallback(
    (event) => {
      toggleIsFocused(false);
      if (onInputBlur) onInputBlur(event);
    },
    [onInputBlur, toggleIsFocused]
  );

  const { onFocus: onToggleFocus } = props.toggleButtonProps;

  const handleToggleFocus = React.useCallback(
    (event) => {
      toggleIsFocused(true);
      if (onToggleFocus) onToggleFocus(event);
    },
    [onToggleFocus, toggleIsFocused]
  );

  const { onBlur: onToggleBlur } = props.toggleButtonProps;

  const handleToggleBlur = React.useCallback(
    (event) => {
      toggleIsFocused(false);
      if (onToggleBlur) onToggleBlur(event);
    },
    [onToggleBlur, toggleIsFocused]
  );

  const disabledOrReadOnly = props.isDisabled || props.isReadOnly;

  return (
    <Inline alignItems="center">
      <div css={getInputContainerStyles(props, { isFocused })}>
        <input
          ref={props.inputRef}
          {...props.inputProps}
          disabled={props.isDisabled}
          readOnly={props.isReadOnly}
          css={getDateTimeInputStyles(props)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          aria-readonly={props.isReadOnly}
        />
        {!disabledOrReadOnly && props.hasSelection && props.isClearable && (
          <ClearSection
            hasError={props.hasError}
            hasWarning={props.hasWarning}
            isFocused={isFocused}
            isOpen={props.isOpen}
            onClear={props.onClear}
          />
        )}
        <button
          type="button"
          css={getCalendarIconContainerStyles(props, { isFocused })}
          {...props.toggleButtonProps}
          onFocus={handleToggleFocus}
          onBlur={handleToggleBlur}
          disabled={disabledOrReadOnly}
          onKeyDown={props.inputProps.onKeyDown}
          /* keyboard users don't need this button */
          tabIndex={-1}
        >
          {props.icon === 'clock' ? (
            <ClockIcon color={disabledOrReadOnly ? 'neutral60' : 'solid'} />
          ) : (
            <CalendarIcon color={disabledOrReadOnly ? 'neutral60' : 'solid'} />
          )}
        </button>
      </div>
    </Inline>
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
    onKeyDown: PropTypes.func,
  }),
  isClearable: PropTypes.bool,
  toggleButtonProps: PropTypes.shape({
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  }),
  value: PropTypes.string,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isOpen: PropTypes.bool,
  hasSelection: PropTypes.bool,
  hasWarning: PropTypes.bool,
  hasError: PropTypes.bool,
  onClear: PropTypes.func,
  placeholder: PropTypes.string,
  horizontalConstraint: PropTypes.oneOf([
    'xs',
    's',
    'm',
    'l',
    'xl',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    'scale',
    'auto',
  ]),
};

CalendarBody.defaultProps = {
  isClearable: true,
};

export default withTheme(CalendarBody);
