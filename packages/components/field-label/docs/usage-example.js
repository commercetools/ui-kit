import { defineMessage, FormattedMessage } from 'react-intl';
import FlatButton from '@commercetools-uikit/flat-button';
import FieldLabel from '@commercetools-uikit/field-label';
import { WarningIcon } from '@commercetools-uikit/icons';

const messages = defineMessage();

const Example = () => (
  <FieldLabel
    title={<FormattedMessage {...messages.title} />}
    hasRequiredIndicator={true}
    onInfoButtonClick={() => {}}
    hint={<FormattedMessage {...messages.hint} />}
    hintIcon={<WarningIcon />}
    description={<FormattedMessage {...messages.description} />}
    badge={<FlatButton tone="primary" label="show" />}
    htmlFor="sampleInput"
    horizontalConstraint={7}
  />
);

export default Example;
