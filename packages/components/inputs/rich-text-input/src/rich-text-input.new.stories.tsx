import type { Meta, StoryObj } from '@storybook/react';

import RichTextInput from './rich-text-input';

const meta = {
  title: 'Components/Inputs/RichTextInput',
  component: RichTextInput,
  parameters: {
    layout: 'centered',
  },
  args: {
    onFocus: () => {},
    onBlur: () => {},
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RichTextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    horizontalConstraint: 10,
    placeholder: 'Placeholder',
    showExpandIcon: true,
  },
};
