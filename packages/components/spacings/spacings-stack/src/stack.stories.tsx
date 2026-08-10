import type { Meta, StoryObj } from '@storybook/react-vite';
import Stack, { TStackProps, TAlignItem } from './stack';
import styled from '@emotion/styled';
import Text from '@commercetools-uikit/text';
import Inline from '../../spacings-inline/src/inline';
import Inset from '../../spacings-inset/src/inset';
import { VisualSpec } from '@/storybook-helpers';

const meta: Meta<typeof Stack> = {
  title: 'layout/Spacings/SpacingsStack',
  component: Stack,
};
export default meta;

type Story = StoryObj<typeof Stack>;

const PrettyBox = styled.div`
  background-color: rebeccapurple;
  color: white;
  padding: 1em;
`;

/** `<Stack/>` consumes 100% of the available width and stacks (and sizes) it's child-elements vertically within. */
export const BasicExample: Story = (args: TStackProps) => {
  return (
    <Stack {...args}>
      <PrettyBox>First</PrettyBox>
      <PrettyBox>Second</PrettyBox>
      <PrettyBox>Third</PrettyBox>
      <PrettyBox>Fourth</PrettyBox>
    </Stack>
  );
};

BasicExample.args = {};

const Item = styled.div<{
  backgroundColor: string;
  height: string;
  alignItems: TAlignItem;
}>`
  background-color: ${(props) => props.backgroundColor};
  height: ${(props) =>
    props.alignItems === 'stretch' ? 'auto' : props.height};
  width: 100px;
`;

const StackColorWrapper = styled.div`
  background-color: #d4e0ec;
  width: 100px;
  text-align: center;
`;

const sizes = [
  { name: 'xs', pixels: '4px' },
  { name: 's', pixels: '8px' },
  { name: 'm', pixels: '16px' },
  { name: 'l', pixels: '24px' },
  { name: 'xl', pixels: '32px' },
  { name: 'xxl', pixels: '48px' },
  { name: 'xxxl', pixels: '64px' },
] as const;

const flexProps = ['stretch', 'flex-start', 'flex-end', 'center'] as const;
const exampleHeights = ['50px', '60px', '76px', '40px', '66px'];

const StackExample = ({ alignItems }: { alignItems: TAlignItem }) => (
  <Inline scale="s">
    {sizes.map((size) => (
      <StackColorWrapper key={size.name}>
        <Inset scale="m">
          <Text.Subheadline as="h4">
            {size.name.toUpperCase()}
            <Text.Detail>{size.pixels}</Text.Detail>
          </Text.Subheadline>
        </Inset>
        <Stack scale={size.name} alignItems={alignItems}>
          {exampleHeights.map((height) => (
            <Item
              key={height}
              backgroundColor="#2d68a0"
              height={height}
              alignItems={alignItems}
            />
          ))}
        </Stack>
      </StackColorWrapper>
    ))}
  </Inline>
);

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      {flexProps.map((prop: TAlignItem) => (
        <VisualSpec
          key={`stack-${prop}`}
          label={`Stack - when alignItems is ${prop}`}
        >
          <StackExample alignItems={prop} />
        </VisualSpec>
      ))}
    </>
  ),
};
