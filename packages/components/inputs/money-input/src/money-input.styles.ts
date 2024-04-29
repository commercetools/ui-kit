import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import { getInputStyles } from '@commercetools-uikit/input-utils';
import type { TInputProps } from './money-input';

const getLanguageLabelBackgroundColor = (props: TInputProps) => {
  if (props.isDisabled) {
    return designTokens.backgroundColorForLocalizedInputLabelWhenDisabled;
  }
  if (props.isReadOnly) {
    return designTokens.backgroundColorForLocalizedInputLabelWhenReadonly;
  }
  return designTokens.backgroundColorForLocalizedInputLabel;
};

const getCurrencyLabelStyles = (props: TInputProps) => css`
  display: flex;
  color: ${designTokens.fontColorForInputWhenDisabled};
  cursor: ${props.isDisabled ? 'not-allowed' : 'default'};
  background-color: ${getLanguageLabelBackgroundColor(props)};
  border-top-left-radius: ${designTokens.borderRadiusForInput};
  border-bottom-left-radius: ${designTokens.borderRadiusForInput};
  border: 1px solid
    ${props.isReadOnly
      ? designTokens.borderColorForInputWhenReadonly
      : designTokens.borderColorForInputWhenDisabled};
  border-right: 0;
  padding: 0 ${designTokens.spacing25};
  align-items: center;
  font-size: ${props.isCondensed
    ? designTokens.fontSize20
    : designTokens.fontSize30};
  box-sizing: border-box;

  &:focus-within: {
    border-width: 1px;
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
      color: ${designTokens.colorNeutral60};
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
  margin-right: ${designTokens.spacing25};
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
