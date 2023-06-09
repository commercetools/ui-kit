import {
  Component,
  isValidElement,
  type ChangeEventHandler,
  type ReactElement,
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
} from 'react';
import {
  createSequentialId,
  getFieldId,
  warning,
} from '@commercetools-uikit/utils';
import Stack from '@commercetools-uikit/spacings-stack';
import FieldLabel from '@commercetools-uikit/field-label';
import FieldErrors from '@commercetools-uikit/field-errors';
import CheckboxInput from '@commercetools-uikit/checkbox-input';

type TErrorRenderer = (key: string, error?: boolean) => ReactNode;
type TFieldErrors = Record<string, boolean>;
// Similar shape of `FormikErrors` but values are `TFieldErrors` objects.
type TCustomFormErrors<Values> = {
  [K in keyof Values]?: TFieldErrors;
};

const sequentialId = createSequentialId('checkbox-field-');

const hasErrors = (errors?: TFieldErrors) =>
  errors && Object.values(errors).some(Boolean);

type TCheckBoxFieldProps = {
  /**
   * Used as HTML id attribute. An id is auto-generated when it is not specified.
   */
  id?: string;
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
  /**
   * Used as HTML name attribute of the input component
   */
  name?: string;
  /**
   * Value of the input component.
   */
  value?: string;
  /**
   * The checked property sets the checked state of the checkbox.
   */
  isChecked?: boolean;
  /**
   * If `true`, this state is shown as a dash in the checkbox, and indicates that its state is neither checked nor unchecked.
   * This is most often used when the checkbox is tied to a collection of items in mixed states (E.g nested checkboxes).
   * This takes precedence visually in case `isChecked` is marked as `true`
   */
  isIndeterminate?: boolean;
  /**
   *  Will be triggered whenever an `CheckboxInput` is clicked. Called with `event`
   */
  onChange: ChangeEventHandler<HTMLInputElement>;
  /**
   * Forces CheckboxInput to be rendered in a hovered state.
   * Needed for cases when hovered appearance should be triggered by the parent component and not the CheckboxInput itself.
   * CheckboxInput is capable of handling it's own hovering without the need to pass this prop.
   */
  isHovered?: boolean;
  /**
   * Disables the CheckboxInput
   */
  isDisabled?: boolean;
  /**
   * Makes the CheckboxInput readonly
   */
  isReadOnly?: boolean;
  /**
   * Indicates that the checkbox has an error
   */
  hasError?: boolean;
  /**
   * The descriptive text of the CheckboxInput, used as its label.
   */
  children?: ReactNode;
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
   * Function called when info button is pressed. Info button will only be visible when this prop is passed.
   */
  onInfoButtonClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * Icon to be displayed beside the hint text. Will only get rendered when hint is passed as well.
   */
  hintIcon?: ReactElement;
  /**
   * Badge to be displayed beside the label. Might be used to display additional information about the content of the field (E.g verified email)
   */
  badge?: ReactNode;
  /**
   * Indicates if the labeled field is required in a form
   */
};

type TCheckBoxFieldStates = Pick<TCheckBoxFieldProps, 'id'>;

class CheckBoxField extends Component<
  TCheckBoxFieldProps,
  TCheckBoxFieldStates
> {
  static displayName = 'CheckBoxField';

  static defaultProps = {
    isChecked: false,
    isDisabled: false,
    hasError: false,
  };

  state = {
    // We generate an id in case no id is provided by the parent to attach the
    // label to the input component.
    id: this.props.id,
  };

  static getDerivedStateFromProps = (
    props: TCheckBoxFieldProps,
    state: TCheckBoxFieldStates
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
        'CheckBoxField: `onChange` is required when field is not read only.'
      );
    }

    if (this.props.hintIcon) {
      warning(
        typeof this.props.hint === 'string' || isValidElement(this.props.hint),
        'CheckBoxField: `hint` is required to be string or ReactNode if hintIcon is present'
      );
    }

    return (
      <Stack scale="xs">
        <FieldLabel
          title={this.props.title}
          hint={this.props.hint}
          description={this.props.description}
          onInfoButtonClick={this.props.onInfoButtonClick}
          hintIcon={this.props.hintIcon}
          badge={this.props.badge}
          hasRequiredIndicator={this.props.isRequired}
        />
        <CheckboxInput
          id={this.state.id}
          name={this.props.name}
          value={this.props.value}
          isChecked={this.props.isChecked}
          isIndeterminate={this.props.isIndeterminate}
          onChange={this.props.onChange}
          isHovered={false}
          isDisabled={this.props.isDisabled}
          isReadOnly={this.props.isReadOnly}
          hasError={this.props.hasError}
        >
          {this.props.children}
        </CheckboxInput>
        <FieldErrors
          errors={this.props.errors}
          isVisible={hasError}
          renderError={this.props.renderError}
        />
      </Stack>
    );
  }
}

export default CheckBoxField;
