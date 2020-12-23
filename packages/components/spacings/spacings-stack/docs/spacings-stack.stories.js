import React from 'react';
import styled from '@emotion/styled';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SpacingsInset from '@commercetools-uikit/spacings-inset';
import Text from '@commercetools-uikit/text';
import { SpacingsStack } from '../src';

const StackColorWrapper = styled.div`
  background-color: #d4e0ec;
  width: 100px;
  text-align: center;
`;

const StackItem = styled.div`
  background-color: #2d68a0;
  height: 100px;
  width: ${(props) =>
    props.alignItems === 'stretch'
      ? 'auto'
      : `${Math.round(Math.random() * 50) + 50}px`};
`;

const sizes = [
  { name: 'xs', pixels: '4px' },
  { name: 's', pixels: '8px' },
  { name: 'm', pixels: '16px' },
  { name: 'l', pixels: '24px' },
  { name: 'xl', pixels: '32px' },
];

export default {
  title: 'Components/Spacings/SpacingsStack',
  component: SpacingsStack,
};

const Template = (args) => (
  <SpacingsInline scale="s">
    {sizes.map((size) => (
      <StackColorWrapper key={size.name}>
        <SpacingsInset scale="m">
          <Text.Subheadline as="h4">
            {size.name.toUpperCase()}
            <Text.Detail>{size.pixels}</Text.Detail>
          </Text.Subheadline>
        </SpacingsInset>
        <SpacingsStack {...args} scale={size.name}>
          <StackItem alignItems={args.alignItems} />
          <StackItem alignItems={args.alignItems} />
          <StackItem alignItems={args.alignItems} />
          <StackItem alignItems={args.alignItems} />
          <StackItem alignItems={args.alignItems} />
        </SpacingsStack>
      </StackColorWrapper>
    ))}
  </SpacingsInline>
);

export const Default = Template.bind({});
Default.args = {};
