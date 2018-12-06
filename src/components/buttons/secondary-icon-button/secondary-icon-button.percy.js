import React from 'react';
import {
  SecondaryIconButton,
  InformationIcon,
} from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

screenshot('SecondaryIconButton', () => (
  <Suite>
    <Spec label="regular">
      <SecondaryIconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
      />
    </Spec>
    <Spec label="disabled">
      <SecondaryIconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        isDisabled={true}
      />
    </Spec>
  </Suite>
));
