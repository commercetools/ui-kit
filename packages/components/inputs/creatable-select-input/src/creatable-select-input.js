import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { ThemeContext } from '@emotion/core';
import { components as defaultComponents } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Constraints from '@commercetools-uikit/constraints';
import {
  addStaticFields,
  SafeHTMLElement,
  filterDataAttributes,
} from '@commercetools-uikit/utils';
import {
  ClearIndicator,
  TagRemove,
  DropdownIndicator,
  customComponentsWithIcons,
} from '@commercetools-uikit/select-utils';
import createSelectStyles from '../../../../../src/components/internals/create-select-styles';
import messages from '../../../../../src/components/internals/messages/select';

const useTheme = () => useContext(ThemeContext);

const customizedComponents = {
  DropdownIndicator,
  ClearIndicator,
  MultiValueRemove: TagRemove,
};

const CreatableSelectInput = (props) => {
  const intl = useIntl();
  const theme = useTheme();

  const placeholder =
    props.placeholder || intl.formatMessage(messages.placeholder);

  return (
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <div {...filterDataAttributes(props)}>
        <CreatableSelect
          aria-label={props['aria-label']}
          aria-labelledby={props['aria-labelledby']}
          autoFocus={props.isAutofocussed}
          backspaceRemovesValue={props.backspaceRemovesValue}
          components={{
            ...customizedComponents,
            ...props.components,
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
          isClearable={props.isClearable}
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
                  props.onBlur(event);
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
          iconLeft={props.iconLeft}
        />
      </div>
    </Constraints.Horizontal>
  );
};

CreatableSelectInput.displayName = 'CreatableSelectInput';

// Both "true" and an empty array [] represent a touched state. The Boolean
// conveniently handles both cases
CreatableSelectInput.isTouched = (touched) => Boolean(touched);

CreatableSelectInput.propTypes = {
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
  /**
   * Indicates the input field has an error
   */
  hasError: PropTypes.bool,
  /**
   * Indicates the input field has a warning
   */
  hasWarning: PropTypes.bool,
  /**
   * Disables the select input as it is read-only
   */
  isReadOnly: PropTypes.bool,
  /**
   * Icon to display on the left of the placeholder text and selected value. Has no effect when `isMulti` is enabled.
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
   * <br />
   * Signature: `(event) => void`
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
   * Array of options that populate the select menu
   */
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({ value: PropTypes.string.isRequired }),
      PropTypes.shape({
        options: PropTypes.arrayOf(
          PropTypes.shape({ value: PropTypes.string.isRequired })
        ),
      }),
    ])
  ),
  /**
   * Determines if option groups will be separated by a divider
   */
  showOptionGroupDivider: PropTypes.bool,
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
};

CreatableSelectInput.defaultProps = {
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

addStaticFields(CreatableSelectInput, {
  ...defaultComponents,
  ...customizedComponents,
  isTouched: CreatableSelectInput.isTouched,
});

export default CreatableSelectInput;
