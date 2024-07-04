import type { Meta, StoryObj } from '@storybook/react';
import styled from '@emotion/styled';
import SpacingInset, { TInsetProps } from './inset';

const meta: Meta<typeof SpacingInset> = {
  title: 'components/Spacings/SpacingsInset',
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
