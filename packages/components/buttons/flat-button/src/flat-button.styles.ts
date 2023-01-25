import type { TFlatButtonProps, TDesignTokens } from './flat-button';

export const getButtonIconColor = (
  props: Pick<TFlatButtonProps, 'isDisabled' | 'tone'>
) => {
  if (props.isDisabled) return 'neutral60';
  else if (props.tone === 'primary') return 'primary';
  else if (props.tone === 'secondary') return 'solid';
  else if (props.tone === 'inverted') return 'surface';
  else if (props.tone === 'critical') return 'error';
  return 'solid';
};

export const getTextColor = (
  tone: TFlatButtonProps['tone'],
  isHover: boolean = false,
  designTokens: TDesignTokens
): string => {
  switch (tone) {
    case 'primary':
      return isHover ? designTokens.colorPrimary25 : designTokens.colorPrimary;
    case 'secondary':
      return designTokens.colorSolid;
    case 'inverted':
      return designTokens.fontColorForTextWhenInverted;
    case 'critical':
      return isHover ? designTokens.colorError25 : designTokens.colorError;
    default:
      return 'inherit';
  }
};
