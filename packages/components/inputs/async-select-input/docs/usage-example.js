import AsyncSelectInput from '@commercetools-uikit/async-select-input';

const Example = (props) => (
  <AsyncSelectInput
    value={{ value: 'ready', label: 'Ready' }}
    loadOptions={
      (/* inputValue */) => {
        // async fetch logic
      }
    }
    onChange={(event) => alert(event.target.value)}
  />
);

export default Example;
