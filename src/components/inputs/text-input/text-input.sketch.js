import React from 'react';
import { TextInput } from 'ui-kit';
import Combinations from '../../../../test/combinations';
import { Suite, Spec } from '../../../../test/percy';

export default (
  <Suite>
    <Combinations
      name="TextInput"
      config={{
        horizontalConstraint: ['m', 's'],
        disabled: [true, false],
        readOnly: [true, false],
      }}
      renderCombination={(name, combi) => (
        <Spec key={name} label={name}>
          <div data-sketch-symbol={name}>
            <TextInput
              value=""
              onChange={() => {}}
              horizontalConstraint={combi.horizontalConstraint}
              isDisabled={combi.disabled}
              isReadOnly={combi.readOnly}
            />
          </div>
        </Spec>
      )}
    />
  </Suite>
);
