import React from 'react';
import { Link } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/link';

export const component = () => (
  <Suite>
    <Spec label="regular">
      <Link to="/">A label text</Link>
    </Spec>
    <Spec label="external">
      <Link to="/" isExternal={true}>
        A label text
      </Link>
    </Spec>
  </Suite>
);
