import CheckboxField from '@commercetools-uikit/checkbox-field';

const Example = () => (
  <div>
    <CheckboxField
      value="foo-radio-value"
      onChange={(event) => alert(event.target.value)}
      isChecked={true}
    >
      A pre-checked option
    </CheckboxField>
    <CheckboxField
      value="bar-radio-value"
      onChange={(event) => alert(event.target.value)}
      isDisabled={true}
    >
      A disabled option
    </CheckboxField>
    <CheckboxField
      value="unknown-radio-value"
      onChange={(event) => alert(event.target.value)}
      aria-label={'An Option Without a Visible Label'}
    />
  </div>
);

export default Example;
