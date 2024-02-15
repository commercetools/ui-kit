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
    return designTokens.colorNeutral60;
  }

  if (props.isDisabled) {
    return designTokens.colorNeutral60;
  }

  switch (props.tone) {
    case 'primary':
      return props.isHover
        ? designTokens.fontColorForButtonAsFlatWhenHovered
        : designTokens.colorPrimary30;
    case 'secondary':
      return props.isHover
        ? designTokens.colorPrimary25
        : designTokens.colorSolid;
    case 'inverted':
      return designTokens.colorSurface;
    case 'critical':
      return props.isHover
        ? designTokens.fontColorForButtonAsFlatAsCriticalWhenHovered
        : designTokens.fontColorForButtonAsFlatAsCritical;
    default:
      return 'inherit';
  }
};
