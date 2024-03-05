import type { Meta, StoryObj } from '@storybook/react';
import styled from '@emotion/styled';
import { hideControls } from '@/storybook-helpers';
import Text from '../../../text';
import Inset from '../../spacings-inset';

import Inline, { TAlignItem, TScale } from './inline';

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

const InlineItem = styled.div<{ alignItems: TAlignItem }>`
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

const sizes: { name: TScale; pixels: string }[] = [
  { name: 'xs', pixels: '4px' },
  { name: 's', pixels: '8px' },
  { name: 'm', pixels: '16px' },
  { name: 'l', pixels: '24px' },
  { name: 'xl', pixels: '32px' },
  { name: 'xxl', pixels: '48px' },
  { name: 'xxxl', pixels: '64px' },
];

const meta = {
  title: 'Components/Spacings/Inline',
  component: Inline,
  argTypes: {
    ...hideControls(['scale', 'children']),
  },
} satisfies Meta<typeof Inline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    scale: 's',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    children: null,
  },
  render: (args) => (
    <Stack>
      {sizes.map((size) => (
        <Row key={size.name}>
          <InlineColorWrapper>
            <Scale>
              <Inset scale="s">
                <Text.Subheadline as="h4">
                  {size.name.toUpperCase()}
                  <Text.Detail>{size.pixels}</Text.Detail>
                </Text.Subheadline>
              </Inset>
            </Scale>
            <Inline
              scale={size.name}
              alignItems={args.alignItems}
              justifyContent={args.justifyContent}
            >
              <InlineItem alignItems={args.alignItems} />
              <InlineItem alignItems={args.alignItems} />
              <InlineItem alignItems={args.alignItems} />
              <InlineItem alignItems={args.alignItems} />
              <InlineItem alignItems={args.alignItems} />
            </Inline>
          </InlineColorWrapper>
        </Row>
      ))}
    </Stack>
  ),
};
