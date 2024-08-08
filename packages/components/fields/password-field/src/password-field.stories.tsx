import type { Meta, StoryFn } from '@storybook/react';
import { iconArgType } from '@/storybook-helpers';
import PasswordField from './password-field';
import { useState } from 'react';

const meta: Meta<typeof PasswordField> = {
  title: 'Form/Fields/PasswordField',
  component: PasswordField,
  argTypes: {
    hintIcon: iconArgType,
    title: { control: { type: 'text' } },
    hint: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    badge: { control: { type: 'text' } },
  },
};
export default meta;

type Story = StoryFn<typeof PasswordField>;

export const BasicExample: Story = (args) => {
  const [value, onChange] = useState('');

  return (
    <PasswordField
      {...args}
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    />
  );
};

BasicExample.args = {
  id: 'password-field-id',
  name: 'password-field-name',
  horizontalConstraint: 7,
  errors: { missing: true, customError: true },
  renderError: (key) => {
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
  renderWarning: (key) => {
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
  isDisabled: false,
  isReadOnly: false,
  placeholder: 'Placeholder text',
  autoComplete: 'off',
  title: 'Password',
  hint: 'Enter your password',
  description: '',
  onInfoButtonClick: () => alert('info button clicked'),
  badge: '',
  renderShowHideButton: true,
};
