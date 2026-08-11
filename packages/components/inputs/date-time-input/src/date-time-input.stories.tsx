import type { Meta, StoryObj } from '@storybook/react-vite';
import DateTimeInput, { TDateTimeInputProps } from './date-time-input';
import { VisualSpec } from '@/storybook-helpers';
import { useState } from 'react';
import { DateTimeInputWrapper } from './date-time-input-wrapper';

const meta: Meta<typeof DateTimeInputWrapper> = {
  title: 'Form/Inputs/DateTimeInput',
  component: DateTimeInputWrapper,
  argTypes: {
    timeZone: {
      control: { type: 'select' },
      options: [
        'UTC',
        'America/Los_Angeles',
        'America/New_York',
        'Asia/Tokyo',
        'Europe/Amsterdam',
      ],
    },
    appearance: {
      control: { type: 'select' },
      options: ['default', 'filter'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof DateTimeInputWrapper>;

export const BasicExample: Story = (args: TDateTimeInputProps) => {
  const [value, setValue] = useState<string>('');

  return (
    <div style={{ height: 400 }}>
      <DateTimeInputWrapper
        {...args}
        onChange={(e) => setValue(e.target.value || '')}
        value={value}
      />
    </div>
  );
};

BasicExample.args = {
  timeZone: 'UTC',
  horizontalConstraint: 8,
  appearance: 'default',
};

export const FilterAppearance: Story = (args: TDateTimeInputProps) => {
  const [value, setValue] = useState<string>('');

  return (
    <div style={{ height: 400 }}>
      <DateTimeInputWrapper
        {...args}
        onChange={(e) => setValue(e.target.value || '')}
        value={value}
      />
    </div>
  );
};

FilterAppearance.args = {
  timeZone: 'UTC',
  horizontalConstraint: 8,
  appearance: 'filter',
};

const value = '2018-11-13 15:00';

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <DateTimeInput
          value={value}
          timeZone="UTC"
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <DateTimeInput
          value={value}
          timeZone="UTC"
          onChange={() => {}}
          horizontalConstraint={7}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="when default placeholder is shown">
        <DateTimeInput
          value=""
          timeZone="UTC"
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when custom placeholder is shown">
        <DateTimeInput
          value=""
          timeZone="UTC"
          onChange={() => {}}
          horizontalConstraint={7}
          placeholder="Select date and time"
        />
      </VisualSpec>
      <VisualSpec label="with error">
        <DateTimeInput
          value={value}
          timeZone="UTC"
          onChange={() => {}}
          horizontalConstraint={7}
          hasError={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled with error">
        <DateTimeInput
          value={value}
          timeZone="UTC"
          onChange={() => {}}
          horizontalConstraint={7}
          hasError={true}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="with warning">
        <DateTimeInput
          value={value}
          timeZone="UTC"
          onChange={() => {}}
          horizontalConstraint={7}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled with warning">
        <DateTimeInput
          value={value}
          timeZone="UTC"
          onChange={() => {}}
          horizontalConstraint={7}
          hasWarning={true}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="with error and warning">
        <DateTimeInput
          value={value}
          timeZone="UTC"
          onChange={() => {}}
          horizontalConstraint={7}
          hasError={true}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="when readonly">
        <DateTimeInput
          value={value}
          timeZone="UTC"
          onChange={() => {}}
          horizontalConstraint={7}
          isReadOnly
        />
      </VisualSpec>
      <VisualSpec label="when readonly and disabled">
        <DateTimeInput
          value={value}
          timeZone="UTC"
          onChange={() => {}}
          horizontalConstraint={7}
          isReadOnly
          isDisabled
        />
      </VisualSpec>
      <VisualSpec label="when readonly and warning">
        <DateTimeInput
          value={value}
          timeZone="UTC"
          onChange={() => {}}
          horizontalConstraint={7}
          isReadOnly
          hasWarning
        />
      </VisualSpec>
      <VisualSpec label="when readonly and error">
        <DateTimeInput
          value={value}
          timeZone="UTC"
          onChange={() => {}}
          horizontalConstraint={7}
          isReadOnly
          hasError
        />
      </VisualSpec>
      <VisualSpec label="minimal">
        <DateTimeInput
          value={value}
          timeZone="UTC"
          isCondensed={true}
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
    </>
  ),
};
