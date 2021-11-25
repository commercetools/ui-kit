import { components, DropdownIndicatorProps } from 'react-select';
import { SearchIcon } from '@commercetools-uikit/icons';

const SearchIconDropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <SearchIcon color={'neutral60'} size="big" />
    </components.DropdownIndicator>
  );
};

SearchIconDropdownIndicator.displayName = 'SearchIconDropdownIndicator';

export default SearchIconDropdownIndicator;
