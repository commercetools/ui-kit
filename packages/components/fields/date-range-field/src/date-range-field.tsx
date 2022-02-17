import {
  Component,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import type { MomentInput } from 'moment';
import {
  filterDataAttributes,
  createSequentialId,
  getFieldId,
  warning,
} from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import FieldLabel from '@commercetools-uikit/field-label';
import DateRangeInput from '@commercetools-uikit/date-range-input';
import FieldErrors from '@commercetools-uikit/field-errors';

type TErrorRenderer = (key: string, error?: boolean) => ReactNode;
type TFieldErrors = Record<string, boolean>;
type TEvent = {
  target: {
    id?: string;
    name?: string;
    value?: MomentInput[];
  };
};

const sequentialId = createSequentialId('date-range-field-');

const hasErrors = (errors?: TFieldErrors) =>
  errors && Object.values(errors).some(Boolean);

type TDateRangeFieldProps = {
  // DateRangeField
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

  // DateRangeInput
  /**
   * Used as HTML name of the input component.
   */
  name?: string;
  /**
   * The selected date range. Must either be an empty array or an array of two strings holding dates formatted as "YYYY-MM-DD".
   */
  value: string[];
  /**
   * Called when the date range changes, with an event containing either an empty array (no value) or an array holding two string in this format: "YYYY-MM-DD".
   * <br/>
   * Required when input is not read only.
   */
  onChange: (event: TEvent) => void;
  /**
   * Called when input is blurred
   */
  onBlur?: (event: TEvent) => void;
  /**
   * Called when input is focused
   */
  onFocus?: (event: TEvent) => void;
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
  badge?: ReactNode;
};

type TDateRangeFieldState = Pick<TDateRangeFieldProps, 'id'>;

class DateRangeField extends Component<
  TDateRangeFieldProps,
  TDateRangeFieldState
> {
  static displayName = 'DateRangeField';

  static defaultProps: Pick<TDateRangeFieldProps, 'horizontalConstraint'> = {
    horizontalConstraint: 'scale',
  };

  state = {
    // We generate an id in case no id is provided by the parent to attach the
    // label to the input component.
    id: this.props.id,
  };

  static getDerivedStateFromProps = (
    props: TDateRangeFieldProps,
    state: TDateRangeFieldState
  ) => ({
    id: getFieldId(props, state, sequentialId),
  });

  render() {
    const hasError = this.props.touched && hasErrors(this.props.errors);

    if (!this.props.isReadOnly) {
      warning(
        typeof this.props.onChange === 'function',
        'DateRangeField: `onChange` is required when field is not read only.'
      );
    }

    if (this.props.hintIcon) {
      warning(
        typeof this.props.hint === 'string' || isValidElement(this.props.hint),
        'DateRangeField: `hint` is required to be string or ReactNode if hintIcon is present'
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
          <DateRangeInput
            id={this.state.id}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            isDisabled={this.props.isDisabled}
            isReadOnly={this.props.isReadOnly}
            hasError={hasError}
            placeholder={this.props.placeholder}
            horizontalConstraint="scale"
            {...filterDataAttributes(this.props)}
          />
          <FieldErrors
            errors={this.props.errors}
            isVisible={hasError}
            renderError={this.props.renderError}
          />
        </Spacings.Stack>
      </Constraints.Horizontal>
    );
  }
}

export default DateRangeField;
