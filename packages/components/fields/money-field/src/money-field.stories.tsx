import type { Meta, StoryObj } from '@storybook/react';
import {
  horizontalConstraintArgType,
  hideControls,
  iconArgType,
} from '@/storybook-helpers';

import MoneyField, {
  TValue,
  type TMoneyFieldProps,
  TCustomEvent,
} from './money-field';
import { useState } from 'react';

const meta = {
  title: 'Components/Fields/MoneyField',
  component: MoneyField,
  argTypes: {
    ...hideControls([
      'currencies',
      'renderError',
      'renderWarning',
      'menuPortalTarget',
      'menuPortalZIndex',
    ]),
    horizontalConstraint: horizontalConstraintArgType(),
    hintIcon: iconArgType,
    touched: {
      control: 'select',
      options: ['yes', 'no'],
      mapping: {
        yes: { amount: true, currencyCode: true },
        no: { amount: false, currencyCode: false },
      },
    },
  },
} satisfies Meta<TMoneyFieldProps>;

export default meta;
type Story = StoryObj<TMoneyFieldProps>;

function MoneyFieldStory(props: TMoneyFieldProps) {
  const [value, updateValue] = useState<TValue>({
    amount: '',
    currencyCode: 'EUR',
  });

  const onChange = (event: TCustomEvent) => {
    if (event.target.name?.endsWith('.amount')) {
      updateValue({ ...value, amount: event.target.value as string });
    }
    if (event.target.name?.endsWith('.currencyCode')) {
      updateValue({
        ...value,
        currencyCode: event.target.value as TValue['currencyCode'],
      });
    }
  };

  return <MoneyField {...props} onChange={onChange} value={value} />;
}

export const Default: Story = {
  args: {
    // MoneyField
    id: 'default-name',
    warnings: {
      customWarning: true,
    },
    errors: { missing: true, customError: true },
    renderError: (key: string) => {
      switch (key) {
        case 'customError':
          return 'A custom error.';
        default:
          return null;
      }
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
    touched: { amount: false, currencyCode: false },
    horizontalConstraint: 7,
    // MoneyInput
    name: 'default-name',
    currencies: ['EUR', 'USD', 'AED', 'KWD', 'JPY'],
    value: {
      currencyCode: 'EUR',
      amount: '',
    },
    placeholder: 'Placeholder',
    // LabelField
    title: 'Price',
    hint: 'How much is the fish?',
    description: '',
    hasHighPrecisionBadge: false,
    menuPortalZIndex: 1,
    menuPortalTarget: document.body,
  },
  render: (args) => <MoneyFieldStory {...args} />,
};
