import type { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import { useTheme } from '@emotion/react';
import {
  components as defaultComponents,
  type Props,
  type PropsValue,
  type GroupBase,
  type GetOptionLabel,
  type GetOptionValue,
  type Options,
  type OptionsOrGroups,
  ActionMeta,
} from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Constraints from '@commercetools-uikit/constraints';
import {
  addStaticFields,
  filterDataAttributes,
} from '@commercetools-uikit/utils';
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
};

type TOptions = TValue[] | { options: TValue[] }[];

type Accessors<Option> = {
  getOptionValue: GetOptionValue<Option>;
  getOptionLabel: GetOptionLabel<Option>;
};

type TEvent = {
  target: {
    name?: string;
    value?: unknown;
  };
  persist?: () => void;
};

type TCreatableSelectInput = {
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
   */
  'aria-label': Props['aria-label'];
  /**
   * HTML ID of an element that should be used as the label (for assistive tech)
   */
  'aria-labelledby': Props['aria-labelledby'];
  /**
   * Focus the control when it is mounted
   */
  isAutofocussed?: boolean; // original: autoFocus
  /**
   * Remove the currently focused option when the user presses backspace
   */
  backspaceRemovesValue?: Props['backspaceRemovesValue'];
  /**
   * Map of components to overwrite the default ones, see [what components you can override](https://react-select.com/components)
   */
  components?: Props['components'];
  /**
   * Custom method to filter whether an option should be displayed in the menu
   */
  filterOption?: Props['filterOption'];
  // This forwarded as react-select's "inputId"
  /**
   * The id of the search input
   */
  id?: Props['inputId'];
  // This is forwarded as react-select's "id"
  inputValue?: Props['inputValue'];
  /**
   * The id to set on the SelectContainer component
   */
  containerId?: Props['id'];
  /**
   * Is the select value clearable
   */
  isClearable?: Props['isClearable'];
  /**
   * Is the select disabled
   */
  isDisabled?: Props['isDisabled'];
  /**
   * Override the built-in logic to detect whether an option is disabled
   */
  isOptionDisabled?: Props['isOptionDisabled'];
  /**
   * Support multiple selected options
   */
  isMulti?: Props['isMulti'];
  /**
   * Whether to enable search functionality
   */
  isSearchable?: Props['isSearchable'];
  /**
   * Maximum height of the menu before scrolling
   */
  maxMenuHeight?: Props['maxMenuHeight'];
  /**
   * Dom element to portal the select menu to
   */
  menuPortalTarget?: Props['menuPortalTarget'];
  /**
   * z-index value for the menu portal
   */
  menuPortalZIndex: number;
  /**
   * whether the menu should block scroll while open
   */
  menuShouldBlockScroll?: Props['menuShouldBlockScroll'];
  /**
   * Name of the HTML Input (optional - without this, no input will be rendered)
   */
  name?: Props['name'];
  /**
   * Can be used to render a custom value when there are no options (either because of no search results, or all options have been used, or there were none in the first place). Gets called with `{ inputValue: String }`. `inputValue` will be an empty string when no search text is present.
   */
  noOptionsMessage?: Props['noOptionsMessage'];
  /**
   * Handle blur events on the control
   */
  onBlur?: (event: TEvent) => void;
  /**
   * Called with a fake event when value changes. The event's `target.name` will be the `name` supplied in props. The event's `target.value` will hold the value. The value will be the selected option, or an array of options in case `isMulti` is `true`.
   * <br />
   * Signature: `(event) => void`
   */
  onChange: (event: TEvent, info: ActionMeta<unknown>) => void;
  /**
   * Handle focus events on the control
   */
  onFocus?: Props['onFocus'];
  /**
   * Handle change events on the input
   */
  onInputChange?: Props['onInputChange'];
  /**
   * Array of options that populate the select menu
   */
  options: TOptions;
  /**
   * Determines if option groups will be separated by a divider
   */
  showOptionGroupDivider?: boolean;
  /**
   * Placeholder text for the select value
   */
  placeholder?: Props['placeholder'];
  /**
   * Sets the tabIndex attribute on the input
   */
  tabIndex?: Props['tabIndex'];
  /**
   * Select the currently focused option when the user presses tab
   */
  tabSelectsValue?: Props['tabSelectsValue'];
  /**
   * The value of the select; reflected by the selected option
   */
  value: PropsValue<TValue>;

  // Creatable props
  /**
   * Allow options to be created while the isLoading prop is true. Useful to prevent the "create new ..." option being displayed while async results are still being loaded.
   */
  allowCreateWhileLoading?: boolean;
  /**
   * Gets the label for the "create new ..." option in the menu. Is given the current input value.
   */
  formatCreateLabel?: (inputValue: string) => ReactNode;
  /**
   * Determines whether the "create new ..." option should be displayed based on the current input value, select value and options array.
   */
  isValidNewOption?: (
    inputValue: string,
    value: Options<unknown>,
    options: OptionsOrGroups<unknown, GroupBase<unknown>>,
    accessors: Accessors<unknown>
  ) => boolean;
  /**
   * Returns the data for the new option when it is created. Used to display the value, and is passed to onChange.
   */
  getNewOptionData?: (inputValue: string, optionLabel: ReactNode) => TValue;
  /**
   * If provided, this will be called with the input value when a new option is created, and onChange will not be called. Use this when you need more control over what happens when new options are created.
   */
  onCreateOption?: (inputValue: string) => void;
  /**
   * Sets the position of the createOption element in your options list.
   */
  createOptionPosition?: 'first' | 'last';
};

type TDefaultProps = {
  value: TCreatableSelectInput['value'];
  isSearchable: TCreatableSelectInput['isSearchable'];
  menuPortalZIndex: TCreatableSelectInput['menuPortalZIndex'];
};

const defaultProps: TDefaultProps = {
  // Using "null" will ensure that the currently selected value disappears in
  // case "undefined" gets passed as the next value
  value: null,
  // The input needs to be searchable, otherwise it's not possible to create
  // new options.
  // We still allow consumers to pass isSearchable={false} so that they can
  // use CreatableSelectInput as an alternative to SelectInput, which does
  // not do the option/value mapping going on there and therefore provides
  // the default API of react-select.
  isSearchable: true,
  menuPortalZIndex: 1,
};

const CreatableSelectInput = (props: TCreatableSelectInput) => {
  const intl = useIntl();
  const theme = useTheme();

  const placeholder =
    props.placeholder || intl.formatMessage(messages.placeholder);

  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <div {...filterDataAttributes(props)}>
        <CreatableSelect
          aria-label={props['aria-label']}
          aria-labelledby={props['aria-labelledby']}
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
            } as Props['components']
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
            ) as Props['styles']
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
          options={props.options}
          placeholder={placeholder}
          tabIndex={props.tabIndex}
          tabSelectsValue={props.tabSelectsValue}
          value={props.value}
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
        />
      </div>
    </Constraints.Horizontal>
  );
};

CreatableSelectInput.displayName = 'CreatableSelectInput';

// Both "true" and an empty array [] represent a touched state. The Boolean
// conveniently handles both cases
CreatableSelectInput.isTouched = (touched: unknown) => Boolean(touched);

CreatableSelectInput.defaultProps = defaultProps;

addStaticFields(CreatableSelectInput, {
  ...defaultComponents,
  ...customizedComponents,
  isTouched: CreatableSelectInput.isTouched,
});

export default CreatableSelectInput;
