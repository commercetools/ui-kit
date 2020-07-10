import React from 'react';
import { ToggleInput } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

export const routePath = '/toggle';

export const component = () => (
  <Suite>
    <Spec label="Default">
      <ToggleInput />
    </Spec>
    <Spec label="Default - disabled">
      <ToggleInput isDisabled={true} />
    </Spec>
    <Spec label="Default - checked">
      <ToggleInput isChecked={true} />
    </Spec>
    <Spec label="Default - checked - disabled">
      <ToggleInput isDisabled={true} isChecked={true} />
    </Spec>
    <Spec label="Small">
      <ToggleInput size="small" />
    </Spec>
    <Spec label="Small - disabled">
      <ToggleInput size="small" isDisabled={true} />
    </Spec>
    <Spec label="Small - checked">
      <ToggleInput size="small" isChecked={true} />
    </Spec>
    <Spec label="Small - checked - disabled">
      <ToggleInput size="small" isDisabled={true} isChecked={true} />
    </Spec>
  </Suite>
);
