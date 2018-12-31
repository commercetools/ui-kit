import React from 'react';
import { Label } from 'ui-kit';
import { Suite, Spec } from '../../../test/percy';

export const routePath = '/label';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <Label>Hello</Label>
    </Spec>
    <Spec label="when bold">
      <Label isBold={true}>Hello</Label>
    </Spec>
    <Spec label="with required indicator">
      <Label isBold={true} isRequiredIndicatorVisible={true}>
        Hello
      </Label>
    </Spec>
    <Spec label="when inverted" inverted>
      <Label tone="inverted">Hello</Label>
    </Spec>
  </Suite>
);
