import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { iconArgType, VisualSpec } from '@/storybook-helpers';
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

const value = 'hello world, how are you?';
export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <PasswordField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when required">
        <PasswordField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isRequired={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <PasswordField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is shown">
        <PasswordField
          title="Welcome Text"
          value=""
          onChange={() => {}}
          horizontalConstraint={7}
          placeholder="Enter a text"
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is shown and disabled">
        <PasswordField
          title="Welcome Text"
          value=""
          onChange={() => {}}
          horizontalConstraint={7}
          isDisabled={true}
          placeholder="Enter a text"
        />
      </VisualSpec>
      <VisualSpec label="with error when not touched">
        <PasswordField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          errors={{ missing: true }}
        />
      </VisualSpec>
      <VisualSpec label="with error when touched">
        <PasswordField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          errors={{ missing: true }}
          touched={true}
        />
      </VisualSpec>
      <VisualSpec label="with description and hint">
        <PasswordField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          hint="Make sure the Caps Lock is disabled"
          description="Your secret password"
        />
      </VisualSpec>
      <VisualSpec label="with warning when not touched">
        <PasswordField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          warnings={{ customWarning: true }}
          renderWarning={() => 'Custom warning'}
        />
      </VisualSpec>
      <VisualSpec label="with warning when touched">
        <PasswordField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          warnings={{ customWarning: true }}
          touched={true}
          renderWarning={() => 'Custom warning'}
        />
      </VisualSpec>
      <VisualSpec label="with not rendered show/hide password button">
        <PasswordField
          title="Welcome Text"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          renderShowHideButton={false}
        />
      </VisualSpec>
    </>
  ),
};
