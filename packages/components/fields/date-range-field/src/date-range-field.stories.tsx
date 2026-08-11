import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import DateRangeField from './date-range-field';
import { VisualSpec } from '@/storybook-helpers';
import { useState } from 'react';
import { type MomentInput } from 'moment';

const meta: Meta<typeof DateRangeField> = {
  title: 'Form/Fields/DateRangeField',
  /** @ts-expect-error @todo refactor component/component-types*/
  component: DateRangeField,
};
export default meta;

type Story = StoryFn<typeof DateRangeField>;

export const BasicExample: Story = (args) => {
  const [value, onChange] = useState<MomentInput[] | undefined>(undefined);

  return (
    <div style={{ height: 350 }}>
      {/** @ts-expect-error  */}
      <DateRangeField
        {...args}
        value={(value || []).map(String)}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
    </div>
  );
};

BasicExample.args = {
  // @ts-expect-error
  id: 'date-range-field-id',
  name: 'date-range-field-name',
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
  placeholder: 'Set a start- & end-date...',
  title: 'Free vacations',
  hint: 'Select when you want to have free vacations',
  description: '',
  badge: '',
  onInfoButtonClick: () =>
    alert(`You won't actually get any free vacations :(`),
};

const value = ['2018-09-20', '2018-09-24'];
export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <DateRangeField
          title="Discounted days"
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
        />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <DateRangeField
          title="Discounted days"
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="when required">
        <DateRangeField
          title="Discounted days"
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          isRequired={true}
        />
      </VisualSpec>
      <VisualSpec label="with description">
        <DateRangeField
          title="Discounted days"
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          description="When will the product be discounted?"
        />
      </VisualSpec>
      <VisualSpec label="with placeholder">
        <DateRangeField
          title="Discounted days"
          horizontalConstraint={7}
          value={[]}
          onChange={() => {}}
          placeholder="Select release date"
        />
      </VisualSpec>
      <VisualSpec label="with error when not touched">
        <DateRangeField
          title="Discounted days"
          horizontalConstraint={7}
          value={[]}
          onChange={() => {}}
          errors={{ missing: true }}
        />
      </VisualSpec>
      <VisualSpec label="with error when touched">
        <DateRangeField
          title="Discounted days"
          horizontalConstraint={7}
          value={[]}
          onChange={() => {}}
          errors={{ missing: true }}
          touched={true}
        />
      </VisualSpec>
      <VisualSpec label="when read-only">
        <DateRangeField
          title="Discounted Days"
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          isReadOnly
        />
      </VisualSpec>
      <VisualSpec label="with warning when not touched">
        <DateRangeField
          title="Discounted days"
          horizontalConstraint={7}
          value={[]}
          onChange={() => {}}
          warnings={{ customWarning: true }}
          renderWarning={() => 'Custom warning'}
        />
      </VisualSpec>
      <VisualSpec label="with warning when touched">
        <DateRangeField
          title="Discounted days"
          horizontalConstraint={7}
          value={[]}
          onChange={() => {}}
          warnings={{ customWarning: true }}
          touched={true}
          renderWarning={() => 'Custom warning'}
        />
      </VisualSpec>
      <VisualSpec label="is condensed">
        <DateRangeField
          title="Discounted days"
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          isCondensed={true}
        />
      </VisualSpec>
    </>
  ),
};
