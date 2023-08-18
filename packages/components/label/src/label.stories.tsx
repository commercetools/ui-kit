import type { Meta, StoryObj } from '@storybook/react';

import Label from './label';

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  args: {
    children: 'Label value',
    isRequiredIndicatorVisible: false,
    isBold: false,
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const PrimaryTone: Story = {
  args: {
    tone: 'primary',
  },
};

export const InvertedTone: Story = {
  render: (args) => (
    <div style={{ backgroundColor: 'black', padding: '16px' }}>
      <Label {...args} tone="inverted" />
    </div>
  ),
};

export const WithRequiredIndicator: Story = {
  args: {
    isRequiredIndicatorVisible: true,
  },
};
