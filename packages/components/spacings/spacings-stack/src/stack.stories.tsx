import type { Meta, StoryObj } from '@storybook/react';
import Stack, { TStackProps } from './stack';
import styled from '@emotion/styled';

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
