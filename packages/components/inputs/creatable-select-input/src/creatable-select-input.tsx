import type { ComponentType, ReactNode } from 'react';
import { useIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import {
  components as defaultComponents,
  type ClearIndicatorProps,
  type ContainerProps,
  type ControlProps,
  type DropdownIndicatorProps,
  type GroupHeadingProps,
  type GroupProps,
  type IndicatorsContainerProps,
  type InputProps,
  type MenuListProps,
  type MultiValueGenericProps,
  type MultiValueProps,
  type MultiValueRemoveProps,
  type NoticeProps,
  type OptionProps,
  type PlaceholderProps,
  type SingleValueProps,
  type ValueContainerProps,
  type ActionMeta,
  type GroupBase,
  type LoadingIndicatorProps,
  type MenuProps,
  type CommonPropsAndClassName,
  type MenuPlacement,
  type MenuPosition,
} from 'react-select';
import CreatableSelect, { type CreatableProps } from 'react-select/creatable';
import Constraints from '@commercetools-uikit/constraints';
import { filterDataAttributes, warning } from '@commercetools-uikit/utils';
import {
  ClearIndicator,
  TagRemove,
  DropdownIndicator,
  customComponentsWithIcons,
  createSelectStyles,
  messages,
} from '@commercetools-uikit/select-utils';

const customizedComponents = {
  DropdownIndicator,
  ClearIndicator,
  MultiValueRemove: TagRemove,
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

type ReactSelectCreatableProps = CreatableProps<
  unknown,
  boolean,
  GroupBase<unknown>
>;

export type TCreatableSelectInputProps = {
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
   * Disables the select input as it is read-only
   */
  isReadOnly?: boolean;
  /**
   * Icon to display on the left of the placeholder text and selected value. Has no effect when `isMulti` is enabled.
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
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  'aria-label'?: ReactSelectCreatableProps['aria-label'];
  /**
   * HTML ID of an element that should be used as the label (for assistive tech)
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  'aria-labelledby'?: ReactSelectCreatableProps['aria-labelledby'];
  /**
   * Indicate if the value entered in the input is invalid.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  'aria-invalid'?: ReactSelectCreatableProps['aria-invalid'];
  /**
   * HTML ID of an element containing an error message related to the input.
   * <br>
   * [Props from React select was used](https://react-select.com/props)
   */
  'aria-errormessage'?: ReactSelectCreatableProps['aria-errormessage'];
  /**
   * Focus the control when it is mounted
   */
  isAutofocussed?: boolean; // original: autoFocus
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
  // This forwarded as react-select's "inputId"
  /**
   * The id of the search input
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  id?: ReactSelectCreatableProps['inputId'];
  // This is forwarded as react-select's "id"
  /**
   * The value of the search input
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  inputValue?: ReactSelectCreatableProps['inputValue'];
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
   * Whether the menu should close after a value is selected. Defaults to `true`.
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  closeMenuOnSelect?: ReactSelectCreatableProps['closeMenuOnSelect'];
  /**
   * Name of the HTML Input (optional - without this, no input will be rendered)
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  name?: ReactSelectCreatableProps['name'];
  /**
   * Can be used to render a custom value when there are no options (either because of no search results, or all options have been used, or there were none in the first place). Gets called with `{ inputValue: String }`. `inputValue` will be an empty string when no search text is present.
   * <br>
   * [Props from React select was used](https://react-select.com/props#creatable-props)
   */
  noOptionsMessage?: ReactSelectCreatableProps['noOptionsMessage'];
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
   * Determines if option groups will be separated by a divider
   */
  showOptionGroupDivider?: boolean;
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
};

const CreatableSelectInput = ({
  // Using "null" will ensure that the currently selected value disappears in
  // case "undefined" gets passed as the next value
  value = null,
  // The input needs to be searchable, otherwise it's not possible to create
  // new options.
  // We still allow consumers to pass isSearchable={false} so that they can
  // use CreatableSelectInput as an alternative to SelectInput, which does
  // not do the option/value mapping going on there and therefore provides
  // the default API of react-select.
  isSearchable = true,
  menuPortalZIndex = 1,
  ...props
}: TCreatableSelectInputProps) => {
  const intl = useIntl();

  if (!props.isReadOnly) {
    warning(
      typeof props.onChange === 'function',
      'CreatableSelectInput: `onChange` is required when input is not read only.'
    );
  }

  const placeholder =
    props.placeholder || intl.formatMessage(messages.placeholder);

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
        <CreatableSelect
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
              ...props.components,
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
            } as ReactSelectCreatableProps['components']
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
            }) as ReactSelectCreatableProps['styles']
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
          closeMenuOnSelect={props.closeMenuOnSelect}
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
          onChange={(value, info) => {
            // selectedOptions is either an array, or a single option, or null
            // depending on whether we're in multi-mode or not (isMulti)

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
          options={props.options}
          placeholder={placeholder}
          tabIndex={props.tabIndex}
          tabSelectsValue={props.tabSelectsValue}
          value={value}
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
          //@ts-ignore
          iconLeft={props.iconLeft}
          isCondensed={props.isCondensed}
        />
      </div>
    </Constraints.Horizontal>
  );
};
CreatableSelectInput.displayName = 'CreatableSelectInput';

/**
 * Expose static helper methods.
 */

// Both "true" and an empty array [] represent a touched state. The Boolean
// conveniently handles both cases
CreatableSelectInput.isTouched = (touched: unknown) => Boolean(touched);

/**
 * Expose react-select components for customization purposes.
 */

// custom
CreatableSelectInput.ClearIndicator =
  customizedComponents.ClearIndicator as ComponentType<
    ClearIndicatorProps<{}, false, GroupBase<{}>>
  >;
CreatableSelectInput.Control = defaultComponents.Control as ComponentType<
  ControlProps<{}, false, GroupBase<{}>>
>;
CreatableSelectInput.CrossIcon = defaultComponents.CrossIcon as ComponentType<
  JSX.IntrinsicElements['svg'] & {
    size?: number;
  }
>;
CreatableSelectInput.DownChevron =
  defaultComponents.DownChevron as ComponentType<
    JSX.IntrinsicElements['svg'] & {
      size?: number;
    }
  >;
// custom
CreatableSelectInput.DropdownIndicator =
  customizedComponents.DropdownIndicator as ComponentType<
    DropdownIndicatorProps<{}, false, GroupBase<{}>>
  >;
CreatableSelectInput.Group = defaultComponents.Group as ComponentType<
  GroupProps<{}, false, GroupBase<{}>>
>;
CreatableSelectInput.GroupHeading =
  defaultComponents.GroupHeading as ComponentType<
    GroupHeadingProps<{}, false, GroupBase<{}>>
  >;
CreatableSelectInput.IndicatorSeparator =
  defaultComponents.IndicatorSeparator as ComponentType<
    LoadingIndicatorProps<{}, false, GroupBase<{}>>
  >;
CreatableSelectInput.IndicatorsContainer =
  defaultComponents.IndicatorsContainer as ComponentType<
    IndicatorsContainerProps<{}, false, GroupBase<{}>>
  >;
CreatableSelectInput.Input = defaultComponents.Input as ComponentType<
  InputProps<{}, false, GroupBase<{}>>
>;
// custom
CreatableSelectInput.LoadingIndicator =
  defaultComponents.LoadingIndicator as ComponentType<
    LoadingIndicatorProps<{}, false, GroupBase<{}>>
  >;
CreatableSelectInput.LoadingMessage =
  defaultComponents.LoadingMessage as ComponentType<
    NoticeProps<{}, false, GroupBase<{}>>
  >;
CreatableSelectInput.Menu = defaultComponents.Menu as ComponentType<
  MenuProps<{}, false, GroupBase<{}>>
>;
CreatableSelectInput.MenuList = defaultComponents.MenuList as ComponentType<
  MenuListProps<{}, false, GroupBase<{}>>
>;
CreatableSelectInput.MenuPortal = defaultComponents.MenuPortal as ComponentType<
  CommonPropsAndClassName<{}, false, GroupBase<{}>> & {
    appendTo: HTMLElement | undefined;
    children: ReactNode;
    controlElement: HTMLDivElement | null;
    innerProps: JSX.IntrinsicElements['div'];
    menuPlacement: MenuPlacement;
    menuPosition: MenuPosition;
  }
>;
CreatableSelectInput.MultiValue = defaultComponents.MultiValue as ComponentType<
  MultiValueProps<{}, false, GroupBase<{}>>
>;
CreatableSelectInput.MultiValueContainer =
  defaultComponents.MultiValueContainer as ComponentType<
    MultiValueGenericProps<{}, false, GroupBase<{}>>
  >;
CreatableSelectInput.MultiValueLabel =
  defaultComponents.MultiValueLabel as ComponentType<
    MultiValueGenericProps<{}, false, GroupBase<{}>>
  >;
// custom
CreatableSelectInput.MultiValueRemove =
  customizedComponents.MultiValueRemove as ComponentType<
    MultiValueRemoveProps<{}, false, GroupBase<{}>>
  >;
CreatableSelectInput.NoOptionsMessage =
  defaultComponents.NoOptionsMessage as ComponentType<
    NoticeProps<{}, false, GroupBase<{}>>
  >;
CreatableSelectInput.Option = defaultComponents.Option as ComponentType<
  OptionProps<{}, false, GroupBase<{}>>
>;
CreatableSelectInput.Placeholder =
  defaultComponents.Placeholder as ComponentType<
    PlaceholderProps<{}, false, GroupBase<{}>>
  >;
CreatableSelectInput.SelectContainer =
  defaultComponents.SelectContainer as ComponentType<
    ContainerProps<{}, false, GroupBase<{}>>
  >;
CreatableSelectInput.SingleValue =
  defaultComponents.SingleValue as ComponentType<
    SingleValueProps<{}, false, GroupBase<{}>>
  >;
CreatableSelectInput.ValueContainer =
  defaultComponents.ValueContainer as ComponentType<
    ValueContainerProps<{}, false, GroupBase<{}>>
  >;

export default CreatableSelectInput;
