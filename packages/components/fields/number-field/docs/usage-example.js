import NumberField from '@commercetools-uikit/number-field';

const Example = () => (
  <NumberField
    title="Age"
    value={5}
    onChange={(event) => alert(event.target.value)}
  />
);

export default Example;
