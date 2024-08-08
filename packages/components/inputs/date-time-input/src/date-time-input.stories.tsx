import type { Meta, StoryObj } from '@storybook/react';
import DateTimeInput, { TDateTimeInputProps } from './date-time-input';
import { useState } from 'react';

const meta: Meta<typeof DateTimeInput> = {
  title: 'Form/Inputs/DateTimeInput',
  component: DateTimeInput,
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
  },
};
export default meta;

type Story = StoryObj<typeof DateTimeInput>;

export const BasicExample: Story = (args: TDateTimeInputProps) => {
  const [value, setValue] = useState<string>('');

  return (
    <div style={{ height: 400 }}>
      <DateTimeInput
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
};
