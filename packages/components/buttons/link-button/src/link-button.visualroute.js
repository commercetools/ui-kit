import React from 'react';
import { LinkButton, InformationIcon } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

export const routePath = '/link-button';

export const component = () => (
  <Suite>
    <Spec label="regular">
      <LinkButton label="A label text" to="/" />
    </Spec>
    <Spec label="disabled">
      <LinkButton label="A label text" to="/" isDisabled={true} />
    </Spec>

    <Spec label="with icon left">
      <LinkButton label="A label text" to="/" iconLeft={<InformationIcon />} />
    </Spec>

    <Spec label="with icon left and disabled">
      <LinkButton
        label="A label text"
        to="/"
        isDisabled={true}
        iconLeft={<InformationIcon />}
      />
    </Spec>
  </Suite>
);
