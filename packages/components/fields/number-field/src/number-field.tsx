import {
  Component,
  isValidElement,
  type ChangeEventHandler,
  type FocusEventHandler,
  type ReactElement,
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
} from 'react';
import {
  createSequentialId,
  filterDataAttributes,
  getFieldId,
  warning,
} from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import Stack from '@commercetools-uikit/spacings-stack';
import FieldLabel from '@commercetools-uikit/field-label';
import FieldErrors from '@commercetools-uikit/field-errors';
import FieldWarnings from '@commercetools-uikit/field-warnings';
import NumberInput from '@commercetools-uikit/number-input';
import messages from './messages';
import { FormattedMessage } from 'react-intl';

const sequentialId = createSequentialId('number-field-');
const sequentialErrorsId = createSequentialId('number-field-error-')();
const sequentialWarningsId = createSequentialId('number-field-warning-')();

type TErrorRenderer = (key: string, error?: boolean) => ReactNode;
type TFieldWarnings = Record<string, boolean>;
type TFieldErrors = Record<string, boolean>;
// Similar shape of `FormikErrors` but values are `TFieldErrors` objects.
type TCustomFormErrors<Values> = {
  [K in keyof Values]?: TFieldErrors;
};

const hasErrors = (errors?: TFieldErrors) =>
  errors && Object.values(errors).some(Boolean);

const hasWarnings = (warnings?: TFieldWarnings) =>
  warnings && Object.values(warnings).some(Boolean);

export type TNumberFieldProps = {
  // NumberField
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
   * A map of warnings. Warning messages for known warnings are rendered automatically.
   * <br/>
   * Unknown warnings will be forwarded to renderWarning.
   */
  warnings?: TFieldWarnings;
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

  // NumberInput
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

  // LabelField
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

type TNumberFieldState = Pick<TNumberFieldProps, 'id'>;

class NumberField extends Component<TNumberFieldProps, TNumberFieldState> {
  static displayName = 'NumberField';

  static defaultProps: Pick<TNumberFieldProps, 'horizontalConstraint'> = {
    horizontalConstraint: 'scale',
  };

  state = {
    // We generate an id in case no id is provided by the parent to attach the
    // label to the input component.
    id: this.props.id,
  };

  static getDerivedStateFromProps = (
    props: TNumberFieldProps,
    state: TNumberFieldState
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

  renderError(key?: string): ReactNode | null {
    switch (key) {
      case 'belowMin':
        if (typeof this.props.min === 'number') {
          return (
            <FormattedMessage
              {...messages.belowMinError}
              values={{ min: this.props.min }}
            />
          );
        }
        break;
      case 'aboveMax':
        if (typeof this.props.max === 'number') {
          return (
            <FormattedMessage
              {...messages.aboveMaxError}
              values={{ max: this.props.max }}
            />
          );
        }
        break;
    }

    return null;
  }

  render() {
    if (!this.props.isReadOnly) {
      warning(
        typeof this.props.onChange === 'function',
        'NumberField: `onChange` is required when field is not read only.'
      );
    }

    if (this.props.hintIcon) {
      warning(
        typeof this.props.hint === 'string' || isValidElement(this.props.hint),
        'NumberField: `hint` is required to be string or ReactNode if hintIcon is present'
      );
    }

    const hasError = this.props.touched && hasErrors(this.props.errors);
    const hasWarning = this.props.touched && hasWarnings(this.props.warnings);

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
          <NumberInput
            id={this.state.id}
            name={this.props.name}
            autoComplete={this.props.autoComplete}
            value={this.props.value}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
            isAutofocussed={this.props.isAutofocussed}
            isDisabled={this.props.isDisabled}
            isReadOnly={this.props.isReadOnly}
            hasError={hasError}
            hasWarning={hasWarning}
            placeholder={this.props.placeholder}
            horizontalConstraint="scale"
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            {...filterDataAttributes(this.props)}
            /* ARIA */
            aria-invalid={hasError}
            aria-errormessage={sequentialErrorsId}
          />
          <FieldErrors
            id={sequentialErrorsId}
            errors={this.props.errors}
            isVisible={hasError}
            renderError={(key: string, error?: boolean) =>
              // Custom errors take precedence over the default errors
              this.props.renderError?.(key, error) || this.renderError(key)
            }
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

export default NumberField;
