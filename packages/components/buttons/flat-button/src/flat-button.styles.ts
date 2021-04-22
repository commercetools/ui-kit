import type { TFlatButtonProps, TExtendedTheme } from './flat-button';

export const getButtonIconColor = (
  props: Pick<TFlatButtonProps, 'isDisabled' | 'tone'>
) => {
  if (props.isDisabled) return 'neutral60';
  else if (props.tone === 'primary') return 'primary';
  else if (props.tone === 'secondary') return 'solid';
  else if (props.tone === 'inverted') return 'surface';
  return 'solid';
};

export const getTextColor = (
  tone: TFlatButtonProps['tone'],
  isHover: boolean = false,
  overwrittenVars: TExtendedTheme
): string => {
  switch (tone) {
    case 'primary':
      return isHover
        ? overwrittenVars.colorPrimary25
        : overwrittenVars.colorPrimary;
    case 'secondary':
      return overwrittenVars.colorSolid;
    case 'inverted':
      return overwrittenVars.fontColorForTextWhenInverted;
    default:
      return 'inherit';
  }
};
