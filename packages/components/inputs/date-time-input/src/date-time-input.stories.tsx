import type { Meta, StoryObj } from '@storybook/react';
import { TDateTimeInputProps } from './date-time-input';
import { useState } from 'react';
import { DateTimeInputWrapper } from './date-time-input-wrapper';

const meta: Meta<typeof DateTimeInputWrapper> = {
  title: 'Form/Inputs/DateTimeInput',
  component: DateTimeInputWrapper,
  argTypes: {
    timeZone: {
      control: { type: 'select' },
      options: [
        'UTC',
        'America/Los_Angeles',
        'America/New_York',
        'Asia/Tokyo',
        'Europe/Amsterdam',
      ],
    },
    appearance: {
      control: { type: 'select' },
      options: ['default', 'filter'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof DateTimeInputWrapper>;

export const BasicExample: Story = (args: TDateTimeInputProps) => {
  const [value, setValue] = useState<string>('');

  return (
    <div style={{ height: 400 }}>
      <DateTimeInputWrapper
        {...args}
        onChange={(e) => setValue(e.target.value || '')}
        value={value}
      />
    </div>
  );
};

BasicExample.args = {
  timeZone: 'UTC',
  horizontalConstraint: 8,
  appearance: 'default',
};

export const FilterAppearance: Story = (args: TDateTimeInputProps) => {
  const [value, setValue] = useState<string>('');

  return (
    <div style={{ height: 400 }}>
      <DateTimeInputWrapper
        {...args}
        onChange={(e) => setValue(e.target.value || '')}
        value={value}
      />
    </div>
  );
};

FilterAppearance.args = {
  timeZone: 'UTC',
  horizontalConstraint: 8,
  appearance: 'filter',
};
