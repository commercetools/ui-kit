import React from 'react';
import {
  SecondaryIconButton,
  InformationIcon,
} from '../../../../dist/ui-kit.esm';
import { Cases, Case, screenshot } from '../../../../test/percy';

screenshot('SecondaryIconButton', () => (
  <Cases>
    <Case label="regular">
      <SecondaryIconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
      />
    </Case>
    <Case label="disabled">
      <SecondaryIconButton
        icon={<InformationIcon />}
        label="A label text"
        onClick={() => {}}
        isDisabled={true}
      />
    </Case>
  </Cases>
));
