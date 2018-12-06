import React from 'react';
import { TextInput } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

screenshot('TextInput', () => (
  <Suite>
    <Spec label="enabed">
      <TextInput
        value="Some value"
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="disabled">
      <TextInput
        value="Some value"
        onChange={() => {}}
        horizontalConstraint="m"
        isDisabled={true}
      />
    </Spec>
    <Spec label="placeholder">
      <TextInput
        value=""
        onChange={() => {}}
        horizontalConstraint="m"
        placeholder="Some placeholder"
      />
    </Spec>
    <Spec label="horizontalConstraint='l'">
      <TextInput value="" onChange={() => {}} horizontalConstraint="l" />
    </Spec>
  </Suite>
));
