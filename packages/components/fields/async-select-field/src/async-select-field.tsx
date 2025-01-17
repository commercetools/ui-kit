import {
  Component,
  isValidElement,
  type FocusEventHandler,
  type ReactElement,
  type ReactNode,
} from 'react';
import type { AsyncProps } from 'react-select/async';
import type { GroupBase, OptionsOrGroups, ActionMeta } from 'react-select';
import {
  filterDataAttributes,
  getFieldId,
  createSequentialId,
  warning,
} from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import FieldLabel, { type TIconProps } from '@commercetools-uikit/field-label';
import AsyncSelectInput from '@commercetools-uikit/async-select-input';
import FieldErrors from '@commercetools-uikit/field-errors';
import FieldWarnings from '@commercetools-uikit/field-warnings';

type ReactSelectAsyncProps = AsyncProps<unknown, boolean, GroupBase<unknown>>;
type TErrorRenderer = (key: string, error?: boolean) => ReactNode;
type TFieldErrors = Record<string, boolean>;
type TFieldWarnings = Record<string, boolean>;
// Similar shape of `FormikErrors` but values are `TFieldErrors` objects.
type TCustomFormErrors<Values> = {
  [K in keyof Values]?: TFieldErrors;
};

type TCustomEvent = {
  target: {
    id?: ReactSelectAsyncProps['inputId'];
    name?: ReactSelectAsyncProps['name'];
    value?: unknown;
  };
  persist: () => void;
};

const sequentialId = createSequentialId('async-select-field-');

const hasErrors = (errors?: TFieldErrors) =>
  errors && Object.values(errors).some(Boolean);

const hasWarnings = (warnings?: TFieldWarnings) =>
  warnings && Object.values(warnings).some(Boolean);

export type TAsyncSelectFieldProps = {
  // AsyncSelectField
  /**
   * Used as HTML id property. An id is auto-generated when it is not specified.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  id?: ReactSelectAsyncProps['inputId'];
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

  // AsyncSelectInput
  /**
   * Aria label (for assistive tech)
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  'aria-label'?: ReactSelectAsyncProps['aria-label'];
  /**
   * HTML ID of an element that should be used as the label (for assistive tech)
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  'aria-labelledby'?: ReactSelectAsyncProps['aria-labelledby'];
  /**
   * Focus the control when it is mounted
   */
  isAutofocussed?: boolean;
  /**
   * Remove the currently focused option when the user presses backspace
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  backspaceRemovesValue?: ReactSelectAsyncProps['backspaceRemovesValue'];
  /**
   * Map of components to overwrite the default ones, see [what components you can override](https://react-select.com/components)
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  components?: ReactSelectAsyncProps['components'];
  /**
   * Control whether the selected values should be rendered in the control
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  controlShouldRenderValue?: ReactSelectAsyncProps['controlShouldRenderValue'];
  /**
   * Custom method to filter whether an option should be displayed in the menu
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  filterOption?: ReactSelectAsyncProps['filterOption'];
  /**
   *  The id to set on the SelectContainer component
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  containerId?: ReactSelectAsyncProps['id'];
  /**
   * Is the select value clearable
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  isClearable?: ReactSelectAsyncProps['isClearable'];
  /**
   * Use this property to reduce the paddings of the component for a ui compact variant
   */
  isCondensed?: boolean;
  /**
   * Is the select disabled
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  isDisabled?: ReactSelectAsyncProps['isDisabled'];
  /**
   * Is the select read-only
   */
  isReadOnly?: boolean;
  /**
   * Override the built-in logic to detect whether an option is disabled
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  isOptionDisabled?: ReactSelectAsyncProps['isOptionDisabled'];
  /**
   * Support multiple selected options
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  isMulti?: ReactSelectAsyncProps['isMulti'];
  /**
   * Whether to enable search functionality
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  isSearchable?: ReactSelectAsyncProps['isSearchable'];
  /**
   * Indicates the input field has a warning
   * @deprecated Please use the `warnings` prop instead so users know the reason why the field is in warning state.
   */
  hasWarning?: boolean;
  /**
   * Maximum height of the menu before scrolling
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  maxMenuHeight?: ReactSelectAsyncProps['maxMenuHeight'];
  /**
   * Dom element to portal the select menu to
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  menuPortalTarget?: ReactSelectAsyncProps['menuPortalTarget'];
  /**
   * z-index value for the menu portal
   * <br>
   * Use in conjunction with `menuPortalTarget`
   */
  menuPortalZIndex?: number;
  /**
   * whether the menu should block scroll while open
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  menuShouldBlockScroll?: ReactSelectAsyncProps['menuShouldBlockScroll'];
  /**
   * Name of the HTML Input (optional - without this, no input will be rendered)
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  name?: ReactSelectAsyncProps['name'];
  /**
   *  Can be used to render a custom value when there are no options (either because of no search results, or all options have been used, or there were none in the first place).
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  noOptionsMessage?: ReactSelectAsyncProps['noOptionsMessage'];
  /**
   * Handle blur events on the control
   */
  onBlur?: (event: TCustomEvent) => void;
  /**
   * Called with a fake event when value changes.
   * <br />
   * The event's `target.name` will be the name supplied in props. The event's `target.value` will hold the value. The value will be the selected option, or an array of options in case `isMulti` is `true`.
   */
  onChange?: (event: TCustomEvent, info: ActionMeta<unknown>) => void;
  /**
   * Handle focus events on the control
   */
  onFocus?: FocusEventHandler;
  /**
   * Handle change events on the input
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  onInputChange?: ReactSelectAsyncProps['onInputChange'];
  /**
   * Placeholder text for the select value
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  placeholder?: ReactSelectAsyncProps['placeholder'];
  /**
   * loading message shown while the options are being loaded
   */
  loadingMessage?: string | (() => string);
  /**
   * Sets the tabIndex attribute on the input
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  tabIndex?: ReactSelectAsyncProps['tabIndex'];
  /**
   * Select the currently focused option when the user presses tab
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  tabSelectsValue?: ReactSelectAsyncProps['tabSelectsValue'];
  /**
   * The value of the select; reflected by the selected option
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  value?: ReactSelectAsyncProps['value'];
  /**
   * Determines if option groups will be separated by a divider
   */
  showOptionGroupDivider?: boolean;

  // Async props
  /**
   * The default set of options to show before the user starts searching.
   * <br />
   * When set to `true`, the results for `loadOptions('')` will be autoloaded.
   */
  defaultOptions?: OptionsOrGroups<unknown, GroupBase<unknown>> | boolean;
  /**
   * Function that returns a promise, which is the set of options to be used once the promise resolves.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  loadOptions: ReactSelectAsyncProps['loadOptions'];
  /**
   * If cacheOptions is truthy, then the loaded data will be cached. The cache will remain until cacheOptions changes value.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  cacheOptions?: ReactSelectAsyncProps['cacheOptions'];
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
  hintIcon?: ReactElement<TIconProps>;
  /**
   * Badge to be displayed beside the label.
   * <br />
   * Might be used to display additional information about the content of the field (E.g verified email)
   */
  badge?: ReactNode;
  /**
   * Icon to display on the left of the placeholder text and selected value. Has no effect when isMulti is enabled.
   */
  iconLeft?: ReactNode;
};

type TAsyncSelectFieldState = Pick<TAsyncSelectFieldProps, 'id'>;

export default class AsyncSelectField extends Component<
  TAsyncSelectFieldProps,
  TAsyncSelectFieldState
> {
  static displayName = 'AsyncSelectField';

  static defaultProps: Pick<
    TAsyncSelectFieldProps,
    'horizontalConstraint' | 'controlShouldRenderValue'
  > = {
    horizontalConstraint: 'scale',
    controlShouldRenderValue: true,
  };

  state = {
    // We generate an id in case no id is provided by the parent to attach the
    // label to the input component.
    id: this.props.id,
  };

  static getDerivedStateFromProps = (
    props: TAsyncSelectFieldProps,
    state: TAsyncSelectFieldState
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
      AsyncSelectInput.isTouched(this.props.touched) &&
      hasErrors(this.props.errors);

    const hasWarning =
      this.props.hasWarning ||
      (AsyncSelectInput.isTouched(this.props.touched) &&
        hasWarnings(this.props.warnings));

    if (!this.props.isReadOnly) {
      warning(
        typeof this.props.onChange === 'function',
        'AsyncSelectField: `onChange` is required when field is not read only.'
      );
    }

    if (this.props.hintIcon) {
      warning(
        typeof this.props.hint === 'string' || isValidElement(this.props.hint),
        'AsyncSelectField: `hint` is required to be string or ReactNode if hintIcon is present'
      );
    }

    if (this.props.isMulti) {
      warning(
        Array.isArray(this.props.value),
        'AsyncSelectField: `value` is expected to be an array of string when isMulti is true'
      );

      warning(
        typeof this.props.touched === 'undefined' ||
          Array.isArray(this.props.touched),
        'AsyncSelectField: `touched` is expected to be an array of boolean when isMulti is true'
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
          <AsyncSelectInput
            horizontalConstraint="scale"
            hasError={hasError}
            aria-label={this.props['aria-label']}
            aria-labelledby={this.props['aria-labelledby']}
            aria-invalid={hasError}
            aria-errormessage={errorsContainerId}
            isAutofocussed={this.props.isAutofocussed}
            backspaceRemovesValue={this.props.backspaceRemovesValue}
            components={this.props.components}
            filterOption={this.props.filterOption}
            id={this.state.id}
            containerId={this.props.containerId}
            isClearable={this.props.isClearable}
            isCondensed={this.props.isCondensed}
            isDisabled={this.props.isDisabled}
            isReadOnly={this.props.isReadOnly}
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
            loadingMessage={this.props.loadingMessage}
            onBlur={this.props.onBlur}
            onChange={this.props.onChange}
            onFocus={this.props.onFocus}
            onInputChange={this.props.onInputChange}
            placeholder={this.props.placeholder}
            tabIndex={this.props.tabIndex}
            tabSelectsValue={this.props.tabSelectsValue}
            value={this.props.value}
            // Async react-select props
            defaultOptions={this.props.defaultOptions}
            loadOptions={this.props.loadOptions}
            cacheOptions={this.props.cacheOptions}
            showOptionGroupDivider={this.props.showOptionGroupDivider}
            iconLeft={this.props.iconLeft}
            {...filterDataAttributes(this.props)}
            controlShouldRenderValue={this.props.controlShouldRenderValue}
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
