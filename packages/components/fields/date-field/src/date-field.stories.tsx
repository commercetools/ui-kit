import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import DateField from './date-field';
import { VisualSpec } from '@/storybook-helpers';
import { getExampleDateStrings } from '@commercetools-uikit/calendar-utils';
import { useState } from 'react';
import { iconArgType } from '@/storybook-helpers';

const meta: Meta<typeof DateField> = {
  title: 'Form/Fields/DateField',
  // @ts-expect-error, @todo refactory component and/or component-types
  component: DateField,
  argTypes: {
    // @ts-expect-error
    hintIcon: iconArgType,
  },
};
export default meta;

type Story = StoryFn<typeof DateField>;

const exampleDates = getExampleDateStrings();

export const BasicExample: Story = (args) => {
  const [value, onChange] = useState<string | undefined>('');

  return (
    <div style={{ height: 400 }}>
      {/* @ts-expect-error, @todo refactory component and/or component-types */}
      <DateField
        {...args}
        value={value || ''}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
    </div>
  );
};

BasicExample.args = {
  // @ts-expect-error, @todo refactory component and/or component-types
  name: 'dateField-name',
  id: 'dateField-id',
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
  minValue: exampleDates.minDate,
  maxValue: exampleDates.maxDate,
  isCondensed: false,
  isDisabled: false,
  isReadOnly: false,
  placeholder: 'Set a date...',
  title: 'Release Date',
  hint: 'Select the date of publication',
  description: '',
  badge: '',
};

const value = '2018-09-20';
export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <DateField
          title="Release Date"
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
        />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <DateField
          title="Release Date"
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="when required">
        <DateField
          title="Release Date"
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          isRequired={true}
        />
      </VisualSpec>
      <VisualSpec label="with description">
        <DateField
          title="Release Date"
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          description="When will the product be avialable?"
        />
      </VisualSpec>
      <VisualSpec label="with placeholder">
        <DateField
          title="Release Date"
          horizontalConstraint={7}
          value=""
          onChange={() => {}}
          placeholder="Select release date"
        />
      </VisualSpec>
      <VisualSpec label="with error when not touched">
        <DateField
          title="Release Date"
          horizontalConstraint={7}
          value=""
          onChange={() => {}}
          errors={{ missing: true }}
        />
      </VisualSpec>
      <VisualSpec label="with error when touched">
        <DateField
          title="Release Date"
          horizontalConstraint={7}
          value=""
          onChange={() => {}}
          errors={{ missing: true }}
          touched={true}
        />
      </VisualSpec>
      <VisualSpec label="when read-only">
        <DateField
          title="Release Date"
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          isReadOnly
        />
      </VisualSpec>
      <VisualSpec label="with warning when not touched">
        <DateField
          title="Release Date"
          horizontalConstraint={7}
          value=""
          onChange={() => {}}
          warnings={{ customWarning: true }}
          renderWarning={() => 'Custom warning'}
        />
      </VisualSpec>
      <VisualSpec label="with warning when touched">
        <DateField
          title="Release Date"
          horizontalConstraint={7}
          value=""
          onChange={() => {}}
          warnings={{ customWarning: true }}
          touched={true}
          renderWarning={() => 'Custom warning'}
        />
      </VisualSpec>
      <VisualSpec label="is condensed">
        <DateField
          title="Release Date"
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          isCondensed={true}
        />
      </VisualSpec>
    </>
  ),
};
