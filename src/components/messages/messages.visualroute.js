import React from 'react';
import ErrorMessage from '@commercetools-frontend/ui-kit/dist/esm/ErrorMessage';
import WarningMessage from '@commercetools-frontend/ui-kit/dist/esm/WarningMessage';
import { Suite, Spec } from '../../../test/percy';

export const routePath = '/messages';
// We group error and warning messages to save a snapshot.
export const component = () => (
  <Suite>
    <Spec label="ErrorMessage">
      <ErrorMessage>An error message</ErrorMessage>
    </Spec>
    <Spec label="WarningMessage">
      <WarningMessage>A warning message</WarningMessage>
    </Spec>
  </Suite>
);
