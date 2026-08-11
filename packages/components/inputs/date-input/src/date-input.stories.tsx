import type { Meta, StoryObj } from '@storybook/react-vite';
import DateInput from './date-input';
import { VisualSpec } from '@/storybook-helpers';
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

const value = '2018-11-13';

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <DateInput value={value} onChange={() => {}} horizontalConstraint={7} />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <DateInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is shown">
        <DateInput
          value=""
          onChange={() => {}}
          horizontalConstraint={7}
          placeholder="Select something"
        />
      </VisualSpec>
      <VisualSpec label="with error">
        <DateInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          hasError={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled with error">
        <DateInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isDisabled={true}
          hasError={true}
        />
      </VisualSpec>
      <VisualSpec label="with warning">
        <DateInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled with warning">
        <DateInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isDisabled={true}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="with error and warning">
        <DateInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          hasError={true}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="when readonly">
        <DateInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isReadOnly
        />
      </VisualSpec>
      <VisualSpec label="when readonly and disabled">
        <DateInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isReadOnly
          isDisabled
        />
      </VisualSpec>
      <VisualSpec label="when readonly and warning">
        <DateInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isReadOnly
          hasWarning
        />
      </VisualSpec>
      <VisualSpec label="when readonly and error">
        <DateInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          isReadOnly
          hasError
        />
      </VisualSpec>
      <VisualSpec label="with isCondensed">
        <DateInput
          value=""
          onChange={() => {}}
          isCondensed={true}
          horizontalConstraint={7}
          placeholder="Select something"
        />
      </VisualSpec>
      <VisualSpec label="with filter appearance">
        <DateInput
          value={value}
          onChange={() => {}}
          isCondensed={true}
          horizontalConstraint={7}
          placeholder="Select something"
          appearance="filter"
        />
      </VisualSpec>
    </>
  ),
};
