import { type ReactNode } from 'react';
import { designTokens } from '@commercetools-uikit/design-system';
import { css } from '@emotion/react';

export type TFilterMenuChipProps = {
  isDisabled?: boolean;
  label: ReactNode;
};

const chipStyles = css`
  font-size: ${designTokens.fontSize20};
  font-weight: ${designTokens.fontWeight400};
  line-height: ${designTokens.lineHeight20};
  color: ${designTokens.colorPrimary20};
  background-color: ${designTokens.colorPrimary95};
  height: ${designTokens.spacing40};
  padding: 0 ${designTokens.spacing20};
  border-radius: calc(
    ${designTokens.borderRadius20} - ${designTokens.borderRadius4}
  );
  display: inline-flex;
  justify-content: center;
  align-items: center;
  list-style: none;
`;

const disabledChipStyles = css`
  color: ${designTokens.colorNeutral40};
  background-color: ${designTokens.colorNeutral90};
`;

function Chip(props: TFilterMenuChipProps) {
  return (
    <li css={[chipStyles, props.isDisabled && disabledChipStyles]}>
      {props.label}
    </li>
  );
}

export default Chip;
