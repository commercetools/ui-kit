import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import { getInputStyles } from '../styles';

const getCurrencyLabelStyles = () => css`
  display: flex;
  color: ${vars.fontColorDisabled};
  background-color: ${vars.colorNavy98};
  border-top-left-radius: ${vars.borderRadiusInput};
  border-bottom-left-radius: ${vars.borderRadiusInput};
  border: 1px ${vars.borderColorInputDisabled} solid;
  border-right: 0;
  padding: 0 ${vars.spacing8};
  align-items: center;
  font-size: ${vars.fontSizeDefault};
  box-sizing: border-box;
`;

const getAmountInputStyles = props => [
  getInputStyles(props),
  css`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: 0;

    &::placeholder {
      color: ${vars.fontColorPlaceholder};
    }
  `,
];

export { getCurrencyLabelStyles, getAmountInputStyles };
