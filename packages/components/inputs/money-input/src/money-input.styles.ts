import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import { getInputStyles } from '@commercetools-uikit/input-utils';
import type { TInputProps } from './money-input';

const getCurrencyLabelStyles = () => css`
  display: flex;
  color: ${designTokens.fontColorForInputWhenDisabled};
  background-color: ${designTokens.backgroundColorForInputWhenDisabled};
  border-top-left-radius: ${designTokens.borderRadiusForInput};
  border-bottom-left-radius: ${designTokens.borderRadiusForInput};
  border: 1px ${designTokens.borderColorForInputWhenDisabled} solid;
  border-right: 0;
  padding: ${designTokens.paddingForMoneyInputCurrencyDropdown};
  align-items: center;
  font-size: ${designTokens.fontSizeForInput};
  box-sizing: border-box;

  &:hover {
    background-color: ${designTokens.backgroundColorForInputWhenDisabled};
  }
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
  margin-right: ${designTokens.spacing10};
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
