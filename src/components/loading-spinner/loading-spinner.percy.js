import React from 'react';
import { LoadingSpinner } from '../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../test/percy';

screenshot('LoadingSpinner', () => (
  <Suite>
    <Spec label='with scale "l" (default)'>
      <LoadingSpinner />
    </Spec>
    <Spec label='with scale "s"'>
      <LoadingSpinner scale="s" />
    </Spec>
    <Spec label="with children">
      <LoadingSpinner>Loading..</LoadingSpinner>
    </Spec>
    <Spec label='with scale "s" and children'>
      <LoadingSpinner scale="s">Loading..</LoadingSpinner>
    </Spec>
    <Spec label='with scale "l" and children'>
      <LoadingSpinner scale="l">Loading..</LoadingSpinner>
    </Spec>
  </Suite>
));
