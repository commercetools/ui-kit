import React from 'react';
import { TextField } from 'ui-kit';
import Combinations from '../../../../test/combinations';
import { Suite, SketchSpec } from '../../../../test/percy';

export default (
  <Suite>
    <SketchSpec label="TextField">
      <Combinations
        name="TextField"
        config={{
          horizontalConstraint: ['s', 'm', 'l', 'xl', 'scale'],
          title: [true, false],
          description: [true, false],
          onInfoButtonClick: [true, false],
          disabled: [true, false],
          readOnly: [true, false],
          renderError: [true, false],
        }}
        render={(combi, name) => (
          <div key={name} data-sketch-symbol={name}>
            <TextField
              value=""
              onChange={() => {}}
              horizontalConstraint={combi.horizontalConstraint}
              title={combi.title ? 'Title' : undefined}
              description={combi.description ? 'Description' : undefined}
              onInfoButtonClick={combi.onInfoButtonClick ? () => {} : undefined}
              isDisabled={combi.disabled}
              isReadOnly={combi.readOnly}
              touched={combi.renderError ? true : undefined}
              errors={combi.renderError ? { custom: true } : undefined}
              renderError={
                combi.renderError ? () => 'This field is required' : undefined
              }
            />
          </div>
        )}
      />
    </SketchSpec>
  </Suite>
);
