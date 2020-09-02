import React from 'react';
import PropTypes from 'prop-types';
import {
  SafeHTMLElement,
  filterAriaAttributes,
} from '@commercetools-uikit/utils';
import SearchIconDropdownIndicator from '../../../../../src/components/internals/search-icon-dropdown-indicator';
import AsyncSelectInput from '../../async-select-input';
import { SearchSelectInputOption } from './search-select-input-option';
import { SELECT_DROPDOWN_OPTION_TYPES } from './constants';

const SearchSelectInput = (props) => {
  return (
    <AsyncSelectInput
      {...props}
      {...filterAriaAttributes(props)}
      components={{
        // eslint-disable-next-line react/display-name
        Option: (optionInnerProps) => (
          <SearchSelectInputOption
            optionType={props.optionType}
            optionInnerProps={optionInnerProps}
          />
        ),
        ...props.components,
        DropdownIndicator: SearchIconDropdownIndicator,
      }}
      noOptionsMessage={props.noOptionsMessage}
      isSearchable={true}
      showOptionGroupDivider={false}
    />
  );
};

SearchSelectInput.displayName = 'SearchSelectInput';

SearchSelectInput.defaultProps = {
  // Using "null" will ensure that the currently selected value disappears in
  // case "undefined" gets passed as the next value
  value: null,
  isSearchable: true,
  menuPortalZIndex: 1,
  maxMenuHeight: '220',
};

SearchSelectInput.propTypes = {
  horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
  // react-select base props
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  // This forwarded as react-select's "inputId"
  id: PropTypes.string,
  // This is forwarded as react-select's "id"
  containerId: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  components: PropTypes.objectOf(PropTypes.func),
  tabIndex: PropTypes.string,
  iconLeft: PropTypes.node,
  inputValue: PropTypes.string,
  value: (props, ...rest) =>
    props.isMulti
      ? PropTypes.arrayOf(
          PropTypes.shape({ value: PropTypes.string.isRequired })
        )(props, ...rest)
      : PropTypes.shape({ value: PropTypes.string.isRequired })(props, ...rest),
  backspaceRemovesValue: PropTypes.bool,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  isOptionDisabled: PropTypes.func,
  isMulti: PropTypes.bool,
  // renamed autoFocus of react-select
  isAutofocussed: PropTypes.bool,

  // dropdown menu props
  noOptionsMessage: PropTypes.func,
  initialSuggestionMessage: PropTypes.func,
  maxMenuHeight: PropTypes.number,
  menuPortalTarget: PropTypes.instanceOf(SafeHTMLElement),
  menuPortalZIndex: PropTypes.number.isRequired,
  menuShouldBlockScroll: PropTypes.bool,

  // input actions
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onInputChange: PropTypes.func,
  tabSelectsValue: PropTypes.bool,

  // Async props
  loadOptions: PropTypes.func.isRequired,
  loadingMessage: PropTypes.func,
  cacheOptions: PropTypes.any,
  filterOption: PropTypes.func,

  // options porps
  optionType: PropTypes.oneOf(Object.values(SELECT_DROPDOWN_OPTION_TYPES)),
};

export default SearchSelectInput;
