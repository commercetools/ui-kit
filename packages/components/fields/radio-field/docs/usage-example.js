import RadioField from '@commercetools-uikit/radio-field';
import RadioInput from '@commercetools-uikit/radio-input';

const Example = () => (
  <RadioField
    title="Fruits"
    name="fruits"
    value="apple"
    onChange={(event) => alert(event.target.value)}
  >
    <RadioInput.Option value="apple">{'Apple'}</RadioInput.Option>
    <RadioInput.Option value="banana">{'Banana'}</RadioInput.Option>
  </RadioField>
);

export default Example;
