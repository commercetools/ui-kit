import { MoneyInput } from '@commercetools-frontend/ui-kit';
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

export const routePath = '/money-input';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <MoneyInput
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
        currencies={currencies}
      />
    </Spec>
    <Spec label="with only one currency">
      <MoneyInput
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
        currencies={['EUR']}
      />
    </Spec>
    <Spec label="with high precision">
      <MoneyInput
        horizontalConstraint={7}
        value={highPrecisionValue}
        onChange={() => {}}
        currencies={currencies}
        hasHighPrecisionBadge={true}
      />
    </Spec>
    <Spec label="with high precision badge and disabled">
      <MoneyInput
        horizontalConstraint={7}
        value={highPrecisionValue}
        onChange={() => {}}
        currencies={currencies}
        isDisabled={true}
        hasHighPrecisionBadge={true}
      />
    </Spec>
    <Spec label="when disabled">
      <MoneyInput
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
        currencies={currencies}
        isDisabled={true}
      />
    </Spec>
    <Spec label="when only the currency select input is disabled">
      <MoneyInput
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
        currencies={currencies}
        isCurrencyInputDisabled={true}
      />
    </Spec>
    <Spec label="with description">
      <MoneyInput
        description="How much is the fish?"
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
        currencies={currencies}
      />
    </Spec>
    <Spec label="with placeholder">
      <MoneyInput
        horizontalConstraint={7}
        value={emptyValue}
        onChange={() => {}}
        currencies={currencies}
        placeholder="Please enter a price"
      />
    </Spec>
    <Spec label="with error">
      <MoneyInput
        horizontalConstraint={7}
        value={emptyValue}
        onChange={() => {}}
        currencies={currencies}
        hasError={true}
      />
    </Spec>
    <Spec label="with warning">
      <MoneyInput
        horizontalConstraint={7}
        value={emptyValue}
        onChange={() => {}}
        currencies={currencies}
        hasWarning={true}
      />
    </Spec>
    <Spec label="when readOnly">
      <MoneyInput
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
        currencies={currencies}
        isReadOnly={true}
      />
    </Spec>
    <Spec label="without currencies">
      <MoneyInput
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
        currencies={[]}
      />
    </Spec>
    <Spec label="without currencies - when readOnly">
      <MoneyInput
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
        currencies={[]}
        isReadOnly={true}
      />
    </Spec>
    <Spec label="without currencies - when disabled">
      <MoneyInput
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
        currencies={[]}
        isDisabled={true}
      />
    </Spec>
  </Suite>
);
