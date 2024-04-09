import CheckboxInput from '@commercetools-uikit/checkbox-input';
import DropdownMenu from '@commercetools-uikit/dropdown-menu';
import IconButton from '@commercetools-uikit/icon-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import Text from '@commercetools-uikit/text';
import { ColumnsIcon, FilterIcon } from '@commercetools-uikit/icons';

export const ListDropdownExample = () => {
  return (
    <DropdownMenu
      triggerElement={<IconButton icon={<ColumnsIcon />} label="list" />}
      menuHorizontalConstraint={6}
      menuPosition="left"
      menuType="list"
    >
      <DropdownMenu.ListMenuItem onClick={() => {}}>
        Option 1
      </DropdownMenu.ListMenuItem>
      <DropdownMenu.ListMenuItem onClick={() => {}} isDisabled>
        Option 2
      </DropdownMenu.ListMenuItem>
      <DropdownMenu.ListMenuItem onClick={() => {}}>
        Option 3
      </DropdownMenu.ListMenuItem>
    </DropdownMenu>
  );
};

export const CustomDropdownExample = () => {
  return (
    <DropdownMenu
      triggerElement={
        <SecondaryButton label="Filters" iconLeft={<FilterIcon />} />
      }
      menuHorizontalConstraint={6}
      menuPosition="right"
    >
      <SpacingsStack scale="m">
        <Text.Body>Store</Text.Body>
        <CheckboxInput isChecked value="store" onChange={(event) => {}}>
          Canada (FR)
        </CheckboxInput>
      </SpacingsStack>
    </DropdownMenu>
  );
};
