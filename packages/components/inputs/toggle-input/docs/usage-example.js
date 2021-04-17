import React from 'react';
import ToggleInput from '@commercetools-uikit/toggle-input';

const Example = () => (
  <ToggleInput
    isDisabled={false}
    isChecked={false}
    onChange={(event) => alert(event.target.checked)}
    size="small"
  />
);

export default Example;
