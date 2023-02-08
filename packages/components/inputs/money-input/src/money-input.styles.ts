import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import { getInputStyles } from '@commercetools-uikit/input-utils';
import type { TInputProps } from './money-input';

const getCurrencyLabelStyles = (props: TInputProps) => css`
  display: flex;
  color: ${designTokens.fontColorForInputWhenDisabled};
  background-color: ${designTokens.backgroundColorForInputWhenDisabled};
  border-top-left-radius: ${designTokens.borderRadiusForInput};
  border-bottom-left-radius: ${designTokens.borderRadiusForInput};
  border: 1px
    ${props.isReadOnly
      ? designTokens.borderColorForInputWhenReadonly
      : designTokens.borderColorForInputWhenDisabled}
    solid;
  border-right: 0;
  padding: 0 ${designTokens.spacing20};
  align-items: center;
  font-size: ${designTokens.fontSizeForInput};
  box-sizing: border-box;
`;

type TGetAmountInputStyles = {
  hasFocus: boolean;
} & TInputProps;
const getAmountInputStyles = (props: TGetAmountInputStyles) => [
  getInputStyles(props),
  css`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: 0;
    border-left: ${props.isReadOnly
      ? `1px ${designTokens.borderColorForInputWhenReadonly} solid`
      : `1px ${designTokens.borderColorForInput} solid`};

    &::placeholder {
      color: ${designTokens.placeholderFontColorForInput};
    }
  `,
];

type TGetHighPrecisionWrapperStyles = {
  isDisabled?: boolean;
};

const getHighPrecisionWrapperStyles = ({
  isDisabled,
}: TGetHighPrecisionWrapperStyles) => css`
  position: absolute;
  top: 0;
  right: 0;
  margin-right: ${designTokens.marginRightForMoneyInputPrecisionBadge};
  height: 100%;
  display: flex;
  align-items: center;
  cursor: ${isDisabled ? 'not-allowed' : 'default'};
  justify-content: center;
`;

export {
  getHighPrecisionWrapperStyles,
  getCurrencyLabelStyles,
  getAmountInputStyles,
};
