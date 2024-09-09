import type { Meta, StoryFn } from '@storybook/react';
import TimeInput from './time-input';
import { useState } from 'react';

const meta: Meta<typeof TimeInput> = {
  title: 'Form/Inputs/TimeInput',
  component: TimeInput,
};
export default meta;

type Story = StoryFn<typeof TimeInput>;

export const BasicExample: Story = (args) => {
  const [value, setValue] = useState('17:12');
  return (
    <TimeInput
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

BasicExample.args = {
  placeholder: 'Enter time...',
  horizontalConstraint: 7,
};
