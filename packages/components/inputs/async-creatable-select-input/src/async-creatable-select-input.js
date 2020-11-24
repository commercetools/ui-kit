import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useTheme } from '@emotion/react';
import { components as defaultComponents } from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';
import Constraints from '@commercetools-uikit/constraints';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import {
  ClearIndicator,
  DropdownIndicator,
  TagRemove,
  customComponentsWithIcons,
  messages,
  createSelectStyles,
} from '@commercetools-uikit/select-utils';
import {
  addStaticFields,
  SafeHTMLElement,
  filterDataAttributes,
} from '@commercetools-uikit/utils';

const LoadingIndicator = () => <LoadingSpinner scale="s" />;
LoadingIndicator.displayName = 'LoadingIndicator';

const customizedComponents = {
  DropdownIndicator,
  ClearIndicator,
  LoadingIndicator,
  MultiValueRemove: TagRemove,
};

const AsyncCreatableSelectInput = (props) => {
  const intl = useIntl();
  const theme = useTheme();

  const placeholder =
    props.placeholder || intl.formatMessage(messages.placeholder);

  return (
    <Constraints.Horizontal
      max={Constraints.parseHorizontalConstraintProp(
        props.horizontalConstraint
      )}
    >
      <div {...filterDataAttributes(props)}>
        <AsyncCreatableSelect
          aria-label={props['aria-label']}
          aria-labelledby={props['aria-labelledby']}
          autoFocus={props.isAutofocussed}
          backspaceRemovesValue={
            props.isReadOnly ? false : props.backspaceRemovesValue
          }
          components={{
            ...customizedComponents,
            ...(props.iconLeft && !props.isMulti
              ? customComponentsWithIcons
              : {}),
            // react-select doesn't support readOnly mode; this is a workaround:
            ...(props.isReadOnly
              ? {
                  // eslint-disable-next-line react/display-name
                  Input: (ownProps) => (
                    <defaultComponents.Input {...ownProps} readOnly />
                  ),
                }
              : {}),
            ...props.components,
          }}
          menuIsOpen={props.isReadOnly ? false : undefined}
          styles={createSelectStyles(
            {
              hasWarning: props.hasWarning,
              hasError: props.hasError,
              showOptionGroupDivider: props.showOptionGroupDivider,
              menuPortalZIndex: props.menuPortalZIndex,
              isDisabled: props.isDisabled,
              isReadOnly: props.isReadOnly,
            },
            theme
          )}
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
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    persist: () => {},
                  };
                  props.onBlur(event);
                }
              : undefined
          }
          onChange={(value, info) => {
            // wrapping breaking changes made in react-select v3
            let newValue = value;

            if (props.isMulti && !newValue) {
              newValue = [];
            }
            props.onChange(
              {
                target: { name: props.name, value: newValue },
                // eslint-disable-next-line @typescript-eslint/no-empty-function
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
AsyncCreatableSelectInput.isTouched = (touched) => Boolean(touched);

AsyncCreatableSelectInput.displayName = 'AsyncCreatableSelectInput';

AsyncCreatableSelectInput.defaultProps = {
  // Using "null" will ensure that the currently selected value disappears in
  // case "undefined" gets passed as the next value
  value: null,
  isSearchable: true,
  menuPortalZIndex: 1,
};

AsyncCreatableSelectInput.propTypes = {
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint: PropTypes.oneOf([
    's',
    'm',
    'l',
    'xl',
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    'scale',
    'auto',
  ]),
  /**
   * Indicates the input field has an error
   */
  hasError: PropTypes.bool,
  /**
   * Indicates the input field has a warning
   */
  hasWarning: PropTypes.bool,
  /**
   *  Is the select read-only
   */
  isReadOnly: PropTypes.bool,
  /**
   * Icon to display on the left of the placeholder text and selected value. Has no effect when isMulti is enabled.
   */
  iconLeft: PropTypes.node,

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
  'aria-label': PropTypes.string,
  /**
   * HTML ID of an element that should be used as the label (for assistive tech)
   */
  'aria-labelledby': PropTypes.string,
  /**
   * Focus the control when it is mounted
   */
  isAutofocussed: PropTypes.bool, // original: autoFocus
  /**
   * Remove the currently focused option when the user presses backspace
   */
  backspaceRemovesValue: PropTypes.bool,
  /**
   * Map of components to overwrite the default ones, see [what components you can override](https://react-select.com/components)
   */
  components: PropTypes.objectOf(PropTypes.func),
  /**
   * Custom method to filter whether an option should be displayed in the menu
   */
  filterOption: PropTypes.func,
  // This forwarded as react-select's "inputId"
  /**
   * The id of the search input
   */
  id: PropTypes.string,
  // This is forwarded as react-select's "id"
  inputValue: PropTypes.string,
  /**
   * The id to set on the SelectContainer component
   */
  containerId: PropTypes.string,
  /**
   * Is the select value clearable
   */
  isClearable: PropTypes.bool,
  /**
   * Is the select disabled
   */
  isDisabled: PropTypes.bool,
  /**
   * Override the built-in logic to detect whether an option is disabled
   */
  isOptionDisabled: PropTypes.func,
  /**
   * Support multiple selected options
   */
  isMulti: PropTypes.bool,
  /**
   * Whether to enable search functionality
   */
  isSearchable: PropTypes.bool,
  /**
   * Maximum height of the menu before scrolling
   */
  maxMenuHeight: PropTypes.number,
  /**
   * Dom element to portal the select menu to
   */
  menuPortalTarget: PropTypes.instanceOf(SafeHTMLElement),
  /**
   * z-index value for the menu portal
   */
  menuPortalZIndex: PropTypes.number.isRequired,
  /**
   * whether the menu should block scroll while open
   */
  menuShouldBlockScroll: PropTypes.bool,
  /**
   * Name of the HTML Input (optional - without this, no input will be rendered)
   */
  name: PropTypes.string,
  /**
   * Can be used to render a custom value when there are no options (either because of no search results, or all options have been used, or there were none in the first place). Gets called with `{ inputValue: String }`. `inputValue` will be an empty string when no search text is present.
   */
  noOptionsMessage: PropTypes.func,
  /**
   * Handle blur events on the control
   */
  onBlur: PropTypes.func,
  /**
   * Called with a fake event when value changes. The event's `target.name` will be the `name` supplied in props. The event's `target.value` will hold the value. The value will be the selected option, or an array of options in case `isMulti` is `true`.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Handle focus events on the control
   */
  onFocus: PropTypes.func,
  /**
   * Handle change events on the input
   */
  onInputChange: PropTypes.func,
  /**
   * Placeholder text for the select value
   */
  placeholder: PropTypes.string,
  /**
   * Sets the tabIndex attribute on the input
   */
  tabIndex: PropTypes.string,
  /**
   * Select the currently focused option when the user presses tab
   */
  tabSelectsValue: PropTypes.bool,
  /**
   * The value of the select; reflected by the selected option
   */
  value: (props, ...rest) =>
    props.isMulti
      ? PropTypes.arrayOf(
          PropTypes.shape({ value: PropTypes.string.isRequired })
        )(props, ...rest)
      : PropTypes.shape({ value: PropTypes.string.isRequired })(props, ...rest),

  // Async props
  /**
   * The default set of options to show before the user starts searching. When set to true, the results for loadOptions('') will be autoloaded.
   */
  defaultOptions: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
      })
    ),
  ]),
  /**
   * Function that returns a promise, which is the set of options to be used once the promise resolves.
   */
  loadOptions: PropTypes.func.isRequired,
  /**
   * If cacheOptions is truthy, then the loaded data will be cached. The cache will remain until cacheOptions changes value.
   */
  cacheOptions: PropTypes.any,

  // Creatable props
  /**
   * Allow options to be created while the isLoading prop is true. Useful to prevent the "create new ..." option being displayed while async results are still being loaded.
   */
  allowCreateWhileLoading: PropTypes.bool,
  /**
   * Gets the label for the "create new ..." option in the menu. Is given the current input value.
   */
  formatCreateLabel: PropTypes.func,
  /**
   * Determines whether the "create new ..." option should be displayed based on the current input value, select value and options array.
   */
  isValidNewOption: PropTypes.func,
  /**
   * Returns the data for the new option when it is created. Used to display the value, and is passed to onChange.
   */
  getNewOptionData: PropTypes.func,
  /**
   * If provided, this will be called with the input value when a new option is created, and onChange will not be called. Use this when you need more control over what happens when new options are created.
   */
  onCreateOption: PropTypes.func,
  /**
   * Sets the position of the createOption element in your options list.
   */
  createOptionPosition: PropTypes.string,
  /**
   * Determines if option groups will be separated by a divider
   */
  showOptionGroupDivider: PropTypes.bool,
};

addStaticFields(AsyncCreatableSelectInput, {
  ...defaultComponents,
  ...customizedComponents,
  isTouched: AsyncCreatableSelectInput.isTouched,
});

export default AsyncCreatableSelectInput;
