import type { Meta, StoryFn } from '@storybook/react';
import MoneyInput, { TCurrencyCode } from './money-input';
import { useState } from 'react';

const meta: Meta<typeof MoneyInput> = {
  title: 'form/MoneyInput',
  component: MoneyInput,
};
export default meta;

type Story = StoryFn<typeof MoneyInput>;

export const BasicExample: Story = ({ value: propsValue, ...args }) => {
  const [amount, setAmount] = useState((propsValue && propsValue.amount) || '');
  const [currencyCode, setCurrencyCode] = useState<TCurrencyCode | ''>(
    (propsValue && propsValue.currencyCode) || ''
  );

  const value = {
    amount,
    currencyCode,
  };

  return (
    <div style={{ height: 250 }}>
      <MoneyInput
        {...args}
        value={value}
        onChange={(event) => {
          if (!event.target.name) return;

          if (event.target.name.endsWith('.amount')) {
            setAmount(event.target.value as string);
          }

          if (event.target.name.endsWith('.currencyCode')) {
            setCurrencyCode(event.target.value as TCurrencyCode);
          }
        }}
      />
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
};

BasicExample.args = {
  currencies: ['EUR', 'USD', 'AED', 'KWD', 'JPY'],
  name: 'money-input',
  placeholder: 'Placeholder',
  isDisabled: false,
  isReadOnly: false,
  isAutofocussed: false,
  isCurrencyInputDisabled: false,
  hasError: false,
  hasWarning: false,
  horizontalConstraint: 7,
  hasHighPrecisionBadge: false,
};
