import { designTokens } from '@commercetools-uikit/design-system';
import type { TFlatButtonProps } from './flat-button';

type TGetTextColor = {
  tone: TFlatButtonProps['tone'];
  isHover?: boolean;
  isDisabled?: boolean;
  isIcon?: boolean;
};

export const getTextColor = (props: TGetTextColor): string => {
  if (props.isIcon && props.isDisabled) {
    return designTokens.fontColorForFlatButtonIconWhenDisabled;
  }

  if (props.isDisabled) {
    return designTokens.fontColorForTextWhenDisabled;
  }

  switch (props.tone) {
    case 'primary':
      return props.isHover
        ? designTokens.fontColorForFlatButtonAsPrimaryWhenHovered
        : designTokens.fontColorForFlatButtonAsPrimary;
    case 'secondary':
      return designTokens.fontColorForFlatButtonAsSecondary;
    case 'inverted':
      return designTokens.fontColorForFlatButtonAsInverted;
    case 'critical':
      return props.isHover
        ? designTokens.fontColorForFlatButtonAsCriticalWhenHovered
        : designTokens.fontColorForFlatButtonAsCritical;
    default:
      return 'inherit';
  }
};
