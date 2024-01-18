import type { Meta, StoryObj } from '@storybook/react';
import { Value } from 'react-value';
import { getExampleDateStrings } from '@commercetools-uikit/calendar-utils';
import { iconArgType, horizontalConstraintArgType } from '@/storybook-helpers';
import DateField, { type TDateFieldProps } from './date-field';

const exampleDates = getExampleDateStrings();

type TDateFieldPropsAndCustomArgs = TDateFieldProps & {
  showInfoButton?: boolean;
};

const meta = {
  title: 'Components/Fields/DateField',
  component: DateField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
} satisfies Meta<TDateFieldPropsAndCustomArgs>;

export default meta;
type Story = StoryObj<TDateFieldPropsAndCustomArgs>;

export const Default: Story = {
  args: {
    name: '',
    hint: 'Select the date of publication',
    badge: '',
    minValue: exampleDates.minDate,
    maxValue: exampleDates.maxDate,
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    touched: false,
    placeholder: 'Placeholder',
    title: 'Release Date',
    description: '',
    showInfoButton: false,
    errors: {
      missing: true,
      customError: true,
    },
    horizontalConstraint: 7,
  },
  argTypes: {
    hintIcon: iconArgType,
    horizontalConstraint: horizontalConstraintArgType({
      min: 6,
    }),
  },
  parameters: { controls: { exclude: ['onChange', 'value', 'id'] } },
  render: (args) => {
    return (
      <Value
        defaultValue={exampleDates.preselectedDate}
        render={(value, onChange) => {
          return (
            <DateField
              id={args.name?.trim() === '' ? undefined : args.name}
              horizontalConstraint={args.horizontalConstraint}
              errors={args.errors}
              renderError={(key) => {
                switch (key) {
                  case 'customError':
                    return 'A custom error.';
                  default:
                    return null;
                }
              }}
              isRequired={args.isRequired}
              touched={args.touched}
              name={args.name}
              value={value}
              minValue={args.minValue}
              maxValue={args.maxValue}
              isDisabled={args.isDisabled}
              isReadOnly={args.isReadOnly}
              placeholder={
                args.placeholder === '' ? undefined : args.placeholder
              }
              onChange={(event) => {
                onChange(event.target.value ?? '');
              }}
              title={args.title}
              hint={args.hint}
              description={args.description}
              onInfoButtonClick={args.showInfoButton ? () => {} : undefined}
              hintIcon={args.hintIcon}
              badge={args.badge}
            />
          );
        }}
      />
    );
  },
};
