import React from 'react';
import AsyncSelectField from '@commercetools-uikit/async-select-field';

const Example = () => (
  <AsyncSelectField
    title="State"
    value={{ value: 'ready', label: 'Ready' }}
    loadOptions={
      (/* inputValue */) => {
        // async fetch logic
      }
    }
    onChange={(event) => alert(event.target.value)}
  />
);

export default Example;
