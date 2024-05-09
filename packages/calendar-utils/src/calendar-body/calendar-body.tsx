import {
  useCallback,
  type LegacyRef,
  type FocusEventHandler,
  type KeyboardEvent,
} from 'react';
import type { Theme } from '@emotion/react';
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
  isCondensed?: boolean;
  isDisabled?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  onClear?: () => void;
  /** @deprecated */
  theme?: Theme;
  isFocused?: boolean;
  isOpen?: boolean;
};

export const ClearSection = (props: TClearSection) => {
  return (
    <AccessibleButton
      css={getClearSectionStyles()}
      label="clear"
      onClick={props.onClear}
      aria-label="clear"
    >
      <CloseIcon size={props.isCondensed ? 'small' : 'medium'} />
    </AccessibleButton>
  );
};
ClearSection.displayName = 'ClearSection';

export type TInputProps = {
  /**
   * Indicate if the value entered in the input is invalid.
   */
  'aria-invalid'?: boolean;
  /**
   * HTML ID of an element containing an error message related to the input.
   */
  'aria-errormessage'?: string;
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
  isCondensed?: boolean;
  hasSelection?: boolean;
  hasWarning?: boolean;
  hasError?: boolean;
  onClear?: () => void;
  placeholder?: string;
  /** @deprecated */
  theme?: Theme;
};

const defaultProps: Pick<TCalendarBody, 'isClearable'> = {
  isClearable: true,
};

export const CalendarBody = (props: TCalendarBody) => {
  const [isFocused, toggleIsFocused] = useToggleState(false);

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
            isCondensed={props.isCondensed}
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
          onKeyDown={props.inputProps?.onKeyDown}
          /* keyboard users don't need this button */
          tabIndex={-1}
        >
          {props.icon === 'clock' ? (
            <ClockIcon color="neutral60" />
          ) : (
            <CalendarIcon
              color="neutral60"
              size={props.isCondensed ? 'medium' : 'big'}
            />
          )}
        </button>
      </div>
    </Inline>
  );
};

CalendarBody.displayName = 'CalendarBody';

CalendarBody.defaultProps = defaultProps;

export default CalendarBody;
