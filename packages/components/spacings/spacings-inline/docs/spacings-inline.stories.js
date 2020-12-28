import React from 'react';
import styled from '@emotion/styled';
import SpacingsInset from '@commercetools-uikit/spacings-inset';
import Text from '@commercetools-uikit/text';
import SpacingsInline from '../src';

const Stack = styled.div`
  > * + * {
    margin: 8px 0 0;
  }
`;

const Row = styled.div`
  display: block;
`;

const InlineColorWrapper = styled.div`
  background-color: #e1ffdd;
  display: inline-flex;
  align-items: stretch;
  height: 100px;
`;

const InlineItem = styled.div`
  background-color: #65ff4f;
  height: ${(props) =>
    props.alignItems === 'stretch'
      ? 'auto'
      : `${Math.round(Math.random() * 50) + 50}px`};
  width: 100px;
`;

const Scale = styled.div`
  align-self: center;
  width: 75px;
  text-align: center;
`;

const sizes = [
  { name: 'xs', pixels: '4px' },
  { name: 's', pixels: '8px' },
  { name: 'm', pixels: '16px' },
  { name: 'l', pixels: '24px' },
  { name: 'xl', pixels: '32px' },
];

export default {
  title: 'Components/Spacings/SpacingsInline',
  component: SpacingsInline,
};

const Template = (args) => (
  <Stack>
    {sizes.map((size) => (
      <Row key={size.name}>
        <InlineColorWrapper>
          <Scale>
            <SpacingsInset scale="s" alignItems="center">
              <Text.Subheadline as="h4">
                {size.name.toUpperCase()}
                <Text.Detail>{size.pixels}</Text.Detail>
              </Text.Subheadline>
            </SpacingsInset>
          </Scale>
          <SpacingsInline {...args} scale={size.name}>
            <InlineItem alignItems={args.alignItems} />
            <InlineItem alignItems={args.alignItems} />
            <InlineItem alignItems={args.alignItems} />
            <InlineItem alignItems={args.alignItems} />
            <InlineItem alignItems={args.alignItems} />
          </SpacingsInline>
        </InlineColorWrapper>
      </Row>
    ))}
  </Stack>
);

export const Default = Template.bind({});
Default.args = {};
