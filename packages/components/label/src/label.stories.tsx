import type { Meta, StoryObj } from '@storybook/react';
import Label from './label';

const meta: Meta<typeof Label> = {
  title: 'Form/Inputs/Label',
  component: Label,
};
export default meta;

type Story = StoryObj<typeof Label>;

export const BasicExample: Story = {
  args: {
    children: 'Label value',
  },
};
