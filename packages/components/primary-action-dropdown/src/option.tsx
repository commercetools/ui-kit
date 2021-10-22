import { ReactNode } from 'react';
import { css } from '@emotion/react';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { customProperties as vars } from '@commercetools-uikit/design-system';

type TOption = {
  /**
   * Event handler triggers whenever the option is clicked.
   */
  onClick: () => void;
  /**
   * Disables the option within the dropdown. If all options are disabled the dropdown will be disabled.
   */
  isDisabled?: boolean;
  /**
   * Any string which serves as the label.
   */
  children: string;
  /**
   * Any React node.
   */
  iconLeft: ReactNode;
};

const Option = (props: TOption) => (
  <AccessibleButton
    label={props.children}
    onClick={props.onClick}
    isDisabled={props.isDisabled}
    css={[
      css`
        display: block;
        text-align: left;
        width: 100%;
        padding: ${vars.spacingS};
        background-color: ${vars.colorSurface};
        &:first-of-type {
          border-radius: ${vars.borderRadius6} ${vars.borderRadius6} 0 0;
        }
        &:last-of-type {
          border-radius: 0 0 ${vars.borderRadius6} ${vars.borderRadius6};
        }
        &:hover {
          background-color: ${vars.colorNeutral95};
        }
      `,
      props.isDisabled &&
        css`
          color: ${vars.colorNeutral};
        `,
    ]}
  >
    {props.children}
  </AccessibleButton>
);
Option.displayName = 'Option';
Option.defaultProps = {
  isDisabled: false,
};

export default Option;
