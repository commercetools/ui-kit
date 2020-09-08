import React from 'react';
import TimeField from '@commercetools-uikit/time-field';

const Example = () => (
  <TimeField
    title="Release Date"
    value="15:30"
    onChange={(event) => alert(event.target.value)}
  />
);

export default Example;
