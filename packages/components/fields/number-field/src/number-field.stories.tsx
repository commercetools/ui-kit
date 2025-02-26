import type { Meta, StoryFn } from '@storybook/react';
import { iconArgType } from '@/storybook-helpers';
import NumberField from './number-field';
import { useState } from 'react';

const meta: Meta<typeof NumberField> = {
  title: 'Form/Fields/NumberField',
  // @ts-expect-error, fix component and/or types
  component: NumberField,
  argTypes: {
    // @ts-expect-error
    title: { control: 'text' },
    hint: { control: 'text' },
    description: { control: 'text' },
    badge: { control: 'text' },
    hintIcon: iconArgType,
  },
};
export default meta;

type Story = StoryFn<typeof NumberField>;

export const BasicExample: Story = (args) => {
  const [value, onChange] = useState('');

  return (
    <NumberField
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
  id: 'number-field-id',
  name: 'number-field-name',
  horizontalConstraint: 7,
  warnings: {
    customWarning: true,
  },
  errors: { missing: true, customError: true },
  renderError: (key: string) => {
    switch (key) {
      case 'customError':
        return 'A custom error.';
      default:
        return null;
    }
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
  isDisabled: false,
  isReadOnly: false,
  placeholder: 'Placeholder text',
  title: 'Age',
  min: 18,
  max: 128,
  step: 1,
  hint: 'Enter your age',
  description: '',
  onInfoButtonClick: () => alert('info button clicked'),
  badge: '',
};
