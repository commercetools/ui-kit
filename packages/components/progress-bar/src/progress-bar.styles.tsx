import { css, keyframes } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import { getMaxPropTokenValue } from '../helpers';
import { type TProgressBarProps } from './progress-bar';

export const heightPerScale = {
  '10': designTokens.spacing25,
  '20': designTokens.spacing40,
};

const progressPulse = keyframes`
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
`;

export const getLabelStyles = (
  props: TProgressBarProps & { textAlignment: string }
) => css`
  min-height: ${heightPerScale[props.height ?? '20']};
  text-align: ${props.textAlignment};
  max-width: ${getMaxPropTokenValue(props.labelWidth!)};
  display: inline-flex;
  > span {
    width: max-content;
  }
`;

export const getBackgroundBarStyles = (props: TProgressBarProps) => css`
  width: 100%;
  background-color: ${props.isInverted
    ? 'rgba(255, 255, 255, 0.4)'
    : designTokens.colorNeutral90};
  border-radius: ${designTokens.spacingL};
  height: ${heightPerScale[props.height ?? '20']};
  overflow: hidden;
`;

export const getForegroundBarStyles = (props: TProgressBarProps) => css`
  width: ${props.progress}%;
  transition: width 500ms ease-in-out;
  display: block;
  height: ${heightPerScale[props.height ?? '20']};
  background: ${props.isInverted
    ? designTokens.colorSurface
    : `linear-gradient(
      to right,
      #00E5CB,
      ${designTokens.colorPrimary25},
      #00E5CB
    )`};
  background-size: 200% 100%;
  animation: ${props.isAnimated && !props.isInverted
    ? css`
        ${progressPulse} 2s linear infinite
      `
    : 'none'};
  border-radius: ${designTokens.spacingL};
`;
