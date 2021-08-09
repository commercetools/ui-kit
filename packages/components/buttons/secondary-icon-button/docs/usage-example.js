import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import { InformationIcon } from '@commercetools-uikit/icons';

const Example = () => (
  <SecondaryIconButton
    icon={<InformationIcon />}
    label="A label text"
    onClick={() => alert('Button clicked')}
  />
);

export default Example;
