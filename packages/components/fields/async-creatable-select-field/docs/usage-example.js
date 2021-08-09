import AsyncCreatableSelectField from '@commercetools-uikit/async-creatable-select-field';

const Example = () => (
  <AsyncCreatableSelectField
    title="State"
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
