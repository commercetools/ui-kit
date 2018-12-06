import React from 'react';
import { InformationIcon, GhostButton } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

screenshot('GhostButton', () => (
  <Suite>
    <Spec label="regular">
      <GhostButton label="A label text" onClick={() => {}} />
    </Spec>

    <Spec label="disabled">
      <GhostButton label="A label text" onClick={() => {}} isDisabled={true} />
    </Spec>

    <Spec label="with iconLeft">
      <GhostButton
        label="A label text"
        onClick={() => {}}
        iconLeft={<InformationIcon />}
      />
    </Spec>

    <Spec label="as toggle button (not toggled)">
      <GhostButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
      />
    </Spec>

    <Spec label="as toggle button (toggled)">
      <GhostButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
      />
    </Spec>
  </Suite>
));
