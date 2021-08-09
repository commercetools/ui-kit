import MoneyInput from '@commercetools-uikit/money-input';

const Example = () => (
  <MoneyInput
    value={{ amount: '1.00', currencyCode: 'EUR' }}
    onChange={
      (/** event */) => {
        // alert(event.target.name, event.target.value)
      }
    }
    currencies={['EUR', 'USD']}
  />
);

export default Example;
