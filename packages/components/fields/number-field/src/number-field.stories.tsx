import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { iconArgType, VisualSpec } from '@/storybook-helpers';
import NumberField from './number-field';
import { useState } from 'react';

const meta: Meta<typeof NumberField> = {
  title: 'Form/Fields/NumberField',
  // @ts-expect-error, fix component and/or types
  component: NumberField,
  argTypes: {
    // @ts-expect-error
    title: { control: 'text' },
    hint: { control: 'text' },
    description: { control: 'text' },
    badge: { control: 'text' },
    hintIcon: iconArgType,
  },
};
export default meta;

type Story = StoryFn<typeof NumberField>;

export const BasicExample: Story = (args) => {
  const [value, onChange] = useState('');

  return (
    // @ts-expect-error
    <NumberField
      {...args}
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    />
  );
};

BasicExample.args = {
  // @ts-expect-error
  id: 'number-field-id',
  name: 'number-field-name',
  horizontalConstraint: 7,
  warnings: {
    customWarning: true,
  },
  errors: { missing: true, customError: true },
  renderError: (key: string) => {
    switch (key) {
      case 'customError':
        return 'A custom error.';
      default:
        return null;
    }
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
  isAutofocussed: false,
  isDisabled: false,
  isReadOnly: false,
  placeholder: 'Placeholder text',
  title: 'Age',
  min: 18,
  max: 128,
  step: 1,
  hint: 'Enter your age',
  description: '',
  onInfoButtonClick: () => alert('info button clicked'),
  badge: '',
};

const value = '12.50';
export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <NumberField
          title="Age"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when required">
        <NumberField
          title="Age"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isRequired={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <NumberField
          title="Age"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="when read-only">
        <NumberField
          title="Age"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isReadOnly={true}
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is shown">
        <NumberField
          title="Age"
          value=""
          onChange={() => {}}
          horizontalConstraint={7}
          placeholder="Enter a text"
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is shown and input is disabled">
        <NumberField
          title="Age"
          value=""
          onChange={() => {}}
          horizontalConstraint={7}
          isDisabled={true}
          placeholder="Enter a text"
        />
      </VisualSpec>
      <VisualSpec label="with error when not touched">
        <NumberField
          title="Age"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          errors={{ missing: true }}
        />
      </VisualSpec>
      <VisualSpec label="with error when touched">
        <NumberField
          title="Age"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          errors={{ missing: true }}
          touched={true}
        />
      </VisualSpec>
      <VisualSpec label="with warning when not touched">
        <NumberField
          title="Age"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          warnings={{ customWarning: true }}
          renderWarning={() => 'Custom warning'}
        />
      </VisualSpec>
      <VisualSpec label="with warning when touched">
        <NumberField
          title="Age"
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          warnings={{ customWarning: true }}
          touched={true}
          renderWarning={() => 'Custom warning'}
        />
      </VisualSpec>
    </>
  ),
};
