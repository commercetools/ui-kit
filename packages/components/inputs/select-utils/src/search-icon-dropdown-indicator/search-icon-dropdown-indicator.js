import React from 'react';
import { components } from 'react-select';
import { SearchIcon } from '@commercetools-uikit/icons';

const SearchIconDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <SearchIcon color={'neutral60'} size="big" />
    </components.DropdownIndicator>
  );
};

SearchIconDropdownIndicator.displayName = 'SearchIconDropdownIndicator';

export default SearchIconDropdownIndicator;
