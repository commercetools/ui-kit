import PrimaryButton from '@commercetools-uikit/primary-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { CloseIcon } from '@commercetools-uikit/icons';

export type TFilterMenuFooterProps = {
  onApplyFilter?: Function;
  onClearFilter?: Function;
};
function Footer(props: TFilterMenuFooterProps) {
  if (!props.onApplyFilter && !props.onClearFilter) {
    return null;
  }
  return (
    <footer
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: 'solid 1px rebeccapurple',
        marginTop: '16px',
        padding: '8px',
      }}
    >
      {props.onApplyFilter && (
        <PrimaryButton
          onClick={() => {
            props.onApplyFilter!();
          }}
          label="Apply"
        />
      )}
      {props.onClearFilter && (
        <SecondaryButton
          onClick={() => {
            props.onClearFilter!();
          }}
          label="Clear all"
          iconLeft={<CloseIcon />}
        />
      )}
    </footer>
  );
}

export default Footer;
