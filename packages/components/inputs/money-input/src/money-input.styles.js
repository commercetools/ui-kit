import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { getInputStyles } from '@commercetools-uikit/input-utils';

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

const getAmountInputStyles = (props) => [
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

const getHighPrecisionWrapperStyles = ({ isDisabled }) => css`
  position: absolute;
  top: 0;
  right: 0;
  margin-right: ${vars.spacingXs};
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
