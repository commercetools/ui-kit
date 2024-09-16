import type { Meta, StoryFn } from '@storybook/react';
import { iconArgType } from '@/storybook-helpers';
import TextField from './text-field';
import { useState } from 'react';

const meta: Meta<typeof TextField> = {
  title: 'Form/Fields/TextField',
  // @ts-expect-error, @todo: fix component and/or types
  component: TextField,
  argTypes: {
    // @ts-expect-error
    title: { control: 'text' },
    hint: { control: 'text' },
    description: { control: 'text' },
    badge: { control: 'text' },
    hintIcon: iconArgType,
    additionalInfo: { control: 'text' },
  },
};
export default meta;

type Story = StoryFn<typeof TextField>;

export const BasicExample: Story = (args) => {
  const [value, onChange] = useState('');

  return (
    // @ts-expect-error
    <TextField
      {...args}
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    />
  );
};

BasicExample.args = {
  // @ts-expect-error
  id: 'text-field-id',
  name: 'text-field-name',
  horizontalConstraint: 7,
  error: { missing: true, customError: true },
  renderError: (key: string) => {
    switch (key) {
      case 'customError':
        return 'A custom error.';
      default:
        return null;
    }
  },
  warnings: {
    customWarning: true,
  },
  renderWarning: (key: string) => {
    switch (key) {
      case 'customWarning':
        return 'A custom warning.';
      default:
        return null;
    }
  },
  isRequired: false,
  touched: false,
  isAutofocussed: false,
  isCondensed: false,
  isDisabled: false,
  isReadOnly: false,
  placeholder: 'Placeholder text',
  title: 'Username',
  hint: 'Enter your username',
  description: '',
  onInfoButtonClick: () => alert('info button clicked'),
  additionalInfo: 'Only use letters, numbers, and underscores',
  badge: '',
};
