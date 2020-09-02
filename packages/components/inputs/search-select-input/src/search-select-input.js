import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { ThemeContext } from '@emotion/core';
import { SafeHTMLElement } from '@commercetools-uikit/utils';
import { SearchIconDropdownIndicator } from '@commercetools-uikit/select-utils';
import AsyncSelectInput from '@commercetools-uikit/async-select-input';
import messages from '../../../../../src/components/internals/messages/select';
import createSelectStyles from '../../../../../src/components/internals/create-select-styles';

const useTheme = () => useContext(ThemeContext);

const SearchSelectInput = (props) => {
  const intl = useIntl();
  const theme = useTheme();
  const noOptionsMessageWithOutInputValue = props.initialSuggestionMessage
    ? props.initialSuggestionMessage()
    : intl.formatMessage(messages.noOptionsMessageWithoutInputValue);
  const noOptionsMessageWithInputValue = props.noOptionsMessage
    ? props.noOptionsMessage()
    : intl.formatMessage(messages.noOptionsMessageWithInputValue);

  return (
    <AsyncSelectInput
      horizontalConstraint={props.horizontalConstraint}
      // react-select uses "id" (for the container) and "inputId" (for the input),
      // but we use "id" (for the input) and "containerId" (for the container)
      // instead.
      // This makes it easier to less confusing to use with <label />s.
      id={props.containerId}
      inputId={props.id}
      aria-label={props['aria-label']}
      aria-labelledby={props['aria-labelledby']}
      name={props.name}
      placeholder={props.placeholder}
      tabIndex={props.tabIndex}
      iconLeft={props.iconLeft}
      inputValue={props.inputValue}
      value={props.value}
      backspaceRemovesValue={props.backspaceRemovesValue}
      hasWarning={props.hasWarning}
      hasError={props.hasError}
      isDisabled={props.isDisabled || props.isReadOnly}
      isClearable={props.isClearable}
      isOptionDisabled={props.isOptionDisabled}
      isMulti={props.isMulti}
      isSearchable={true}
      autoFocus={props.isAutofocussed}
      components={{
        ...props.components,
        DropdownIndicator: SearchIconDropdownIndicator,
      }}
      noOptionsMessage={({ inputValue }) =>
        inputValue === ''
          ? noOptionsMessageWithOutInputValue
          : noOptionsMessageWithInputValue
      }
      styles={createSelectStyles(
        {
          menuPortalZIndex: props.menuPortalZIndex,
        },
        theme
      )}
      showOptionGroupDivider={false}
      maxMenuHeight={props.maxMenuHeight}
      menuPortalTarget={props.menuPortalTarget}
      menuShouldBlockScroll={props.menuShouldBlockScroll}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      onChange={props.onChange}
      onInputChange={props.onInputChange}
      tabSelectsValue={props.tabSelectsValue}
      cacheOptions={props.cacheOptions}
      loadOptions={props.loadOptions}
      defaultOptions={false}
      filterOption={props.filterOption}
      onSearchIconClick={async (value) => props.loadOptions(value)}
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
  cacheOptions: PropTypes.any,
  filterOption: PropTypes.func,

  // props that cant be changed by the user
  // showOptionGroupDivider: PropTypes.bool,
  // isSearchable: PropTypes.bool,
  // defaultOptions: PropTypes.bool,
};

export default SearchSelectInput;
