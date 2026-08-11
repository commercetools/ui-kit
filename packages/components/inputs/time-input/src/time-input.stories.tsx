import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import TimeInput from './time-input';
import { VisualSpec } from '@/storybook-helpers';
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

const value = '3:00 PM';

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <TimeInput value={value} onChange={() => {}} horizontalConstraint={7} />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <TimeInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is shown">
        <TimeInput
          value=""
          onChange={() => {}}
          horizontalConstraint={7}
          placeholder="Select something"
        />
      </VisualSpec>
      <VisualSpec label="with error">
        <TimeInput
          value=""
          onChange={() => {}}
          horizontalConstraint={7}
          hasError={true}
        />
      </VisualSpec>
      <VisualSpec label="when readonly">
        <TimeInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isReadOnly={true}
        />
      </VisualSpec>
      <VisualSpec label="with warning">
        <TimeInput
          value=""
          onChange={() => {}}
          horizontalConstraint={7}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="minimal">
        <TimeInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isCondensed={true}
        />
      </VisualSpec>
    </>
  ),
};
