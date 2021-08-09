import CreatableSelectField from '@commercetools-uikit/creatable-select-field';

const Example = () => (
  <CreatableSelectField
    title="State"
    value="ready"
    options={[
      { value: 'ready', label: 'Ready' },
      { value: 'shipped', label: 'Shipped' },
    ]}
    onChange={(event) => alert(event.target.value)}
  />
);

export default Example;
