import React from 'react';
import { ErrorMessage, WarningMessage } from '../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../test/percy';

// We group error and warning messages to save a snapshot.
screenshot('Messages', () => (
  <Suite>
    <Spec label="ErrorMessage">
      <ErrorMessage>An error message</ErrorMessage>
    </Spec>
    <Spec label="WarningMessage">
      <WarningMessage>A warning message</WarningMessage>
    </Spec>
  </Suite>
));
