import type { Meta, StoryObj } from '@storybook/react-vite';
import styled from '@emotion/styled';
import RadioInput, { TGroupProps } from './index';
import { VisualSpec } from '@/storybook-helpers';
import { useState } from 'react';

const meta: Meta<typeof RadioInput.Group> = {
  title: 'Form/Inputs/RadioInput',
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

const GreenBox = styled.div`
  width: 100%;
  height: 20px;
  background-color: green;
`;

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="when direction is stack">
        <RadioInput.Group
          name="fruits"
          value="apples"
          onChange={() => {}}
          direction="stack"
        >
          <RadioInput.Option value="apples">{'Apples'}</RadioInput.Option>
          <RadioInput.Option value="oranges">{'Oranges'}</RadioInput.Option>
        </RadioInput.Group>
      </VisualSpec>
      <VisualSpec label="when direction is stack (disabled)">
        <RadioInput.Group
          name="fruits"
          value="apples"
          onChange={() => {}}
          direction="stack"
          isDisabled={true}
        >
          <RadioInput.Option value="apples">{'Apples'}</RadioInput.Option>
          <RadioInput.Option value="oranges">{'Oranges'}</RadioInput.Option>
        </RadioInput.Group>
      </VisualSpec>
      <VisualSpec label="when direction is stack (only one option disabled)">
        <RadioInput.Group
          name="fruits"
          value="apples"
          onChange={() => {}}
          direction="stack"
        >
          <RadioInput.Option value="apples">{'Apples'}</RadioInput.Option>
          <RadioInput.Option value="oranges" isDisabled={true}>
            {'Oranges'}
          </RadioInput.Option>
        </RadioInput.Group>
      </VisualSpec>
      <VisualSpec label="when direction is stack (only one option in hovered state)">
        <RadioInput.Group
          name="fruits"
          value="apples"
          onChange={() => {}}
          direction="stack"
        >
          <RadioInput.Option value="apples">{'Apples'}</RadioInput.Option>
          <RadioInput.Option value="oranges" isHovered={true}>
            {'Oranges'}
          </RadioInput.Option>
        </RadioInput.Group>
      </VisualSpec>
      <VisualSpec label="when direction is stack (has errors)">
        <RadioInput.Group
          name="fruits"
          value="apples"
          onChange={() => {}}
          direction="stack"
          hasError={true}
        >
          <RadioInput.Option value="apples">{'Apples'}</RadioInput.Option>
          <RadioInput.Option value="oranges">{'Oranges'}</RadioInput.Option>
        </RadioInput.Group>
      </VisualSpec>
      <VisualSpec label="when direction is stack (has warning)">
        <RadioInput.Group
          name="fruits"
          value="apples"
          onChange={() => {}}
          direction="stack"
          hasWarning={true}
        >
          <RadioInput.Option value="apples">{'Apples'}</RadioInput.Option>
          <RadioInput.Option value="oranges">{'Oranges'}</RadioInput.Option>
        </RadioInput.Group>
      </VisualSpec>
      <VisualSpec label="when direction is stack (constraint m)">
        <RadioInput.Group
          name="fruits"
          value="apples"
          onChange={() => {}}
          direction="stack"
          horizontalConstraint={7}
        >
          <RadioInput.Option value="apples">
            <GreenBox>
              {
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              }
            </GreenBox>
          </RadioInput.Option>
        </RadioInput.Group>
      </VisualSpec>
      <VisualSpec label="when direction is stack (constraint l)">
        <RadioInput.Group
          name="fruits"
          value="apples"
          onChange={() => {}}
          direction="stack"
          horizontalConstraint={10}
        >
          <RadioInput.Option value="apples">
            <GreenBox>
              {
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              }
            </GreenBox>
          </RadioInput.Option>
        </RadioInput.Group>
      </VisualSpec>
      <VisualSpec label="when direction is stack (constraint xl)">
        <RadioInput.Group
          name="fruits"
          value="apples"
          onChange={() => {}}
          direction="stack"
          horizontalConstraint={16}
        >
          <RadioInput.Option value="apples">
            <GreenBox>
              {
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              }
            </GreenBox>
          </RadioInput.Option>
        </RadioInput.Group>
      </VisualSpec>
      <VisualSpec label="when direction is stack (constraint scale)">
        <RadioInput.Group
          name="fruits"
          value="apples"
          onChange={() => {}}
          direction="stack"
          horizontalConstraint="scale"
        >
          <RadioInput.Option value="apples">
            <GreenBox>
              {
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              }
            </GreenBox>
          </RadioInput.Option>
        </RadioInput.Group>
      </VisualSpec>
      <VisualSpec label="when direction is inline">
        <RadioInput.Group
          name="fruits"
          value="apples"
          onChange={() => {}}
          direction="inline"
        >
          <RadioInput.Option value="apples">{'Apples'}</RadioInput.Option>
          <RadioInput.Option value="oranges">{'Oranges'}</RadioInput.Option>
        </RadioInput.Group>
      </VisualSpec>
      <VisualSpec label="when there is additional content">
        <RadioInput.Group
          name="fruits"
          value="apples"
          onChange={() => {}}
          direction="stack"
        >
          <RadioInput.Option
            value="apples"
            additionalContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          >
            {'Apples'}
          </RadioInput.Option>
          <RadioInput.Option value="oranges">{'Oranges'}</RadioInput.Option>
        </RadioInput.Group>
      </VisualSpec>
    </>
  ),
};
