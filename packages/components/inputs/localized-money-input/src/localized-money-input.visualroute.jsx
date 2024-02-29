import {
  LocalizedMoneyInput,
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

const highPrecisionValue = {
  CAD: {
    currencyCode: 'CAD',
    amount: '13.501',
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
        horizontalConstraint={7}
        hideCurrencyExpansionControls={true}
      />
    </Spec>
    <Spec label="when disabled and open">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint={7}
        isDisabled={true}
        defaultExpandCurrencies={true}
      />
    </Spec>
    <Spec label="when disabled and closed">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint={7}
        isDisabled={true}
      />
    </Spec>
    <Spec label="when readonly and open">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint={7}
        isReadOnly={true}
        defaultExpandCurrencies={true}
      />
    </Spec>
    <Spec label="when readonly and closed">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint={7}
        isReadOnly={true}
      />
    </Spec>
    <Spec label="when there is an error for a specific currency (first one)">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint={7}
        errors={{ CAD: 'foo' }}
      />
    </Spec>
    <Spec label="when there is an error for a specific currency (second one)">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint={7}
        errors={{ EUR: 'foo' }}
      />
    </Spec>
    <Spec label="when there is a warning for a specific currency (first one)">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint={7}
        warnings={{ CAD: 'foo' }}
      />
    </Spec>
    <Spec label="when there is a warning for a specific currency (second one)">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint={7}
        warnings={{ EUR: 'foo' }}
      />
    </Spec>
    <Spec label="when there is a general error">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint={7}
        hasError={true}
      />
    </Spec>
    <Spec label="when there is a general warning">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint={7}
        hasWarning={true}
      />
    </Spec>
    <Spec label="with high precision badge and regular price">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint={7}
        hasHighPrecisionBadge={true}
      />
    </Spec>
    <Spec label="with high precision badge and high precision price">
      <LocalizedMoneyInput
        value={highPrecisionValue}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint={7}
        hasHighPrecisionBadge={true}
      />
    </Spec>
  </Suite>
);
