import React from 'react';
import AccessibleHidden from '@commercetools-uikit/accessible-hidden';

/**
 * In this example, we're showing additional text specifically to be read only
 * by screen readers, to make it more contextualized and easier to understand
 * for non-sighted users (as well "translating" the numeronym which might confuse
 * automatic screen-readers).
 */
const Example = () => (
  <div>
    <h3>An Article on A11y</h3>
    <p>A summary of the article</p>
    <button>
      Read More
      <AccessibleHidden> from An Article on Accessibility</AccessibleHidden>
    </button>
  </div>
);

export default Example;
