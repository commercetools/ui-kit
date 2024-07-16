import type { Meta, StoryFn } from '@storybook/react';
import { iconArgType } from '@/storybook-helpers';
import TimeField from './time-field';
import { useState } from 'react';

const meta: Meta<typeof TimeField> = {
  title: 'field/TimeField',
  // @ts-expect-error @todo fix component and/or types
  component: TimeField,
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

type Story = StoryFn<typeof TimeField>;

export const BasicExample: Story = (args) => {
  const [value, onChange] = useState('12:30 PM');

  return (
    // @ts-expect-error
    <TimeField
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
  id: 'time-field-id',
  name: 'time-field-name',
  horizontalConstraint: 7,
  errors: { missing: true, customError: true },
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
  isCondensed: false,
  isDisabled: false,
  isReadOnly: false,
  placeholder: 'Placeholder text',
  title: 'Release Date',
  hint: 'Select the time of publication',
  description: '',
  onInfoButtonClick: () => alert('Info button clicked'),
  badge: '',
};
