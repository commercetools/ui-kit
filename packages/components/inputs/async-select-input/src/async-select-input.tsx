import type { ReactNode, FocusEvent } from 'react';
import { useIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import { useTheme } from '@emotion/react';
import {
  components as defaultComponents,
  type ActionMeta,
  type GroupBase,
  type OptionsOrGroups,
} from 'react-select';
import AsyncSelect, { type AsyncProps } from 'react-select/async';
import {
  addStaticFields,
  filterDataAttributes,
} from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import {
  ClearIndicator,
  TagRemove,
  DropdownIndicator,
  customComponentsWithIcons,
  messages,
  createSelectStyles,
} from '@commercetools-uikit/select-utils';

const LoadingIndicator = () => <LoadingSpinner scale="s" />;
LoadingIndicator.displayName = 'LoadingIndicator';

const customizedComponents = {
  DropdownIndicator,
  ClearIndicator,
  LoadingIndicator,
  MultiValueRemove: TagRemove,
};

type TEvent = {
  target: {
    name?: string;
    value?: unknown;
  };
  persist: () => void;
};

type ReactSelectAsyncProps = AsyncProps<unknown, boolean, GroupBase<unknown>>;

type TAsyncSelectInputProps = {
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
   * Indicates the input field has an error
   */
  hasError?: boolean;
  /**
   * Indicates the input field has a warning
   */
  hasWarning?: boolean;
  /**
   * Indicates that the field is displaying read-only content
   */
  isReadOnly?: boolean;

  // react-select base props
  //
  // Currently unsupported props are commented out. In case you need one of
  // these props when using UI Kit, you can submit a PR and enable the
  // prop. Don't forget to add it to the story, docs and other select input
  // components as well!
  //
  // See https://react-select.com/props#select-props
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
  // renamed autoFocus of react-select
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
   * Custom method to filter whether an option should be displayed in the menu
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  filterOption?: ReactSelectAsyncProps['filterOption'];
  // This forwarded as react-select's "inputId"
  /**
   * The id of the search input
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  id?: ReactSelectAsyncProps['inputId'];
  /**
   * The value of the search input
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  inputValue?: ReactSelectAsyncProps['inputValue'];
  // This is forwarded as react-select's "id"
  /**
   * The id to set on the SelectContainer component
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
   * Is the select disabled
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  isDisabled?: ReactSelectAsyncProps['isDisabled'];
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
   * Name of the HTML Input (optional - without this, no input will be rendered)
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  name?: ReactSelectAsyncProps['name'];
  /**
   * Can be used to render a custom value when there are no options (either because of no search results, or all options have been used, or there were none in the first place). Gets called with `{ inputValue: String }`. `inputValue` will be an empty string when no search text is present.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  noOptionsMessage?: ReactSelectAsyncProps['noOptionsMessage'];
  /**
   * Handle blur events on the control
   */
  onBlur?: (event: TEvent) => void;
  /**
   * Called with a fake event when value changes. The event's `target.name` will be the `name` supplied in props. The event's `target.value` will hold the value. The value will be the selected option, or an array of options in case `isMulti` is `true`.
   */
  onChange: (event: TEvent, info: ActionMeta<unknown>) => void;
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

  // Async props
  /**
   * The default set of options to show before the user starts searching. When set to true, the results for loadOptions('') will be autoloaded.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  defaultOptions?: OptionsOrGroups<unknown, GroupBase<unknown>> | boolean;
  /**
   * Function that returns a promise, which is the set of options to be used once the promise resolves.
   */
  loadOptions: ReactSelectAsyncProps['loadOptions'];
  /**
   * If cacheOptions is truthy, then the loaded data will be cached. The cache will remain until cacheOptions changes value.
   */
  cacheOptions?: ReactSelectAsyncProps['cacheOptions'];
  /**
   * Determines if option groups will be separated by a divider
   */
  showOptionGroupDivider?: boolean;
  /**
   * Icon to display on the left of the placeholder text and selected value. Has no effect when `isMulti` is enabled.
   */
  iconLeft?: ReactNode;
};

const defaultProps: Pick<
  TAsyncSelectInputProps,
  'value' | 'isSearchable' | 'menuPortalZIndex'
> = {
  // Using "null" will ensure that the currently selected value disappears in
  // case "undefined" gets passed as the next value
  value: null,
  isSearchable: true,
  menuPortalZIndex: 1,
};

const AsyncSelectInput = (props: TAsyncSelectInputProps) => {
  const theme = useTheme();
  const intl = useIntl();

  const placeholder =
    props.placeholder || intl.formatMessage(messages.placeholder);
  const loadingMessage = () => {
    if (typeof props.loadingMessage === 'function') {
      return props.loadingMessage();
    }
    return props.loadingMessage || intl.formatMessage(messages.loadingOptions);
  };
  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <div {...filterDataAttributes(props)}>
        <AsyncSelect
          aria-label={props['aria-label']}
          aria-labelledby={props['aria-labelledby']}
          autoFocus={props.isAutofocussed}
          backspaceRemovesValue={
            props.isReadOnly ? false : props.backspaceRemovesValue
          }
          components={
            {
              ...customizedComponents,
              ...(props.iconLeft && !props.isMulti
                ? customComponentsWithIcons
                : {}),
              // react-select doesn't support readOnly mode; this is a workaround:
              ...(props.isReadOnly
                ? {
                    Input: (ownProps) => (
                      <defaultComponents.Input {...ownProps} readOnly />
                    ),
                  }
                : {}),
              ...props.components,
            } as ReactSelectAsyncProps['components']
          }
          menuIsOpen={props.isReadOnly ? false : undefined}
          styles={
            createSelectStyles(
              {
                hasWarning: props.hasWarning,
                hasError: props.hasError,
                showOptionGroupDivider: props.showOptionGroupDivider,
                menuPortalZIndex: props.menuPortalZIndex,
                isDisabled: props.isDisabled,
                isReadOnly: props.isReadOnly,
                iconLeft: props.iconLeft,
                isMulti: props.isMulti,
                hasValue: !isEmpty(props.value),
              },
              theme
            ) as ReactSelectAsyncProps['styles']
          }
          filterOption={props.filterOption}
          // react-select uses "id" (for the container) and "inputId" (for the input),
          // but we use "id" (for the input) and "containerId" (for the container)
          // instead.
          // This makes it easier to less confusing to use with <label />s.
          id={props.containerId}
          inputId={props.id}
          inputValue={props.inputValue}
          isClearable={props.isReadOnly ? false : props.isClearable}
          isDisabled={props.isDisabled}
          isOptionDisabled={props.isOptionDisabled}
          isMulti={props.isMulti}
          isSearchable={props.isSearchable}
          maxMenuHeight={props.maxMenuHeight}
          menuPortalTarget={props.menuPortalTarget}
          menuShouldBlockScroll={props.menuShouldBlockScroll}
          closeMenuOnSelect={props.closeMenuOnSelect}
          name={props.name}
          loadingMessage={loadingMessage}
          noOptionsMessage={
            props.noOptionsMessage ||
            (({ inputValue }) =>
              inputValue === ''
                ? intl.formatMessage(messages.noOptionsMessageWithoutInputValue)
                : intl.formatMessage(messages.noOptionsMessageWithInputValue, {
                    inputValue,
                  }))
          }
          onBlur={
            props.onBlur
              ? () => {
                  const event = {
                    target: {
                      name: (() => {
                        if (!props.name) return undefined;
                        if (!props.isMulti) return props.name;
                        // We append the ".0" to make Formik set the touched
                        // state as an array instead of a boolean only.
                        // Otherwise the shapes would clash on submission, as
                        // Formik will create an array on submission anyways.
                        return `${props.name}.0`;
                      })(),
                    },
                    persist: () => {},
                  };
                  props.onBlur &&
                    props.onBlur(
                      event as FocusEvent<HTMLInputElement, Element>
                    );
                }
              : undefined
          }
          onChange={(value, info) => {
            let newValue = value;
            if (props.isMulti && !newValue) {
              newValue = [];
            }

            props.onChange(
              {
                target: { name: props.name, value: newValue },
                persist: () => {},
              },
              info
            );
          }}
          onFocus={props.onFocus}
          onInputChange={props.onInputChange}
          placeholder={placeholder}
          tabIndex={props.tabIndex}
          tabSelectsValue={props.tabSelectsValue}
          value={props.value}
          // Async react-select props
          defaultOptions={props.defaultOptions}
          loadOptions={props.loadOptions}
          cacheOptions={props.cacheOptions}
          // @ts-ignore
          iconLeft={props.iconLeft}
        />
      </div>
    </Constraints.Horizontal>
  );
};

// Formik will set the field to an array on submission, so we always have to
// deal with an array. The touched state ends up being an empty array in case
// values were removed only. So we have to treat any array we receive as
// a signal of the field having been touched.
AsyncSelectInput.isTouched = (touched: unknown) => Boolean(touched);

AsyncSelectInput.displayName = 'AsyncSelectInput';

AsyncSelectInput.defaultProps = defaultProps;

addStaticFields(AsyncSelectInput, {
  ...defaultComponents,
  ...customizedComponents,
  isTouched: AsyncSelectInput.isTouched,
});

export default AsyncSelectInput;
