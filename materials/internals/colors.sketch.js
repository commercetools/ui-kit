import React from 'react';
import definition from './definition.yaml';

export default () => (
  <div>
    <h3>Colors</h3>
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
  </div>
);
