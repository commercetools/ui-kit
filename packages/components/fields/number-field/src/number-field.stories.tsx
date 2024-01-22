import {
  iconArgType,
  horizontalConstraintArgType,
  withControlledValue,
} from '@/storybook-helpers';
import type { Meta, StoryObj } from '@storybook/react';
import NumberField, { type TNumberFieldProps } from './number-field';

type TNumberFieldPropsAndCustomArgs = TNumberFieldProps & {
  showInfoButton?: boolean;
};

const meta = {
  title: 'Components/Fields/NumberField',
  component: NumberField,
  tags: ['autodocs'],
} satisfies Meta<TNumberFieldPropsAndCustomArgs>;

export default meta;
type Story = StoryObj<TNumberFieldPropsAndCustomArgs>;

export const Default: Story = {
  args: {
    name: '',
    hint: 'Enter your age',
    badge: '',
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    touched: false,
    placeholder: 'Placeholder',
    title: 'Age',
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
    horizontalConstraint: horizontalConstraintArgType(),
  },
  render: withControlledValue<TNumberFieldPropsAndCustomArgs>({
    Component: (args) => (
      // @ts-ignore value and onChange props are passed by the withControlledValue HOC
      <NumberField
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
