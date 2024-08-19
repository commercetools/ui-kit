import type { Meta, StoryFn } from '@storybook/react';
import DateField from './date-field';
import { getExampleDateStrings } from '@commercetools-uikit/calendar-utils';
import { useState } from 'react';
import { iconArgType } from '@/storybook-helpers';

const meta: Meta<typeof DateField> = {
  title: 'Form/Fields/DateField',
  // @ts-expect-error, @todo refactory component and/or component-types
  component: DateField,
  argTypes: {
    hintIcon: iconArgType,
  },
};
export default meta;

type Story = StoryFn<typeof DateField>;

const exampleDates = getExampleDateStrings();

export const BasicExample: Story = (args) => {
  const [value, onChange] = useState<string | undefined>('');

  return (
    <div style={{ height: 400 }}>
      {/* @ts-expect-error, @todo refactory component and/or component-types */}
      <DateField
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
  // @ts-expect-error, @todo refactory component and/or component-types
  name: 'dateField-name',
  id: 'dateField-id',
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
  minValue: exampleDates.minDate,
  maxValue: exampleDates.maxDate,
  isCondensed: false,
  isDisabled: false,
  isReadOnly: false,
  placeholder: 'Set a date...',
  title: 'Release Date',
  hint: 'Select the date of publication',
  description: '',
  badge: '',
};
