import React from 'react';
import {
  LocalizedMoneyInput,
  ErrorMessage,
  WarningMessage,
} from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

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
};

export const routePath = '/localized-money-input';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
      />
    </Spec>
    <Spec label="when currencies expanded by default">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        defaultExpandCurrencies={true}
      />
    </Spec>
    <Spec label="when expansion controls are hidden">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint="m"
        hideCurrencyExpansionControls={true}
      />
    </Spec>
    <Spec label="when disabled and open">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint="m"
        isDisabled={true}
        defaultExpandCurrencies={true}
      />
    </Spec>
    <Spec label="when disabled and closed">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint="m"
        isDisabled={true}
      />
    </Spec>
    <Spec label="when readonly and open">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint="m"
        isReadOnly={true}
        defaultExpandCurrencies={true}
      />
    </Spec>
    <Spec label="when readonly and closed">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint="m"
        isReadOnly={true}
      />
    </Spec>
    <Spec label="when there is an error for a specific currency (first one)">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint="m"
        errors={{ CAD: <ErrorMessage>foo</ErrorMessage> }}
      />
    </Spec>
    <Spec label="when there is an error for a specific currency (second one)">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint="m"
        errors={{ EUR: <ErrorMessage>foo</ErrorMessage> }}
      />
    </Spec>
    <Spec label="when there is a warning for a specific currency (first one)">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint="m"
        warnings={{ CAD: <WarningMessage>foo</WarningMessage> }}
      />
    </Spec>
    <Spec label="when there is a warning for a specific currency (second one)">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint="m"
        warnings={{ EUR: <WarningMessage>foo</WarningMessage> }}
      />
    </Spec>
    <Spec label="when there is a general error">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint="m"
        hasError={true}
      />
    </Spec>
    <Spec label="when there is a general warning">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint="m"
        hasWarning={true}
      />
    </Spec>
  </Suite>
);
