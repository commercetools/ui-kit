import type { Meta, StoryObj } from '@storybook/react';

import TextInput from './text-input';

const meta = {
  title: 'Components/Inputs/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: (args,) => {
    return {
      ...args,
      horizontalConstraint: 10,
      onChange: (event, ...params) => {
        console.log({ self: this, event, params});
        args.value = event.target.value;
      },
      onBlur: () => {},
      onFocus: () => {},
    };
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'Some random value',
    horizontalConstraint: 10,
    onChange: (event, ...params) => {
      console.log({ self: this, event, params});
    },
    onBlur: () => {},
    onFocus: () => {},
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    ...Default.args,
    isReadOnly: true,
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    value: 'Invalid value',
    hasError: true,
  },
};

export const WithWarning: Story = {
  args: {
    ...Default.args,
    value: 'Dangerous value',
    hasError: true,
  },
};
