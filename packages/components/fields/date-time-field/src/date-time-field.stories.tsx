import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import DateTimeField from './date-time-field';
import { VisualSpec } from '@/storybook-helpers';
import { useState } from 'react';

const meta: Meta<typeof DateTimeField> = {
  title: 'Form/Fields/DateTimeField',
  // @ts-expect-error @todo fix component and/or component-types
  component: DateTimeField,
  argTypes: {
    // @ts-expect-error
    timeZone: {
      control: 'select',
      options: [
        'UTC',
        'America/Los_Angeles',
        'America/New_York',
        'Asia/Tokyo',
        'Europe/Amsterdam',
      ],
    },
  },
};
export default meta;

type Story = StoryFn<typeof DateTimeField>;

export const BasicExample: Story = (args) => {
  const [value, onChange] = useState<string | undefined>('');

  return (
    <div style={{ height: 400 }}>
      {/** @ts-expect-error */}
      <DateTimeField
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
  // @ts-expect-error
  id: 'date-time-field-id',
  name: 'date-time-field-name',
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
  timeZone: 'UTC',
  isCondensed: false,
  isDisabled: false,
  isReadOnly: false,
  placeholder: 'Select a date and time',
  title: 'Release Date',
  hint: 'Select the date of publication',
  description: '',
  badge: '',
};

const value = '2018-11-30T13:25:59.500Z';
export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <DateTimeField
          timeZone="UTC"
          title="Release Date"
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
        />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <DateTimeField
          timeZone="UTC"
          title="Release Date"
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="when required">
        <DateTimeField
          timeZone="UTC"
          title="Release Date"
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          isRequired={true}
        />
      </VisualSpec>
      <VisualSpec label="with description">
        <DateTimeField
          timeZone="UTC"
          title="Release Date"
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          description="When will the product be avialable?"
        />
      </VisualSpec>
      <VisualSpec label="with placeholder">
        <DateTimeField
          timeZone="UTC"
          title="Release Date"
          horizontalConstraint={7}
          value=""
          onChange={() => {}}
          placeholder="Select release date"
        />
      </VisualSpec>
      <VisualSpec label="with error when not touched">
        <DateTimeField
          timeZone="UTC"
          title="Release Date"
          horizontalConstraint={7}
          value=""
          onChange={() => {}}
          errors={{ missing: true }}
        />
      </VisualSpec>
      <VisualSpec label="with error when touched">
        <DateTimeField
          timeZone="UTC"
          title="Release Date"
          horizontalConstraint={7}
          value=""
          onChange={() => {}}
          errors={{ missing: true }}
          touched={true}
        />
      </VisualSpec>
      <VisualSpec label="when read-only">
        <DateTimeField
          timeZone="UTC"
          title="Release Date"
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          isReadOnly
        />
      </VisualSpec>
      <VisualSpec label="with warning when not touched">
        <DateTimeField
          timeZone="UTC"
          title="Release Date"
          horizontalConstraint={7}
          value=""
          onChange={() => {}}
          warnings={{ customWarning: true }}
          renderWarning={() => 'Custom warning'}
        />
      </VisualSpec>
      <VisualSpec label="with warning when touched">
        <DateTimeField
          timeZone="UTC"
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
        <DateTimeField
          timeZone="UTC"
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
