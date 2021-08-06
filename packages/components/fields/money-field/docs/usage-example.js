import MoneyField from '@commercetools-uikit/money-field';

const Example = () => (
  <MoneyField
    title="Price"
    value={{ amount: '20', currencyCode: 'EUR' }}
    onChange={(event) => alert(event.target.value)}
    currencies={['EUR', 'USD']}
  />
);

export default Example;
