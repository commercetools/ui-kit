import React from 'react';
import { Card, Constraints } from 'ui-kit';
import { Suite, Spec } from '../../../test/percy';

export const routePath = '/card';

export const component = () => (
  <Suite>
    <Spec label="Normal">
      <Constraints.Horizontal constraint="m">
        <Card>Card</Card>
      </Constraints.Horizontal>
    </Spec>
    <Spec label="Theme - Dark">
      <Constraints.Horizontal constraint="m">
        <Card theme="dark">Card</Card>
      </Constraints.Horizontal>
    </Spec>
    <Spec label="Type - Flat">
      <Constraints.Horizontal constraint="m">
        <Card type="flat">Card</Card>
      </Constraints.Horizontal>
    </Spec>
    <Spec label="Type - Flat - Theme - Dark">
      <Constraints.Horizontal constraint="m">
        <Card type="flat" theme="dark">
          Card
        </Card>
      </Constraints.Horizontal>
    </Spec>
  </Suite>
);
