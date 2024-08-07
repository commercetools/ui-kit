import type { Meta, StoryFn } from '@storybook/react';
import DateRangeInput, { TDateRangeInputProps } from './date-range-input';
import { DateRangeInputProxy } from './date-range-input-proxy';
import { useState } from 'react';

const meta: Meta<typeof DateRangeInputProxy> = {
  title: 'Form/Inputs/DateRangeInput',
  component: DateRangeInputProxy,
};
export default meta;

type Story = StoryFn<typeof DateRangeInputProxy>;

type DateRangeArray = [string, string];

export const BasicExample: Story = (args: TDateRangeInputProps) => {
  const [value, setValue] = useState<DateRangeArray>([
    '2024-11-13',
    '2024-11-16',
  ]);
  return (
    <div style={{ height: 400 }}>
      <DateRangeInput
        {...args}
        onChange={(e) => setValue(e.target.value as DateRangeArray)}
        value={value}
      />
    </div>
  );
};

BasicExample.args = {
  horizontalConstraint: 10,
  isClearable: true,
};
