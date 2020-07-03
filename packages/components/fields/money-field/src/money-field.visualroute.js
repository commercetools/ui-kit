import React from 'react';
import { MoneyField } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const value = {
  amount: '13.50',
  currencyCode: 'EUR',
};

const highPrecisionValue = {
  amount: '13.501',
  currencyCode: 'EUR',
};

const emptyValue = { amount: '', currencyCode: '' };

const currencies = ['EUR', 'USD'];

export const routePath = '/money-field';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <MoneyField
        title="Price"
        horizontalConstraint="m"
        value={value}
        onChange={() => {}}
        currencies={currencies}
      />
    </Spec>
    <Spec label="without currency selection">
      <MoneyField
        title="Price"
        horizontalConstraint="m"
        value={value}
        onChange={() => {}}
      />
    </Spec>
    <Spec label="when disabled">
      <MoneyField
        title="Price"
        horizontalConstraint="m"
        value={value}
        onChange={() => {}}
        currencies={currencies}
        isDisabled={true}
      />
    </Spec>
    <Spec label="with description">
      <MoneyField
        title="Price"
        description="How much is the fish?"
        horizontalConstraint="m"
        value={value}
        onChange={() => {}}
        currencies={currencies}
      />
    </Spec>
    <Spec label="with high precision badge and regular price">
      <MoneyField
        title="Price"
        horizontalConstraint="m"
        value={value}
        onChange={() => {}}
        currencies={currencies}
        hasHighPrecisionBadge={true}
      />
    </Spec>
    <Spec label="with high precision badge and high precision price">
      <MoneyField
        title="Price"
        horizontalConstraint="m"
        value={highPrecisionValue}
        onChange={() => {}}
        currencies={currencies}
        hasHighPrecisionBadge={true}
      />
    </Spec>
    <Spec label="with placeholder">
      <MoneyField
        title="Price"
        horizontalConstraint="m"
        value={emptyValue}
        onChange={() => {}}
        currencies={currencies}
        placeholder="Please enter a price"
      />
    </Spec>
    <Spec label="with error when not touched">
      <MoneyField
        title="Price"
        horizontalConstraint="m"
        value={emptyValue}
        onChange={() => {}}
        currencies={currencies}
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label="with error when touched">
      <MoneyField
        title="Price"
        horizontalConstraint="m"
        value={emptyValue}
        onChange={() => {}}
        currencies={currencies}
        errors={{ missing: true }}
        touched={{ amount: true, currencyCode: true }}
      />
    </Spec>
    <Spec label="when readonly">
      <MoneyField
        title="Price"
        horizontalConstraint="m"
        value={value}
        onChange={() => {}}
        currencies={currencies}
        isReadOnly={true}
      />
    </Spec>
  </Suite>
);
