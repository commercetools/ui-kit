import {
  Component,
  isValidElement,
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
import Spacings from '@commercetools-uikit/spacings';
import FieldLabel from '@commercetools-uikit/field-label';
import SelectInput from '@commercetools-uikit/select-input';
import FieldErrors from '@commercetools-uikit/field-errors';
import type { Props as ReactSelectProps } from 'react-select';

type TErrorRenderer = (key: string, error?: boolean) => ReactNode;
type TOption = {
  value: string;
  label?: ReactNode;
};
type TOptionObject = {
  options: TOption[];
};
type TOptions = TOption[] | TOptionObject[];
type TCustomEvent = {
  target: {
    id?: ReactSelectProps['inputId'];
    name?: ReactSelectProps['name'];
    value?: string | string[] | null;
  };
  persist: () => void;
};
type TFieldErrors = Record<string, boolean>;
// Similar shape of `FormikErrors` but values are `TFieldErrors` objects.
type TCustomFormErrors<Values> = {
  [K in keyof Values]?: TFieldErrors;
};

export type TSelectFieldProps = {
  // SelectField
  /**
   * Used as HTML id property. An id is generated automatically when not provided.
   */
  id?: string;
  horizontalConstraint?:
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
  errors?: {
    missing?: boolean;
  };
  /**
   * This function can return a message which will be wrapped in an ErrorMessage. It can also return null to show no error.
   * <br/>
   */
  renderError?: TErrorRenderer;
  /**
   * Indicates if the value is required. Shows an the "required asterisk" if so.
   */
  isRequired?: boolean;
  /**
   * Indicates whether the field was touched. Errors will only be shown when the field was touched.
   */
  touched?: boolean[] | boolean;

  // SelectInput
  /**
   * Aria label (for assistive tech)
   * <br/>
   * [Props from React select was used](https://react-select.com/props)
   */
  'aria-label'?: ReactSelectProps['aria-label'];
  /**
   * HTML ID of an element that should be used as the label (for assistive tech)
   * <br/>
   * [Props from React select was used](https://react-select.com/props)
   */
  'aria-labelledby'?: ReactSelectProps['aria-labelledby'];
  /**
   * Focus the control when it is mounted
   */
  isAutofocussed?: boolean;
  /**
   * Remove the currently focused option when the user presses backspace
   */
  backspaceRemovesValue?: boolean;
  /**
   * Map of components to overwrite the default ones, see what components you can override
   * <br/>
   * [Props from React select was used](https://react-select.com/props)
   */
  components?: ReactSelectProps['components'];
  /**
   * Control whether the selected values should be rendered in the control
   */
  controlShouldRenderValue?: boolean;
  /**
   * Custom method to filter whether an option should be displayed in the menu
   * <br/>
   * [Props from React select was used](https://react-select.com/props)
   */
  filterOption?: ReactSelectProps['filterOption'];
  /**
   * The id to set on the SelectContainer component
   */
  containerId?: string;
  /**
   * Is the select value clearable
   */
  isClearable?: boolean;
  /**
   * Is the select disabled
   */
  isDisabled?: boolean;
  /**
   * Is the select read-only
   */
  isReadOnly?: boolean;
  /**
   * Override the built-in logic to detect whether an option is disabled
   * <br/>
   * [Props from React select was used](https://react-select.com/props)
   */
  isOptionDisabled?: ReactSelectProps['isOptionDisabled'];
  /**
   * Support multiple selected options
   */
  isMulti?: boolean;
  /**
   * Whether to enable search functionality
   */
  isSearchable?: boolean;
  /**
   * Maximum height of the menu before scrolling
   */
  maxMenuHeight?: number;
  /**
   * Dom element to portal the select menu to
   * <br/>
   * [Props from React select was used](https://react-select.com/props)
   */
  menuPortalTarget?: ReactSelectProps['menuPortalTarget'];
  /**
   * z-index value for the menu portal
   */
  menuPortalZIndex?: number;
  /**
   * whether the menu should block scroll while open
   */
  menuShouldBlockScroll?: boolean;
  /**
   * Name of the HTML Input (optional - without this, no input will be rendered)
   */
  name?: string;
  /**
   * Can be used to render a custom value when there are no options (either because of no search results, or all options have been used, or there were none in the first place). Gets called with { inputValue: String }.
   * <br/>
   * `inputValue` will be an empty string when no search text is present.
   * <br/>
   * [Props from React select was used](https://react-select.com/props)
   */
  noOptionsMessage?: ReactSelectProps['noOptionsMessage'];
  /**
   * Handle blur events on the control
   */
  onBlur?: (event: TCustomEvent) => void;
  /**
   * Called with a fake event when value changes. The event's target.name will be the name supplied in props. The event's target.value will hold the value.
   * <br/>
   * The value will be the selected option, or an array of options in case isMulti is true.
   */
  onChange?: (event?: TCustomEvent) => void;
  /**
   * Handle focus events on the control
   * <br/>
   * [Props from React select was used](https://react-select.com/props)
   */
  onFocus?: ReactSelectProps['onFocus'];
  /**
   * Handle change events on the input
   * <br/>
   * [Props from React select was used](https://react-select.com/props)
   */
  onInputChange?: ReactSelectProps['onInputChange'];
  /**
   * Array of options that populate the select menu
   */
  options?: TOptions;
  showOptionGroupDivider?: boolean;
  /**
   * Placeholder text for the select value
   */
  placeholder?: string;
  /**
   * Sets the tabIndex attribute on the input
   *  <br/>
   * [Props from React select was used](https://react-select.com/props)
   */
  tabIndex?: ReactSelectProps['tabIndex'];
  /**
   * Select the currently focused option when the user presses tab
   */
  tabSelectsValue?: boolean;
  /**
   * The value of the select; reflected by the selected option
   * <br/>
   * [Props from React select was used](https://react-select.com/props)
   */
  value?: ReactSelectProps['value'];

  // LabelField
  /**
   * Title of the label
   */
  title: ReactNode;
  /**
   * Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (e.g warn about uniqueness of a field, when it can only be set once), whereas description can describe it in more depth.
   * <br/>
   * Can also receive a hintIcon.
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
   * Badge to be displayed beside the label. Might be used to display additional information about the content of the field (E.g verified email)
   */
  badge?: ReactNode;
  /**
   * Control to indicate on the input if there are selected values that are potentially invalid
   */
  hasWarning?: boolean;
  /**
   * Icon to display on the left of the placeholder text and selected value. Has no effect when isMulti is enabled.
   */
  iconLeft?: ReactNode;
  /**
   * The value of the search input
   * <br/>
   * [Props from React select was used](https://react-select.com/props)
   */
  inputValue?: ReactSelectProps['inputValue'];
};

type TFieldState = Pick<TSelectFieldProps, 'id'>;

const sequentialId = createSequentialId('select-field-');
const sequentialErrorsId = createSequentialId('select-field-error-')();

const hasErrors = (errors?: TFieldErrors) =>
  errors && Object.values(errors).some(Boolean);

export default class SelectField extends Component<TSelectFieldProps> {
  static displayName = 'SelectField';

  static defaultProps = {
    horizontalConstraint: 'scale',
  };

  state = {
    // We generate an id in case no id is provided by the parent to attach the
    // label to the input component.
    id: this.props.id,
  };

  static getDerivedStateFromProps = (
    props: TSelectFieldProps,
    state: TFieldState
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
    const hasError =
      SelectInput.isTouched(this.props.touched!) &&
      hasErrors(this.props.errors);

    if (this.props.hintIcon) {
      warning(
        typeof this.props.hint === 'string' || isValidElement(this.props.hint),
        'SelectField: `hint` is required to be string or ReactNode if hintIcon is present'
      );
    }

    if (this.props.isMulti) {
      warning(
        Array.isArray(this.props.value) ||
          typeof this.props.value === 'undefined',
        `SelectField: "value" is expected to be an array of strings when "isMulti" is true, instead got ${this.props.value}.`
      );

      warning(
        Array.isArray(this.props.touched) ||
          typeof this.props.touched === 'undefined',
        `SelectField: "touched" is expected to be an array of booleans when "isMulti" is true, instead got ${this.props.touched}.`
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
          <SelectInput
            horizontalConstraint="scale"
            hasError={hasError}
            hasWarning={this.props.hasWarning}
            aria-label={this.props['aria-label']}
            aria-labelledby={this.props['aria-labelledby']}
            isAutofocussed={this.props.isAutofocussed}
            backspaceRemovesValue={this.props.backspaceRemovesValue}
            components={this.props.components}
            filterOption={this.props.filterOption}
            id={this.state.id}
            containerId={this.props.containerId}
            isClearable={this.props.isClearable}
            isDisabled={this.props.isDisabled}
            isReadOnly={this.props.isReadOnly}
            isOptionDisabled={this.props.isOptionDisabled}
            isMulti={this.props.isMulti}
            isSearchable={this.props.isSearchable}
            maxMenuHeight={this.props.maxMenuHeight}
            menuPortalTarget={this.props.menuPortalTarget}
            menuPortalZIndex={this.props.menuPortalZIndex}
            menuShouldBlockScroll={this.props.menuShouldBlockScroll}
            name={this.props.name}
            noOptionsMessage={this.props.noOptionsMessage}
            onBlur={this.props.onBlur}
            onChange={this.props.onChange}
            onFocus={this.props.onFocus}
            onInputChange={this.props.onInputChange}
            options={this.props.options}
            placeholder={this.props.placeholder}
            tabIndex={this.props.tabIndex}
            tabSelectsValue={this.props.tabSelectsValue}
            value={this.props.value}
            showOptionGroupDivider={this.props.showOptionGroupDivider}
            iconLeft={this.props.iconLeft}
            inputValue={this.props.inputValue}
            {...filterDataAttributes(this.props)}
            controlShouldRenderValue={this.props.controlShouldRenderValue}
            /* ARIA */
            aria-invalid={hasError}
            aria-errormessage={sequentialErrorsId}
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
