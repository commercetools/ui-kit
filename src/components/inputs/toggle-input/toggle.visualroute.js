import React from 'react';
import { ToggleInput } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/toggle';

export const component = () => (
  <Suite>
    <Spec label="Default">
      <ToggleInput />
    </Spec>
    <Spec label="Default - disabled">
      <ToggleInput disabled={true} />
    </Spec>
    <Spec label="Default - checked">
      <ToggleInput checked={true} />
    </Spec>
    <Spec label="Default - checked - disabled">
      <ToggleInput disabled={true} checked={true} />
    </Spec>
    <Spec label="Small">
      <ToggleInput size="small" />
    </Spec>
    <Spec label="Small - disabled">
      <ToggleInput size="small" disabled={true} />
    </Spec>
    <Spec label="Small - checked">
      <ToggleInput size="small" checked={true} />
    </Spec>
    <Spec label="Small - checked - disabled">
      <ToggleInput size="small" disabled={true} checked={true} />
    </Spec>
  </Suite>
);
