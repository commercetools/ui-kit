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
import Stack, { type TStackProps } from '@commercetools-uikit/spacings-stack';
import FieldLabel from '@commercetools-uikit/field-label';
import FieldErrors from '@commercetools-uikit/field-errors';
import RadioInput from '@commercetools-uikit/radio-input';

type TErrorRenderer = (key: string, error?: boolean) => ReactNode;
type TFieldErrors = Record<string, boolean>;
// Similar shape of `FormikErrors` but values are `TFieldErrors` objects.
type TCustomFormErrors<Values> = {
  [K in keyof Values]?: TFieldErrors;
};

const sequentialId = createSequentialId('radio-field-');
const sequentialErrorsId = createSequentialId('radio-field-error-')();

const hasErrors = (errors?: TFieldErrors) =>
  errors && Object.values(errors).some(Boolean);

export type TRadioFieldProps = {
  // RadioField
  /**
   * Used as HTML id property. An id is auto-generated when it is not specified.
   */
  id?: string;
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint?:
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
   * A map of errors. Error messages for known errors are rendered automatically. Unknown errors will be forwarded to `renderError`.
   */
  errors?: TFieldErrors;
  /**
   * Called with custom errors.
   * <br/>
   * This function can return a message which will be wrapped in an ErrorMessage. It can also return null to show no error.
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

  // RadioInput
  /**
   * Used as HTML name of the input component.
   */
  name?: string;
  /**
   * Value of the input component.
   */
  value: string;
  /**
   * Called with an event containing the new value. Required when input is not read only. Parent should pass it back as value.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /**
   * Called when input is blurred
   */
  onBlur?: FocusEventHandler<HTMLLabelElement>;
  /**
   * Called when input is focused
   */
  onFocus?: FocusEventHandler<HTMLLabelElement>;
  /**
   * Indicates that the input cannot be modified (e.g not authorized, or changes currently saving).
   */
  isDisabled?: boolean;
  /**
   * Indicates that the field is displaying read-only content
   */
  isReadOnly?: boolean;
  /**
   * Rendering direction of the radio `RadioInput.Option`s
   */
  direction?: 'stack' | 'inline';
  /**
   * Passes props of the `Spacings.Stack` or `Spacings.Inline`, depending on the chosen direction
   */
  directionProps?: Partial<TStackProps>;
  /**
   * At least one `RadioInput.Option` component or another node (mixed children are allowed)
   */
  children: ReactNode;

  // LabelField
  /**
   * Title of the label
   */
  title: string | ReactNode;
  /**
   * Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (e.g warn about uniqueness of a field, when it can only be set once), whereas description can describe it in more depth.
   * <br />
   * Can also receive a `hintIcon`.
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

type TRadioFieldStates = Pick<TRadioFieldProps, 'id'>;

class RadioField extends Component<TRadioFieldProps, TRadioFieldStates> {
  static displayName = 'RadioField';

  static defaultProps = {
    horizontalConstraint: 'scale',
  };

  state = {
    // We generate an id in case no id is provided by the parent to attach the
    // label to the input component.
    id: this.props.id,
  };

  static getDerivedStateFromProps = (
    props: TRadioFieldProps,
    state: TRadioFieldStates
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

    if (!this.props.isReadOnly) {
      warning(
        typeof this.props.onChange === 'function',
        'RadioField: `onChange` is required when field is not read only.'
      );
    }

    if (this.props.hintIcon) {
      warning(
        typeof this.props.hint === 'string' || isValidElement(this.props.hint),
        'RadioField: `hint` is required to be string or ReactNode if hintIcon is present'
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
            id={this.state.id}
          />
          <RadioInput.Group
            id={this.state.id}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
            isDisabled={this.props.isDisabled}
            isReadOnly={this.props.isReadOnly}
            hasError={hasError}
            horizontalConstraint={this.props.horizontalConstraint}
            direction={this.props.direction}
            directionProps={this.props.directionProps}
            {...filterDataAttributes(this.props)}
            /* ARIA */
            aria-invalid={hasError}
            aria-errormessage={sequentialErrorsId}
          >
            {this.props.children}
          </RadioInput.Group>
          <FieldErrors
            errors={this.props.errors}
            isVisible={hasError}
            renderError={this.props.renderError}
          />
        </Stack>
      </Constraints.Horizontal>
    );
  }
}

export default RadioField;
