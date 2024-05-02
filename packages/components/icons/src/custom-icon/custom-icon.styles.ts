import { designTokens } from '@commercetools-uikit/design-system';
import { css } from '@emotion/react';
import { type TCustomIconProps } from './custom-icon';

const sizeMap = {
  10: designTokens.spacing50,
  20: `calc(${designTokens.spacing50} + ${designTokens.spacing20})`,
  30: designTokens.spacing60,
  40: designTokens.spacing70,
};

export const getCustomIconStyles = (props: TCustomIconProps) => {
  const sizeStyles = {
    height: sizeMap[props.size!],
    width: sizeMap[props.size!],
  };

  return css`
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    align-items: center;
    height: ${sizeStyles.height};
    width: ${sizeStyles.width};
    border-radius: ${designTokens.borderRadius4};
    background-color: ${designTokens.colorTransparent};
    box-sizing: border-box;
    border: ${props.hasBorder
      ? `solid ${designTokens.borderWidth1} ${designTokens.colorNeutral90}`
      : 'none'};
  `;
};
