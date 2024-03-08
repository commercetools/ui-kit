import type { Meta, StoryObj } from '@storybook/react';
import {
  horizontalConstraintArgType,
  hideControls,
  iconArgType,
  withControlledValue,
} from '@/storybook-helpers';

import PasswordField, { type TPasswordField } from './password-field';

const meta = {
  title: 'Components/Fields/PasswordField',
  component: PasswordField,
  argTypes: {
    ...hideControls([
      'onBlur',
      'onChange',
      'onFocus',
      'onInfoButtonClick',
      'renderError',
      'renderWarning',
      'value',
    ]),
    horizontalConstraint: horizontalConstraintArgType(),
    hintIcon: iconArgType,
    autoComplete: {
      control: 'select',
      options: ['on', 'off', 'current-password', 'new-password'],
    },
  },
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof PasswordField>;

export const Default: Story = {
  args: {
    id: '',
    horizontalConstraint: 7,
    errors: { missing: true, customError: true },
    warnings: {
      customWarning: true,
    },
    renderError: (key) => {
      switch (key) {
        case 'customError':
          return 'A custom error.';
        default:
          return null;
      }
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
    name: '',
    isAutofocussed: false,
    isDisabled: false,
    isReadOnly: false,
    placeholder: 'Placeholder',
    autoComplete: 'off',
    title: 'Password',
    hint: 'Enter your password',
    description: '',
    badge: '',
    value: '',
  },
  render: withControlledValue<TPasswordField>(PasswordField),
};
