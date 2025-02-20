import {
  Component,
  isValidElement,
  type ReactNode,
  type ChangeEventHandler,
  type ReactElement,
  type FocusEventHandler,
} from 'react';
import {
  filterDataAttributes,
  getFieldId,
  createSequentialId,
  warning,
} from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import FieldLabel, { type TIconProps } from '@commercetools-uikit/field-label';
import LocalizedMultilineTextInput, {
  type TLocalizedMultilineTextInputProps,
} from '@commercetools-uikit/localized-multiline-text-input';
import FieldErrors from '@commercetools-uikit/field-errors';
import FieldWarnings from '@commercetools-uikit/field-warnings';

type TErrorRenderer = (key: string, error?: boolean) => ReactNode;
type TFieldWarnings = Record<string, boolean>;
type TFieldErrors = Record<string, boolean>;
// Similar shape of `FormikErrors` but values are `TFieldErrors` objects.
type TCustomFormErrors<Values> = {
  [K in keyof Values]?: TFieldErrors;
};

interface HTMLLocalizedTextAreaElement extends HTMLTextAreaElement {
  language: string;
}

export type TLocalizedMultilineTextFieldProps = {
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
   * A map of warnings. Warning messages for known warnings are rendered automatically.
   * <br/>
   * Unknown warnings will be forwarded to renderWarning.
   */
  warnings?: TFieldWarnings;
  /**
   * Called with custom warnings, as renderWarning(key, warning). This function can return a message which will be wrapped in a WarningMessage.
   * <br />
   * It can also return null to show no warning.
   */
  renderWarning?: (key: string, warning?: boolean) => ReactNode;
  /**
   * An object mapping locales to additional messages to be rendered below each input element.
    Example:
    {
      en: 'Some value',
      es: 'Algún valor',
    }
   */
  additionalInfo?: TLocalizedMultilineTextInputProps['additionalInfo'];
  /**
   * Indicates if the value is required. Shows an the "required asterisk" if so.
   */
  isRequired?: boolean;
  /**
   * Indicates whether the field was touched. Errors will only be shown when the field was touched.
   */
  touched?: boolean;

  // LocalizedMultilineTextInput
  /**
   * Used as HTML `autocomplete` property
   */
  autoComplete?: string;
  /**
   * Used as HTML `name` property for each input field. Each input field name will have the language as a suffix (`${namePrefix}.${lang}`), e.g. `foo.en`
   */
  name?: string;
  /**
   * Values to use. Keyed by language, the values are the actual values, e.g. `{ en: 'Horse', de: 'Pferd' }`
   * <br />
   * The input doesn't accept a "languages" prop, instead all possible
   * languages have to exist (with empty or filled strings) on the value:
   * <br />
   * { en: 'foo', de: '', es: '' }
   */
  value: {
    [key: string]: string;
  };

  /**
   * Gets called when any input is changed. Is called with the change event of the changed input.
   */
  onChange?: ChangeEventHandler<HTMLLocalizedTextAreaElement>;
  /**
   * Specifies which language will be shown in case the `LocalizedTextInput` is collapsed.
   */
  selectedLanguage: string;
  /**
   * Called when input is blurred
   */
  onBlur?: FocusEventHandler<HTMLLocalizedTextAreaElement>;
  /**
   * Called when input is focused
   */
  onFocus?: () => void;
  /**
   * Expands input components holding multiline values instead of collapsing them by default.
   */
  defaultExpandMultilineText?: boolean;
  /**
   * Use this property to turn off caching input measurements.
   */
  cacheMeasurements?: boolean;
  /**
   * Will hide the language expansion controls when set to `true`. All languages will be shown when set to `true`.
   */
  hideLanguageExpansionControls?: boolean;
  /**
   * Controls whether one or all languages are visible by default. Pass `true` to show all languages by default.
   */
  defaultExpandLanguages?: boolean;

  /**
   * Sets the focus on the first input when `true` is passed.
   */
  isAutofocussed?: boolean;
  /**
   * Whether the text inputs for each localization should render with condensed paddings.
   */
  isCondensed?: boolean;
  /**
   * Disables all input fields.
   */
  isDisabled?: boolean;
  /**
   * Disables all input fields and shows them in read-only mode.
   */
  isReadOnly?: boolean;
  /**
   * Placeholders for each language. Object of the same shape as `value`.
   */
  placeholder?: {
    [key: string]: string;
  };
  /**
   * Errors for each translation. These are forwarded to the `errors` prop of `LocalizedTextInput`.
   */
  errorsByLanguage?: {
    [key: string]: ReactNode;
  };

  // LabelField
  /**
   * Title of the label
   */
  title: string | ReactNode;
  /**
   * Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (e.g warn about uniqueness of a field, when it can only be set once), whereas description can describe it in more depth. Can also receive a hintIcon.
   */
  hint?: string | ReactNode;
  /**
   * Provides a description for the title.
   */
  description?: string | ReactNode;
  /**
   * 	Function called when info button is pressed. Info button will only be visible when this prop is passed.
   */
  onInfoButtonClick?: () => void;
  /**
   * Icon to be displayed beside the hint text. Will only get rendered when hint is passed as well.
   */
  hintIcon?: ReactElement<TIconProps>;
  /**
   * Badge to be displayed beside the label. Might be used to display additional information about the content of the field (E.g verified email)
   */
  badge?: ReactNode;
};
type TLocalizedMultilineTextFieldState = Pick<
  TLocalizedMultilineTextFieldProps,
  'id'
>;

const sequentialId = createSequentialId('localized-multiline-text-field-');

const hasErrors = (errors?: TFieldErrors) =>
  errors && Object.values(errors).some(Boolean);

const hasWarnings = (warnings?: TFieldWarnings) =>
  warnings && Object.values(warnings).some(Boolean);

class LocalizedMultilineTextField extends Component<
  TLocalizedMultilineTextFieldProps,
  TLocalizedMultilineTextFieldState
> {
  static displayName = 'LocalizedMultilineTextField';

  static defaultProps: Pick<
    TLocalizedMultilineTextFieldProps,
    'horizontalConstraint' | 'cacheMeasurements'
  > = {
    horizontalConstraint: 'scale',
    cacheMeasurements: true,
  };

  state = {
    // We generate an id in case no id is provided by the parent to attach the
    // label to the input component.
    id: this.props.id,
  };

  static getDerivedStateFromProps = (
    props: TLocalizedMultilineTextFieldProps,
    state: TLocalizedMultilineTextFieldState
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
    if (!this.props.isReadOnly) {
      warning(
        typeof this.props.onChange === 'function',
        'LocalizedMultilineTextField: `onChange` is required when field is not read only.'
      );
    }

    if (this.props.hintIcon) {
      warning(
        typeof this.props.hint === 'string' || isValidElement(this.props.hint),
        'LocalizedMultilineTextField: `hint` is required to be string or ReactNode if hintIcon is present'
      );
    }

    const hasError = this.props.touched && hasErrors(this.props.errors);
    const hasWarning = this.props.touched && hasWarnings(this.props.warnings);

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
          <LocalizedMultilineTextInput
            id={this.state.id}
            name={this.props.name}
            autoComplete={this.props.autoComplete}
            value={this.props.value}
            onChange={this.props.onChange}
            selectedLanguage={this.props.selectedLanguage}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
            defaultExpandMultilineText={this.props.defaultExpandMultilineText}
            hideLanguageExpansionControls={
              this.props.hideLanguageExpansionControls
            }
            defaultExpandLanguages={this.props.defaultExpandLanguages}
            isAutofocussed={this.props.isAutofocussed}
            cacheMeasurements={this.props.cacheMeasurements}
            isCondensed={this.props.isCondensed}
            isDisabled={this.props.isDisabled}
            isReadOnly={this.props.isReadOnly}
            errors={this.props.errorsByLanguage}
            hasError={hasError}
            hasWarning={hasWarning}
            placeholder={this.props.placeholder}
            horizontalConstraint="scale"
            {...filterDataAttributes(this.props)}
            /* ARIA */
            aria-invalid={hasError}
            aria-errormessage={errorsContainerId}
            additionalInfo={
              this.props.additionalInfo && this.props.additionalInfo
            }
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

export default LocalizedMultilineTextField;
