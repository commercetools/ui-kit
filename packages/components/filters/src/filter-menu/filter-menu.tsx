import { ReactNode, useState } from 'react';
import DropdownMenu from '@commercetools-uikit/dropdown-menu';
import { Footer } from './footer';
import { Header } from './header';
import { TriggerButton } from './trigger-button';
import SelectInput from '@commercetools-uikit/select-input';

export type TFilterMenuProps = {
  /**
   * This is a stub prop!
   */
  label: string;
};
function FilterMenu(props: TFilterMenuProps) {
  const [headerSelectOptions, setHeaderSelectOptions] = useState<string>();
  const renderOperatorsInput = (): ReactNode => {
    const operatorOptions = [
      { value: 'is', label: 'is' },
      { value: 'is not', label: 'is NOT' },
    ];

    return (
      <SelectInput
        appearance="quiet"
        isCondensed={true}
        isSearchable={false}
        value={
          // Default to the first option if no value is passed
          headerSelectOptions ? headerSelectOptions : operatorOptions[0].value
        }
        options={operatorOptions}
        onChange={(event) => {
          setHeaderSelectOptions(event.target.value as string);
        }}
      />
    );
  };

  return (
    <DropdownMenu triggerElement={<TriggerButton label={props.label} />}>
      <Header
        // For storybook purposes, we are not using the actual props - will be taken off eventually.
        headerLabel="Size"
        renderOperatorsInput={renderOperatorsInput}
        onSort={() => {}}
        menuHeaderWidth={'100px'}
      />
      <p>text</p>
      <p>text</p>
      <p>text</p>
      <p>text</p>
      <p>text</p>
      <Footer />
    </DropdownMenu>
  );
}

export default FilterMenu;
