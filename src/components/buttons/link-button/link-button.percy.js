import React from 'react';
import { LinkButton, InformationIcon } from '../../../../dist/ui-kit.esm';
import { Cases, Case, screenshot } from '../../../../test/percy';

screenshot('LinkButton', () => (
  <Cases>
    <Case label="regular">
      <LinkButton label="A label text" to="/" />
    </Case>
    <Case label="disabled">
      <LinkButton label="A label text" to="/" isDisabled={true} />
    </Case>

    <Case label="with icon left">
      <LinkButton label="A label text" to="/" icon={<InformationIcon />} />
    </Case>

    <Case label="with icon left and disabled">
      <LinkButton
        label="A label text"
        to="/"
        isDisabled={true}
        icon={<InformationIcon />}
      />
    </Case>
  </Cases>
));
