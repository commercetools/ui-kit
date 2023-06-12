import CheckBoxField from '@commercetools-uikit/checkbox-field';

const Example = () => (
  <div>
    <CheckBoxField
      value="foo-checkbox-value"
      onChange={(event) => alert(event.target.value)}
      isChecked={true}
    >
      A pre-checked option
    </CheckBoxField>
    <CheckBoxField
      value="bar-checkbox-value"
      onChange={(event) => alert(event.target.value)}
      isDisabled={true}
    >
      A disabled option
    </CheckBoxField>
    <CheckBoxField
      value="unknown-checkbox-value"
      onChange={(event) => alert(event.target.value)}
      aria-label={'An Option Without a Visible Label'}
    />
  </div>
);

export default Example;
