import type { Meta, StoryObj } from '@storybook/react-vite';
import styled from '@emotion/styled';
import Text from '@commercetools-uikit/text';
import Inline from '../../spacings-inline/src/inline';
import { VisualSpec } from '@/storybook-helpers';
import SpacingInsetSquish, { TInsetSquishProps } from './inset-squish';

const meta: Meta<typeof SpacingInsetSquish> = {
  title: 'layout/Spacings/SpacingsInsetSquish',
  component: SpacingInsetSquish,
};
export default meta;

type Story = StoryObj<typeof SpacingInsetSquish>;

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

/** Like `<SpacingsInset/>` but with different `padding`' values on sides (left/right) and ends (top/bottom).  */
export const BasicExample: Story = (args: TInsetSquishProps) => {
  return (
    <PrettyBox>
      <SpacingInsetSquish {...args}>
        <NotSoPrettyBox>Child-Element 1</NotSoPrettyBox>
        <NotSoPrettyBox>Child-Element 2</NotSoPrettyBox>
      </SpacingInsetSquish>
    </PrettyBox>
  );
};

BasicExample.args = {};

const View = styled.div`
  display: flex;
`;

const InsetSquishColorWrapper = styled.div`
  background-color: #ffb15c;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 4px;
  > * {
    flex-grow: 1;
    display: flex;
    align-items: stretch;
  }
`;

const Button = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  text-align: center;
`;

const insetSquishSizes = [
  { name: 's', pixels: '4px x 8px' },
  { name: 'm', pixels: '8px x 16px' },
  { name: 'l', pixels: '16px x 32px' },
] as const;

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <VisualSpec label="InsetSquish">
      <View>
        <Inline scale="s" alignItems="center">
          {insetSquishSizes.map((size) => (
            <InsetSquishColorWrapper key={size.name}>
              <SpacingInsetSquish scale={size.name}>
                <Button>
                  <Text.Subheadline as="h4">
                    {size.name.toUpperCase()}
                    <Text.Detail>{size.pixels}</Text.Detail>
                  </Text.Subheadline>
                </Button>
              </SpacingInsetSquish>
            </InsetSquishColorWrapper>
          ))}
        </Inline>
      </View>
    </VisualSpec>
  ),
};
