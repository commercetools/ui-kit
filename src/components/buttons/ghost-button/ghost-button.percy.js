import React from 'react';
import GhostButton from './ghost-button';
import { InformationIcon } from '../../icons';

suite('GhostButton', () => {
  percySnapshot('regular', () => (
    <GhostButton label="A label text" onClick={() => {}} />
  ));

  percySnapshot('disabled', () => (
    <GhostButton label="A label text" onClick={() => {}} isDisabled={true} />
  ));

  percySnapshot('with iconLeft', () => (
    <GhostButton
      label="A label text"
      onClick={() => {}}
      iconLeft={<InformationIcon />}
    />
  ));

  percySnapshot('as toggle button (not toggled)', () => (
    <GhostButton
      label="A label text"
      onClick={() => {}}
      isToggleButton={true}
    />
  ));

  percySnapshot('as toggle button (toggled)', () => (
    <GhostButton
      label="A label text"
      onClick={() => {}}
      isToggleButton={true}
      isToggled={true}
    />
  ));
});
