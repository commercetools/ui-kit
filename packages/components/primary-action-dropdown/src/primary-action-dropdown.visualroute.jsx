import { Route, Routes } from 'react-router-dom';
import {
  PrimaryActionDropdown,
  PrimaryActionDropdownOption,
  PlusBoldIcon,
} from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/primary-action-dropdown';

const InteractionRoute = () => (
  <Suite>
    <Spec label="when open">
      <PrimaryActionDropdown>
        <PrimaryActionDropdownOption
          iconLeft={<PlusBoldIcon />}
          onClick={() => {}}
        >
          Primary option
        </PrimaryActionDropdownOption>
        <PrimaryActionDropdownOption onClick={() => {}}>
          Another option
        </PrimaryActionDropdownOption>
        <PrimaryActionDropdownOption isDisabled onClick={() => {}}>
          Disabled option
        </PrimaryActionDropdownOption>
      </PrimaryActionDropdown>
    </Spec>
  </Suite>
);

const DefaultRoute = () => (
  <Suite>
    <Spec label="regular">
      <PrimaryActionDropdown>
        <PrimaryActionDropdownOption
          iconLeft={<PlusBoldIcon />}
          onClick={() => {}}
        >
          Primary option
        </PrimaryActionDropdownOption>
        <PrimaryActionDropdownOption onClick={() => {}}>
          Another option
        </PrimaryActionDropdownOption>
      </PrimaryActionDropdown>
    </Spec>
    <Spec label="when all options are disabled">
      <PrimaryActionDropdown>
        <PrimaryActionDropdownOption
          isDisabled={true}
          iconLeft={<PlusBoldIcon />}
          onClick={() => {}}
        >
          Primary option
        </PrimaryActionDropdownOption>
        <PrimaryActionDropdownOption isDisabled={true} onClick={() => {}}>
          Another option
        </PrimaryActionDropdownOption>
      </PrimaryActionDropdown>
    </Spec>
  </Suite>
);

export const component = () => (
  <Routes>
    <Route path={`${routePath}/interaction`} component={InteractionRoute} />
    <Route path={routePath} component={DefaultRoute} />
  </Routes>
);
