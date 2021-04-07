import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { SafeHTMLElement } from '@commercetools-uikit/utils';
import AsyncSelectInput from '@commercetools-uikit/async-select-input';
import {
  CustomSelectInputOption,
  SearchIconDropdownIndicator,
} from '@commercetools-uikit/select-utils';
import messages from './messages';
import { SearchSelectInputWrapper } from './search-select-input.styles';

const SearchSelectInput = (props) => {
  const intl = useIntl();
  const noOptionsMessage =
    props.noOptionsMessage ||
    (() => intl.formatMessage(messages.noOptionsMessage));
  const loadingMessage =
    props.loadingMessage || intl.formatMessage(messages.loadingOptionsMessage);
  const placeholder =
    props.placeholder || intl.formatMessage(messages.placeholderMessage);
  const optionType = props.optionType;

  const components = React.useMemo(() => {
    return {
      // eslint-disable-next-line react/display-name
      Option: (optionInnerProps) => (
        <CustomSelectInputOption
          optionType={optionType}
          optionInnerProps={optionInnerProps}
        />
      ),
      ...props.components,
      DropdownIndicator: SearchIconDropdownIndicator,
    };
  }, [props.components, optionType]);

  return (
    <SearchSelectInputWrapper
      isDisabled={props.isDisabled}
      isReadOnly={props.isReadOnly}
    >
      <AsyncSelectInput
        {...props}
        components={components}
        placeholder={placeholder}
        iconLeft={undefined}
        loadingMessage={loadingMessage}
        noOptionsMessage={noOptionsMessage}
        isSearchable={true}
      />
    </SearchSelectInputWrapper>
  );
};

SearchSelectInput.propTypes = {
  /**
   *Horizontal size limit of the input fields.
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
  menuPortalZIndex: PropTypes.number.isRequired,
  /**
   * whether the menu should block scroll while open
   */
  menuShouldBlockScroll: PropTypes.bool,
  /**
   * Determines if option groups will be separated by a divider
   */
  showOptionGroupDivider: PropTypes.bool,
  /**
   * The default set of options to show before the user starts searching. When set to `true`, the results for `loadOptions('')` will be autoloaded.
   */
  defaultOptions: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string,
      })
    ),
  ]),
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
};
SearchSelectInput.defaultProps = {
  value: null,
  menuPortalZIndex: 1,
  maxMenuHeight: 220,
};
SearchSelectInput.displayName = 'SearchSelectInput';

export default SearchSelectInput;
