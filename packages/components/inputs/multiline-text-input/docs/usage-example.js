import React from 'react';
import MultilineTextInput from '@commercetools-uikit/multiline-text-input';

const Example = () => (
  <MultilineTextInput
    value="foo"
    onChange={
      (/** event */) => {
        // alert(event.target.value)
      }
    }
  />
);

export default Example;
