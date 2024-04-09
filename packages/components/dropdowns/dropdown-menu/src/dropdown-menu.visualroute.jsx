import {
  DropdownMenu,
  SecondaryButton,
  Spacings,
} from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

export const routePath = '/dropdown-menu';

export const component = () => (
  <Suite>
    <Spec label="default dropdown menu">
      <DropdownMenu triggerElement={<SecondaryButton label="Trigger" />}>
        <Spacings.Stack>
          <h2>Some headline</h2>
          <p>Some content</p>
        </Spacings.Stack>
      </DropdownMenu>
    </Spec>

    <Spec label="opened default menu dropdown">
      <DropdownMenu
        menuType="list"
        triggerElement={<SecondaryButton label="Trigger" />}
      >
        <DropdownMenu.ListMenuItem>
          Option 1
        </DropdownMenu.ListMenuItem>
        <DropdownMenu.ListMenuItem isDisabled>
          Option 2
        </DropdownMenu.ListMenuItem>
      </DropdownMenu>
    </Spec>

  </Suite>
);
