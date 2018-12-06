import React from 'react';
import { InformationIcon, GhostButton } from '../../../../dist/ui-kit.esm';
import { Cases, Case, screenshot } from '../../../../test/percy';

screenshot('GhostButton', () => (
  <Cases>
    <Case label="regular">
      <GhostButton label="A label text" onClick={() => {}} />
    </Case>

    <Case label="disabled">
      <GhostButton label="A label text" onClick={() => {}} isDisabled={true} />
    </Case>

    <Case label="with iconLeft">
      <GhostButton
        label="A label text"
        onClick={() => {}}
        iconLeft={<InformationIcon />}
      />
    </Case>

    <Case label="as toggle button (not toggled)">
      <GhostButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
      />
    </Case>

    <Case label="as toggle button (toggled)">
      <GhostButton
        label="A label text"
        onClick={() => {}}
        isToggleButton={true}
        isToggled={true}
      />
    </Case>
  </Cases>
));
