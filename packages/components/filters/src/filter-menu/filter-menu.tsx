import DropdownMenu from '@commercetools-uikit/dropdown-menu';
import { Footer } from './footer';
import { Header } from './header';
import { TriggerButton } from './trigger-button';

export type TFilterMenuProps = {
  /**
   * This is a stub prop!
   */
  label: string;
};
function FilterMenu(props: TFilterMenuProps) {
  return (
    <DropdownMenu triggerElement={<TriggerButton label={props.label} />}>
      <Header
        // For storybook purposes, we are not using the actual props - will be taken off eventually.
        label={props.label}
        operatorOptions={[
          { value: 'is', label: 'is' },
          { value: 'is not', label: 'is NOT' },
        ]}
        onSelectOperand={(value) => value}
        renderOperatorsInput={() => {}}
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
