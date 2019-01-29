import React from 'react';
import { Card } from 'ui-kit';
import { Suite, Spec } from '../../../test/percy';

export const routePath = '/card';

export const component = () => (
  <Suite>
    <Spec label="Normal">
      <Card>Card</Card>
    </Spec>
    <Spec label="Theme - Dark">
      <Card theme="dark">Card</Card>
    </Spec>
    <Spec label="Type - Flat">
      <Card type="flat">Card</Card>
    </Spec>
    <Spec label="Type - Flat - Theme - Dark">
      <Card type="flat" theme="dark">
        Card
      </Card>
    </Spec>
  </Suite>
);
