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
  createSequentialId,
  filterDataAttributes,
  getFieldId,
  warning,
} from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import FieldLabel from '@commercetools-uikit/field-label';
import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import FieldErrors from '@commercetools-uikit/field-errors';

type TErrorRenderer = (key: string, error?: boolean) => ReactNode;
type TFieldErrors = Record<string, boolean>;
// Similar shape of `FormikErrors` but values are `TFieldErrors` objects.
type TCustomFormErrors<Values> = {
  [K in keyof Values]?: TFieldErrors;
};
interface HTMLLocalizedInputElement extends HTMLInputElement {
  language: string;
}
export type TLocalizedTextFieldProps = {
  // LocalizedTextField
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
   * A map of errors. Error messages for known errors are rendered automatically.
   * <br />
   * Unknown errors will be forwarded to `renderError`
   */
  errors?: TFieldErrors;
  /**
   * Called with custom errors. This function can return a message which will be wrapped in an ErrorMessage. It can also return null to show no error.
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

  // LocalizedTextInput
  /**
   * Used as HTML `autocomplete` of the input component. property
   */
  autoComplete?: string;
  /**
   * Used as HTML name of the input component. property
   */
  name?: string;
  /**
   * Values to use.
   * <br />
   Keyed by language, the values are the actual values, e.g. `{ en: 'Horse', de: 'Pferd' }`
   */
  value: Record<string, string>;
  /**
   * Called with an event containing the new value. Required when input is not read only. Parent should pass it back as value.
   */
  onChange?: ChangeEventHandler<HTMLLocalizedInputElement>;
  /**
   * Specifies which language will be shown in case the `LocalizedTextInput` is collapsed.
   */
  selectedLanguage: string;
  /**
   * Called when input is blurred
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /**
   * Called when input is focused
   */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /**
   * Will hide the language expansion controls when set to `true`. All languages will be shown when set to `true`.
   */
  hideLanguageExpansionControls?: boolean;
  /**
   * Controls whether one or all languages are visible by default
   */
  defaultExpandLanguages?: boolean;
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
   * Placeholders for each language. Object of the same shape as `value`.
   */
  placeholder?: Record<string, string>;
  /**
   * Errors for each translation. These are forwarded to the `errors` prop of `LocalizedTextInput`.
   */
  errorsByLanguage?: Record<string, string>;

  // LabelField
  /**
   * Title of the label
   */
  title: ReactNode;
  /**
   * Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (e.g warn about uniqueness of a field, when it can only be set once), whereas `description` can describe it in more depth. Can also receive a `hintIcon`.
   */
  hint?: ReactNode;
  /**
   * Provides a description for the title.
   */
  description?: ReactNode;
  /**
   * Function called when info button is pressed.
   * <br />
   * Info button will only be visible when this prop is passed.
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

type TLocalizedTextFieldSTate = Pick<TLocalizedTextFieldProps, 'id'>;

const sequentialId = createSequentialId('localized-text-field-');
const sequentialErrorsId = createSequentialId('localized-text-field-error-')();

const hasErrors = (errors?: TFieldErrors) =>
  errors && Object.values(errors).some(Boolean);

class LocalizedTextField extends Component<
  TLocalizedTextFieldProps,
  TLocalizedTextFieldSTate
> {
  static displayName = 'LocalizedTextField';

  static defaultProps: Pick<TLocalizedTextFieldProps, 'horizontalConstraint'> =
    {
      horizontalConstraint: 'scale',
    };

  state = {
    // We generate an id in case no id is provided by the parent to attach the
    // label to the input component.
    id: this.props.id,
  };

  static getDerivedStateFromProps = (
    props: TLocalizedTextFieldProps,
    state: TLocalizedTextFieldSTate
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

    if (this.props.hintIcon) {
      warning(
        typeof this.props.hint === 'string' || isValidElement(this.props.hint),
        'LocalizedTextField: `hint` is required to be string or ReactNode if hintIcon is present'
      );
    }

    if (this.props.hideLanguageExpansionControls) {
      warning(
        typeof this.props.defaultExpandLanguages !== 'boolean',
        'LocalizedTextField: "defaultExpandLanguages" does not have any effect when "hideLanguageExpansionControls" is set.'
      );
    }

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
          <LocalizedTextInput
            autoComplete={this.props.autoComplete}
            id={this.state.id}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
            selectedLanguage={this.props.selectedLanguage}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
            hideLanguageExpansionControls={
              this.props.hideLanguageExpansionControls
            }
            defaultExpandLanguages={this.props.defaultExpandLanguages}
            isAutofocussed={this.props.isAutofocussed}
            isDisabled={this.props.isDisabled}
            isReadOnly={this.props.isReadOnly}
            errors={this.props.errorsByLanguage}
            hasError={hasError}
            placeholder={this.props.placeholder}
            horizontalConstraint="scale"
            {...filterDataAttributes(this.props)}
            aria-invalid={hasError}
            aria-errormessage={sequentialErrorsId}
          />
          <FieldErrors
            id={sequentialErrorsId}
            errors={this.props.errors}
            isVisible={hasError}
            renderError={this.props.renderError}
          />
        </Spacings.Stack>
      </Constraints.Horizontal>
    );
  }
}

export default LocalizedTextField;
