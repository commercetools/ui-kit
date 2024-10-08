import type { Meta, StoryObj } from '@storybook/react';
import CheckboxInput, { TCheckboxProps } from './checkbox-input';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const meta: Meta<typeof CheckboxInput> = {
  title: 'Form/Inputs/CheckboxInput',
  component: CheckboxInput,
};
export default meta;

type Story = StoryObj<typeof CheckboxInput>;

export const BasicExample: Story = (args: TCheckboxProps) => {
  const [checked, setChecked] = useState(args.isChecked);

  useEffect(() => {
    setChecked(args.isChecked);
  }, [args.isChecked]);

  return (
    <CheckboxInput
      {...args}
      isChecked={checked}
      onChange={() => setChecked(!checked)}
    >
      Checkbox Label
    </CheckboxInput>
  );
};

BasicExample.args = {
  children: 'I am a checkbox',
};

const DemoContainer = styled.div`
  display: flex;
  margin-bottom: 0.5em;
  align-items: center;
  gap: 1em;
`;

export const StatesAndVariants: Story = () => {
  return (
    <div>
      {['', 'isDisabled', 'isReadOnly', 'hasError'].map((prop) => {
        return (
          <DemoContainer key={prop}>
            <div style={{ width: '8em', fontWeight: 600 }}>
              {prop || 'Default'}
            </div>
            <CheckboxInput
              value="1"
              isChecked={true}
              onChange={() => {}}
              {...{ [prop]: true }}
            >
              Checkbox Label
            </CheckboxInput>
            <CheckboxInput value="1" isChecked={false} onChange={() => {}}>
              Checkbox Label
            </CheckboxInput>
            <CheckboxInput value="1" isIndeterminate={true} onChange={() => {}}>
              Checkbox Label
            </CheckboxInput>
          </DemoContainer>
        );
      })}
    </div>
  );
};

StatesAndVariants.args = {
  isChecked: true,
};
