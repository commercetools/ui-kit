import type { Meta, StoryObj } from '@storybook/react';
import DateInput from './date-input';
import { useEffect, useState } from 'react';

const meta: Meta<typeof DateInput> = {
  title: 'Form/Inputs/DateInput',
  component: DateInput,
  argTypes: {
    appearance: {
      control: { type: 'select' },
      options: ['default', 'filter'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 350 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof DateInput>;
/**
 * > **Important:** Make sure the `value` property always reflects the most recent
 * > application-/form-state, otherwise the calendar-ui will be out of sync
 */
export const BasicExample: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<string>(args.value);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setValue(args.value || '');
    }, [args.value]);

    return (
      <div>
        <DateInput
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value || '')}
        />
      </div>
    );
  },
  args: {
    id: 'date-input',
    horizontalConstraint: 7,
    value: '',
    appearance: 'default',
  },
};

export const FilterAppearance: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<string>(args.value);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setValue(args.value || '');
    }, [args.value]);

    return (
      <div>
        <DateInput
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value || '')}
        />
      </div>
    );
  },
  args: {
    id: 'date-input-filter',
    horizontalConstraint: 7,
    value: '',
    appearance: 'filter',
  },
};
