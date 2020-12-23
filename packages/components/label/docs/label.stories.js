import React from 'react';
import Constraints from '@commercetools-uikit/constraints';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { Label } from '../src';

export default {
  title: 'Components/Label',
  component: Label,
};

const text = 'This is the label text';

const TemplateAll = () => (
  <Constraints.Horizontal constraint="m">
    <SpacingsStack>
      <Label>{text}</Label>
      <Label isRequiredIndicatorVisible>{text}</Label>
      <Label isBold>{text}</Label>
      <Label tone="primary">{text}</Label>
      <div style={{ backgroundColor: 'black' }}>
        <Label tone="inverted">{text}</Label>
      </div>
    </SpacingsStack>
  </Constraints.Horizontal>
);

export const Default = TemplateAll.bind({});
Default.args = {};
