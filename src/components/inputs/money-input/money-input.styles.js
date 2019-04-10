import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import { getInputStyles } from '../styles';

const getCurrencyLabelStyles = () => css`
  display: flex;
  color: ${vars.fontColorForInputWhenDisabled};
  background-color: ${vars.backgroundColorForInputWhenDisabled};
  border-top-left-radius: ${vars.borderRadiusForInput};
  border-bottom-left-radius: ${vars.borderRadiusForInput};
  border: 1px ${vars.borderColorForInputWhenDisabled} solid;
  border-right: 0;
  padding: 0 ${vars.spacingS};
  align-items: center;
  font-size: ${vars.fontSizeForInput};
  box-sizing: border-box;
`;

const getAmountInputStyles = props => [
  getInputStyles(props),
  css`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: 0;

    &::placeholder {
      color: ${vars.placeholderFontColorForInput};
    }
  `,
];

export { getCurrencyLabelStyles, getAmountInputStyles };
