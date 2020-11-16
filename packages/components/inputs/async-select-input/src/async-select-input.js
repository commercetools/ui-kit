import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useTheme } from 'emotion-theming';
import { components as defaultComponents } from 'react-select';
import AsyncSelect from 'react-select/async';
import {
  addStaticFields,
  SafeHTMLElement,
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

const AsyncSelectInput = (props) => {
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
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <div {...filterDataAttributes(props)}>
        <AsyncSelect
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
                  props.onBlur(event);
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
AsyncSelectInput.isTouched = (touched) => Boolean(touched);

AsyncSelectInput.displayName = 'AsyncSelectInput';

AsyncSelectInput.defaultProps = {
  // Using "null" will ensure that the currently selected value disappears in
  // case "undefined" gets passed as the next value
  value: null,
  isSearchable: true,
  menuPortalZIndex: 1,
};

AsyncSelectInput.propTypes = {
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
   * Indicates that the field is displaying read-only content
   */
  isReadOnly: PropTypes.bool,

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
  // renamed autoFocus of react-select
  /**
   * Focus the control when it is mounted
   */
  isAutofocussed: PropTypes.bool,
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
  inputValue: PropTypes.string,
  // This is forwarded as react-select's "id"
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
   * loading message shown while the options are being loaded
   */
  loadingMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
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
  /**
   * Determines if option groups will be separated by a divider
   */
  showOptionGroupDivider: PropTypes.bool,
  /**
   * Icon to display on the left of the placeholder text and selected value. Has no effect when `isMulti` is enabled.
   */
  iconLeft: PropTypes.node,
};

addStaticFields(AsyncSelectInput, {
  ...defaultComponents,
  ...customizedComponents,
  isTouched: AsyncSelectInput.isTouched,
});

export default AsyncSelectInput;
