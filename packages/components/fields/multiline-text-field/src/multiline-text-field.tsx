import {
  type ChangeEventHandler,
  type FocusEventHandler,
  type ReactElement,
  type ReactNode,
  isValidElement,
  Component,
} from 'react';
import {
  createSequentialId,
  filterDataAttributes,
  getFieldId,
  warning,
} from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import FieldLabel from '@commercetools-uikit/field-label';
import MultilineTextInput from '@commercetools-uikit/multiline-text-input';
import FieldErrors from '@commercetools-uikit/field-errors';
import FieldWarnings from '@commercetools-uikit/field-warnings';

export type TFieldErrors = Record<string, boolean>;
type TFieldWarnings = Record<string, boolean>;
// Similar shape of `FormikErrors` but values are `TFieldErrors` objects.
type TCustomFormErrors<Values> = {
  [K in keyof Values]?: TFieldErrors;
};

export type TMultiTextFieldProps = {
  // FieldLabel
  /**
   * Used as HTML id property. An id is auto-generated when it is not specified.
   */
  id?: string;
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint?:
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
   * Called with custom errors. This function can return a message which will be wrapped in an ErrorMessage. It can also return null to show no error.
   */
  renderError?: TErrorRenderer;
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

  // TextInput
  /**
   * Used as HTML `autocomplete` property
   */
  autoComplete?: string;
  /**
   * Used as HTML name of the input component. property
   */
  name?: string;
  /**
   * Value of the input component.
   */
  value: string;
  /**
   * Called with an event containing the new value. Required when input is not read only. Parent should pass it back as value.
   */
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  /**
   * Called when input is blurred
   */
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  /**
   * Called when input is focused
   */
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  /**
   * Focus the input on initial render
   */
  isAutofocussed?: boolean;
  /**
   * Expands multiline text input initially
   */
  defaultExpandMultilineText?: boolean;
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
   * A map of errors. Error messages for known errors are rendered automatically.
   * <br />
   * Unknown errors will be forwarded to `renderError`
   */
  errors?: TFieldErrors;
  /**
   * A map of warnings. Warning messages for known warnings are rendered automatically.
   * <br/>
   * Unknown warnings will be forwarded to renderWarning.
   */
  warnings?: TFieldWarnings;

  // LabelField
  /**
   * Title of the label
   */
  title?: string | ReactNode;
  /**
   * 	Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (e.g warn about uniqueness of a field, when it can only be set once), whereas `description` can describe it in more depth. Can also receive a `hintIcon`.
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
   */
  onInfoButtonClick?: () => void;
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
  badge?: string;
  /**
   * Set this to value to determine the maximum text rows of the text area.
   * Any text overflow past this row number would implement a scroll
   */
  maxRows?: number;
};

type TState = {
  id?: string;
};

const sequentialId = createSequentialId('multiline-text-field-');

const hasErrors = (errors?: TFieldErrors) =>
  errors && Object.values(errors).some(Boolean);

const hasWarnings = (warnings?: TFieldWarnings) =>
  warnings && Object.values(warnings).some(Boolean);

type TErrorRenderer = (key: string, error?: boolean) => ReactNode;

class MultilineTextField extends Component<TMultiTextFieldProps, TState> {
  static displayName = 'MultilineTextField';

  static defaultProps: Pick<TMultiTextFieldProps, 'horizontalConstraint'> = {
    horizontalConstraint: 'scale',
  };

  state = {
    // We generate an id in case no id is provided by the parent to attach the
    // label to the input component.
    id: this.props.id,
  };

  static getDerivedStateFromProps = (
    props: TMultiTextFieldProps,
    state: TState
  ) => ({
    id: getFieldId(props, state, sequentialId),
  });

  /**
   * Use this function to convert the Formik `errors` object type to
   * our custom field errors type.
   * This is primarly useful when using TypeScript.
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
        'MultilineField: "onChange" is required when field is not read only.'
      );
    }
    if (this.props.hint) {
      warning(
        typeof this.props.hint === 'string' || isValidElement(this.props.hint),
        'MultilineField: "hint" should be string or ReactNode if `hintIcon` is present'
      );
    }

    const errorsContainerId = `${this.state.id}-errors`;
    const warningsContainerId = `${this.state.id}-warnings`;

    return (
      <Constraints.Horizontal max={this.props.horizontalConstraint}>
        <Spacings.Stack scale="xs">
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
          <MultilineTextInput
            id={this.state.id}
            name={this.props.name}
            autoComplete={this.props.autoComplete}
            value={this.props.value}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
            isAutofocussed={this.props.isAutofocussed}
            defaultExpandMultilineText={this.props.defaultExpandMultilineText}
            isDisabled={this.props.isDisabled}
            isReadOnly={this.props.isReadOnly}
            hasError={hasError}
            hasWarning={hasWarning}
            placeholder={this.props.placeholder}
            horizontalConstraint="scale"
            maxRows={this.props.maxRows}
            {...filterDataAttributes(this.props)}
            aria-invalid={hasError}
            aria-errormessage={errorsContainerId}
          />
          <FieldErrors
            id={errorsContainerId}
            errors={this.props.errors}
            isVisible={hasError}
            renderError={this.props.renderError}
          />
          <FieldWarnings
            id={warningsContainerId}
            warnings={this.props.warnings}
            isVisible={hasWarning}
            renderWarning={this.props.renderWarning}
          />
        </Spacings.Stack>
      </Constraints.Horizontal>
    );
  }
}

export default MultilineTextField;
