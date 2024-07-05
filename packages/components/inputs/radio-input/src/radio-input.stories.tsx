import type { Meta, StoryObj } from '@storybook/react';
import RadioInput, { TGroupProps } from './index';
import { useState } from 'react';

const meta: Meta<typeof RadioInput.Group> = {
  title: 'form/RadioInput',
  component: RadioInput.Group,
  subcomponents: {
    // @ts-ignore
    RadioOption: RadioInput.Option,
  },
};

export default meta;

type Story = StoryObj<typeof RadioInput.Group>;

export const BasicExample: Story = (args: TGroupProps) => {
  const [v, setV] = useState('1');

  return (
    <RadioInput.Group
      {...args}
      value={v}
      onChange={(e) => setV(e.target.value)}
    >
      <RadioInput.Option value="1">🍎 Apple</RadioInput.Option>
      <RadioInput.Option value="2">🍌 Banana</RadioInput.Option>
      <RadioInput.Option value="3">🍍 Pineapple</RadioInput.Option>
    </RadioInput.Group>
  );
};

BasicExample.args = {
  id: 'fruit-selector',
  name: 'fruits',
  direction: 'stack',
  directionProps: {
    scale: 'm',
  },
};
