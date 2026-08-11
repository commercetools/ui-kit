import type { Meta, StoryObj } from '@storybook/react-vite';
import styled from '@emotion/styled';
import Text from '@commercetools-uikit/text';
import Inline from '../../spacings-inline/src/inline';
import { VisualSpec } from '@/storybook-helpers';
import SpacingInset, { TInsetProps } from './inset';

const meta: Meta<typeof SpacingInset> = {
  title: 'layout/Spacings/SpacingsInset',
  component: SpacingInset,
};
export default meta;

type Story = StoryObj<typeof SpacingInset>;

const PrettyBox = styled.div`
  background-color: rebeccapurple;
  color: white;
`;
const NotSoPrettyBox = styled.div`
  background-color: white;
  color: black;
  padding: 1em;
  text-align: center;
`;
/** Adds css `padding` around its' children. */
export const BasicExample: Story = (args: TInsetProps) => {
  return (
    <PrettyBox>
      <SpacingInset {...args}>
        <NotSoPrettyBox>Child-Element 1</NotSoPrettyBox>
        <NotSoPrettyBox>Child-Element 2</NotSoPrettyBox>
      </SpacingInset>
    </PrettyBox>
  );
};

BasicExample.args = {};

const View = styled.div`
  display: flex;
`;

const InsetColorWrapper = styled.div`
  display: inline-block;
  background-color: #ff5b5b;
  height: 100px;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  > * {
    flex-grow: 1;
    display: flex;
    align-items: stretch;
  }
`;

const Square = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  text-align: center;
`;

const insetSizes = [
  { name: 'xs', pixels: '4px' },
  { name: 's', pixels: '8px' },
  { name: 'm', pixels: '16px' },
  { name: 'l', pixels: '24px' },
  { name: 'xl', pixels: '32px' },
] as const;

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <VisualSpec label="Inset">
      <View>
        <Inline scale="s">
          {insetSizes.map((size) => (
            <InsetColorWrapper key={size.name}>
              <SpacingInset scale={size.name}>
                <Square>
                  <Text.Subheadline as="h4">
                    {size.name.toUpperCase()}
                    <Text.Detail>{size.pixels}</Text.Detail>
                  </Text.Subheadline>
                </Square>
              </SpacingInset>
            </InsetColorWrapper>
          ))}
        </Inline>
      </View>
    </VisualSpec>
  ),
};
