import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
import { getInputStyles } from '@commercetools-uikit/input-utils';
import type { TInputProps } from './money-input';

const getCurrencyLabelStyles = () => css`
  display: flex;
  color: ${customProperties.fontColorForInputWhenDisabled};
  background-color: ${customProperties.backgroundColorForInputWhenDisabled};
  border-top-left-radius: ${customProperties.borderRadiusForInput};
  border-bottom-left-radius: ${customProperties.borderRadiusForInput};
  border: 1px ${customProperties.borderColorForInputWhenDisabled} solid;
  border-right: 0;
  padding: 0 ${customProperties.spacingS};
  align-items: center;
  font-size: ${customProperties.fontSizeForInput};
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

    &::placeholder {
      color: ${customProperties.placeholderFontColorForInput};
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
  margin-right: ${customProperties.spacingXs};
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
