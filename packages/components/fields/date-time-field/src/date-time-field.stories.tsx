import type { Meta, StoryFn } from '@storybook/react';
import DateTimeField from './date-time-field';
import { useState } from 'react';

const meta: Meta<typeof DateTimeField> = {
  title: 'Form/Fields/DateTimeField',
  // @ts-expect-error @todo fix component and/or component-types
  component: DateTimeField,
  argTypes: {
    // @ts-expect-error
    timeZone: {
      control: 'select',
      options: [
        'UTC',
        'America/Los_Angeles',
        'America/New_York',
        'Asia/Tokyo',
        'Europe/Amsterdam',
      ],
    },
  },
};
export default meta;

type Story = StoryFn<typeof DateTimeField>;

export const BasicExample: Story = (args) => {
  const [value, onChange] = useState<string | undefined>('');

  return (
    <div style={{ height: 400 }}>
      {/** @ts-expect-error */}
      <DateTimeField
        {...args}
        value={value || ''}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
    </div>
  );
};

BasicExample.args = {
  // @ts-expect-error
  id: 'date-time-field-id',
  name: 'date-time-field-name',
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
  timeZone: 'UTC',
  isCondensed: false,
  isDisabled: false,
  isReadOnly: false,
  placeholder: 'Select a date and time',
  title: 'Release Date',
  hint: 'Select the date of publication',
  description: '',
  badge: '',
};
