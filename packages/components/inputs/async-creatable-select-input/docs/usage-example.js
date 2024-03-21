import AsyncCreatableSelectInput from '@commercetools-uikit/async-creatable-select-input';

const Example = (props) => (
  <AsyncCreatableSelectInput
    name="form-field-name"
    value={{ value: 'one', label: 'One' }}
    onChange={(event) => alert(event.target.value)}
    loadOptions={() =>
      Promise.resolve([
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
      ])
    }
  />
);

export default Example;
