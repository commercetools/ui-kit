import React from 'react';
import SecondaryIconButton from './secondary-icon-button';
import { InformationIcon } from '../../icons';

suite('SecondaryIconButton', () => {
  percySnapshot('regular', () => (
    <SecondaryIconButton
      icon={<InformationIcon />}
      label="A label text"
      onClick={() => {}}
    />
  ));

  percySnapshot('disabled', () => (
    <SecondaryIconButton
      icon={<InformationIcon />}
      label="A label text"
      onClick={() => {}}
      isDisabled={true}
    />
  ));
});
