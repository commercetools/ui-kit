import type { Meta, StoryObj } from '@storybook/react';
import styled from '@emotion/styled';
import SpacingInsetSquish, { TInsetSquishProps } from './inset-squish';

const meta: Meta<typeof SpacingInsetSquish> = {
  title: 'components/Spacings/SpacingsInsetSquish',
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
