import type { Meta, StoryObj } from '@storybook/react-vite';
import Toggle, { TToggleInputProps } from './toggle-input';
import { VisualSpec } from '@/storybook-helpers';
import { useState } from 'react';

const meta: Meta<typeof Toggle> = {
  title: 'Form/Inputs/ToggleInput',
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

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="Default">
        <Toggle onChange={() => {}} />
      </VisualSpec>
      <VisualSpec label="Default - disabled">
        <Toggle onChange={() => {}} isDisabled={true} />
      </VisualSpec>
      <VisualSpec label="Default - checked">
        <Toggle onChange={() => {}} isChecked={true} />
      </VisualSpec>
      <VisualSpec label="Default - checked - disabled">
        <Toggle onChange={() => {}} isDisabled={true} isChecked={true} />
      </VisualSpec>
      <VisualSpec label="Small">
        <Toggle onChange={() => {}} size="small" />
      </VisualSpec>
      <VisualSpec label="Small - disabled">
        <Toggle onChange={() => {}} size="small" isDisabled={true} />
      </VisualSpec>
      <VisualSpec label="Small - checked">
        <Toggle onChange={() => {}} size="small" isChecked={true} />
      </VisualSpec>
      <VisualSpec label="Small - checked - disabled">
        <Toggle
          onChange={() => {}}
          size="small"
          isDisabled={true}
          isChecked={true}
        />
      </VisualSpec>
    </>
  ),
};
