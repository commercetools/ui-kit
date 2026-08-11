import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import MoneyField from './money-field';
import { type TCurrencyCode } from '@commercetools-uikit/money-input';
import { VisualSpec } from '@/storybook-helpers';
import { useState } from 'react';
import { iconArgType } from '@/storybook-helpers';

const meta: Meta<typeof MoneyField> = {
  title: 'Form/Fields/MoneyField',
  // @ts-expect-error, refactor component/types
  component: MoneyField,
  argTypes: {
    // @ts-expect-error,
    title: { control: 'text' },
    hint: { control: 'text' },
    description: { control: 'text' },
    menuShouldBlockScroll: { control: 'boolean' },
    hintIcon: iconArgType,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '320px' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryFn<typeof MoneyField>;

const currencies = ['EUR', 'USD', 'AED', 'KWD', 'JPY'];

export const BasicExample: Story = (args) => {
  const [value, onChange] = useState({
    amount: '123.45',
    currencyCode: 'EUR',
  });

  console.log('vlaue is', value);

  return (
    <MoneyField
      {...args}
      // @ts-expect-error
      value={value}
      onChange={(event) => {
        if (event.target.name?.endsWith('.amount')) {
          onChange((currentVal) => {
            return {
              ...currentVal,
              amount: event.target.value as string,
            };
          });
        }

        if (event.target.name?.endsWith('.currencyCode')) {
          onChange((currentVal) => {
            return {
              ...currentVal,
              currencyCode: event.target.value as string,
            };
          });
        }
      }}
    />
  );
};

BasicExample.args = {
  // @ts-expect-error
  id: 'money-field-id',
  name: 'money-field-name',
  currencies,
  horizontalConstraint: 7,
  isRequired: false,
  touched: { amount: true, currencyCode: true },
  placeholder: 'Placeholder text',
  isDisabled: false,
  isReadOnly: false,
  isAutofocussed: false,
  isCurrencyInputDisabled: false,
  title: 'Price',
  hint: 'How much is the fish?',
  description: '',
  onInfoButtonClick: () => alert('info button clicked'),
  hasHighPrecisionBadge: false,
};

/** Example with error & warnings */
export const WithError = BasicExample.bind({});

WithError.args = {
  ...BasicExample.args,
  // @ts-expect-error
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
};

// The route file calls these `value` and `currencies`; renamed because
// `currencies` above is a longer list used by the demo stories.
const visualValue = {
  amount: '13.50',
  currencyCode: 'EUR',
} as const;

const highPrecisionValue = {
  amount: '13.501',
  currencyCode: 'EUR',
} as const;

// MoneyField types currencyCode as TCurrencyCode with no empty member, but the
// route file passed '' for the empty-value states and the component handles it.
const emptyValue = { amount: '', currencyCode: '' as TCurrencyCode };

const visualCurrencies = ['EUR', 'USD'];
export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <MoneyField
          title="Price"
          horizontalConstraint={7}
          value={visualValue}
          onChange={() => {}}
          currencies={visualCurrencies}
        />
      </VisualSpec>
      <VisualSpec label="without currency selection">
        <MoneyField
          title="Price"
          horizontalConstraint={7}
          value={visualValue}
          onChange={() => {}}
        />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <MoneyField
          title="Price"
          horizontalConstraint={7}
          value={visualValue}
          onChange={() => {}}
          currencies={visualCurrencies}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="when only the currency select input is disabled">
        <MoneyField
          title="Price"
          horizontalConstraint={7}
          value={visualValue}
          onChange={() => {}}
          currencies={visualCurrencies}
          isCurrencyInputDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="with description">
        <MoneyField
          title="Price"
          horizontalConstraint={7}
          value={visualValue}
          onChange={() => {}}
          currencies={visualCurrencies}
          description="How much is the fish?"
        />
      </VisualSpec>
      <VisualSpec label="with high precision badge and regular price">
        <MoneyField
          title="Price"
          horizontalConstraint={7}
          value={visualValue}
          onChange={() => {}}
          currencies={visualCurrencies}
          hasHighPrecisionBadge={true}
        />
      </VisualSpec>
      <VisualSpec label="with high precision badge and high precision price">
        <MoneyField
          title="Price"
          horizontalConstraint={7}
          value={highPrecisionValue}
          onChange={() => {}}
          currencies={visualCurrencies}
          hasHighPrecisionBadge={true}
        />
      </VisualSpec>
      <VisualSpec label="with placeholder">
        <MoneyField
          title="Price"
          horizontalConstraint={7}
          value={emptyValue}
          onChange={() => {}}
          currencies={visualCurrencies}
          placeholder="Please enter a price"
        />
      </VisualSpec>
      <VisualSpec label="with error when not touched">
        <MoneyField
          title="Price"
          horizontalConstraint={7}
          value={emptyValue}
          onChange={() => {}}
          currencies={visualCurrencies}
          errors={{ missing: true }}
        />
      </VisualSpec>
      <VisualSpec label="with error when touched">
        <MoneyField
          title="Price"
          horizontalConstraint={7}
          value={emptyValue}
          onChange={() => {}}
          currencies={visualCurrencies}
          errors={{ missing: true }}
          touched={{ amount: true, currencyCode: true }}
        />
      </VisualSpec>
      <VisualSpec label="when readonly">
        <MoneyField
          title="Price"
          horizontalConstraint={7}
          value={visualValue}
          onChange={() => {}}
          currencies={visualCurrencies}
          isReadOnly={true}
        />
      </VisualSpec>
      <VisualSpec label="with warning when not touched">
        <MoneyField
          title="Price"
          horizontalConstraint={7}
          value={emptyValue}
          onChange={() => {}}
          currencies={visualCurrencies}
          warnings={{ customWarning: true }}
          renderWarning={() => 'Custom warning'}
        />
      </VisualSpec>
      <VisualSpec label="with warning when touched">
        <MoneyField
          title="Price"
          horizontalConstraint={7}
          value={emptyValue}
          onChange={() => {}}
          currencies={visualCurrencies}
          warnings={{ customWarning: true }}
          touched={{ amount: true, currencyCode: true }}
          renderWarning={() => 'Custom warning'}
        />
      </VisualSpec>
    </>
  ),
};
