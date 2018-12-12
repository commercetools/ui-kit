import React from 'react';
import { LinkButton, InformationIcon } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

screenshot('LinkButton', () => (
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
));
