import React from 'react';
import definition from './definition.yaml';
import { Suite, SketchSpec } from '../../test/percy';

export default (
  <Suite>
    <SketchSpec label="Colors">
      {Object.entries(definition.choiceGroups.colors.choices).map(
        ([tokenName, color]) => (
          <div
            key={tokenName}
            data-sketch-color={color}
            style={{
              display: 'inline-block',
              width: '50px',
              height: '50px',
              backgroundColor: color,
            }}
          />
        )
      )}
    </SketchSpec>
  </Suite>
);
