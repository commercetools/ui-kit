import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import {
  SafeHTMLElement,
  filterDataAttributes,
  createSequentialId,
} from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import FieldLabel from '@commercetools-uikit/field-label';
import SearchSelectInput from '@commercetools-uikit/search-select-input';
import FieldErrors from '@commercetools-uikit/field-errors';

const hasErrors = (errors) => errors && Object.values(errors).some(Boolean);
const sequentialId = createSequentialId('async-select-field-');

const SearchSelectField = (props) => {
  const hasError = Boolean(props.touched) && hasErrors(props.errors);
  const id = props.id || sequentialId();
  return (
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <Spacings.Stack scale="xs">
        <FieldLabel
          title={props.title}
          hint={props.hint}
          description={props.description}
          onInfoButtonClick={props.onInfoButtonClick}
          hintIcon={props.hintIcon}
          badge={props.badge}
          hasRequiredIndicator={props.isRequired}
          htmlFor={id}
        />
        <SearchSelectInput
          {...filterDataAttributes(props)}
          horizontalConstraint="scale"
          hasError={hasError}
          aria-label={props['aria-label']}
          aria-labelledby={props['aria-labelledby']}
          isAutofocussed={props.isAutofocussed}
          backspaceRemovesValue={props.backspaceRemovesValue}
          components={props.components}
          filterOption={props.filterOption}
          id={id}
          containerId={props.containerId}
          isClearable={props.isClearable}
          isDisabled={props.isDisabled}
          isReadOnly={props.isReadOnly}
          isOptionDisabled={props.isOptionDisabled}
          isMulti={props.isMulti}
          hasWarning={props.hasWarning}
          maxMenuHeight={props.maxMenuHeight}
          menuPortalTarget={props.menuPortalTarget}
          menuPortalZIndex={props.menuPortalZIndex}
          menuShouldBlockScroll={props.menuShouldBlockScroll}
          name={props.name}
          noOptionsMessage={props.noOptionsMessage}
          loadingMessage={props.loadingMessage}
          onBlur={props.onBlur}
          onChange={props.onChange}
          onFocus={props.onFocus}
          onInputChange={props.onInputChange}
          placeholder={props.placeholder}
          tabIndex={props.tabIndex}
          tabSelectsValue={props.tabSelectsValue}
          value={props.value}
          // Async react-select props
          loadOptions={props.loadOptions}
          cacheOptions={props.cacheOptions}
          showOptionGroupDivider={props.showOptionGroupDivider}
        />
        <FieldErrors
          errors={props.errors}
          isVisible={hasError}
          renderError={props.renderError}
        />
      </Spacings.Stack>
    </Constraints.Horizontal>
  );
};

SearchSelectField.displayName = 'SearchSelectField';
SearchSelectField.propTypes = {
  // SearchSelectField
  /**
   *Horizontal size limit of the input fields.
   */
  horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
  /**
   * Aria label (for assistive tech)
   */
  'aria-label': PropTypes.string,
  /**
   * HTML ID of an element that should be used as the label (for assistive tech)
   */
  'aria-labelledby': PropTypes.string,
  /**
   * The id of the search input. This forwarded as react-select's "inputId"
   */
  id: PropTypes.string,
  /**
   * The id to set on the SelectContainer component. This is forwarded as react-select's "id"
   */
  containerId: PropTypes.string,
  /**
   * Name of the HTML Input (optional - without this, no input will be rendered)
   */
  name: PropTypes.string,
  /**
   * Placeholder text for the select value
   */
  placeholder: PropTypes.string,
  /**
   * Map of components to overwrite the default ones, see [what components you can override](https://react-select.com/components)
   */
  components: PropTypes.objectOf(PropTypes.func),
  /**
   * Sets the tabIndex attribute on the input
   */
  tabIndex: PropTypes.string,
  /**
   * The value of the select; reflected by the selected option
   */
  value: (props, ...rest) =>
    props.isMulti
      ? PropTypes.arrayOf(
          PropTypes.shape({ value: PropTypes.string.isRequired })
        )(props, ...rest)
      : PropTypes.shape({ value: PropTypes.string.isRequired })(props, ...rest),
  /**
   * Remove the currently focused option when the user presses backspace
   */
  backspaceRemovesValue: PropTypes.bool,
  /**
   * Indicates the input field has an error
   */
  hasError: PropTypes.bool,
  /**
   * Indicates the input field has a warning
   */
  hasWarning: PropTypes.bool,
  /**
   * Is the select read-only
   */
  isReadOnly: PropTypes.bool,
  /**
   * Is the select disabled
   */
  isDisabled: PropTypes.bool,
  /**
   * Is the select value clearable
   */
  isClearable: PropTypes.bool,
  /**
   * Override the built-in logic to detect whether an option is disabled
   */
  isOptionDisabled: PropTypes.func,
  /**
   * Support multiple selected options
   */
  isMulti: PropTypes.bool,
  /**
   * Focus the control when it is mounted. Renamed autoFocus of react-select
   */
  isAutofocussed: PropTypes.bool,
  /**
   * Can be used to render a custom value when there are no options (either because of no search results, or all options have been used, or there were none in the first place). Gets called with `{ inputValue: String }`. `inputValue` will be an empty string when no search text is present.
   */
  noOptionsMessage: PropTypes.func,
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
  menuPortalZIndex: PropTypes.number,
  /**
   * whether the menu should block scroll while open
   */
  menuShouldBlockScroll: PropTypes.bool,
  /**
   * Determines if option groups will be separated by a divider
   */
  showOptionGroupDivider: PropTypes.bool,
  /**
   * Handle blur events on the control
   */
  onBlur: PropTypes.func,
  /**
   * Called with a fake event when value changes.
   * <br />
   * The event's `target.name` will be the `name` supplied in props. The event's `target.value` will hold the value. The value will be the selected option, or an array of options in case `isMulti` is `true`.
   * <br />
   * Signature: `(event, action) => void`
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Handle focus events on the control
   */
  onFocus: PropTypes.func,
  /**
   * Handle change events on the input
   * <br />
   * Signature: `(inputValue, action) => void`
   */
  onInputChange: PropTypes.func,
  /**
   * Select the currently focused option when the user presses tab
   */
  tabSelectsValue: PropTypes.bool,
  /**
   * Function that returns a promise, which is the set of options to be used once the promise resolves.
   */
  loadOptions: PropTypes.func.isRequired,
  /**
   * The text shown while the options are being loaded
   */
  loadingMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * If cacheOptions is truthy, then the loaded data will be cached. The cache will remain until cacheOptions changes value.
   */
  cacheOptions: PropTypes.any,
  /**
   * Custom method to filter whether an option should be displayed in the menu
   */
  filterOption: PropTypes.func,
  /**
   * The style of the an option in the dropdown menu. It could be single lined option or an option with more and custom info
   */
  optionType: PropTypes.oneOf([
    'single-property',
    'double-property',
    'multiple-properties',
  ]),
  /**
   * A map of errors. Error messages for known errors are rendered automatically.
   * <br />
   * Unknown errors will be forwarded to `renderError`
   */
  errors: PropTypes.shape({
    missing: PropTypes.bool,
  }),
  /**
   * Called with custom errors. This function can return a message which will be wrapped in an ErrorMessage. It can also return null to show no error.
   * <br />
   * Signature: `(key, error) => React.node`
   */
  renderError: PropTypes.func,
  /**
   * Indicates if the value is required. Shows an the "required asterisk" if so.
   */
  isRequired: PropTypes.bool,
  /**
   * Indicates whether the field was touched. Errors will only be shown when the field was touched.
   */
  touched: (props, ...rest) =>
    props.isMulti
      ? PropTypes.arrayOf(PropTypes.bool, ...rest)(props, ...rest)
      : PropTypes.bool(props, ...rest),
  // LabelField
  /**
   * Title of the label
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   * Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (e.g warn about uniqueness of a field, when it can only be set once), whereas `description` can describe it in more depth. Can also receive a `hintIcon`.
   */
  hint: requiredIf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    (props) => props.hintIcon
  ),
  /**
   * Provides a description for the title.
   */
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Function called when info button is pressed.
   * <br />
   * Info button will only be visible when this prop is passed.
   * <br />
   * Signature: `(event) => void`
   */
  onInfoButtonClick: PropTypes.func,
  /**
   * Icon to be displayed beside the hint text.
   * <br />
   * Will only get rendered when `hint` is passed as well.
   */
  hintIcon: PropTypes.node,
  /**
   * Badge to be displayed beside the label.
   * <br />
   * Might be used to display additional information about the content of the field (E.g verified email)
   */
  badge: PropTypes.node,
};

export default SearchSelectField;
