import React from 'react';
import {
  PrimaryActionDropdown,
  PrimaryActionDropdownOption,
  AddBoldIcon,
} from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/primary-action-dropdown';

export const component = () => (
  <Suite>
    <Spec label="regular">
      <PrimaryActionDropdown>
        <PrimaryActionDropdownOption
          iconLeft={<AddBoldIcon />}
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
          iconLeft={<AddBoldIcon />}
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
