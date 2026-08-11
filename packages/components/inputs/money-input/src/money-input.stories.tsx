import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import MoneyInput, { TCurrencyCode } from './money-input';
import { VisualSpec } from '@/storybook-helpers';
import { useState } from 'react';

const meta: Meta<typeof MoneyInput> = {
  title: 'Form/Inputs/MoneyInput',
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

const value = {
  amount: '13.50',
  currencyCode: 'EUR',
} as const;

const highPrecisionValue = {
  amount: '13.501',
  currencyCode: 'EUR',
} as const;

const emptyValue = { amount: '', currencyCode: '' } as const;

const currencies: TCurrencyCode[] = ['EUR', 'USD'];

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <MoneyInput
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          currencies={currencies}
        />
      </VisualSpec>
      <VisualSpec label="with only one currency">
        <MoneyInput
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          currencies={['EUR']}
        />
      </VisualSpec>
      <VisualSpec label="with high precision">
        <MoneyInput
          horizontalConstraint={7}
          value={highPrecisionValue}
          onChange={() => {}}
          currencies={currencies}
          hasHighPrecisionBadge={true}
        />
      </VisualSpec>
      <VisualSpec label="with high precision badge and disabled">
        <MoneyInput
          horizontalConstraint={7}
          value={highPrecisionValue}
          onChange={() => {}}
          currencies={currencies}
          isDisabled={true}
          hasHighPrecisionBadge={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <MoneyInput
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          currencies={currencies}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="when only the currency select input is disabled">
        <MoneyInput
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          currencies={currencies}
          isCurrencyInputDisabled={true}
        />
      </VisualSpec>
      {/* The route passed `description`, which MoneyInput does not read. */}
      <VisualSpec label="with description">
        <MoneyInput
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          currencies={currencies}
        />
      </VisualSpec>
      <VisualSpec label="with placeholder">
        <MoneyInput
          horizontalConstraint={7}
          value={emptyValue}
          onChange={() => {}}
          currencies={currencies}
          placeholder="Please enter a price"
        />
      </VisualSpec>
      <VisualSpec label="with error">
        <MoneyInput
          horizontalConstraint={7}
          value={emptyValue}
          onChange={() => {}}
          currencies={currencies}
          hasError={true}
        />
      </VisualSpec>
      <VisualSpec label="with warning">
        <MoneyInput
          horizontalConstraint={7}
          value={emptyValue}
          onChange={() => {}}
          currencies={currencies}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="when readOnly">
        <MoneyInput
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          currencies={currencies}
          isReadOnly={true}
        />
      </VisualSpec>
      <VisualSpec label="without currencies">
        <MoneyInput
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          currencies={[]}
        />
      </VisualSpec>
      <VisualSpec label="without currencies - when readOnly">
        <MoneyInput
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          currencies={[]}
          isReadOnly={true}
        />
      </VisualSpec>
      <VisualSpec label="without currencies - when disabled">
        <MoneyInput
          horizontalConstraint={7}
          value={value}
          onChange={() => {}}
          currencies={[]}
          isDisabled={true}
        />
      </VisualSpec>
    </>
  ),
};
