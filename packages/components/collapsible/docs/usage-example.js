import React from 'react';
import Collapsible from '@commercetools-uikit/collapsible';

const Example = () => (
  <Collapsible>
    {({ isOpen, toggle }) => (
      <div>
        <div>Status: {isOpen ? 'open' : 'closed'}</div>
        <button onClick={toggle}>Toggle</button>
      </div>
    )}
  </Collapsible>
);

export default Example;
