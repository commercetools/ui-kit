import {
  isValidElement,
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
  type ReactElement,
} from 'react';
import type { ActionMeta, GroupBase } from 'react-select';
import type { AsyncProps } from 'react-select/async';
import {
  filterDataAttributes,
  createSequentialId,
  warning,
} from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import { useFieldId } from '@commercetools-uikit/hooks';
import Spacings from '@commercetools-uikit/spacings';
import FieldLabel from '@commercetools-uikit/field-label';
import SearchSelectInput from '@commercetools-uikit/search-select-input';
import FieldErrors from '@commercetools-uikit/field-errors';

type ReactSelectAsyncProps = AsyncProps<unknown, boolean, GroupBase<unknown>>;

type TCustomEvent = {
  target: {
    id?: ReactSelectAsyncProps['inputId'];
    name?: ReactSelectAsyncProps['name'];
    value?: unknown;
  };
  persist: () => void;
};

type TErrorRenderer = (key: string, error?: boolean) => ReactNode;
type TFieldErrors = Record<string, boolean>;
// Similar shape of `FormikErrors` but values are `TFieldErrors` objects.
type TCustomFormErrors<Values> = {
  [K in keyof Values]?: TFieldErrors;
};

const hasErrors = (errors?: TFieldErrors) =>
  errors && Object.values(errors).some(Boolean);
const sequentialId = createSequentialId('search-select-field-');
const sequentialErrorsId = createSequentialId('search-select-field-error-')();

export type TSearchSelectFieldProps = {
  /**
   *Horizontal size limit of the input fields.
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
   * The id of the search input. This forwarded as react-select's "inputId"
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  id?: ReactSelectAsyncProps['inputId'];
  /**
   * The id to set on the SelectContainer component. This is forwarded as react-select's "id"
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  containerId?: ReactSelectAsyncProps['id'];
  /**
   * Name of the HTML Input (optional - without this, no input will be rendered)
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  name?: ReactSelectAsyncProps['name'];
  /**
   * Placeholder text for the select value
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  placeholder?: ReactSelectAsyncProps['placeholder'];
  /**
   * Map of components to overwrite the default ones, see [what components you can override](https://react-select.com/components)
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  components?: ReactSelectAsyncProps['components'];
  /**
   * Sets the tabIndex attribute on the input
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  tabIndex?: ReactSelectAsyncProps['tabIndex'];
  /**
   * The value of the select; reflected by the selected option
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  value?: ReactSelectAsyncProps['value'];
  /**
   * Remove the currently focused option when the user presses backspace
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  backspaceRemovesValue?: ReactSelectAsyncProps['backspaceRemovesValue'];
  /**
   * Indicates the input field has an error
   */
  hasError?: boolean;
  /**
   * Indicates the input field has a warning
   */
  hasWarning?: boolean;
  /**
   * Is the select read-only
   */
  isReadOnly?: boolean;
  /**
   * Is the select disabled
   */
  isDisabled?: boolean;
  /**
   * Is the select value clearable
   */
  isClearable?: boolean;
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
   * Focus the control when it is mounted. Renamed autoFocus of react-select
   */
  isAutofocussed?: boolean;
  /**
   * Can be used to render a custom value when there are no options (either because of no search results, or all options have been used, or there were none in the first place). Gets called with `{ inputValue: String }`. `inputValue` will be an empty string when no search text is present.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  noOptionsMessage?: ReactSelectAsyncProps['noOptionsMessage'];
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
   */
  menuPortalZIndex?: number;
  /**
   * whether the menu should block scroll while open
   */
  menuShouldBlockScroll?: boolean;
  /**
   * Determines if option groups will be separated by a divider
   */
  showOptionGroupDivider?: boolean;
  /**
   * Handle blur events on the control
   */
  onBlur?: (event: TCustomEvent) => void;
  /**
   * Called with a fake event when value changes.
   * <br />
   * The event's `target.name` will be the `name` supplied in props. The event's `target.value` will hold the value. The value will be the selected option, or an array of options in case `isMulti` is `true`.
   */
  onChange?: (event: TCustomEvent, info: ActionMeta<unknown>) => void;
  /**
   * Handle focus events on the control
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  onFocus?: ReactSelectAsyncProps['onFocus'];
  /**
   * Handle change events on the input
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  onInputChange?: ReactSelectAsyncProps['onInputChange'];
  /**
   * Select the currently focused option when the user presses tab
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  tabSelectsValue?: ReactSelectAsyncProps['tabSelectsValue'];
  /**
   * Function that returns a promise, which is the set of options to be used once the promise resolves.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  loadOptions: ReactSelectAsyncProps['loadOptions'];
  /**
   * The text shown while the options are being loaded
   */
  loadingMessage?: string | (() => string);
  /**
   * If cacheOptions is truthy, then the loaded data will be cached. The cache will remain until cacheOptions changes value.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  cacheOptions?: ReactSelectAsyncProps['cacheOptions'];
  /**
   * Custom method to filter whether an option should be displayed in the menu
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  filterOption?: ReactSelectAsyncProps['filterOption'];
  /**
   * The style of the an option in the dropdown menu. It could be single lined option or an option with more and custom info
   */
  optionType?: 'single-property' | 'double-property' | 'multiple-properties';
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
  touched?: boolean[] | boolean;
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

const SearchSelectField = (props: TSearchSelectFieldProps) => {
  const hasError = Boolean(props.touched) && hasErrors(props.errors);
  const id = useFieldId(props.id, sequentialId);

  if (!props.isReadOnly) {
    warning(
      typeof props.onChange === 'function',
      'SearchSelectField: `onChange` is required when field is not read only.'
    );
  }

  if (props.hintIcon) {
    warning(
      typeof props.hint === 'string' || isValidElement(props.hint),
      'SearchSelectField: `hint` is required to be string or ReactNode if hintIcon is present'
    );
  }

  if (props.isMulti) {
    warning(
      Array.isArray(props.value),
      'SearchSelectField: `value` is expected to be an array of string when isMulti is true'
    );

    warning(
      typeof props.touched === 'undefined' || Array.isArray(props.touched),
      'SearchSelectField: `touched` is expected to be an array of boolean when isMulti is true'
    );
  }

  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <Spacings.Stack scale="xs">
        <FieldLabel
          title={props.title}
          hint={props.hint}
          description={props.description}
          onInfoButtonClick={props.onInfoButtonClick}
          hintIcon={props.hintIcon}
          badge={props.badge}
          hasRequiredIndicator={props.isRequired}
          htmlFor={id}
        />
        <SearchSelectInput
          {...filterDataAttributes(props)}
          horizontalConstraint="scale"
          hasError={hasError}
          aria-label={props['aria-label']}
          aria-labelledby={props['aria-labelledby']}
          aria-invalid={hasError}
          aria-errormessage={sequentialErrorsId}
          isAutofocussed={props.isAutofocussed}
          backspaceRemovesValue={props.backspaceRemovesValue}
          components={props.components}
          filterOption={props.filterOption}
          id={id}
          containerId={props.containerId}
          isClearable={props.isClearable}
          isDisabled={props.isDisabled}
          isReadOnly={props.isReadOnly}
          isOptionDisabled={props.isOptionDisabled}
          isMulti={props.isMulti}
          hasWarning={props.hasWarning}
          maxMenuHeight={props.maxMenuHeight}
          menuPortalTarget={props.menuPortalTarget}
          menuPortalZIndex={props.menuPortalZIndex}
          menuShouldBlockScroll={props.menuShouldBlockScroll}
          name={props.name}
          noOptionsMessage={props.noOptionsMessage}
          loadingMessage={props.loadingMessage}
          onBlur={props.onBlur}
          onChange={props.onChange}
          onFocus={props.onFocus}
          onInputChange={props.onInputChange}
          placeholder={props.placeholder}
          tabIndex={props.tabIndex}
          tabSelectsValue={props.tabSelectsValue}
          value={props.value}
          // Async react-select props
          loadOptions={props.loadOptions}
          cacheOptions={props.cacheOptions}
          showOptionGroupDivider={props.showOptionGroupDivider}
          optionType={props.optionType}
        />
        <FieldErrors
          id={sequentialErrorsId}
          errors={props.errors}
          isVisible={hasError}
          renderError={props.renderError}
        />
      </Spacings.Stack>
    </Constraints.Horizontal>
  );
};
SearchSelectField.displayName = 'SearchSelectField';
/**
 * Use this function to convert the Formik `errors` object type to
 * our custom field errors type.
 * This is primarly useful when using TypeScript.
 */
SearchSelectField.toFieldErrors = function toFieldErrors<FormValues>(
  errors: unknown
): TCustomFormErrors<FormValues> {
  return errors as TCustomFormErrors<FormValues>;
};

export default SearchSelectField;
