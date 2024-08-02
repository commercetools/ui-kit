import type { Meta, StoryFn } from '@storybook/react';
import LocalizedMoneyInput from './localized-money-input';
import { useState } from 'react';

const meta: Meta<typeof LocalizedMoneyInput> = {
  title: 'form/LocalizedMoneyInput',
  // @ts-ignore
  component: LocalizedMoneyInput,
  argTypes: {
    selectedCurrency: {
      control: 'select',
      options: ['EUR', 'USD', 'EGP'],
    },
  },
};
export default meta;

type Story = StoryFn<typeof LocalizedMoneyInput>;

export const BasicExample: Story = ({
  value: propsValue,
  defaultExpandCurrencies,
  ...args
}) => {
  const [value, setValue] = useState(
    propsValue || {
      EUR: { currencyCode: 'EUR', amount: '' },
      USD: { currencyCode: 'USD', amount: '' },
      EGP: { currencyCode: 'EGP', amount: '' },
    }
  );

  return (
    <LocalizedMoneyInput
      defaultExpandCurrencies={
        // we need to set undefined instead of false to avoid prop-type
        // warnings in case hideCurrencyExpansionControls is true
        defaultExpandCurrencies || undefined
      }
      data-test="foo"
      {...args}
      value={value}
      onChange={(event) => {
        setValue((currentValue) => ({
          ...currentValue,
          // @ts-ignore
          [event.target.currency]: {
            // @ts-ignore
            currencyCode: event.target.currency,
            amount: event.target.value,
          },
        }));
      }}
    />
  );
};

BasicExample.args = {
  id: 'moneyinput-id',
  name: 'moneyinput-name',
  defaultExpandCurrencies: false,
  hasHighPrecisionBadge: false,
  value: {
    EUR: { currencyCode: 'EUR', amount: '' },
    USD: { currencyCode: 'USD', amount: '' },
    EGP: { currencyCode: 'EGP', amount: '' },
  },
  hideCurrencyExpansionControls: false,
  isCondensed: false,
  isDisabled: false,
  isReadOnly: false,
  placeholder: { EUR: '€', USD: '$', EGP: 'E£' },
  horizontalConstraint: 7,
  hasError: false,
  selectedCurrency: 'EUR',
};
