import React from 'react';
import PasswordInput from '@commercetools-uikit/password-input';

const Example = () => (
  <PasswordInput
    value="foo"
    onChange={(event) => {
      alert(event.target.value);
    }}
  />
);

export default Example;
