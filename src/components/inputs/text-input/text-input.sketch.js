import React from 'react';
import { TextInput } from 'ui-kit';
import Combinations from '../../../../test/combinations';
import { Suite, SketchSpec } from '../../../../test/percy';

export default (
  <Suite>
    <SketchSpec label="TextInput">
      <Combinations
        name="TextInput"
        config={{
          horizontalConstraint: ['m', 's'],
          disabled: [true, false],
          readOnly: [true, false],
        }}
        render={(combi, name) => (
          <div key={name} data-sketch-symbol={name}>
            <TextInput
              value=""
              onChange={() => {}}
              horizontalConstraint={combi.horizontalConstraint}
              isDisabled={combi.disabled}
              isReadOnly={combi.readOnly}
            />
          </div>
        )}
      />
    </SketchSpec>
  </Suite>
);
