import DropdownMenu from '@commercetools-uikit/dropdown-menu';
import { Footer } from './footer';
import { Header } from './header';
import { TriggerButton } from './trigger-button';

export type TFilterMenuProps = {
  /**
   * This is a stub prop
   */
  label: string;
};
function FilterMenu(props: TFilterMenuProps) {
  return (
    <DropdownMenu triggerElement={<TriggerButton label={props.label} />}>
      <Header />
      <Footer />
    </DropdownMenu>
  );
}

export default FilterMenu;
