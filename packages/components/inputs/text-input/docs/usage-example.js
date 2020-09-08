import React from 'react';
import TextInput from '@commercetools-uikit/text-input';

const Example = () => (
  <TextInput value="foo" onChange={(event) => alert(event.target.value)} />
);

export default Example;
