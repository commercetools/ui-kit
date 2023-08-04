import { type ChangeEvent, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import TextInput, { TTextInputProps } from './text-input';

const meta = {
  title: 'Components/Inputs/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    value: '',
    placeholder: 'Placeholder',
    horizontalConstraint: 10,
    onBlur: () => {},
    onFocus: () => {},
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const TextInputWrapper = (args: TTextInputProps) => {
  const [value, setValue] = useState(args.value);
  const props = {
    ...args,
    value,
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
  };
  return <TextInput {...props} />;
};

export const Default: Story = {
  args: {
    value: '',
  },
  render: TextInputWrapper,
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
  },
  render: TextInputWrapper,
};

export const ReadOnly: Story = {
  args: {
    ...Default.args,
    value: 'Read only value',
    isReadOnly: true,
  },
  render: TextInputWrapper,
};

export const WithError: Story = {
  args: {
    ...Default.args,
    value: 'Invalid value',
    hasError: true,
  },
  render: TextInputWrapper,
};

export const WithWarning: Story = {
  args: {
    ...Default.args,
    value: 'Dangerous value',
    hasWarning: true,
  },
  render: TextInputWrapper,
};
