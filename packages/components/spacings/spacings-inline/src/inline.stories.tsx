import type { Meta, StoryObj } from '@storybook/react';
import styled from '@emotion/styled';
import Inline, { TInlineProps } from './inline';

const meta: Meta<typeof Inline> = {
  title: 'components/Spacings/SpacingsInline',
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
