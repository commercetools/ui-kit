import SecondaryButton from '@commercetools-uikit/secondary-button';
import { PlusBoldIcon } from '@commercetools-uikit/icons';

type TProps = {
  /** the issue-button's label */
  label: string;
  /** the github template name */
  template: string;
};

export const SubmitIssueButton: React.FC<TProps> = ({ label, template }) => {
  return (
    <SecondaryButton
      as="a"
      iconLeft={<PlusBoldIcon />}
      label={label}
      href={`https://github.com/commercetools/ui-kit/issues/new?assignees=&labels=&projects=&template=${template}`}
      target="_blank"
      rel="noopener noreferrer"
      size="20"
    />
  );
};
