// use negative margin to make it so that border doesnt shift content?
import { designTokens } from '@commercetools-uikit/design-system';
import { css } from '@emotion/react';
import { sizeMap } from '../leading-icon/leading-icon.styles';
import { type TCustomIconProps } from './custom-icon';

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
