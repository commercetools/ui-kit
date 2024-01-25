import {
  Component,
  isValidElement,
  type ChangeEventHandler,
  type FocusEventHandler,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  filterDataAttributes,
  createSequentialId,
  getFieldId,
  warning,
} from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import Stack from '@commercetools-uikit/spacings-stack';
import FieldLabel from '@commercetools-uikit/field-label';
import TimeInput from '@commercetools-uikit/time-input';
import FieldErrors from '@commercetools-uikit/field-errors';
import FieldWarnings from '@commercetools-uikit/field-warnings';

type TFieldErrors = Record<string, boolean>;
type TFieldWarnings = Record<string, boolean>;
// Similar shape of `FormikErrors` but values are `TFieldErrors` objects.
type TCustomFormErrors<Values> = {
  [K in keyof Values]?: TFieldErrors;
};

export type TTimeFieldProps = {
  // TimeField
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
   * <br/>
   * Unknown errors will be forwarded to renderError.
   */
  errors?: TFieldErrors;

  /**
   * A map of warnings. Warning messages for known warnings are rendered automatically.
   * <br/>
   * Unknown warnings will be forwarded to renderWarning.
   */
  warnings?: TFieldWarnings;

  /**
   * Called with custom errors, as renderError(key, error). This function can return a message which will be wrapped in an ErrorMessage.
   * <br />
   * It can also return null to show no error.
   */
  renderError?: (key: string, error?: boolean) => ReactNode;

  /**
   * Called with custom warnings, as renderWarning(key, warning). This function can return a message which will be wrapped in a WarningMessage.
   * <br />
   * It can also return null to show no warning.
   */
  renderWarning?: (key: string, warning?: boolean) => ReactNode;

  /**
   * Indicates if the value is required. Shows an the "required asterisk" if so.
   */
  isRequired?: boolean;

  /**
   * Indicates whether the field was touched. Errors will only be shown when the field was touched.
   */
  touched?: boolean;

  // TimeInput
  /**
   * Used as HTML name of the input component.
   */
  name?: string;

  /**
   * Used as HTML autocomplete of the input component.
   */
  autoComplete?: string;

  /**
   * Value of the input
   */
  value: string;

  /**
   * Called with an event holding the new value.
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
   * Indicates that the input is read only (no changes allowed).
   */
  isReadOnly?: boolean;

  /**
   * Placeholder text for the input
   */
  placeholder?: string;

  // LabelField
  /**
   * Title of the label
   */
  title: ReactNode;

  /**
   * Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (e.g warn about uniqueness of a field, when it can only be set once),
   * whereas description can describe it in more depth. Can also receive a hintIcon.
   */
  hint?: ReactNode;

  /**
   * Provides a description for the title.
   */
  description?: ReactNode;

  /**
   * Function called when info button is pressed.
   * <br/>
   * Info button will only be visible when this prop is passed.
   */
  onInfoButtonClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;

  /**
   * Icon to be displayed beside the hint text. Will only get rendered when hint is passed as well.
   */
  hintIcon?: ReactElement;

  /**
   * Badge to be displayed beside the label.
   * <br/>
   * Might be used to display additional information about the content of the field (E.g verified email)
   */
  badge?: ReactNode;
};

type TTimeFieldState = Pick<TTimeFieldProps, 'id'>;

const sequentialId = createSequentialId('time-field-');
const sequentialErrorsId = createSequentialId('time-field-error-')();
const sequentialWarningsId = createSequentialId('time-field-warning-')();

const hasErrors = (errors?: TFieldErrors) =>
  errors && Object.values(errors).some(Boolean);

const hasWarnings = (warnings?: TFieldWarnings) =>
  warnings && Object.values(warnings).some(Boolean);

class TimeField extends Component<TTimeFieldProps, TTimeFieldState> {
  static displayName = 'TimeField';

  static defaultProps: Pick<TTimeFieldProps, 'horizontalConstraint'> = {
    horizontalConstraint: 'scale',
  };

  state = {
    // We generate an id in case no id is provided by the parent to attach the
    // label to the input component.
    id: this.props.id,
  };

  static getDerivedStateFromProps = (
    props: TTimeFieldProps,
    state: TTimeFieldState
  ) => ({
    id: getFieldId(props, state, sequentialId),
  });

  /**
   * Use this function to convert the Formik `errors` object type to
   * our custom field errors type.
   * This is primarily useful when using TypeScript.
   */
  static toFieldErrors<FormValues>(
    errors: unknown
  ): TCustomFormErrors<FormValues> {
    return errors as TCustomFormErrors<FormValues>;
  }

  render() {
    const hasError = this.props.touched && hasErrors(this.props.errors);
    const hasWarning = this.props.touched && hasWarnings(this.props.warnings);

    if (!this.props.isReadOnly) {
      warning(
        typeof this.props.onChange === 'function',
        'TimeField: `onChange` is required when field is not read only.'
      );
    }

    if (this.props.hintIcon) {
      warning(
        typeof this.props.hint === 'string' || isValidElement(this.props.hint),
        'TimeField: `hint` is required to be string or ReactNode if hintIcon is present'
      );
    }

    return (
      <Constraints.Horizontal max={this.props.horizontalConstraint}>
        <Stack scale="xs">
          <FieldLabel
            title={this.props.title}
            hint={this.props.hint}
            description={this.props.description}
            onInfoButtonClick={this.props.onInfoButtonClick}
            hintIcon={this.props.hintIcon}
            badge={this.props.badge}
            hasRequiredIndicator={this.props.isRequired}
            htmlFor={this.state.id}
          />
          <TimeInput
            id={this.state.id}
            name={this.props.name}
            autoComplete={this.props.autoComplete}
            value={this.props.value}
            onChange={this.props.onChange}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            isAutofocussed={this.props.isAutofocussed}
            isDisabled={this.props.isDisabled}
            hasWarning={hasWarning}
            hasError={hasError}
            placeholder={this.props.placeholder}
            horizontalConstraint="scale"
            isReadOnly={this.props.isReadOnly}
            {...filterDataAttributes(this.props)}
            /* ARIA */
            aria-invalid={hasError}
            aria-errormessage={sequentialErrorsId}
          />
          <FieldErrors
            errors={this.props.errors}
            isVisible={hasError}
            renderError={this.props.renderError}
          />
          <FieldWarnings
            id={sequentialWarningsId}
            warnings={this.props.warnings}
            isVisible={hasWarning}
            renderWarning={this.props.renderWarning}
          />
        </Stack>
      </Constraints.Horizontal>
    );
  }
}

export default TimeField;
