import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { ThemeContext } from '@emotion/core';
import has from 'lodash/has';
import flatMap from 'lodash/flatMap';
import Select, { components as defaultComponents } from 'react-select';
import Constraints from '@commercetools-uikit/constraints';
import {
  ClearIndicator,
  TagRemove,
  DropdownIndicator,
  customComponentsWithIcons,
} from '@commercetools-uikit/select-utils';
import {
  addStaticFields,
  SafeHTMLElement,
  filterDataAttributes,
} from '@commercetools-uikit/utils';
import createSelectStyles from '../../../../../src/components/internals/create-select-styles';
import messages from '../../../../../src/components/internals/messages/select';

const useTheme = () => useContext(ThemeContext);

const customizedComponents = {
  DropdownIndicator,
  ClearIndicator,
  MultiValueRemove: TagRemove,
};

const SelectInput = (props) => {
  const intl = useIntl();
  const theme = useTheme();

  const placeholder =
    props.placeholder || intl.formatMessage(messages.placeholder);
  // Options can be grouped as
  //   const colourOptions = [{ value: 'green', label: 'Green' }];
  //   const flavourOptions = [{ value: 'vanilla', label: 'Vanilla' }];
  //   const groupedOptions = [
  //     { label: 'Colours', options: colourOptions },
  //     { label: 'Flavours', options: flavourOptions },
  //   ];
  // So we "ungroup" the options by merging them all into one list first.
  const optionsWithoutGroups = flatMap(props.options, (option) =>
    has(option, 'value') ? option : option.options
  );

  const selectedOptions = props.isMulti
    ? props.value
        // Pass the options in the order selected by the use, so that the
        // sorting is not lost
        .map((value) =>
          optionsWithoutGroups.find((option) => option.value === value)
        )
        .filter(Boolean)
    : optionsWithoutGroups.find(
        (option) => has(option, 'value') && option.value === props.value
      ) || null;

  return (
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <div {...filterDataAttributes(props)}>
        <Select
          aria-label={props['aria-label']}
          aria-labelledby={props['aria-labelledby']}
          autoFocus={props.isAutofocussed}
          backspaceRemovesValue={props.backspaceRemovesValue}
          components={{
            ...customizedComponents,
            ...(props.iconLeft && !props.isMulti
              ? customComponentsWithIcons
              : {}),
            ...props.components,
          }}
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
          isDisabled={props.isDisabled || props.isReadOnly}
          isReadOnly={props.isReadOnly}
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
          onChange={(nextSelectedOptions) => {
            // nextSelectedOptions is either an array, or a single option, or null
            // depending on whether we're in multi-mode or not (isMulti)

            let value = null;

            if (props.isMulti) {
              if (nextSelectedOptions) {
                value = nextSelectedOptions.map((option) => option.value);
              } else {
                value = [];
              }
            } else if (nextSelectedOptions) {
              value = nextSelectedOptions.value;
            }

            props.onChange({
              target: {
                name: props.name,
                value,
              },
              persist: () => {},
            });
          }}
          onFocus={props.onFocus}
          onInputChange={props.onInputChange}
          options={props.options}
          placeholder={placeholder}
          tabIndex={props.tabIndex}
          tabSelectsValue={props.tabSelectsValue}
          value={selectedOptions}
          iconLeft={props.iconLeft}
        />
      </div>
    </Constraints.Horizontal>
  );
};

SelectInput.displayName = 'SelectInput';

// Both "true" and an empty array [] represent a touched state. The Boolean
// conveniently handles both cases
SelectInput.isTouched = (touched) => Boolean(touched);

SelectInput.defaultProps = {
  maxMenuHeight: 220,
  menuPortalZIndex: 1,
};

SelectInput.propTypes = {
  horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
  /**
   * Indicates that input has errors
   */
  hasError: PropTypes.bool,
  /**
   * Is the select read-only
   */
  isReadOnly: PropTypes.bool,

  /**
   * Control to indicate on the input if there are selected values that are potentially invalid
   */
  hasWarning: PropTypes.bool,
  /**
   * 	Icon to display on the left of the placeholder text and selected value. Has no effect when isMulti is enabled.
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
  isAutofocussed: PropTypes.bool,
  /**
   * Remove the currently focused option when the user presses backspace
   */
  backspaceRemovesValue: PropTypes.bool,
  // blurInputOnSelect: PropTypes.bool,
  // captureMenuScroll: PropTypes.bool,
  // className: PropTypes.string,
  // classNamePrefix: PropTypes.string,
  // closeMenuOnSelect: PropTypes.bool,
  // closeMenuOnScroll: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  /**
   * Map of components to overwrite the default ones, see what components you can override
   */
  components: PropTypes.objectOf(PropTypes.func),
  // controlShouldRenderValue: PropTypes.bool,
  // delimiter: PropTypes.string,
  // escapeClearsValue: PropTypes.bool,
  /**
   * Custom method to filter whether an option should be displayed in the menu
   * <br />
   * Signature: `(option, rawInput) => boolean`
   */
  filterOption: PropTypes.func,
  // formatGroupLabel: PropTypes.func,
  // formatOptionLabel: PropTypes.func,
  // getOptionLabel: PropTypes.func,
  // getOptionValue: PropTypes.func,
  // hideSelectedOptions: PropTypes.bool,
  /**
   * Used as HTML id property. An id is generated automatically when not provided.
   *This forwarded as react-select's "inputId"
   */
  id: PropTypes.string,
  inputValue: PropTypes.string,
  /**
   * The id to set on the SelectContainer component
   * This is forwarded as react-select's "id"
   */
  containerId: PropTypes.string,
  // instanceId: PropTypes.string,
  /**
   * Is the select value clearable
   */
  isClearable: PropTypes.bool,
  /**
   * Is the select disabled
   */
  isDisabled: PropTypes.bool,
  // isLoading: PropTypes.bool,
  /**
   * Override the built-in logic to detect whether an option is disabled
   */
  isOptionDisabled: PropTypes.func,
  // isOptionSelected: PropTypes.func,
  /**
   * Support multiple selected options
   */
  isMulti: PropTypes.bool,
  // isRtl: PropTypes.bool,
  /**
   * Whether to enable search functionality
   */
  isSearchable: PropTypes.bool,
  // loadingMessage: PropTypes.func,
  // minMenuHeight: PropTypes.number,
  /**
   * Maximum height of the menu before scrolling
   */
  maxMenuHeight: PropTypes.number,
  // menuIsOpen: PropTypes.bool,
  // menuPlacement: PropTypes.oneOf(['auto', 'bottom', 'top']),
  // menuPosition: PropTypes.oneOf(['absolute', 'fixed']),
  /**
   * Dom element to portal the select menu to
   */
  menuPortalTarget: PropTypes.instanceOf(SafeHTMLElement),
  /**
   * z-index value for the menu portal
   */
  menuPortalZIndex: PropTypes.number,
  /**
   * whether the menu should block scroll while open
   */
  menuShouldBlockScroll: PropTypes.bool,
  // menuShouldScrollIntoView: PropTypes.bool,
  /**
   * Name of the HTML Input (optional - without this, no input will be rendered)
   */
  name: PropTypes.string,
  /**
   * Can be used to render a custom value when there are no options (either because of no search results, or all options have been used, or there were none in the first place). Gets called with { inputValue: String }.
   * <br />
   * `inputValue` will be an empty string when no search text is present.
   * <br />
   * Signature: `({ inputValue}) => string`
   */
  noOptionsMessage: PropTypes.func,
  /**
   * Handle blur events on the control
   * <br />
   * Signature: `(event) => void`
   */
  onBlur: PropTypes.func,
  /**
   * Called with a fake event when value changes. The event's target.name will be the name supplied in props. The event's target.value will hold the value.
   * <br/>
   * The value will be the selected option, or an array of options in case isMulti is true.
   * <br />
   * Signature: `(event) => void`
   */
  onChange: PropTypes.func,
  /**
   * Handle focus events on the control
   * <br />
   * Signature: `(event) => void`
   */
  onFocus: PropTypes.func,
  /**
   * Handle change events on the input
   * <br />
   * Signature: `(newValue, actionMeta) => void`
   */
  onInputChange: PropTypes.func,
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
  showOptionGroupDivider: PropTypes.bool,
  // pageSize: PropTypes.number,
  /**
   * Placeholder text for the select value
   */
  placeholder: PropTypes.string,
  // screenReaderStatus: PropTypes.func,
  // styles: PropTypes.objectOf(PropTypes.func),
  // theme: PropTypes.object,
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
      ? PropTypes.arrayOf(PropTypes.string).isRequired(props, ...rest)
      : PropTypes.string(props, ...rest),
};

addStaticFields(SelectInput, {
  ...defaultComponents,
  ...customizedComponents,
  isTouched: SelectInput.isTouched,
});
export default SelectInput;
