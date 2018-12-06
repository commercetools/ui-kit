import React from 'react';
import { TextInput } from '../../../../dist/ui-kit.esm';
import { Cases, Case, screenshot } from '../../../../test/percy';

screenshot('TextInput', () => (
  <Cases>
    <Case label="enabed">
      <TextInput
        value="Some value"
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Case>
    <Case label="disabled">
      <TextInput
        value="Some value"
        onChange={() => {}}
        horizontalConstraint="m"
        isDisabled={true}
      />
    </Case>
    <Case label="placeholder">
      <TextInput
        value=""
        onChange={() => {}}
        horizontalConstraint="m"
        placeholder="Some placeholder"
      />
    </Case>
    <Case label="horizontalConstraint='l'">
      <TextInput value="" onChange={() => {}} horizontalConstraint="l" />
    </Case>
  </Cases>
));
