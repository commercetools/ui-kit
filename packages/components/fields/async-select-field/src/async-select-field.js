import { Component } from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import {
  filterDataAttributes,
  getFieldId,
  createSequentialId,
  SafeHTMLElement,
} from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import FieldLabel from '@commercetools-uikit/field-label';
import AsyncSelectInput from '@commercetools-uikit/async-select-input';
import FieldErrors from '@commercetools-uikit/field-errors';

const sequentialId = createSequentialId('async-select-field-');

const hasErrors = (errors) => errors && Object.values(errors).some(Boolean);

export default class AsyncSelectField extends Component {
  static displayName = 'AsyncSelectField';

  static propTypes = {
    // AsyncSelectField
    /**
     * Used as HTML id property. An id is auto-generated when it is not specified.
     */
    id: PropTypes.string,
    /**
     * Horizontal size limit of the input fields.
     */
    horizontalConstraint: PropTypes.oneOf([
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

    // AsyncSelectInput
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
    /**
     * Map of components to overwrite the default ones, see [what components you can override](https://react-select.com/components)
     */
    components: PropTypes.objectOf(PropTypes.func),
    /**
     * Custom method to filter whether an option should be displayed in the menu
     */
    filterOption: PropTypes.func,
    /**
     *  The id to set on the SelectContainer component
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
     * Is the select read-only
     */
    isReadOnly: PropTypes.bool,
    /**
     * Override the built-in logic to detect whether an option is disabled
     * <br />
     * Signature: `(option, options) => boolean`
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
    hasWarning: PropTypes.bool,
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
     * Name of the HTML Input (optional - without this, no input will be rendered)
     */
    name: PropTypes.string,
    /**
     *  Can be used to render a custom value when there are no options (either because of no search results, or all options have been used, or there were none in the first place).
     * <br />
     *  Gets called with `{ inputValue: String }`. `inputValue` will be an empty string when no search text is present.
     * Signature: `({ inputValue }) => React.node `
     */
    noOptionsMessage: PropTypes.func,
    /**
     * Handle blur events on the control
     */
    onBlur: PropTypes.func,
    /**
     * Called with a fake event when value changes.
     * <br />
     * The event's `target.name` will be the name supplied in props. The event's `target.value` will hold the value. The value will be the selected option, or an array of options in case `isMulti` is `true`.
     * <br />
     * Signature: `(event) => void`
     */
    onChange: PropTypes.func,
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
        : PropTypes.shape({ value: PropTypes.string.isRequired })(
            props,
            ...rest
          ),

    showOptionGroupDivider: PropTypes.bool,

    // Async props
    /**
     * The default set of options to show before the user starts searching.
     * <br />
     * When set to `true`, the results for `loadOptions('')` will be autoloaded.
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
    /**
     * Icon to display on the left of the placeholder text and selected value. Has no effect when isMulti is enabled.
     */
    iconLeft: PropTypes.node,
  };

  static defaultProps = {
    horizontalConstraint: 'scale',
  };

  state = {
    // We generate an id in case no id is provided by the parent to attach the
    // label to the input component.
    id: this.props.id,
  };

  static getDerivedStateFromProps = (props, state) => ({
    id: getFieldId(props, state, sequentialId),
  });

  render() {
    const hasError =
      AsyncSelectInput.isTouched(this.props.touched) &&
      hasErrors(this.props.errors);
    return (
      <Constraints.Horizontal max={this.props.horizontalConstraint}>
        <Spacings.Stack scale="xs">
          <FieldLabel
            title={this.props.title}
            hint={this.props.hint}
            description={this.props.description}
            onInfoButtonClick={this.props.onInfoButtonClick}
            hintIcon={this.props.hintIcon}
            badge={this.props.badge}
            hasRequiredIndicator={this.props.isRequired}
            htmlFor={this.state.id}
          />
          <AsyncSelectInput
            horizontalConstraint="scale"
            hasError={hasError}
            aria-label={this.props['aria-label']}
            aria-labelledby={this.props['aria-labelledby']}
            isAutofocussed={this.props.isAutofocussed}
            backspaceRemovesValue={this.props.backspaceRemovesValue}
            components={this.props.components}
            filterOption={this.props.filterOption}
            id={this.state.id}
            containerId={this.props.containerId}
            isClearable={this.props.isClearable}
            isDisabled={this.props.isDisabled}
            isReadOnly={this.props.isReadOnly}
            isOptionDisabled={this.props.isOptionDisabled}
            isMulti={this.props.isMulti}
            isSearchable={this.props.isSearchable}
            hasWarning={this.props.hasWarning}
            maxMenuHeight={this.props.maxMenuHeight}
            menuPortalTarget={this.props.menuPortalTarget}
            menuPortalZIndex={this.props.menuPortalZIndex}
            menuShouldBlockScroll={this.props.menuShouldBlockScroll}
            name={this.props.name}
            noOptionsMessage={this.props.noOptionsMessage}
            loadingMessage={this.props.loadingMessage}
            onBlur={this.props.onBlur}
            onChange={this.props.onChange}
            onFocus={this.props.onFocus}
            onInputChange={this.props.onInputChange}
            placeholder={this.props.placeholder}
            tabIndex={this.props.tabIndex}
            tabSelectsValue={this.props.tabSelectsValue}
            value={this.props.value}
            // Async react-select props
            defaultOptions={this.props.defaultOptions}
            loadOptions={this.props.loadOptions}
            cacheOptions={this.props.cacheOptions}
            showOptionGroupDivider={this.props.showOptionGroupDivider}
            iconLeft={this.props.iconLeft}
            {...filterDataAttributes(this.props)}
          />
          <FieldErrors
            errors={this.props.errors}
            isVisible={hasError}
            renderError={this.props.renderError}
          />
        </Spacings.Stack>
      </Constraints.Horizontal>
    );
  }
}
