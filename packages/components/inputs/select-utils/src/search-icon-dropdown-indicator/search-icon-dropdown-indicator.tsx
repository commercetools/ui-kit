import { components, DropdownIndicatorProps } from 'react-select';
import { SearchIcon } from '@commercetools-uikit/icons';
import { TSelectInputCustomComponentProps } from '../types';

export type TDropdownIndicatorProps =
  TSelectInputCustomComponentProps<DropdownIndicatorProps>;

const SearchIconDropdownIndicator = (props: TDropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <SearchIcon
        color={'neutral60'}
        size={props.selectProps.isCondensed ? 'medium' : 'big'}
      />
    </components.DropdownIndicator>
  );
};

SearchIconDropdownIndicator.displayName = 'SearchIconDropdownIndicator';

export default SearchIconDropdownIndicator;
