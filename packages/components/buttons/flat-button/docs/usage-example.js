import FlatButton from '@commercetools-uikit/flat-button';
import { InformationIcon } from '@commercetools-uikit/icons';

const Example = () => (
  <FlatButton
    tone="primary"
    icon={<InformationIcon />}
    label="A label text"
    onClick={() => alert('Button clicked')}
    isDisabled={false}
  />
);

export default Example;
