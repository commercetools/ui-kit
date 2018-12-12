import React from 'react';
import {
  PrimaryActionDropdown,
  PrimaryActionDropdownOption,
  AddBoldIcon,
} from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

screenshot('PrimaryActionDropdown', () => (
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
));
