import {
  useCallback,
  LegacyRef,
  FocusEventHandler,
  KeyboardEvent,
} from 'react';
import { Theme, useTheme } from '@emotion/react';
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

export type TClearSection = {
  isDisabled?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  onClear?: () => void;
  theme?: Theme;
  isFocused?: boolean;
  isOpen?: boolean;
};

export const ClearSection = (props: TClearSection) => {
  const theme = useTheme();

  return (
    <AccessibleButton
      css={getClearSectionStyles(theme)}
      label="clear"
      onClick={props.onClear}
      aria-label="clear"
    >
      <CloseIcon size="medium" color="solid" />
    </AccessibleButton>
  );
};
ClearSection.displayName = 'ClearSection';

export type TInputProps = {
  onBlur?: FocusEventHandler;
  onFocus?: FocusEventHandler;
  onKeyDown?: (
    event: KeyboardEvent<HTMLInputElement | HTMLButtonElement>
  ) => void;
};

export type TCalendarBody = {
  inputRef: LegacyRef<HTMLInputElement>;
  icon?: string;
  id?: string;
  inputProps?: TInputProps;
  isClearable?: boolean;
  toggleButtonProps?: Pick<TInputProps, 'onBlur' | 'onFocus'>;
  value?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isOpen?: boolean;
  hasSelection?: boolean;
  hasWarning?: boolean;
  hasError?: boolean;
  onClear?: () => void;
  placeholder?: string;
  theme?: Theme;
};

const defaultProps: Pick<TCalendarBody, 'isClearable'> = {
  isClearable: true,
};

export const CalendarBody = (props: TCalendarBody) => {
  const [isFocused, toggleIsFocused] = useToggleState(false);
  const theme = useTheme();

  const onInputFocus = props.inputProps?.onFocus;

  const handleInputFocus = useCallback(
    (event) => {
      toggleIsFocused(true);
      if (onInputFocus) onInputFocus(event);
    },
    [onInputFocus, toggleIsFocused]
  );

  const onInputBlur = props.inputProps?.onBlur;

  const handleInputBlur = useCallback(
    (event) => {
      toggleIsFocused(false);
      if (onInputBlur) onInputBlur(event);
    },
    [onInputBlur, toggleIsFocused]
  );

  const onToggleFocus = props.toggleButtonProps?.onFocus;

  const handleToggleFocus = useCallback(
    (event) => {
      toggleIsFocused(true);
      if (onToggleFocus) onToggleFocus(event);
    },
    [onToggleFocus, toggleIsFocused]
  );

  const onToggleBlur = props.toggleButtonProps?.onBlur;

  const handleToggleBlur = useCallback(
    (event) => {
      toggleIsFocused(false);
      if (onToggleBlur) onToggleBlur(event);
    },
    [onToggleBlur, toggleIsFocused]
  );

  const disabledOrReadOnly = props.isDisabled || props.isReadOnly;

  return (
    <Inline alignItems="center">
      <div css={getInputContainerStyles(props, { isFocused }, theme)}>
        <input
          ref={props.inputRef}
          {...props.inputProps}
          disabled={props.isDisabled}
          readOnly={props.isReadOnly}
          css={getDateTimeInputStyles(props, theme)}
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
          css={getCalendarIconContainerStyles(props, { isFocused }, theme)}
          {...props.toggleButtonProps}
          onFocus={handleToggleFocus}
          onBlur={handleToggleBlur}
          disabled={disabledOrReadOnly}
          onKeyDown={props.inputProps?.onKeyDown}
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

CalendarBody.defaultProps = defaultProps;

export default CalendarBody;
