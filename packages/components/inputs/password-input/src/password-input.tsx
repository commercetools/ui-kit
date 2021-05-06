import React, { ChangeEventHandler, FocusEventHandler } from 'react';
import { useTheme } from '@emotion/react';
import { filterDataAttributes, warning } from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import { getInputStyles } from '@commercetools-uikit/input-utils';

export type TPasswordInputProps = {
  /**
   * Used as HTML id property. An id is auto-generated when it is not specified.
   */
  id?: string;
  /**
   * Used as HTML name of the input component. property
   */
  name?: string;
  /**
   * Value of the input component.
   */
  value: string;
  /**
   * Placeholder text for the input
   */
  placeholder?: string;
  /**
   * Called with an event containing the new value. Required when input is not read only. Parent should pass it back as value.
   */
  onChange?: ChangeEventHandler;
  //requiredIf(PropTypes.func, (props) => !props.isReadOnly),
  /**
   * Called when input is blurred.
   */
  onBlur?: FocusEventHandler;
  /**
   *
   * Called when input is focused.
   */
  onFocus?: FocusEventHandler;
  /**
   * Focus the input on initial render.
   */
  isAutofocussed?: boolean;
  /**
   * Indicates that the input cannot be modified (e.g not authorized, or changes currently saving).
   */
  isDisabled?: boolean;
  /**
   * Indicates that the field is displaying read-only content
   */
  isReadOnly?: boolean;
  /**
   * Indicates that the input has an error
   */
  hasError?: boolean;
  /**
   * Indicates that the input has a warning due to e.g invalid values
   */
  hasWarning?: boolean;
  /**
   * Indicates whether we show the password or not
   */
  isPasswordVisible?: boolean;
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint?:
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
  /**
   * Password autocomplete mode
   */
  autoComplete?: 'on' | 'off' | 'current-password' | 'new-password';
};

const defaultProps: Pick<
  TPasswordInputProps,
  'horizontalConstraint' | 'isDisabled' | 'isReadOnly' | 'isPasswordVisible'
> = {
  horizontalConstraint: 'scale',
  isDisabled: false,
  isReadOnly: false,
  isPasswordVisible: false,
};

const PasswordInput = (props: TPasswordInputProps) => {
  const theme = useTheme();
  if (!props.isReadOnly) {
    warning(
      Boolean(props.onChange),
      'PasswordInput: `onChange` is required when is not read only.'
    );
  }
  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <input
        id={props.id}
        name={props.name}
        type={props.isPasswordVisible ? 'text' : 'password'}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        disabled={props.isDisabled}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete}
        css={getInputStyles(props, theme)}
        readOnly={props.isReadOnly}
        autoFocus={props.isAutofocussed}
        {...filterDataAttributes(props)}
        /* ARIA */
        aria-readonly={props.isReadOnly}
        contentEditable={!props.isReadOnly}
      />
    </Constraints.Horizontal>
  );
};

PasswordInput.displayName = 'PasswordInput';
PasswordInput.defaultProps = defaultProps;
PasswordInput.isEmpty = (value: TPasswordInputProps['value']) =>
  !value || value.trim().length === 0;

export default PasswordInput;
