import React from 'react';
import MultilineTextField from '@commercetools-uikit/multiline-text-field';

const Example = () => (
  <MultilineTextField
    title="Description"
    value=""
    onChange={(event) => alert(event.target.value)}
  />
);

export default Example;
