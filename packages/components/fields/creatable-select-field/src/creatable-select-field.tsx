import {
  Component,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import type { GroupBase, ActionMeta } from 'react-select';
import type { CreatableProps } from 'react-select/creatable';
import {
  createSequentialId,
  filterDataAttributes,
  getFieldId,
  warning,
} from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import FieldLabel from '@commercetools-uikit/field-label';
import CreatableSelectInput from '@commercetools-uikit/creatable-select-input';
import FieldErrors from '@commercetools-uikit/field-errors';
import FieldWarnings from '@commercetools-uikit/field-warnings';

type ReactSelectCreatableProps = CreatableProps<
  unknown,
  boolean,
  GroupBase<unknown>
>;
type TErrorRenderer = (key: string, error?: boolean) => ReactNode;
type TFieldWarnings = Record<string, boolean>;
type TFieldErrors = Record<string, boolean>;
// Similar shape of `FormikErrors` but values are `TFieldErrors` objects.
type TCustomFormErrors<Values> = {
  [K in keyof Values]?: TFieldErrors;
};
type TValue = {
  value: string;
  label?: ReactNode;
};
type TOptions = TValue[] | { options: TValue[] }[];

type TCustomEvent = {
  target: {
    id?: string;
    name?: string;
    value?: unknown;
  };
  persist?: () => void;
};

const sequentialId = createSequentialId('creatable-select-field-');
const sequentialErrorsId = createSequentialId(
  'creatable-select-field-error-'
)();
const sequentialWarningsId = createSequentialId(
  'creatable-select-field-warning-'
)();

const hasErrors = (errors?: TFieldErrors) =>
  errors && Object.values(errors).some(Boolean);

const hasWarnings = (warnings?: TFieldWarnings) =>
  warnings && Object.values(warnings).some(Boolean);

export type TCreatableSelectFieldProps = {
  // CreatableSelectField
  /**
   * Used as HTML id property. An id is auto-generated when it is not specified.
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  id?: ReactSelectCreatableProps['inputId'];
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
   * <br>
   * Unknown errors will be forwarded to `renderError`
   */
  errors?: TFieldErrors;
  /**
   * Called with custom errors. This function can return a message which will be wrapped in an ErrorMessage. It can also return null to show no error.
   */
  renderError?: TErrorRenderer;
  /**
   * A map of warnings. Warning messages for known warnings are rendered automatically.
   * <br />
   * Unknown warnings will be forwarded to `renderWarning`
   */
  warnings?: TFieldWarnings;
  /**
   * Called with custom warnings. This function can return a message which will be wrapped in an WarningMessage. It can also return null to show no warning.
   */
  renderWarning?: (key: string, warning?: boolean) => ReactNode;
  /**
   * Indicates if the value is required. Shows an the "required asterisk" if so.
   */
  isRequired?: boolean;
  /**
   * Indicates whether the field was touched. Errors will only be shown when the field was touched.
   */
  touched?: boolean[] | boolean;

  // CreatableSelectInput
  /**
   * Aria label (for assistive tech)
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  'aria-label'?: ReactSelectCreatableProps['aria-label'];
  /**
   * HTML ID of an element that should be used as the label (for assistive tech)
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  'aria-labelledby'?: ReactSelectCreatableProps['aria-label'];
  /**
   * 	Focus the control when it is mounted
   */
  isAutofocussed?: boolean;
  /**
   * Remove the currently focused option when the user presses backspace
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  backspaceRemovesValue?: ReactSelectCreatableProps['backspaceRemovesValue'];
  /**
   * Map of components to overwrite the default ones, see [what components you can override](https://react-select.com/components)
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  components?: ReactSelectCreatableProps['components'];
  /**
   * Custom method to filter whether an option should be displayed in the menu
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  filterOption?: ReactSelectCreatableProps['filterOption'];
  /**
   * The id to set on the SelectContainer component
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  containerId?: ReactSelectCreatableProps['id'];
  /**
   * Is the select value clearable
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  isClearable?: ReactSelectCreatableProps['isClearable'];
  /**
   * Is the select disabled
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  isDisabled?: ReactSelectCreatableProps['isDisabled'];
  /**
   * Is the select read-only
   */
  isReadOnly?: ConstrainBooleanParameters;
  /**
   * Override the built-in logic to detect whether an option is disabled
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  isOptionDisabled?: ReactSelectCreatableProps['isOptionDisabled'];
  /**
   * Support multiple selected options
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  isMulti?: ReactSelectCreatableProps['isMulti'];
  /**
   * Whether to enable search functionality
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  isSearchable?: ReactSelectCreatableProps['isSearchable'];
  /**
   * Indicates the input field has an error
   * @deprecated Please use the `warnings` prop instead so users know the reason why the field is in warning state.
   */
  hasWarning?: boolean;
  /**
   * Maximum height of the menu before scrolling
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  maxMenuHeight?: ReactSelectCreatableProps['maxMenuHeight'];
  /**
   * Dom element to portal the select menu to
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  menuPortalTarget?: ReactSelectCreatableProps['menuPortalTarget'];
  /**
   * z-index value for the menu portal
   * <br>
   * Use in conjunction with `menuPortalTarget`
   */
  menuPortalZIndex?: number;
  /**
   * whether the menu should block scroll while open
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  menuShouldBlockScroll?: ReactSelectCreatableProps['menuShouldBlockScroll'];
  /**
   * Name of the HTML Input (optional - without this, no input will be rendered)
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  name?: ReactSelectCreatableProps['name'];
  /**
   * Can be used to render a custom value when there are no options (either because of no search results, or all options have been used, or there were none in the first place).
   * <br>
   * Gets called with `{ inputValue: String }`. `inputValue` will be an empty string when no search text is present.
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  noOptionsMessage?: ReactSelectCreatableProps['noOptionsMessage'];
  /**
   * Handle blur events on the control
   */
  onBlur?: (event: TCustomEvent) => void;
  /**
   * Called with a fake event when value changes.
   * <br>
   * The event's `target.name` will be the name supplied in props. The event's `target.value` will hold the value. The value will be the selected option, or an array of options in case `isMulti` is `true`.
   */
  onChange?: (event: TCustomEvent, info: ActionMeta<unknown>) => void;
  /**
   * Handle focus events on the control
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  onFocus?: ReactSelectCreatableProps['onFocus'];
  /**
   * Handle change events on the input
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  onInputChange?: ReactSelectCreatableProps['onInputChange'];
  /**
   * Array of options that populate the select menu
   */
  options?: TOptions;
  /**
   * Placeholder text for the select value
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  placeholder?: ReactSelectCreatableProps['placeholder'];
  /**
   * Use this property to reduce the paddings of the component for a ui compact variant
   */
  isCondensed?: boolean;
  /**
   * Sets the tabIndex attribute on the input
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  tabIndex?: ReactSelectCreatableProps['tabIndex'];
  /**
   * Select the currently focused option when the user presses tab
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  tabSelectsValue?: ReactSelectCreatableProps['tabSelectsValue'];
  /**
   * The value of the select; reflected by the selected option
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  value?: ReactSelectCreatableProps['value'];
  /**
   * Determines if option groups will be separated by a divider
   */
  showOptionGroupDivider?: boolean;

  // Creatable props
  /**
   * Allow options to be created while the isLoading prop is true. Useful to prevent the "create new ..." option being displayed while async results are still being loaded.
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  allowCreateWhileLoading?: ReactSelectCreatableProps['allowCreateWhileLoading'];
  /**
   * Gets the label for the "create new ..." option in the menu. Is given the current input value.
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  formatCreateLabel?: ReactSelectCreatableProps['formatCreateLabel'];
  /**
   * Determines whether the "create new ..." option should be displayed based on the current input value, select value and options array.
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  isValidNewOption?: ReactSelectCreatableProps['isValidNewOption'];
  /**
   * Returns the data for the new option when it is created. Used to display the value, and is passed to onChange.
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  getNewOptionData?: ReactSelectCreatableProps['getNewOptionData'];
  /**
   * If provided, this will be called with the input value when a new option is created, and onChange will not be called. Use this when you need more control over what happens when new options are created.
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  onCreateOption?: ReactSelectCreatableProps['onCreateOption'];
  /**
   * Sets the position of the createOption element in your options list.
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  createOptionPosition?: ReactSelectCreatableProps['createOptionPosition'];

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
   * <br>
   * Info button will only be visible when this prop is passed.
   */
  onInfoButtonClick?: () => void;
  /**
   * Icon to be displayed beside the hint text.
   * <br>
   * Will only get rendered when `hint` is passed as well.
   */
  hintIcon?: ReactElement;
  /**
   * Badge to be displayed beside the label.
   * <br>
   * Might be used to display additional information about the content of the field (E.g verified email)
   */
  badge?: ReactNode;
  /**
   * Icon to display on the left of the placeholder text and selected value. Has no effect when isMulti is enabled.
   */
  iconLeft?: ReactNode;
};

type TCreatableSelectFieldState = Pick<TCreatableSelectFieldProps, 'id'>;

export default class CreatableSelectField extends Component<
  TCreatableSelectFieldProps,
  TCreatableSelectFieldState
> {
  static displayName = 'CreatableSelectField';

  static defaultProps = {
    horizontalConstraint: 'scale',
  };

  state = {
    // We generate an id in case no id is provided by the parent to attach the
    // label to the input component.
    id: this.props.id,
  };

  static getDerivedStateFromProps = (
    props: TCreatableSelectFieldProps,
    state: TCreatableSelectFieldState
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
      CreatableSelectInput.isTouched(this.props.touched) &&
      hasErrors(this.props.errors);

    const hasWarning =
      this.props.hasWarning ||
      (CreatableSelectInput.isTouched(this.props.touched) &&
        hasWarnings(this.props.warnings));

    if (!this.props.isReadOnly) {
      warning(
        typeof this.props.onChange === 'function',
        'CreatableSelectField: `onChange` is required when field is not read only.'
      );
    }

    if (this.props.hintIcon) {
      warning(
        typeof this.props.hint === 'string' || isValidElement(this.props.hint),
        'CreatableSelectField: `hint` is required to be string or ReactNode if hintIcon is present'
      );
    }

    if (this.props.isMulti) {
      warning(
        Array.isArray(this.props.value),
        'CreatableSelectField: `value` is expected to be an array of string when isMulti is true'
      );

      warning(
        typeof this.props.touched === 'undefined' ||
          Array.isArray(this.props.touched),
        'CreatableSelectField: `touched` is expected to be an array of boolean when isMulti is true'
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
          <CreatableSelectInput
            horizontalConstraint="scale"
            hasError={hasError}
            aria-label={this.props['aria-label']}
            aria-labelledby={this.props['aria-labelledby']}
            aria-invalid={hasError}
            aria-errormessage={sequentialErrorsId}
            isAutofocussed={this.props.isAutofocussed}
            backspaceRemovesValue={this.props.backspaceRemovesValue}
            components={this.props.components}
            filterOption={this.props.filterOption}
            id={this.state.id}
            containerId={this.props.containerId}
            isClearable={this.props.isClearable}
            isDisabled={this.props.isDisabled}
            isOptionDisabled={this.props.isOptionDisabled}
            isMulti={this.props.isMulti}
            isSearchable={this.props.isSearchable}
            hasWarning={hasWarning}
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
            // Creatable props
            allowCreateWhileLoading={this.props.allowCreateWhileLoading}
            formatCreateLabel={this.props.formatCreateLabel}
            isValidNewOption={this.props.isValidNewOption}
            getNewOptionData={this.props.getNewOptionData}
            onCreateOption={this.props.onCreateOption}
            createOptionPosition={this.props.createOptionPosition}
            showOptionGroupDivider={this.props.showOptionGroupDivider}
            iconLeft={this.props.iconLeft}
            // @ts-ignore
            isCondensed={this.props.isCondensed}
            {...filterDataAttributes(this.props)}
          />
          <FieldErrors
            id={sequentialErrorsId}
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
        </Spacings.Stack>
      </Constraints.Horizontal>
    );
  }
}
