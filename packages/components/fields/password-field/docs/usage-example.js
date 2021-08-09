import PasswordField from '@commercetools-uikit/password-field';

const Example = () => (
  <PasswordField
    title="myPassword"
    value="s3cr3t"
    onChange={(event) => alert(event.target.value)}
  />
);

export default Example;
