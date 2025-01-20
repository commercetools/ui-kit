import { components, DropdownIndicatorProps, GroupBase } from 'react-select';
import { SearchIcon } from '@commercetools-uikit/icons';
import { TSelectInputCustomComponentProps } from '../types';

export type TDropdownIndicatorProps<
  Option = unknown,
  isMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> = TSelectInputCustomComponentProps<
  DropdownIndicatorProps<Option, isMulti, Group>,
  Option,
  isMulti,
  Group
>;

const SearchIconDropdownIndicator = <
  Option = unknown,
  isMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: TDropdownIndicatorProps<Option, isMulti, Group>
) => {
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
