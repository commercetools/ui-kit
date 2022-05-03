import LocalizedMoneyInput from '@commercetools-uikit/localized-money-input';

const Example = () => (
  <LocalizedMoneyInput
    value={{
      USD: { currencyCode: 'USD', amount: '12.22' },
      EUR: { currencyCode: 'EUR', amount: '41.44' },
    }}
    onChange={
      (/** event */) => {
        // alert(event.target.name, event.target.value)
      }
    }
  />
);

export default Example;
