import type { Meta, StoryObj } from '@storybook/react-vite';
import CheckboxInput, { TCheckboxProps } from './checkbox-input';
import { VisualSpec } from '@/storybook-helpers';
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

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="when default">
        <CheckboxInput onChange={() => {}} value="value">
          I want kale
        </CheckboxInput>
      </VisualSpec>
      <VisualSpec label="when checked">
        <CheckboxInput onChange={() => {}} value="value" isChecked={true}>
          I want pizza
        </CheckboxInput>
      </VisualSpec>
      <VisualSpec label="when indeterminate">
        <CheckboxInput onChange={() => {}} value="value" isIndeterminate={true}>
          I want kale pizza
        </CheckboxInput>
      </VisualSpec>
      <VisualSpec label="when hovered">
        <CheckboxInput onChange={() => {}} value="value" isHovered={true}>
          I want pasta
        </CheckboxInput>
      </VisualSpec>
      <VisualSpec label="when checked and hovered">
        <CheckboxInput
          onChange={() => {}}
          value="value"
          isHovered={true}
          isChecked={true}
        >
          I want to watch hockey
        </CheckboxInput>
      </VisualSpec>
      <VisualSpec label="when indeterminate and hovered">
        <CheckboxInput
          onChange={() => {}}
          value="value"
          isIndeterminate={true}
          isHovered={true}
        >
          I want kale
        </CheckboxInput>
      </VisualSpec>
      <VisualSpec label="when with error">
        <CheckboxInput onChange={() => {}} value="value" hasError={true}>
          I want ice cream pizza
        </CheckboxInput>
      </VisualSpec>
      <VisualSpec label="when checked and with error">
        <CheckboxInput
          onChange={() => {}}
          isChecked={true}
          value="value"
          hasError={true}
        >
          I want pizza but not frozen pizza
        </CheckboxInput>
      </VisualSpec>
      <VisualSpec label="when indeterminate and with error">
        <CheckboxInput
          onChange={() => {}}
          isIndeterminate={true}
          value="value"
          hasError={true}
        >
          I want frozen beer
        </CheckboxInput>
      </VisualSpec>
      <VisualSpec label="when disabled">
        <CheckboxInput onChange={() => {}} value="value" isDisabled={true}>
          I want tequila
        </CheckboxInput>
      </VisualSpec>
      <VisualSpec label="when checked and disabled">
        <CheckboxInput
          onChange={() => {}}
          value="value"
          isDisabled={true}
          isChecked={true}
        >
          I want mezcal
        </CheckboxInput>
      </VisualSpec>
      <VisualSpec label="when indeterminate and disabled">
        <CheckboxInput
          onChange={() => {}}
          value="value"
          isDisabled={true}
          isIndeterminate={true}
        >
          I want mezcal with a worm
        </CheckboxInput>
      </VisualSpec>
      <VisualSpec label="when readonly">
        <CheckboxInput onChange={() => {}} value="value" isReadOnly={true}>
          I want tequila
        </CheckboxInput>
      </VisualSpec>
      <VisualSpec label="when checked and readonly">
        <CheckboxInput
          onChange={() => {}}
          value="value"
          isReadOnly={true}
          isChecked={true}
        >
          I want mezcal
        </CheckboxInput>
      </VisualSpec>
      <VisualSpec label="when indeterminate and readonly">
        <CheckboxInput
          onChange={() => {}}
          value="value"
          isReadOnly={true}
          isIndeterminate={true}
        >
          I want mezcal with a worm
        </CheckboxInput>
      </VisualSpec>
    </>
  ),
};
