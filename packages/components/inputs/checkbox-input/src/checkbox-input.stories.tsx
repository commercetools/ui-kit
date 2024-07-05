import type { Meta, StoryObj } from '@storybook/react';
import CheckboxInput from './checkbox-input';
import styled from '@emotion/styled';

const meta: Meta<typeof CheckboxInput> = {
  title: 'form/CheckboxInput',
  component: CheckboxInput,
};
export default meta;

type Story = StoryObj<typeof CheckboxInput>;

export const BasicExample: Story = {
  args: {
    isChecked: true,
    children: 'I am a checkbox',
  },
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
