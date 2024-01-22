import {
  iconArgType,
  horizontalConstraintArgType,
  withControlledValue,
} from '@/storybook-helpers';
import type { Meta, StoryObj } from '@storybook/react';
import TimeField, { type TTimeFieldProps } from './time-field';

type TTimeFieldPropsAndCustomArgs = TTimeFieldProps & {
  showInfoButton?: boolean;
};

const meta = {
  title: 'Components/Fields/TimeField',
  component: TimeField,
  tags: ['autodocs'],
} satisfies Meta<TTimeFieldPropsAndCustomArgs>;

export default meta;
type Story = StoryObj<TTimeFieldPropsAndCustomArgs>;

export const Default: Story = {
  args: {
    name: '',
    hint: 'Select the time of publication',
    badge: '',
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
    horizontalConstraint: horizontalConstraintArgType({ min: 3 }),
  },
  render: withControlledValue<TTimeFieldPropsAndCustomArgs>({
    Component: (args) => (
      // @ts-ignore value and onChange props are passed within the withControlledValue HOC
      <TimeField
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
        isDisabled={args.isDisabled}
        isReadOnly={args.isReadOnly}
        placeholder={args.placeholder === '' ? undefined : args.placeholder}
        title={args.title}
        hint={args.hint}
        description={args.description}
        onInfoButtonClick={args.showInfoButton ? () => {} : undefined}
        hintIcon={args.hintIcon}
        badge={args.badge}
      />
    ),
  }),
};
