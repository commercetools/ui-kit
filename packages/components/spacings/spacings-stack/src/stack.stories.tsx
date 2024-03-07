import { Meta, StoryObj } from '@storybook/react';
import styled from '@emotion/styled';
import Text from '@commercetools-uikit/text';
import { hideControls } from '@/storybook-helpers';
import Inline from '../../spacings-inline';
import Inset from '../../spacings-inset';
import Stack, { type TAlignItem, type TScale } from './stack';

const meta = {
  title: 'Components/Spacings/Stack',
  component: Stack,
  argTypes: {
    ...hideControls(['scale', 'children']),
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const StackColorWrapper = styled.div`
  background-color: #d4e0ec;
  width: 100px;
  text-align: center;
`;

const StackItem = styled.div<{ alignItems: TAlignItem }>`
  background-color: #2d68a0;
  height: 100px;
  width: ${(props) =>
    props.alignItems === 'stretch'
      ? 'auto'
      : `${Math.round(Math.random() * 50) + 50}px`};
`;

const sizes: { name: TScale; pixels: string }[] = [
  { name: 'xs', pixels: '4px' },
  { name: 's', pixels: '8px' },
  { name: 'm', pixels: '16px' },
  { name: 'l', pixels: '24px' },
  { name: 'xl', pixels: '32px' },
  { name: 'xxl', pixels: '48px' },
  { name: 'xxxl', pixels: '64px' },
];

export const Default: Story = {
  args: {
    scale: 's',
    alignItems: 'stretch',
    children: null,
  },
  render: (args) => (
    <Inline scale="s">
      {sizes.map((size) => (
        <StackColorWrapper key={size.name}>
          <Inset scale="m">
            <Text.Subheadline as="h4">
              {size.name.toUpperCase()}
              <Text.Detail>{size.pixels}</Text.Detail>
            </Text.Subheadline>
          </Inset>
          <Stack scale={size.name} alignItems={args.alignItems}>
            <StackItem alignItems={args.alignItems} />
            <StackItem alignItems={args.alignItems} />
            <StackItem alignItems={args.alignItems} />
            <StackItem alignItems={args.alignItems} />
            <StackItem alignItems={args.alignItems} />
          </Stack>
        </StackColorWrapper>
      ))}
    </Inline>
  ),
};
