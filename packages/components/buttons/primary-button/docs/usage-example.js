import PrimaryButton from '@commercetools-uikit/primary-button';
import { InformationIcon } from '@commercetools-uikit/icons';

const Example = () => (
  <PrimaryButton
    iconLeft={<InformationIcon />}
    label="A label text"
    onClick={() => alert('Button clicked')}
    isDisabled={false}
  />
);

export default Example;
