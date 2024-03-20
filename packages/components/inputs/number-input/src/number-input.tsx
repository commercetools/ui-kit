import type { ChangeEventHandler, FocusEventHandler } from 'react';
import { filterDataAttributes, warning } from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import { getInputStyles } from '@commercetools-uikit/input-utils';

export type TNumberInputProps = {
  /**
   * Used as HTML id property. An id is auto-generated when it is not specified.
   */
  id?: string;
  /**
   * Used as HTML name of the input component. property
   */
  name?: string;
  /**
   * Indicate if the value entered in the input is invalid.
   */
  'aria-invalid'?: boolean;
  /**
   * HTML ID of an element containing an error message related to the input.
   */
  'aria-errormessage'?: string;
  /**
   * Used as HTML `autocomplete` of the input component. property
   */
  autoComplete?: string;
  /**
   * Placeholder text for the input
   */
  placeholder?: string;
  /**
   * Value of the input component.
   */
  value: string | number;
  /**
   * Value is used as `min` property on input field
   */
  min?: number;
  /**
   * Value is used as `max` property on input field
   */
  max?: number;
  /**
   * Value is used as `step` property on input field
   * <br />
   * Use the value `any` for inputs which accept an unpredictable amount of decimals.
   */
  step?: number | 'any';
  /**
   * Called with an event containing the new value. Required when input is not read only. Parent should pass it back as value.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /**
   * Called when input is blurred
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /**
   * Called when input is focused
   */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /**
   * Focus the input on initial render
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
   * Indicates that input has errors
   */
  hasError?: boolean;
  /**
   * Control to indicate on the input if there are selected values that are potentially invalid
   */
  hasWarning?: boolean;
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint?:
    | 1
    | 2
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
};

const defaultProps: Pick<TNumberInputProps, 'horizontalConstraint'> = {
  horizontalConstraint: 'scale',
};

const NumberInput = (props: TNumberInputProps) => {
  if (!props.isReadOnly) {
    warning(
      Boolean(props.onChange),
      'NumberInput: `onChange` is required when input is not read only.'
    );
  }
  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <input
        id={props.id}
        name={props.name}
        type="number"
        autoComplete={props.autoComplete}
        value={props.value}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        disabled={props.isDisabled}
        placeholder={props.placeholder}
        css={getInputStyles(props)}
        readOnly={props.isReadOnly}
        autoFocus={props.isAutofocussed}
        {...filterDataAttributes(props)}
        /* ARIA */
        aria-readonly={props.isReadOnly}
        contentEditable={!props.isReadOnly}
        aria-invalid={props['aria-invalid']}
        aria-errormessage={props['aria-errormessage']}
        onWheel={(e) => e.currentTarget.blur()}
      />
    </Constraints.Horizontal>
  );
};

NumberInput.displayName = 'NumberInput';
NumberInput.defaultProps = defaultProps;

NumberInput.toFormValue = (numberOrString: number | string) => {
  if (
    typeof numberOrString === 'number' ||
    typeof numberOrString === 'string'
  ) {
    return numberOrString;
  }
  return '';
};

NumberInput.isEmpty = (value: number | string): boolean => {
  if (typeof value === 'string') return value.trim().length === 0;
  if (typeof value === 'number') return isNaN(value);
  return true;
};

NumberInput.hasFractionDigits = (number: number | string) => {
  const fraction = Number(number) % 1;
  warning(
    !isNaN(fraction),
    'NumberInput.hasFractionDigits may only be called with valid numbers (either as string or number).'
  );
  return fraction !== 0;
};

export default NumberInput;
