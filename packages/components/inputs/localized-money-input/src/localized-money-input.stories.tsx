import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import LocalizedMoneyInput from './localized-money-input';
import { VisualSpec } from '@/storybook-helpers';
import { useState } from 'react';

const meta: Meta<typeof LocalizedMoneyInput> = {
  title: 'Form/Inputs/LocalizedMoneyInput',
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

// `as const` so currencyCode narrows to its literal; TValue types it as a
// union of currency codes, not string.
const value = {
  EUR: {
    currencyCode: 'EUR',
    amount: '12.77',
  },
  USD: {
    currencyCode: 'USD',
    amount: '13.55',
  },
  CAD: {
    currencyCode: 'CAD',
    amount: '19.82',
  },
} as const;

const highPrecisionValue = {
  CAD: {
    currencyCode: 'CAD',
    amount: '13.501',
  },
} as const;

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <LocalizedMoneyInput
          value={value}
          onChange={() => {}}
          selectedCurrency="CAD"
        />
      </VisualSpec>
      <VisualSpec label="when currencies expanded by default">
        <LocalizedMoneyInput
          value={value}
          onChange={() => {}}
          selectedCurrency="CAD"
          defaultExpandCurrencies={true}
        />
      </VisualSpec>
      <VisualSpec label="when expansion controls are hidden">
        <LocalizedMoneyInput
          value={value}
          onChange={() => {}}
          selectedCurrency="CAD"
          horizontalConstraint={7}
          hideCurrencyExpansionControls={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled and open">
        <LocalizedMoneyInput
          value={value}
          onChange={() => {}}
          selectedCurrency="CAD"
          horizontalConstraint={7}
          isDisabled={true}
          defaultExpandCurrencies={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled and closed">
        <LocalizedMoneyInput
          value={value}
          onChange={() => {}}
          selectedCurrency="CAD"
          horizontalConstraint={7}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="when readonly and open">
        <LocalizedMoneyInput
          value={value}
          onChange={() => {}}
          selectedCurrency="CAD"
          horizontalConstraint={7}
          isReadOnly={true}
          defaultExpandCurrencies={true}
        />
      </VisualSpec>
      <VisualSpec label="when readonly and closed">
        <LocalizedMoneyInput
          value={value}
          onChange={() => {}}
          selectedCurrency="CAD"
          horizontalConstraint={7}
          isReadOnly={true}
        />
      </VisualSpec>
      <VisualSpec label="when condensed and open">
        <LocalizedMoneyInput
          value={value}
          onChange={() => {}}
          selectedCurrency="CAD"
          horizontalConstraint={7}
          isCondensed={true}
          defaultExpandCurrencies={true}
        />
      </VisualSpec>
      <VisualSpec label="when condensed and closed">
        <LocalizedMoneyInput
          value={value}
          onChange={() => {}}
          selectedCurrency="CAD"
          horizontalConstraint={7}
          isCondensed={true}
        />
      </VisualSpec>
      <VisualSpec label="when there is an error for a specific currency (first one)">
        <LocalizedMoneyInput
          value={value}
          onChange={() => {}}
          selectedCurrency="CAD"
          horizontalConstraint={7}
          errors={{ CAD: 'foo' }}
        />
      </VisualSpec>
      <VisualSpec label="when there is an error for a specific currency (second one)">
        <LocalizedMoneyInput
          value={value}
          onChange={() => {}}
          selectedCurrency="CAD"
          horizontalConstraint={7}
          errors={{ EUR: 'foo' }}
        />
      </VisualSpec>
      <VisualSpec label="when there is a warning for a specific currency (first one)">
        <LocalizedMoneyInput
          value={value}
          onChange={() => {}}
          selectedCurrency="CAD"
          horizontalConstraint={7}
          warnings={{ CAD: 'foo' }}
        />
      </VisualSpec>
      <VisualSpec label="when there is a warning for a specific currency (second one)">
        <LocalizedMoneyInput
          value={value}
          onChange={() => {}}
          selectedCurrency="CAD"
          horizontalConstraint={7}
          warnings={{ EUR: 'foo' }}
        />
      </VisualSpec>
      <VisualSpec label="when there is a general error">
        <LocalizedMoneyInput
          value={value}
          onChange={() => {}}
          selectedCurrency="CAD"
          horizontalConstraint={7}
          hasError={true}
        />
      </VisualSpec>
      <VisualSpec label="when there is a general warning">
        <LocalizedMoneyInput
          value={value}
          onChange={() => {}}
          selectedCurrency="CAD"
          horizontalConstraint={7}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="with high precision badge and regular price">
        <LocalizedMoneyInput
          value={value}
          onChange={() => {}}
          selectedCurrency="CAD"
          horizontalConstraint={7}
          hasHighPrecisionBadge={true}
        />
      </VisualSpec>
      <VisualSpec label="with high precision badge and high precision price">
        <LocalizedMoneyInput
          value={highPrecisionValue}
          onChange={() => {}}
          selectedCurrency="CAD"
          horizontalConstraint={7}
          hasHighPrecisionBadge={true}
        />
      </VisualSpec>
    </>
  ),
};
