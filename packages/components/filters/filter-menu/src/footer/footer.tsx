import { type ReactElement } from 'react';
import { type TPrimaryButtonProps } from '@commercetools-uikit/primary-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { CloseIcon } from '@commercetools-uikit/icons';

export type TFilterMenuFooterProps = {
  renderApplyButton?: () => ReactElement<TPrimaryButtonProps>;
  onClearRequest?: Function;
};
function Footer(props: TFilterMenuFooterProps) {
  if (!props.renderApplyButton && !props.onClearRequest) {
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
      {props.renderApplyButton && props.renderApplyButton()}
      {props.onClearRequest && (
        <SecondaryButton
          onClick={() => {
            props.onClearRequest!();
          }}
          label="Clear all"
          iconLeft={<CloseIcon />}
        />
      )}
    </footer>
  );
}

export default Footer;
