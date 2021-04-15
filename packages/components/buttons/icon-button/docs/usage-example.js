import React from 'react';
import IconButton from '@commercetools-uikit/icon-button';
import { InformationIcon } from '@commercetools-uikit/icons';

const Example = () => (
  <IconButton
    icon={<InformationIcon />}
    label="A label text"
    onClick={() => alert('Button clicked')}
  />
);

export default Example;
