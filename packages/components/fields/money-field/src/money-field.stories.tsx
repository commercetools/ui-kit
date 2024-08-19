import type { Meta, StoryFn } from '@storybook/react';
import MoneyField from './money-field';
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
