import { ReactNode, useMemo } from 'react';
import { useIntl } from 'react-intl';
import type { ActionMeta, GroupBase, OptionProps } from 'react-select';
import type { AsyncProps } from 'react-select/async';
import AsyncSelectInput from '@commercetools-uikit/async-select-input';
import { warning } from '@commercetools-uikit/utils';
import {
  CustomSelectInputOption,
  SearchIconDropdownIndicator,
  warnIfMenuPortalPropsAreMissing,
  optionStyleCheckboxComponents,
  optionsStyleCheckboxSelectProps,
} from '@commercetools-uikit/select-utils';
import messages from './messages';
import { SearchSelectInputWrapper } from './search-select-input.styles';

type ReactSelectAsyncProps = AsyncProps<unknown, boolean, GroupBase<unknown>>;

type TCustomEvent = {
  target: {
    id?: ReactSelectAsyncProps['inputId'];
    name?: ReactSelectAsyncProps['name'];
    value?: unknown;
  };
  persist: () => void;
};

export type TSearchSelectInputProps = {
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
   * Indicate if the value entered in the input is invalid.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  'aria-invalid'?: ReactSelectAsyncProps['aria-invalid'];
  /**
   * HTML ID of an element containing an error message related to the input.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  'aria-errormessage'?: ReactSelectAsyncProps['aria-errormessage'];
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
   * Control whether the selected values should be rendered in the control
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  controlShouldRenderValue?: ReactSelectAsyncProps['controlShouldRenderValue'];
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
   * Whether the input and options are rendered with condensed paddings
   */
  isCondensed?: boolean;
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
   * Can be used to enforce the select input to be opened
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  menuIsOpen?: ReactSelectAsyncProps['menuIsOpen'];
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
  menuPortalZIndex: number;
  /**
   * whether the menu should block scroll while open
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  menuShouldBlockScroll?: ReactSelectAsyncProps['menuShouldBlockScroll'];
  /**
   * Whether the menu should close after a value is selected. Defaults to `true`.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  closeMenuOnSelect?: ReactSelectAsyncProps['closeMenuOnSelect'];
  /**
   * Determines if option groups will be separated by a divider
   */
  showOptionGroupDivider?: boolean;
  /**
   * The default set of options to show before the user starts searching. When set to `true`, the results for `loadOptions('')` will be autoloaded.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  defaultOptions?: ReactSelectAsyncProps['defaultOptions'];
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
   * Icon to display on the left of the placeholder text and selected value. Has no effect when `isMulti` is enabled.
   */
  iconLeft?: ReactNode;
  /** defines how options are rendered */
  optionStyle: 'list' | 'checkbox';
  /**
   * Indicates the appearance of the input.
   * Filter appearance is meant to be used when the async-select is used as a filter.
   */
  appearance?: 'default' | 'filter';
  /**
   * An additional value displayed on the select options menu. This value is only available in the checkbox option style when appearance is set to filter.
   */
  count?: number;
};

type TOptionInnerPropsData = {
  label?: string;
  key?: string;
  id?: string;
};

type TOptionInnerProps = {
  data?: TOptionInnerPropsData;
} & OptionProps;

const defaultProps: Pick<
  TSearchSelectInputProps,
  | 'value'
  | 'menuPortalZIndex'
  | 'maxMenuHeight'
  | 'controlShouldRenderValue'
  | 'appearance'
  | 'optionStyle'
> = {
  value: null,
  menuPortalZIndex: 1,
  maxMenuHeight: 220,
  controlShouldRenderValue: true,
  appearance: 'default',
  optionStyle: 'list',
};

const SearchSelectInput = (props: TSearchSelectInputProps) => {
  const intl = useIntl();

  if (!props.isReadOnly) {
    warning(
      typeof props.onChange === 'function',
      'SearchSelectInput: `onChange` is required when input is not read only.'
    );
  }

  warnIfMenuPortalPropsAreMissing({
    menuPortalZIndex: props.menuPortalZIndex,
    menuPortalTarget: props.menuPortalTarget,
    componentName: 'SearchSelectInput',
  });

  const noOptionsMessage =
    props.noOptionsMessage ||
    (() => intl.formatMessage(messages.noOptionsMessage));

  const loadingMessage =
    props.loadingMessage || intl.formatMessage(messages.loadingOptionsMessage);

  const placeholder =
    props.appearance === 'filter' && !props.placeholder
      ? intl.formatMessage(messages.searchSelectInputAsFilterPlaceholder)
      : props.placeholder || intl.formatMessage(messages.placeholderMessage);

  const optionType = props.optionType;

  const components = useMemo(
    () => ({
      Option: (optionInnerProps: TOptionInnerProps) => (
        <CustomSelectInputOption
          {...optionInnerProps}
          optionType={optionType}
          optionInnerProps={optionInnerProps}
        />
      ),
      ...(props.optionStyle === 'checkbox'
        ? optionStyleCheckboxComponents()
        : {}),
      ...props.components,
      DropdownIndicator: SearchIconDropdownIndicator,
    }),
    [props.optionStyle, props.components, optionType]
  );

  return (
    <SearchSelectInputWrapper
      isDisabled={props.isDisabled}
      isReadOnly={props.isReadOnly}
      isCondensed={props.appearance === 'filter' ? true : props.isCondensed}
    >
      <AsyncSelectInput
        {...props}
        components={components as ReactSelectAsyncProps['components']}
        placeholder={placeholder}
        iconLeft={props.iconLeft}
        loadingMessage={loadingMessage}
        noOptionsMessage={noOptionsMessage}
        isSearchable={true}
        // @ts-expect-error
        closeMenuOnSelect={props.closeMenuOnSelect}
        {...(props.optionStyle === 'checkbox'
          ? optionsStyleCheckboxSelectProps()
          : {})}
        controlShouldRenderValue={
          props.appearance === 'filter' ? false : props.controlShouldRenderValue
        }
      />
    </SearchSelectInputWrapper>
  );
};

SearchSelectInput.defaultProps = defaultProps;
SearchSelectInput.displayName = 'SearchSelectInput';

export default SearchSelectInput;
