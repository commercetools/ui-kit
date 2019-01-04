import React from 'react';
import { LoadingSpinner } from 'ui-kit';
import { Suite, Spec } from '../../../test/percy';

export const routePath = '/loading-spinner';

export const component = () => (
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
);
