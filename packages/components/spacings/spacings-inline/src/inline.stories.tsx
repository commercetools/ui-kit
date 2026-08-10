import type { Meta, StoryObj } from '@storybook/react-vite';
import styled from '@emotion/styled';
import Constraints from '@commercetools-uikit/constraints';
import Text from '@commercetools-uikit/text';
import Inset from '../../spacings-inset/src/inset';
import { VisualSpec } from '@/storybook-helpers';
import Inline, { TInlineProps, TAlignItem, TJustifyContent } from './inline';

const meta: Meta<typeof Inline> = {
  title: 'layout/Spacings/SpacingsInline',
  component: Inline,
};
export default meta;

type Story = StoryObj<typeof Inline>;

const PrettyBox = styled.div`
  background-color: rebeccapurple;
  color: white;
  padding: 1em;
`;

/** `<SpacingsInline/>` displays items - surprise! - inline. It **does not** wrap items onto the next line. */
export const BasicExample: Story = (args: TInlineProps) => {
  return (
    <Inline {...args}>
      <PrettyBox>First</PrettyBox>
      <PrettyBox>Second</PrettyBox>
      <PrettyBox>Third</PrettyBox>
      <PrettyBox>Fourth</PrettyBox>
      <PrettyBox>Fifth</PrettyBox>
    </Inline>
  );
};
BasicExample.args = {};

const Stack = styled.div`
  > * + * {
    margin: 8px 0 0;
  }
`;

const Row = styled.div`
  display: block;
`;

// Percy got its width from the viewport. VisualSpec lays the label beside the
// content, so the box shrink-wraps and justifyContent has no space to distribute.
const View = styled.div`
  display: flex;
  width: 600px;
`;

const InlineColorWrapper = styled.div`
  background-color: #e1ffdd;
  display: inline-flex;
  align-items: stretch;
  height: 100px;
`;

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
  { name: 'xxl', pixels: '48px' },
  { name: 'xxxl', pixels: '64px' },
] as const;

const flexProps = ['stretch', 'flex-start', 'flex-end', 'center'] as const;
const justifyProps = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
] as const;
const exampleHeights = ['50px', '60px', '76px', '40px', '66px'];

const InlineExample = ({ alignItems }: { alignItems: TAlignItem }) => (
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
          <Inline scale={size.name} alignItems={alignItems}>
            {exampleHeights.map((height) => (
              <Item
                key={height}
                backgroundColor="#65ff4f"
                height={height}
                alignItems={alignItems}
              />
            ))}
          </Inline>
        </InlineColorWrapper>
      </Row>
    ))}
  </Stack>
);

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      {flexProps.map((prop: TAlignItem) => (
        <VisualSpec
          key={`inline-${prop}`}
          label={`Inline - when alignItems is ${prop}`}
        >
          <InlineExample alignItems={prop} />
        </VisualSpec>
      ))}
      {justifyProps.map((prop: TJustifyContent) => (
        <VisualSpec
          key={`inline-justify-${prop}`}
          label={`Inline - when justifyContent is ${prop}`}
        >
          <View>
            <Constraints.Horizontal>
              <Inline scale="s" alignItems="center" justifyContent={prop}>
                <div>
                  <Text.Body>{'Text on the left'}</Text.Body>
                </div>
                <div>
                  <Text.Body>{'Text on the right'}</Text.Body>
                </div>
              </Inline>
            </Constraints.Horizontal>
          </View>
        </VisualSpec>
      ))}
    </>
  ),
};
