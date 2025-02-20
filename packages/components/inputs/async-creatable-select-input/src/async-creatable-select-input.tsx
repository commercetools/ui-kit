import type { ComponentType, ReactNode, JSX } from 'react';
import { useIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import {
  components as defaultComponents,
  type ActionMeta,
  type CommonPropsAndClassName,
  type GroupBase,
  type MenuPlacement,
  type MenuPosition,
} from 'react-select';
import AsyncCreatableSelect, {
  type AsyncCreatableProps,
} from 'react-select/async-creatable';
import Constraints from '@commercetools-uikit/constraints';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import {
  ClearIndicator,
  DropdownIndicator,
  TagRemove,
  customComponentsWithIcons,
  messages,
  createSelectStyles,
  warnIfMenuPortalPropsAreMissing,
} from '@commercetools-uikit/select-utils';
import { filterDataAttributes, warning } from '@commercetools-uikit/utils';

const LoadingIndicator = () => <LoadingSpinner scale="s" />;
LoadingIndicator.displayName = 'LoadingIndicator';

const customizedComponents = {
  DropdownIndicator,
  ClearIndicator,
  LoadingIndicator,
  MultiValueRemove: TagRemove,
};

type TCustomEvent = {
  target: {
    id?: string;
    name?: string;
    value?: unknown;
  };
  persist: () => void;
};

type ReactSelectAsyncCreatableProps = AsyncCreatableProps<
  unknown,
  boolean,
  GroupBase<unknown>
>;

export type TAsyncCreatableSelectInputProps = {
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
   *  Is the select read-only
   */
  isReadOnly?: boolean;
  /**
   * Icon to display on the left of the placeholder text and selected value. Has no effect when isMulti is enabled.
   */
  iconLeft?: ReactNode;

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
  'aria-label'?: ReactSelectAsyncCreatableProps['aria-label'];
  /**
   * HTML ID of an element that should be used as the label (for assistive tech)
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  'aria-labelledby'?: ReactSelectAsyncCreatableProps['aria-labelledby'];
  /**
   * Indicate if the value entered in the input is invalid.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  'aria-invalid'?: ReactSelectAsyncCreatableProps['aria-invalid'];
  /**
   * HTML ID of an element containing an error message related to the input.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  'aria-errormessage'?: ReactSelectAsyncCreatableProps['aria-errormessage'];
  /**
   * Focus the control when it is mounted
   */
  isAutofocussed?: boolean; // original: autoFocus
  /**
   * Remove the currently focused option when the user presses backspace
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  backspaceRemovesValue?: ReactSelectAsyncCreatableProps['backspaceRemovesValue'];
  /**
   * Map of components to overwrite the default ones, see [what components you can override](https://react-select.com/components)
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  components?: ReactSelectAsyncCreatableProps['components'];
  /**
   * Custom method to filter whether an option should be displayed in the menu
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  filterOption?: ReactSelectAsyncCreatableProps['filterOption'];
  // This forwarded as react-select's "inputId"
  /**
   * The id of the search input
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  id?: ReactSelectAsyncCreatableProps['inputId'];
  // This is forwarded as react-select's "id"
  /**
   * The value of the search input
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  inputValue?: ReactSelectAsyncCreatableProps['inputValue'];
  /**
   * The id to set on the SelectContainer component
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  containerId?: ReactSelectAsyncCreatableProps['id'];
  /**
   * Is the select value clearable
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  isClearable?: ReactSelectAsyncCreatableProps['isClearable'];
  /**
   * Use this property to reduce the paddings of the component for a ui compact variant
   */
  isCondensed?: boolean;
  /**
   * Is the select disabled
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  isDisabled?: ReactSelectAsyncCreatableProps['isDisabled'];
  /**
   * Override the built-in logic to detect whether an option is disabled
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  isOptionDisabled?: ReactSelectAsyncCreatableProps['isOptionDisabled'];
  /**
   * Support multiple selected options
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  isMulti?: ReactSelectAsyncCreatableProps['isMulti'];
  /**
   * Whether to enable search functionality
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  isSearchable?: ReactSelectAsyncCreatableProps['isSearchable'];
  /**
   * Maximum height of the menu before scrolling
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  maxMenuHeight?: ReactSelectAsyncCreatableProps['maxMenuHeight'];
  /**
   * Dom element to portal the select menu to
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  menuPortalTarget?: ReactSelectAsyncCreatableProps['menuPortalTarget'];
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
  menuShouldBlockScroll?: ReactSelectAsyncCreatableProps['menuShouldBlockScroll'];
  /**
   * Whether the menu should close after a value is selected. Defaults to `true`.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  closeMenuOnSelect?: ReactSelectAsyncCreatableProps['closeMenuOnSelect'];
  /**
   * Name of the HTML Input (optional - without this, no input will be rendered)
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  name?: ReactSelectAsyncCreatableProps['name'];
  /**
   * Can be used to render a custom value when there are no options (either because of no search results, or all options have been used, or there were none in the first place). Gets called with `{ inputValue: String }`. `inputValue` will be an empty string when no search text is present.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  noOptionsMessage?: ReactSelectAsyncCreatableProps['noOptionsMessage'];
  /**
   * Handle blur events on the control
   */
  onBlur?: (event: TCustomEvent) => void;
  /**
   * Called with a fake event when value changes. The event's `target.name` will be the `name` supplied in props. The event's `target.value` will hold the value. The value will be the selected option, or an array of options in case `isMulti` is `true`.
   */
  onChange?: (event: TCustomEvent, info: ActionMeta<unknown>) => void;
  /**
   * Handle focus events on the control
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  onFocus?: ReactSelectAsyncCreatableProps['onFocus'];
  /**
   * Handle change events on the input
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  onInputChange?: ReactSelectAsyncCreatableProps['onInputChange'];
  /**
   * Placeholder text for the select value
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  placeholder?: ReactSelectAsyncCreatableProps['placeholder'];
  /**
   * Sets the tabIndex attribute on the input
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  tabIndex?: ReactSelectAsyncCreatableProps['tabIndex'];
  /**
   * Select the currently focused option when the user presses tab
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  tabSelectsValue?: ReactSelectAsyncCreatableProps['tabSelectsValue'];
  /**
   * The value of the select; reflected by the selected option
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  value?: ReactSelectAsyncCreatableProps['value'];
  // Async props
  /**
   * The default set of options to show before the user starts searching. When set to true, the results for loadOptions('') will be autoloaded.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  defaultOptions?: ReactSelectAsyncCreatableProps['defaultOptions'];
  /**
   * Function that returns a promise, which is the set of options to be used once the promise resolves.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  loadOptions: ReactSelectAsyncCreatableProps['loadOptions'];
  /**
   * If cacheOptions is truthy, then the loaded data will be cached. The cache will remain until cacheOptions changes value.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  cacheOptions?: ReactSelectAsyncCreatableProps['cacheOptions'];

  // Creatable props
  /**
   * Allow options to be created while the isLoading prop is true. Useful to prevent the "create new ..." option being displayed while async results are still being loaded.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  allowCreateWhileLoading?: ReactSelectAsyncCreatableProps['allowCreateWhileLoading'];
  /**
   * Gets the label for the "create new ..." option in the menu. Is given the current input value.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  formatCreateLabel?: ReactSelectAsyncCreatableProps['formatCreateLabel'];
  /**
   * Determines whether the "create new ..." option should be displayed based on the current input value, select value and options array.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  isValidNewOption?: ReactSelectAsyncCreatableProps['isValidNewOption'];
  /**
   * Returns the data for the new option when it is created. Used to display the value, and is passed to onChange.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  getNewOptionData?: ReactSelectAsyncCreatableProps['getNewOptionData'];
  /**
   * If provided, this will be called with the input value when a new option is created, and onChange will not be called. Use this when you need more control over what happens when new options are created.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  onCreateOption?: ReactSelectAsyncCreatableProps['onCreateOption'];
  /**
   * Sets the position of the createOption element in your options list.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  createOptionPosition?: ReactSelectAsyncCreatableProps['createOptionPosition'];
  /**
   * Determines if option groups will be separated by a divider
   */
  showOptionGroupDivider?: boolean;
};

const AsyncCreatableSelectInput = ({
  // Using "null" will ensure that the currently selected value disappears in
  // case "undefined" gets passed as the next value
  value = null,
  isSearchable = true,
  menuPortalZIndex = 1,
  ...props
}: TAsyncCreatableSelectInputProps) => {
  const intl = useIntl();

  const placeholder =
    props.placeholder || intl.formatMessage(messages.placeholder);

  if (!props.isReadOnly) {
    warning(
      typeof props.onChange === 'function',
      'AsyncCreatableSelectInput: `onChange` is required when input is not read only.'
    );
  }

  if (props.isMulti) {
    warning(
      Array.isArray(value),
      'AsyncCreatableSelectInput: `value` is expected to be an array when isMulti is true'
    );
  }

  warnIfMenuPortalPropsAreMissing({
    menuPortalZIndex: menuPortalZIndex,
    menuPortalTarget: props.menuPortalTarget,
    componentName: 'AsyncCreatableSelectInput',
  });

  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <div
        {...filterDataAttributes({
          value,
          isSearchable,
          menuPortalZIndex,
          ...props,
        })}
      >
        <AsyncCreatableSelect
          aria-label={props['aria-label']}
          aria-labelledby={props['aria-labelledby']}
          aria-invalid={props['aria-invalid']}
          aria-errormessage={props['aria-errormessage']}
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
            } as ReactSelectAsyncCreatableProps['components']
          }
          menuIsOpen={props.isReadOnly ? false : undefined}
          styles={
            createSelectStyles({
              hasWarning: props.hasWarning,
              hasError: props.hasError,
              showOptionGroupDivider: props.showOptionGroupDivider,
              menuPortalZIndex: menuPortalZIndex,
              isCondensed: props.isCondensed,
              isDisabled: props.isDisabled,
              isReadOnly: props.isReadOnly,
              iconLeft: props.iconLeft,
              isMulti: props.isMulti,
              hasValue: !isEmpty(value),
              horizontalConstraint: props.horizontalConstraint,
            }) as ReactSelectAsyncCreatableProps['styles']
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
          isSearchable={isSearchable}
          maxMenuHeight={props.maxMenuHeight}
          menuPortalTarget={props.menuPortalTarget}
          menuShouldBlockScroll={props.menuShouldBlockScroll}
          closeMenuOnScroll={props.closeMenuOnSelect}
          name={props.name}
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
                      id: props.id,
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
                  props.onBlur && props.onBlur(event);
                }
              : undefined
          }
          onChange={(value, info) => {
            // wrapping breaking changes made in react-select v3
            let newValue = value;

            if (props.isMulti && !newValue) {
              newValue = [];
            }
            props.onChange?.(
              {
                target: { id: props.id, name: props.name, value: newValue },
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
          value={value}
          // Async react-select props
          defaultOptions={props.defaultOptions}
          loadOptions={props.loadOptions}
          cacheOptions={props.cacheOptions}
          // Creatable props
          allowCreateWhileLoading={props.allowCreateWhileLoading}
          formatCreateLabel={
            props.formatCreateLabel ||
            ((inputValue) =>
              intl.formatMessage(messages.createLabel, {
                inputValue,
              }))
          }
          isValidNewOption={props.isValidNewOption}
          getNewOptionData={props.getNewOptionData}
          onCreateOption={props.onCreateOption}
          createOptionPosition={props.createOptionPosition}
          // @ts-ignore
          iconLeft={props.iconLeft}
          isCondensed={props.isCondensed}
        />
      </div>
    </Constraints.Horizontal>
  );
};
AsyncCreatableSelectInput.displayName = 'AsyncCreatableSelectInput';

/**
 * Expose static helper methods.
 */

// Formik will set the field to an array on submission, so we always have to
// deal with an array. The touched state ends up being an empty array in case
// values were removed only. So we have to treat any array we receive as
// a signal of the field having been touched.
AsyncCreatableSelectInput.isTouched = (touched: unknown) => Boolean(touched);

/**
 * Expose react-select components for customization purposes.
 */

// custom
AsyncCreatableSelectInput.ClearIndicator = customizedComponents.ClearIndicator;
AsyncCreatableSelectInput.Control = defaultComponents.Control;
//https://github.com/commercetools/ui-kit/pull/3054/files#r1943026570
AsyncCreatableSelectInput.CrossIcon =
  defaultComponents.CrossIcon as ComponentType<
    JSX.IntrinsicElements['svg'] & {
      size?: number;
    }
  >;
//https://github.com/commercetools/ui-kit/pull/3054/files#r1943026570
AsyncCreatableSelectInput.DownChevron =
  defaultComponents.DownChevron as ComponentType<
    JSX.IntrinsicElements['svg'] & {
      size?: number;
    }
  >;
// custom
AsyncCreatableSelectInput.DropdownIndicator =
  customizedComponents.DropdownIndicator;
AsyncCreatableSelectInput.Group = defaultComponents.Group;
AsyncCreatableSelectInput.GroupHeading = defaultComponents.GroupHeading;
AsyncCreatableSelectInput.IndicatorSeparator =
  defaultComponents.IndicatorSeparator;
AsyncCreatableSelectInput.IndicatorsContainer =
  defaultComponents.IndicatorsContainer;
AsyncCreatableSelectInput.Input = defaultComponents.Input;
// custom
AsyncCreatableSelectInput.LoadingIndicator =
  customizedComponents.LoadingIndicator;
AsyncCreatableSelectInput.LoadingMessage = defaultComponents.LoadingMessage;
AsyncCreatableSelectInput.Menu = defaultComponents.Menu;
AsyncCreatableSelectInput.MenuList = defaultComponents.MenuList;
//https://github.com/commercetools/ui-kit/pull/3054/files#r1943026570
AsyncCreatableSelectInput.MenuPortal =
  defaultComponents.MenuPortal as ComponentType<
    CommonPropsAndClassName<unknown, false, GroupBase<unknown>> & {
      appendTo: HTMLElement | undefined;
      children: ReactNode;
      controlElement: HTMLDivElement | null;
      innerProps: JSX.IntrinsicElements['div'];
      menuPlacement: MenuPlacement;
      menuPosition: MenuPosition;
    }
  >;
AsyncCreatableSelectInput.MultiValue = defaultComponents.MultiValue;
AsyncCreatableSelectInput.MultiValueContainer =
  defaultComponents.MultiValueContainer;
AsyncCreatableSelectInput.MultiValueLabel = defaultComponents.MultiValueLabel;
// custom
AsyncCreatableSelectInput.MultiValueRemove =
  customizedComponents.MultiValueRemove;
AsyncCreatableSelectInput.NoOptionsMessage = defaultComponents.NoOptionsMessage;
AsyncCreatableSelectInput.Option = defaultComponents.Option;
AsyncCreatableSelectInput.Placeholder = defaultComponents.Placeholder;
AsyncCreatableSelectInput.SelectContainer = defaultComponents.SelectContainer;
AsyncCreatableSelectInput.SingleValue = defaultComponents.SingleValue;
AsyncCreatableSelectInput.ValueContainer = defaultComponents.ValueContainer;

export default AsyncCreatableSelectInput;
