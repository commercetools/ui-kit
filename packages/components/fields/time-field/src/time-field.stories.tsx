import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { iconArgType, VisualSpec } from '@/storybook-helpers';
import TimeField from './time-field';
import { useState } from 'react';

const meta: Meta<typeof TimeField> = {
  title: 'Form/Fields/TimeField',
  // @ts-expect-error @todo fix component and/or types
  component: TimeField,
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

type Story = StoryFn<typeof TimeField>;

export const BasicExample: Story = (args) => {
  const [value, onChange] = useState('12:30 PM');

  return (
    // @ts-expect-error
    <TimeField
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
  id: 'time-field-id',
  name: 'time-field-name',
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
  isCondensed: false,
  isDisabled: false,
  isReadOnly: false,
  placeholder: 'Placeholder text',
  title: 'Release Date',
  hint: 'Select the time of publication',
  description: '',
  onInfoButtonClick: () => alert('Info button clicked'),
  badge: '',
};

const value = '15:30';
export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <TimeField
          title="Release Time"
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
        />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <TimeField
          title="Release Time"
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="when required">
        <TimeField
          title="Release Time"
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          isRequired={true}
        />
      </VisualSpec>
      <VisualSpec label="with description">
        <TimeField
          title="Release Time"
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          description="At which time will the product be avialable?"
        />
      </VisualSpec>
      <VisualSpec label="with placeholder">
        <TimeField
          title="Release Time"
          horizontalConstraint={7}
          value=""
          onChange={() => {}}
          placeholder="Select release time"
        />
      </VisualSpec>
      <VisualSpec label="with error when not touched">
        <TimeField
          title="Release Time"
          horizontalConstraint={7}
          value=""
          onChange={() => {}}
          errors={{ missing: true }}
        />
      </VisualSpec>
      <VisualSpec label="with error when touched">
        <TimeField
          title="Release Time"
          horizontalConstraint={7}
          value=""
          onChange={() => {}}
          errors={{ missing: true }}
          touched={true}
        />
      </VisualSpec>
      <VisualSpec label="with warning when not touched">
        <TimeField
          title="Release Time"
          horizontalConstraint={7}
          value=""
          onChange={() => {}}
          warnings={{ customWarning: true }}
          renderWarning={() => 'Custom warning'}
        />
      </VisualSpec>
      <VisualSpec label="with warning when touched">
        <TimeField
          title="Release Time"
          horizontalConstraint={7}
          value=""
          onChange={() => {}}
          warnings={{ customWarning: true }}
          touched={true}
          renderWarning={() => 'Custom warning'}
        />
      </VisualSpec>
      <VisualSpec label="minimal">
        <TimeField
          title="Release Time"
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          isCondensed={true}
        />
      </VisualSpec>
    </>
  ),
};
