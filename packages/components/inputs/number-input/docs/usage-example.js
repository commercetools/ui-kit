import NumberInput from '@commercetools-uikit/number-input';

const Example = () => (
  <NumberInput
    value="2.5"
    onChange={
      (/** event */) => {
        // alert(event.target.value)
      }
    }
  />
);

export default Example;
