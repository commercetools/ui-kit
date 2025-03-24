import type { ComponentType, ReactNode } from 'react';
import { useIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import has from 'lodash/has';
import Select, {
  components as defaultComponents,
  type Props as ReactSelectProps,
  type GroupBase,
  type CommonPropsAndClassName,
  type MenuPlacement,
  type MenuPosition,
} from 'react-select';
import Constraints from '@commercetools-uikit/constraints';
import {
  ClearIndicator,
  TagRemove,
  DropdownIndicator,
  customComponentsWithIcons,
  createSelectStyles,
  messages,
  warnIfMenuPortalPropsAreMissing,
  optionStyleCheckboxComponents,
  optionsStyleCheckboxSelectProps,
} from '@commercetools-uikit/select-utils';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import { SearchIcon } from '@commercetools-uikit/icons';

const customizedComponents = {
  DropdownIndicator,
  ClearIndicator,
  MultiValueRemove: TagRemove,
};

export type TOption = {
  value: string;
  label?: ReactNode;
  isDisabled?: boolean;
};

export type TOptionObject = {
  options: TOption[];
};

export type TOptions = TOption[] | TOptionObject[];

export type TCustomEvent = {
  target: {
    id?: ReactSelectProps<TOption>['inputId'];
    name?: ReactSelectProps<TOption>['name'];
    value?: string | string[] | null;
  };
  persist: () => void;
};

export type TSelectInputProps = {
  /**
   * Indicates the appearance of the input.
   * `quiet` appearance is meant to be used with the `horizontalConstraint="auto"`.
   * `filter` appearance provides a different look and feel for the select input when it is used as part of a filter component.
   */
  appearance?: 'default' | 'quiet' | 'filter';
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
   * Indicates that input has errors
   */
  hasError?: boolean;
  /**
   * Is the select read-only
   */
  isReadOnly?: boolean;

  /**
   * Control to indicate on the input if there are selected values that are potentially invalid
   */
  hasWarning?: boolean;
  /**
   * 	Icon to display on the left of the placeholder text and selected value. Has no effect when isMulti is enabled.
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
  'aria-label'?: ReactSelectProps<TOption>['aria-label'];
  /**
   * HTML ID of an element that should be used as the label (for assistive tech)
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  'aria-labelledby'?: ReactSelectProps<TOption>['aria-labelledby'];
  /**
   * Indicate if the value entered in the input is invalid.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  'aria-invalid'?: ReactSelectProps<TOption>['aria-invalid'];
  /**
   * HTML ID of an element containing an error message related to the input.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  'aria-errormessage'?: ReactSelectProps<TOption>['aria-errormessage'];
  /**
   * Focus the control when it is mounted
   */
  isAutofocussed?: boolean;
  /**
   * Remove the currently focused option when the user presses backspace
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  backspaceRemovesValue?: ReactSelectProps<TOption>['backspaceRemovesValue'];
  // blurInputOnSelect: PropTypes.bool,
  // captureMenuScroll: PropTypes.bool,
  // className: PropTypes.string,
  // classNamePrefix: PropTypes.string,
  // closeMenuOnSelect: PropTypes.bool,
  // closeMenuOnScroll: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  /**
   * Map of components to overwrite the default ones, see what components you can override
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  components?: ReactSelectProps<TOption>['components'];
  /**
   * Whether the input and options are rendered with condensed paddings
   */
  isCondensed?: boolean;
  /**
   * Control whether the selected values should be rendered in the control
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  controlShouldRenderValue?: ReactSelectProps<TOption>['controlShouldRenderValue'];
  // delimiter: PropTypes.string,
  // escapeClearsValue: PropTypes.bool,
  /**
   * Custom method to filter whether an option should be displayed in the menu
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  filterOption?: ReactSelectProps<TOption>['filterOption'];
  // formatGroupLabel: PropTypes.func,
  // formatOptionLabel: PropTypes.func,
  // getOptionLabel: PropTypes.func,
  // getOptionValue: PropTypes.func,
  /**
   * Custom method to determine whether selected options should be displayed in the menu
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  hideSelectedOptions?: ReactSelectProps<TOption>['hideSelectedOptions'];
  /**
   * Used as HTML id property. An id is generated automatically when not provided.
   * This forwarded as react-select's "inputId"
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  id?: ReactSelectProps<TOption>['inputId'];
  /**
   * The value of the search input
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  inputValue?: ReactSelectProps<TOption>['inputValue'];
  /**
   * The id to set on the SelectContainer component
   * This is forwarded as react-select's "id"
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  containerId?: ReactSelectProps<TOption>['id'];
  // instanceId: PropTypes.string,
  /**
   * Is the select value clearable
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  isClearable?: ReactSelectProps<TOption>['isClearable'];
  /**
   * Is the select disabled
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  isDisabled?: ReactSelectProps<TOption>['isDisabled'];
  // isLoading: PropTypes.bool,
  /**
   * Override the built-in logic to detect whether an option is disabled
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  isOptionDisabled?: ReactSelectProps<TOption>['isOptionDisabled'];
  // isOptionSelected: PropTypes.func,
  /**
   * Support multiple selected options
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  isMulti?: ReactSelectProps<TOption>['isMulti'];
  // isRtl: PropTypes.bool,
  /**
   * Whether to enable search functionality
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  isSearchable?: ReactSelectProps<TOption>['isSearchable'];
  /**
   * Can be used to enforce the select input to be opened
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  menuIsOpen?: ReactSelectProps<TOption>['menuIsOpen'];
  // loadingMessage: PropTypes.func,
  // minMenuHeight: PropTypes.number,
  /**
   * Maximum height of the menu before scrolling
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  maxMenuHeight?: ReactSelectProps<TOption>['maxMenuHeight'];
  // menuPlacement: PropTypes.oneOf(['auto', 'bottom', 'top']),
  // menuPosition: PropTypes.oneOf(['absolute', 'fixed']),
  /**
   * Dom element to portal the select menu to
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  menuPortalTarget?: ReactSelectProps<TOption>['menuPortalTarget'];
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
  menuShouldBlockScroll?: ReactSelectProps<TOption>['menuShouldBlockScroll'];
  /**
   * Whether the menu should close after a value is selected. Defaults to `true`.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  closeMenuOnSelect?: ReactSelectProps<TOption>['closeMenuOnSelect'];
  /**
   * Name of the HTML Input (optional - without this, no input will be rendered)
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  name?: ReactSelectProps<TOption>['name'];
  /**
   * Can be used to render a custom value when there are no options (either because of no search results, or all options have been used, or there were none in the first place). Gets called with { inputValue: String }.
   * <br />
   * `inputValue` will be an empty string when no search text is present.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  noOptionsMessage?: ReactSelectProps<TOption>['noOptionsMessage'];
  /**
   * Handle blur events on the control
   */
  onBlur?: (event: TCustomEvent) => void;
  /**
   * Called with a fake event when value changes. The event's target.name will be the name supplied in props. The event's target.value will hold the value.
   * <br/>
   * The value will be the selected option, or an array of options in case isMulti is true.
   */
  onChange?: (event: TCustomEvent) => void;
  /**
   * Handle focus events on the control
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  onFocus?: ReactSelectProps<TOption>['onFocus'];
  /**
   * Handle change events on the input
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  onInputChange?: ReactSelectProps<TOption>['onInputChange'];
  // onKeyDown: PropTypes.func,
  // onMenuOpen: PropTypes.func,
  // onMenuClose: PropTypes.func,
  // onMenuScrollToTop: PropTypes.func,
  // onMenuScrollToBottom: PropTypes.func,
  // openMenuOnFocus: PropTypes.bool,
  // openMenuOnClick: PropTypes.bool,
  /**
   * Array of options that populate the select menu
   */
  options?: TOptions;
  /** defines how options are rendered */
  optionStyle?: 'list' | 'checkbox';
  showOptionGroupDivider?: boolean;
  // pageSize: PropTypes.number,
  /**
   * Placeholder text for the select value
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  placeholder?: ReactSelectProps<TOption>['placeholder'];
  // screenReaderStatus: PropTypes.func,
  // styles: PropTypes.objectOf(PropTypes.func),
  // theme: PropTypes.object,
  /**
   * Sets the tabIndex attribute on the input
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  tabIndex?: ReactSelectProps<TOption>['tabIndex'];
  /**
   * Select the currently focused option when the user presses tab
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  tabSelectsValue?: ReactSelectProps<TOption>['tabSelectsValue'];
  /**
   * The value of the select; reflected by the selected option
   */
  value?: string | string[] | null;
  /**
   * The min width (a range of values from the horizontalConrtaint set of values) for which the select-input menu
   * is allowed to shrink. If unset, the menu will shrink to a default value.
   */
  minMenuWidth?:
    | 2
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
   * The max width (a range of values from the horizontalConrtaint set of values) for which the select-input menu
   * is allowed to grow. If unset, the menu will grow horrizontally to fill its parent.
   */
  maxMenuWidth?:
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
   * An additional value displayed on the select options menu. This value is only available in the checkbox option style when appearance is set to filter.
   */
  count?: number;
};

const isOptionObject = (
  option: TOption | TOptionObject
): option is TOptionObject => (option as TOptionObject).options !== undefined;

const SelectInput = ({
  appearance = 'default',
  maxMenuHeight = 220,
  menuPortalZIndex = 1,
  options = [],
  optionStyle = 'list',
  ...props
}: TSelectInputProps) => {
  const intl = useIntl();

  warnIfMenuPortalPropsAreMissing({
    menuPortalZIndex: menuPortalZIndex,
    menuPortalTarget: props.menuPortalTarget,
    componentName: 'SelectInput',
  });

  const placeholder =
    appearance === 'filter' && !props.placeholder
      ? intl.formatMessage(messages.selectInputAsFilterPlaceholder)
      : props.placeholder || intl.formatMessage(messages.placeholder);
  // Options can be grouped as
  //   const colourOptions = [{ value: 'green', label: 'Green' }];
  //   const flavourOptions = [{ value: 'vanilla', label: 'Vanilla' }];
  //   const groupedOptions = [
  //     { label: 'Colours', options: colourOptions },
  //     { label: 'Flavours', options: flavourOptions },
  //   ];
  // So we "ungroup" the options by merging them all into one list first.
  const optionsWithoutGroups = options.flatMap((option) => {
    if (isOptionObject(option)) {
      return option.options;
    }
    return option;
  });

  const selectedOptions = props.isMulti
    ? ((props.value || []) as string[])
        // Pass the options in the order selected by the user, so that the
        // sorting is not lost
        .map((value) =>
          optionsWithoutGroups.find((option) => option.value === value)
        )
        .filter((option): option is TOption => Boolean(option))
    : optionsWithoutGroups.find(
        (option) => has(option, 'value') && option.value === props.value
      ) || null;

  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <div
        {...filterDataAttributes({
          appearance,
          maxMenuHeight,
          menuPortalZIndex,
          optionStyle,
          ...props,
        })}
      >
        <Select
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
              ...(appearance === 'filter' && {
                DropdownIndicator: () => <SearchIcon color="neutral60" />,
                ClearIndicator: null,
              }),
              ...(optionStyle === 'checkbox'
                ? optionStyleCheckboxComponents(appearance)
                : {}),
              ...props.components,
            } as ReactSelectProps<TOption>['components']
          }
          menuIsOpen={
            props.isReadOnly
              ? false
              : appearance === 'filter'
              ? true
              : props.menuIsOpen
          }
          styles={
            createSelectStyles({
              hasWarning: props.hasWarning,
              hasError: props.hasError,
              showOptionGroupDivider: props.showOptionGroupDivider,
              menuPortalZIndex: menuPortalZIndex,
              appearance: appearance,
              isDisabled: props.isDisabled,
              isReadOnly: props.isReadOnly,
              isCondensed: appearance === 'filter' ? true : props.isCondensed,
              iconLeft: props.iconLeft,
              isMulti: props.isMulti,
              hasValue: !isEmpty(selectedOptions),
              controlShouldRenderValue: props.controlShouldRenderValue,
              horizontalConstraint: props.horizontalConstraint,
              minMenuWidth: props.minMenuWidth,
              maxMenuWidth: props.maxMenuWidth,
            }) as ReactSelectProps<TOption>['styles']
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
          {...(optionStyle === 'checkbox'
            ? optionsStyleCheckboxSelectProps()
            : { hideSelectedOptions: props.hideSelectedOptions })}
          // @ts-ignore
          isReadOnly={props.isReadOnly}
          isMulti={props.isMulti}
          isSearchable={props.isSearchable}
          isCondensed={props.isCondensed}
          maxMenuHeight={maxMenuHeight}
          menuPortalTarget={props.menuPortalTarget}
          menuShouldBlockScroll={props.menuShouldBlockScroll}
          // @ts-expect-error: optionStyle 'checkbox' will override this property (if set)
          closeMenuOnSelect={props.closeMenuOnSelect}
          name={props.name}
          noOptionsMessage={
            props.noOptionsMessage ||
            (({ inputValue }) =>
              !inputValue || inputValue === ''
                ? intl.formatMessage(messages.noOptionsMessageWithoutInputValue)
                : intl.formatMessage(messages.noOptionsMessageWithInputValue, {
                    inputValue,
                  }))
          }
          onBlur={
            typeof props.onBlur === 'function'
              ? () => {
                  const event = {
                    target: {
                      id: props.id,
                      name: (() => {
                        if (!props.isMulti) return props.name;
                        // We append the ".0" to make Formik set the touched
                        // state as an array instead of a boolean only.
                        // Otherwise the shapes would clash on submission, as
                        // Formik will create an array on submission anyways.
                        return props.name ? `${props.name}.0` : undefined;
                      })(),
                    },
                    persist: () => {},
                  };
                  props.onBlur && props.onBlur(event);
                }
              : undefined
          }
          onChange={(nextSelectedOptions) => {
            // nextSelectedOptions is either an array, or a single option, or null
            // depending on whether we're in multi-mode or not (isMulti)
            let value = null;

            if (props.isMulti) {
              if (nextSelectedOptions) {
                value = (nextSelectedOptions as TOption[]).map(
                  (option) => option.value
                );
              } else {
                value = [];
              }
            } else if (nextSelectedOptions) {
              value = (nextSelectedOptions as TOption).value;
            }

            props.onChange &&
              props.onChange({
                target: {
                  id: props.id,
                  name: props.name,
                  value,
                },
                persist: () => {},
              });
          }}
          onFocus={props.onFocus}
          onInputChange={props.onInputChange}
          options={options}
          placeholder={placeholder}
          tabIndex={props.tabIndex}
          tabSelectsValue={props.tabSelectsValue}
          value={selectedOptions}
          iconLeft={props.iconLeft}
          controlShouldRenderValue={
            appearance === 'filter' ? false : props.controlShouldRenderValue
          }
          menuPlacement="auto"
          {...(optionStyle === 'checkbox'
            ? optionsStyleCheckboxSelectProps()
            : {})}
        />
      </div>
    </Constraints.Horizontal>
  );
};

SelectInput.displayName = 'SelectInput';

/**
 * Expose static helper methods.
 */

// Both "true" and an empty array [] represent a touched state.
SelectInput.isTouched = (touched: boolean | unknown[]) => Boolean(touched);

/**
 * Expose react-select components for customization purposes.
 */

// custom
SelectInput.ClearIndicator = customizedComponents.ClearIndicator;
SelectInput.Control = defaultComponents.Control;
//https://github.com/commercetools/ui-kit/pull/3054/files#r1943026570
SelectInput.CrossIcon = defaultComponents.CrossIcon as ComponentType<
  JSX.IntrinsicElements['svg'] & {
    size?: number;
  }
>;
//https://github.com/commercetools/ui-kit/pull/3054/files#r1943026570
SelectInput.DownChevron = defaultComponents.DownChevron as ComponentType<
  JSX.IntrinsicElements['svg'] & {
    size?: number;
  }
>;
// custom
SelectInput.DropdownIndicator = customizedComponents.DropdownIndicator;
SelectInput.Group = defaultComponents.Group;
SelectInput.GroupHeading = defaultComponents.GroupHeading;
SelectInput.IndicatorSeparator = defaultComponents.IndicatorSeparator;
SelectInput.IndicatorsContainer = defaultComponents.IndicatorsContainer;
SelectInput.Input = defaultComponents.Input;
SelectInput.LoadingIndicator = defaultComponents.LoadingIndicator;
SelectInput.LoadingMessage = defaultComponents.LoadingMessage;
SelectInput.Menu = defaultComponents.Menu;
SelectInput.MenuList = defaultComponents.MenuList;
//https://github.com/commercetools/ui-kit/pull/3054/files#r1943026570
SelectInput.MenuPortal = defaultComponents.MenuPortal as ComponentType<
  CommonPropsAndClassName<unknown, false, GroupBase<unknown>> & {
    appendTo: HTMLElement | undefined;
    children: ReactNode;
    controlElement: HTMLDivElement | null;
    innerProps: JSX.IntrinsicElements['div'];
    menuPlacement: MenuPlacement;
    menuPosition: MenuPosition;
  }
>;
SelectInput.MultiValue = defaultComponents.MultiValue;
SelectInput.MultiValueContainer = defaultComponents.MultiValueContainer;
SelectInput.MultiValueLabel = defaultComponents.MultiValueLabel;
// custom
SelectInput.MultiValueRemove = customizedComponents.MultiValueRemove;
SelectInput.NoOptionsMessage = defaultComponents.NoOptionsMessage;
SelectInput.Option = defaultComponents.Option;
SelectInput.Placeholder = defaultComponents.Placeholder;
SelectInput.SelectContainer = defaultComponents.SelectContainer;
SelectInput.SingleValue = defaultComponents.SingleValue;
SelectInput.ValueContainer = defaultComponents.ValueContainer;

export default SelectInput;
