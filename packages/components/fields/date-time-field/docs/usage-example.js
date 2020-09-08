import React from 'react';
import DateTimeField from '@commercetools-uikit/date-time-field';

const Example = () => (
  <DateTimeField
    title="Release Date"
    value="2018-11-30T13:25:59.500Z"
    onChange={(event) => alert(event.target.value)}
  />
);

export default Example;
