import CheckboxInput from '@commercetools-uikit/checkbox-input';

const Example = () => (
  <div>
    <CheckboxInput
      value="foo-radio-value"
      onChange={(event) => alert(event.target.value)}
      isChecked={true}
    >
      A pre-checked option
    </CheckboxInput>
    <CheckboxInput
      value="bar-radio-value"
      onChange={(event) => alert(event.target.value)}
      isDisabled={true}
    >
      A disabled option
    </CheckboxInput>
    <CheckboxInput
      value="unknown-radio-value"
      onChange={(event) => alert(event.target.value)}
      aria-label={'An Option Without a Visible Label'}
    />
  </div>
);

export default Example;
