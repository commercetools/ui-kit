import React from 'react';
import InformationIcon from '@commercetools-frontend/ui-kit/dist/esm/InformationIcon';
import SecondaryIconButton from '@commercetools-frontend/ui-kit/dist/esm/SecondaryIconButton';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/secondary-icon-button';

export const component = () => (
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
);
