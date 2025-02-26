import type { Meta, StoryFn } from '@storybook/react';
import DateRangeField from './date-range-field';
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
