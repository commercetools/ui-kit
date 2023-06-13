import CheckboxField from '@commercetools-uikit/checkbox-field';
import FlatButton from '@commercetools-uikit/flat-button';
import { WarningIcon } from '@commercetools-uikit/icons';
import { defineMessage, FormattedMessage } from 'react-intl';

const messages = defineMessage();

const Example = () => (
  <div>
    <CheckboxField
      value="foo-checkbox-value"
      onChange={(event) => alert(event.target.value)}
      isChecked={true}
      title="Welcome Text"
      hintIcon={<WarningIcon />}
      description={<FormattedMessage {...messages.description} />}
      badge={<FlatButton tone="primary" label="label" />}
    >
      A pre-checked option
    </CheckboxField>
    <CheckboxField
      value="bar-checkbox-value"
      onChange={(event) => alert(event.target.value)}
      isDisabled={true}
      title="Welcome Text"
      hintIcon={<WarningIcon />}
      description={<FormattedMessage {...messages.description} />}
      badge={<FlatButton tone="primary" label="label" />}
    >
      A disabled option
    </CheckboxField>
    <CheckboxField
      value="unknown-checkbox-value"
      onChange={(event) => alert(event.target.value)}
      aria-label={'An Option Without a Visible Label'}
      title="Welcome Text"
      hintIcon={<WarningIcon />}
      description={<FormattedMessage {...messages.description} />}
      badge={<FlatButton tone="primary" label="label" />}
    />
  </div>
);

export default Example;
