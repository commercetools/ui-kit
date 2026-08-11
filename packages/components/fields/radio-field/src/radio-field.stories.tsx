import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { iconArgType, VisualSpec } from '@/storybook-helpers';
import RadioField from './radio-field';
import { useState } from 'react';
import RadioInput from '@commercetools-uikit/radio-input';

const meta: Meta<typeof RadioField> = {
  title: 'Form/Fields/RadioField',
  // @ts-expect-error, fix component and/or types
  component: RadioField,
  subcomponents: {
    'RadioInput.Option': RadioInput.Option,
  },
  argTypes: {
    // @ts-expect-error
    hintIcon: iconArgType,
    title: { control: { type: 'text' } },
    hint: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    badge: { control: { type: 'text' } },
  },
};
export default meta;

type Story = StoryFn<typeof RadioField>;

const options = [
  {
    id: 1,
    value: 'apple',
    label: '🍎 Apple',
  },
  {
    id: 2,
    value: 'banana',
    label: '🍌 Banana',
  },
  {
    id: 3,
    value: 'pineapple',
    label: '🍍 Pineapple',
  },
  {
    id: 4,
    value: 'funghi',
    label: '🍄 Funghi',
    isDisabled: true,
  },
];

export const BasicExample: Story = (args) => {
  const [value, onChange] = useState('apple');

  return (
    // @ts-expect-error
    <RadioField
      {...args}
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    >
      {options.map((option) => (
        // @ts-expect-error
        <RadioInput.Option key={option.id} {...option}>
          {option.label}
        </RadioInput.Option>
      ))}
    </RadioField>
  );
};

BasicExample.args = {
  // @ts-expect-error
  id: 'radio-field-id',
  horizontalConstraint: 7,
  errors: { missing: true, customError: true },
  renderError: (key: string) => {
    switch (key) {
      case 'customError':
        return 'A custom error.';
      default:
        return null;
    }
  },
  warnings: {
    customWarning: true,
  },
  renderWarning: (key: string) => {
    switch (key) {
      case 'customWarning':
        return 'A custom warning.';
      default:
        return null;
    }
  },
  isRequired: false,
  touched: false,
  isDisabled: false,
  isReadOnly: false,
  title: 'Fruits',
  hint: 'Select an option',
  description: '',
  onInfoButtonClick: () => alert('info button clicked'),
  badge: '',
  direction: 'stack',
  directionProps: {
    scale: 'm',
  },
};

const visualValue = 'apple';
export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <RadioField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          horizontalConstraint={7}
        >
          <RadioInput.Option value="apple">{'Apple'}</RadioInput.Option>
          <RadioInput.Option value="orange">{'Banana'}</RadioInput.Option>
        </RadioField>
      </VisualSpec>
      <VisualSpec label="when required">
        <RadioField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          horizontalConstraint={7}
          isRequired={true}
        >
          <RadioInput.Option value="apple">{'Apple'}</RadioInput.Option>
          <RadioInput.Option value="orange">{'Banana'}</RadioInput.Option>
        </RadioField>
      </VisualSpec>
      <VisualSpec label="when disabled">
        <RadioField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          horizontalConstraint={7}
          isDisabled={true}
        >
          <RadioInput.Option value="apple">{'Apple'}</RadioInput.Option>
          <RadioInput.Option value="orange">{'Banana'}</RadioInput.Option>
        </RadioField>
      </VisualSpec>
      <VisualSpec label="when readonly">
        <RadioField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          horizontalConstraint={7}
          isReadOnly={true}
        >
          <RadioInput.Option value="apple">{'Apple'}</RadioInput.Option>
          <RadioInput.Option value="orange">{'Banana'}</RadioInput.Option>
        </RadioField>
      </VisualSpec>
      <VisualSpec label="with error when not touched">
        <RadioField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          horizontalConstraint={7}
          errors={{ missing: true }}
        >
          <RadioInput.Option value="apple">{'Apple'}</RadioInput.Option>
          <RadioInput.Option value="orange">{'Banana'}</RadioInput.Option>
        </RadioField>
      </VisualSpec>
      <VisualSpec label="with error when touched">
        <RadioField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          horizontalConstraint={7}
          errors={{ missing: true }}
          touched={true}
        >
          <RadioInput.Option value="apple">{'Apple'}</RadioInput.Option>
          <RadioInput.Option value="orange">{'Banana'}</RadioInput.Option>
        </RadioField>
      </VisualSpec>
      <VisualSpec label="with warning when not touched">
        <RadioField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          horizontalConstraint={7}
          warnings={{ customWarning: true }}
          renderWarning={() => 'Custom warning'}
        >
          <RadioInput.Option value="apple">{'Apple'}</RadioInput.Option>
          <RadioInput.Option value="orange">{'Banana'}</RadioInput.Option>
        </RadioField>
      </VisualSpec>
      <VisualSpec label="with warning when touched">
        <RadioField
          title="Welcome Text"
          value={visualValue}
          onChange={() => {}}
          horizontalConstraint={7}
          warnings={{ customWarning: true }}
          touched={true}
          renderWarning={() => 'Custom warning'}
        >
          <RadioInput.Option value="apple">{'Apple'}</RadioInput.Option>
          <RadioInput.Option value="orange">{'Banana'}</RadioInput.Option>
        </RadioField>
      </VisualSpec>
    </>
  ),
};
