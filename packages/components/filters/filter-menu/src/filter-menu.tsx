import DropdownMenu from '@commercetools-uikit/dropdown-menu';
import { Badge } from './badge';
import { Chip } from './chip';
import { Footer } from './footer';
import { Header } from './header';

export type TFilterMenuProps = {
  /**
   * This is a stub prop
   */
  label?: string;
};
function FilterMenu(props: TFilterMenuProps) {
  return (
    <DropdownMenu
      triggerElement={
        <div>
          {props.label}
          <Chip />
          <Badge />
        </div>
      }
    >
      <Header />

      <Footer />
    </DropdownMenu>
  );
}

export default FilterMenu;
