import React from 'react';
import { ErrorMessage, WarningMessage } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../test/percy';

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
