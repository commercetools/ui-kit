import React from 'react';
import SelectField from '@commercetools-uikit/select-field';

const Example = () => (
  <SelectField
    title="State"
    value="ready"
    options={[
      { value: 'ready', label: 'Ready' },
      { value: 'shipped', label: 'Shipped' },
    ]}
    onChange={(event) => alert(event.target.value)}
  />
);

export default Example;
