import CheckboxField from '@commercetools-uikit/checkbox-field';

const Example = () => (
  <div>
    <CheckboxField
      value="foo-checkbox-value"
      onChange={(event) => alert(event.target.value)}
      isChecked={true}
    >
      A pre-checked option
    </CheckboxField>
    <CheckboxField
      value="bar-checkbox-value"
      onChange={(event) => alert(event.target.value)}
      isDisabled={true}
    >
      A disabled option
    </CheckboxField>
    <CheckboxField
      value="unknown-checkbox-value"
      onChange={(event) => alert(event.target.value)}
      aria-label={'An Option Without a Visible Label'}
    />
  </div>
);

export default Example;
