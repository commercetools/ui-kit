import React from 'react';
import Tag from '@commercetools-uikit/tag';

const Example = () => (
  <Tag
    type="normal"
    isDisabled={false}
    linkTo="/project-key/products/icecream"
    onRemove={() => {}}
  >
    Icecream
  </Tag>
);

export default Example;
