import React from 'react';
import { Stamp } from '../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../test/percy';

screenshot('Stamp', () => (
  <Suite>
    <Spec label="when critical">
      <Stamp tone="critical">Critical</Stamp>
    </Spec>
    <Spec label="when positive">
      <Stamp tone="positive">Positive</Stamp>
    </Spec>
    <Spec label="when warning">
      <Stamp tone="warning">Warning</Stamp>
    </Spec>
    <Spec label="when information">
      <Stamp tone="information">Information</Stamp>
    </Spec>
    <Spec label="when primary">
      <Stamp tone="primary">Primary</Stamp>
    </Spec>
    <Spec label="when secondary">
      <Stamp tone="secondary">Secondary</Stamp>
    </Spec>
  </Suite>
));
