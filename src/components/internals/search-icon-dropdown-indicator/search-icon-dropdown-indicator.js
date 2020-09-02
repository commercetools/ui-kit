import React from 'react';
import PropTypes from 'prop-types';
import { SearchIcon } from '@commercetools-uikit/icons';
import { SearchIconWrapper } from './search-icon-dropdown-indicator.styles';

const handleMouseDown = (event, props) => {
  event.stopPropagation();
  event.preventDefault();
  return props.selectProps.onSearchIconClick(props.selectProps.inputValue);
};

const SearchDropdownIndicator = (props) => {
  return (
    <SearchIconWrapper
      onMouseDown={(event) =>
        !props.isDisabled && handleMouseDown(event, props)
      }
    >
      <SearchIcon
        color={props.isDisabled ? 'neutral60' : undefined}
        size="big"
      />
    </SearchIconWrapper>
  );
};

SearchDropdownIndicator.displayName = 'SearchDropdownIndicator';
SearchDropdownIndicator.propTypes = {
  isDisabled: PropTypes.bool,
  selectProps: PropTypes.shape({
    onSearchIconClick: PropTypes.func.isRequired,
    inputValue: PropTypes.string,
  }),
};

export default SearchDropdownIndicator;
