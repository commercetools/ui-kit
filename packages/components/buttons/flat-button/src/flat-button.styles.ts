import { designTokens } from '@commercetools-uikit/design-system';
import type { TFlatButtonProps } from './flat-button';

export const getTextColor = (
  tone: TFlatButtonProps['tone'],
  isHover: boolean = false,
  isDisabled: boolean,
  isIcon?: boolean
): string => {
  if (isIcon && isDisabled) {
    return designTokens.fontColorForFlatButtonIconWhenDisabled;
  }

  if (isDisabled) {
    return designTokens.fontColorForTextWhenDisabled;
  }

  switch (tone) {
    case 'primary':
      return isHover
        ? designTokens.fontColorForFlatButtonAsPrimaryWhenHovered
        : designTokens.fontColorForFlatButtonAsPrimary;
    case 'secondary':
      return designTokens.fontColorForFlatButtonAsSecondary;
    case 'inverted':
      return designTokens.fontColorForFlatButtonAsInverted;
    case 'critical':
      return isHover
        ? designTokens.fontColorForFlatButtonAsCriticalWhenHovered
        : designTokens.fontColorForFlatButtonAsCritical;
    default:
      return 'inherit';
  }
};
