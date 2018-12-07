import React from 'react';
import { Toggle } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

screenshot('Toggle', () => (
  <Suite>
    <Spec label="Default">
      <Toggle />
    </Spec>
    <Spec label="Default - disabled">
      <Toggle isDisabled={true} />
    </Spec>
    <Spec label="Default - checked">
      <Toggle isChecked={true} />
    </Spec>
    <Spec label="Default - checked - disabled">
      <Toggle isDisabled={true} isChecked={true} />
    </Spec>
    <Spec label="Small">
      <Toggle size="small" />
    </Spec>
    <Spec label="Small - disabled">
      <Toggle size="small" isDisabled={true} />
    </Spec>
    <Spec label="Small - checked">
      <Toggle size="small" isChecked={true} />
    </Spec>
    <Spec label="Small - checked - disabled">
      <Toggle size="small" isDisabled={true} isChecked={true} />
    </Spec>
  </Suite>
));
