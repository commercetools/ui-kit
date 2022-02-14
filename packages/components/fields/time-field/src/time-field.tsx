import {
  Component,
  isValidElement,
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

type TEvent = {
  target: {
    id?: string;
    name?: string;
    value?: unknown;
  };
  persist?: () => void;
};

type TFieldErrors = Record<string, boolean>;

type TTimeFieldProps = {
  // TimeField
  /**
   * Used as HTML id property. An id is auto-generated when it is not specified.
   */
  id: string;

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
   * Called with custom errors, as renderError(key, error). This function can return a message which will be wrapped in an ErrorMessage.
   * <br />
   * It can also return null to show no error.
   */
  renderError?: (key: string, error?: boolean) => ReactNode;

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
   * <br/>
   * Required when input is not read only. Parent should pass it back as `value`-
   */
  onChange: (event: TEvent) => void;

  /**
   * Called when input is blurred
   */
  onBlur?: (event: TEvent) => void;

  /**
   * Called when input is focused
   * <br/>
   * Signature: `(event) => void`
   */
  onFocus?: (event: TEvent) => void;

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

const hasErrors = (errors?: TFieldErrors) =>
  errors && Object.values(errors).some(Boolean);

class TimeField extends Component<TTimeFieldProps, TTimeFieldState> {
  static displayName = 'TimeField';

  static defaultProps = {
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

  render() {
    const hasError = this.props.touched && hasErrors(this.props.errors);

    if (!this.props.isReadOnly) {
      warning(
        typeof this.props.onChange === 'function',
        'TimeField: `onChange` is required when is not read only.'
      );
    }

    if (this.props.hintIcon) {
      warning(
        typeof this.props.hint === 'string' ||
          isValidElement(typeof this.props.hint),
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
            hasError={hasError}
            placeholder={this.props.placeholder}
            horizontalConstraint="scale"
            isReadOnly={this.props.isReadOnly}
            {...filterDataAttributes(this.props)}
          />
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

export default TimeField;
