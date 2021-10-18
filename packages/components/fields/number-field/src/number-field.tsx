import {
  ReactNode,
  ChangeEventHandler,
  FocusEventHandler,
  MouseEvent,
  KeyboardEvent,
  ReactElement,
} from 'react';
import {
  createSequentialId,
  filterDataAttributes,
  warning,
} from '@commercetools-uikit/utils';
import { useFieldId } from '@commercetools-uikit/hooks';
import Constraints from '@commercetools-uikit/constraints';
import Stack from '@commercetools-uikit/spacings-stack';
import FieldLabel from '@commercetools-uikit/field-label';
import FieldErrors from '@commercetools-uikit/field-errors';
import NumberInput from '@commercetools-uikit/number-input';

const sequentialId = createSequentialId('number-field-');

type TErrorRenderer = (key: string, error?: boolean) => ReactNode;
type TFieldErrors = Record<string, boolean>;

export type TNumberInputProps = {
  /**
   * Used as HTML id property. An id is auto-generated when it is not specified.
   */
  id?: string;
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
   * A map of errors. Error messages for known errors are rendered automatically.
   * <br />
   * Unknown errors will be forwarded to `renderError`
   */
  errors?: TFieldErrors;
  /**
   * Called with custom errors. This function can return a message which will be wrapped in an ErrorMessage. It can also return null to show no error.
   * <br />
   * Signature: `(key, error) => React.node`
   */
  renderError?: TErrorRenderer;
  /**
   * Indicates if the value is required. Shows an the "required asterisk" if so.
   */
  isRequired?: boolean;
  /**
   * Indicates whether the field was touched. Errors will only be shown when the field was touched.
   */
  touched?: boolean;
  /**
   * Used as HTML name of the input component. property
   */
  name?: string;
  /**
   * Value of the input component.
   */
  value: string | number;
  /**
   * Used as HTML `autocomplete` of the input component. property
   */
  autoComplete?: string;
  /**
   * Called with an event containing the new value. Required when input is not read only. Parent should pass it back as value.
   * <br />
   * Signature: `(event) => void`
   */
  onChange?: ChangeEventHandler;
  /**
   * Called when input is blurred
   * <br />
   * Signature: `(event) => void`
   */
  onBlur?: FocusEventHandler;
  /**
   * Called when input is focused
   * <br />
   * Signature: `(event) => void`
   */
  onFocus?: FocusEventHandler;
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
   * Placeholder text for the input
   */
  placeholder?: string;
  /**
   * Value is used as `min` property on input field
   */
  min?: number;
  /**
   * Value is used as `max` property on input field
   */
  max?: number;
  /**
   * Value is used as `step` property on input field.
   * <br />
   * Use the value `any` for inputs which accept an unpredictable amount of decimals.
   */
  step?: number | 'any';
  /**
   * Title of the label
   */
  title: string | ReactNode;
  /**
   * Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (e.g warn about uniqueness of a field, when it can only be set once), whereas `description` can describe it in more depth. Can also receive a `hintIcon`.
   */
  hint?: string | ReactNode;
  /**
   * Provides a description for the title.
   */
  description?: string | ReactNode;
  /**
   * Function called when info button is pressed.
   * <br />
   * Info button will only be visible when this prop is passed.
   * <br />
   * Signature: `(event) => void`
   */
  onInfoButtonClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * Icon to be displayed beside the hint text.
   * <br />
   * Will only get rendered when `hint` is passed as well.
   */
  hintIcon?: ReactElement;
  /**
   * Badge to be displayed beside the label.
   * <br />
   * Might be used to display additional information about the content of the field (E.g verified email)
   */
  badge?: ReactNode;
};

const hasErrors = (errors: TFieldErrors | undefined) =>
  errors && Object.values(errors).some(Boolean);

const NumberField = (props: TNumberInputProps) => {
  if (!props.isReadOnly) {
    warning(
      Boolean(props.onChange),
      'NumberField: `onChange` is required when input is not read only.'
    );
  }

  if (props.hintIcon && !props.hint) {
    warning(
      Boolean(props.hint),
      'NumberField: `hint` is required when input has a hintIcon.'
    );
  }

  const hasError = props.touched && hasErrors(props.errors);
  const id = useFieldId(props.id, sequentialId);
  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <Stack scale="xs">
        <FieldLabel
          title={props.title}
          hint={props.hint}
          description={props.description}
          onInfoButtonClick={props.onInfoButtonClick}
          hintIcon={props.hintIcon}
          badge={props.badge}
          hasRequiredIndicator={props.isRequired}
          htmlFor={id}
        />
        <NumberInput
          id={id}
          name={props.name}
          autoComplete={props.autoComplete}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          isAutofocussed={props.isAutofocussed}
          isDisabled={props.isDisabled}
          isReadOnly={props.isReadOnly}
          hasError={hasError}
          placeholder={props.placeholder}
          horizontalConstraint="scale"
          min={props.min}
          max={props.max}
          step={props.step}
          {...filterDataAttributes(props)}
        />
        <FieldErrors
          errors={props.errors}
          isVisible={hasError}
          renderError={props.renderError}
        />
      </Stack>
    </Constraints.Horizontal>
  );
};

NumberField.defaultProps = {
  horizontalConstraint: 'scale',
};

NumberField.displayName = 'NumberField';

export default NumberField;
