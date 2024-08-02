import type { Meta, StoryObj } from '@storybook/react';
import Toggle, { TToggleInputProps } from './toggle-input';
import { useState } from 'react';

const meta: Meta<typeof Toggle> = {
  title: 'form/ToggleInput',
  component: Toggle,
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const BasicExample: Story = ({
  isChecked,
  ...args
}: TToggleInputProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Toggle
      isChecked={isChecked === undefined ? isActive : isChecked}
      {...args}
      onChange={() => setIsActive(!isActive)}
    />
  );
};

BasicExample.args = {};
