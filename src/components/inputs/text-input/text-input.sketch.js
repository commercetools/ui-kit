import React from 'react';
import { TextInput } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export default (
  <Suite>
    <Spec label="minimal">
      <div data-sketch-symbol="TextInput/regular">
        <TextInput value="" onChange={() => {}} horizontalConstraint="m" />
      </div>
    </Spec>
    <Spec label="when disabled">
      <div data-sketch-symbol="TextInput/disabled">
        <TextInput
          isDisabled={true}
          value=""
          onChange={() => {}}
          horizontalConstraint="m"
        />
      </div>
    </Spec>
    <Spec label="when read-only">
      <div data-sketch-symbol="TextInput/read-only">
        <TextInput
          isReadOnly={true}
          value=""
          onChange={() => {}}
          horizontalConstraint="m"
        />
      </div>
    </Spec>
  </Suite>
);
